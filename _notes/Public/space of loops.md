---
title: space of loops
feed: hide
date: 16-04-2023
format: list
---


For a [[topological space]] $$(M, \mathcal O)$$, the space of loops at any point $$p\in M$$ is: 

$$
\mathscr L_p := \{\gamma:[0,1]\mapsto M\ ert\ \gamma\ \text{is continuous} \ \land \gamma(0) = \gamma(1)\}
$$

i.e. all continuous (see: [[continuity]]) loops that start and end at the point

The space of loops is closed under loop concatenation $$\ast: \mathscr L_p \times \mathscr L_p \mapsto \mathscr L_p$$ where:

$$
(\gamma\ast\delta)(\lambda):=\gamma(2\lambda) \;\; \text{if}  \;\; \lambda\in[0,0.5]
$$



$$(\gamma\ast\delta)(\lambda):=\delta(2\lambda-1) \;\; \text{if}  \;\; \lambda\in[0.5,1]$$


Clear by definition. This can be used to define [[the fundamental group]] of a topological space

$$