---
title: von Neumann-Morgenstern theorem
feed: hide
date: 10-02-2023
format: list
page_order: 42
---


Let's say we have some ordering $\preceq$ of decisions in a decision space that satisfes the axioms in [[axioms of rational decision-making]], then $\exists\ U : \Omega\mapsto\mathbb R$ which determines there ordering such that $d_1\preceq d_2$ *if and only if*  

$$\int_{\omega\in\Omega} U(\omega)P_{d_1}(d\omega) \leq \int_{\omega\in\Omega} U(\omega)P_{d_2}(d\omega)$$


In English:
	If a decision maker is rational (follows the [[axioms of rational decision-making]]), then there must exist some **latent [[utility]] function over outcomes** which determines the preference over decisions. The form of this determination follows the [[principle of expected utility maximisation]] and [[measure theoretic Bayesian decision making]]

Note here that the expectation is taken wrt a probability decision mapped from the decision space

Very important so mentioning again: the utility function here is over the outcomes, not the decisions