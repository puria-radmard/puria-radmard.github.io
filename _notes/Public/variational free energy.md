---
title: variational free energy
feed: hide
date: 24-03-2023
format: list
page_order: 42
---


The free energy is the term being minimised during the [[EM algorithm]]
This is the same as the [[evidence lower bound]], but negative

For a dataset $$\textbf u$$ and associated latent variable $$v$$, we have a [[variational approximation]] of the posterior over latents $$Q[v ert \textbf u]$$, i.e. $$\sum_vQ(vert\textbf u) = 1$$

We use this to minimise the free energy:

$$\mathcal F(Q, \mathcal G) = - \mathbb{E}_{\textbf u \sim P[\textbf u]} \left[\sum_{v} Q[ v ert \textbf u] \log\left(\frac{P[v , \textbf u ert \mathcal G]}{Q[v ert \textbf u]}\right)\right]$$


In the [[E-phase]], you minimise $$\mathcal F$$ w.r.t. $$Q$$, keeping the [[generative model]] $$\mathcal G$$ constant.
In the [[M-phase]], you minimise $$\mathcal F$$ w.r.t. $$\mathcal G$$, keeping the variational approximation $$Q$$ constant.

However, you can also break this objective function down:

1. The joint distribution can be broken into prior and conditional (the true inverse model that we are approximating!) 

$$\mathcal F(Q, \mathcal G) = - \mathbb{E}_{\textbf u \sim P[\textbf u]} \left[\sum_{v} Q[ v ert \textbf u] \left( \log (p(\textbf uert\mathcal G)) + \log\left(\frac{P[vert \textbf u, \mathcal G]}{Q[v ert \textbf u]}\right)\right)\right]$$


2. The prior does not depend on $$v$$, so the expectation 'marginalises out': 

$$\mathcal F(Q, \mathcal G) = - \mathbb{E}_{\textbf u \sim P[\textbf u]} \left[\log(p(\textbf u ert \mathcal G))- \sum_{v} Q[ v ert \textbf u] \left( \log\left(\frac{Q[v ert \textbf u]}{P[vert \textbf u, \mathcal G]}\right)\right)\right]$$

where we have also made the logarithm negative

3. The first term now depends only on the generative model:

$$\mathcal F(Q, \mathcal G) = - L(\mathcal G)+ \mathbb{E}_{\textbf u \sim P[\textbf u]} \left[ \sum_{v} Q[ v ert \textbf u] \left( \log\left(\frac{Q[v ert \textbf u]}{P[vert \textbf u, \mathcal G]}\right)\right)\right]$$


4. And the second term looks familiar!

$$\mathcal F(Q, \mathcal G) = - L(\mathcal G)+ \mathbb{E}_{\textbf u \sim P[\textbf u]} \big[ \text{KL}( {Q[v ert \textbf u]}\ert{P[vert \textbf u, \mathcal G]} ) \big]$$


This breakdown is frequently used for cases where the generative model is not invertible, such as in the [[Helmholtz machine]]

$$