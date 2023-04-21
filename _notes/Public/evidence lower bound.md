---
title: evidence lower bound
feed: hide
date: 31-03-2023
format: list
---


For a given generative distribution $p_\theta(z|x)$, the ELBO of some [[variational approximation]] $q$ is:
$$
	\mathcal E(q, \theta, x) = \log p_\theta(x) - \text{KL}[q(z|x)\|p_\theta(z|x)]
$$

This is the same as the [[variational free energy]], but negative

Some shortcomings are considered in: [[exclusive vs. inclusive KL divergence]]