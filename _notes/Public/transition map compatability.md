---
title: transition map compatability.md
feed: hide
date: 20-04-2023
format: list
---


**Generic definition:**
Given two [[manifold chart]]s $(U,x)$ and $(V,y)$, the [[transition map]] is $\bullet$-compatible if either:
1. They do not intersect: $U\cap V = \emptyset$
2. They have a $\bullet$ [[transition map]]: $$(y\circ x^{-1}): x(U\cap V)\mapsto y(U\cap V)$$
Note that this is a map between open subsets of $\mathbb R^d$

**Examples:**
- $\bullet=\mathcal C^0$: [[C0-compatible]], of course
- $\bullet=\mathcal C^k$: transition maps are k times differentiable between the open subsets of Euclidean space
- $\bullet=\mathcal C^\infty$: transition maps are smooth
- $\bullet=\mathcal C^\omega$: transition maps are "real analytic", which is even stronger than being smooth
- $\bullet=$ complex: the associated manifold (see: [[atlas structure and compatability]]) is a [[complex topological manifold]]. The transition maps satisfy the [[Cauchy-Riemann equations]]

**Related:**
- [[Whitney's Theorem (on maximal smooth atlases)]]
- 