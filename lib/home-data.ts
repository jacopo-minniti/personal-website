export const quotes = [
    { text: "The limits of my language mean the limits of my world.", author: "Wittgenstein" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "To those human beings who are of any concern to me I wish suffering, desolation, sickness, ill-treatment, indignities—I wish that they should not remain unfamiliar with profound self-contempt, the torture of self-mistrust, the wretchedness of the vanquished: I have no pity for them, because I wish them the only thing that can prove today whether one is worth anything or not—that one endures.", author: "Nietzsche" },
    { text: "May you live every day of your life.", author: "Jonathan Swift" }
];

export const galleryImages = [
    { path: "/gallery_viewer/llama.JPG", description: "LLamaaaaaas" },
    { path: "/gallery_viewer/gallery1.jpeg", description: "How can such a damned place like Calabria be so beatiful?" },
    { path: "/gallery_viewer/gallery2.jpeg", description: "Patagonia is Earth+" },
    { path: "/gallery_viewer/gallery4.JPG", description: "Spot the differences..." },
    // Add more images here. 
    // Simply place your images in the /public/gallery_viewer folder at the root of the project
    // and reference them here like: "/gallery_viewer/your-image-name.jpg"
];

export const bioData = {
    name: "Jacopo Minniti",
    subtitle: "Undergraduate Student // Junior AI Researcher",
    bioText: "Hello! I’m passionate about statistical-physics approaches to deep learning and neuro-inspired models. My long-term goal is to help make theoretical and mathematical approaches to AI powerful enough to contribute directly to frontier capabilities research (but for now, mostly just contributing to compute bills).\n\n I’m currently pursuing a bachelor’s degree at Minerva University. I work as a research assistant at the University of Toronto under [Tim G. J. Rudner](https://timrudner.com/), where I study uncertainty quantification and diffusion models for language. I’m a Member of Technical Staff at Sakana AI under [Richard Sproat](https://rws.xoba.com/), learning theory.\n\n I want to spend my life at the edge of what I understand, always moving it a little further.",
    affiliations: [
        { name: "Sakana AI", url: "https://sakana.ai/", colorClass: "bg-[var(--pastel-purple)]/10 hover:bg-[var(--pastel-purple)]/20 border-[var(--pastel-purple)]/20 text-[var(--pastel-purple)]" },
        { name: "University of Toronto", url: "https://www.utoronto.ca/", colorClass: "bg-[var(--pastel-blue)]/10 hover:bg-[var(--pastel-blue)]/20 border-[var(--pastel-blue)]/20 text-[var(--pastel-blue)]" },
        { name: "XLab (University of Chicago)", url: "https://xrisk.uchicago.edu/", colorClass: "bg-[var(--pastel-red)]/10 hover:bg-[var(--pastel-red)]/20 border-[var(--pastel-red)]/20 text-[var(--pastel-red)]" },
        { name: "BLP Lab (NTU)", url: "https://sites.google.com/view/ntublplab/home?authuser=0", colorClass: "bg-[var(--pastel-green)]/10 hover:bg-[var(--pastel-green)]/20 border-[var(--pastel-green)]/20 text-[var(--pastel-green)]" },
        { name: "Minerva University", url: "https://www.minerva.edu", colorClass: "bg-[var(--pastel-orange)]/10 hover:bg-[var(--pastel-orange)]/20 border-[var(--pastel-orange)]/20 text-[var(--pastel-orange)]" }
    ],
    contact: {
        email: "jacopominniti@sakana.ai",
        display: "jacopominniti [at] sakana [dot] ai"
    }
};

export const newsItems = [
    {
        date: "2026-08-17",
        title: "Accepted at School of Analytical Connectionism 2026",
        content: "I’m participating in the 2026 School on Analytical Connectionism in Gothenburg, bringing together statistical physics, ML, neuroscience, and cognitive science to study neural networks more theoretically. If you’re around (or simply interested in this kind of approach) reach out!"
    },
    {
        date: "2026-03-02",
        title: "Paper accepted at ICLR 2026 Workshop",
        content: "I'm happy to announce our paper 'Challenges in Inference Time Scaling with Uncertainty Aware Tree Search' has been accepted at multiple ICLR 2026 workshops, including SPOT and Agentic AI in the Wild. We investigate how process uncertainty models (PUMs) interact with process reward models (PRMs) during inference-time search. We introduce Uncertainty-Aware Tree Search (UATS), which dynamically allocates search compute based on predicted uncertainty in reasoning steps."
    },
    {
        date: "2026-01-23",
        title: "Joining Sakana AI as Summer Research Intern",
        content: "I am very happy to announce I will be working with the bright researchers at Sakana for a 4 months-long internship on the topic 'interpreting the geometries of representations caused by gradient descent and how to steer them to improve the generalization of models'."
    },
    {
        date: "2025-08-15",
        title: "Talk at University of Chicago: 'The (not so) bitter lesson'",
        content: "I had the opportunity to give a talk on the future of AI scaling, inductive biases, and a bit of history of the opposing paradigms in the field, all while trying to give a perspective on what the bitter lesson really says. Find the lecture here: https://uchicago.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=e86d18bd-5645-4e7e-94af-b33a011692b6"
    },

];

export const researchInterests = {
    codeSnippets: [
        {
            language: "python",
            code: `class NeuroAI(nn.Module):
    def __init__(self):
        super().__init__()
        self.synapses = DynamicSynapses()
        self.plasticity = HebbianLearning()
    
    def forward(self, x):
        # Biologically plausible forward pass
        return self.plasticity(self.synapses(x))`
        },
        {
            language: "python",
            code: `class StatisticalPhysics:
    def find_order_parameters(self, network):
        # Compressing high-dimensional learning dynamics
        state = measure_network_state(network)
        order_parameters = identify_macroscopic_variables(state)
        
        # Toward a statistical theory of intelligence
        return characterize_phases(order_parameters)`
        },
        {
            language: "python",
            code: `class MechanisticInterpretability:
    def analyze_representations(self, model):
        """Decoding internal states"""
        activations = run_with_hooks(model)
        circuits = identify_circuits(activations)
        return interpret_features(circuits)`
        },
    ],
    explanation: `'''
<<< RESEARCH PROGRAM >>>

Much of deep learning’s history has been driven by intuition rather than a precise account of why its systems work. Theory has often followed capabilities research as post hoc analysis; the aim instead is to develop a mathematical theory of intelligence that can guide more powerful frontier models.\n\nStatistical physics offers one promising direction. Deep-learning models are enormous and highly nonlinear, yet meaningful order parameters may reveal macroscopic phases, transitions, and learning dynamics that classical theory has difficulty capturing.\n\nA second direction comes from neuro-inspired models—not because human cognition is the only route to intelligence, but because human learning is remarkably efficient. Identifying the mechanisms behind that efficiency, and which aspects of neural organization matter, could lead to more capable and efficient artificial systems.\n\nMechanistic interpretability provides a complementary bridge: connecting internal representations and circuits to these principles may turn empirical observations into a more coherent theory.
'''`,
    stack: {
        command: "ls -a active_stack",
        technologies: ["PyTorch", "JAX", "vLLM", "transformer-lens", "gymnasium"]
    }
};
