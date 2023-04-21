---
title: differentiable manifolds.md
feed: hide
date: 20-04-2023
permalink: /differentiable%20manifolds.md
format: list
---


When we have a map between two [[topological manifold]]s, we need some concept of differentiability.

As noted in [[manifold atlas]], we can use [[local coordinates]] to define differentiability. 

Indeed, if manifolds $(M, \mathcal O_M, \mathscr A_M)$ and $(N, \mathcal O_N, \mathscr A_N)$ are both $\mathcal C^k$ (see: [[atlas structure and compatability]]), then a map $\phi: M\mapsto N$ is said to be $\mathcal C^k$, i.e. $k$ times differentiable, if for *some* [[chart]] pair $(U,x)\in\mathscr A_M$ and $(V,y)\in\mathscr A_N$, the (across-manifold) [[transition map]] $y\circ\phi\circ x^{-1}$ is $k$-times continuously differentiable, in the usual sense.

To reiterate, $y\circ\phi\circ x^{-1}:\mathbb R^{\dim M}\mapsto\mathbb R^{\dim N}$, as seen:

ADD HANDDRAWN DIAGRAM


While it seems shaky to allow any $U, V$ for this check, the definition of differentiability in this way is in fact well-defined:

ADD FULL DIAGRAM WITH ANNOTATIONS


As implied by [[Whitney's Theorem (on maximal smooth atlases)]], this definition extends to [[smooth manifold]]s. In this case, we call $\phi$ a "smooth map"