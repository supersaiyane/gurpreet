import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveCommand,commandNames} from '../dist/terminal.mjs';
test('original identity, role, mission and passion commands return portfolio content',()=>{
 assert.match(resolveCommand('whoami').lines.join(' '),/Gurpreet Singh/);
 assert.match(resolveCommand('cat role.txt').lines.join(' '),/Senior Staff SRE/);
 assert.match(resolveCommand('echo $MISSION').lines.join(' '),/reliable/i);
 assert.match(resolveCommand('ls ~/passions/').lines.join(' '),/Engineering/);
});
test('navigation is restricted to known portfolio sections',()=>{
 assert.equal(resolveCommand('projects').navigate,'#writing');
 assert.equal(resolveCommand('lab').navigate,'#lab');
 assert.equal(resolveCommand('experience').navigate,'#work');
 assert.equal(resolveCommand('contact').navigate,'#contact');
});
test('help exposes commands, clear clears output and whitespace is accepted',()=>{
 assert.ok(commandNames.every(c=>resolveCommand('help').lines.join(' ').includes(c)));
 assert.equal(resolveCommand('clear').clear,true);
 assert.deepEqual(resolveCommand('  WHOAMI  '),resolveCommand('whoami'));
 assert.deepEqual(resolveCommand(''),{lines:[]});
});
test('unknown input and shell syntax never execute or navigate',()=>{
 for(const input of ['rm -rf /','whoami; curl example.com','<img src=x onerror=alert(1)>','__proto__']){
  const result=resolveCommand(input);assert.equal(result.navigate,undefined);assert.match(result.lines.join(' '),/not found/i);
 }
});
