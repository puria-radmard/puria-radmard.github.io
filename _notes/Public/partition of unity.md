---
title: partition of unity.md
feed: hide
date: 16-04-2023
permalink: /partition%20of%20unity.md
format: list
---


For a [[topological space]] $(M, \mathcal O)$, a partition of unity $\mathcal F$ is a set of [[continuous map]]s from $M$ to $[0,1]$ such that $\forall p\in M$:

1. There *exists at least one* [[open neighbourhood]] that is covered by finitely many supports of maps in the set, i.e. $\exists U(p): \{f\in \mathcal F | \forall x\in U(p): f(x) \neq 0\} = \{f\in \mathcal F | U(p) \subseteq \text{supp}(f)\}$ is finite

2. Partitions unity: $\sum_{f\in\mathcal{F}}f(p)=1$


$\mathcal F$ is said to be **subordinate to the open [[cover]]** $C$ if $$\forall f\in \mathcal F: \exists U\in C: f(x)\neq 0\implies x\in U$$i.e. all functions in $\mathcal F$ have supports contained by [[open set]]s in the cover