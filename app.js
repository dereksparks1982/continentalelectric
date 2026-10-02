const $=s=>document.querySelector(s), money=n=>'$'+Math.round(n).toLocaleString('en-US'), cash=n=>(n<0?'-$':'$')+Math.abs(n).toFixed(2), clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const stockSeed=[
['AMW','American Motor Works','Automotive',31.40,.024,.040],['DMW','Dearborn Motor Works','Automotive',24.80,.018,.043],['CMC','Continental Motor Co.','Automotive',18.65,.016,.048],
['NAC','National Aircraft Corp.','Aviation',16.20,.008,.060],['PAW','Pacific Aeronautical Works','Aviation',12.75,.000,.068],['CAA','Columbia Aircraft & Aviation','Aviation',9.40,.000,.072],
['HBC','Hudson Banking Corp.','Banking',42.60,.032,.028],['FNT','First National Trust','Banking',36.15,.030,.026],['USB','Union States Bank','Banking',28.90,.027,.032],
['ATL','Atlantic Chemical','Chemicals',24.10,.025,.040],['UCD','Union Chemical & Dye','Chemicals',38.70,.021,.045],['ACP','American Chemical & Powder','Chemicals',44.30,.020,.048],
['NRT','National Radio & Telegraph','Communications',18.75,.015,.052],['CTC','Continental Telegraph Co.','Communications',27.20,.026,.038],['ATG','American Telephone & Telegraphic','Communications',61.80,.038,.026],
['AEC','American Electrical Corp.','Electrical',34.10,.026,.040],['WEC','Western Electric Apparatus','Electrical',28.35,.024,.043],['RMI','Republic Motor & Instrument','Electrical',21.90,.018,.050],
['MEC','Metropolitan Edison Co.','Utilities',39.60,.042,.024],['CPL','Capital Power & Light','Utilities',32.25,.045,.025],['GPL','Great Plains Light & Power','Utilities',25.70,.041,.028],
['ACS','American Consolidated Steel','Steel',29.85,.020,.052],['LSI','Liberty Steel & Iron','Steel',23.40,.018,.055],['RST','Republic Steel Trust','Steel',17.95,.012,.060],
['NPT','National Petroleum','Petroleum',35.75,.031,.038],['LSP','Lone Star Petroleum','Petroleum',22.60,.028,.045],['GOC','Gulf & Ocean Oil','Petroleum',19.30,.026,.048],
['PAR','Pennsylvania & Atlantic RR','Railroads',27.45,.036,.042],['NCR','New York Continental RR','Railroads',33.80,.040,.038],['CPR','Continental Pacific Railway','Railroads',21.15,.033,.046],['GNR','Great Northern & Western RR','Railroads',25.90,.035,.043],
['NMC','National Mercantile & Catalog','Retail',26.30,.022,.044],['FWC','Franklin Ward & Co.','Retail',19.85,.020,.048],['WFT','Worthington Five & Ten','Retail',14.60,.027,.036],
['AHW','American Harvester Works','Machinery',37.10,.025,.041],['CMW','Central Machine Works','Machinery',20.40,.019,.050],['UTM','Union Tool & Machine','Machinery',15.75,.016,.055],
['INM','International Nickel & Metals','Mining',30.55,.030,.046],['CCM','Continental Copper & Mining','Mining',18.20,.022,.058],['AMC','American Metals Corp.','Mining',24.65,.026,.052],
['ATS','Atlantic Transport & Steamship','Shipping',17.80,.025,.055],['USL','United States Lines & Freight','Shipping',22.30,.028,.050],['PSN','Pacific Steam Navigation','Shipping',13.95,.020,.060],
['NFC','National Foods Corp.','Food',28.40,.033,.030],['APC','American Provision Co.','Food',21.60,.031,.034],['GMC','Great Mills Corp.','Food',16.90,.029,.036],
['ACC','American Consumer Corp.','Consumer',25.15,.028,.038],['HHA','Household & Home Appliances','Consumer',19.45,.020,.048],['USG','United Soap & Goods','Consumer',23.75,.032,.033],['RTA','Republic Tobacco & Allied','Consumer',34.50,.045,.035]
];
const APP_VERSION='v0.4.0', TURNS_PER_MONTH=7, BUSINESS_DAY_SECONDS=3600, NIGHT_SECONDS=3600, DAY_SECONDS=BUSINESS_DAY_SECONDS, MARKET_TICK_MS=5000, SAVE_KEY='federalElectricSave', STOCK_HISTORY_DAYS=90;
const MATERIAL_MARKET={copper:{name:'Copper',unitPrice:.18},glass:{name:'Glass',unitPrice:.095},tungsten:{name:'Tungsten',unitPrice:.32}};
function unitCash(n){return '$'+Number(n).toFixed(3).replace(/0+$/,'').replace(/\.$/,'')}
const contractCustomers=[
 ['Capital Hardware & Supply Co.','Existing customer','balanced'],['Potomac Hotel Supply','Commercial buyer','forgiving'],['District Lighting & Fixture Co.','Regional distributor','strict'],['Chesapeake Mercantile Co.','Wholesale buyer','price'],['National Home Stores','Retail chain','quality'],['Columbia Property Management','Property operator','impatient']
];
const customerTraits={balanced:{label:'Practical',reject:.55,discount:.82,partial:true},forgiving:{label:'Forgiving',reject:.28,discount:.88,partial:true},strict:{label:'Strict specification buyer',reject:.82,discount:.72,partial:false},price:{label:'Price-sensitive wholesaler',reject:.42,discount:.78,partial:true},quality:{label:'Quality-focused chain',reject:.88,discount:.70,partial:false},impatient:{label:'Deadline-sensitive operator',reject:.62,discount:.80,partial:true}};
const contractGrades=[
 {quality:'economy',qualityName:'Economy Short-Life',price:.16},
 {quality:'standard',qualityName:'Standard Service',price:.20},
 {quality:'long',qualityName:'Long-Life Premium',price:.27}
];
function hashString(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function seededUnit(key){return (hashString(key)%1000000)/1000000}
function businessDaysBefore(iso,count){const out=[],d=new Date(iso+'T12:00:00');while(out.length<count){d.setDate(d.getDate()-1);if(d.getDay()!==0&&d.getDay()!==6)out.unshift(d.toISOString().slice(0,10))}return out}
function openingGapFor(ticker,iso,vol){let gap=(seededUnit(ticker+'|open|'+iso)-.5)*Math.min(.018,.004+vol*.18);if(Math.abs(gap)<.0008)gap=gap<0?-.0008:.0008;return gap}
function makeStockHistory(ticker,openingPrice,vol,count=STOCK_HISTORY_DAYS){
 const dates=businessDaysBefore('1938-01-03',count),gap=openingGapFor(ticker,'1938-01-03',vol);
 let p=Math.max(1,Math.round((openingPrice/(1+gap))*100)/100),back=[];
 for(let i=dates.length-1;i>=0;i--){back.push({date:dates[i],close:+p.toFixed(2)});const move=(seededUnit(ticker+'|history|'+dates[i])-.5)*vol*.35;p=Math.max(1,p/(1+move))}
 return back.reverse();
}
function makeStocks(){return Object.fromEntries(stockSeed.map(([ticker,name,sector,price,yieldRate,vol])=>{const history=makeStockHistory(ticker,price,vol),prevClose=history[history.length-1].close;return [ticker,{name,sector,price,hiddenPrice:price,prev:prevClose,prevClose,open:price,yieldRate,vol,history}]}))}
function mergeStockHistory(seedHistory,savedHistory){
 const byDate=new Map();
 for(const v of Array.isArray(seedHistory)?seedHistory:[]){if(v&&v.date&&Number.isFinite(+v.close))byDate.set(v.date,{date:v.date,close:+v.close})}
 for(const v of Array.isArray(savedHistory)?savedHistory:[]){if(v&&v.date&&Number.isFinite(+v.close))byDate.set(v.date,{date:v.date,close:+v.close})}
 return [...byDate.values()].sort((a,b)=>a.date.localeCompare(b.date)).slice(-260);
}
function makePortfolio(){return Object.fromEntries(stockSeed.map(x=>[x[0],{shares:0,cost:0,realized:0}]))}
function businessTurnDatesForMonth(iso){
 const parts=iso.slice(0,7).split('-').map(Number),y=parts[0],m=parts[1],days=new Date(y,m,0).getDate(),weekdays=[];
 for(let d=1;d<=days;d++){const x=new Date(y,m-1,d,12,0,0);if(x.getDay()!==0&&x.getDay()!==6)weekdays.push(String(y)+'-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'))}
 if(weekdays.length<=TURNS_PER_MONTH)return weekdays;
 const out=[];for(let i=0;i<TURNS_PER_MONTH;i++){const idx=Math.round(i*(weekdays.length-1)/(TURNS_PER_MONTH-1)),date=weekdays[idx];if(!out.includes(date))out.push(date)}return out;
}
function nextBusinessTurn(iso){
 const current=businessTurnDatesForMonth(iso),next=current.find(d=>d>iso);if(next)return next;
 const p=iso.slice(0,7).split('-').map(Number),d=new Date(p[0],p[1],1,12,0,0),nextMonth=String(d.getFullYear())+'-'+String(d.getMonth()+1).padStart(2,'0')+'-01';
 return businessTurnDatesForMonth(nextMonth)[0];
}
function turnNumberForDate(iso){const dates=businessTurnDatesForMonth(iso);let best=0;for(let i=0;i<dates.length;i++){if(dates[i]<=iso)best=i;else break}return Math.min(TURNS_PER_MONTH,best+1)}
function deadlineLabel(key){const p=key.split('-').map(Number),d=new Date(p[0],p[1]-1,1,12,0,0);return 'End of '+d.toLocaleDateString('en-US',{month:'long',year:'numeric'})+' · Turn '+TURNS_PER_MONTH}
function monthKey(iso){return iso.slice(0,7)}
function rollRaidDays(iso){const d=new Date(iso+'T12:00:00'),y=d.getFullYear(),m=d.getMonth(),days=new Date(y,m+1,0).getDate(),count=1+Math.floor(Math.random()*2),set=new Set();while(set.size<count){const n=1+Math.floor(Math.random()*days),x=new Date(y,m,n);if(x.getDay()!==0)set.add(n)}return [...set].sort((a,b)=>a-b)}
function rollStarRaidMonth(iso){const d=new Date(iso+'T12:00:00');d.setMonth(d.getMonth()+4+Math.floor(Math.random()*5));return monthKey(d.toISOString().slice(0,10))}
function pokerRisk(circle){return circle==='working'?.012:circle==='middle'?.007:.003}
const starterContract=()=>({id:'FE-001',customer:'Capital Hardware & Supply Co.',product:'Electric Light Bulbs',quality:'standard',qualityName:'Standard Service',quantity:1000,delivered:0,completed:0,productionQuantity:1000,productionPolicy:'normal',productionState:'queued',price:.20,status:'accepted',deadline:'End of January 1938 · Turn 7',deadlineMonth:'1938-01',deadlinePassed:false,relationship:'Existing customer',history:0,productionSeconds:600});
function nextContractNumber(){return Math.max(1,...S.contracts.concat(S.contractOffers||[]).map(x=>+(String(x.id||'').replace(/\D/g,''))||0))+1}
function contractGrade(q){return contractGrades.find(g=>g.quality===q)||contractGrades[1]}
function contractRunSeconds(qty){return qty<=1500?600:qty<=3000?1200:1800}
function makeContractOffer(){
 const sizeRoll=Math.random(),productionSeconds=sizeRoll<.5?600:sizeRoll<.82?1200:1800;
 const quantity=productionSeconds===600?1000+Math.floor(Math.random()*3)*250:productionSeconds===1200?2000+Math.floor(Math.random()*5)*250:3500+Math.floor(Math.random()*7)*250;
 const customer=contractCustomers[Math.floor(Math.random()*contractCustomers.length)],grade=contractGrades[Math.floor(Math.random()*contractGrades.length)],hist=S.customerHistory?.[customer[0]],loyalty=hist?(hist.completed*2-hist.rejected*2-hist.late):0;
 const guideAdj=.98+Math.random()*.07+Math.max(-.035,Math.min(.045,loyalty*.005));
 const suggestedPrice=+(grade.price*guideAdj).toFixed(3);
 return {id:'FE-'+String(nextContractNumber()).padStart(3,'0'),customer:customer[0],product:'Electric Light Bulbs',requestedQuality:grade.quality,requestedQualityName:grade.qualityName,requestedQuantity:quantity,suggestedPrice,quality:grade.quality,qualityName:grade.qualityName,quantity,delivered:0,completed:0,productionQuantity:quantity,productionPolicy:'normal',productionState:'queued',price:suggestedPrice,status:'offered',deadline:deadlineLabel(monthKey(S.gameDate)),deadlineMonth:monthKey(S.gameDate),deadlinePassed:false,relationship:customer[1],customerTrait:customer[2],history:0,productionSeconds,negotiation:{rounds:0,counter:null,lastProposal:null}};
}
const initial=()=>({version:12,gameDate:'1938-01-03',turnSerial:1,phase:'day',dayRemaining:DAY_SECONDS,paused:false,dayStartCompanyCash:50000,dayStartPersonalCash:12000,dailyReport:null,companyCash:50000,personalCash:12000,ownerDistributionsToday:0,divertedToday:0,unaccountedFunds:0,corporateMisuseCount:0,debt:0,reputation:55,workers:80,machinery:92,workforce:{present:80,late:0,absent:0,skill:68,morale:73,discipline:81,efficiency:1,quality:92},turnConditions:{weather:'Cold and clear',summary:'Cold, clear Washington weather. Roads and utility service are normal.',productionFactor:1,powerOutageSeconds:0},personnelIssue:null,inventory:0,inventoryByGrade:{economy:0,standard:0,long:0},finishedLots:[],pendingQualityClaims:[],lastProductionQuality:null,materials:{copper:6000,glass:6000,tungsten:3500},lastRevenue:0,lastExpenses:0,ledger:[],stocks:makeStocks(),portfolio:makePortfolio(),transactions:[],marketWire:'The Federal Exchange is open. Federal Electric has the opening quotation sheet; closing quotations will be published after the bell.',headline:'INDUSTRY WATCHES RECOVERY WITH CAUTION',story:'Manufacturers enter 1938 balancing weak demand against hopes for renewed industrial activity.',societyStory:'Washington begins another business day of meetings, dinners, private clubs and quiet conversations.',sportsStory:'Capital Race Grounds and licensed boxing results will appear here as the sporting calendar develops.',lastRaceResult:null,lastBoxingResult:null,newsArchive:[],notes:[],contacts:{madamStar:{name:'Madam Star',trust:0,met:false},bookie:{name:'Eddie Doyle, bookmaker',trust:0,met:false},hayes:{name:'Commissioner Arthur Hayes',trust:0,resentment:0,met:false},vale:{name:'Harrison Vale',trust:0,met:false},promoter:{name:'Marty Kane, fight promoter',trust:0,met:false}},raidMonth:'1938-01',raidDays:rollRaidDays('1938-01-03'),starNextRaidMonth:rollStarRaidMonth('1938-01-03'),starRaidOccurred:false,bookieKnown:false,middlePokerUnlocked:false,elitePokerUnlocked:false,pokerWins:{working:0,middle:0,elite:0},pokerSimulated:{working:0,middle:0,elite:0},pokerDay:'1938-01-03',pokerPlayed:{working:0,middle:0,elite:0},lastRaidOutcome:null,contracts:[starterContract()],contractOffers:[],productionQueue:['FE-001'],activeContractId:null,lineStatus:'idle',lineMessage:'No production order is running.',customerHistory:{'Capital Hardware & Supply Co.':{completed:0,rejected:0,late:0}}});
let S=initial(), marketTimer=null, clockTimer=null, autosaveTimer=null, selectedStockTicker=null;
function migrate(x){const fresh=initial();if(!x)return fresh;Object.assign(fresh,x,{version:12});if(!x.gameDate){fresh.gameDate='1938-01-03';fresh.dayRemaining=DAY_SECONDS}fresh.phase=['day','night','report'].includes(x.phase)?x.phase:'day';fresh.paused=!!x.paused;fresh.dayStartCompanyCash=Number.isFinite(+x.dayStartCompanyCash)?+x.dayStartCompanyCash:+fresh.companyCash;fresh.dayStartPersonalCash=Number.isFinite(+x.dayStartPersonalCash)?+x.dayStartPersonalCash:+fresh.personalCash;fresh.dailyReport=x.dailyReport||null;fresh.stocks=makeStocks();for(const [k,v] of Object.entries(x.stocks||{})){if(fresh.stocks[k]){const opening=+v.open||+v.price||fresh.stocks[k].open,visible=+v.price||opening,hidden=+v.hiddenPrice||visible||opening,history=mergeStockHistory(fresh.stocks[k].history,v.history),syntheticPrev=Math.max(1,Math.round(opening/(1+openingGapFor(k,fresh.gameDate,fresh.stocks[k].vol))*100)/100),prevClose=Number.isFinite(+v.prevClose)&&+v.prevClose>0?+v.prevClose:syntheticPrev;Object.assign(fresh.stocks[k],v,{open:opening,price:fresh.phase==='day'?opening:visible,hiddenPrice:hidden,prev:prevClose,prevClose,history})}}fresh.portfolio=makePortfolio();for(const [k,v] of Object.entries(x.portfolio||{})){if(!fresh.portfolio[k])continue;fresh.portfolio[k]=typeof v==='number'?{shares:v,cost:v*(fresh.stocks[k]?.price||0),realized:0}:{shares:+v.shares||0,cost:+v.cost||0,realized:+v.realized||0}}fresh.transactions=x.transactions||[];fresh.newsArchive=x.newsArchive||[];fresh.notes=x.notes||[];fresh.contacts=Object.assign(initial().contacts,x.contacts||{});fresh.raidMonth=x.raidMonth||monthKey(fresh.gameDate);fresh.raidDays=x.raidDays||rollRaidDays(fresh.gameDate);fresh.starNextRaidMonth=x.starNextRaidMonth||rollStarRaidMonth(fresh.gameDate);fresh.starRaidOccurred=!!x.starRaidOccurred;fresh.bookieKnown=!!(x.bookieKnown||fresh.contacts.bookie?.met);fresh.pokerWins=Object.assign({working:0,middle:0,elite:0},x.pokerWins||{});fresh.pokerSimulated=Object.assign({working:0,middle:0,elite:0},x.pokerSimulated||{});fresh.middlePokerUnlocked=!!x.middlePokerUnlocked||!!x.bookieKnown||!!fresh.contacts.bookie?.met;fresh.elitePokerUnlocked=!!x.elitePokerUnlocked;fresh.pokerDay=x.pokerDay||fresh.gameDate;fresh.pokerPlayed=x.pokerPlayed||{working:0,middle:0,elite:0};fresh.contracts=x.contracts||[starterContract()];fresh.contractOffers=x.contractOffers||[];
 fresh.turnSerial=Number.isFinite(+x.turnSerial)?Math.max(1,Math.floor(+x.turnSerial)):1;
 fresh.inventoryByGrade=Object.assign({economy:0,standard:0,long:0},x.inventoryByGrade||{});
 fresh.finishedLots=Array.isArray(x.finishedLots)?x.finishedLots.map(v=>Object.assign({},v)):[];
 if(!fresh.finishedLots.length){for(const q of ['economy','standard','long']){const amount=Math.max(0,+fresh.inventoryByGrade[q]||0);if(amount>0)fresh.finishedLots.push({id:'LEGACY-'+q.toUpperCase(),runId:null,contractId:null,product:'Electric Light Bulbs',quality:q,qualityName:contractGrade(q).qualityName,available:amount,produced:amount,rejected:0,qc:92,latentDefectRate:.006,producedDate:fresh.gameDate})}}
 fresh.pendingQualityClaims=Array.isArray(x.pendingQualityClaims)?x.pendingQualityClaims:[];
 fresh.workforce=Object.assign({present:fresh.workers,late:0,absent:0,skill:68,morale:73,discipline:81,efficiency:1,quality:92},x.workforce||{});
 fresh.turnConditions=Object.assign({weather:'Clear',summary:'Normal operating conditions.',productionFactor:1,powerOutageSeconds:0},x.turnConditions||{});
 fresh.personnelIssue=x.personnelIssue||null;
 fresh.customerHistory=x.customerHistory||{'Capital Hardware & Supply Co.':{completed:0,rejected:0,late:0}};
 for(const c of fresh.contracts.concat(fresh.contractOffers)){if(c.product==='Electric Lamps')c.product='Electric Light Bulbs';if(!fresh.customerHistory[c.customer])fresh.customerHistory[c.customer]={completed:0,rejected:0,late:0,discounted:0,partial:0};if(c.customerTrait==null)c.customerTrait=(contractCustomers.find(v=>v[0]===c.customer)||[])[2]||'balanced';if(c.producedQuality==null)c.producedQuality=c.quality;if(!Number.isFinite(+c.delivered))c.delivered=(c.status==='delivered'||c.status==='delivered-discount')?Math.max(0,+c.quantity||0):0;if(!Number.isFinite(+c.productionQuantity)||+c.productionQuantity<1)c.productionQuantity=Math.max(1,+c.quantity||1);if(!c.productionPolicy)c.productionPolicy='normal';if(!c.deadlineMonth)c.deadlineMonth=monthKey(fresh.gameDate);c.deadline=deadlineLabel(c.deadlineMonth);c.deadlinePassed=!!c.deadlinePassed;if(c.status==='production'||c.status==='complete')c.status='accepted';if(!c.productionState)c.productionState=(c.status==='delivered'||c.status==='delivered-discount')?'complete':(+c.completed>=+c.productionQuantity?'complete':'queued');if(c.status==='offered'){if(c.requestedQuantity==null)c.requestedQuantity=c.quantity;if(c.requestedQuality==null)c.requestedQuality=c.quality;if(c.requestedQualityName==null)c.requestedQualityName=contractGrade(c.requestedQuality).qualityName;if(c.suggestedPrice==null)c.suggestedPrice=+c.price||contractGrade(c.requestedQuality).price;if(!c.negotiation)c.negotiation={rounds:0,counter:null,lastProposal:null}}if(!c.productionSeconds)c.productionSeconds=c.quantity<=1500?600:c.quantity<=3000?1200:1800}
 fresh.productionQueue=(x.productionQueue||fresh.contracts.filter(c=>c.productionState==='queued'||c.productionState==='running'||c.productionState==='paused').map(c=>c.id)).filter(id=>{const c=fresh.contracts.find(v=>v.id===id);return c&&c.status!=='delivered'&&c.status!=='delivered-discount'&&(+c.completed||0)<(+c.productionQuantity||+c.quantity||1)});
 fresh.activeContractId=fresh.productionQueue.includes(x.activeContractId)?x.activeContractId:null;fresh.lineStatus=x.lineStatus||'idle';fresh.lineMessage=x.lineMessage||'No production run is running.';fresh.lastProductionQuality=x.lastProductionQuality||null;
 for(const p of Object.values(fresh.portfolio)){if(p.realized==null)p.realized=0}for(const c of fresh.contracts.concat(fresh.contractOffers||[])){const target=c.quantity<=1500?600:c.quantity<=3000?1200:1800;if(!c.productionSeconds||c.productionSeconds>1800)c.productionSeconds=target}fresh.marketWire='Trading continues on the Federal Exchange. Federal Electric has no live intraday quotation service; the opening sheet remains posted until the closing quotations are published.';return fresh}
