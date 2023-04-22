---
title: cover refinement
feed: hide
date: 16-04-2023
format: list
---


Let $C$ be a [[cover]] of $M$ equipped with topology $\mathcal O$.

A refinement $R$ of $C$ is also a cover, such that:


$$
\forall U\in R: \exists V\in C: U\subseteq V
$$

i.e. get rid of base level redundancies.

Any [[subcover]] is a refinement but not every refinement is a subcover

A refinement is open if $R\subseteq\mathcal O$, i.e. all sets used are [[open set]]s

A refinement is *locally finite* if for all points, you *can find at least one* [[open neighbourhood]] that intersects with only finitely many sets in the refinement, i.e.: 

$$
\forall p\in M: \exists U(p) : \{ \tilde{U}\in R ert \tilde{U}\cap U(p) \neq\emptyset \}
$$

is finite as a set.

This is used to define [[paracompactness]]


$$