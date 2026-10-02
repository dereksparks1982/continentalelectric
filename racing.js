(()=> {
const SCHEDULE=[
 {id:'H1',label:'Heat 1',threshold:1800,stage:'heat',distance:'6 furlongs',pref:'sprint'},
 {id:'H2',label:'Heat 2',threshold:1560,stage:'heat',distance:'6 furlongs',pref:'sprint'},
 {id:'H3',label:'Heat 3',threshold:1320,stage:'heat',distance:'6 furlongs',pref:'sprint'},
 {id:'H4',label:'Heat 4',threshold:1080,stage:'heat',distance:'6 furlongs',pref:'sprint'},
 {id:'SA',label:'Semifinal A',threshold:840,stage:'semi',distance:'1 mile',pref:'mile'},
 {id:'SB',label:'Semifinal B',threshold:600,stage:'semi',distance:'1 mile',pref:'mile'},
 {id:'ME',label:'Main Event',threshold:300,stage:'main',distance:'1¼ miles',pref:'route'}
];
const HORSE_NAMES=[
 'Federal Star','Potomac Prince','Blue Banner','Capitol Fire','Liberty Bell','Copper Crown',
 'Night Courier','Old Dominion','Red Ledger','Silver Current','Union Jack','District Pride',
 'Chesapeake Moon','Franklin Flyer','Amber Signal','Columbia Rose','Iron Lantern','White Oak',
 'Victory Road','River Senator','Glassworks','Tungsten King','Market Street','Electric Dawn',
 'Capital Ace','Midnight Wire','Commerce Queen','Bureau Chief','Foundry Boy','Eastern Current'
];
const JOCKEYS=['E. Turner','J. Bell','S. Carter','W. Hale','T. Brooks','R. Dean','M. Cole','A. Price','H. Webb','C. Grant'];
const SURFACES=['Firm','Dry','Muddy','Heavy'];
let lastObservedRemaining=null,animation=null,animationTimer=null;

const $r=id=>document.getElementById(id);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const rand=(a,b)=>a+Math.random()*(b-a);
const avg=a=>a.reduce((x,y)=>x+y,0)/Math.max(1,a.length);
const ordinal=n=>{const s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0])};
const fmt=n=>{n=Math.max(0,Math.ceil(n));return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')};

function makeHorse(name,id){
 const age=2+Math.floor(rand(0,5));
 return {id,name,age,jockey:pick(JOCKEYS),speed:rand(50,91),stamina:rand(48,93),consistency:rand(45,92),kick:rand(43,95),start:rand(44,93),jockeySkill:rand(48,91),preference:pick(SURFACES),distancePref:pick(['sprint','mile','route']),fitness:rand(82,100),fatigue:rand(0,10),confidence:rand(45,70),health:100,injury:null,starts:0,wins:0,places:0,shows:0,earnings:0,form:[]};
}
function baseTalent(h){return h.speed*.29+h.stamina*.2+h.consistency*.16+h.kick*.12+h.start*.09+h.jockeySkill*.14}
function recentForm(h){return h.form.length?avg(h.form.slice(-5).map(p=>7-p))*1.5:0}
function rating(h,surface,pref){
 let r=baseTalent(h)+recentForm(h)+(h.confidence-50)*.08+(h.fitness-80)*.1-h.fatigue*.16-(100-h.health)*.3;
 if(h.preference===surface)r+=5;if(h.distancePref===pref)r+=5;if(h.injury)r-=12;
 return clamp(r,20,110);
}
function oddsFor(ids,surface,pref){
 const horses=ids.map(id=>horse(id)),ratings=horses.map(h=>rating(h,surface,pref)),mean=avg(ratings);
 const weights=ratings.map(r=>Math.exp((r-mean)/12)),sum=weights.reduce((a,b)=>a+b,0),out={};
 horses.forEach((h,i)=>{const prob=clamp((weights[i]/sum)*rand(.94,1.06),.04,.60);out[h.id]=+clamp(.90/prob,1.35,24).toFixed(2)});
 return out;
}
function fractional(d){const f=Math.max(.2,d-1);return f<1?Math.max(1,Math.round(f*4))+':4':Math.max(1,Math.round(f))+':1'}
function horse(id){return S.racing.roster.find(h=>h.id===id)}
function recoverRoster(){
 for(const h of S.racing.roster){h.fatigue=clamp(h.fatigue-rand(12,25),0,100);h.fitness=clamp(h.fitness+rand(1,5),40,100);h.health=clamp(h.health+rand(1,4),40,100);if(h.injury&&h.health>84&&Math.random()<.35)h.injury=null}
}
function buildMeeting(){
 const eligible=[...S.racing.roster].sort((a,b)=>(rating(b,'Dry','mile')-b.fatigue*.08)-(rating(a,'Dry','mile')-a.fatigue*.08));
 const pool=eligible.slice(0,26).sort(()=>Math.random()-.5).slice(0,24),surface=pick(SURFACES);
 const races={};
 for(let i=0;i<4;i++)races['H'+(i+1)]={participants:pool.slice(i*6,i*6+6).map(h=>h.id),result:null,odds:null};
 races.SA={participants:[],result:null,odds:null};races.SB={participants:[],result:null,odds:null};races.ME={participants:[],result:null,odds:null};
 return {date:S.gameDate,surface,races,bets:{},created:true};
}
function ensureState(){
 let changed=false;
 if(!S.racing){S.racing={roster:HORSE_NAMES.map((n,i)=>makeHorse(n,i+1)),meeting:null,lastPreparedDate:null};changed=true}
 if(!Array.isArray(S.racing.roster)||S.racing.roster.length<24){S.racing.roster=HORSE_NAMES.map((n,i)=>makeHorse(n,i+1));changed=true}
 if(S.racing.lastPreparedDate!==S.gameDate){recoverRoster();S.racing.meeting=buildMeeting();S.racing.lastPreparedDate=S.gameDate;changed=true}
 if(!S.racing.meeting||S.racing.meeting.date!==S.gameDate){S.racing.meeting=buildMeeting();changed=true}
 if(changed)save(true);
 return S.racing.meeting;
}
function raceDef(id){return SCHEDULE.find(x=>x.id===id)}
function ensureOdds(id){
 const m=ensureState(),r=m.races[id],d=raceDef(id);
 if(r.participants.length&&!r.odds){r.odds=oddsFor(r.participants,m.surface,d.pref);save(true)}
 return r.odds||{};
}
function updateQualifiers(){
 const m=S.racing.meeting,r=m.races;
 if(r.H1.result&&r.H2.result&&!r.SA.participants.length){r.SA.participants=[...r.H1.result.slice(0,2),...r.H2.result.slice(0,2)];ensureOdds('SA')}
 if(r.H3.result&&r.H4.result&&!r.SB.participants.length){r.SB.participants=[...r.H3.result.slice(0,2),...r.H4.result.slice(0,2)];ensureOdds('SB')}
 if(r.SA.result&&r.SB.result&&!r.ME.participants.length){r.ME.participants=[...r.SA.result.slice(0,2),...r.SB.result.slice(0,2)];ensureOdds('ME')}
}
function updateHorse(h,place,stage){
 h.starts++;if(place===1)h.wins++;if(place<=2)h.places++;if(place<=3)h.shows++;
 h.form.push(place);if(h.form.length>12)h.form.shift();
 const fatigue=stage==='main'?rand(18,28):stage==='semi'?rand(12,21):rand(8,15);
 h.fatigue=clamp(h.fatigue+fatigue,0,100);h.fitness=clamp(h.fitness-rand(.5,3),35,100);
 h.confidence=clamp(h.confidence+(place===1?rand(2,5):place<=3?rand(.5,2):-rand(.5,2)),20,95);
 if(Math.random()<(stage==='main'?.012:.006)+(h.fatigue/100)*.01){h.injury=pick(['Minor strain','Hoof soreness','Leg soreness']);h.health=clamp(h.health-rand(6,16),40,100)}
}
function payoutFor(decimal,type,wager,place){
 if(type==='win')return place===1?Math.round(wager*decimal):0;
 if(type==='place')return place<=2?Math.round(wager*(1+(decimal-1)*.52)):0;
 return place<=3?Math.round(wager*(1+(decimal-1)*.31)):0;
}
function settleBet(id,result){
 const m=S.racing.meeting,bet=m.bets[id];if(!bet||bet.settled)return;
 const place=result.indexOf(bet.horseId)+1,decimal=m.races[id].odds?.[bet.horseId]||2,payout=payoutFor(decimal,bet.type,bet.wager,place);
 bet.settled=true;bet.place=place;bet.payout=payout;if(payout)S.personalCash+=payout;
 bet.net=payout-bet.wager;
}
function resolveRace(id,animate){
 const m=ensureState(),r=m.races[id],d=raceDef(id);if(r.result||!r.participants.length)return;
 const scores=r.participants.map(pid=>{const h=horse(pid),base=rating(h,m.surface,d.pref);return {id:pid,score:base+rand(-7,7)+h.start*.025+(d.stage==='main'?h.kick*.04:0)}}).sort((a,b)=>b.score-a.score);
 r.result=scores.map(x=>x.id);
 r.result.forEach((pid,i)=>{const h=horse(pid);updateHorse(h,i+1,d.stage);if(i===0)h.earnings+=d.stage==='main'?1800:d.stage==='semi'?500:150});
 settleBet(id,r.result);updateQualifiers();
 const attending=document.getElementById('racing')?.classList.contains('active')&&S.phase==='day';
 if(attending&&!S.contacts.bookie?.met&&Math.random()<.12){
   S.contacts.bookie.met=true;S.contacts.bookie.trust=1;S.bookieKnown=true;S.middlePokerUnlocked=true;
   S.notes.push({date:displayDate(),text:'Met Eddie Doyle among the bettors at Capital Race Grounds. The bookmaker said to ask him if I ever wanted to know what else was running around Washington.',source:'race-track conversation'});
 }
 if(id==='ME'){const winner=horse(r.result[0]);S.lastRaceResult='At Capital Race Grounds, '+winner.name+' won the Main Event.';S.notes.push({date:displayDate(),text:'The Main Event at Capital Race Grounds was won by '+winner.name+'.',source:'personal recollection / racing results'})}
 save(true);
 if(animate&&document.getElementById('racing')?.classList.contains('active'))startAnimation(id);
}
function processSchedule(){
 if(S.phase&&S.phase!=='day')return false;
 const m=ensureState(),jump=lastObservedRemaining==null?0:Math.max(0,lastObservedRemaining-S.dayRemaining),canAnimate=jump<=2;
 let changed=false;
 for(const d of SCHEDULE){const r=m.races[d.id];if(!r.result&&S.dayRemaining<=d.threshold){updateQualifiers();if(r.participants.length){resolveRace(d.id,canAnimate);changed=true}}}
 lastObservedRemaining=S.dayRemaining;
 return changed;
}
window.finishRaceMeeting=()=>{
 const m=ensureState();
 for(const d of SCHEDULE){const race=m.races[d.id];if(!race.result){updateQualifiers();if(race.participants.length)resolveRace(d.id,false)}}
 lastObservedRemaining=0;save(true);
};
function nextRace(){
 const m=ensureState();for(const d of SCHEDULE){if(!m.races[d.id].result)return d}return null;
}
function placeBet(raceId){
 const d=raceDef(raceId);if(!d)return;
 const m=ensureState(),r=m.races[d.id];updateQualifiers();
 if(!r.participants.length)return setRaceNote('The field for '+d.label+' has not been established yet.');
 if(r.result||S.dayRemaining<=d.threshold)return setRaceNote('Betting is closed for '+d.label+'.');
 if(m.bets[d.id])return setRaceNote('You already have a wager on '+d.label+'.');
 const horseId=Number($r('raceHorseSelect_'+d.id)?.value),type=$r('raceBetType_'+d.id)?.value||'win',wager=Math.max(1,Math.floor(Number($r('raceWager_'+d.id)?.value)||0));
 if(!r.participants.includes(horseId))return setRaceNote('Choose a horse in '+d.label+'.');
 if(S.personalCash<wager)return setRaceNote('Not enough personal cash for that wager.');
 S.personalCash-=wager;m.bets[d.id]={horseId,type,wager,settled:false};
 save(true);renderRacing();setRaceNote('Wager accepted for '+d.label+': '+horse(horseId).name+' · '+type.toUpperCase()+' · '+cash(wager)+'.');
}
function setRaceNote(t){const el=$r('raceNote');if(el)el.textContent=t}
function raceStatus(d){
 const r=S.racing.meeting.races[d.id];
 if(animation?.raceId===d.id)return 'RUNNING';
 if(r.result)return 'COMPLETE';
 const n=nextRace();if(n?.id===d.id)return S.dayRemaining>d.threshold?'NEXT':'STARTING';
 return 'WAITING';
}
function renderBracket(){
 const m=S.racing.meeting,el=$r('raceBracket');if(!el)return;
 el.innerHTML=SCHEDULE.map(d=>{const r=m.races[d.id],status=raceStatus(d);let body='';
   if(r.result){body=r.result.slice(0,d.stage==='main'?4:2).map((pid,i)=>'<div><b>'+ordinal(i+1)+'</b> '+escapeHtml(horse(pid).name)+'</div>').join('')}
   else if(r.participants.length){body=r.participants.map(pid=>'<div>'+escapeHtml(horse(pid).name)+'</div>').join('')}
   else body='<div class="muted">Awaiting qualifiers</div>';
   return '<article class="race-bracket-card '+status.toLowerCase()+'"><header><b>'+d.label+'</b><span>'+fmt(d.threshold)+' remaining</span></header><small>'+d.distance+' · '+status+'</small>'+body+'</article>'
 }).join('');
}
function raceBetCard(d){
 const m=S.racing.meeting,r=m.races[d.id],bet=m.bets[d.id],seconds=Math.max(0,S.dayRemaining-d.threshold);
 if(r.result){
   const winner=horse(r.result[0]),runner=horse(r.result[1]);
   return '<article class="race-bet-card closed"><div class="race-bet-card-head"><div><h4>'+d.label+'</h4><small>'+d.distance+'</small></div><b>COMPLETE</b></div><p><b>1st:</b> '+escapeHtml(winner.name)+(runner?' · <b>2nd:</b> '+escapeHtml(runner.name):'')+'</p>'+(bet?'<p class="race-bet-locked">Ticket: '+escapeHtml(horse(bet.horseId).name)+' · '+bet.type.toUpperCase()+' · '+cash(bet.wager)+' · '+(bet.net>=0?'NET +':'NET ')+cash(bet.net)+'</p>':'<p class="muted">No wager placed.</p>')+'</article>';
 }
 if(!r.participants.length){
   return '<article class="race-bet-card pending"><div class="race-bet-card-head"><div><h4>'+d.label+'</h4><small>'+d.distance+'</small></div><b>FIELD PENDING</b></div><p class="muted">Betting opens when the qualifying field is established.</p></article>';
 }
 const odds=ensureOdds(d.id);
 if(S.dayRemaining<=d.threshold){
   return '<article class="race-bet-card closed"><div class="race-bet-card-head"><div><h4>'+d.label+'</h4><small>'+d.distance+'</small></div><b>BETTING CLOSED</b></div></article>';
 }
 return '<article class="race-bet-card open"><div class="race-bet-card-head"><div><h4>'+d.label+'</h4><small>'+d.distance+' · Track '+m.surface+'</small></div><div class="race-countdown" data-race-id="'+d.id+'"><small>POST TIME IN</small><b>'+fmt(seconds)+'</b></div></div>'+
 '<div class="race-field compact">'+r.participants.map(pid=>{const h=horse(pid);return '<div class="race-field-row"><span>'+escapeHtml(h.name)+'</span><small>'+escapeHtml(h.jockey)+' · Form '+(h.form.slice(-5).join('-')||'—')+'</small><b>'+fractional(odds[pid])+'</b></div>'}).join('')+'</div>'+
 (bet?'<p class="race-bet-locked">Ticket: '+escapeHtml(horse(bet.horseId).name)+' · '+bet.type.toUpperCase()+' · '+cash(bet.wager)+'</p>':
 '<div class="race-bet-panel"><label>Horse<select id="raceHorseSelect_'+d.id+'">'+r.participants.map(pid=>'<option value="'+pid+'">'+escapeHtml(horse(pid).name)+' ('+fractional(odds[pid])+')</option>').join('')+'</select></label><label>Bet<select id="raceBetType_'+d.id+'"><option value="win">Win</option><option value="place">Place</option><option value="show">Show</option></select></label><label>Wager<input id="raceWager_'+d.id+'" type="number" min="1" step="1" value="'+(d.stage==='main'?100:25)+'"></label><button class="place-race-bet" data-race-id="'+d.id+'">Place Bet</button></div>')+'</article>';
}
function renderNext(){
 const m=ensureState(),el=$r('raceNext');if(!el)return;
 if(animation){renderLive();return}
 updateQualifiers();
 const openOrPending=SCHEDULE.filter(d=>!m.races[d.id].result);
 if(!openOrPending.length){const winner=horse(m.races.ME.result[0]);el.innerHTML='<h3>Meeting Complete</h3><p><b>Main Event winner:</b> '+escapeHtml(winner.name)+'</p>';return}
 el.innerHTML='<div class="race-board-head"><div><h3>Betting Board</h3><p class="fine">Place tickets on any race whose field is known. Semifinals and the Main Event open after their qualifiers are established.</p></div></div><div class="race-betting-board">'+SCHEDULE.map(raceBetCard).join('')+'</div>';
 el.querySelectorAll('.place-race-bet').forEach(btn=>btn.addEventListener('click',()=>placeBet(btn.dataset.raceId)));
}
function renderHistory(){
 const el=$r('raceHistory');if(!el)return;const m=S.racing.meeting,done=SCHEDULE.filter(d=>m.races[d.id].result);
 let running=0;
 el.innerHTML=done.length?done.map(d=>{const r=m.races[d.id],w=horse(r.result[0]),bet=m.bets[d.id];let wagerText='No wager';if(bet){running+=bet.net||0;wagerText='Your bet '+(bet.net>=0?'+':'')+cash(bet.net)+' · Running total '+(running>=0?'+':'')+cash(running)}return '<div class="race-history-item"><b>'+d.label+': '+escapeHtml(w.name)+'</b><small>'+d.distance+' · '+wagerText+'</small></div>'}).join(''):'<p class="muted">No races have been run yet. Results and wager settlements will appear here in race order, even while you are elsewhere.</p>';
}
function renderRacing(){
 if(!$r('horseRacingModule'))return;ensureState();renderBracket();renderNext();renderHistory();
 const m=S.racing.meeting;$r('raceMeetingMeta').textContent=(S.phase==='night'||S.phase==='report')?'Capital Race Grounds · CLOSED · Today\'s results are final.':'Capital Race Grounds · '+m.surface+' · Meeting begins at 30:00 remaining · Main Event at 05:00';
 $r('raceBankroll').textContent=cash(S.personalCash);
}
function startAnimation(id){
 clearInterval(animationTimer);const r=S.racing.meeting.races[id],start=Date.now(),duration=18000;animation={raceId:id,start,duration,ids:[...r.result]};
 renderRacing();
 animationTimer=setInterval(()=>{if(!animation)return;const t=Math.min(1,(Date.now()-start)/duration);drawAnimation(t);if(t>=1){clearInterval(animationTimer);animationTimer=null;animation=null;renderRacing()}},200);
}
function renderLive(){
 const d=raceDef(animation.raceId),r=S.racing.meeting.races[d.id],el=$r('raceNext');if(!el)return;
 el.innerHTML='<h3>'+d.label+' · THEY\'RE OFF</h3><p>'+d.distance+' · Track '+S.racing.meeting.surface+'</p><div id="raceLiveBars" class="race-live-bars">'+r.participants.map(pid=>'<div class="race-runner"><span>'+escapeHtml(horse(pid).name)+'</span><div><i id="raceBar_'+pid+'"></i></div><b id="racePct_'+pid+'">0%</b></div>').join('')+'</div>';
 drawAnimation(Math.min(1,(Date.now()-animation.start)/animation.duration));
}
function drawAnimation(t){
 if(!animation)return;const rank=new Map(animation.ids.map((id,i)=>[id,i])),r=S.racing.meeting.races[animation.raceId];
 for(const pid of r.participants){const place=rank.get(pid)||0,finishBonus=(r.participants.length-place)*.7,noise=Math.sin(t*14+pid)*1.3,progress=Math.min(100,Math.max(0,t*(94+finishBonus)+noise));const bar=$r('raceBar_'+pid),pct=$r('racePct_'+pid);if(bar)bar.style.width=progress+'%';if(pct)pct.textContent=t>=1?ordinal(place+1):Math.floor(progress)+'%'}
}
function updateRaceClock(){
 if(!animation)$r('raceNext')?.querySelectorAll('.race-countdown[data-race-id]').forEach(el=>{const d=raceDef(el.dataset.raceId),clock=el.querySelector('b');if(d&&clock)clock.textContent=fmt(Math.max(0,S.dayRemaining-d.threshold))});
 const bankroll=$r('raceBankroll');if(bankroll)bankroll.textContent=cash(S.personalCash);
}
function tick(){
 if(document.hidden)return;ensureState();const changed=processSchedule();
 if(document.getElementById('racing')?.classList.contains('active')){
   if(changed&&!animation)renderRacing();
   else updateRaceClock();
 }
}
document.addEventListener('click',e=>{if(e.target?.dataset?.tab==='racing')setTimeout(renderRacing,0)});
ensureState();processSchedule();renderRacing();setInterval(tick,1000);
})();