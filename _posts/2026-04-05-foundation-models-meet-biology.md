---
layout: post
section-type: post
title: Foundation Models Meet Biology - A New Frontier
category: tech
tags: [ 'foundation-model', 'biology', 'genomics', 'AI4Science', 'multi-omics', 'deep-learning', 'single-cell', 'drug-design' ]
---

<p align="justify">
The foundation model paradigm — pre-train at massive scale, then adapt to downstream tasks — has reshaped NLP and computer vision over the past few years. But the most exciting frontier for this paradigm might not be language or images at all. It's biology. The sheer complexity of biological systems, the explosion of multi-omics data, and the urgent need for better drug design make biology a natural (and arguably the most impactful) proving ground for foundation models. In this post, I'll walk through how foundation models are transforming different corners of biology, share some lessons from our own work, and discuss where I think this field is heading.
</p>

### The Foundation Model Paradigm, Briefly

<p align="justify">
The recipe is by now familiar: take a large model (usually a Transformer), pre-train it on a massive corpus of unlabeled data with a self-supervised objective, and then fine-tune or prompt it for specific tasks. This approach works because it learns <strong>transferable representations</strong> — patterns that generalize across tasks. GPT showed this for text, CLIP and MAE showed it for images, and now a growing body of work is showing it for DNA, RNA, proteins, and single-cell data.
</p>

<p align="justify">
But biology is fundamentally different from text or images in ways that matter for model design. Biological sequences carry information at multiple scales (nucleotide, codon, domain, chromosome), the "grammar" is shaped by evolution rather than human convention, and ground truth is expensive — a single wet-lab experiment can take weeks and cost thousands of dollars. These constraints push us toward creative solutions that go beyond simply scaling up the NLP playbook.
</p>

### Genomic Foundation Models: Learning the Language of the Genome

<p align="justify">
The genome is often described as the "book of life," and it's tempting to treat DNA/RNA sequences as just another language for Transformers to learn. Several recent models have taken this approach — Enformer, Nucleotide Transformer, DNABERT-2, and Evo, among others — each training on billions of nucleotides with masked language modeling or next-token prediction.
</p>

<p align="justify">
What's interesting is that these models learn biologically meaningful features without being explicitly taught. They pick up on regulatory motifs, splice site patterns, and evolutionary conservation signals purely from sequence context. Evo (Arc Institute, 2024) pushed this further by training a 7B-parameter model on prokaryotic and phage genomes, achieving the ability to generate functional DNA sequences — essentially writing new "code" in the language of life.
</p>

<p align="justify">
In our own work, we've been focused on single-cell chromatin accessibility data. <a href="https://arxiv.org/abs/2505.12638">ChromFound</a> (NeurIPS 2025) is our attempt at building a universal foundation model for single-cell ATAC-seq data. The challenge here is unique: unlike bulk genomics where you average over millions of cells, single-cell data is inherently sparse and noisy. Each cell gives you a partial, binary snapshot of chromatin accessibility. We designed ChromFound to learn robust cell representations from this sparse signal, and it generalizes well across different tissues, diseases, and even species — which suggests the model is capturing fundamental regulatory grammar rather than dataset-specific artifacts.
</p>

<p align="justify">
The lesson from genomic FMs so far: <strong>scale helps, but domain-specific inductive biases matter even more</strong>. Simply throwing more parameters at DNA sequences doesn't automatically capture the hierarchical, multi-scale nature of genome regulation. The models that work best tend to incorporate biological priors — whether that's multi-resolution attention, evolutionary-aware tokenization, or task-specific pre-training objectives.
</p>

### From Structure Prediction to Molecular Design

<p align="justify">
AlphaFold changed everything. When DeepMind's model achieved near-experimental accuracy in protein structure prediction at CASP14, it wasn't just a benchmark victory — it fundamentally shifted how structural biology operates. The AlphaFold Protein Structure Database now contains predicted structures for over 200 million proteins, and researchers routinely use these predictions as starting points for experimental work.
</p>

