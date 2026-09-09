/* ===================== CONFIG ===================== */
const CONFIG={
  feedUrl:"data/feed.json",   // written by .github/workflows/feed.yml (weekly + on demand)
  email:["puria","geodesicresearch.org"],   // assembled at runtime so the address never sits in the page source as text
  substack:"https://puriaradmard.substack.com",
  lesswrong:"https://www.lesswrong.com/users/puria",
  scholar:"https://scholar.google.com/citations?hl=en&user=O3Lza0oAAAAJ",
  geodesic:"https://www.geodesicresearch.ai",
  papers:[
    {title:"Alignment pretraining: AI discourse causes self-fulfilling (mis)alignment",
     date:"2025-12-21",
     meta:"2025 · Tice*, Radmard*, Ratnam, Kim, Africa, O'Brien · Geodesic Research, UK AISI",
     sub:"LLMs pretrained on data about misaligned AIs become less aligned. Pretraining on synthetic data about well-behaved AIs undoes that, without the need for filtering. In collaboration with UK AISI",
     links:[["paper site","https://alignmentpretraining.ai/"],["arxiv","https://arxiv.org/abs/2601.10160"],["models & data","https://huggingface.co/collections/geodesic-research/alignment-pretraining-geodesic-2025-data-and-models"]]}
  ]
};
/* =================================================== */
