---
title: axiomatic systems and theory of proofs
feed: hide
date: 15-04-2023
format: list
page_order: 42
---


- Axiomatic systems is a finite set of propositions ([[propositional logic]]) $a_{1:N}$ which are called axioms, and are taken as true
- A proof wihtin an axiomatic system is a **finite** sequence of propisitions $q_{1:M}$ such that each $q_i$ is one of the following:
	1. Direct from the axioms (A)
	2. A tautology (T)
	3. $\exists 1\leq m, n\lt i: (q_m\land q_n\implies q_i)$ is true (M)

- Weirdly, an axiomatic system is called *consistent* if there is a proposition whihc *cannot* be proven in this way from the axioms

- Here's a meta-logical exercise to show this is the case
	- Let $x$ be the proposition that any statement is provable
	- Let $y$ be the proposition that the axioms are contraditory, i.e. $a_{1:N} = a_1,...,s,...,\neg s,...,a_N$
	- Straight away $y\implies x$, since we can invoke [[ex falso quod libet]] for any statement $b$
		- i.e. the proof for $b$ goes: $s$ (A), $\neg s$ (A), $s\land\neg s\implies b$ (M)
	- Then, we use proof by contradiction ([[proof by contradition and intuitionist logic]]):
		- $(y\implies x) \implies (\neg x\implies \neg y)$
		- i.e. if not every statement can be proven, then the axioms are not contraditory

- Key to all this is [[Godel's incompleteness theorem]]