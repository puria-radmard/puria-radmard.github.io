---
title: distributed distributional code Helmholtz machine
feed: hide
date: 31-03-2023
format: list
---


***Notes from Vértes and Sahani 2018 + a conversation with Máté. See also: [[Vértes and Sahani 2018 (notebook)]] for a demonstration that doesn't work!**

This paper introduced a few new concepts for me, so I will try to break it down into the steps that made me understand it.

**Inference aim**
We are learning a deep generative model, that can be represented by a graphical model with one 'branch', as in page 2 of the paper.

This means we have a 'chain' of latents variables: $p(z_L), p(z_{L-1} ert z_L) ,..., p(z_1 ert z_2), p(xertz_1)$, where x is the data we finally observe.

We want to do [[variational inference]] of this graphical model, however there are some shortcomings of using the exclusive KL divergence (see [[exclusive vs. inclusive KL divergence]], recall that the classic formulation of the [[Helmholtz machine]] uses inclusive KL divergence). 


**Expectation approximation**
This is the most interesting part of the paper in my opinion.

Rather than fitting the [[recognition model]] to the full (training) [[generative model]] distribution, instead it is fit to learn 'shadows' of the posterior in random projections. This is similar to the aim of the field of [[Compressed Sensing]].

I won't copy out the equations, but basically:
- Equation 4: this is how the latent distributions are projected in random directions, called encodings
- Equation 2: we want the recognition model to learn just the expectation of the latent in these random projections
- Equation 3: training a variational approximation of the latent distribution that suits these expectations would generate the maximum entropy (i.e. most 'free') distribution that still satisfies these expectations.
- Equation 5: this is how means of functions are approximated using the recognition model, and we will use this to approximate mean gradients later

There are more notes on this in [[Wainwright and Jordan: Graphical Models]]


**Sleep phase**
As always, this starts with 'dreaming' of the latents and some data, but this time there are L latents to dream

Goal 1 (eqs 6, 7, 8) of this phase is similar to the vanilla case - train the recognition model to do a good job on the *dreamt* data. In this case, this means training it to approximate the random encoding of the dreamt latents

Goal 2 (eqs 9, 10, 11) of this phase is to use the expected function approximation (eq 5) to approximate the mean gradients of the (learned) generative model when maximising the [[evidence lower bound]]. This is done also on the dreamt latents.

Note that this function approximation uses a combination of the approximations of the expected encodings defined above.

**Wake phase**
Generate approximations of the expected encodings for *real* data using the recognition model.

Use these to approximate the gradient of the evidence lower bound.

Apply these gradients to the learned generative model, to optimise for $q$.