<p align="justify">
But prediction and design are very different problems. Predicting a structure from a sequence is hard; designing a sequence that folds into a desired structure is arguably harder. This is where generative models come in. RFdiffusion (Baker Lab) showed that diffusion models can generate novel protein backbones, and subsequent work has extended this to antibody design, enzyme engineering, and beyond.
</p>

<p align="justify">
RNA design is even less explored, and that's where our recent work comes in. In our <a href="https://ojs.aaai.org/index.php/AAAI/article/view/37070">AAAI 2026 paper</a>, we tackled structure-based RNA design using latent diffusion models. The key challenge with RNA is that its structure-function relationship is more complex than proteins — RNA can form intricate secondary and tertiary structures, and small sequence changes can dramatically alter folding. Our approach uses step-wise optimization in a learned latent space, which allows the model to explore the design space more efficiently than working directly in sequence space. The results are promising, but honestly, RNA design is still in its early days compared to protein design. The data is scarcer, the structure prediction tools are less mature, and the design-test cycle is slower.
</p>

<p align="justify">
I also want to highlight the emerging work on mRNA design (e.g., mRNA-GPT), which takes a generative approach to full-length mRNA optimization — jointly designing the 5'UTR, CDS, and 3'UTR. This is directly relevant to mRNA therapeutics, where codon optimization and UTR engineering can dramatically affect protein expression levels. The intersection of foundation models and nucleic acid drug design is still wide open, and I expect this to be one of the most impactful application areas in the coming years.
</p>

### Multi-Omics: The Integration Challenge

<p align="justify">
Biology doesn't operate in silos — gene regulation involves a coordinated dance between the genome, epigenome, transcriptome, and proteome. The real power of foundation models in biology will come from integrating across these modalities, much like how multimodal models (GPT-4, Gemini) integrate text and images.
</p>

<p align="justify">
This is easier said than done. Different omics modalities have different data types (sequences, counts, images, graphs), different noise profiles, and different scales. A single-cell RNA-seq experiment might measure 20,000 genes across 100,000 cells, while a matched ATAC-seq experiment captures chromatin accessibility at millions of genomic loci. Aligning these modalities in a shared representation space is a non-trivial problem.
</p>

<p align="justify">
Our <a href="https://advanced.onlinelibrary.wiley.com/doi/full/10.1002/advs.202505021">SCRIPT</a> paper (Advanced Science, 2025) tackles one piece of this puzzle: predicting single-cell long-range cis-regulation by linking chromatin accessibility to gene expression. We used pretrained graph attention networks to model the regulatory relationships between distal enhancers and target genes — essentially building a bridge between the epigenomic and transcriptomic layers. What we found is that pre-training on large-scale regulatory interaction data gives the model a strong prior for capturing the complex, long-range dependencies that govern gene regulation.
</p>

<p align="justify">
The broader vision here is what some call the <strong>"virtual cell"</strong> — a computational model that can simulate cellular behavior from genotype to phenotype by integrating all relevant omics layers. We're nowhere near that yet, but foundation models are giving us the building blocks. Models like scGPT, GeneFormer, and scFoundation are learning general-purpose cell representations from millions of single-cell profiles, and the next step is to connect these with protein structure models, metabolic pathway models, and clinical data.
</p>

### Self-Supervised Learning for Medical Imaging

<p align="justify">
Foundation models aren't just about sequences and molecules — they're also transforming how we extract information from medical images. Our <a href="https://www.nature.com/articles/s43588-026-00973-3">HorusEye</a> paper (Nature Computational Science, 2026) is a good example. We built a self-supervised foundation model for X-ray computed tomography (CT) restoration — a task that traditionally requires paired high-quality and low-quality images for supervised training.
</p>

