import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState, transition, scenarios, evidenceFor} from '../dist/incident.mjs';
const review=(id='latency')=>transition(transition(initialState(),'inject',id),'review');
const validated=(id='latency')=>transition(transition(review(id),'dry-run'),'acknowledge',true);
test('healthy system cannot recover without an incident',()=>assert.deepEqual(transition(initialState(),'approve'),initialState()));
test('every scenario needs a passing dry run and explicit risk acknowledgement',()=>{
 for(const id of Object.keys(scenarios)){
  const active=transition(initialState(),'inject',id);
  assert.equal(active.phase,'detected');
  assert.equal(transition(active,'approve').phase,'detected');
  const plan=review(id);
  assert.equal(transition(plan,'approve').phase,'review');
  const dry=transition(plan,'dry-run');
  assert.equal(dry.dryRun,'pass');
  assert.equal(transition(dry,'approve').phase,'review');
  assert.equal(transition(validated(id),'approve').phase,'recovered');
 }
});
test('a broad action is blocked by the simulated safety check',()=>{
 for(const id of Object.keys(scenarios)){
  const choice=transition(review(id),'plan','broad');
  const dry=transition(choice,'dry-run');
  assert.equal(dry.dryRun,'blocked');
  assert.equal(transition(transition(dry,'acknowledge',true),'approve').phase,'review');
 }
});
test('changing strategy invalidates the previous dry run and acknowledgement',()=>{
 const changed=transition(validated(),'plan','broad');
 assert.equal(changed.dryRun,null);assert.equal(changed.acknowledged,false);
 assert.equal(transition(changed,'approve').phase,'review');
});
test('changing scenario clears all previous decisions',()=>{
 assert.deepEqual(transition(validated(),'inject','region'),{phase:'detected',scenario:'region'});
});
test('investigation and reset clear plan state',()=>{
 assert.deepEqual(transition(validated(),'investigate'),{phase:'investigating',scenario:'latency'});
 assert.deepEqual(transition(validated(),'reset'),initialState());
});
test('acknowledgement can be revoked before approval',()=>{
 const revoked=transition(validated(),'acknowledge',false);
 assert.equal(transition(revoked,'approve').phase,'review');
});
test('invalid scenarios, strategies, evidence views and events are safe',()=>{
 const state=initialState();
 assert.deepEqual(transition(state,'inject','unknown'),state);
 assert.deepEqual(transition(state,'unknown'),state);
 assert.deepEqual(transition(review(),'plan','unknown'),review());
 assert.equal(evidenceFor('unknown','logs',7),'Choose a scenario to inspect its telemetry.');
 assert.equal(evidenceFor('latency','unknown',7),evidenceFor('latency','metrics',7));
});
test('telemetry replay is deterministic and bounded, with scenario-specific evidence',()=>{
 for(const id of Object.keys(scenarios)){
  assert.equal(scenarios[id].samples.length,8);
  assert.notEqual(evidenceFor(id,'metrics',0),evidenceFor(id,'metrics',7));
  assert.equal(evidenceFor(id,'metrics',-100),evidenceFor(id,'metrics',0));
  assert.equal(evidenceFor(id,'metrics',100),evidenceFor(id,'metrics',7));
  assert.match(evidenceFor(id,'logs',7),/SIMULATED/);
  assert.match(evidenceFor(id,'traces',7),/SIMULATED/);
 }
});
