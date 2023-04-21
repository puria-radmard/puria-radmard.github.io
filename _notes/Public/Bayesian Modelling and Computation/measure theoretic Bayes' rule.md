---
title: measure theoretic Bayes' rule
feed: hide
date: 10-02-2023
format: list
---


Using the third property of the [[measure theoretic posterior distribution]], and assuming a [[dominated model]], then we can write the posterior as a density: $$\pi_{\Theta|X}(d\theta | x) = \left( \frac{f(x|\theta) }{ \int_{\mathcal P} f(x|\theta) \pi_\Theta(d\theta) } \right) \pi_\Theta(d\theta)$$
where $\mathcal P$ is the parameter space, and $f$ is the generative likelihood model (see: [[Bayesian Modelling and Computation]])

i.e. the posterior is [[absolutely continuous]] with respect to the prior ($\pi_{\Theta | X} \ll \pi_\theta$), and everything in the brackets is the density

Or, more familiarily: $$\pi(d\theta | x) \propto f(x | \theta) \pi(d\theta)$$
(with subscripts dropped)

NB: there was a slight abuse of notation here, as we use the same notation for measures and for densities, i.e. $f$ here is really the [[Radon-Nikodym derivative]] $\frac{df}{d\Lambda}$, where $\Lambda$ dominates the model