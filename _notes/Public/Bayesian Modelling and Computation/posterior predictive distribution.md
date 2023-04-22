---
title: posterior predictive distribution
feed: hide
date: 10-02-2023
format: list
---


In the simplest setting, we have data $$X = (X_1, X_2, ..., X_n)$$ which is drawn i.i.d., so our posterior distribution has the form:

$$\pi(d\theta ert x) \propto \prod_{i=1}^n f(x_iert\theta)\pi(d\theta)$$


NB: here, $$x$$ is the observed specific values of all the data so far, $$x_1, x_2, ..., x_n$$.

Then $$X_{n+1}$$ is an unobserved, also i.i.d. new data variable, from the same model

The **posterior predictive distribution** is the regular conditional distribution on this unobserved data, given all previous data:

$$\pi(dx_{n+1}ertx) = \int_\mathcal P f(dx_{n+1} ert \theta) \pi(d\theta ert x)$$


Note that the [[prior distribution]] full determines the predictive distribution. The prior distribution is therefore "the way in which a Bayesian inducts from data to future observations".

Just as we have defined [[measure theoretic Bayesian decision making]] for parameter estimation, solving it using [[credible sets for Bayesian decision theory]], we can define [[credible sets]] for the new data $$X_{n+1}$$.

These are the Bayesian counterparts of frequentist [[prediction intervals]], but again, they have [[vastly different interpretations of credible and confidence sets]]

In this decision making case, we have $$U^*$$ be a function of $$d$$ and $$X_{n+1}$$



$$