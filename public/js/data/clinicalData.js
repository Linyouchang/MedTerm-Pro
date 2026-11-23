export const ABBR_CATEGORIES = [
  { id: "all", name: "全部縮寫" },
  { id: "order", name: "醫囑與給藥頻率" },
  { id: "vital", name: "生命徵象與檢查" },
  { id: "dx", name: "常見診斷縮寫" },
  { id: "route", name: "給藥途徑" }
];

export const ABBR_BANK = [
  { abbr: "STAT", full: "Statim (Immediately)", zh: "立刻執行／緊急", cat: "order", note: "臨床最優先醫囑，須馬上處置。" },
  { abbr: "PRN", full: "Pro re nata (As needed)", zh: "需要時給予", cat: "order", note: "例如退燒藥或止痛藥依症狀給予。" },
  { abbr: "NPO", full: "Nil per os (Nothing by mouth)", zh: "禁食禁水", cat: "order", note: "術前或特定檢查前常見醫囑。" },
  { abbr: "QD / BID / TID / QID", full: "Once / Twice / 3x / 4x daily", zh: "每日 1 / 2 / 3 / 4 次", cat: "order", note: "高警訊規範建議 QD 改寫為 daily 以免誤讀。" },
  { abbr: "HS", full: "Hora somni (At bedtime)", zh: "睡前服用", cat: "order", note: "常見於安眠藥或 Statin 類降血脂藥。" },
  { abbr: "BP / HR / RR", full: "Blood Pressure / Heart Rate / Respiratory Rate", zh: "血壓／心率／呼吸速率", cat: "vital", note: "基本生命徵象（Vital Signs）核心指標。" },
  { abbr: "SpO2", full: "Peripheral Capillary Oxygen Saturation", zh: "血氧飽和度", cat: "vital", note: "正常成人一般維持在 95%–100%。" },
  { abbr: "CBC", full: "Complete Blood Count", zh: "全血球計數", cat: "vital", note: "包含 WBC、RBC、Hb、Hct、Platelet。" },
  { abbr: "ECG / EKG", full: "Electrocardiogram", zh: "心電圖", cat: "vital", note: "評估心律不整與心肌缺血的首選工具。" },
  { abbr: "CXR", full: "Chest X-Ray", zh: "胸部 X 光", cat: "vital", note: "快速篩檢肺炎、氣胸、心臟肥大與肺水腫。" },
  { abbr: "AMI", full: "Acute Myocardial Infarction", zh: "急性心肌梗塞", cat: "dx", note: "可依心電圖進一步分為 STEMI 與 NSTEMI。" },
  { abbr: "CVA", full: "Cerebrovascular Accident", zh: "腦中風（腦血管意外）", cat: "dx", note: "區分為缺血性 (Ischemic) 與出血性 (Hemorrhagic)。" },
  { abbr: "COPD", full: "Chronic Obstructive Pulmonary Disease", zh: "慢性阻塞性肺病", cat: "dx", note: "常見於長期吸菸族群，伴隨慢性氣流受阻。" },
  { abbr: "UTI", full: "Urinary Tract Infection", zh: "泌尿道感染", cat: "dx", note: "典型症狀包含解尿灼熱、頻尿與下腹不適。" },
  { abbr: "DM", full: "Diabetes Mellitus", zh: "糖尿病", cat: "dx", note: "臨床追蹤指標為 HbA1c（糖化血色素）。" },
  { abbr: "PO", full: "Per os (By mouth)", zh: "口服", cat: "route", note: "最常見且安全的給藥方式。" },
  { abbr: "IV / IVP / IVD", full: "Intravenous / IV Push / IV Drip", zh: "靜脈注射／靜脈推注／靜脈點滴", cat: "route", note: "藥效最快，需注意靜脈炎與滲漏。" },
  { abbr: "IM", full: "Intramuscular", zh: "肌肉注射", cat: "route", note: "常見於疫苗或特定長效針劑。" },
  { abbr: "SC / SubQ", full: "Subcutaneous", zh: "皮下注射", cat: "route", note: "常見於胰島素與低分子量肝素給藥。" }
];

