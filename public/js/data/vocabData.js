export const DEPARTMENTS = [
  { id: "all", name: "全部科別", icon: "🏥" },
  { id: "cardio", name: "心臟內科", icon: "❤️" },
  { id: "neuro", name: "神經科", icon: "🧠" },
  { id: "pulmo", name: "胸腔科", icon: "🫁" },
  { id: "gi", name: "腸胃肝膽科", icon: "🩺" },
  { id: "ortho", name: "骨科與肌肉", icon: "🦴" },
  { id: "renal", name: "腎臟泌尿科", icon: "💧" },
  { id: "endo", name: "內分泌代謝科", icon: "🧬" }
];

export const VOCAB_BANK = [
  {
    id: "v01",
    term: "Bradycardia",
    ipa: "/ˌbræd.iˈkɑːr.di.ə/",
    zh: "心搏過緩",
    dept: "cardio",
    level: "基礎",
    morphemes: [
      { part: "brady-", type: "prefix", meaning: "緩慢 (slow)" },
      { part: "cardi", type: "root", meaning: "心臟 (heart)" },
      { part: "-ia", type: "suffix", meaning: "狀態、病症 (condition)" }
    ],
    definition: "成人靜息心率低於每分鐘 60 次的心律狀態。",
    example: "The patient presented with symptomatic bradycardia and dizziness."
  },
  {
    id: "v02",
    term: "Tachycardia",
    ipa: "/ˌtæk.ɪˈkɑːr.di.ə/",
    zh: "心搏過速",
    dept: "cardio",
    level: "基礎",
    morphemes: [
      { part: "tachy-", type: "prefix", meaning: "快速 (fast)" },
      { part: "cardi", type: "root", meaning: "心臟 (heart)" },
      { part: "-ia", type: "suffix", meaning: "狀態、病症 (condition)" }
    ],
    definition: "成人靜息心率超過每分鐘 100 次的異常心跳加速。",
    example: "Sinus tachycardia is often a physiological response to fever or pain."
  },
  {
    id: "v03",
    term: "Cardiomegaly",
    ipa: "/ˌkɑːr.di.oʊˈmeɡ.ə.li/",
    zh: "心臟肥大",
    dept: "cardio",
    level: "進階",
    morphemes: [
      { part: "cardi/o", type: "root", meaning: "心臟 (heart)" },
      { part: "-megaly", type: "suffix", meaning: "肥大 (enlargement)" }
    ],
    definition: "胸部 X 光或超音波顯示心臟體積異常擴大。",
    example: "Chest X-ray revealed cardiomegaly with pulmonary congestion."
  },
  {
    id: "v04",
    term: "Myocarditis",
    ipa: "/ˌmaɪ.oʊ.kɑːrˈdaɪ.tɪs/",
    zh: "心肌炎",
    dept: "cardio",
    level: "進階",
    morphemes: [
      { part: "my/o", type: "root", meaning: "肌肉 (muscle)" },
      { part: "cardi", type: "root", meaning: "心臟 (heart)" },
      { part: "-itis", type: "suffix", meaning: "發炎 (inflammation)" }
    ],
    definition: "心肌層的發炎反應，常由病毒感染或自體免疫引起。",
    example: "Elevated troponin levels raised suspicion for acute myocarditis."
  },
  {
    id: "v05",
    term: "Electrocardiogram",
    ipa: "/ɪˌlek.troʊˈkɑːr.di.ə.ɡræm/",
    zh: "心電圖",
    dept: "cardio",
    level: "基礎",
    morphemes: [
      { part: "electr/o", type: "root", meaning: "電 (electricity)" },
      { part: "cardi/o", type: "root", meaning: "心臟 (heart)" },
      { part: "-gram", type: "suffix", meaning: "紀錄圖形 (record)" }
    ],
    definition: "記錄心臟電氣活動波動的檢查圖形（簡稱 ECG / EKG）。",
    example: "A 12-lead electrocardiogram was performed immediately in the ER."
  },
  {
    id: "v06",
    term: "Hemiplegia",
    ipa: "/ˌhem.iˈpliː.dʒə/",
    zh: "半身不遂／偏癱",
    dept: "neuro",
    level: "進階",
    morphemes: [
      { part: "hemi-", type: "prefix", meaning: "一半 (half)" },
      { part: "-plegia", type: "suffix", meaning: "麻痺、癱瘓 (paralysis)" }
    ],
    definition: "身體左側或右側完全失去自主運動功能，常見於腦中風後。",
    example: "Left-sided hemiplegia resulted from a right middle cerebral artery stroke."
  },
  {
    id: "v07",
    term: "Neuralgia",
    ipa: "/njʊəˈræl.dʒə/",
    zh: "神經痛",
    dept: "neuro",
    level: "基礎",
    morphemes: [
      { part: "neur", type: "root", meaning: "神經 (nerve)" },
      { part: "-algia", type: "suffix", meaning: "疼痛 (pain)" }
    ],
    definition: "沿著特定神經分布路徑產生的劇烈、電擊樣或燒灼樣疼痛。",
    example: "Trigeminal neuralgia causes sudden, severe facial pain."
  },
  {
    id: "v08",
    term: "Encephalopathy",
    ipa: "/enˌsef.əˈlɒp.ə.θi/",
    zh: "腦病變",
    dept: "neuro",
    level: "進階",
    morphemes: [
      { part: "encephal/o", type: "root", meaning: "腦部 (brain)" },
      { part: "-pathy", type: "suffix", meaning: "病變 (disease)" }
    ],
    definition: "泛指影響大腦結構或功能的瀰漫性疾病，常表現為意識混亂。",
    example: "Hepatic encephalopathy is associated with elevated serum ammonia."
  },
  {
    id: "v09",
    term: "Dyspnea",
    ipa: "/dɪspˈniː.ə/",
    zh: "呼吸困難",
    dept: "pulmo",
    level: "基礎",
    morphemes: [
      { part: "dys-", type: "prefix", meaning: "困難、異常 (difficult/painful)" },
      { part: "-pnea", type: "suffix", meaning: "呼吸 (breathing)" }
    ],
    definition: "主觀感受到呼吸費力、氣促或空氣不足的臨床症狀。",
    example: "The patient reported progressive exertional dyspnea over two weeks."
  },
  {
    id: "v10",
    term: "Pneumothorax",
    ipa: "/ˌnjuː.moʊˈθɔːr.æks/",
    zh: "氣胸",
    dept: "pulmo",
    level: "進階",
    morphemes: [
      { part: "pneum/o", type: "root", meaning: "空氣、肺 (air/lung)" },
      { part: "thorax", type: "root", meaning: "胸腔 (chest)" }
    ],
    definition: "空氣進入肋膜腔導致肺葉部分或完全塌陷的急症。",
    example: "Tension pneumothorax requires immediate needle decompression."
  },
  {
    id: "v11",
    term: "Bronchoscopy",
    ipa: "/brɒŋˈkɒs.kə.pi/",
    zh: "支氣管鏡檢查",
    dept: "pulmo",
    level: "進階",
    morphemes: [
      { part: "bronch/o", type: "root", meaning: "支氣管 (bronchus)" },
      { part: "-scopy", type: "suffix", meaning: "內視鏡檢視 (visual examination)" }
    ],
    definition: "利用軟式或硬式內視鏡直接觀察氣管與支氣管內部構造。",
    example: "Bronchoscopy was scheduled to obtain a biopsy of the lung mass."
  },
  {
    id: "v12",
    term: "Hepatomegaly",
    ipa: "/ˌhep.ə.toʊˈmeɡ.ə.li/",
    zh: "肝腫大",
    dept: "gi",
    level: "基礎",
    morphemes: [
      { part: "hepat/o", type: "root", meaning: "肝臟 (liver)" },
      { part: "-megaly", type: "suffix", meaning: "肥大 (enlargement)" }
    ],
    definition: "肝臟體積超過正常解剖範圍的臨床徵象。",
    example: "Abdominal palpation demonstrated mild hepatomegaly."
  },
  {
    id: "v13",
    term: "Cholecystectomy",
    ipa: "/ˌkoʊ.lɪ.sɪsˈtek.tə.mi/",
    zh: "膽囊切除術",
    dept: "gi",
    level: "高階",
    morphemes: [
      { part: "chole-", type: "root", meaning: "膽汁 (bile)" },
      { part: "cyst", type: "root", meaning: "囊袋 (sac/bladder)" },
      { part: "-ectomy", type: "suffix", meaning: "切除術 (surgical removal)" }
    ],
    definition: "以外科手術（常為腹腔鏡微創）切除膽囊的處置。",
    example: "Laparoscopic cholecystectomy is the standard treatment for gallstones."
  },
  {
    id: "v14",
    term: "Gastroenteritis",
    ipa: "/ˌɡæs.troʊ.en.təˈraɪ.tɪs/",
    zh: "腸胃炎",
    dept: "gi",
    level: "基礎",
    morphemes: [
      { part: "gastr/o", type: "root", meaning: "胃 (stomach)" },
      { part: "enter", type: "root", meaning: "腸道 (intestine)" },
      { part: "-itis", type: "suffix", meaning: "發炎 (inflammation)" }
    ],
    definition: "胃部與小腸黏膜的急性發炎，常伴隨嘔吐與腹瀉。",
    example: "Oral rehydration is essential in managing acute viral gastroenteritis."
  },
  {
    id: "v15",
    term: "Osteoarthritis",
    ipa: "/ˌɒs.ti.oʊ.ɑːrˈθraɪ.tɪs/",
    zh: "退化性關節炎",
    dept: "ortho",
    level: "基礎",
    morphemes: [
      { part: "oste/o", type: "root", meaning: "骨骼 (bone)" },
      { part: "arthr", type: "root", meaning: "關節 (joint)" },
      { part: "-itis", type: "suffix", meaning: "發炎 (inflammation)" }
    ],
    definition: "關節軟骨逐漸磨損退化並伴隨骨刺生成的慢性關節病變。",
    example: "Knee osteoarthritis commonly causes morning stiffness and joint pain."
  },
  {
    id: "v16",
    term: "Arthroplasty",
    ipa: "/ˈɑːr.θroʊ.plæs.ti/",
    zh: "關節成形術／人工關節置換",
    dept: "ortho",
    level: "進階",
    morphemes: [
      { part: "arthr/o", type: "root", meaning: "關節 (joint)" },
      { part: "-plasty", type: "suffix", meaning: "整形修復術 (surgical repair)" }
    ],
    definition: "透過手術重建或置換受損關節以恢復活動功能。",
    example: "Total hip arthroplasty significantly improved the patient's mobility."
  },
  {
    id: "v17",
    term: "Nephrolithiasis",
    ipa: "/ˌnef.roʊ.lɪˈθaɪ.ə.sɪs/",
    zh: "腎結石",
    dept: "renal",
    level: "高階",
    morphemes: [
      { part: "nephr/o", type: "root", meaning: "腎臟 (kidney)" },
      { part: "lith", type: "root", meaning: "結石 (stone)" },
      { part: "-iasis", type: "suffix", meaning: "病理狀態 (abnormal condition)" }
    ],
    definition: "礦物質與鹽類在腎臟集尿系統中結晶形成的結石病症。",
    example: "Flank pain radiating to the groin is classic for nephrolithiasis."
  },
  {
    id: "v18",
    term: "Hematuria",
    ipa: "/ˌhiː.məˈtjʊə.ri.ə/",
    zh: "血尿",
    dept: "renal",
    level: "基礎",
    morphemes: [
      { part: "hemat", type: "root", meaning: "血液 (blood)" },
      { part: "-uria", type: "suffix", meaning: "尿液狀態 (urine condition)" }
    ],
    definition: "尿液中出現紅血球，可分為肉眼可見血尿與顯微血尿。",
    example: "Painless gross hematuria warrants evaluation for urologic malignancy."
  },
  {
    id: "v19",
    term: "Hyperglycemia",
    ipa: "/ˌhaɪ.pər.ɡlaɪˈsiː.mi.ə/",
    zh: "高血糖",
    dept: "endo",
    level: "基礎",
    morphemes: [
      { part: "hyper-", type: "prefix", meaning: "過高、過度 (excessive)" },
      { part: "glyc", type: "root", meaning: "糖分 (sugar/glucose)" },
      { part: "-emia", type: "suffix", meaning: "血液狀態 (blood condition)" }
    ],
    definition: "血液中葡萄糖濃度異常升高的代謝狀態，常見於糖尿病。",
    example: "Persistent hyperglycemia increases the risk of microvascular complications."
  },
  {
    id: "v20",
    term: "Hypothyroidism",
    ipa: "/ˌhaɪ.poʊˈθaɪ.rɔɪ.dɪ.zəm/",
    zh: "甲狀腺功能低下",
    dept: "endo",
    level: "基礎",
    morphemes: [
      { part: "hypo-", type: "prefix", meaning: "過低、不足 (deficient)" },
      { part: "thyroid", type: "root", meaning: "甲狀腺 (thyroid gland)" },
      { part: "-ism", type: "suffix", meaning: "狀態、症候 (condition)" }
    ],
    definition: "甲狀腺荷爾蒙分泌不足導致全身代謝率下降的內分泌疾病。",
    example: "Fatigue, weight gain, and cold intolerance are hallmarks of hypothyroidism."
  }
];

