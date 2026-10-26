export const scenarios = {
 latency: {name:'Latency spike',signal:'API latency exceeds the service objective.',cause:'A downstream connection pool is saturated.',action:'Limit concurrency and scale the worker pool.',risk:'Scaling consumes additional capacity. Watch queue depth before increasing traffic.',node:'services',metric:'2.4 s',label:'API latency',healthy:'180 ms',impact:'API responses are slowing. Requests still reach the database.',events:['Latency burn-rate alert fires','Correlated traces identify a saturated worker pool','AI suggests bounded scaling; human review required']},
 region: {name:'Region outage',signal:'Health checks fail in the primary region.',cause:'The regional service plane is unreachable.',action:'Fail over traffic to the secondary region.',risk:'Confirm replica freshness and secondary capacity before routing writes.',node:'cloud',metric:'1 / 2',label:'Regions available',healthy:'2 / 2',impact:'Primary region unavailable. Secondary region is ready for a controlled failover.',events:['Regional health checks fail','Secondary-region capacity and replication require validation','AI suggests traffic failover; human review required']},
 deployment: {name:'Deployment failure',signal:'Error rate rises after a service release.',cause:'The new release fails readiness checks.',action:'Roll back to the last healthy release.',risk:'Check schema compatibility before rolling back. Keep the failing revision for investigation.',node:'platform',metric:'12.8%',label:'Request errors',healthy:'0.02%',impact:'A new service revision is unhealthy. Existing healthy replicas remain available.',events:['Post-deployment error-rate alert fires','Release change correlates with failing readiness checks','AI suggests rollback; human review required']}
};
export const initialState=()=>({phase:'healthy',scenario:null});
export function transition(state,event,id){
 if(event==='reset') return initialState();
 if(event==='inject' && Object.hasOwn(scenarios,id)) return {phase:'detected',scenario:id};
 if(event==='review' && ['detected','investigating'].includes(state.phase)) return {...state,phase:'review'};
 if(event==='approve' && state.phase==='review') return {...state,phase:'recovered'};
 if(event==='investigate' && state.phase==='review') return {...state,phase:'investigating'};
 return state;
}
