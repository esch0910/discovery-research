(function(){
'use strict';
var P='PDF p.';
var stages=[
{id:'plan',name:'規劃',sub:'Rule 26(f)、16(b)',rules:['26','16'],pts:['當事人須在排程會議或 scheduling order 到期前至少 21 天進行 conference，並於會後 14 天內提交 discovery plan 書面報告。（26(f)(1)–(2)，'+P+'64–65）','法官原則上應於被告送達後 90 天或被告出庭後 60 天（取較早者）內發出 scheduling order，除非有正當理由。（16(b)(2)，'+P+'44）','Scheduling order 須限定追加當事人、修正書狀、完成 discovery 與提出聲請的時間。（16(b)(3)(A)，'+P+'44）']},
{id:'init',name:'初始揭露',sub:'Rule 26(a)(1)',rules:['26'],pts:['不待對方請求，須揭露可能支持主張或抗辯的證人、文件、損害賠償計算與保險契約。（26(a)(1)(A)，'+P+'58）','原則上於 26(f) conference 時或之後 14 天內為之；後來才被送達或加入者為 30 天。（26(a)(1)(C)–(D)，'+P+'59）','特定程序（如行政紀錄審查、habeas corpus 等）免初始揭露。（26(a)(1)(B)，'+P+'58–59）']},
{id:'start',name:'開始與範圍',sub:'Rule 26(b)、26(d)',rules:['26'],pts:['原則上須待 26(f) conference 後才能請求 discovery；另有 Rule 34 早期請求之例外。（26(d)(1)–(2)，'+P+'64）','範圍為不受特權保護、與任何一方主張或抗辯相關，且符合案件需要之比例（proportional）的事項。（26(b)(1)，'+P+'60–61）','可證據性（admissibility）不是可開示的條件。（26(b)(1)，'+P+'61）']},
{id:'tools',name:'開示工具',sub:'Rules 27–36',rules:['27','28','29','30','31','32','33','34','35','36'],pts:['Depositions：Rules 27–32；Interrogatories：Rule 33；文件與 ESI 請求：Rule 34；身心檢查：Rule 35；Requests for Admission：Rule 36。','第三人（nonparty）則以 Rule 45 subpoena 取得。（45，'+P+'88–92）','Rule 29 容許當事人以合意調整程序，但延長期限若影響完成 discovery、聲請審理或開庭時程，須經法院核准。（29(b)，'+P+'69）']},
{id:'dispute',name:'爭議處理',sub:'Rule 26(c)、37(a)',rules:['26','37'],pts:['保護令（protective order）：須附善意協商（confer in good faith）之證明，法院得基於 good cause 發出。（26(c)(1)，'+P+'63）','強制命令聲請（motion to compel）同樣須附善意協商證明；不完整或規避的回答視同未回答。（37(a)(1)、(a)(4)，'+P+'80–81）','聲請被准許時，原則上應命敗方負擔合理費用，但有三項例外。（37(a)(5)(A)，'+P+'81）']},
{id:'supp',name:'補充與制裁',sub:'Rule 26(e)、26(g)、37(b)–(f)',rules:['26','37'],pts:['發現揭露或回應在重要方面不完整或不正確時，須適時補充或更正。（26(e)(1)，'+P+'64）','違反法院命令的制裁範圍從視為事實成立，到駁回訴訟、缺席判決。（37(b)(2)(A)，'+P+'82）','未依 26(a) 或 26(e) 提供資訊者，不得使用該資訊或證人，除非有 substantial justification 或屬 harmless。（37(c)(1)，'+P+'82）','ESI 滅失之救濟分兩層：有損害時採不逾必要之措施；須有剝奪使用之意圖，才可推定不利或駁回。（37(e)，'+P+'83–84）']},
{id:'trial',name:'專家與審前揭露',sub:'Rule 26(a)(2)–(3)',rules:['26','32'],pts:['專家證人須揭露；受聘專家通常須附書面報告。（26(a)(2)(B)，'+P+'59）','無特別命令時，專家揭露至少於審判前 90 天；單純反駁證據則於對方揭露後 30 天內。（26(a)(2)(D)，'+P+'60）','審前揭露至少於審判前 30 天；對方於 14 天內提出異議，未提出者原則上視為放棄（FRE 402、403 除外）。（26(a)(3)(B)，'+P+'60）']}];
var rules=[
['26','Duty to Disclose; General Provisions','揭露義務與開示總則','p.58–66','提供揭露（a）、範圍與限制（b）、保護令（c）、時點（d）、補充（e）、會議與計畫（f）、簽署認證（g）。2025 年 12 月 1 日生效版本。','plan'],
['27','Depositions to Perpetuate Testimony','保全證言','p.66–67','起訴前或上訴期間保全證言；起訴前聲請須於聽證至少 21 天前送達預期對造。（27(a)(2)）','tools'],
['28','Persons Before Whom Depositions May Be Taken','取證官員','p.68','規範國內外 deposition 的主持人與請求書（letter of request）；與當事人有利害關係者不得擔任。（28(c)）','tools'],
['29','Stipulations About Discovery Procedure','開示程序合意','p.68–69','當事人可合意調整程序；延長期限若影響既定時程須經法院核准。','tools'],
['30','Depositions by Oral Examination','口頭詢問式證言錄取','p.69–73','一般無須許可，但超過 10 位、重複詢問同一人等須經法院許可；原則上 1 日 7 小時；可對組織發出 30(b)(6) 通知；異議須簡潔，僅在特定情形可指示不答。','tools'],
['31','Depositions by Written Questions','書面詢問式證言錄取','p.73–74','以書面問題錄取證言；交叉詢問等後續問題有 14 天與 7 天期限。（31(a)(5)）','tools'],
['32','Using Depositions in Court Proceedings','證言於法庭之使用','p.74–76','規定何時可使用 deposition，包括對造當事人之證言與證人無法到場之情形（如超過 100 英里）；並規定異議之放棄。','tools'],
['33','Interrogatories to Parties','對當事人之書面質詢','p.76–77','含所有 discrete subparts 以 25 題為限；30 日內答覆；異議須具體說明，未及時提出者視為放棄。','tools'],
['34','Producing Documents, ESI, and Tangible Things','文件、ESI 與有形物之提出','p.77–78','請求須以合理特定性描述；30 日內書面回應；異議須說明是否因此保留資料。','tools'],
['35','Physical and Mental Examinations','身心檢查','p.78–79','身心狀況 in controversy 之當事人，法院得於 good cause 時命其接受檢查；並規定檢查報告之交付與特權放棄。','tools'],
['36','Requests for Admission','承認事實請求','p.79–80','30 日內未答覆或異議者，視為承認；承認事項原則上確定成立，須經法院許可才可撤回或修正。','tools'],
['37','Failure to Make Disclosures or to Cooperate in Discovery; Sanctions','不履行揭露或配合義務之制裁','p.80–84','強制命令（a）、違反命令之制裁（b）、未揭露或補充（c）、不出席或不答覆（d）、ESI 滅失（e）、未參與擬定計畫（f）。','dispute']];
var issues=[
['Proportionality 的舉證與適用','Rule 26(b)(1) 列出六項考量因素（議題重要性、爭議金額、資訊取得之落差、當事人資源、開示之重要性、負擔與利益之比較），但條文並未說明誰負舉證責任，也未說明各因素如何權衡。各法院實務見解待查證。'],
['Privilege 主張的說明與時程','Rule 26(b)(5)(A) 要求以不洩漏特權內容之方式描述被扣留的資料；26(f)(3)(D) 與 16(b)(3)(B)(iv) 提及其「時間與方法」。2025 年修正（Rules 16、26）之確切內容與 Committee Note 不在 PDF 中，待查證。'],
['ESI 與 Rule 37(e)','37(e) 區分「損害」與「剝奪使用之意圖」兩層救濟。「reasonable steps」與「intent to deprive」的解釋標準，各巡迴法院是否分歧，待查證。'],
['未揭露之自動排除與例外','Rule 37(c)(1) 以「substantially justified 或 harmless」為例外；法院判斷方式待查證，且不可將單一法院標準視為通用規則。'],
['組織證言 Rule 30(b)(6)','被指定者須就組織「已知或合理可得」的資訊作證；條文要求雙方善意協商詢問事項。2020 年修正內容待查證（歷史註記僅載明 Rule 30 曾於 2020 年修正，PDF p.14）。'],
['Rule 35 的 in controversy 與 good cause','條文要求聲請與 good cause；相關要件之判決標準不在 PDF 內，待查證。'],
['地方規則與法官個別規定','多處條文容許以 local rule 或命令調整，如 26(b)(2)(A)、26(f)(4)、16(b)(1)、16(b)(3)(B)(v)。各法院差異不得一概而論，待查證。'],
['文件內部不一致之處','(1) Foreword 稱收錄 forms，但 Appendix of Forms 已標示 abrogated（PDF p.4、124）；(2) Rule 28 修正紀錄載「Apr. 1, 2007」，其他規則多為「Apr. 30, 2007」（PDF p.68 對照 p.13）；(3) Historical Note 稱 Rule 37(f) 曾於 1981 年廢止，現行 37(f) 之來源待查證（PDF p.10、84）。']];
var sources=[
['主要來源（已閱讀）','U.S. House Committee on the Judiciary, Federal Rules of Civil Procedure, Committee Print No. 4, 119th Cong., 1st Sess. (U.S. GPO 2026)，檔案 CPRT-119HPRT61922.pdf。已逐頁閱讀 Rules 26–37、16、16.1、45 及部分 Rules 1、5、11、56、69；其餘條文僅略讀。'],
['法律依據（PDF 所載）','28 U.S.C. §§ 2072–2074（Rules Enabling Act，PDF p.6–7）；Federal Rules of Evidence 502、702、703、705、402、403（於 Rules 26、16 中被引用）。'],
['判決','PDF 未收錄任何判決，本站未引用任何判決。重要判決之整理待查證。'],
['待補之官方資料','Committee Notes（28 U.S.C. 附錄）、H. Doc. 119–44（2025 年修正）、uscourts.gov 之規則修正資料，均待查證與補入。'],
['頁碼體例','「PDF p.」為檔案頁碼；本文規則的印刷頁碼 = PDF 頁碼 − 19。']];
function $(s){return document.querySelector(s)}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function tbd(s){return esc(s).replace(/待查證/g,'<span class="tag tbd">待查證</span>')}
var chart=$('#flowChart'),det=$('#flowDetail');
function showStage(i){
 var s=stages[i];
 [].forEach.call(chart.querySelectorAll('button'),function(b,j){b.setAttribute('aria-pressed',j===i)});
 det.innerHTML='<h3>'+esc(s.name)+'（'+esc(s.sub)+'）</h3><ul>'+s.pts.map(function(p){return '<li>'+esc(p)+'</li>'}).join('')+'</ul><p>相關規則：'+s.rules.map(function(r){return 'Rule '+r}).join('、')+'</p>';
}
stages.forEach(function(s,i){
 var li=el('li'),b=el('button','',esc(s.name)+'<small>'+esc(s.sub)+'</small>');
 b.type='button';b.setAttribute('aria-pressed','false');
 b.addEventListener('click',function(){showStage(i)});
 li.appendChild(b);chart.appendChild(li);
});
showStage(0);
var fl=$('#ruleFilters'),list=$('#ruleList'),cur='all';
var fopts=[['all','全部'],['plan','規劃'],['tools','開示工具'],['dispute','爭議與制裁']];
function drawRules(){
 list.innerHTML='';
 rules.forEach(function(r){
  if(cur!=='all'&&r[5]!==cur)return;
  list.appendChild(el('article','card','<h3>Rule '+r[0]+' '+esc(r[2])+'</h3><p><span class="tag">'+esc(r[1])+'</span></p><p>'+tbd(r[4])+'</p><p><small>'+P+esc(r[3].replace('p.',''))+'</small></p>'));
 });
}
fopts.forEach(function(o){
 var b=el('button','',o[1]);b.type='button';b.setAttribute('aria-pressed',o[0]===cur);
 b.addEventListener('click',function(){cur=o[0];[].forEach.call(fl.children,function(x,i){x.setAttribute('aria-pressed',fopts[i][0]===cur)});drawRules()});
 fl.appendChild(b);
});
drawRules();
issues.forEach(function(x){$('#issueList').appendChild(el('details','','<summary>'+esc(x[0])+'</summary><p>'+tbd(x[1])+'</p>'))});
sources.forEach(function(x){$('#sourceList').appendChild(el('details','','<summary>'+esc(x[0])+'</summary><p>'+tbd(x[1])+'</p>'))});
var sb=$('#sidebar'),mb=$('#menuBtn');
mb.addEventListener('click',function(){var o=sb.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
sb.addEventListener('click',function(e){if(e.target.tagName==='A'){sb.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
var links=[].slice.call(document.querySelectorAll('.sidebar nav a'));
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
 document.querySelectorAll('main section').forEach(function(s){io.observe(s)});
}
})();
