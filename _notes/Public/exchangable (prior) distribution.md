---
title: exchangable (prior) distribution
feed: hide
date: 20-04-2023
format: list
page_order: 42
---


For an infinite sequence of observables $$(X_i)_{i\geq1}$$ with [[prior distribution]] $$\pi$$, $$\pi$$ is exchangable if $$\forall n$$, $$\forall$$ [[permutation]] $$\sigma$$ in the [[permutation group]] $$S_n$$, and any [[measurable set]]s $$(A_i\in \mathcal B)_{i\geq1}$$, we have 

$$\pi(X_1\in A_1,...,X_n\in A_n) = \pi(X_{\sigma(1)}\in A_1, ..., X_{\sigma(n)}\in A_n)$$


Note that only the order of the variables change, not the sets that we are measuring over.

Note that $$\pi$$ is generally, does not straight away assume i.i.d.. If it did then the above would be trivial.

$$