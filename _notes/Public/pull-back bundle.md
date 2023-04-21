---
title: pull-back bundle.md
feed: hide
date: 20-04-2023
format: list
---


Given a [[bundle]] $(E, \pi, M)$ and a map $f:M'\to M$ from some other [[topological manifold]], a pull-back bundle has:

- Its [[total space]] $E' := \{(m',e)\in M'\times E | f(m') = \pi(e)\}$
- Its [[base space]] $M'$
- Its projective map: $\pi'(m',e) := m'$

i.e. the total space is the [[submanifold]] of the [[product manifold]] $M'\times E$ where the function evaluations specified coincide. The projective map is clearly [[surjective]], as required.

We say this bundle was "induced by $f$"

Consider this image:

XXX

From this, it's clear to see that $(u, f)$, where $u(m', e)\mapsto e$ forms a [[bundle morphism]].

A [[bundle section]] on the original bundle pulls back to the pull-back bundle. Consider this image:

XXX

We can define the pull-back bundle section as: $$\sigma': M'\mapsto E'\;\;\;\;\;\;\;\sigma(m') = (m', (\sigma\circ f)(m'))$$which clearly satisfies $\pi'\circ\sigma' = \text{id}_{M'}$ as required. The second component is defined so that $\sigma(m')\in E'\ \forall\ m'\in M'$.