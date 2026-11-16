# 美國聯邦民事訴訟證據開示制度（Discovery）研究網站

以 FRCP Rules 26–37 為核心的繁體中文靜態研究網站（HTML、CSS、Vanilla JavaScript，可部署於 GitHub Pages）。

## 完成說明
- 首頁與專案簡介、可點選的 Discovery 程序流程圖、Rules 26–37 規則卡片（可依階段篩選）、程序與法律爭議、研究資料與來源。
- 資料來源（三份，分別標示 A／B／C）：A `CPRT-119HPRT61922.pdf`（FRCP，截至 2025-12-01）；B 殷玉龍〈美國證據開示制度簡介〉（刑事，2014）；C 楊佩文碩士論文（ESI，2009）。各來源觀點分開呈現，差異不推論為一致。
- A 僅含規則文字；判決均轉引自 B、C，判決原文待查證。
- 新增「多來源比較」區塊（9 項）。C 第壹、肆、伍、陸章尚未閱讀。
- 未完成：Committee Notes、2025 年修正理由、判決原文查證，以及 `database/` 索引。

## 使用方式
1. 直接開啟 `docs/index.html` 即可瀏覽（不需建置）。
2. 本機伺服器：在專案根目錄執行 `python3 -m http.server 8000`，開啟 `http://localhost:8000/docs/`。
3. GitHub Pages：Settings → Pages → Branch 選 main，資料夾選 `/docs`。
4. 修改內容：流程階段、規則、爭議與來源資料集中在 `docs/js/main.js` 上方的資料陣列。

## 結構
```
docs/index.html     頁面結構
docs/css/style.css  樣式
docs/js/main.js     資料與互動
```
