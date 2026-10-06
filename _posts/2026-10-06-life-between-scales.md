---
layout: post
section-type: post
title: "Life Between Scales: What Biological AI Still Needs to Learn"
date: 2026-10-06 10:00:00 +0800
description: "A perspective on biological organization across scales, drawing on recent work in foundation models, scientific reasoning, and the observation of living systems."
category: tech
tags: [ 'AI4Science', 'foundation-model', 'biology', 'deep-learning' ]
---

*Emergence, biological world models, and the relationships our models need to learn.*

Imagine having an accurate inventory of every molecular component in a cell, together with excellent models of their individual properties. How much of the cell's behavior would that let us predict?

The answer depends on what the inventory leaves unresolved: where the components are, how they interact, which processes are active, and how those processes change one another over time. A cell's behavior emerges through this organization. At the next scale, cells interact within tissues whose geometry, environment, and history shape what those same cells do.

This is the starting point I find most useful for biological AI. **The central challenge is to understand how interactions among molecules, cells, and tissues generate biological function—and how a change at the molecular level propagates through this system to alter its behavior.** Foundation models give us increasingly powerful descriptions of biological components and states. Building models that capture the organization and dynamics of living systems demands a far more ambitious research program.

<figure class="figure d-block my-4">
  <img class="figure-img img-fluid" src="{{ '/img/posts/learning-biology/cover-v2.webp' | relative_url }}" alt="Conceptual illustration of molecular activity, a living cell, and tissue organization connected through interactions across biological scales." width="1672" height="941">
  <figcaption class="figure-caption text-start">Life across scales: molecular activity, cellular organization, and tissue context. Original AI-generated conceptual artwork.</figcaption>
</figure>

## 1. Life is organized activity

A useful starting description of life is a system of processes unfolding across space and time. Molecules interact within cellular compartments; cells regulate their internal conditions and respond to their surroundings; tissues organize interactions among cells. These levels are coupled. The conditions surrounding a molecular reaction depend on cellular organization, while molecular reactions continually change that organization.

