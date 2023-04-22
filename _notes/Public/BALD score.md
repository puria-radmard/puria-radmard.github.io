---
title: BALD score
feed: hide
date: 15-04-2023
format: list
page_order: 42
---


The BALD score is used for optimal data selection, as per its original use in [[active learning]], and later in [[Active Sensing]]

Given current dataset $$\mathcal D_t$$, we wish to select some new seen input $$x\notin\mathcal D_t$$ to generate $$\mathcal D_{t+1} = \mathcal D_t \cup \{(x,y)\}$$

This is done by maximising the [[mutual information]] between the unseen new output $$y$$ and the posterior over something, conditioned on $$\mathcal{D}_t$$ and $$x$$.
- In active learning this something is the posterior over the parameters of the model
- In active sensing this something is the posterior over the identity of the scene

We will stick to the latter for now, and denote this posterior as $$\pi(cert\mathcal D)$$, i.e. the category of the scene given the data collected

**Interpretation 1**
The BALD score is originally:

$$
	score(xert\mathcal{D}_t) = \mathbb{E}_{y\sim p(y ert x, \mathcal D_t)}\left[H(c ert \mathcal D_t) - H(c ert \mathcal D_{t+1})\right] = H(c ert \mathcal D_t) - \mathbb{E}_{y\sim p(y ert x, \mathcal D)}\left[H(c ert \mathcal D_{t+1})\right]
$$

since the unseen output has no part in the first term

This is the easier interpretation - you maximise the score as the *expected* difference in uncertainty in the key variable before and after revealing $$y$$.

**Interpretation 2**
Now flip the mutual information:

$$
	score(xert\mathcal{D}_t) = \mathbb{E}_{c\sim \pi(c ert \mathcal D_t)}\left[H(y ert x, \mathcal D_t) - H(y ert x, c, \mathcal D_{t})\right] = H(y ert x, \mathcal D_t) - \mathbb{E}_{c\sim \pi(c ert \mathcal D_t)}\left[H(y ert x, c, \mathcal D_{t})\right]
$$

where $$\mathcal D_{t}$$ can be taken out of the second term if data is i.i.d. - which it is usually assumed to be.

This interpretation:
- First term encourages selecting $$x$$ that we are currently overall uncertain about
- Second term encourages selecting $$x$$ that we are currently certain about for each category

This form was originally derived to make entropies easier to calculate - in low dimensional output space rather than high dimensional parameter space

$$