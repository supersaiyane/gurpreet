const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const perspectives = {
 sre: [-20, -28, 'Design for failure. Make recovery a capability.'],
 cloud: [-20, -118, 'Build foundations that survive a failure domain.'],
 ai: [-20, -208, 'Connect evidence. Automate within clear boundaries.'],
 platform: [-20, 62, 'Give engineering teams a paved road worth using.']
};
let paused = reducedMotion.matches;
const stage = $('.core-stage');
function syncMotion() {
 stage.classList.toggle('motion-paused', paused);
 $('#core-motion').textContent = paused ? 'Resume motion ▷' : 'Pause motion ⏸';
 $('#core-motion').setAttribute('aria-label', paused ? 'Resume core motion' : 'Pause core motion');
}
$('#core-motion').addEventListener('click', () => { paused = !paused; syncMotion(); });
reducedMotion.addEventListener('change', event => { paused = event.matches; syncMotion(); });
$$('[data-core]').forEach(button => button.addEventListener('click', () => {
 const [x, y, description] = perspectives[button.dataset.core];
 $('.core-space').style.setProperty('--core-x', x + 'deg');
 $('.core-space').style.setProperty('--core-y', y + 'deg');
 $('#core-description').textContent = description;
 $$('[data-core]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
}));
// The object rests when outside the viewport; no animation loop or rendering dependency.
new IntersectionObserver(entries => {
 stage.classList.toggle('core-offscreen', !entries[0].isIntersecting);
}).observe(stage);
syncMotion();

const stops = [
 ['edge', '01 / Traffic', 'Start with the people depending on your system.'],
 ['platform', '02 / Platform', 'Route their requests through a dependable paved road.'],
 ['ai', '03 / AI operations', 'Use the signals to connect evidence and propose action.'],
 ['human', '04 / Human approval', 'Match autonomy to risk. Keep accountability with people.']
];
let stop = -1;
function renderTour() {
 const active = stop >= 0;
 $('.architecture').classList.toggle('tour-active', active);
 $$('[data-node]').forEach(node => node.classList.toggle('tour-focus', active && node.dataset.node === stops[stop][0]));
 $('#tour-caption').textContent = active ? stops[stop][2] : 'From the first request to the human decision.';
 $('#tour-count').textContent = active ? stops[stop][1] : '4 layers / 1 connected system';
 $('#tour-next').textContent = !active ? 'Take the tour ↗' : stop === stops.length - 1 ? 'Finish tour ✓' : 'Next layer →';
 $('#tour-back').hidden = stop <= 0;
 $('#tour-close').hidden = !active;
}
$('#tour-next').addEventListener('click', () => {
 if (stop < 0 && !$('#architecture-insight').hidden) $('#close-insight').click();
 stop = stop === stops.length - 1 ? -1 : stop + 1;
 renderTour();
 if (stop >= 0 && matchMedia('(max-width:760px)').matches) {
  $('.flow-node.tour-focus').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'center'});
 }
});
$('#tour-back').addEventListener('click', () => { stop = Math.max(0, stop - 1); renderTour(); });
$('#tour-close').addEventListener('click', () => { stop = -1; renderTour(); $('#tour-next').focus(); });
$$('[data-node]').forEach(node => node.addEventListener('click', () => { stop = -1; renderTour(); }));
$('.architecture').addEventListener('keydown', event => {
 if (event.key === 'Escape' && stop >= 0) { stop = -1; renderTour(); $('#tour-next').focus(); }
});
$('#start-mission').addEventListener('click', () => {
 $('[data-scenario="deployment"]').click();
 $('#telemetry-heading').setAttribute('tabindex', '-1');
 $('#telemetry-heading').focus({preventScroll:true});
 $('.telemetry-panel').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
});

// Content stays visible if observers or scripts are unavailable.
if (!reducedMotion.matches) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
 }), {threshold:0.08});
 $$('.section-heading,.mission-brief,.principles article,.project-card').forEach(element => {
  element.classList.add('reveal-ready'); observer.observe(element);
 });
 reducedMotion.addEventListener('change', event => {
  if (event.matches) $$('.reveal-ready').forEach(element => element.classList.add('is-visible'));
 });
}
