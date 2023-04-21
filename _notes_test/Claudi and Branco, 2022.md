---
title: Claudi and Branco, 2022.md
feed: hide
date: 19-03-2023
permalink: /Claudi%20and%20Branco,%202022.md
format: list
---


[[Claudi and Branco, 2022 (notebook)]]

This work builds upon [[Embedding Manifolds with Population-level Jacobians]], namely the computational complexity of computing the [[tangent vector space]] of an already [[embedded manifold]], which can be embedded in the [[ambient space]] in an infinite number of ways.

This means that the precise geometry of the target manifold determines the position and orientation of the tangent vector very precisely.

The key proposal here is that "tangent vectors can be computed on topological manifolds **before** their embedding into state space."

This mirrors the advice on intuition of tangent spaces provided in the course "[[Geometric Anatomy of Theoretical Physics]]", namely that the view of a [[tangent space]] as an $m$ dimensional space tangent to an $m<n$ dimensional topological manifold *depends* on the manifold *already* being embedded in the $n$ dimensional ambient space.

Instead, one should view the tangent vectors as [[equivalence class]]. Again, this is all explained in [[Geometric Anatomy of Theoretical Physics]], as well as the [[Part III: Differential Geometry]] course.

The authors not that one could define the [[tangent vector field]] on the manifold itself, then defining an [[embedding function]] $\phi$, which generates a [[pushforward]]:
$$
	\phi^*: T_pM\mapsto T_{\phi(p)}\phi(M)
$$
so we can set the codomain to be the state space, successfully embedding the *precalculated* tangent vector field.

However, this paper's approach consists of defining the basis vectors of $T_pM$ in a semi-standard way:

1. For each [[chart]] $(U_i, x_i)$ in the manifold's [[atlas]] which covers $p\in M$, define $m$ basis functions in the codomain $x_i(U_i)$, i.e. ${f_{ij}:[0,1]\mapsto x_i(U_i)\subset\mathbb{R}^m}$, s.t. $\exists \lambda: f_{ij}(\lambda) = x_i(p)$, $j=1,2,...,m$
2. Find the preimages of their derivatives in the tangent space, and define these as the basis functions of the tangent space, i.e. $\{e_j = [x_i^{-1}\circ f_{ij}]_j^\boldsymbol\cdot\}_{j=1}^{m}$ spans $T_pM$ for all relevant $i$
3. Project these bases using the embedding function, i.e. ${e^*_j = [\phi \circ x_i^{-1}\circ f_{ij}]}$ will span $T_{\phi(p)}\phi(M)$

Item 3 generalises to the full pushforward: all points in $T_pM$ are linear combinations of $e_j$, so all points in $T_{\phi(p)}\phi(M)$ will be linear combinations of $e_j^*$. 

Note that if an embedding function of an $m<n$ dimensional manifold exists for ambient space $\mathbb{R}^k, k<n$, then a simple orthogonal matrix of shape $n\times k$ will complete the embedding to $\mathbb{R}^n$.

Since $\phi\circ x^{-1}\circ f_j$ maps $\mathbb{R}$ to $\mathbb{R}^n$, i.e. to the final ambient space, derivatives can be found numerically. Examples are given in the [[Claudi and Branco, 2022 (notebook)]], where we also cover how the [[RNN connectivity]] is derived from all the jargon above!