---
title: credible sets
feed: hide
date: 10-02-2023
format: list
page_order: 42
---


Simple definition:

A subset $$C_x\subseteq\mathcal P$$ of the parameter space is a $$\alpha$$-credible set if  

$$\pi_{\ThetaertX}(\Theta \in C_x ert x) \geq1-\alpha$$


i.e. posterior [[probability measure]] is greater than some defined threshold for this set of parameters

This is a Bayesian counterpart to [[confidence intervals]], as seen when using [[credible sets for Bayesian decision theory]], but has some [[vastly different interpretations of credible and confidence sets]]


#### Credible sets for Bayesian Decision Theory
As introduced in [[Bayesian estimator]], we may use [[measure theoretic Bayesian decision making]] to select a parameter such that $$\mathcal D = \mathcal P$$.

Let's instead consider a version where: $$\mathcal D \subset \mathcal P(\mathcal P)$$, i.e. our possible decision space is actually a restricted set of subsets of the full parameter space. For example we can only choose balls of radius $$r > 0$$ around the Bayes estimator (the utility maximiser). All these balls are subsets of the full decision space

We can define some [[utility]], which has a built in regulariser:

$$\mathbb E_{P_d}[U(\omega)ert\theta, \lambda]=: U^*_\lambda(d, \theta) = \lambda\boldsymbol{1}[\theta\in d] - \text{Vol}(d)$$


e.g. for a given chosen ball, and a given true parameter, the utility is happy when the parameter is at all contained in the ball, but sadder the bigger the ball is. $$\lambda$$ is in effect a regularisation hyperparameter. Outcome $$\omega$$ in this case - as in many others - is also in the parameter space

As seen in [[measure theoretic Bayesian decision making]], a rational decision maker will maximise the expectation of this expression under the posterior. We can also add a constant to it without changing the maximising choice:

$$d^* =  \arg\max_{d\in\mathcal D}\left[ \lambda \pi_{\ThetaertX}(\Theta\in d ert x) - \text{Vol}(d) + \lambda(1-\alpha)\right]$$


- i.e. integrate over all $$\mathcal P$$ with the posterior, so only mass inside ball (i.e. $$\in d$$) makes it to the first term. Remaining terms are constant so integration with a [[law]] doesn't change them!

The above is effectively the [[dual problem]] (in [[Lagrangian form]]). The equivalent [[primal problem]] is:

$$\begin{align}&d^* = \arg\min_{d\in\mathcal D} \text{Vol}(d) \\ &s.t.\ \ \pi_{\ThetaertX}(\Theta\in d ert x) \geq 1 - \alpha \end{align}$$


i.e. pick the **smallest $$\alpha$$-credible set**! Note that the constant $$\lambda(1-\alpha)$$ was needed to derive this nice form


##### Illuminating example, in raw form:

![Pasted image 20230210201453.png](/notes/Public/Pasted image 20230210201453.png){:class="img-responsive"}

Keywords for image: [[Karush-Kuhn-Tucker theorem]]

You must therefore choose $$\alpha$$ - a lower $$\alpha$$ is safer, and also produces a higher $$\lambda$$ (more weight on parameter encapsulation). $$\lambda$$ is often also optimised to some $$\lambda^*$$ alongside $$r$$ ($$d$$), since there is a $$\lambda-\alpha$$ correspondance

The results is that we pick some 1D ball of size $$2r$$, for which there is a $$1-\alpha$$ probability mass that the true parameter is in there. This is why [[credible sets]] are often seen as Bayesian equivalents to [[confidence intervals]], but again, they have [[vastly different interpretations of credible and confidence sets]]. 

$$