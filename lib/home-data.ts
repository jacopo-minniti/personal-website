export const quotes = [
    { text: "The limits of my language mean the limits of my world.", author: "Wittgenstein" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "To those human beings who are of any concern to me I wish suffering, desolation, sickness, ill-treatment, indignities—I wish that they should not remain unfamiliar with profound self-contempt, the torture of self-mistrust, the wretchedness of the vanquished: I have no pity for them, because I wish them the only thing that can prove today whether one is worth anything or not—that one endures.", author: "Nietzsche" },
    { text: "May you live every day of your life.", author: "Jonathan Swift" }
];

export const galleryImages = [
    { path: "/gallery_viewer/gallery1.jpeg", description: "How can such a damned place like Calabria be so beatiful?" },
    { path: "/gallery_viewer/gallery2.jpeg", description: "Patagonia is Earth+" },
    { path: "/gallery_viewer/gallery3.jpeg", description: "Why US universities have such pretty gardens?" },
    { path: "/gallery_viewer/gallery4.JPG", description: "Spot the differences..." }
    // Add more images here. 
    // Simply place your images in the /public/gallery_viewer folder at the root of the project
    // and reference them here like: "/gallery_viewer/your-image-name.jpg"
];

export const bioData = {
    name: "Jacopo Minniti",
    subtitle: "Undergraduate Student // AI Researcher",
    messages: [
        "Hello! I am passionate about exploring Neuro inspired deep learning models, mathematical foundations of AI, and much more.",
        "I am currently a student at Minerva University (San Francisco, USA) but I grew up in Italy. I am part of an international program so I have the opportunity to travel around the world while studying.",
        "I strive to keep learning and continuously become the best version of myself."
    ],
    affiliations: [
        { name: "Minerva University", url: "https://www.minerva.edu", colorClass: "bg-white/10 hover:bg-white/20 border-white/20" },
        { name: "XLab (UChicago)", url: "https://xrisk.uchicago.edu/", colorClass: "bg-[var(--pastel-red)]/10 hover:bg-[var(--pastel-red)]/20 border-[var(--pastel-red)]/20 text-[var(--pastel-red)]" }
    ],
    contact: {
        email: "[EMAIL_ADDRESS]",
        display: "jacopo.minniti004 [at] gmail [dot] com"
    }
};

export const newsItems = [
    {
        date: "2025-08-15",
        title: "Talk at University of Chicago: 'The (not so) bitter lesson'",
        content: "I had the opportunity to give a talk on the future of AI scaling, inductive biases, and a bit of history of the opposing paradigms in the field, all while trying to give a perspective on what the bitter lesson really says. Find the lecture here: https://uchicago.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=e86d18bd-5645-4e7e-94af-b33a011692b6"
    },

];

export const researchInterests = {
    codeSnippets: [
        {
            label: "neuro_ai.py",
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
            label: "math_foundations.py",
            language: "python",
            code: `def prove_generalization(network):
    # Deriving bounds on sample complexity
    bound = vcdim(network) + log(1/delta)
    stability = spectral_norm(network.weights)
    
    # Toward a theory of intelligence
    return verify_convergence(bound, stability)`
        },
        {
            label: "mech_interp.py",
            language: "python",
            code: `def analyze_representations(model):
    """Decoding internal states"""
    activations = run_with_hooks(model)
    circuits = identify_circuits(activations)
    return interpret_features(circuits)`
        },
        {
            label: "reasoning_training.py",
            language: "python",
            code: `optimizer = torch.optim.AdamW(agent.parameters())

for step in range(max_steps):
    # Train strictly for long-horizon planning
    thought_chain = agent.think(problem)
    action = agent.decide(thought_chain)
    
    reward = env.step(action)
    loss = -log_prob(action) * reward
    loss.backward()`
        }
    ],
    explanation: `'''
RESEARCH INTERESTS & PHILOSOPHY

I am exploring the convergence of biological intelligence and artificial systems. 

My primary focus is on:
1. NeuroAI: Implementing biological constraints (plasticity, sparsity) to create more robust and efficient learning systems.
2. Mathematical Foundations: Developing a rigorous mathematical theory of intelligence to understand generalization and stability.
3. Mechanistic Interpretability: Reverse-engineering model weights to understand how high-level reasoning emerges from low-level circuits.
4. Agentic Reasoning: Training models to think, plan, and verify their own chain of thought over long time horizons.

I believe true intelligence requires both structure (neuro-inspired architectures) and rigorous understanding (interpretability).
'''`,
    stack: {
        command: "ls -a active_stack",
        technologies: ["PyTorch", "JAX", "vLLM", "transformer-lens", "gymnasium"]
    }
};
