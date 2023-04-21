---
title: parametric model.md
feed: hide
date: 10-02-2023
format: list
---


In measure theory, models being part of a parametric family ${f(\cdot|\theta):\theta\in\mathcal P}$ mean that $\forall \theta\in\mathcal P, f(\cdot|\theta)$ is a [[probability measure]] in the [[sample space]] $(\mathcal X, \mathcal B)$, i.e. in some data space $\mathcal X$ with a [[Borel sigma-algebra]] $\mathcal B$

For use in [[Bayesian Modelling and Computation]]:

1. We also endow the *parameter space* $\mathcal P$ with a [[sigma-algebra]] $\mathcal B_\mathcal P$
2. Assume that $\forall A \in \mathcal B, \theta \mapsto f(A | \theta)$ is a [[measurable function]]
3. NB: here, $A$ is a measure of the sigma-algebra, so is actually a subset of $\mathcal X$, not just a single element

In simple words, it is a likelihood, and we assume it is a [[dominated model]], so treat it as a distribution over the full sample space as such