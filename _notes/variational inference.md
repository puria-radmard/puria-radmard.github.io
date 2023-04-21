---
title: variational inference.md
feed: hide
date: 31-03-2023
permalink: /variational%20inference.md
format: list
---


Given a generative model $p_\theta(z|x)$, variational inference involves learning some [[variational approximation]] $q$, which maximises the [[evidence lower bound]]

This typically involves learning the parameters $\phi$ of some function that estimates the posterior distribution, $q_\phi(z|x) \approx p_\theta(z|x)$
