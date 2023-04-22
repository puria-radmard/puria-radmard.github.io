---
title: Helmholtz machine
feed: hide
date: 24-03-2023
format: list
---


**Notes from [[Dayan and Abbott's Theoretical Neuroscience]]**
- Summary: approximate the [[variational free energy]] in the [[EM algorithm]] then perform the [[wake-sleep algorithm]]
- Accompanying: [[Vanilla Helmholtz machine (notebook)]]

- Notation:
	- Representation units $$\textbf v$$ and input units $$\textbf u$$, with binary values
	- The generative model with parameters $$\mathcal G = \{\textbf G, \textbf h, \textbf g\}$$ drives $$\textbf u$$
	- The recognition model with parameters $$\mathcal W = \{\textbf W, \textbf w\}$$ drives $$\textbf v$$

- Generative model:
	- Prior over latent variables: $$P[\textbf v ert \mathcal G] = \prod_af(g_a)^{v_a}(1-f(g_a))^{1-v_a}$$
	- Feedforward layer: $$\textbf x = \textbf G \textbf v + \textbf h$$
	- Likelihood over data: $$P[\textbf u ert \textbf v, \mathcal G] = \prod_bf(x_b)^{u_b}(1 - f(x_b))^{1 - u_b}$$
	- $$f$$ is just a sigmoid

- Recongition model
	- The [[generative model]] is not invertible, so the [[recognition model]] uses a [[variational approximation]]:

$$Q[\textbf v ert \textbf u, \mathcal W] = \prod_af(y_b)^{v_b}(1 - f(y_b))^{1 - v_b}$$

where we have references the feedback layer $$\textbf y = \textbf W \textbf u + \textbf w$$.

- Note:
	- In the generative model, elements of $$\textbf v$$ combine to create $$\textbf u$$
	- In the real inverse (i.e. $$P[\textbf v ert \textbf u, \mathcal G]$$), this would mean elements of $$\textbf v$$ are *dependent*
	- In the recognition model, which is an approximation, $$\textbf v$$ are taken to be *independent*, which is a clear shortcoming

- [[EM algorithm]]:
	- Define the (negative) [[variational free energy]], to be maximised:

$$\mathcal F(\mathcal W, \mathcal G) = \mathbb{E}_{\textbf u \sim P[\textbf u]} \left[\sum_{\textbf v} Q[\textbf v ert \textbf u, \mathcal W] \log\left(\frac{P[\textbf v , \textbf u, \mathcal G]}{Q[\textbf v ert \textbf u, \mathcal W]}\right)\right]$$

noting that sums/expectations are taken over a finite number of binary vectors. Also note that $$Q$$ is completely defined by $$\mathcal W$$.
	
	- Maximise w.r.t. $$\mathcal G$$ during [[E-phase]] as always
	- However $$Q$$ appears in two places, making maximising w.r.t. $$\mathcal W$$ for the [[M-phase]] more difficult...

- Approximating the EM algorithm:
	
	1. Use the KL formulation as seen in the page for [[variational free energy]]: 

$$\mathcal F(\mathcal W, \mathcal G) = L(\mathcal G) - \mathbb{E}_{\textbf u \sim P[\textbf u]}\left[\sum_{\textbf v} Q[\textbf v ert \textbf u, \mathcal W] \log\left(\frac{Q[\textbf v ert \textbf u, \mathcal W]}{P[\textbf v ert \textbf u, \mathcal G]}\right)\right]$$


	2. Reverse the KL direction - this is still a valid divergence between true inverse and approximate inverse! 

$$\tilde{\mathcal F}(\mathcal W, \mathcal G) = L(\mathcal G) - \mathbb{E}_{\textbf u \sim P[\textbf u]}\left[\sum_{\textbf v} P[\textbf v ert \textbf u, \mathcal G] \log\left(\frac{P[\textbf v ert \textbf u, \mathcal G]}{Q[\textbf v ert \textbf u, \mathcal W]}\right)\right]$$


	3. Approximate the prior using the generative model instead! 

$$\tilde{\mathcal F}(\mathcal W, \mathcal G) = L(\mathcal G) - \mathbb{E}_{\textbf u \sim P[\textbf u ert \mathcal G]}\left[\sum_{\textbf v} P[\textbf v ert \textbf u, \mathcal G] \log\left(\frac{P[\textbf v ert \textbf u, \mathcal G]}{Q[\textbf v ert \textbf u, \mathcal W]}\right)\right]$$

i.e. use the prior defined above rather than some true statistics over the input data

- Training the Helmholtz machine on this approximated EM-algorithm is also called the [[wake-sleep algorithm]]. The procedure is summarised over on that page.

$$