---
title: measure theoretic Bayesian decision making.md
feed: hide
date: 10-02-2023
permalink: /Bayesian%20Modelling%20and%20Computation/measure%20theoretic%20Bayesian%20decision%20making.md
format: list
---


**TLDR**:
	- We have a posterior over parameters which are in the same space as the outcomes
	- This posterior is formed before we take any decisions
	- Because we are following the [[axioms of rational decision-making]], there must be some latent outcome utility
	- We define a new utility*, which is the expectation of the outcome utility given a fixed parameter and a fixed decision. i.e. under the environmental dynamics from that decision
	- The optimal decision is the one that maximises the expectation under the posterior of the utility* function (i.e. wrt the posterior)

Let's say we've observed some data "materialised" (i.e. fixed) as $X = x$, and have used this to derived posterior $\pi_{\Theta | x}$.

We collect the set up from the ([[axioms of rational decision-making]]), i.e. each decision $d$ defines a [[probability measure]] $P_d$ on outcome space $(\Omega, \mathcal F)$.

**Now assume parameter $\Theta$ is an r.v.** ***in the same outcome space*****, i.e. $\theta$ is a random variable in the [[sample space]] $(\Omega, \mathcal F)$**

Importantly for a machine learning setup:
	- Marginal law of $\Theta$ under $P_d$, i.e. the measure generated on parameter space, is equal to $\pi_{\cdot | x}$
	- It does not depend on $d$
	- i.e. our decision does not affect epistemic probabilities about the parameter, only the data does

The [[axioms of rational decision-making]] and the [[von Neumann-Morgenstern theorem]] imply that there exists some [[utility]] $U : \Omega\mapsto\mathbb R$ over outcomes, but hence also over parameters.

We define $U^*(d, \Theta) = \mathbb E_{P_d}\left[U(\omega) | \Theta\right]$, also confusingly called the **utility**

- i.e. taking a decision $d\in\mathcal D$ will generate a probability measure $P_d$ over outcomes $(\Omega, \mathcal F)$, the same space from which the parameter $\Theta$ is taken
- Again the [[law]] of $\Theta$ under $P_d$ does not actually depend on $d$, and is already the [[measure theoretic posterior distribution]] $\pi_{\Theta|X}(\cdot|x)$, i.e. the decision does not affect our epistemic knowledge of the parameter (unlike in, say [[Reinforcement Learning]] and [[active learning]])

- One should look at $\theta$ as a sort of ground truth that exists out there, and affects our utility
- After choosing $d$, $P_d$ will give us an outcome $\omega$, and some parameter $\theta$ will give us the utility $U(\omega)|\theta$
- The best we can do with all of this uncertainty is to work with expectations...
- This is honestly much easier to understand in the [[Bayesian estimator]] case...

This maps $U^*: \mathcal D\times\mathcal P \mapsto \mathbb R$, i.e. takes in a decision *and a single element of the parameter space*

By the (reversal of the) [[tower property]]: $$\int_\Omega U(\omega) P_d(d\omega) = \int_\mathcal P U^*(d, \Theta)\pi_{\Theta | x}( d\theta | x)$$
Recalling from the [[von Neumann-Morgenstern theorem]], the LHS is is easy to understand: the expected utility of the outcome given some action $d$, which is to be maximised.

We can instead maximise the RHS, i.e. the total expectation under environment and parameter of the original outcome utility ($U$)
i.e.: $d_\text{opt} = \arg \max_{d\in\mathcal D} RHS$

i.e. **any rational agent follows this maximiser**, hence following the [[principle of expected utility maximisation]]
