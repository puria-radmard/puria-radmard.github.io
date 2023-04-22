---
title: quotient topology
feed: hide
date: 16-04-2023
format: list
---


For a [[topological space]] $(M, \mathcal O)$ and an [[equivalence relation]] $\sim$ on $M$:

$$
\mathcal O_{M/\sim}:= \{U\subseteq M/\sim \bigert \bigcup U = \bigcup_{[a]\in U}[a]\in \mathcal {O}\}
$$


i.e. $U$ is a set of [[equivalence class]]es, each of which are sets. It is included in the topology iff all the members of all the equivalence classes in it were in the original topology.

Easy to show that this is a valid topology on the [[quotient set]], i.e. the space $(M/\sim, \mathcal O_{M/\sim})$ is valid (see bottom).

An equivalent definition is to define via [[the preimage]] of the [[the quotient map]]:

$$
\mathcal O_{M/\sim}:= \{U\subseteq M/\sim \bigert \text{preim}_q(U)\in \mathcal {O}\}
$$



Example: define circular equivalnce relation: $x\sim y:\iff \forall n\in \mathbb Z: x = y + 2n/pi$. Then  $S^1 = (\mathbb R/\sim, \mathbb O_{\text{std}, M/\sim})$


ADD IMAGE HERE

$$