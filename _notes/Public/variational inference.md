---
title: variational inference
feed: hide
date: 31-03-2023
format: list
page_order: 42
---


Given a generative model $p_\theta(z\vertx)$, variational inference involves learning some [[variational approximation]] $q$, which maximises the [[evidence lower bound]]

This typically involves learning the parameters $\phi$ of some function that estimates the posterior distribution, $q_\phi(z\vertx) \approx p_\theta(z\vertx)$