export const MORPHEME_CHEATSHEET = {
  prefixes: [
    { token: "a- / an-", meaning: "無、缺乏 (without)", example: "Anemia (貧血), Apnea (呼吸暫停)" },
    { token: "brady-", meaning: "緩慢 (slow)", example: "Bradycardia (心搏過緩), Bradypnea (呼吸過緩)" },
    { token: "tachy-", meaning: "快速 (fast)", example: "Tachycardia (心搏過速), Tachypnea (呼吸急促)" },
    { token: "hyper-", meaning: "過高、過度 (excessive)", example: "Hypertension (高血壓), Hyperglycemia (高血糖)" },
    { token: "hypo-", meaning: "過低、不足 (deficient)", example: "Hypotension (低血壓), Hypoxia (缺氧)" },
    { token: "dys-", meaning: "困難、疼痛、異常 (difficult)", example: "Dyspnea (呼吸困難), Dysphagia (吞嚥困難)" },
    { token: "hemi-", meaning: "半邊 (half)", example: "Hemiplegia (偏癱), Hemicolectomy (半結腸切除)" },
    { token: "poly-", meaning: "多、頻繁 (many/much)", example: "Polyuria (多尿), Polydipsia (多飲)" },
    { token: "peri-", meaning: "周圍 (around)", example: "Pericarditis (心包炎), Perinatal (圍產期)" },
    { token: "sub-", meaning: "下方、次於 (under/below)", example: "Subcutaneous (皮下), Subdural (硬腦膜下)" }
  ],
  roots: [
    { token: "cardi/o", meaning: "心臟 (heart)", example: "Cardiology, Cardiomegaly" },
    { token: "neur/o", meaning: "神經 (nerve)", example: "Neuropathy, Neuralgia" },
    { token: "encephal/o", meaning: "腦部 (brain)", example: "Encephalitis, Encephalopathy" },
    { token: "pneum/o, pulmon/o", meaning: "肺、空氣 (lung/air)", example: "Pneumonia, Pneumothorax" },
    { token: "hepat/o", meaning: "肝臟 (liver)", example: "Hepatitis, Hepatomegaly" },
    { token: "gastr/o", meaning: "胃 (stomach)", example: "Gastritis, Gastrectomy" },
    { token: "nephr/o, ren/o", meaning: "腎臟 (kidney)", example: "Nephritis, Nephrolithiasis" },
    { token: "hemat/o, hem/o", meaning: "血液 (blood)", example: "Hematology, Hematuria" },
    { token: "oste/o", meaning: "骨骼 (bone)", example: "Osteoporosis, Osteoarthritis" },
    { token: "arthr/o", meaning: "關節 (joint)", example: "Arthritis, Arthroplasty" },
    { token: "dermat/o", meaning: "皮膚 (skin)", example: "Dermatitis, Dermatology" },
    { token: "my/o", meaning: "肌肉 (muscle)", example: "Myalgia, Myocarditis" }
  ],
  suffixes: [
    { token: "-itis", meaning: "發炎 (inflammation)", example: "Gastritis (胃炎), Appendicitis (闌尾炎)" },
    { token: "-ectomy", meaning: "外科切除術 (surgical removal)", example: "Cholecystectomy (膽囊切除術)" },
    { token: "-otomy", meaning: "切開術 (incision into)", example: "Tracheotomy (氣管切開術)" },
    { token: "-ostomy", meaning: "造口術 (surgical opening)", example: "Colostomy (結腸造口術)" },
    { token: "-scopy", meaning: "內視鏡檢查 (visual exam)", example: "Bronchoscopy (支氣管鏡檢查)" },
    { token: "-megaly", meaning: "肥大、腫大 (enlargement)", example: "Cardiomegaly (心臟肥大)" },
    { token: "-algia", meaning: "疼痛 (pain)", example: "Neuralgia (神經痛), Myalgia (肌痛)" },
    { token: "-pathy", meaning: "疾病、病變 (disease)", example: "Neuropathy (神經病變)" },
    { token: "-emia", meaning: "血液狀態 (blood condition)", example: "Hyperglycemia (高血糖), Sepsis/Bacteremia" },
    { token: "-uria", meaning: "尿液狀態 (urine condition)", example: "Hematuria (血尿), Dysuria (解尿困難)" },
    { token: "-plasty", meaning: "整形修復術 (surgical repair)", example: "Arthroplasty (關節成形術)" },
    { token: "-gram", meaning: "紀錄圖形 (record/image)", example: "Electrocardiogram (心電圖)" }
  ]
};