Eric Betzig's recent interview brings the observational consequences into focus. In the [original episode notes](https://632nm.com/episodes/diffraction-limit-microscopy-and-cell-biology-eric-betzig-on-super-resolution-microscopy), he describes how imaging living systems can reveal behavior obscured by static descriptions. The publisher's [account of the conversation](https://632nmpodcast.substack.com/p/the-diffraction-limit-was-never-the) emphasizes the difficulty of interpreting observations across three spatial dimensions, time, and molecular identity. The challenge includes extracting meaningful biological objects and events from those measurements.

Stelzer and Tanay make a related argument in [Why machines don't speak biology](https://doi.org/10.1016/j.cell.2026.07.003): living systems are evolved processes, and understanding their components does not automatically establish how organization arises across scales. Their emphasis on canonical biological processes provides a constructive way to approach that gap.

Here, emergence has a specific modeling meaning. Interactions among components produce collective behavior that calls for an appropriate description at a larger scale. To explain that behavior, we need to identify the relevant relationships, constraints, and dynamics. Knowing the parts helps specify the problem; learning their organization helps explain the result.

Consider a conceptual example: two systems contain the same components, but connect them differently. A feedback loop in one system could stabilize a collective state, while a different coupling could make that state sensitive to disturbance. A representation containing only the component inventory would miss the distinction. The interactions are part of the information required to predict behavior.

<figure class="figure d-block my-4">
  <picture>
    <source media="(max-width: 600px)" srcset="{{ '/img/posts/learning-biology/organization-dynamics-mobile.svg' | relative_url }}">
    <img class="figure-img img-fluid" src="{{ '/img/posts/learning-biology/organization-dynamics.svg' | relative_url }}" alt="A conceptual comparison of identical components with different interaction networks, followed by reciprocal relationships between molecular activity, cellular state, and tissue organization." loading="lazy" width="1400" height="1140">
  </picture>
  <figcaption class="figure-caption text-start">Figure 1. Organization is a modeling variable. The toy networks illustrate why component identity alone may leave collective behavior undetermined. The biological scales below exchange influences and constraints; the diagram shows a conceptual argument, not measured dynamics.</figcaption>
</figure>

This makes the choice of abstraction central. A useful biological model must retain the relationships needed to explain the process at the scale of interest. It also needs a way to establish when that abstraction stops being reliable.

## 2. The gap between molecular predictions and biological outcomes

An accurate molecular prediction answers a bounded question. A model may predict a protein structure, estimate binding affinity, or anticipate a change in gene expression under specified conditions. The therapeutic question reaches further: how will that change affect a living system over time? Connecting these questions requires evidence about the processes through which molecular effects become cellular and tissue outcomes.

In the [publisher's account of his interview](https://632nmpodcast.substack.com/p/the-diffraction-limit-was-never-the), Betzig argues that AlphaFold-derived protein structures describe only a small part of the dynamic system relevant to drug discovery. The modeling issue is what additional information connects a molecular result to a biological effect: where and when an intervention acts, which cells respond, and how the surrounding system changes that response.

The gap persists even when a molecular effect is measured experimentally. In [GENERATION HD1](https://doi.org/10.1056/NEJMc2300400), the antisense oligonucleotide tominersen lowered mutant huntingtin in cerebrospinal fluid, yet treatment was stopped early following an unfavorable benefit–risk assessment. The subsequent analysis at week 69 found worse composite clinical scores with dosing every eight weeks and no significant clinical benefit with dosing every sixteen weeks. The study could not disentangle the contributions of drug-related toxicity and total huntingtin lowering. Its relevance here is precise: a molecular readout alone was insufficient to establish the intervention's clinical consequences under those regimens.

For modeling, this means that even a correct prediction of the molecular readout would leave a further relationship to learn. Adding a cellular model and a tissue model makes their connections part of the scientific problem. Each model may perform well in its own evaluation setting; their composition requires compatible descriptions of context, timing, measurement, and the intervention itself. We need evidence that the information passed between them preserves the dependencies governing the response.

Those dependencies also evolve. A molecular intervention can change cellular state, which can alter subsequent molecular activity and interactions with neighboring cells. Predicting the resulting behavior requires an account of feedback and history. Shared vector dimensions or a convenient software interface do little to determine which biological relationships must be retained.

**Cross-scale interactions and dynamics must therefore become learning targets in their own right.** Molecular accuracy provides a foundation. Predicting biological outcomes also requires learning how molecular effects propagate through the organization of a living system, and testing those relationships under relevant interventions and conditions.

The next question is how to discover those relationships when they are missing from our biological description.

## 3. The scientific jump across scales

A disease presents itself through changes in the behavior of a living system. Its explanation may begin with a molecular event. Connecting the two requires discovering which changes matter and how their consequences propagate through cells and tissues. **One consequential kind of scientific jump in biology is the discovery of a causal explanation that connects phenomena at different scales.**

The Huntington's disease example makes this discovery problem concrete. It is a monogenic disease caused by an expanded CAG repeat in the *HTT* gene. The [1993 identification of the mutation](https://pubmed.ncbi.nlm.nih.gov/8458085/) established a molecular starting point for explaining an inherited clinical phenotype. From that starting point, a further explanatory task remains: how does the mutation lead to the loss of particular neurons after decades of biological latency?

A [2025 study](https://pubmed.ncbi.nlm.nih.gov/39824182/) illustrates the continuing work of connecting those scales. By measuring repeat length alongside gene expression in individual cells, the researchers linked extensive somatic expansion of the repeat to loss of neuronal identity and degeneration. That evidence helps connect an inherited sequence change to evolving cellular states. Even with a clear genetic cause, explaining the disease requires learning the processes that unfold between molecular variation and a system's changing behavior.

This is where emergence becomes a problem for scientific reasoning. Explaining how a phenotype arises from interactions across scales can require discovering a missing intermediate process, a feedback relationship, or a variable that our current measurements do not capture. In [Position: LLMs can't jump](https://proceedings.mlr.press/v306/zahavy26a.html), Tom Zahavy asks where new explanatory premises come from. His discussion of abduction—the proposal of an explanation—provides a useful lens for this task. Applied to biology, the challenge is to formulate a causal account that makes the relationships between scales testable. This is my biological reading of his argument; the paper itself examines scientific invention more generally.

Zahavy's emphasis on interactive world models also raises a question about the evidence available to a reasoning system. Simulated experiments inherit the assumptions of their simulator; biological observations can reveal phenomena outside those assumptions. Read alongside Betzig, the issue becomes whether a limitation in explanation reflects missing concepts, missing observations, or both. For me, this is what makes scientific reasoning across biological scales such a demanding problem.

## 4. Two routes across biological scales

What would let a modeling system represent these relationships and test the explanations built from them? The Cell Perspective and the AIDO program offer two complementary starting points: organize evidence around biological processes, and connect foundation models through biological relationships.

Stelzer and Tanay start with **biological processes**. A repeatedly observable process, such as the cell cycle or a developmental sequence, supplies coordinates for comparing measurements. Spatial and temporal alignment makes variation interpretable. Perturbations then reveal how a process departs from its reference behavior. Their proposed distillation, standardization, and reconnection of models are grounded in this organization of evidence.

The [AIDO Perspective](https://www.nature.com/articles/s41591-026-04595-0), by Song, Segal, and Xing, starts with **a system of foundation models**. Its roadmap builds specialized modules, connects them through biological relationships, and aligns them across scales. It proposes specific mechanisms: structured correspondences among DNA, RNA, and protein; positional representations for biological context; and differentiable computation graphs carrying information between molecular and cellular models. Higher-level observations would help constrain lower-level representations through joint optimization.

Read together, these Perspectives emphasize two aspects of the same problem: the organization of biological evidence and the relationships between model components. Both make the connection between scales central to biological modeling, while placing different emphasis on how those connections acquire biological meaning.

<figure class="figure d-block my-4">
  <picture>
    <source media="(max-width: 600px)" srcset="{{ '/img/posts/learning-biology/two-modeling-routes-mobile.svg' | relative_url }}">
    <img class="figure-img img-fluid" src="{{ '/img/posts/learning-biology/two-modeling-routes.svg' | relative_url }}" alt="Comparison of two published perspectives: Stelzer and Tanay emphasize biological processes and coordinated observations; Song, Segal, and Xing emphasize relationships among specialized foundation models." loading="lazy" width="1400" height="1330">
  </picture>
  <figcaption class="figure-caption text-start">Figure 2. Two published perspectives on modeling across scales. Stelzer and Tanay emphasize canonical biological processes; Song, Segal, and Xing emphasize integrated foundation models. The diagram summarizes their respective emphases.</figcaption>
</figure>

Two recent systems make the opportunity more concrete. [VirTues](https://www.nature.com/articles/s41586-026-10884-y) combines protein-sequence information about marker identity with spatial proteomic measurements, producing representations at cellular, neighborhood, and tissue scales. This gives molecular information a role in interpreting tissue organization. Its virtual staining predicts missing marker channels, evaluated by masking measured signals, and its representations support biomarker analysis. These achievements concern measured tissue state; a validated model of how tissue evolves under intervention would require additional evidence.

The August 2026 [AIDO Cell V1 report](https://genbio.ai/aido-cell-simulator/) introduces a persistent cellular state, interventions that update it, and readouts decoded from it. The distinction matters: a second intervention operates on the state produced by the first. The implemented framework connects multiple underlying models and biological resources through shared state and execution infrastructure.

The report presents component benchmarks, stateful case studies, and a drug-target retrieval test comparing simulated molecular and genetic perturbations. These provide evidence for selected integrated capabilities. The coupled system's reliability across unfamiliar intervention combinations, histories, and contexts still requires broader validation. One example makes the boundary tangible: a proposed mechanism involving coenzyme Q10 cannot be tested directly in its Hep-G2 case study because the represented state does not include metabolites. The report identifies metabolism, turnover, and fuller temporal dynamics among the areas for further development.

These examples suggest that the biological fidelity of model connections deserves as much scrutiny as performance within individual tasks. A growing range of represented scales makes that question more consequential.

## 5. What model performance tells us about biology

These examples raise a further question about how progress in biological modeling is judged. Building a better predictor is a measurable computational achievement; understanding what that improvement establishes about a biological process requires interpreting the evidence. This distinction becomes especially visible when model development itself is automated.

The April 2026 preprint on [AIDO.Builder](https://doi.org/10.64898/2026.04.20.719735) provides a concrete example. Its agents plan, implement, execute, debug, and refine biomedical modeling workflows. They can adapt pretrained models and reuse lessons from previous tasks. The study evaluates the resulting workflows on defined biomedical tasks, providing evidence that substantial parts of computational model development can be automated.

Its spatial-transcriptomics analysis also shows why the interpretation of that evidence matters. Improved ranking performance coexists with missed localized patterns and spurious patterns associated with sparse measurements. The authors discuss these limitations directly. The evaluation records an improvement in the task metric while exposing biological patterns that remain poorly represented.

Zahavy's discussion of new explanatory premises gives a way to interpret these results. A gain under an existing objective establishes progress within that formulation of the problem. Whether the formulation captures the relevant biological process is a further scientific question. AIDO.Builder makes the scope of automated model improvement concrete, while leaving open how such improvements contribute to new biological explanations.

<figure class="figure d-block my-4">
  <picture>
    <source media="(max-width: 600px)" srcset="{{ '/img/posts/learning-biology/published-evidence-mobile.svg' | relative_url }}">
    <img class="figure-img img-fluid" src="{{ '/img/posts/learning-biology/published-evidence.svg' | relative_url }}" alt="Comparison of the evidence reported by VirTues for measured tissue states, AIDO Cell V1 for intervention simulation, and AIDO.Builder for computational modeling workflows, alongside the limits of what each establishes." loading="lazy" width="1400" height="1260">
  </picture>
  <figcaption class="figure-caption text-start">Figure 3. Three systems provide different kinds of evidence. This qualitative comparison draws on the VirTues paper, AIDO Cell V1 report, and AIDO.Builder preprint, highlighting the scope of their reported results.</figcaption>
</figure>

The relationship with physical experiments is also explicit in the Perspectives. Song, Segal, and Xing envision a digital organism supporting better-guided wet-lab experimentation; Stelzer and Tanay emphasize observations and perturbations organized around biological processes. Betzig adds the importance of observing living systems in ways that can reveal phenomena outside our existing descriptions. Across these accounts, the evidence available to a model shapes the biological questions it can meaningfully address.

For me, the shared implication is that progress in biological AI depends on how model results and biological observations inform one another. Better predictions can strengthen an explanation; new observations can reveal that the original description of the problem was incomplete. That relationship matters increasingly as more of the computational work becomes automated.

## 6. RNA as a testbed for biological modeling

These questions resonate with my work on gene and RNA foundation models. RNA offers a tangible research object: its sequence, structure, and cellular context provide different descriptions of the same molecule, each illuminating aspects of its biological role.

I see RNA as a testbed for exploring a new framework for biological modeling. The broader interest is in what such a focused object can reveal about the relationship between molecular descriptions and the organization of living systems.

The papers discussed here approach that relationship from different directions. Taken together, they make the distance between representing biological information and explaining living behavior difficult to ignore.

**The larger challenge is to build models that explain how interactions across scales give rise to the organization and behavior of living systems.**

## References

1. Yonatan Stelzer and Amos Tanay. [*Why machines don't speak biology: Toward native biological language models*](https://doi.org/10.1016/j.cell.2026.07.003). Cell, 2026.
2. Tom Zahavy. [*Position: LLMs can't jump*](https://proceedings.mlr.press/v306/zahavy26a.html). ICML, 2026.
3. Le Song, Eran Segal, and Eric Xing. [*How to build an AI-driven digital organism*](https://www.nature.com/articles/s41591-026-04595-0). Nature Medicine, 2026.
4. Johann Wenckstern et al. [*The Virtual Tissues foundation model resolves spatial proteomics across scales*](https://www.nature.com/articles/s41586-026-10884-y). Nature, 2026.
5. GenBio AI Team. [*AIDO Cell: A General-Purpose Simulator for Cell Biology*](https://genbio.ai/aido-cell-simulator/). GenBio AI technical report, 2026.
6. Han Guo et al. [*Using AI to Build AI: AIDO.Builder Enables Autonomous Machine Learning Model Building for Biomedicine*](https://doi.org/10.64898/2026.04.20.719735). bioRxiv preprint, 2026.
7. Eric Betzig. [*Interview with 632nm*](https://632nm.com/episodes/diffraction-limit-microscopy-and-cell-biology-eric-betzig-on-super-resolution-microscopy) ([publisher's account](https://632nmpodcast.substack.com/p/the-diffraction-limit-was-never-the); [DeepTech report, Chinese](https://www.mittrchina.com/news/detail/17053)). 632nm, 2026.
8. The Huntington's Disease Collaborative Research Group. [*A novel gene containing a trinucleotide repeat that is expanded and unstable on Huntington's disease chromosomes*](https://pubmed.ncbi.nlm.nih.gov/8458085/). Cell, 1993.
9. Robert E. Handsaker et al. [*Long somatic DNA-repeat expansion drives neurodegeneration in Huntington's disease*](https://pubmed.ncbi.nlm.nih.gov/39824182/). Cell, 2025.
10. Peter McColgan et al. [*Tominersen in Adults with Manifest Huntington's Disease*](https://doi.org/10.1056/NEJMc2300400). New England Journal of Medicine, 2023.

*This essay develops my interpretation of these readings. The diagrams are original conceptual illustrations.*