<p align="justify">
The challenge with medical imaging is that labeled data is scarce and expensive (requiring expert radiologists), while unlabeled scans are abundant. HorusEye leverages this asymmetry by learning generalizable representations from unlabeled CT data, then adapting to specific restoration tasks (denoising, artifact removal, super-resolution) with minimal supervision. The key finding is that a single pre-trained model can generalize across different imaging protocols, scanner types, and anatomical regions — which is exactly the kind of universality that makes foundation models valuable.
</p>

<p align="justify">
This connects to a broader trend: the convergence of medical imaging AI and molecular biology. As imaging techniques become more integrated with omics data (spatial transcriptomics, multiplexed imaging), foundation models that can bridge these modalities will become increasingly important.
</p>

### Challenges and Open Questions

<p align="justify">
Despite the rapid progress, there are real challenges that the field needs to address:
</p>

- **Data quality and scale**: Biology has a lot of data, but not all of it is high quality. Batch effects, technical noise, and inconsistent annotations plague multi-omics datasets. Foundation models can learn to be robust to some of this noise, but garbage in still means garbage out.

- **Hallucinations in scientific AI**: This is something I think about a lot. When a language model hallucinates a fake citation, it's annoying but harmless. When a biological foundation model hallucates a protein structure that looks plausible but is physically impossible, or predicts a drug-target interaction that doesn't exist, the consequences can be real — wasted wet-lab resources, misleading publications, or worse. We need better tools for uncertainty quantification and cross-modal consistency checking in scientific AI.

- **The wet-lab validation gap**: The ultimate test for any biological prediction is experimental validation, and this remains the bottleneck. A model can predict millions of candidate drug sequences in hours, but testing even a handful in the lab takes months. Closing this loop — through better prioritization, automated experimentation, and tighter integration between computational and experimental workflows — is critical.

- **Interpretability**: Biologists (rightfully) want to understand *why* a model makes a particular prediction, not just *what* it predicts. This is especially important for clinical applications where regulatory approval requires mechanistic understanding. Foundation models are often criticized as black boxes, and building in interpretability without sacrificing performance remains an open challenge.

- **Evaluation**: How do you benchmark a genomic foundation model? Unlike NLP, where we have established benchmarks (GLUE, SuperGLUE, etc.), biology lacks standardized evaluation suites that capture the diversity of downstream tasks. The community is starting to address this, but we need more comprehensive and biologically grounded benchmarks.

### Where This Is Heading

<p align="justify">
Looking ahead, I see a few trends that will shape the next phase of this field:
</p>

<p align="justify">
<strong>Agentic AI for science</strong> is the most exciting direction to me. Instead of using foundation models as passive predictors, we can embed them in autonomous agents that actively design experiments, analyze results, and iterate. Imagine a system that reads the latest papers, identifies promising drug candidates using a genomic FM, designs experiments to test them, and learns from the results — all with minimal human intervention. This isn't science fiction; the building blocks exist today, and the integration is happening fast.
</p>

<p align="justify">
<strong>Cross-modal foundation models</strong> will become the norm. Just as GPT-4 integrates text and images, the next generation of biological FMs will natively handle sequences, structures, expression data, images, and clinical records in a unified framework. The challenge is not just architectural — it requires massive, well-curated multi-modal biological datasets, which the community is only beginning to assemble.
</p>

<p align="justify">
<strong>Personalized medicine</strong> is the ultimate downstream application. Foundation models that can integrate a patient's genomic profile, medical imaging, clinical history, and real-time biomarkers to predict disease risk, recommend treatments, and monitor outcomes represent the long-term vision. We're still far from this, but every piece of the puzzle — from genomic FMs to medical imaging models to drug design tools — is progressing rapidly.
</p>

<p align="justify">
The convergence of foundation models and biology is still in its early chapters. The models are getting bigger, the data is getting richer, and the applications are getting more ambitious. What excites me most is that this isn't just an AI story — it's fundamentally about understanding life at a deeper level and using that understanding to improve human health. And for those of us working at this intersection, there's never been a more exciting time :microscope:
</p>
