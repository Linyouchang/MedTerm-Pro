export const BUILDER_CHALLENGES = [
  {
    id: "b01",
    prompt: "請組合出代表「心搏過緩（心率過慢）」的醫學術語",
    target: "Bradycardia",
    hint: "緩慢 (brady-) + 心臟 (cardi) + 狀態 (-ia)",
    pieces: ["brady-", "tachy-", "cardi", "hepat", "-ia", "-itis"],
    answer: ["brady-", "cardi", "-ia"]
  },
  {
    id: "b02",
    prompt: "請組合出代表「高血糖（血液中糖分過高）」的醫學術語",
    target: "Hyperglycemia",
    hint: "過高 (hyper-) + 糖 (glyc) + 血液狀態 (-emia)",
    pieces: ["hyper-", "hypo-", "glyc", "hemat", "-emia", "-uria"],
    answer: ["hyper-", "glyc", "-emia"]
  },
  {
    id: "b03",
    prompt: "請組合出代表「神經痛」的醫學術語",
    target: "Neuralgia",
    hint: "神經 (neur) + 疼痛 (-algia)",
    pieces: ["neur", "nephr", "my", "-algia", "-pathy", "-itis"],
    answer: ["neur", "-algia"]
  },
  {
    id: "b04",
    prompt: "請組合出代表「肝腫大」的醫學術語",
    target: "Hepatomegaly",
    hint: "肝臟 (hepat/o) + 肥大 (-megaly)",
    pieces: ["hepat/o", "cardi/o", "gastr/o", "-megaly", "-scopy", "-ectomy"],
    answer: ["hepat/o", "-megaly"]
  },
  {
    id: "b05",
    prompt: "請組合出代表「呼吸困難」的醫學術語",
    target: "Dyspnea",
    hint: "困難 (dys-) + 呼吸 (-pnea)",
    pieces: ["dys-", "a-", "brady-", "-pnea", "-plegia", "-uria"],
    answer: ["dys-", "-pnea"]
  },
  {
    id: "b06",
    prompt: "請組合出代表「關節成形術（人工關節置換）」的醫學術語",
    target: "Arthroplasty",
    hint: "關節 (arthr/o) + 整形修復術 (-plasty)",
    pieces: ["arthr/o", "oste/o", "bronch/o", "-plasty", "-scopy", "-itis"],
    answer: ["arthr/o", "-plasty"]
  }
];

export const CONFUSABLE_PAIRS = [
  {
    id: "c01",
    question: "病患中風後出現「吞嚥困難」，病歷上應該記載哪一個單字？",
    options: [
      { term: "Dysphagia", zh: "吞嚥困難 (phag = 吃、吞嚥)" },
      { term: "Dysphasia", zh: "語言障礙／失語症 (phas = 說話)" }
    ],
    correctIndex: 0,
    explanation: "注意字根差異：phag- 代表「吃、吞嚥」（如 macrophage 巨噬細胞），phas- 代表「言語」（如 aphasia 失語症）。"
  },
  {
    id: "c02",
    question: "「迴腸（小腸末端）」的英文拼法是哪一個？",
    options: [
      { term: "Ilium", zh: "髂骨（骨盆上方的骨頭）" },
      { term: "Ileum", zh: "迴腸（小腸最後一段）" }
    ],
    correctIndex: 1,
    explanation: "記憶口訣：Ileum 有 e（enter/o 腸道）；Ilium 有 i，像骨盆的直立骨骼。"
  },
  {
    id: "c03",
    question: "「紅血球過低／貧血」與「局部缺血」容易混淆，哪個是指「局部組織血流供應不足（缺血）」？",
    options: [
      { term: "Anemia", zh: "貧血（血紅素或紅血球不足）" },
      { term: "Ischemia", zh: "缺血（組織局部血流受阻）" }
    ],
    correctIndex: 1,
    explanation: "isch- 代表「阻擋、抑制」，ischemia 指血管狹窄或阻塞導致的組織缺血；anemia 則是全身性攜氧能力下降。"
  },
  {
    id: "c04",
    question: "外科手術字尾 -otomy 與 -ostomy 差一個字母，哪個代表「建立永久或暫時性的造口（如結腸造口）」？",
    options: [
      { term: "Colotomy", zh: "結腸切開術（切開後縫合）" },
      { term: "Colostomy", zh: "結腸造口術（拉出腹壁形成人工肛門）" }
    ],
    correctIndex: 1,
    explanation: "記憶口訣：-ostomy 中間有個圓形的 'o'（stoma = 開口），代表造口；-otomy 只是切開；-ectomy 則是完全切除。"
  },
  {
    id: "c05",
    question: "「高血壓」與「高張力（肌肉張力過高）」拼法相近，何者代表高血壓？",
    options: [
      { term: "Hypertension", zh: "高血壓 (tension = 壓力)" },
      { term: "Hypertonia", zh: "肌肉張力過高 (tonia = 張力)" }
    ],
    correctIndex: 0,
    explanation: "Hypertension (HTN) 指動脈血壓過高；Hypertonia 常見於上運動神經元受損後的肌肉痙攣。"
  }
];