export const ROLEPLAY_SCENARIOS = [
  {
    id: "rp-er",
    title: "急診室胸痛問診 (ER Chest Pain Triage)",
    dept: "急診／心臟科",
    level: "核心臨床",
    summary: "練習使用 OPQRST 原則快速評估急性胸痛病患，辨識高風險警訊。",
    keyPhrases: [
      { en: "When did the chest pain start?", zh: "胸痛是什麼時候開始的？" },
      { en: "Does the pain radiate to your left arm or jaw?", zh: "疼痛會放射到左臂或下巴嗎？" },
      { en: "On a scale of 0 to 10, how severe is the pain?", zh: "0 到 10 分的話，疼痛程度是幾分？" },
      { en: "Are you experiencing shortness of breath or sweating?", zh: "您有呼吸困難或冒冷汗嗎？" }
    ],
    dialogue: [
      { speaker: "Clinician", en: "Good afternoon. I'm Dr. Lin. What brings you to the emergency department today?", zh: "午安，我是林醫師。請問今天是什麼狀況讓您來急診？" },
      { speaker: "Patient", en: "I've been having a heavy, crushing pain in my chest for about an hour.", zh: "我的胸口已經有沉重壓迫感的疼痛大約一小時了。" },
      { speaker: "Clinician", en: "Does the pain radiate to your jaw, neck, or left arm? Any dyspnea or diaphoresis?", zh: "疼痛會放射到下巴、頸部或左臂嗎？有合併呼吸困難或冒冷汗嗎？" },
      { speaker: "Patient", en: "Yes, my left shoulder aches too, and I feel quite short of breath.", zh: "對，我的左肩也在痛，而且覺得很喘。" },
      { speaker: "Clinician", en: "We are going to order an ECG and troponin test STAT, and give you oxygen right away.", zh: "我們會立刻安排心電圖與心肌旋轉蛋白抽血檢查，並先幫您給予氧氣。" }
    ]
  },
  {
    id: "rp-ward",
    title: "病房術前衛教與禁食說明 (Pre-op NPO Education)",
    dept: "外科病房",
    level: "基礎必備",
    summary: "向即將接受腹腔鏡膽囊切除術的病人清楚說明 NPO 時間、用藥與術前準備。",
    keyPhrases: [
      { en: "You need to remain NPO after midnight.", zh: "午夜過後您需要完全禁食禁水。" },
      { en: "Please remove all jewelry and dentures before surgery.", zh: "手術前請取下所有飾品與活動假牙。" },
      { en: "Do you have any known drug allergies?", zh: "請問您有任何已知的藥物過敏史嗎？" }
    ],
    dialogue: [
      { speaker: "Nurse", en: "Hello Mr. Chen. Tomorrow morning you are scheduled for a laparoscopic cholecystectomy.", zh: "陳先生您好，明天早上您安排了腹腔鏡膽囊切除手術。" },
      { speaker: "Patient", en: "Can I drink some water or take my blood pressure pill in the morning?", zh: "請問我明天早上可以喝點水或吃血壓藥嗎？" },
      { speaker: "Nurse", en: "Please stay NPO after midnight—no food or drinks. However, the anesthesiologist approved taking your blood pressure medication with a tiny sip of water.", zh: "午夜過後請保持禁食禁水；但麻醉科醫師核准您早上配一小口白開水服用血壓藥。" },
      { speaker: "Patient", en: "Got it. Thank you for explaining so clearly.", zh: "了解了，謝謝您解釋得這麼清楚。" }
    ]
  },
  {
    id: "rp-discharge",
    title: "糖尿病出院衛教 (Diabetes Discharge Counseling)",
    dept: "內分泌科",
    level: "進階溝通",
    summary: "教導病患辨識低血糖症狀、皮下注射部位輪替與居家血糖監測。",
    keyPhrases: [
      { en: "Rotate your subcutaneous injection sites to prevent lipodystrophy.", zh: "請輪替皮下注射部位，避免脂肪萎縮或硬塊。" },
      { en: "Watch out for signs of hypoglycemia such as trembling or cold sweats.", zh: "請留意低血糖徵兆，如發抖或冒冷汗。" },
      { en: "Follow up in the outpatient clinic in two weeks.", zh: "請於兩週後回門診追蹤。" }
    ],
    dialogue: [
      { speaker: "Pharmacist", en: "Before you go home, let's review how to inject your basal insulin subcutaneously.", zh: "出院前，我們一起複習一下基礎胰島素的皮下注射方式。" },
      { speaker: "Patient", en: "What should I do if I suddenly feel shaky and dizzy?", zh: "如果我突然覺得手抖和頭暈該怎麼辦？" },
      { speaker: "Pharmacist", en: "Check your blood glucose immediately. If it is below 70 mg/dL, follow the 15-15 rule: take 15 grams of fast-acting carbs and recheck in 15 minutes.", zh: "請立刻測血糖。若低於 70 mg/dL，請依循 15-15 法則：補充 15 克速效碳水化合物，15 分鐘後再複測一次。" }
    ]
  }
];
