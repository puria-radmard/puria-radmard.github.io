---
title: wake-sleep algorithm.md
feed: hide
date: 24-03-2023
permalink: /wake-sleep%20algorithm.md
format: list
---


This is an algorithm for unsupervised neural network training using [[variational inference]]. I first met it when approximating the [[EM algorithm]] to train the [[Helmholtz machine]]

**Example - training the [[Helmholtz machine]]**

- Resuming from that page, we now have the approximation to the EM algorithm, where want to *maximise* $$\tilde{\mathcal F}(\mathcal W, \mathcal G) = L(\mathcal G) - \mathbb{E}_{\textbf u \sim P[\textbf u | \mathcal G]}\left[\sum_{\textbf v} P[\textbf v | \textbf u, \mathcal G] \log\left(\frac{P[\textbf v | \textbf u, \mathcal G]}{Q[\textbf v | \textbf u, \mathcal W]}\right)\right]$$
- Rather than taking weighted sums for the expectation over the approximate prior, and the KL divergence, we can take *stochastic samples* from each distribution

- The **[[wake phase]]** replaces the [[M-phase]]:
	1. Take a sample $\textbf u$ from the true distribution $P[\textbf u]$
	2. Use that to take a sample $\textbf v$ from the current recognition distribution $Q[\textbf v | \textbf u, \mathcal W]$
	3. Apply the rules:
		- $\textbf g \leftarrow \textbf g + \epsilon(\textbf v - \textbf f(\textbf g))$
		- $\textbf h \leftarrow \textbf h + \epsilon(\textbf u - \textbf f(\textbf h + \textbf G \textbf v))$
		- $\textbf G \leftarrow \textbf G + \epsilon(\textbf u - \textbf f(\textbf h + \textbf G \textbf v))\textbf v^\intercal$
	
	- "Wake" refers to the fact that we are using real data

- The [[sleep phase]] replaces the [[E-phase]]:
	1. Take a sample $\textbf v$ from the current prior $P[\textbf v | \mathcal G]$
	2. Use that to a sample $\textbf u$ from the current generative distribution $P[\textbf u | \textbf v, \mathcal G]$
	3. Apply the rules:
		- $\textbf w \leftarrow \textbf w + \epsilon(\textbf v - \textbf f(\textbf w + \textbf W \textbf u))$
		- $\textbf W \leftarrow \textbf W + \epsilon(\textbf v - \textbf f(\textbf w + \textbf W \textbf u))\textbf u^\intercal$
	
	- "Sleep" refers to the fact that we are 'fantasising' data

- Check out the notebook for the loss function from which these update rules are derived (spoilers: it's cross entropy)