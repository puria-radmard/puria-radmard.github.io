---
title: variational free energy.md
feed: hide
date: 24-03-2023
format: list
---


The free energy is the term being minimised during the [[EM algorithm]]
This is the same as the [[evidence lower bound]], but negative

For a dataset $\textbf u$ and associated latent variable $v$, we have a [[variational approximation]] of the posterior over latents $Q[v | \textbf u]$, i.e. $\sum_vQ(v|\textbf u) = 1$

We use this to minimise the free energy:$$\mathcal F(Q, \mathcal G) = - \mathbb{E}_{\textbf u \sim P[\textbf u]} \left[\sum_{v} Q[ v | \textbf u] \log\left(\frac{P[v , \textbf u | \mathcal G]}{Q[v | \textbf u]}\right)\right]$$
In the [[E-phase]], you minimise $\mathcal F$ w.r.t. $Q$, keeping the [[generative model]] $\mathcal G$ constant.
In the [[M-phase]], you minimise $\mathcal F$ w.r.t. $\mathcal G$, keeping the variational approximation $Q$ constant.

However, you can also break this objective function down:

1. The joint distribution can be broken into prior and conditional (the true inverse model that we are approximating!) $$\mathcal F(Q, \mathcal G) = - \mathbb{E}_{\textbf u \sim P[\textbf u]} \left[\sum_{v} Q[ v | \textbf u] \left( \log (p(\textbf u|\mathcal G)) + \log\left(\frac{P[v| \textbf u, \mathcal G]}{Q[v | \textbf u]}\right)\right)\right]$$
2. The prior does not depend on $v$, so the expectation 'marginalises out': $$\mathcal F(Q, \mathcal G) = - \mathbb{E}_{\textbf u \sim P[\textbf u]} \left[\log(p(\textbf u | \mathcal G))- \sum_{v} Q[ v | \textbf u] \left( \log\left(\frac{Q[v | \textbf u]}{P[v| \textbf u, \mathcal G]}\right)\right)\right]$$where we have also made the logarithm negative

3. The first term now depends only on the generative model:$$\mathcal F(Q, \mathcal G) = - L(\mathcal G)+ \mathbb{E}_{\textbf u \sim P[\textbf u]} \left[ \sum_{v} Q[ v | \textbf u] \left( \log\left(\frac{Q[v | \textbf u]}{P[v| \textbf u, \mathcal G]}\right)\right)\right]$$
4. And the second term looks familiar!$$\mathcal F(Q, \mathcal G) = - L(\mathcal G)+ \mathbb{E}_{\textbf u \sim P[\textbf u]} \big[ \text{KL}( {Q[v | \textbf u]}\|{P[v| \textbf u, \mathcal G]} ) \big]$$
This breakdown is frequently used for cases where the generative model is not invertible, such as in the [[Helmholtz machine]]