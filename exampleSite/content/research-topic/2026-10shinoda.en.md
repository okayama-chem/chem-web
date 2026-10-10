---
title: "Why Does Water Freeze Too Easily in Simulations? A New Approach to Mitigate Freezing Artifacts in Coarse-Grained Models"
date: 2026-10-10T00:00:00+09:00
draft: true
bg_image: "images/backgrounds/page-title.jpg"
description: "This theoretical and computational chemistry study proposes a novel parameterization framework to address the challenge of \"freezing artifacts\" in polar coarse-grained water models, which are essential for biomolecular simulations."
image: "images/backgrounds/page-title.jpg"
rt_categories: ["Physical Chemistry"]
rt_tags: ["Physical Chemistry", "Theoretical Chemistry", "Molecular Simulation", "Water", "Coarse-Grained Model", "Force Field"]
author: "shinoda"
type: "research-topic"
---

### Simplifying Complex Molecules: The Coarse-Grained Model

Simulating the behavior of biomolecules like proteins and cell membranes in our bodies using computers is crucial for understanding life phenomena. These biomolecules are always surrounded by many water molecules. However, trying to calculate every single water molecule requires an enormous amount of computation, taking a long time even with supercomputers.

This is where the "Coarse-grained (CG) model" comes in. This method groups several atoms into a single "bead," reducing the number of entities to calculate, thereby making simulations more efficient. CG models that can accurately reproduce the dielectric response (how a material responds to an electric field) of water are particularly indispensable for biomolecular simulations.

### The "Over-Freezing" Problem in Simulated Water

However, many CG water models have a troubling issue: they tend to "freeze" (crystallize) at temperatures much higher than real water (this is known as a "freezing artifact"). While real water freezes at 0°C (273 K), if simulated water freezes at high temperatures like 384 K (about 111°C), it becomes impossible to accurately reproduce the liquid state where biomolecules are active.

In this study, using the SPICA force field family as a case study, researchers investigated why simulated water freezes too easily and how this problem could be mitigated.

### Rebalancing Electrostatic and Attractive Forces

The research team focused on factors influencing the "freezing tendency" of CG water models: the electrical properties of water molecules (charge topology) and the strength of attractive forces between molecules (van der Waals forces, specifically Lennard-Jones interactions).

Detailed calculations revealed that simply optimizing the charge arrangement of water molecules did not substantially lower the melting temperature (Tm). Instead, the strength of the attractive forces between molecules was found to have a significant impact on Tm.

Then, the team discovered that by strengthening the electrostatic interactions (e.g., by reducing background dielectric screening), the "attractive forces" (Lennard-Jones interactions) between molecules could be weakened while still maintaining fundamental properties like water density and surface tension. This new approach of optimizing the balance between "electrical forces" and "attractive forces" became key to solving the freezing problem.

### Introducing pSPICA2: A Step Towards More Realistic Water Models

Based on this new understanding, the researchers developed a new CG water model called "pSPICA2." This model successfully reduced the freezing temperature significantly (from 384 K to 302 K) while accurately reproducing important properties of water such as density, surface tension, and dielectric response at typical simulation temperatures (298 K).

While the melting temperature still remains above that of real water (273 K), the framework proposed in this study offers a highly practical route for developing more accurate and less freezing-prone CG water models in the future. This achievement contributes to the advancement of fundamental technologies crucial for elucidating life phenomena through computation.

### Reference
- Yi-Chen Tsai, Qun-Yan Cheng, Wataru Shinoda, Chi‐cheng Chiu (2026) "Mitigating Freezing Artifacts in Polar Coarse-Grained Water through Rebalancing Electrostatic and van der Waals Interactions: A Case Study of the pSPICA Force Field" The Journal of Physical Chemistry B, 10.1021/acs.jpcb.6c06050. [DOI: 10.1021/acs.jpcb.6c06050](https://doi.org/10.1021/acs.jpcb.6c06050)

Learn more about [**Prof. Shinoda**](/en/faculty/shinoda) → [**Theoretical and Computational Chemistry Laboratory**](/en/laboratory/theocomp/)
