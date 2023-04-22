---
title: Bayesian estimator
feed: hide
date: 20-04-2023
format: list
---


Collect full set up from [[measure theoretic Bayesian decision making]]

- We are estimating a parameter, so the decision and parameter spaces are the same: $$\mathcal D = \mathcal P$$
- This means the $$\theta$$ "that exists out there" is actually in the same space as our decision
- As shown above, a Bayes estimator chooses 

$$\hat \theta_B = \arg\max_{d\in\mathcal P} \int_\mathcal P U^*(d, \theta)\pi_{\Theta ert X}(d\theta ert x)$$


- i.e., we have some posterior over the true parameter, and we are choosing $$d$$ in the integral to maximise some utility under this posterior belief
- Effectively, $$U^*$$ is negative loss of our decision, so $$d=\hat\theta$$ is often used

- As seen before in [[3G3 - Introduction to Neuroscience]], choosing U* = -MSE ($$-\ertd-\theta\ert^2$$) picks the mean of the posterior. Using U* = -MAE ($$-ertd-\thetaert$$) gives the posterior median (for one dimensional parameter)


$$