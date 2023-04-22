---
title: noisy evidence accumulation model
feed: hide
date: 15-04-2023
format: list
page_order: 42
---


Following directly on from the [[ideal evidence accumulation model]]

Generally speaking, noise means we have to choose  $x = \arg\max_k(z_k + \epsilon_k)$, and there are various ways to model this perturbation

Because noise is noisy, we now have a probability over which $x$ is chosen, namely: \[p(x = k \vert z_{1:K}) = \int d\epsilon_{1:K}\ p(\epsilon_k \gt z_j + \epsilon_k - z_k\ \forall\ j\neq k\ \vert\ z_{1:K}, \epsilon_{1:K}) \prod_k p(\epsilon_k)\]assuming perturbation to each category posterior is independent.

There are various ways to add noise, and each one leads to a new form of $\epsilon$. We don't cover the derivations here, as they depend on the model. Some are covered in [[Drugowitsch et al., 2016 - Computational Precision]]

1. **Selection stage variability**, i.e. $x = \text{soft}\max_{\beta}(z_k)$, where $\beta$ is temperature
2. **Inference (likelihood) variability**, i.e. $\hat{\ell_{tk}} = \ell_{tk} + \epsilon_{tk}$, typically Gaussian at each stage. A similar thing for $z$ can also be done, with same variability as if there were $T-1$ likelihood perturbations
3. **Sensory variability**, i.e. perturb $\theta_t$ directly, and let this propagate to $\ell_{tk}$
4. **Prior variability**, i.e. a noisy/non-uniform initial state, and ideal accumulation after that. This looks the same as type two usually.

Of course, you can mix and match all of these.

Importantly, the effect of selection stage variability does not depend on the number of samples $T$.

Sensory variaiblity often induces a non-linear final variailibty in choice, due to non-linearities in the likelihood function.

Inference variability often induces a linear final variailibty in choice, due to the linear increase in overal variance after each likelihood perturbation.\[