function save(silent=true){localStorage.setItem(SAVE_KEY,JSON.stringify(S));updateCashHeader();if(!silent)note('Company books saved.')}
function loadInitial(){const raw=localStorage.getItem(SAVE_KEY)||localStorage.getItem('continentalElectricSave');if(raw){try{S=migrate(JSON.parse(raw));save(true)}catch(e){S=initial()}}}
function displayDate(){return new Date(S.gameDate+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}
function displayHeaderDate(){const d=new Date(S.gameDate+'T12:00:00'),days=['SUN','MON','TUES','WED','THUR','FRI','SAT'],months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];return days[d.getDay()]+', '+months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()}
function displayTurn(){return 'TURN '+turnNumberForDate(S.gameDate)+' OF '+TURNS_PER_MONTH+' THIS MONTH'}
function displayHeaderTurn(){return 'TURN '+turnNumberForDate(S.gameDate)+'/'+TURNS_PER_MONTH}
function clockText(){const t=Math.max(0,Math.ceil(S.dayRemaining)),m=Math.floor(t/60),s=t%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
function businessOpen(){return S.phase==='day'}
const NAV_GROUP_BY_TAB={desk:'desk',factory:'factory',warehouse:'factory',contracts:'factory',market:'markets',news:'markets',notebook:'journal',contactsTab:'journal',infoTab:'journal',helpTab:'journal',racing:'pastimes',washington:'pastimes'};
function syncTopNavigation(id=document.querySelector('.tab.active')?.id||'desk'){const group=NAV_GROUP_BY_TAB[id]||id;document.querySelectorAll('nav button[data-nav-group]').forEach(btn=>btn.classList.toggle('active',btn.dataset.navGroup===group));document.querySelectorAll('.section-tabs button[data-tab]').forEach(btn=>btn.classList.toggle('active',btn.dataset.tab===id))}
function showTab(id){document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));const tab=$('#'+id);if(tab)tab.classList.add('active');syncTopNavigation(id);if(id==='racing'&&!pastimeActivityState.legal)setPastimeActivity('legal','horse');if(id==='washington'&&!pastimeActivityState.illicit)setPastimeActivity('illicit','star')}
const pastimeActivityState={legal:null,illicit:null};
function setPastimeActivity(group,target=null){
 const panels=[...document.querySelectorAll('[data-activity-panel="'+group+'"]')],buttons=[...document.querySelectorAll('[data-activity-group="'+group+'"]')];
 const requested=target?document.querySelector('[data-activity-panel="'+group+'"][data-activity-name="'+target+'"]'):null;
 const wasOpen=!!(requested&&!requested.hidden&&pastimeActivityState[group]===target);
 panels.forEach(p=>p.hidden=true);buttons.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-expanded','false')});pastimeActivityState[group]=null;
 if(target&&!wasOpen&&requested){requested.hidden=false;pastimeActivityState[group]=target;const btn=buttons.find(b=>b.dataset.activityTarget===target);if(btn){btn.classList.add('active');btn.setAttribute('aria-expanded','true')}}
}
window.isPastimeActivityOpen=(group,target)=>pastimeActivityState[group]===target;
document.addEventListener('click',e=>{
 const close=e.target instanceof Element?e.target.closest('[data-activity-close]'):null;
 if(close){setPastimeActivity(close.dataset.activityClose,null);return}
 const btn=e.target instanceof Element?e.target.closest('[data-activity-target][data-activity-group]'):null;
 if(btn)setPastimeActivity(btn.dataset.activityGroup,btn.dataset.activityTarget);
});
function clearPauseLock(){
 document.querySelectorAll('[data-pause-lock="1"]').forEach(el=>{el.disabled=el.dataset.pauseWasDisabled==='1';delete el.dataset.pauseWasDisabled;delete el.dataset.pauseLock});
 document.body.classList.remove('game-paused');
}
function applyPauseLock(){
 document.body.classList.toggle('game-paused',!!S.paused);
 if(!S.paused)return;
 showTab('desk');
 document.querySelectorAll('button, input, select, textarea').forEach(el=>{
  if(el.id==='reset'||el.id==='pauseToggle'){el.disabled=false;return}
  if(el.dataset.pauseLock!=='1'){el.dataset.pauseWasDisabled=el.disabled?'1':'0';el.dataset.pauseLock='1'}
  el.disabled=true;
 });
}
document.addEventListener('click',e=>{
 if(!S.paused)return;
 const target=e.target instanceof Element?e.target.closest('button,[onclick],a[href],input,select,textarea'):null;
 if(!target||target.id==='reset'||target.id==='pauseToggle')return;
 if(!target.closest('main')&&!target.closest('nav'))return;
 e.preventDefault();e.stopImmediatePropagation();
 note('Game is paused. Press PLAY to resume.');
},true);
function updateCashHeader(){const company=$('#headerCompanyCash'),personal=$('#headerPersonalCash');if(company)company.textContent=money(S.companyCash);if(personal)personal.textContent=money(S.personalCash)}
function renderPauseToggle(){const btn=$('#pauseToggle');if(!btn)return;const paused=!!S.paused;btn.textContent=paused?'PLAY':'PAUSE';btn.setAttribute('aria-label',paused?'Play simulation':'Pause simulation');btn.setAttribute('aria-pressed',paused?'true':'false');btn.title=paused?'Play simulation':'Pause simulation';btn.classList.toggle('paused',paused)}
window.updateCashHeader=updateCashHeader;
function accountingExposure(){
 const missing=Math.max(0,+S.unaccountedFunds||0);if(!missing)return 'NONE';
 const base=Math.max(1,S.companyCash+missing),ratio=missing/base,count=+S.corporateMisuseCount||0;
 if(ratio>=.15||count>=8)return 'CRITICAL';
 if(ratio>=.075||count>=5)return 'SERIOUS';
 if(ratio>=.025||count>=3)return 'NOTICEABLE';
 return 'LOW';
}
function renderTreasury(){
 const draw=$('#ownerDrawsToday'),diverted=$('#divertedToday'),missing=$('#unaccountedFunds'),exposure=$('#accountingExposure'),distribution=$('#ownerDistribution'),divert=$('#divertCompanyFunds');
 if(draw)draw.textContent=money(S.ownerDistributionsToday||0);if(diverted)diverted.textContent=money(S.divertedToday||0);if(missing)missing.textContent=money(S.unaccountedFunds||0);if(exposure)exposure.textContent=accountingExposure();
 if(distribution)distribution.disabled=!businessOpen()||S.paused;if(divert)divert.disabled=S.phase==='report'||S.paused;
}
let ipoScaffoldOpen=false;
function companyValueEstimate(){return S.companyCash+S.inventory*.14+Object.values(S.materials).reduce((a,b)=>a+b*.015,0)}
function renderOwnership(){
 const panel=$('#ipoScaffold'),openBtn=$('#exploreIpo');if(!panel||!openBtn)return;
 panel.hidden=!ipoScaffoldOpen;openBtn.setAttribute('aria-expanded',ipoScaffoldOpen?'true':'false');
 const value=$('#ipoCompanyValue'),rep=$('#ipoReputation'),exposure=$('#ipoExposure');
 if(value)value.textContent=money(companyValueEstimate());
 if(rep)rep.textContent=Math.round(S.reputation)+'/100';
 if(exposure)exposure.textContent=accountingExposure();
}
function capacity(){return Math.floor(S.workers*60*(S.machinery/100)*workforceProductionFactor())}
function normalizeProductionTimes(){for(const c of S.contracts.concat(S.contractOffers||[])){const target=c.quantity<=1500?600:c.quantity<=3000?1200:1800;if(!c.productionSeconds||c.productionSeconds>1800)c.productionSeconds=target}}
function portfolioValue(){return Object.entries(S.portfolio).reduce((a,[k,p])=>a+p.shares*S.stocks[k].price,0)}
function portfolioCost(){return Object.values(S.portfolio).reduce((a,p)=>a+p.cost,0)}
function marketIndex(){const current=Object.values(S.stocks).reduce((a,x)=>a+x.price,0),base=stockSeed.reduce((a,x)=>a+x[3],0);return current/base*100}
function signed(n){return (n>=0?'+':'')+n.toFixed(2)+'%'}
function note(t){$('#notice').textContent=t;$('#productionNote').textContent=t}
function render(){
 $('#businessDate').textContent=displayHeaderDate()+' · '+displayHeaderTurn();const appVersion=$('#appVersion');if(appVersion)appVersion.textContent=APP_VERSION;$('#dayClock').textContent=clockText();renderPauseToggle();const phaseName=$('#phaseName');if(phaseName)phaseName.textContent=S.phase==='day'?'BUSINESS DAY':S.phase==='night'?'WASHINGTON NIGHT':'DAILY REPORT';$('#marketStatus').textContent=S.phase==='day'?'EXCHANGE OPEN':S.phase==='night'?'EXCHANGE CLOSED':'BOOKS CLOSED';const quoteHead=$('#quotationHeading'),quoteNote=$('#quotationNote');if(quoteHead)quoteHead.textContent=S.phase==='day'?'Published Quotation Sheet · Opening':'Closing Quotations · Final';if(quoteNote)quoteNote.textContent=S.phase==='day'?'Trading continues behind the scenes, but the opening quotations remain posted until the closing bell. Closing the app freezes the market and world clock.':'The Federal Exchange is closed. Final closing quotations are now posted and remain fixed until the next business morning.';const endBtn=$('#endDay');if(endBtn){endBtn.textContent=S.phase==='day'?'End Business Day Early':S.phase==='night'?'Retire Early':'Daily Report Open';endBtn.disabled=S.phase==='report'};
 updateCashHeader();$('#companyCash').textContent=money(S.companyCash);$('#personalCash').textContent=money(S.personalCash);$('#marketCash').textContent=money(S.personalCash);$('#companyValue').textContent=money(companyValueEstimate());renderOwnership();$('#reputation').textContent=Math.round(S.reputation)+'/100';$('#workers').textContent=S.workers;$('#machinery').textContent=S.machinery.toFixed(1)+'%';$('#capacity').textContent=capacity().toLocaleString();$('#inventory').textContent=Object.values(S.inventoryByGrade).reduce((a,b)=>a+b,0).toLocaleString();$('#dateFoot').textContent=displayDate();$('#paperDate').textContent=displayDate().toUpperCase();$('#headline').textContent=S.headline;$('#story').textContent=S.story;$('#societyStory').textContent=S.societyStory;const sports=$('#sportsStory');if(sports)sports.textContent=S.sportsStory||'No major sporting results reported.';
 const idx=marketIndex();$('#marketIndex').textContent=idx.toFixed(2);$('#marketStory').textContent='Federal Exchange index stands at '+idx.toFixed(2)+'. '+S.marketWire;$('#marketWire').textContent=S.marketWire;const pv=portfolioValue(),ug=pv-portfolioCost();$('#portfolio').textContent=money(pv);$('#unrealized').textContent=cash(ug);$('#unrealized').className=ug>=0?'gain':'loss';
 $('#ledger').innerHTML=S.ledger.slice(-10).reverse().map(x=>'<tr><td>'+x.date+'</td><td>'+money(x.rev)+'</td><td>'+money(x.exp)+'</td><td>'+money(x.rev-x.exp)+'</td></tr>').join('')||'<tr><td colspan="4" class="empty">No closed business days yet.</td></tr>';
 $('#materials').innerHTML=Object.entries(MATERIAL_MARKET).map(([k,m])=>'<tr><td>'+m.name+'</td><td>'+Math.floor(S.materials[k]).toLocaleString()+'</td><td>'+unitCash(m.unitPrice)+'/unit</td><td><div class="material-trade"><input id="material_qty_'+k+'" type="number" min="1" step="1" value="1000" aria-label="'+m.name+' quantity"><div class="trade-buttons"><button onclick="tradeMaterial(\''+k+'\',1)">Buy</button><button onclick="tradeMaterial(\''+k+'\',-1)">Sell</button><button onclick="sellAllMaterial(\''+k+'\')">Sell All</button></div></div></td></tr>').join('');
 renderFactory();renderWarehouse();renderWorkforce();renderContracts();renderStocks();renderHoldings();renderTransactions();renderNotes();renderArchive();renderWashington();renderTreasury();renderDailyReport();applyPauseLock();syncTopNavigation()
}
function wagerSummaryForReport(iso){
 let horse=0,boxing=0,underground=0,tickets=0;
 if(S.racing?.meeting?.date===iso){for(const b of Object.values(S.racing.meeting.bets||{})){if(b?.settled){horse+=b.net||0;tickets++}}}
 if(S.boxing?.card?.date===iso){for(const b of Object.values(S.boxing.card.bets||{})){if(b?.settled){boxing+=b.net||0;tickets++}}}
 if(S.underworld?.events?.date===iso){
   for(const e of [S.underworld.events.privateFight,S.underworld.events.cockfight]){if(e?.bet?.settled){underground+=e.bet.net||0;tickets++}}
 }
 return {horse,boxing,underground,net:horse+boxing+underground,tickets};
}
function renderDailyReport(){
 const panel=$('#dailyReportOverlay');if(!panel)return;
 if(S.phase!=='report'||!S.dailyReport){panel.hidden=true;return}
 const r=S.dailyReport,w=wagerSummaryForReport(r.iso),personalEnd=r.personalEnd??S.personalCash,companyEnd=r.companyEnd??r.companyClose??S.companyCash;
 const notes=S.notes.filter(n=>n.date===r.date).slice(-10);
 const events=notes.length?'<div class="report-events"><h4>Notable events</h4>'+notes.map(n=>'<div><b>'+escapeHtml(n.source||'record')+'</b><span>'+escapeHtml(n.text)+'</span></div>').join('')+'</div>':'<div class="report-events"><h4>Notable events</h4><p class="fine">No additional events were entered in the record.</p></div>';
 panel.hidden=false;$('#dailyReportDate').textContent=r.date||displayDate();
 $('#dailyReportBody').innerHTML='<div class="report-grid">'+
 '<article><b>Company opening cash</b><span>'+money(r.openingCompanyCash||0)+'</span></article>'+
 '<article><b>Company closing cash</b><span>'+money(companyEnd)+'</span></article>'+
 '<article><b>Revenue</b><span>'+money(r.revenue||0)+'</span></article>'+
 '<article><b>Expenses</b><span>'+money(r.expenses||0)+'</span></article>'+
 '<article><b>Company net</b><span>'+cash((r.revenue||0)-(r.expenses||0))+'</span></article>'+
 '<article><b>Personal opening cash</b><span>'+money(r.openingPersonalCash||0)+'</span></article>'+
 '<article><b>Personal closing cash</b><span>'+money(personalEnd)+'</span></article>'+
 '<article><b>Personal cash change</b><span>'+cash(personalEnd-(r.openingPersonalCash||0))+'</span></article>'+
 '<article><b>Recorded owner distributions</b><span>'+money(r.ownerDistributions||0)+'</span></article>'+
 '<article><b>Diverted company funds</b><span>'+money(r.divertedFunds||0)+'</span></article>'+
 '<article><b>Unaccounted company funds</b><span>'+money(r.unaccountedFunds||0)+'</span></article>'+
 '<article><b>Accounting exposure</b><span>'+escapeHtml(r.accountingExposure||'NONE')+'</span></article>'+
 '<article><b>Stock trades</b><span>'+(r.stockTrades||0)+'</span></article>'+
 '<article><b>Realized stock P/L</b><span>'+cash(r.stockRealized||0)+'</span></article>'+
 '<article><b>Held-stock day move</b><span>'+cash(r.stockPositionMove||0)+'</span></article>'+
 '<article><b>Federal Exchange close</b><span>'+((r.marketCloseIndex||marketIndex()).toFixed(2))+'</span></article>'+
 '<article><b>Horse-racing net</b><span>'+cash(w.horse)+'</span></article>'+
 '<article><b>Licensed-boxing net</b><span>'+cash(w.boxing)+'</span></article>'+
 '<article><b>Underground betting net</b><span>'+cash(w.underground)+'</span></article>'+
 '<article><b>Settled wagers</b><span>'+w.tickets+'</span></article>'+
 '<article><b>Total wager net</b><span>'+cash(w.net)+'</span></article>'+
 '<article><b>Portfolio at close</b><span>'+money(r.portfolioEnd||r.portfolioAtMarketClose||0)+'</span></article>'+
 '<article><b>Reputation</b><span>'+Math.round(S.reputation)+'/100</span></article>'+
 '</div>'+events+'<p class="fine">This is Federal Electric\'s private accounting of the completed date. The Metropolitan Ledger appears only after you retire and the next business morning begins.</p>';
}

