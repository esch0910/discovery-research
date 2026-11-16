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
var SRC={A:'A 《FRCP》Committee Print（2025 版）',B:'B 殷玉龍〈美國證據開示制度簡介〉（刑事）',C:'C 楊佩文碩士論文（2009，ESI）'};
var compare=[
['民事與刑事：兩套不同的制度',[
['A','FRCP 規範聯邦地方法院的民事程序（Rule 1，PDF p.20）；Rule 26(b)(1) 的範圍為不受特權保護、與主張或抗辯相關且符合比例之事項（PDF p.60）。'],
['B','本文討論的是刑事證據開示。聯邦憲法無直接規定；檢方開示有利證據的依據是 Brady v. Maryland, 373 U.S. 83 (1963) 所建立的正當法律程序（p.71–72）。具體範圍見 Fed. R. Crim. P. 16 與 Jencks Act／Rule 26.2（p.75–76）。']],
'整理：B 屬刑事資料，不得用來解釋 FRCP Rules 26–37；本站僅作比較背景。B 為 2014 年文章，其後法律變動待查證。'],
['開示範圍：26(b)(1) 的版本差異',[
['A','現行文字為與任何一方主張或抗辯相關且 proportional to the needs of the case，並列出六項比例考量（重要性、爭議金額、資訊取得之落差、資源、開示之重要性、負擔與利益）；未見 reasonably calculated 字樣（PDF p.60–61）。'],
['C','引述 2006 年前後之版本：另可經 good cause 擴及 subject matter，並含 reasonably calculated 之句（p.53 註 147、p.9）；並說明 2000 年修法建立 claim or defense 與 subject matter 的二階段（p.25–26）。']],
'兩份資料是不同時期的條文。A 的 PDF 無修正對照，修正原因與時點待查證（A 的歷史註記載 Rule 26 曾於 2000、2006、2010、2015、2025 年修正，p.12–15）。'],
['ESI 與「無法合理取得」：26(b)(2)(B)',[
['A','提供方須證明來源因 undue burden or cost 而 not reasonably accessible；若證明，法院仍可在要求方證明 good cause 並考量 26(b)(2)(C) 時命令開示，並得訂定條件（PDF p.61）。條文未明言費用移轉。'],
['C','引述 2006 年條文，結構相同，並以流程圖說明二階段（p.36–38、57）；引 2006 年 Committee Note 稱條件可包括由要求方負擔部分或全部費用（p.57 註 156）。判決：Zubulake v. UBS Warburg, 216 F.R.D. 280, 284 (S.D.N.Y. 2003) 之七項費用移轉要素（p.58）；Baker v. Gerould, 2008 WL 850236 (W.D.N.Y. 2008) 與 Mikron Ind. v. Hurd Windows & Doors, 2008 WL 1805727 (W.D. Wash.) 要求提供方以具體證據證明（p.55–56、59–60）。']],
'上述均為地方法院見解，不可視為各法院通用規則。Zubulake 要素在現行規則下之地位待查證；判決原文待查證。'],
['ESI 滅失：舊 37(f) 與現行 37(e)',[
['C','引 2006 年 Rule 37(f)：因常規、善意操作電子資訊系統而滅失之 ESI，除非有特殊情況，法院不得依本法制裁（p.42–43）。'],
['A','現行 Rule 37(e)：應保存之 ESI 因未採合理措施而滅失且無法補回時，(1) 有損害則得採不逾必要之措施；(2) 僅在認定有剝奪他方使用之意圖時，才可推定不利、為陪審團指示，或駁回、缺席判決（PDF p.83–84）。']],
'二者文字與標準不同，C 的標準不得套用於現行規則。A 的歷史註記載 Rule 37 曾於 2013、2015 年修正（p.13–14），修正內容待查證。A 的註記亦稱舊 37(f) 曾於 1981 年廢止（p.10），與 C 所指 2006 年 37(f) 的關係待查證。'],
['保存義務的啟動與 litigation hold',[
['C','合理預期訴訟時，保存義務即啟動（p.48，引 Convlove v. Compaq, 223 F.R.D. 162, 175 (S.D.N.Y. 2004)，案名拼寫待查證）；Zubulake 案三要件：保存、書面通知、監督（p.49）；Treppel v. Biovail Corp., 249 F.R.D. 111 (S.D.N.Y. 2008)：法院認定保存作為明顯不足，但拒絕不利推論之請求，改命被告付費回復並搜尋（p.50–52）。'],
['A','Rule 37(e) 僅提到 anticipation or conduct of litigation，未使用 litigation hold 一詞（PDF p.83）。']],
'訴訟保留屬判決與實務見解，不在 A 的規則文字中。其後各法院標準待查證。'],
['特權與 clawback：26(b)(5)(B)、26(f)(3)(D)',[
['A','現行 26(b)(5)(B)：通知後須返還、隔離或銷毀，不得使用，並可向法院密封提交（PDF p.63）；26(f)(3)(D) 提及 26(b)(5)(A) 之時間與方法及 FRE 502（PDF p.65）。'],
['C','引述 2006 年版 26(b)(5)(B)，程序相同（p.39–41）；26(f)(4) 僅要求討論是否請法院將協議納入命令（p.33–34）；指出該條未規定是否棄權，須由法院另定標準（p.40）。']],
'26(f)(3)(D) 的新增文字之修正理由待查證（Committee Note 不在 A 與 C 之內）。'],
['Rule 45 對第三人：ESI',[
['A','Rule 45(e)(1)(D)：被傳喚者無須提供以 undue burden or cost 而無法合理取得之 ESI（PDF p.91）。'],
['C','2006 年條文編號為 45(d)(1)(D)，並說明與 Rule 34、26 配合（p.43–45）。']],
'兩者編號不同，以 A 為準；Rule 45 於 2013 年修正（A p.13）。'],
['規則制定程序',[
['A','Rules Enabling Act，28 U.S.C. §§ 2072–2074（PDF p.6–7）；2025 年修正自 2025 年 12 月 1 日生效（PDF p.14–15）。'],
['C','Standing Committee、Judicial Conference、最高法院至國會；最高法院於 5 月 1 日前提交，12 月 1 日生效（p.19–21）。']],
'二者一致，但 C 為 2009 年之描述，現行程序待查證。'],
['刑事證據開示（僅供比較背景）',[
['B','Bagley, 473 U.S. 667, 682 (1985)：重要性以合理可能性判斷；Kyles v. Whitley 要求整體判斷並及於警方持有之資訊（p.73–74）。開示由檢方自行審查，作者轉述學者批評（p.74）；開示時點無明確規定（p.77–78）；Ruiz 案認為認罪協商前不要求開示彈劾證據（p.78–79）；Williams v. Florida 認為被告開示義務不違反第 5 修正案（p.77）；Fed. R. Crim. P. 16(b)、12.1、12.2 規範被告義務（p.77）；open file 之優缺點（p.79–81）；違反之效果（p.82）。'],
['A','不涉及。']],
'B 未提供 Kyles、Ruiz、Williams 之完整引註，判決原文待查證；2012 年法案（S.2197）未通過，係 B 轉述 Green 一文（p.84），原始資料待查證。']
];

