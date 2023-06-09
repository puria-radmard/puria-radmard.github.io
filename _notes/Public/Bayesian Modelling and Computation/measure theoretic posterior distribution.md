---
title: measure theoretic posterior distribution
feed: hide
date: 10-02-2023
format: list
page_order: 42
---


The **posterior distribution** $\pi_{\Theta\vertX}$ is a regular conditional probability distribution of the parameter $\Theta$, conditional on $X$, which is any form of data already observed

$\pi_{\Theta\vertX} : (\mathcal B_\mathcal P, \mathcal X) \rightarrow [0,1]$ 
	i.e. it maps from the [[sigma-algebra]] of the parameter space and the full data space onto a probability

So the argument is a subset of parameters, not an individual element of $\mathcal P$

Following key properties:
	1. $\pi_{\Theta\vertX}(\cdot \vert x)$ is a [[probability measure]] $\forall x\in \mathcal X$, i.e. $\int_{A\in\mathcal B_\mathcal P} \pi_{\Theta\vertX}(A \vert x) = 1$ 
	2. For any subset of the data space $x$ and parameter set $A\in\mathcal B_\mathcal P$, the map $x \mapsto \pi_{\Theta\vertX}(A \vert x)$ is a [[measurable function]]
	3. Finally, \[\int_{\theta\in A, x\in B} f(dx\vert\theta)\pi_\Theta(d\theta) = \int_{\theta\in A, x\in B}\pi_{\Theta\vertX}(d\theta\vertx)\pi_X(dx)\]
		i.e. for a given set $A\in\mathcal B_\mathcal P$ of parameters and $B \in \mathcal B$ of data, the sum of the data likelihood (defined on single data) times the prior (defined on single parameters) equals the sum of the posterior (defined on single parameters) times the data marginal law
		(see: [[Bayesian Modelling and Computation]], Ch. 1)

This allows a [[measure theoretic Bayes' rule]] to be expressed

Some topological constraints are required to ensure the posterior can exist

It is sufficient to assume that $\mathcal X$ and $\mathcal P$ are both [[Polish space]]s, which isn't particularly restrictive\[