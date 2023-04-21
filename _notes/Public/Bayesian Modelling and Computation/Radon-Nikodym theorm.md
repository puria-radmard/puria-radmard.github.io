---
title: Radon-Nikodym theorm.md
feed: hide
date: 10-02-2023
permalink: /Bayesian%20Modelling%20and%20Computation/Radon-Nikodym%20theorm.md
format: list
---


The Radon-Nikodym theorem is the reverse of a very intuitive statement:

Forward:
	- If we have a [[measure]] $\mu$ on [[sigma-algebra]] $\mathcal B$ of space $\mathcal X$, and a non-negative function $g$, then we can define some other measure $\nu(A) = \int_{x\in A} g(x) \mu(dx)$
	- Then $\nu\ll\mu$ ([[absolutely continuous]]), i.e. if $\mu$ measures zero for $A$, then $\nu$ must also be zero

Reverse:
	- Given two [[sigma-finite]] measures $\nu$ and $\mu$, both on $\mathcal B$, s.t. $\nu\ll\mu$, then there is some unique function $g$ that fits the above
	- We can call this function the [[Radon-Nikodym derivative]], i.e. $g(x) = \frac{d\nu}{d\mu}$


Consider the real line example, with measure being length along x axis. If we devise a new measure that corresponds to the y axis, we have a first-order derivative!

The absolute continuity here requires that as $dx\to0$, then the function does not make jumps, i.e. it is differentiable!

