import {initialState, transition, scenarios} from './incident.mjs';

const nodeContent={
 edge:['01 / EDGE & TRAFFIC','Reliability starts with the user.','Shape traffic around service health. Use objectives, load patterns and graceful degradation to protect the experience at the edge.'],
 services:['02 / SERVICES','Design for change. Plan for failure.','Clear service boundaries, observable dependencies and reversible releases make complex systems easier to operate.'],
 platform:['03 / PLATFORM','The paved road should earn adoption.','Build developer platforms that remove friction. Useful defaults, GitOps and clear ownership let teams focus on their products.'],
 cloud:['04 / CLOUD','Resilience is an architecture decision.','Design for capacity, failure domains and recovery. Bring cloud economics and security into the same conversation as availability.'],
 ai:['05 / AI OPERATIONS','Automate the toil. Own the decision.','AI can connect signals and propose a response. Clear boundaries, evidence and human accountability make it useful.'],
 human:['06 / HUMAN JUDGMENT','Autonomy needs accountability.','Set the risk boundaries, review consequential changes and learn without blame. Engineering leadership remains a human responsibility.']
};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
$$('[data-node]').forEach(button=>button.addEventListener('click',()=>{
 $$('[data-node]').forEach(node=>node.setAttribute('aria-pressed',String(node===button)));
 const [index,title,description]=nodeContent[button.dataset.node];
 $('#node-index').textContent=index;$('#node-title').textContent=title;$('#node-description').textContent=description;
}));

let state=initialState();
const addEvent=(title,description,className='event-complete')=>{
 const li=document.createElement('li');li.className=className;
 const heading=document.createElement('span');heading.textContent=title;
 const p=document.createElement('p');p.textContent=description;
 li.append(heading,p);$('#event-list').append(li);
};
function renderIncident(){
 const scenario=state.scenario?scenarios[state.scenario]:null;
 const active=!!scenario && state.phase!=='recovered';
 $$('[data-scenario]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.scenario===state.scenario)));
 $$('[data-system]').forEach(node=>node.classList.toggle('degraded',active&&node.dataset.system===scenario.node));
 $('#lab-dot').style.background=active?'var(--amber)':'var(--cyan)';
 $('#lab-status').textContent=active?`${scenario.name.toUpperCase()} / SIMULATED INCIDENT`:state.phase==='recovered'?'RECOVERY COMPLETE / SIMULATED':'ALL SYSTEMS OPERATIONAL';
 $('#lab-metric').textContent=scenario?(active?scenario.metric:scenario.healthy):'180 ms';
 $('#lab-metric').style.color=active?'var(--amber)':'var(--cyan)';
 $('#lab-metric-label').textContent=`${scenario?scenario.label.toUpperCase():'API LATENCY'} · SIMULATED`;
 $('#lab-impact').textContent=scenario?(active?scenario.impact:'Simulated recovery complete. The affected system is healthy again. Validate the change, then capture what you learned.'):'Healthy services. Traffic is flowing. Choose a scenario to see what changes.';
 $('#event-list').replaceChildren();
 if(!scenario){
  addEvent('System ready','Observability is active. No incident has been introduced.');
  addEvent('Your move','Choose a failure on the left to begin.','');
 }else{
  addEvent('Signal detected',scenario.events[0]);
  addEvent('Evidence correlated',scenario.events[1]);
  if(state.phase==='recovered'){
   addEvent('Human decision recorded','You approved the simulated recovery.');
   addEvent('Service restored','Next: validate health, review the incident and improve the system.');
  }else if(state.phase==='investigating'){
   addEvent('Investigation requested',scenario.risk,'event-review');
  }else{
   addEvent(state.phase==='review'?'Awaiting your decision':'Recommendation available',scenario.events[2],'event-review');
  }
 }
 $('#review-plan').disabled=!['detected','investigating'].includes(state.phase);
 $('#review-plan').textContent=state.phase==='recovered'?'Recovery complete ✓':'Review recovery plan ↗';
 $('#recovery-panel').hidden=state.phase!=='review';
 if(scenario){$('#recovery-action').textContent=scenario.action;$('#recovery-risk').textContent=scenario.risk;}
 const prompts={healthy:'You’re in command. Start by introducing a failure.',detected:'Evidence gathered. Review the proposed action and its tradeoffs.',review:'Read the risk, then approve the simulated action or investigate further.',investigating:'Investigation held the action. Review capacity, dependencies and rollback safety before proceeding.',recovered:'Service restored by your decision. Reset or choose another scenario to explore a different tradeoff.'};
 $('#lab-next').textContent=prompts[state.phase];
}
function dispatch(event,id){state=transition(state,event,id);renderIncident();}
$$('[data-scenario]').forEach(button=>button.addEventListener('click',()=>dispatch('inject',button.dataset.scenario)));
$('#reset-lab').addEventListener('click',()=>dispatch('reset'));
$('#review-plan').addEventListener('click',()=>{dispatch('review');$('#recovery-panel').focus({preventScroll:true});$('#recovery-panel').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
$('#approve-plan').addEventListener('click',()=>{dispatch('approve');$('#reset-lab').focus({preventScroll:true});});
$('#investigate-plan').addEventListener('click',()=>{dispatch('investigate');$('#review-plan').focus({preventScroll:true});});

$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 $$('[data-filter]').forEach(filter=>filter.setAttribute('aria-pressed',String(filter===button)));
 let count=0;
 $$('[data-category]').forEach(item=>{item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter;if(!item.hidden)count++;});
 $('.filter-status').textContent=`${count} exploration${count===1?'':'s'} shown.`;
}));
const motion=matchMedia('(prefers-reduced-motion: reduce)');
function updateMotion(){const map=$('.topology');if(motion.matches)map.pauseAnimations();else map.unpauseAnimations();}
motion.addEventListener('change',updateMotion);updateMotion();
renderIncident();