const productionPolicies={quality:{label:'Quality Priority',speed:.88,defects:.55},normal:{label:'Normal Production',speed:1,defects:1},rush:{label:'Rush Production',speed:1.18,defects:1.9}};
function activeContract(){return S.contracts.find(x=>x.id===S.activeContractId)||null}
function queuedContracts(){return S.productionQueue.map(id=>S.contracts.find(c=>c.id===id)).filter(c=>c&&c.status!=='delivered'&&c.status!=='delivered-discount')}
function productionTarget(c){const n=Math.floor(Number(c.productionQuantity));return Number.isFinite(n)&&n>0?n:Math.max(1,c.quantity)}
function productionPolicyCfg(c){return productionPolicies[c?.productionPolicy]||productionPolicies.normal}
function workforceProductionFactor(){const wf=S.workforce||{},cond=S.turnConditions||{};return clamp((Number.isFinite(+wf.efficiency)?+wf.efficiency:1)*(Number.isFinite(+cond.productionFactor)?+cond.productionFactor:1),.35,1.15)}
function productionRunSeconds(c){const target=productionTarget(c),base=c.productionSeconds||contractRunSeconds(c.quantity);return Math.max(1,base*(target/Math.max(1,c.quantity)))}
function remainingProductionSeconds(c){const target=productionTarget(c),left=Math.max(0,target-(+c.completed||0)),base=productionRunSeconds(c)*(left/Math.max(1,target)),factor=(S.machinery/92)*workforceProductionFactor()*productionPolicyCfg(c).speed;return Math.max(0,base/Math.max(.2,factor))}
function recomputeWorkforce(){
 const w=S.workforce||(S.workforce={present:S.workers,late:0,absent:0,skill:68,morale:73,discipline:81,efficiency:1,quality:92}),scheduled=Math.max(1,S.workers),attendance=clamp((w.present-(w.late||0)*.35)/scheduled,.35,1);
 w.efficiency=clamp(attendance*(.72+(w.skill||68)/400+(w.morale||73)/650+(w.discipline||81)/900),.45,1.08);
 w.quality=clamp((w.skill||68)*.32+(w.morale||73)*.16+(w.discipline||81)*.17+S.machinery*.35,45,99);
}
function generateTurnConditions(){
 const m=new Date(S.gameDate+'T12:00:00').getMonth()+1,winter=m<=3||m>=11,summer=m>=6&&m<=8,r=Math.random();let weather='Clear',summary='Normal weather and transportation conditions.',prod=1,extraAbsent=0,extraLate=0,outage=0;
 if(winter&&r<.12){weather='Ice storm';summary='Ice has made roads dangerous and damaged utility lines.';prod=.84;extraAbsent=6+Math.floor(Math.random()*7);extraLate=8+Math.floor(Math.random()*10);if(Math.random()<.6)outage=300+Math.floor(Math.random()*601)}
 else if(winter&&r<.3){weather='Heavy snow';summary='Heavy snow is disrupting worker travel and freight movement.';prod=.9;extraAbsent=3+Math.floor(Math.random()*6);extraLate=7+Math.floor(Math.random()*9)}
 else if(winter&&r<.46){weather='Severe cold';summary='Severe cold is slowing the morning start and increasing absenteeism.';prod=.94;extraAbsent=2+Math.floor(Math.random()*4);extraLate=3+Math.floor(Math.random()*6)}
 else if(summer&&r<.16){weather='Heat wave';summary='Heat is reducing shop-floor efficiency and increasing machinery strain.';prod=.9;extraAbsent=1+Math.floor(Math.random()*3)}
 else if(r<.09){weather='Severe thunderstorm';summary='Storms are disrupting deliveries and threatening utility service.';prod=.93;extraLate=2+Math.floor(Math.random()*5);if(Math.random()<.35)outage=180+Math.floor(Math.random()*481)}
 else if(r<.2){weather='Heavy rain';summary='Heavy rain is slowing traffic and freight around Washington.';prod=.97;extraLate=2+Math.floor(Math.random()*5)}
 const absent=Math.min(S.workers,Math.floor(Math.random()*3)+extraAbsent),late=Math.min(Math.max(0,S.workers-absent),Math.floor(Math.random()*4)+extraLate),present=Math.max(0,S.workers-absent);
 S.workforce=Object.assign({skill:68,morale:73,discipline:81},S.workforce||{},{present,absent,late});
 S.turnConditions={weather,summary,productionFactor:prod,powerOutageSeconds:outage};recomputeWorkforce();
 if(!S.personnelIssue&&Math.random()<.09){const names=['Thomas Miller','Frank Walsh','George Carter','Samuel Reed','Henry Collins','Arthur Bennett'],name=names[Math.floor(Math.random()*names.length)],kind=Math.random()<.55?'Repeated tardiness':'Poor workmanship';S.personnelIssue={name,role:'Assembly worker',kind,detail:kind==='Repeated tardiness'?'The foreman reports repeated late arrivals under otherwise normal circumstances.':'The foreman reports repeated missed inspections and careless assembly work.'}}
}
function renderWorkforce(){
 const w=S.workforce||{};for(const [id,val] of [['workersPresent',Math.max(0,Math.floor(w.present||0))],['workersLate',Math.max(0,Math.floor(w.late||0))],['workersAbsent',Math.max(0,Math.floor(w.absent||0))],['workerSkill',Math.round(w.skill||0)+'/100'],['workerMorale',Math.round(w.morale||0)+'/100'],['workerDiscipline',Math.round(w.discipline||0)+'/100'],['workerEfficiency',Math.round((w.efficiency||0)*100)+'%'],['workerQuality',Math.round(w.quality||0)+'/100']]){const el=$('#'+id);if(el)el.textContent=val}
 const weather=$('#weatherSummary');if(weather){const c=S.turnConditions||{};weather.innerHTML='<b>'+escapeHtml(c.weather||'Normal conditions')+'</b> · '+escapeHtml(c.summary||'')+(c.powerOutageSeconds>0?' <span class="loss">Utility outage in effect: about '+Math.ceil(c.powerOutageSeconds/60)+' min remaining.</span>':'')}
 const matter=$('#personnelMatter');if(matter){const p=S.personnelIssue;if(!p)matter.innerHTML='<p class="empty">No personnel matter currently requires executive attention.</p>';else matter.innerHTML='<div><b>'+escapeHtml(p.name)+'</b> · '+escapeHtml(p.role)+'</div><p><strong>'+escapeHtml(p.kind)+'</strong> — '+escapeHtml(p.detail)+'</p><div class="actions"><button onclick="resolvePersonnelIssue(\'ignore\')">Ignore</button><button onclick="resolvePersonnelIssue(\'verbal\')">Verbal Warning</button><button onclick="resolvePersonnelIssue(\'formal\')">Formal Warning</button><button onclick="resolvePersonnelIssue(\'suspend\')">Suspend</button><button onclick="resolvePersonnelIssue(\'dismiss\')">Dismiss</button></div>'}
}
window.resolvePersonnelIssue=action=>{const p=S.personnelIssue;if(!p)return;const w=S.workforce;if(action==='ignore'){w.discipline=clamp(w.discipline-2,0,100);w.morale=clamp(w.morale+.5,0,100)}else if(action==='verbal'){w.discipline=clamp(w.discipline+1,0,100);w.morale=clamp(w.morale-.25,0,100)}else if(action==='formal'){w.discipline=clamp(w.discipline+2,0,100);w.morale=clamp(w.morale-1,0,100)}else if(action==='suspend'){w.discipline=clamp(w.discipline+3,0,100);w.morale=clamp(w.morale-2,0,100);w.present=Math.max(0,(w.present||S.workers)-1)}else if(action==='dismiss'){S.workers=Math.max(1,S.workers-1);w.present=Math.min(w.present||S.workers,S.workers);w.discipline=clamp(w.discipline+2,0,100);w.morale=clamp(w.morale-1,0,100)}S.notes.push({date:displayDate(),text:'Personnel action: '+action+' regarding '+p.name+' ('+p.kind+').',source:'company personnel file'});S.personnelIssue=null;recomputeWorkforce();save();render()}
function nextLotNumber(){return 1+Math.max(0,...(S.finishedLots||[]).map(l=>+(String(l.id||'').replace(/\D/g,''))||0))}
function ensureFinishedLot(c,q){if(!S.finishedLots)S.finishedLots=[];let lot=S.finishedLots.find(l=>l.id===c.currentLotId&&l.quality===q);if(lot)return lot;lot={id:'FE-LOT-'+String(nextLotNumber()).padStart(4,'0'),runId:c.id,contractId:c.id,product:c.product||'Electric Light Bulbs',quality:q,qualityName:contractGrade(q).qualityName,available:0,produced:0,rejected:0,qc:100,latentDefectRate:0,producedDate:S.gameDate,producedTurn:S.turnSerial};S.finishedLots.push(lot);c.currentLotId=lot.id;return lot}
function renderWarehouse(){
 const totals=$('#warehouseTotals');if(totals)totals.innerHTML=['economy','standard','long'].map(q=>'<tr><td>'+escapeHtml(contractGrade(q).qualityName)+'</td><td>'+Math.floor(S.inventoryByGrade[q]||0).toLocaleString()+'</td></tr>').join('');
 const lots=$('#warehouseLots');if(lots)lots.innerHTML=(S.finishedLots||[]).filter(l=>(l.available||0)>0).slice().reverse().map(l=>'<tr><td>'+escapeHtml(l.id)+'</td><td>'+escapeHtml(l.qualityName||contractGrade(l.quality).qualityName)+'</td><td>'+Math.floor(l.available||0).toLocaleString()+'</td><td>'+Math.round(l.qc||0)+'/100</td><td>'+escapeHtml(l.producedDate||'')+'</td></tr>').join('')||'<tr><td colspan="5" class="empty">No finished goods are currently in the warehouse.</td></tr>'
}
function renderFactory(){
 const x=activeContract()||queuedContracts()[0],q=queuedContracts(),required=q.reduce((a,c)=>a+remainingProductionSeconds(c),0),closed=!businessOpen();
 $('#queueSummary').innerHTML=businessOpen()?'<b>Queued production:</b> '+Math.ceil(required/60)+' min estimated · <b>Business day remaining:</b> '+Math.ceil(S.dayRemaining/60)+' min'+(required>S.dayRemaining?' <span class="loss">⚠ Commitments exceed remaining production time by '+Math.ceil((required-S.dayRemaining)/60)+' min.</span>':''):'<b>Works closed:</b> regular production resumes next Business Day.';
 $('#productionQueue').innerHTML=q.map((c,i)=>'<div class="queue-row '+(c.id===S.activeContractId?'queue-active':'')+'"><b>#'+(i+1)+' '+escapeHtml(c.id)+'</b><span>'+escapeHtml(c.customer)+'</span><span>'+escapeHtml(c.qualityName)+' · '+escapeHtml((c.productionState||'queued').toUpperCase())+'</span><span>'+Math.floor(c.completed||0).toLocaleString()+' / '+productionTarget(c).toLocaleString()+' · ~'+Math.ceil(remainingProductionSeconds(c)/60)+' min</span><div><button onclick="switchProduction(\''+c.id+'\')" '+(closed||c.id===S.activeContractId&&S.lineStatus==='running'?'disabled':'')+'>Run</button><button onclick="moveQueue(\''+c.id+'\',-1)" '+(i===0||c.id===S.activeContractId?'disabled':'')+'>↑</button><button onclick="moveQueue(\''+c.id+'\',1)" '+(i===q.length-1||c.id===S.activeContractId?'disabled':'')+'>↓</button></div></div>').join('')||'<p class="empty">Production queue is empty.</p>';
 if(!x){$('#factoryOrder').innerHTML='<p class="empty">No production run is currently queued.</p>';$('#productionFill').style.width='0%';$('#productionPercent').textContent='0%';$('#productionCount').textContent='0 / 0 manufactured';$('#lineStatus').textContent=closed?'WORKS CLOSED':'NO RUN ACTIVE';$('#startProduction').disabled=true;$('#resumeProduction').disabled=true;const pb=$('#pauseProduction');if(pb)pb.disabled=true;const ab=$('#abandonProduction');if(ab)ab.disabled=true;$('#maintain').disabled=closed;return}
 const target=productionTarget(x),pct=Math.min(100,(+x.completed||0)/target*100),policy=productionPolicyCfg(x);
 $('#factoryOrder').innerHTML='<div class="order-grid"><b>Linked Contract</b><span>'+escapeHtml(x.id)+' · '+escapeHtml(x.customer)+'</span><b>Product</b><span>'+escapeHtml(x.product)+'</span><b>Required Quality</b><span>'+escapeHtml(x.qualityName)+'</span><b>Production Grade</b><span><select id="productionGrade" onchange="setProductionGrade(\''+x.id+'\',this.value)" '+(closed||x.productionState==='running'?'disabled':'')+'>'+contractGrades.map(g=>'<option value="'+g.quality+'" '+((x.producedQuality||x.quality)===g.quality?'selected':'')+'>'+g.qualityName+'</option>').join('')+'</select></span><b>Production Policy</b><span><select id="productionPolicy" onchange="setProductionPolicy(\''+x.id+'\',this.value)" '+(closed||x.productionState==='running'?'disabled':'')+'>'+Object.entries(productionPolicies).map(([k,v])=>'<option value="'+k+'" '+((x.productionPolicy||'normal')===k?'selected':'')+'>'+v.label+'</option>').join('')+'</select></span><b>Contract Quantity</b><span>'+x.quantity.toLocaleString()+'</span><b>Delivered</b><span>'+Math.floor(x.delivered||0).toLocaleString()+'</span><b>Production Target</b><span><input id="productionQuantity" type="number" min="'+Math.max(1,Math.ceil(x.completed||0))+'" step="1" value="'+target+'" oninput="setProductionQuantity(\''+x.id+'\',this.value)" '+(closed||x.productionState==='running'?'disabled':'')+'></span><b>Manufactured</b><span>'+Math.floor(x.completed||0).toLocaleString()+'</span><b>Estimated Run</b><span id="productionRunEstimate">'+Math.ceil(remainingProductionSeconds(x)/60)+' min</span><b>Deadline</b><span>'+escapeHtml(x.deadline)+'</span></div><p class="fine">'+policy.label+' affects production speed and defect risk. Finished bulbs enter the Warehouse as they are manufactured; nothing is shipped automatically.</p>';
 $('#productionFill').style.width=pct.toFixed(2)+'%';$('#productionPercent').textContent=pct.toFixed(1)+'%';$('#productionCount').textContent=Math.floor(x.completed||0).toLocaleString()+' / '+target.toLocaleString()+' manufactured';
 $('#lineStatus').textContent=S.lineStatus==='running'?'LINE RUNNING':S.lineStatus==='awaiting'?'LINE STOPPED · AWAITING EXECUTIVE DECISION':x.productionState==='paused'?'RUN PAUSED':x.productionState==='abandoned'?'RUN STOPPED':x.productionState==='complete'?'RUN COMPLETE':'READY TO START';
 $('#startProduction').disabled=closed||S.lineStatus==='running'||x.productionState==='complete';$('#resumeProduction').disabled=closed||S.lineStatus!=='awaiting';const pb=$('#pauseProduction');if(pb)pb.disabled=closed||S.lineStatus!=='running';const ab=$('#abandonProduction');if(ab)ab.disabled=closed||(+x.completed||0)>=target;$('#maintain').disabled=closed
}
function customerTraitFor(name){const row=contractCustomers.find(x=>x[0]===name);return row?row[2]:'balanced'}
function customerHistory(name){if(!S.customerHistory[name])S.customerHistory[name]={completed:0,rejected:0,late:0,discounted:0,partial:0};return S.customerHistory[name]}
function renderContracts(){
 const el=$('#contractList'),closed=!businessOpen();const seek=$('#seekContractsBtn');if(seek)seek.disabled=closed;
 el.innerHTML=S.contracts.map(x=>{const trait=customerTraits[x.customerTrait||customerTraitFor(x.customer)],delivered=Math.floor(x.delivered||0),remaining=Math.max(0,x.quantity-delivered),matching=Math.floor(S.inventoryByGrade[x.quality]||0),open=remaining>0&&x.status!=='cancelled',queueing=S.productionQueue.includes(x.id);return '<div class="sheet contract-card"><div><span class="tag">'+x.id+'</span> <b>'+escapeHtml(x.customer)+'</b></div><h3>'+x.quantity.toLocaleString()+' '+escapeHtml(x.qualityName)+' '+escapeHtml(x.product)+'</h3><div class="contract-grid"><span>Buyer</span><b>'+trait.label+'</b><span>Agreed price</span><b>'+cash(x.price)+'/unit</b><span>Gross value</span><b>'+cash(x.quantity*x.price)+'</b><span>Deadline</span><b>'+escapeHtml(x.deadline)+'</b><span>Status</span><b>'+escapeHtml((x.status||'accepted').toUpperCase())+'</b><span>Delivered</span><b>'+delivered.toLocaleString()+' / '+x.quantity.toLocaleString()+'</b><span>Remaining due</span><b>'+remaining.toLocaleString()+'</b><span>Matching warehouse stock</span><b>'+matching.toLocaleString()+'</b><span>Manufactured on linked run</span><b>'+Math.floor(x.completed||0).toLocaleString()+'</b></div>'+(open?'<div class="contract-proposal"><label>Ship quantity<input id="ship_qty_'+x.id+'" type="number" min="1" max="'+remaining+'" step="1" value="'+Math.max(1,Math.min(remaining,matching||remaining))+'"></label><label>Ship grade<select id="ship_grade_'+x.id+'">'+contractGrades.map(g=>'<option value="'+g.quality+'" '+(g.quality===x.quality?'selected':'')+'>'+g.qualityName+' · '+Math.floor(S.inventoryByGrade[g.quality]||0).toLocaleString()+' in warehouse</option>').join('')+'</select></label></div><div class="actions"><button onclick="shipFromWarehouse(\''+x.id+'\')" '+(closed?'disabled':'')+'>Ship from Warehouse</button><button onclick="queueContractProduction(\''+x.id+'\')" '+(closed||queueing?'disabled':'')+'>'+(queueing?'Production Queued':'Queue / Resume Production')+'</button></div><p class="fine">Production and delivery are separate. Goods may remain in the warehouse until you choose to ship them, up to the contract deadline.</p>':'')+'</div>'}).join('');
 $('#contractOffers').innerHTML=(S.contractOffers||[]).map(x=>{
  const trait=customerTraits[x.customerTrait||customerTraitFor(x.customer)],h=customerHistory(x.customer),n=x.negotiation||{rounds:0,counter:null,lastProposal:null},counter=n.counter;
  const proposal=counter||n.lastProposal||{quantity:x.requestedQuantity,quality:x.requestedQuality,price:x.suggestedPrice};
  const counterBox=counter?'<div class="contract-counter"><b>CUSTOMER COUNTER</b><span>'+counter.quantity.toLocaleString()+' '+escapeHtml(contractGrade(counter.quality).qualityName)+' bulbs at '+cash(counter.price)+'/unit</span><button onclick="acceptContractCounter(\''+x.id+'\')" '+(closed?'disabled':'')+'>Accept Counter · 1 min</button></div>':'';
  return '<div class="sheet contract-card offer-card"><div><span class="tag">'+x.id+'</span> <b>'+escapeHtml(x.customer)+'</b></div><h3>Purchase Request</h3><div class="contract-grid"><span>Customer requests</span><b>'+x.requestedQuantity.toLocaleString()+' '+escapeHtml(x.requestedQualityName)+' bulbs</b><span>Buyer</span><b>'+trait.label+'</b><span>Prior correct orders</span><b>'+h.completed+'</b><span>Federal Electric suggested quote</span><b>'+cash(x.suggestedPrice)+'/unit</b><span>Deadline</span><b>'+escapeHtml(x.deadline)+'</b></div>'+counterBox+'<div class="contract-proposal"><label>Offer quantity<input id="proposal_qty_'+x.id+'" type="number" min="1" step="1" value="'+Math.max(1,Math.floor(proposal.quantity))+'"></label><label>Offer grade<select id="proposal_grade_'+x.id+'">'+contractGrades.map(g=>'<option value="'+g.quality+'" '+(proposal.quality===g.quality?'selected':'')+'>'+g.qualityName+'</option>').join('')+'</select></label><label>Price / unit<input id="proposal_price_'+x.id+'" type="number" min="0.001" step="0.001" value="'+Number(proposal.price).toFixed(3)+'"></label></div><div class="actions"><button onclick="submitContractProposal(\''+x.id+'\')" '+(closed?'disabled':'')+'>Submit Proposal · 1 min</button><button onclick="declineContract(\''+x.id+'\')" '+(closed?'disabled':'')+'>Decline Request</button></div><p class="fine">Federal Electric sets the proposed quantity, grade and price. The buyer may accept, reject, or return a counteroffer.</p></div>';
 }).join('')||'<p class="empty">No open customer requests on the desk. Seek new business to look for contracts.</p>';
 $('#customerRecord').innerHTML=Object.entries(S.customerHistory).map(([name,h])=>'<div class="customer-record"><b>'+escapeHtml(name)+'</b><span>'+customerTraits[customerTraitFor(name)].label+' · Correct: '+h.completed+' · Discounted: '+(h.discounted||0)+' · Rejected: '+h.rejected+' · Late/short: '+h.late+'</span></div>').join('');
}
window.seekContracts=()=>{
 if(S.paused)return note('Game is paused.');
 if(!businessOpen())return note('Business offices are closed for the night.');
 if(S.dayRemaining<120)return note('There is not enough time left today to seek new contracts.');
 window.advanceWorldTime(120,true);
 const roll=Math.random(),count=roll<.28?0:roll<.62?1:roll<.87?2:3;
 S.contractOffers=[];
 for(let i=0;i<count;i++){const o=makeContractOffer();while(S.contractOffers.some(x=>x.id===o.id))o.id='FE-'+String(nextContractNumber()+i).padStart(3,'0');S.contractOffers.push(o)}
 note(count?count+' new customer request'+(count===1?'':'s')+' located. Seeking business consumed 2 minutes.':'No suitable customer requests were located this time. Seeking business consumed 2 minutes.');
 save();render();
}
function negotiationProfile(key){return {balanced:{price:.09,qty:.14,lower:false},forgiving:{price:.14,qty:.24,lower:true},strict:{price:.05,qty:.06,lower:false},price:{price:.035,qty:.14,lower:true},quality:{price:.08,qty:.08,lower:false},impatient:{price:.12,qty:.20,lower:true}}[key]||{price:.09,qty:.14,lower:false}}
function proposalFromInputs(id){
 const q=Math.floor(Number(document.getElementById('proposal_qty_'+id)?.value)),quality=document.getElementById('proposal_grade_'+id)?.value,price=Number(document.getElementById('proposal_price_'+id)?.value);
 if(!Number.isFinite(q)||q<1||!contractGrades.some(g=>g.quality===quality)||!Number.isFinite(price)||price<=0)return null;
 return {quantity:q,quality,price:+price.toFixed(3)};
}
function finalizeContractOffer(x,terms,source){
 S.contractOffers=S.contractOffers.filter(o=>o.id!==x.id);
 x.quantity=terms.quantity;x.quality=terms.quality;x.qualityName=contractGrade(terms.quality).qualityName;x.price=terms.price;x.completed=0;x.delivered=0;x.productionQuantity=terms.quantity;x.productionPolicy='normal';x.productionState='queued';x.status='accepted';x.deadlineMonth=monthKey(S.gameDate);x.deadline=deadlineLabel(x.deadlineMonth);x.deadlinePassed=false;x.productionSeconds=contractRunSeconds(terms.quantity);x.producedQuality=x.quality;x.negotiation={...(x.negotiation||{}),counter:null};
 S.contracts.push(x);S.productionQueue.push(x.id);if(!S.customerHistory[x.customer])S.customerHistory[x.customer]={completed:0,rejected:0,late:0,discounted:0,partial:0};
 S.notes.push({date:displayDate(),text:x.customer+' and Federal Electric agreed to '+terms.quantity.toLocaleString()+' '+x.qualityName+' light bulbs at '+cash(terms.price)+' per unit under '+x.id+'. Delivery is due by '+x.deadline+'.',source:'contract negotiation'});
 note(x.id+' accepted at '+cash(terms.price)+'/unit and added to the production queue'+(source==='counter'?' from the customer counteroffer.':'.'));save();render();
}
window.submitContractProposal=id=>{
 if(S.paused)return note('Game is paused.');
 if(!businessOpen())return note('Contract offices are closed for the night.');
 if(S.dayRemaining<60)return note('There is not enough time left today to negotiate this request.');
 const x=S.contractOffers.find(o=>o.id===id);if(!x)return;
 const p=proposalFromInputs(id);if(!p)return note('Enter a valid quantity, grade and positive price.');
 window.advanceWorldTime(60,true);
 const key=x.customerTrait||customerTraitFor(x.customer),profile=negotiationProfile(key),requestedGrade=contractGrade(x.requestedQuality),proposedGrade=contractGrade(p.quality),rank={economy:0,standard:1,long:2},qtyDiff=Math.abs(p.quantity-x.requestedQuantity)/Math.max(1,x.requestedQuantity),relationshipAdj=clamp((x.suggestedPrice||requestedGrade.price)/requestedGrade.price,.94,1.08),fairPrice=proposedGrade.price*relationshipAdj,priceRatio=p.price/fairPrice,lowerGrade=rank[p.quality]<rank[x.requestedQuality],n=x.negotiation||(x.negotiation={rounds:0,counter:null,lastProposal:null});
 n.rounds++;n.lastProposal=p;n.counter=null;
 const acceptableGrade=!lowerGrade||profile.lower,inside=priceRatio<=1+profile.price&&qtyDiff<=profile.qty&&acceptableGrade;
 const acceptanceChance=clamp(.78+(1-priceRatio)*.8-qtyDiff*.7+(rank[p.quality]-rank[x.requestedQuality])*.05+Math.min(.08,(customerHistory(x.customer).completed||0)*.015),.18,.96);
 if(inside&&Math.random()<acceptanceChance){return finalizeContractOffer(x,p,'proposal')}
 const clearlyUnacceptable=priceRatio>1+profile.price*3||qtyDiff>Math.max(.45,profile.qty*3)||(lowerGrade&&!profile.lower&&rank[x.requestedQuality]-rank[p.quality]>0&&key==='quality');
 if(clearlyUnacceptable&&Math.random()<.7){
  S.contractOffers=S.contractOffers.filter(o=>o.id!==id);S.notes.push({date:displayDate(),text:x.customer+' rejected Federal Electric\'s proposal for '+x.id+'.',source:'contract negotiation'});note(x.customer+' rejected the proposal and withdrew the request.');save();render();return;
 }
 const counterQuality=lowerGrade&&!profile.lower?x.requestedQuality:p.quality,counterQty=Math.max(1,Math.round(((p.quantity+x.requestedQuantity*2)/3)/50)*50),counterFair=contractGrade(counterQuality).price*relationshipAdj,counterPrice=+Math.min(p.price,counterFair*(1+profile.price*.35)).toFixed(3);
 n.counter={quantity:counterQty,quality:counterQuality,price:counterPrice};
 S.notes.push({date:displayDate(),text:x.customer+' returned a counteroffer on '+x.id+': '+counterQty.toLocaleString()+' '+contractGrade(counterQuality).qualityName+' bulbs at '+cash(counterPrice)+' per unit.',source:'contract negotiation'});
 note(x.customer+' returned a counteroffer. You may accept it or revise Federal Electric\'s proposal.');save();render();
}
window.acceptContractCounter=id=>{
 if(S.paused)return note('Game is paused.');
 if(!businessOpen())return note('Contract offices are closed for the night.');
 if(S.dayRemaining<60)return note('There is not enough time left today to complete this negotiation.');
 const x=S.contractOffers.find(o=>o.id===id),counter=x?.negotiation?.counter;if(!x||!counter)return;
 window.advanceWorldTime(60,true);finalizeContractOffer(x,counter,'counter');
}
window.declineContract=id=>{if(S.paused)return note('Game is paused.');if(!businessOpen())return note('Contract offices are closed for the night.');S.contractOffers=S.contractOffers.filter(x=>x.id!==id);note(id+' declined.');save();render()}
window.setProductionGrade=(id,q)=>{if(!businessOpen())return note('The works are closed for the night.');const x=S.contracts.find(c=>c.id===id);if(!x||x.productionState==='running')return;x.producedQuality=q;x.currentLotId=null;save();renderFactory()}
window.setProductionPolicy=(id,p)=>{if(!businessOpen())return note('The works are closed for the night.');const x=S.contracts.find(c=>c.id===id);if(!x||x.productionState==='running'||!productionPolicies[p])return;x.productionPolicy=p;save();renderFactory()}
window.setProductionQuantity=(id,value)=>{if(!businessOpen())return note('The works are closed for the night.');const x=S.contracts.find(c=>c.id===id);if(!x||x.productionState==='running')return;const qty=Math.floor(Number(value)),minimum=Math.max(1,Math.ceil(x.completed||0));if(!Number.isFinite(qty)||qty<minimum)return;x.productionQuantity=qty;if(qty>(x.completed||0)&&!S.productionQueue.includes(id)&&x.status!=='delivered'&&x.status!=='delivered-discount'){S.productionQueue.push(id);x.productionState='queued'}save();renderFactory()}
function activateProduction(x){if(!x)return;S.activeContractId=x.id;const q=x.producedQuality||x.quality;if(S.lastProductionQuality&&S.lastProductionQuality!==q){window.advanceWorldTime(60,false);S.lineMessage='Works changed tooling from '+S.lastProductionQuality+' to '+q+' production. 1 minute setup time used.'}else S.lineMessage='Production run started for '+x.customer+'.';S.lastProductionQuality=q;x.productionState='running';S.lineStatus='running'}
window.switchProduction=id=>{if(!businessOpen())return note('The works are closed for the night.');const next=S.contracts.find(c=>c.id===id);if(!next)return;if(!S.productionQueue.includes(id))S.productionQueue.push(id);const current=activeContract();if(current&&current.id!==id&&(current.productionState==='running'||S.lineStatus==='awaiting')){const msg='Production line is currently assigned to '+current.id+'. '+Math.floor(current.completed||0).toLocaleString()+' of '+productionTarget(current).toLocaleString()+' units have been manufactured. Switch production? Completed bulbs will remain in the Warehouse and this run will be paused.';if(!confirm(msg))return;current.productionState='paused';S.lineStatus='idle';S.activeContractId=null}if(current&&current.id===id){if(current.productionState==='paused'){activateProduction(current);note(S.lineMessage);save();render()}return}activateProduction(next);note(S.lineMessage);save();render()}
window.queueContractProduction=id=>{if(!businessOpen())return note('The works are closed for the night.');const x=S.contracts.find(c=>c.id===id);if(!x||x.status==='delivered'||x.status==='delivered-discount')return;if(!S.productionQueue.includes(id))S.productionQueue.push(id);if((x.completed||0)>=productionTarget(x))x.productionQuantity=Math.max(Math.ceil(x.completed||0)+Math.max(1,x.quantity-(x.delivered||0)),Math.ceil(x.completed||0)+1);x.productionState='queued';save();render();showTab('factory');note(x.id+' is queued for production.')}
window.pauseActiveProduction=()=>{if(!businessOpen())return note('The works are closed for the night.');const x=activeContract();if(!x||S.lineStatus!=='running')return;x.productionState='paused';S.activeContractId=null;S.lineStatus='idle';S.lineMessage=x.id+' paused at '+Math.floor(x.completed||0).toLocaleString()+' units. Finished bulbs remain in the Warehouse.';note(S.lineMessage);save();render()}
window.abandonProductionRun=()=>{if(!businessOpen())return note('The works are closed for the night.');const x=activeContract()||queuedContracts()[0];if(!x)return;const made=Math.floor(x.completed||0),target=productionTarget(x);if(made<target&&!confirm('Stop the remaining production on '+x.id+'? '+made.toLocaleString()+' units already manufactured will remain in the Warehouse. The contract itself will NOT be cancelled.'))return;S.productionQueue=S.productionQueue.filter(v=>v!==x.id);if(S.activeContractId===x.id)S.activeContractId=null;x.productionState='abandoned';S.lineStatus='idle';S.lineMessage=x.id+' production stopped at '+made.toLocaleString()+' units. The customer contract remains open.';note(S.lineMessage);save();render()}
window.moveQueue=(id,dir)=>{if(!businessOpen())return note('The works office is closed for the night.');const i=S.productionQueue.indexOf(id),j=i+dir;if(i<0||j<0||j>=S.productionQueue.length||id===S.activeContractId)return;[S.productionQueue[i],S.productionQueue[j]]=[S.productionQueue[j],S.productionQueue[i]];save();renderFactory()}
function startNextQueued(){normalizeProductionTimes();const x=queuedContracts()[0];if(!x){S.activeContractId=null;S.lineStatus='idle';S.lineMessage='Production queue complete.';return}activateProduction(x)}
function productionCfg(q){return {standard:{c:1,g:1,t:.5,cost:.105},long:{c:1.12,g:1.08,t:.72,cost:.132},economy:{c:.82,g:.88,t:.35,cost:.079}}[q]}
function productionQualityProfile(c){
 const w=S.workforce||{},policy=productionPolicyCfg(c),base=clamp((w.skill||68)*.32+(w.morale||73)*.16+(w.discipline||81)*.17+S.machinery*.35,45,99),internal=clamp((100-base)*.0007*policy.defects,.002,.06),latent=clamp((100-base)*.00025*policy.defects,.0005,.025),qc=clamp(100-internal*150-latent*200,70,99.8);return {internal,latent,qc}
}
function addFinishedUnits(c,q,good,rejected,qc,latent){
 if(good<=0)return;const lot=ensureFinishedLot(c,q),before=lot.produced||0,total=before+good;lot.qc=total?(lot.qc*before+qc*good)/total:qc;lot.latentDefectRate=total?((lot.latentDefectRate||0)*before+latent*good)/total:latent;lot.produced=total;lot.available=(lot.available||0)+good;lot.rejected=(lot.rejected||0)+Math.max(0,rejected);lot.producedDate=S.gameDate;S.inventoryByGrade[q]=(S.inventoryByGrade[q]||0)+good
}
function advanceProduction(seconds,away=false){if(!businessOpen())return;const x=activeContract();if(!x||S.lineStatus!=='running'||x.productionState!=='running'||seconds<=0)return;let effective=seconds;if(away&&Math.random()<.14){if(Math.random()<.62){const lost=Math.min(effective,60+Math.floor(Math.random()*361));effective=Math.max(0,effective-lost);S.lineMessage='A breakdown occurred while you were away. Foreman Sullivan repaired it after '+Math.ceil(lost/60)+' minutes.'}else{effective=Math.max(0,effective*(.12+Math.random()*.35));S.lineStatus='awaiting';x.productionState='paused';S.lineMessage='The line broke down while you were away. Foreman Sullivan needs your authorization before repairs can continue.'}}const target=productionTarget(x),remaining=Math.max(0,target-(+x.completed||0)),factor=(S.machinery/92)*workforceProductionFactor()*productionPolicyCfg(x).speed,rate=target/productionRunSeconds(x)*factor,desired=Math.min(remaining,rate*effective),cfg=productionCfg(x.producedQuality||x.quality),qp=productionQualityProfile(x),yieldRate=Math.max(.85,1-qp.internal),possible=Math.min(desired,S.materials.copper*yieldRate/cfg.c,S.materials.glass*yieldRate/cfg.g,S.materials.tungsten*yieldRate/cfg.t,S.companyCash*yieldRate/cfg.cost);if(possible<=0){S.lineStatus='awaiting';x.productionState='paused';S.lineMessage='Production stopped for lack of materials or operating cash.';return}const gross=possible/yieldRate,rejected=Math.max(0,gross-possible);S.materials.copper-=gross*cfg.c;S.materials.glass-=gross*cfg.g;S.materials.tungsten-=gross*cfg.t;const cost=gross*cfg.cost;S.companyCash-=cost;S.lastExpenses+=cost;x.completed=(+x.completed||0)+possible;addFinishedUnits(x,x.producedQuality||x.quality,possible,rejected,qp.qc,qp.latent);if(x.completed>=target-.01){x.completed=target;S.productionQueue=S.productionQueue.filter(id=>id!==x.id);S.activeContractId=null;x.productionState='complete';S.lineMessage='Production run '+x.id+' complete. '+Math.floor(target).toLocaleString()+' finished units are in Warehouse inventory. Nothing has been shipped automatically.';startNextQueued()}renderFactory();renderWarehouse();renderContracts()}
function takeWarehouseUnits(grade,qty){let left=qty;const allocations=[];for(const lot of (S.finishedLots||[])){if(lot.quality!==grade||(lot.available||0)<=0)continue;const take=Math.min(left,Math.floor(lot.available));if(take<=0)continue;lot.available-=take;allocations.push({lotId:lot.id,qty:take,latentDefectRate:lot.latentDefectRate||0});left-=take;if(left<=0)break}const taken=qty-left;if(taken>0)S.inventoryByGrade[grade]=Math.max(0,(S.inventoryByGrade[grade]||0)-taken);return {taken,allocations}}
function returnWarehouseUnits(grade,allocations){let total=0;for(const a of allocations){let lot=(S.finishedLots||[]).find(l=>l.id===a.lotId);if(!lot){lot={id:a.lotId,quality:grade,qualityName:contractGrade(grade).qualityName,product:'Electric Light Bulbs',available:0,produced:0,rejected:0,qc:90,latentDefectRate:a.latentDefectRate||.006,producedDate:S.gameDate};S.finishedLots.push(lot)}lot.available=(lot.available||0)+a.qty;total+=a.qty}S.inventoryByGrade[grade]=(S.inventoryByGrade[grade]||0)+total}
function scheduleQualityClaim(x,qty,allocations){
 const expected=allocations.reduce((a,v)=>a+v.qty*(v.latentDefectRate||0),0),defective=Math.min(qty,Math.max(0,Math.round(expected*(.55+Math.random()*.9))));if(defective<Math.max(3,Math.ceil(qty*.004))||Math.random()>.55)return;
 S.pendingQualityClaims.push({contractId:x.id,qty:defective,dueTurn:(S.turnSerial||1)+1+Math.floor(Math.random()*2),unitPrice:x.price})
}
window.shipFromWarehouse=id=>{if(!businessOpen())return note('Shipping is closed for the night.');const x=S.contracts.find(c=>c.id===id);if(!x)return;const remaining=Math.max(0,x.quantity-(x.delivered||0));if(!remaining)return note(x.id+' is already fully delivered.');const qty=Math.floor(Number($('#ship_qty_'+id)?.value)),grade=$('#ship_grade_'+id)?.value;if(!Number.isFinite(qty)||qty<1||qty>remaining)return note('Enter a shipment quantity between 1 and '+remaining.toLocaleString()+'.');const trait=customerTraits[x.customerTrait||customerTraitFor(x.customer)];if(qty<remaining&&!trait.partial)return note(x.customer+' requires the remaining order in one shipment.');if(!contractGrades.some(g=>g.quality===grade))return note('Choose a valid warehouse grade.');if(Math.floor(S.inventoryByGrade[grade]||0)<qty)return note('Warehouse does not contain '+qty.toLocaleString()+' '+contractGrade(grade).qualityName+' bulbs.');const picked=takeWarehouseUnits(grade,qty);if(picked.taken!==qty){returnWarehouseUnits(grade,picked.allocations);return note('Warehouse lot records do not contain enough units for that shipment.')}const h=customerHistory(x.customer),correct=grade===x.quality;if(!correct&&Math.random()<trait.reject){returnWarehouseUnits(grade,picked.allocations);h.rejected++;S.reputation=clamp(S.reputation-1.2,0,100);S.notes.push({date:displayDate(),text:x.customer+' rejected a proposed shipment of '+qty.toLocaleString()+' '+contractGrade(grade).qualityName+' bulbs under '+x.id+' because the grade was wrong.',source:'customer correspondence'});note(x.customer+' rejected the wrong-grade shipment. The bulbs were returned to the Warehouse.');save();render();return}const rate=correct?1:trait.discount,rev=qty*x.price*rate;S.companyCash+=rev;S.lastRevenue+=rev;x.delivered=(x.delivered||0)+qty;if(qty<remaining)h.partial=(h.partial||0)+1;if(x.delivered>=x.quantity){x.delivered=x.quantity;x.status=correct?'delivered':'delivered-discount';h.completed++}else x.status=x.deadlinePassed?'overdue':'accepted';if(!correct)h.discounted=(h.discounted||0)+1;else scheduleQualityClaim(x,qty,picked.allocations);S.notes.push({date:displayDate(),text:x.customer+' accepted '+qty.toLocaleString()+' '+contractGrade(grade).qualityName+' bulbs from Warehouse under '+x.id+(correct?'.':' at a '+Math.round((1-rate)*100)+'% wrong-grade discount.'),source:'customer correspondence'});note(qty.toLocaleString()+' units shipped from Warehouse. '+Math.max(0,x.quantity-x.delivered).toLocaleString()+' remain due on '+x.id+'.');save();render()}
window.shipPartial=id=>window.shipFromWarehouse(id);
function processPendingQualityClaims(){const keep=[];for(const claim of S.pendingQualityClaims||[]){if(claim.dueTurn>(S.turnSerial||1)){keep.push(claim);continue}const x=S.contracts.find(c=>c.id===claim.contractId);if(!x)continue;const qty=Math.min(Math.floor(x.delivered||0),Math.floor(claim.qty||0));if(qty<=0)continue;const refund=qty*(claim.unitPrice||x.price);x.delivered=Math.max(0,(x.delivered||0)-qty);x.status='replacement';S.companyCash-=refund;S.lastExpenses+=refund;customerHistory(x.customer).rejected++;S.reputation=clamp(S.reputation-.6,0,100);S.notes.push({date:displayDate(),text:x.customer+' reported '+qty.toLocaleString()+' defective bulbs under '+x.id+'. Federal Electric refunded '+cash(refund)+' and now owes replacement units.',source:'customer complaint'})}S.pendingQualityClaims=keep}
function finishDeadlineContracts(oldIso,newIso){if(monthKey(oldIso)===monthKey(newIso))return;for(const x of S.contracts){const remaining=Math.max(0,x.quantity-(x.delivered||0));if(remaining>0&&!x.deadlinePassed&&x.deadlineMonth&&x.deadlineMonth<monthKey(newIso)){x.deadlinePassed=true;x.status='overdue';const h=customerHistory(x.customer);h.late++;S.reputation=clamp(S.reputation-.6,0,100);S.notes.push({date:displayDate(),text:x.id+' reached its delivery deadline with '+remaining.toLocaleString()+' units still due to '+x.customer+'. The inventory remains Federal Electric property until actually shipped.',source:'company records'})}}}
function finishDayContracts(){}
function tradeQty(k){const el=$('#qty_'+k),n=Math.floor(Number(el?.value));return Number.isFinite(n)&&n>0?n:0}
function renderTradeEstimate(k){const el=$('#estimate_'+k);if(!el)return;const qty=tradeQty(k),x=S.stocks[k];if(!qty){el.textContent='';return}const commission=Math.max(1,qty*.05);el.textContent='Buy total '+cash(x.price*qty+commission)}
function renderStocks(){
 const q=$('#stockSearch').value.trim().toLowerCase(),sector=$('#sectorFilter').value,closed=!businessOpen();
 const rows=Object.entries(S.stocks).filter(([k,x])=>(sector==='All'||x.sector===sector)&&(!q||k.toLowerCase().includes(q)||x.name.toLowerCase().includes(q)));
 $('#stocks').innerHTML=rows.map(([k,x])=>{
   const basis=Number.isFinite(+x.prevClose)&&+x.prevClose>0?+x.prevClose:(+x.prev||x.open),quote=S.phase==='day'?x.open:x.price,ch=(quote/basis-1)*100,p=S.portfolio[k],dis=closed?' disabled':'',sellDis=(closed||!p.shares)?' disabled':'';
   return '<tr><td><button class="stock-ticker-link" onclick="showStockDetail(\''+k+'\')">'+k+'</button></td><td><button class="stock-name-link" onclick="showStockDetail(\''+k+'\')">'+escapeHtml(x.name)+'</button></td><td>'+x.sector+'</td><td>$'+quote.toFixed(2)+'</td><td class="'+(ch>=0?'gain':'loss')+'">'+signed(ch)+'</td><td>'+(x.yieldRate*100).toFixed(1)+'%</td><td>'+p.shares+'</td><td><div class="trade-box"><input id="qty_'+k+'" type="number" min="1" step="1" value="10" oninput="renderTradeEstimate(\''+k+'\')"'+dis+'><div class="trade-buttons"><button onclick="trade(\''+k+'\',1)"'+dis+'>Buy</button><button onclick="trade(\''+k+'\',-1)"'+dis+'>Sell</button><button onclick="sellAll(\''+k+'\')"'+sellDis+'>Sell All</button></div><small id="estimate_'+k+'"></small></div></td></tr>'
 }).join('')
 renderStockDetail();
}
function stockHistorySeries(k){
 const x=S.stocks[k];if(!x)return[];
 const series=(Array.isArray(x.history)?x.history:[]).slice(-STOCK_HISTORY_DAYS).map(v=>({date:v.date,close:+v.close}));
 const current={date:S.gameDate,close:S.phase==='day'?x.open:x.price};
 if(!series.length||series[series.length-1].date!==current.date)series.push(current);else series[series.length-1]=current;
 return series;
}
function stockChartSvg(series,label){
 if(series.length<2)return '';
 const width=820,height=250,pad=44,vals=series.map(v=>v.close),min=Math.min(...vals),max=Math.max(...vals),span=Math.max(.01,max-min);
 const points=series.map((v,i)=>{const x=pad+i*(width-pad*2)/Math.max(1,series.length-1),y=height-pad-(v.close-min)*(height-pad*2)/span;return x.toFixed(1)+','+y.toFixed(1)}).join(' ');
 const hgrid=Array.from({length:5},(_,i)=>{const y=pad+i*(height-pad*2)/4;return '<line x1="'+pad+'" y1="'+y+'" x2="'+(width-pad)+'" y2="'+y+'" />'}).join('');
 const vgrid=Array.from({length:7},(_,i)=>{const x=pad+i*(width-pad*2)/6;return '<line x1="'+x+'" y1="'+pad+'" x2="'+x+'" y2="'+(height-pad)+'" />'}).join('');
 return '<svg class="stock-history-chart" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+escapeHtml(label)+' quotation history"><g class="stock-chart-grid">'+hgrid+vgrid+'</g><polyline class="stock-history-line" points="'+points+'"/><text x="'+pad+'" y="24">HIGH $'+max.toFixed(2)+'</text><text x="'+(width-pad-110)+'" y="24">LOW $'+min.toFixed(2)+'</text></svg>';
}
function renderStockDetail(){
 const box=$('#stockDetail');if(!box)return;
 if(!selectedStockTicker||!S.stocks[selectedStockTicker]){box.hidden=true;box.innerHTML='';return}
 const k=selectedStockTicker,x=S.stocks[k],series=stockHistorySeries(k),quote=S.phase==='day'?x.open:x.price,basis=x.prevClose||x.prev||quote,day=(quote/basis-1)*100,start=series[0]?.close||quote,range=(quote/start-1)*100,vals=series.map(v=>v.close),recordHigh=Math.max(...vals),recordLow=Math.min(...vals),ledgerRows=series.slice().reverse(),firstDate=series[0]?.date||S.gameDate,lastDate=series[series.length-1]?.date||S.gameDate;
 box.hidden=false;box.innerHTML='<div class="stock-detail-head"><div><span class="tag">'+k+'</span><h3>'+escapeHtml(x.name)+'</h3><p class="fine">Security Record · seeded quotation history begins before Federal Electric opens on January 3, 1938. Completed game sessions are added to the same record.</p></div><button onclick="closeStockDetail()">Close Record</button></div><div class="stock-detail-stats stock-detail-stats-six"><span><b>Published quote</b>$'+quote.toFixed(2)+'</span><span><b>Prior close</b>$'+Number(basis).toFixed(2)+'</span><span><b>Day</b><i class="'+(day>=0?'gain':'loss')+'">'+signed(day)+'</i></span><span><b>Record move</b><i class="'+(range>=0?'gain':'loss')+'">'+signed(range)+'</i></span><span><b>Record high</b>$'+recordHigh.toFixed(2)+'</span><span><b>Record low</b>$'+recordLow.toFixed(2)+'</span></div><div class="stock-history-period"><b>History shown:</b> '+firstDate+' through '+lastDate+' · '+series.length+' quoted sessions</div>'+stockChartSvg(series,x.name)+'<div class="table-wrap stock-history-ledger"><table><thead><tr><th>Date</th><th>Close / Published Quote</th><th>Change</th></tr></thead><tbody>'+ledgerRows.map(r=>{const idx=series.findIndex(v=>v.date===r.date),prev=idx>0?series[idx-1].close:null,ch=prev?(r.close/prev-1)*100:null;return '<tr><td>'+r.date+'</td><td>$'+r.close.toFixed(2)+'</td><td class="'+(ch==null?'':ch>=0?'gain':'loss')+'">'+(ch==null?'—':signed(ch))+'</td></tr>'}).join('')+'</tbody></table></div>';
}
window.showStockDetail=k=>{if(S.paused)return;selectedStockTicker=k;renderStockDetail()}
window.closeStockDetail=()=>{selectedStockTicker=null;renderStockDetail()}
function renderHoldings(){const rows=Object.entries(S.portfolio).filter(([,p])=>p.shares>0||Math.abs(p.realized||0)>.005);$('#holdings').innerHTML=rows.map(([k,p])=>{const x=S.stocks[k],avg=p.shares?p.cost/p.shares:0,mv=p.shares*x.price,g=mv-p.cost;return '<tr><td>'+k+'</td><td>'+p.shares+'</td><td>'+(p.shares?'$'+avg.toFixed(2):'—')+'</td><td>$'+x.price.toFixed(2)+'</td><td>'+cash(mv)+'</td><td class="'+(g>=0?'gain':'loss')+'">'+cash(g)+'</td><td class="'+((p.realized||0)>=0?'gain':'loss')+'">'+cash(p.realized||0)+'</td></tr>'}).join('')||'<tr><td colspan="7" class="empty">No securities held or realized trades recorded.</td></tr>'}
function renderTransactions(){$('#transactions').innerHTML=S.transactions.slice(-20).reverse().map(t=>'<tr><td>'+t.date+'</td><td>'+t.action+'</td><td>'+t.ticker+'</td><td>'+t.shares+'</td><td>$'+(+t.price).toFixed(2)+'</td><td>'+cash(t.amount)+'</td><td class="'+((t.realized||0)>=0?'gain':'loss')+'">'+(t.action==='SELL'?cash(t.realized||0):'—')+'</td></tr>').join('')||'<tr><td colspan="7" class="empty">No transactions yet.</td></tr>'}
window.renderTradeEstimate=renderTradeEstimate;
function renderNotes(){$('#notes').innerHTML=S.notes.slice().reverse().map(n=>'<div class="note-entry"><b>'+n.date+'</b> · '+escapeHtml(n.text)+'<br><small>Source: '+escapeHtml(n.source||'personal observation')+'</small></div>').join('')||'<p class="empty">No notes recorded.</p>'}
function renderArchive(){$('#newsArchive').innerHTML=S.newsArchive.slice().reverse().map(n=>'<div class="archive-entry"><b>'+n.date+'</b><br>'+escapeHtml(n.headline)+'</div>').join('')||'<p class="empty">No editions archived.</p>'}
function renderWashington(){const c=S.contacts;if(S.pokerDay!==S.gameDate){S.pokerDay=S.gameDate;S.pokerPlayed={working:0,middle:0,elite:0}}const wLeft=Math.max(0,5-S.pokerPlayed.working),mLeft=Math.max(0,3-S.pokerPlayed.middle),eLeft=Math.max(0,1-S.pokerPlayed.elite),middleOpen=!!S.middlePokerUnlocked;$('#starRelation').textContent=c.madamStar.met?(c.madamStar.trust>2?'Warm acquaintance':'Acquainted'):'Not yet acquainted';const dayActions=$('#starDayActions'),nightActions=$('#starNightActions'),phaseNote=$('#starPhaseNote');if(dayActions)dayActions.hidden=S.phase!=='day';if(nightActions)nightActions.hidden=S.phase!=='night';if(phaseNote)phaseNote.textContent=S.phase==='day'?'Daytime visits draw a quieter crowd of businessmen, officials and people slipping away from their offices.':S.phase==='night'?'Evening visits draw a busier crowd of gamblers, promoters, wealthy patrons and people from Washington\'s underground.':'The Star Club is closed while the Daily Report is open.';$('#contacts').innerHTML=Object.values(c).filter(x=>x.met).map(x=>'<div class="contact-card"><b>'+escapeHtml(x.name)+'</b><span>'+((x===c.madamStar)?'The Star Club':(x===c.bookie?'Private bookmaker':(x===c.promoter?'Fight promoter':'Washington contact')))+'</span><small>Met personally. Private motives and reliability unknown.</small></div>').join('')||'<p class="empty">Your card index is empty. Meet people around Washington to add contacts.</p>';$('#pokerWorking').disabled=false;$('#simPokerWorking').disabled=wLeft===0;$('#pokerMiddle').disabled=false;$('#simPokerMiddle').disabled=!middleOpen||mLeft===0;$('#pokerElite').disabled=false;$('#simPokerElite').disabled=!S.elitePokerUnlocked||eLeft===0;$('#pokerWorking').textContent='Play · $25 stake · '+wLeft+' available';$('#simPokerWorking').textContent='Simulate · 5 min';$('#pokerMiddle').textContent=middleOpen?'Play · $100 stake · '+mLeft+' available':'Meet Eddie Doyle to unlock';$('#simPokerMiddle').textContent='Simulate · 10 min';$('#pokerElite').textContent=S.elitePokerUnlocked?'Play · $500 stake · '+eLeft+' available':'Harrison Vale invitation required';$('#simPokerElite').textContent='Simulate · 25 min';$('#pokerProgress').textContent='Neighborhood Game: OPEN · Commerce Club: '+(middleOpen?'UNLOCKED':'EDDIE DOYLE INTRODUCTION REQUIRED')+' · Embassy Room: '+(S.elitePokerUnlocked?'UNLOCKED':'VALE INVITATION REQUIRED')}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function materialQty(k){const n=Math.floor(Number(document.getElementById('material_qty_'+k)?.value));return Number.isFinite(n)&&n>0?n:0}
window.tradeMaterial=(k,direction,forcedQty=null)=>{
 if(S.paused)return note('Game is paused.');
 if(!businessOpen())return note('Suppliers are closed for the night.');
 const market=MATERIAL_MARKET[k],qty=forcedQty||materialQty(k);if(!market||!qty)return note('Enter a valid material quantity.');
 const amount=market.unitPrice*qty;
 if(direction>0){if(S.companyCash<amount)return note('Insufficient company cash. '+market.name+' purchase requires '+cash(amount)+'.');S.companyCash-=amount;S.materials[k]+=qty;S.lastExpenses+=amount;note('Bought '+qty.toLocaleString()+' '+market.name.toLowerCase()+' units for '+cash(amount)+'.')}
 else{const held=Math.floor(S.materials[k]||0);if(held<qty)return note('Federal Electric only has '+held.toLocaleString()+' '+market.name.toLowerCase()+' units available to sell.');S.materials[k]-=qty;S.companyCash+=amount;S.lastRevenue+=amount;note('Sold '+qty.toLocaleString()+' '+market.name.toLowerCase()+' units for '+cash(amount)+'.')}
 save();render();
}
window.sellAllMaterial=k=>{const qty=Math.floor(S.materials[k]||0);if(!qty)return note('No '+(MATERIAL_MARKET[k]?.name||k).toLowerCase()+' inventory to sell.');window.tradeMaterial(k,-1,qty)}
window.trade=(k,direction,forcedQty=null)=>{if(!businessOpen())return note('The Federal Exchange is closed for the night.');const qty=forcedQty||tradeQty(k),x=S.stocks[k],p=S.portfolio[k];if(!qty)return note('Enter a valid number of shares.');const commission=Math.max(1,qty*.05),gross=x.price*qty;if(direction>0){const total=gross+commission;if(S.personalCash<total)return note('Insufficient personal cash. Purchase requires '+cash(total)+' including commission; available cash is '+cash(S.personalCash)+'.');S.personalCash-=total;p.shares+=qty;p.cost+=total;S.transactions.push({date:displayDate(),action:'BUY',ticker:k,shares:qty,price:x.price,amount:-total,realized:0});note('Bought '+qty+' '+k+' at '+cash(x.price)+' · total cost '+cash(total)+' · cash available '+cash(S.personalCash)+'.')}else{if(p.shares<qty)return note('Not enough '+k+' shares. You own '+p.shares+'.');const avg=p.cost/p.shares,proceeds=gross-commission,costBasis=avg*qty,realized=proceeds-costBasis;p.shares-=qty;p.cost=Math.max(0,p.cost-costBasis);if(p.shares===0)p.cost=0;p.realized=(p.realized||0)+realized;S.personalCash+=proceeds;S.transactions.push({date:displayDate(),action:'SELL',ticker:k,shares:qty,price:x.price,amount:proceeds,realized});note('Sold '+qty+' '+k+' · proceeds '+cash(proceeds)+' · realized '+(realized>=0?'profit ':'loss ')+cash(Math.abs(realized))+' · cash available '+cash(S.personalCash)+'.')}save();render()}
window.sellAll=k=>{const qty=S.portfolio[k].shares;if(!qty)return note('No '+k+' shares to sell.');window.trade(k,-1,qty)}
function stepHiddenMarket(){
 const sectors=[...new Set(Object.values(S.stocks).map(x=>x.sector))],sectorMove={};sectors.forEach(s=>sectorMove[s]=(Math.random()-.5)*.0012);
 const broad=(Math.random()-.5)*.0008;
 for(const x of Object.values(S.stocks)){const current=Number.isFinite(+x.hiddenPrice)?+x.hiddenPrice:+x.price;x.prevHidden=current;const company=(Math.random()-.5)*x.vol*.025,move=broad+sectorMove[x.sector]+company;x.hiddenPrice=Math.max(1,Math.round(current*(1+move)*100)/100)}
}
function setMarketWireOpen(){S.marketWire='Trading continues on the Federal Exchange. Federal Electric has no live intraday quotation service; the opening sheet remains posted until the closing quotations are published.';const wire=$('#marketWire');if(wire)wire.textContent=S.marketWire}
function moveMarket(){stepHiddenMarket();setMarketWireOpen()}
function advanceHiddenMarket(seconds){
 if(!businessOpen()||seconds<=0)return;
 const stepSeconds=MARKET_TICK_MS/1000,steps=Math.floor(seconds/stepSeconds);
 for(let i=0;i<steps;i++)stepHiddenMarket();
 if(steps)setMarketWireOpen();
}
window.advanceWorldTime=(seconds,away=false)=>{
 const spent=Math.max(0,Math.min(Math.floor(seconds||0),S.dayRemaining));if(!spent)return 0;
 if(businessOpen()){let productionSeconds=spent;const cond=S.turnConditions||{};if((cond.powerOutageSeconds||0)>0){const lost=Math.min(productionSeconds,cond.powerOutageSeconds);cond.powerOutageSeconds=Math.max(0,cond.powerOutageSeconds-lost);productionSeconds-=lost;if(activeContract()&&S.lineStatus==='running')S.lineMessage='Utility power failure stopped the production line for '+Math.ceil(lost/60)+' minute'+(Math.ceil(lost/60)===1?'':'s')+'.'}advanceProduction(productionSeconds,away);advanceHiddenMarket(spent)}
 S.dayRemaining=Math.max(0,S.dayRemaining-spent);return spent;
};
function archiveToday(){if(S.newsArchive.some(n=>n.iso===S.gameDate))return;S.newsArchive.push({iso:S.gameDate,date:displayDate(),headline:S.headline,story:S.story,society:S.societyStory,sports:S.sportsStory});if(S.newsArchive.length>400)S.newsArchive.shift()}
function payMonthlyDividends(oldIso,newIso){if(monthKey(oldIso)===monthKey(newIso))return;let total=0;for(const [k,p] of Object.entries(S.portfolio)){const x=S.stocks[k],amount=p.shares*x.price*x.yieldRate/12;if(amount>.009){total+=amount;S.transactions.push({date:displayDate(),action:'DIVIDEND',ticker:k,shares:p.shares,price:x.price,amount})}}S.personalCash+=total}
function generatePaper(){const d=new Date(S.gameDate+'T12:00:00'),day=d.getDate(),sportsItems=[S.lastRaceResult,S.lastBoxingResult].filter(Boolean);S.sportsStory=sportsItems.length?sportsItems.join(' '):'No major Washington sporting results were filed overnight.';S.lastRaceResult=null;S.lastBoxingResult=null;if(S.lastRaidOutcome==='caught'){S.headline='PROMINENT INDUSTRIALIST QUESTIONED IN CLUB RAID';S.story='Police activity at a private Washington club has drawn attention to several patrons, including the head of Federal Electric.';S.societyStory='The Star Club raid is the subject of unusually energetic conversation in Washington social circles.';S.lastRaidOutcome=null}else if(S.lastRaidOutcome==='missed'){S.headline='POLICE RAID PRIVATE WASHINGTON CLUB';S.story='Police descended on a private club last evening and detained several patrons for questioning.';S.societyStory='The raid has unsettled bookmakers and private gaming circles across the District.';S.lastRaidOutcome=null}else if(S.companyCash<10000){S.headline='CREDITORS WATCH INDUSTRIAL BALANCE SHEETS';S.story='Tight liquidity has become a concern in several manufacturing offices.';S.societyStory='Bankers report growing attention to industrial credit.'}else{S.headline='FACTORIES WEIGH ORDERS, COSTS AND RECOVERY';S.story='Industrial managers report uneven demand as companies compete for orders and preserve working capital.';S.societyStory=day%3===0?'Private clubs remain busy as businessmen and officials exchange gossip after hours.':'Washington begins another day of meetings, dinners and quiet conversations.'}}
function closeBusinessDay(manual=false){
 if(S.phase!=='day')return;
 if(window.finishRaceMeeting)window.finishRaceMeeting();
 if(window.finishUnderworldDay)window.finishUnderworldDay();
 finishDayContracts();
 for(const [ticker,x] of Object.entries(S.stocks)){const close=Number.isFinite(+x.hiddenPrice)?+x.hiddenPrice:+x.price;x.price=close;if(!Array.isArray(x.history))x.history=[];const last=x.history[x.history.length-1];if(last&&last.date===S.gameDate)last.close=close;else x.history.push({date:S.gameDate,close});if(x.history.length>260)x.history=x.history.slice(-260);x.prev=x.prevClose}
 const payroll=S.workers*18;S.companyCash-=payroll;S.lastExpenses+=payroll;
 const reportDate=displayDate(),dayTrades=S.transactions.filter(t=>t.date===reportDate&&(t.action==='BUY'||t.action==='SELL')),stockRealized=dayTrades.filter(t=>t.action==='SELL').reduce((a,t)=>a+(t.realized||0),0),stockPositionMove=Object.entries(S.portfolio).reduce((a,[k,p])=>a+p.shares*((S.stocks[k]?.price||0)-(S.stocks[k]?.open||0)),0);
 S.ledger.push({date:reportDate,rev:S.lastRevenue,exp:S.lastExpenses});
 S.dailyReport={iso:S.gameDate,date:reportDate,openingCompanyCash:S.dayStartCompanyCash,openingPersonalCash:S.dayStartPersonalCash,revenue:S.lastRevenue,expenses:S.lastExpenses,companyClose:S.companyCash,personalAtClose:S.personalCash,stockTrades:dayTrades.length,stockRealized,stockPositionMove,marketCloseIndex:marketIndex(),portfolioAtMarketClose:portfolioValue()};
 S.lastRevenue=0;S.lastExpenses=0;S.machinery=clamp(S.machinery-.7,20,100);
 S.phase='night';S.dayRemaining=NIGHT_SECONDS;
 S.marketWire='The Federal Exchange has closed. Closing quotations are posted; the exchange remains closed until the next business morning.';
 save();render();note(manual?'Business day closed early. Washington Night begins.':'Closing bell. Washington Night begins.');
}
function closeNight(manual=false){
 if(S.phase!=='night')return;
 if(window.finishBoxingNight)window.finishBoxingNight();
 if(window.finishUnderworldNight)window.finishUnderworldNight();
 if(monthKey(S.gameDate)===S.starNextRaidMonth&&!S.starRaidOccurred){S.starRaidOccurred=true;if(S.contacts.madamStar.met&&Math.random()<.15)S.lastRaidOutcome='missed';S.starNextRaidMonth=rollStarRaidMonth(S.gameDate)}
 if(isRaidToday()&&S.lastRaidOutcome!=='caught'&&Math.random()<.2)S.lastRaidOutcome='missed';
 if(!S.dailyReport)S.dailyReport={iso:S.gameDate,date:displayDate(),openingCompanyCash:S.dayStartCompanyCash,openingPersonalCash:S.dayStartPersonalCash,revenue:0,expenses:0,companyClose:S.companyCash,personalAtClose:S.personalCash};
 S.dailyReport.companyEnd=S.companyCash;S.dailyReport.personalEnd=S.personalCash;S.dailyReport.portfolioEnd=portfolioValue();S.dailyReport.ownerDistributions=S.ownerDistributionsToday||0;S.dailyReport.divertedFunds=S.divertedToday||0;S.dailyReport.unaccountedFunds=S.unaccountedFunds||0;S.dailyReport.accountingExposure=accountingExposure();
 S.phase='report';S.dayRemaining=0;save();render();note(manual?'You retired early. Review the Daily Report.':'Washington Night has ended. Review the Daily Report.');
}
function beginNextDay(){
 if(S.phase!=='report')return;
 archiveToday();const old=S.gameDate,next=nextBusinessTurn(S.gameDate);finishDeadlineContracts(old,next);S.gameDate=next;S.turnSerial=(S.turnSerial||1)+1;payMonthlyDividends(old,S.gameDate);
 S.phase='day';S.dayRemaining=BUSINESS_DAY_SECONDS;
 for(const [ticker,x] of Object.entries(S.stocks)){const priorClose=+x.price||+x.open;x.prevClose=priorClose;x.prev=priorClose;const open=Math.max(1,Math.round(priorClose*(1+openingGapFor(ticker,S.gameDate,x.vol))*100)/100);x.open=open;x.price=open;x.hiddenPrice=open}
 S.marketWire='The Federal Exchange is open. Federal Electric has the opening quotation sheet; closing quotations will be published after the bell.';
 if(S.raidMonth!==monthKey(S.gameDate)){S.raidMonth=monthKey(S.gameDate);S.raidDays=rollRaidDays(S.gameDate)}
 generateTurnConditions();processPendingQualityClaims();generatePaper();S.dayStartCompanyCash=S.companyCash;S.dayStartPersonalCash=S.personalCash;S.ownerDistributionsToday=0;S.divertedToday=0;S.dailyReport=null;save();render();note('A new business turn begins. The morning Metropolitan Ledger is on your desk.');
}
function isRaidToday(){return S.raidDays.includes(new Date(S.gameDate+'T12:00:00').getDate())}
$('#startProduction').onclick=()=>{if(!businessOpen())return note('The works are closed for the night.');if(S.lineStatus==='running')return;startNextQueued();note(S.lineMessage);save();render()}
$('#resumeProduction').onclick=()=>{if(!businessOpen())return note('The works are closed for the night.');if(S.lineStatus!=='awaiting')return;const x=activeContract();if(x)x.productionState='running';S.lineStatus='running';S.lineMessage='Executive authorization received. The line is running again.';note(S.lineMessage);save();render()}
const pauseProduction=$('#pauseProduction');if(pauseProduction)pauseProduction.onclick=window.pauseActiveProduction;
const abandonProduction=$('#abandonProduction');if(abandonProduction)abandonProduction.onclick=window.abandonProductionRun;
$('#maintain').onclick=()=>{if(!businessOpen())return note('Regular works maintenance authorization resumes next Business Day.');if(S.companyCash<750)return note('Insufficient company cash.');S.companyCash-=750;S.lastExpenses+=750;S.machinery=clamp(S.machinery+12,0,100);save();render()}
$('#endDay').onclick=()=>{if(S.phase==='day'){if(confirm('Close the current business day early and begin Washington Night?'))closeBusinessDay(true)}else if(S.phase==='night'){if(confirm('Retire early and review the Daily Report?'))closeNight(true)}}
const nextDayBtn=$('#beginNextDay');if(nextDayBtn)nextDayBtn.onclick=beginNextDay
$('#reset').onclick=()=>{if(confirm('You are about to start a new game. All previous progress will be lost. Continue?')){clearPauseLock();S=initial();selectedStockTicker=null;save();render()}}
const pauseToggle=$('#pauseToggle');if(pauseToggle)pauseToggle.onclick=()=>{if(S.paused){clearPauseLock();S.paused=false}else{S.paused=true;showTab('desk')}save(true);render()};
function treasuryAmount(){const n=Math.floor(Number($('#treasuryAmount')?.value));return Number.isFinite(n)&&n>0?n:0}
const exploreIpo=$('#exploreIpo');if(exploreIpo)exploreIpo.onclick=()=>{ipoScaffoldOpen=!ipoScaffoldOpen;renderOwnership()};
const closeIpoScaffold=$('#closeIpoScaffold');if(closeIpoScaffold)closeIpoScaffold.onclick=()=>{ipoScaffoldOpen=false;renderOwnership()};
const ownerDistribution=$('#ownerDistribution');if(ownerDistribution)ownerDistribution.onclick=()=>{
 const amount=treasuryAmount(),out=$('#treasuryNote');if(!businessOpen())return out.textContent='Recorded distributions are handled during the Business Day.';
 if(!amount)return out.textContent='Enter a valid amount.';if(amount>S.companyCash)return out.textContent='Federal Electric does not have that much company cash.';
 S.companyCash-=amount;S.personalCash+=amount;S.ownerDistributionsToday=(S.ownerDistributionsToday||0)+amount;
 S.notes.push({date:displayDate(),text:'A recorded owner distribution of '+cash(amount)+' was transferred from Federal Electric to personal funds.',source:'company books'});
 out.textContent='Recorded distribution completed: '+cash(amount)+' moved to personal cash.';save();render();
};
const divertCompanyFunds=$('#divertCompanyFunds');if(divertCompanyFunds)divertCompanyFunds.onclick=()=>{
 const amount=treasuryAmount(),out=$('#treasuryNote');if(S.phase==='report')return out.textContent='The books are closed for the completed date.';
 if(!amount)return out.textContent='Enter a valid amount.';if(amount>S.companyCash)return out.textContent='Federal Electric does not have that much company cash.';
 S.companyCash-=amount;S.personalCash+=amount;S.divertedToday=(S.divertedToday||0)+amount;S.unaccountedFunds=(S.unaccountedFunds||0)+amount;S.corporateMisuseCount=(S.corporateMisuseCount||0)+1;
 S.notes.push({date:displayDate(),text:cash(amount)+' of Federal Electric funds were diverted to personal use, creating an unexplained corporate shortfall.',source:'private financial record'});
 out.textContent='Company funds diverted: '+cash(amount)+' moved to personal cash. Accounting exposure is now '+accountingExposure()+'.';save();render();
};
$('#archiveEdition').onclick=()=>{archiveToday();save();renderArchive();note('Edition placed in the archive.')}
$('#addNote').onclick=()=>{const text=$('#noteText').value.trim(),source=$('#noteSource').value.trim();if(!text)return;S.notes.push({date:displayDate(),text,source});$('#noteText').value='';$('#noteSource').value='';save();renderNotes()}
function visitStar(seconds,price,encounterChance,trustGain,period){
 if(S.phase==='report')return $('#starNote').textContent='The day is already closed. Review the Daily Report.';
 if(period==='day'&&S.phase!=='day')return $('#starNote').textContent='Those daytime visits are no longer available tonight.';
 if(period==='night'&&S.phase!=='night')return $('#starNote').textContent='Evening visits become available after the closing bell.';
 if(S.dayRemaining<seconds){$('#starNote').textContent='There is not enough time remaining in this phase for that visit.';return}
 if(S.personalCash<price){$('#starNote').textContent='You do not have enough personal cash for that visit.';return}
 S.personalCash-=price;window.advanceWorldTime(seconds,true);
 const first=!S.contacts.madamStar.met;S.contacts.madamStar.met=true;S.contacts.madamStar.trust+=trustGain;
 S.notes.push({date:displayDate(),text:first?'Visited the Star Club and met Madam Star. She now knows my name.':'Spent time at the Star Club and spoke with Madam Star again.',source:'personal recollection'});
 const dayPeople=[['hayes','Commissioner Arthur Hayes','Met Commissioner Arthur Hayes during a quiet daytime visit to the Star Club. We exchanged introductions.'],['bookie','Eddie Doyle, bookmaker','Madam Star introduced me to Eddie Doyle during the day. He offered to put my name in at the Commerce Club poker game.']];
 const nightPeople=[['bookie','Eddie Doyle, bookmaker','Ran into Eddie Doyle during an evening visit. The bookmaker seemed to know where money was moving around Washington.'],['promoter','Marty Kane, fight promoter','Met Marty Kane, a fight promoter who moves easily between licensed boxing and less respectable fight circles.']];
 if(Math.random()<encounterChance){
   const people=period==='night'?nightPeople:dayPeople,pick=people[Math.floor(Math.random()*people.length)],x=S.contacts[pick[0]];
   x.met=true;if(pick[0]==='bookie'){S.bookieKnown=true;S.middlePokerUnlocked=true}
   S.notes.push({date:displayDate(),text:pick[2],source:'personal recollection'});$('#starNote').textContent=pick[2]
 }else $('#starNote').textContent=period==='night'?(seconds===900?'You make a brief evening visit. The room is lively, but nothing especially useful develops.':'You spend part of the evening at the Star Club. Nothing especially useful develops.'):(seconds===900?'You make a brief daytime visit to the Star Club. Nothing especially useful develops.':'You spend the afternoon at the Star Club. Nothing especially useful develops.');
 save();render();
}
$('#visitStarBrief').onclick=()=>visitStar(900,5,.12,1,'day');
$('#visitStarAfternoon').onclick=()=>visitStar(1800,12,.28,2,'day');
const visitStarEveningBrief=$('#visitStarEveningBrief');if(visitStarEveningBrief)visitStarEveningBrief.onclick=()=>visitStar(900,5,.18,1,'night');
const visitStarEvening=$('#visitStarEvening');if(visitStarEvening)visitStarEvening.onclick=()=>visitStar(1800,12,.38,2,'night');
function pokerAccess(circle){if(circle==='working')return true;if(circle==='middle')return !!S.middlePokerUnlocked;if(circle==='elite')return !!S.elitePokerUnlocked;return false}
function pokerLimit(circle){return {working:5,middle:3,elite:1}[circle]||0}
function pokerCircleName(circle){return circle==='working'?'Neighborhood Game':circle==='middle'?'Commerce Club':'Embassy Room'}
function maybePokerProgress(circle){if(circle==='middle'&&!S.elitePokerUnlocked){const vale=S.contacts.vale;if(!vale.met&&Math.random()<.22){vale.met=true;vale.trust=1;S.notes.push({date:displayDate(),text:'Met Harrison Vale at the Commerce Club. The industrialist mentioned that he sometimes attends a much more private Washington table.',source:'card-table conversation'});return ' You met Harrison Vale, an industrialist with access to more private games.'}if(vale.met&&Math.random()<.28){vale.trust++;if(vale.trust>=2){S.elitePokerUnlocked=true;S.notes.push({date:displayDate(),text:'Harrison Vale offered to put my name forward for the Embassy Room, an invitation-only private society poker game.',source:'card-table conversation'});return ' Harrison Vale has secured you an invitation to the Embassy Room.'}return ' Harrison Vale spent more time at your table. The acquaintance is becoming useful.'}}return ''}
function recordPokerResult(circle,delta,hands,simulated,timeSeconds){S.personalCash+=delta;if(delta>0)S.pokerWins[circle]=(S.pokerWins[circle]||0)+1;if(simulated)S.pokerSimulated[circle]=(S.pokerSimulated[circle]||0)+1;if(timeSeconds>0)window.advanceWorldTime(timeSeconds,true);let extra=maybePokerProgress(circle),raid=false;if(isRaidToday()&&Math.random()<pokerRisk(circle)){raid=true;S.lastRaidOutcome='caught';S.reputation=clamp(S.reputation-(circle==='elite'?7:3),0,100);S.notes.push({date:displayDate(),text:'Police raided the card game while I was present. I was caught in the sweep.',source:'personal recollection'})}const verb=simulated?'Simulated':'Played';S.notes.push({date:displayDate(),text:verb+' '+hands+' hand'+(hands===1?'':'s')+' at '+pokerCircleName(circle)+' and left '+(delta>=0?'ahead ':'down ')+cash(Math.abs(delta))+'.'+(simulated?' '+Math.round(timeSeconds/60)+' business minutes elapsed.':''),source:simulated?'game simulation':'personal recollection'});$('#pokerNote').textContent=raid?'The game was caught in a rare police sweep.':verb+' session: '+hands+' hands · '+(delta>=0?'won ':'lost ')+cash(Math.abs(delta))+' · '+(simulated?Math.round(timeSeconds/60)+' minutes elapsed.':'session recorded.')+extra;save();render()}
function playPokerCircle(circle,stake){if(S.pokerDay!==S.gameDate){S.pokerDay=S.gameDate;S.pokerPlayed={working:0,middle:0,elite:0}}if(!pokerAccess(circle)){$('#pokerNote').textContent=circle==='working'?'The Neighborhood Game is open.':circle==='middle'?'Meet Eddie Doyle at the Star Club to get into the Commerce Club.':'You have not received an invitation to the Embassy Room.';return}if(S.pokerPlayed[circle]>=pokerLimit(circle)){$('#pokerNote').textContent='No more '+pokerCircleName(circle)+' sessions are available to you today.';return}if(S.personalCash<stake){$('#pokerNote').textContent='You need '+cash(stake)+' personal cash for this table.';return}S.pokerPlayed[circle]++;save();renderWashington();window.open('poker.html?room='+encodeURIComponent(circle)+'&remaining='+Math.ceil(S.dayRemaining),'FEPoker_'+circle+'_'+S.gameDate,'popup=yes,width=1180,height=860,resizable=yes,scrollbars=yes')}
function pokerSimSeconds(circle){return circle==='working'?300:circle==='middle'?600:1500}
function simulatePoker(circle,stake){if(S.pokerDay!==S.gameDate){S.pokerDay=S.gameDate;S.pokerPlayed={working:0,middle:0,elite:0}}if(!pokerAccess(circle)){$('#pokerNote').textContent=circle==='working'?'The Neighborhood Game is open.':circle==='middle'?'Meet Eddie Doyle at the Star Club to get into the Commerce Club.':'An Embassy Room invitation is required.';return}if(S.pokerPlayed[circle]>=pokerLimit(circle))return $('#pokerNote').textContent='No more '+pokerCircleName(circle)+' sessions are available today.';if(S.personalCash<stake)return $('#pokerNote').textContent='You need '+cash(stake)+' personal cash for this table.';const simSeconds=pokerSimSeconds(circle);if(S.dayRemaining<simSeconds)return $('#pokerNote').textContent='There is not enough business-day time remaining for this simulation.';S.pokerPlayed[circle]++;const hands=6+Math.floor(Math.random()*10),swing={working:5,middle:18,elite:80}[circle];let delta=0;for(let i=0;i<hands;i++){const r=Math.random();delta+=r<.43?-swing*(.25+Math.random()*.85):r<.83?swing*(.2+Math.random()*.7):swing*(.8+Math.random()*1.7)}delta=Math.round(delta);delta=clamp(delta,-Math.min(stake,S.personalCash),stake*2);recordPokerResult(circle,delta,hands,true,simSeconds)}
window.FE_POKER_CLOCK=()=>Math.max(0,S.dayRemaining);window.FE_POKER_RETURN=(circle,delta,hands,elapsed)=>recordPokerResult(circle,delta,hands,false,0);
const pokerTestClicks={working:0,middle:0,elite:0},pokerTestReset={working:null,middle:null,elite:null};
function openPokerWindow(circle){window.open('poker.html?room='+encodeURIComponent(circle)+'&remaining='+Math.ceil(S.dayRemaining)+'&v=20261001-clockfix2','FEPoker_'+circle+'_'+Date.now(),'popup=yes,width=1180,height=860,resizable=yes,scrollbars=yes')}
function pokerButton(circle,stake){const limit=pokerLimit(circle),used=S.pokerPlayed[circle]||0;if(pokerAccess(circle)&&used<limit)return playPokerCircle(circle,stake);pokerTestClicks[circle]++;clearTimeout(pokerTestReset[circle]);pokerTestReset[circle]=setTimeout(()=>pokerTestClicks[circle]=0,5000);if(pokerTestClicks[circle]<7)return;pokerTestClicks[circle]=0;if(circle==='working')S.bookieKnown=true;if(circle==='middle')S.middlePokerUnlocked=true;if(circle==='elite')S.elitePokerUnlocked=true;S.pokerPlayed[circle]=Math.max(0,limit);save();renderWashington();openPokerWindow(circle)}
$('#pokerWorking').onclick=()=>pokerButton('working',25);$('#pokerMiddle').onclick=()=>pokerButton('middle',100);$('#pokerElite').onclick=()=>pokerButton('elite',500);$('#simPokerWorking').onclick=()=>simulatePoker('working',25);$('#simPokerMiddle').onclick=()=>simulatePoker('middle',100);$('#simPokerElite').onclick=()=>simulatePoker('elite',500);
document.querySelectorAll('nav button[data-tab],.section-tabs button[data-tab]').forEach(b=>b.onclick=()=>{if(S.paused)return;showTab(b.dataset.tab)});
const sectors=[...new Set(stockSeed.map(x=>x[2]))].sort();$('#sectorFilter').innerHTML='<option value="All">All sectors</option>'+sectors.map(s=>'<option>'+s+'</option>').join('');$('#stockSearch').oninput=renderStocks;$('#sectorFilter').onchange=renderStocks;
loadInitial();render();
marketTimer=setInterval(()=>{if(!document.hidden&&!S.paused&&businessOpen()&&S.dayRemaining>0){moveMarket()}},MARKET_TICK_MS);
clockTimer=setInterval(()=>{if(document.hidden||S.phase==='report'||S.paused)return;if(businessOpen())advanceProduction(1,false);S.dayRemaining=Math.max(0,S.dayRemaining-1);$('#dayClock').textContent=clockText();if(S.dayRemaining<=0){if(S.phase==='day')closeBusinessDay(false);else if(S.phase==='night')closeNight(false)}},1000);
autosaveTimer=setInterval(()=>save(true),5000);
document.addEventListener('visibilitychange',()=>{if(document.hidden)save(true)});
window.addEventListener('pagehide',()=>save(true));