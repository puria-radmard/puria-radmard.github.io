---
title: ideal evidence accumulation model
feed: hide
date: 15-04-2023
format: list
page_order: 42
---


Task and notation from [[Drugowitsch et al., 2016 - Computational Precision]]

Let's say on trial $n$, a subject observes $T_n$ data $\theta_{n1:T_n}$, and must determine if they were drawn from category $k = 1,...,K$.

For each category, there is a likleihood $p(\theta_{nt} | \mu_k)$

Given uniform prior, the posterior is 

$$\log p(\mu_k|\theta_{n1:T_n}) \propto \sum_1^{T_n} p(\theta_{nt} | \mu_k)$$

And a MAP choice is made $x_n = \arg\max_k \log p(\mu_k|\theta_{n1:T_n})$

The model maintains a 'running posterior' over each category:

$$z_{ntk} = z_{n,t-1,k} + \ell_{ntk} \;;\; \ell_{ntk} = \log p(\theta_{nt} | \mu_k) + c$$

where $c$ is a convinient constant in the likelihood. Then, we just have simple MAP $x_n = \arg\max_k z_{nT_nk}$


$$