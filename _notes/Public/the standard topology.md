---
title: the standard topology
feed: hide
date: 16-04-2023
format: list
---


The standard topology $$\mathcal O_\text{std}$$ is defined on Euclidean space by [[open set]]s induced by the [[open ball]]:

$$
U\in\mathcal O_\text{std} :\iff \forall p\in U: \exists r\in \mathbb R^+: B_r(p)\subseteq U
$$


Note that whatever [[l-norm]] you equipped the Euclidean space with, you get the same result as if you used the 2-norm, as you can just fit an open 2-ball inside the open l-ball used to check if a candidate set was in the topology.

$$(\mathbb R^d, \mathcal O_\text{std})$$ is indeed a toplogy (see: [[topological space]]):
- The empty set $$U = \emptyset$$ satisfies the definition above by way of [[ex falso quod libet]]
- The full Euclidean space can of course fit a ball in it
- Closed under finite intersection by taking the minimum radius of all sets involved
- Balls contained in sets will be contained in any unions they join

This is a key example of a [[metric-induced topology]]

$$