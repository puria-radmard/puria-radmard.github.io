---
title: Bayesian Modelling and Computation.md
feed: hide
date: 09-02-2023
permalink: /Bayesian%20Modelling%20and%20Computation/Bayesian%20Modelling%20and%20Computation.md
format: list
---


Homepage for the Bayesian Modelling and Computation course, Lent 2023


## Ch. 1: Fundamentals of Bayesian Analysis

### 1.0: A measure theoretic formulation of Bayes'

- For a Bayesian problem, we assume data is drawn from a [[parametric model]] $f$, with some key assumptions in that page

- We specify a [[prior distribution]] over parameter sample space $(\mathcal P, \mathcal B_\mathcal P)$, denoted $\pi_\Theta$
	- i.e. it is a regular distribution over the sigma-algebra

- Therefore, the joint [[law]] over data and parameters is $f(dx | \theta) \pi_\Theta(d\theta)$ 
	- This is defined over the [[product space]] $(\mathcal X \times \mathcal P, \mathcal B \times \mathcal B_\mathcal P)$, which, as seen, has a [[product sigma-algebra]]

- Therefore, the marginal law over the data is: $\pi_X(dx) = \int_{\theta\in\mathcal P}f(dx | \theta) \pi_\Theta(d\theta)$

- We can final define a [[measure theoretic posterior distribution]] over the parameters

- To allow a regular posterior distribution to exist,  we assume that this is a [[dominated model]]. We can then express a [[measure theoretic Bayes' rule]] in terms of [[Radon-Nikodym derivative]]s a.k.a. probability distributions

- Overall, the standard definition arises: "the posterior is proportional to the likelihood times the prior"



### 1.1: Making decisions a posteriori

- The posterior "fully determines the epistemic probability of every value of the parameter"
- This makes decision making under uncertainty very easy, if we follow the [[principle of expected utility maximisation]] and the [[axioms of rational decision-making]]
- The [[von Neumann-Morgenstern theorem]] suggests that we follow these axoims, we are implicitly maximising some expected utility
- This allows the definition of a *utility* $U^*$ for [[measure theoretic Bayesian decision making]], with a special case being the [[Bayesian estimator]]



### 1.2: Credible sets and prediction

- [[credible sets]] can be motivated from a decision theoretic viewpoint
- The example given in the credible sets page shows the use of [[credible sets for Bayesian decision theory]] the design problems that arise here
- Credible sets and [[confidence intervals]] have [[vastly different interpretations of credible and confidence sets]]
	- This requires understanding the [[likelihood principle]]

- The [[posterior predictive distribution]] guides prediction by defining a regular conditional distribution on unobserved data



### 1.3: Choosing a prior

- There are many ways to choose a prior, such as in the [[Objective Bayesian]] school
- In this course takes a [[Subjective Bayesian]] approach, seeing reflection of the investigator's prior knowledge about the data in the prior as unavoidable
- Some go even further, and argue that parameters don't exist at all, and we can only put a prior on observables themselves!

- In any i.i.d. parametric [[dominated model]], a prior $\pi_\Theta$ over the parameters will induce a prior distribution on the data $X_1, X_2, ..., X_n$:
	- $\pi(x) = \int_\mathcal P \prod_{i=1}^n f(x_i | \theta) \pi(d\theta)$
	- NB: prior here is on one element of the parameter space
	- This prior entirely determines the [[posterior predictive distribution]] (see: [[dominated model]])

- Because of the width of the problem, [[de Finneti's theorem on exchangable priors]] makes it easier for [[Subjective Bayesian]]s to set a prior, as long as we can accept an [[exchangable (prior) distribution]] as the prior
	- *Need to know the full proof to de Finneti's* (ADD PAGE 8 IMAGE)
	- Be aware that there are versions of de Finneti's in more general spaces, and weaker notions such as [[partial exchangability]]
	- An example of this we need to know is [[Johnson's Theorem on exchangable priors]]