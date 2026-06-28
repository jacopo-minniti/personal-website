export interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  conference?: string;
  year: string;
  abstract: string;
  keywords: string[];
  link?: string;
  isPreregistration?: boolean;
  bibtex?: string;
}

export const papers: Paper[] = [
  {
    id: "p3",
    title: "Learned Relay Representations for Forward-Thinking Discrete Diffusion Models",
    authors: ["Rozonoyer, B.", "Minniti, J.", "Patel, D.", "Band, N.", "Bose, A. J.", "Rudner, T. G. J.", "McCallum, A."],
    journal: "arXiv preprint arXiv:2605.22967",
    year: "2026",
    abstract: "When Masked Diffusion Models (MDMs) generate sequences through iterative refinement, the rich internal computation over masked positions is discarded, forcing every subsequent refinement step to recompute the valuable internal information stored as model representations. To avoid a hard reset between denoising rounds, we propose Learned Relay Representations (Relay), a method that allows MDMs to be forward-thinking when denoising by explicitly learning how to propagate latent information for the benefit of future denoising steps. Relay introduces a differentiable per-token channel that passes information between forward passes and is trained via truncated backpropagation through time (BPTT). We show that this framework can be scaled to state-of-the-art Diffusion Language Models (DLMs), and is seamlessly compatible with techniques like block diffusion and KV caching. We first provide a thorough justification of the design choices in Relay on a challenging Sudoku-based planning task. We then scale Relay to Fast-dLLM v2, a state-of-the-art DLM, outperforming standard supervised finetuning on coding tasks while reducing inference latency by up to 32%. Our empirical results demonstrate that state-of-the-art DLMs can be explicitly trained to relay latent information forward across decoding steps, advancing the performance-latency Pareto frontier. We provide code for all our experiments.",
    keywords: ["Discrete Diffusion", "Diffusion Language Models", "Latent Representations"],
    link: "https://arxiv.org/abs/2605.22967",
    bibtex: `@article{rozonoyer2026learned,
  title={Learned Relay Representations for Forward-Thinking Discrete Diffusion Models},
  author={Rozonoyer, Benjamin and Minniti, Jacopo and Patel, Dhruvesh and Band, Neil and Bose, Avishek Joey and Rudner, Tim GJ and McCallum, Andrew},
  journal={arXiv preprint arXiv:2605.22967},
  year={2026}
}`,
  },
  {
    id: "p1",
    title: "Challenges in Inference-Time Scaling with Uncertainty-Aware Tree Search",
    journal: "",
    authors: ["Minniti, J.", "Band, N.", "Rudner, T. G. J."],
    conference: "ICLR",
    year: "2026",
    abstract: "Inference-time search has emerged as a powerful paradigm for scaling the reasoning capabilities of large language models. Standard approaches, such as beam search, rely on process reward models (PRMs) to provide dense, step-by-step scoring to identify promising reasoning paths. However, scaling these methods results in a known failure mode: as compute budgets increase, the search algorithm encounters out-of-distribution states that are spuriously assigned high value, decoupling the proxy reward from actual reasoning ability. To address this issue, we propose Uncertainty-Aware Tree Search (UATS). Rather than relying solely on PRM value estimates, UATS uses a process uncertainty model (PUM) to predict when the value model's predictions are likely unreliable. UATS uses PUM predictions to dynamically allocate computational resources, increasing the branching factor at high-uncertainty nodes to resolve ambiguity through exploration. In our empirical evaluation, we find that while PUMs perform well on held-out in-distribution data, strong in-distribution generalization does not translate into improved downstream inference-time uncertainty-guided search. On instruction-tuned models, UATS matches standard beam search, whereas when applied to reasoning models, it consistently and counterintuitively degrades performance as inference-time compute grows. This failure is an instructive negative result, as it suggests that the search-induced distribution shift that leads to poor generalization for PRMs also leads to poor generalization for process uncertainty models. Our results demonstrate that uncertainty-guided inference-time scaling requires robust process uncertainty models that remain reliable under search-induced distribution shift.",
    keywords: ["Uncertainty Quantification", "Reasoning Scaling", "LLMs"],
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=35e-vPwAAAAJ&citation_for_view=35e-vPwAAAAJ:Tyk-4Ss8FVUC",
  },
  {
    id: "p2",
    authors: ["Chen, P.", "Hulme, R.C.", "Minniti, J.", "Lee, C.L.", "Rodd, J.M."],
    journal: "Journal of Memory and Language [Under Review]",
    conference: "CLDC 12",
    year: "2025",
    title: "Effects of Age, Semantic Relatedness, and Vocabulary Knowledge on Learning New Word Meanings",
    abstract: "This study investigates whether ageing, pre-existing semantic knowledge (e.g., meaning relatedness), and individual vocabulary knowledge influence the learning of form-meaning associations and the acquisition of semantic features of new meanings for familiar words. Our recent study found that older participants recalled fewer newly learned meanings than younger adults. Participants also recalled more related than unrelated new meanings, and those with higher vocabulary scores retrieved more newly learned meanings overall (Chen et al., 2024; Hulme et al., 2024). Interestingly, when any information about a new meaning was recalled, older adults retrieved as many semantic features as younger adults. Similarly, participants recalled a comparable number of semantic features for related and unrelated new meanings. However, individuals with higher vocabulary scores recalled more semantic features overall (Chen et al., 2024; Hulme et al., 2024; Maciejewski et al., 2019; Rodd et al., 2012). In light of these findings, we hypothesise that ageing and meaning relatedness will impact form-meaning association learning but not semantic feature acquisition. In contrast, individual vocabulary knowledge is expected to influence both processes.",
    keywords: ["Psycholinguistics", "Semantic Feature Acquisition"],
    link: "https://osf.io/ajcrh/overview",
    isPreregistration: true,
  }
];