rules[0][6]='C p.36–41 說明 2006 年 ESI 修法（26(a)(1)、26(b)(2)(B)、26(b)(5)(B)、26(f)）；與現行文字之差異見「多來源比較」。';
rules[8][6]='C p.30–32 說明 2006 年將 ESI 與 document 並列及提供形式規則；現行條文編號以 A 為準。';
rules[11][6]='C p.42–43 之舊 37(f) 與 A 現行 37(e) 之標準不同，見「多來源比較」。';
issues.push(['保存義務何時啟動','C 介紹合理預期訴訟時啟動與 litigation hold（p.48–50），但屬判決與實務見解，A 的規則文字未規定。各法院標準待查證。'],['舊版文字與現行文字','C 引用 2006 年之條文與編號（p.29–30 對照表），A 為 2025 年現行版。引用 C 時須先核對 A，不得將舊版標準直接套用。']);
sources[0]=['主要來源（已閱讀）','A：U.S. House Committee on the Judiciary, Federal Rules of Civil Procedure, Committee Print No. 4（2026），檔案 CPRT-119HPRT61922.pdf，已讀 Rules 26–37、16、16.1、45 及部分 Rules 1、5、11、56、69。B：殷玉龍，〈美國證據開示制度簡介〉，2014 日新司法年刊，p.71–84，已全文閱讀；內容為刑事證據開示。C：楊佩文，《美國聯邦民事訴訟程序法有關證據開示程序之研究——以電子化儲存資訊為中心》，國立交通大學碩士論文（2009 年 12 月），已讀摘要、目錄、第貳章與第參章（p.8–60）；第壹、肆、伍、陸章尚未閱讀。'];
sources[2]=['判決（均轉引自 B、C，判決原文待查證）','來自 C：Zubulake v. UBS Warburg LLC, 216 F.R.D. 280 (S.D.N.Y. 2003)；Rowe Entm\u2019t v. William Morris Agency, 205 F.R.D. 421 (S.D.N.Y. 2002)；Treppel v. Biovail Corp., 249 F.R.D. 111 (S.D.N.Y. 2008)；Baker v. Gerould, 2008 WL 850236 (W.D.N.Y. 2008)；Mikron Ind. v. Hurd Windows & Doors, 2008 WL 1805727 (W.D. Wash.)；Oppenheimer Fund v. Sanders, 437 U.S. 340, 358 (1978)。來自 B（刑事）：Brady v. Maryland, 373 U.S. 83 (1963)；United States v. Bagley, 473 U.S. 667 (1985)。A 不含任何判決。'];
sources[3]=['待補之官方資料','Committee Notes、H. Doc. 119-44、各判決原文、C 第肆至陸章（特權、Sedona Conference、質化研究與企業訪談）、B 所引 18 U.S.C. § 3500 與 Fed. R. Crim. P. 之現行文字，均待查證。'];
sources[4]=['頁碼體例','A：PDF p. 為檔案頁碼，本文規則印刷頁 = PDF 頁 − 19。B：期刊頁碼。C：論文印刷頁碼（PDF 頁 = 印刷頁 + 9）。各來源之觀點分別呈現，彼此差異不推論為一致結論。'];
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
  list.appendChild(el('article','card','<h3>Rule '+r[0]+' '+esc(r[2])+'</h3><p><span class="tag">'+esc(r[1])+'</span></p><p>'+tbd(r[4])+'</p>'+(r[6]?'<p><span class="tag">補充</span>'+tbd(r[6])+'</p>':'')+'<p><small>'+P+esc(r[3].replace('p.',''))+'</small></p>'));
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
compare.forEach(function(x){var h='<summary>'+esc(x[0])+'</summary>';x[1].forEach(function(r){h+='<p class="src"><span class="tag">'+esc(SRC[r[0]])+'</span><br>'+tbd(r[1])+'</p>'});h+='<p class="src-note">'+tbd(x[2])+'</p>';$('#cmpList').appendChild(el('details','',h))});
var sb=$('#sidebar'),mb=$('#menuBtn');
mb.addEventListener('click',function(){var o=sb.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
sb.addEventListener('click',function(e){if(e.target.tagName==='A'){sb.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
var links=[].slice.call(document.querySelectorAll('.sidebar nav a'));
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
 document.querySelectorAll('main section').forEach(function(s){io.observe(s)});
}
})();
