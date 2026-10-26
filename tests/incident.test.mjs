import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState, transition, scenarios} from '../dist/incident.mjs';

test('healthy system cannot recover without an incident',()=>{
 assert.deepEqual(transition(initialState(), 'approve'), initialState());
});
test('every scenario needs explicit review before recovery',()=>{
 for(const id of Object.keys(scenarios)){
  const active=transition(initialState(),'inject',id);
  assert.equal(active.phase,'detected');
  assert.equal(active.scenario,id);
  assert.equal(transition(active,'approve').phase,'detected');
  const review=transition(active,'review');
  assert.equal(review.phase,'review');
  assert.equal(transition(review,'approve').phase,'recovered');
 }
});
test('changing scenario clears previous review and recovery',()=>{
 const reviewed=transition(transition(initialState(),'inject','latency'),'review');
 assert.deepEqual(transition(reviewed,'inject','region'),{phase:'detected',scenario:'region'});
});
test('investigation preserves incident and reset returns healthy',()=>{
 const active=transition(initialState(),'inject','deployment');
 assert.equal(transition(transition(active,'review'),'investigate').phase,'investigating');
 assert.deepEqual(transition(active,'reset'),initialState());
});
test('unknown scenarios and events leave state intact',()=>{
 const state=initialState();
 assert.deepEqual(transition(state,'inject','unknown'),state);
 assert.deepEqual(transition(state,'unknown'),state);
});
