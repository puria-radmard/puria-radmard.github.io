---
title: Denison et al., 2018 - Attention-Dependent Uncertainty
feed: hide
date: 15-04-2023
format: list
---


- Sensory uncertainty is often integrated into decision making - consider for example the [[noisy evidence accumulation model]]

- **[[attention]]** is a key *internal state* which modulates key sensory properties such as [[contrast sensitivity]] and [[spatial resolution]]

- This paper asserts that attention dependent uncertainty is incoporated into Bayesian decision making, using a novel task setup
	- Previous categorisation tasks do not require uncertainty - optimal performance can be achieved just by looking at difference in evidence, e.g. [[ideal evidence accumulation model]]
	
- They call the present task set up an **embedded category task**

**The task**
- Figure 1A: Samples (orientations) are drawn from two distributions with the *same mean* but different variance (von Mises)
	- Generative distribution $\pi=\pi_T$ for the lower variance (tight), and $\pi=\pi_W$ for the higher variance
- 4 are presented at a time, and a cue tells the subject which one to discriminate after a delay
- Figure 1B: Furthermore, ~83% of the time, an untrustworthy (80% correct) prompt of attention is provided at the start of the trial
- Subjects report a discrimination and a (categorically graded) confidence leve;l

**Two different models**
**Shared aspects**
- There is a decision variable $z$ which is compared to boundary vector $\boldsymbol k$, to get the confidence level
- Measurement and recall of each orientation is noisy with $\hat{\theta}\sim\mathcal{N}(\theta, \sigma_\text{att}^2)$
	- i.e. the sensory/recall noise depends on attention
- Free parameters $\sigma_\text{valid}$, $\sigma_\text{invalid}$, $\sigma_\text{neutral}$ had to be fit
- Free parameter $\boldsymbol k$ also fit

**Fixed model**
- $z = \hat{\theta}$, i.e. decision boundaries do not depend on attention
- $\boldsymbol k$ therefore the same for all trials

**Bayesian model**
- $z = \frac{p(\pi = \pi_T ert \hat{\theta})}{p(\pi = \pi_W ert \hat{\theta})}$ (plus some noise they say)
- Easy to show that this means $\boldsymbol k$ depends on attention, so even though it is the same for all trials, plotting them against $\hat{\theta}$ directly shows that they change per trial
- This model, as per the assertions of the paper, fits the behavioural data much better (Figure 3C, 3D)


**Heuristic models**
- Now, they fitted $\boldsymbol k = \boldsymbol k(\sigma_\text{att})$ directly, with linear and quadratic models
- The latter fit better, and better than the above fixed model
- Therefore, dependence on attention was sufficient, *without explicit Bayesian computation*


**Overall main finding:**
- "Human observers incorporate uncertainty-dependent uncertainty into perceptual categorisation and confidence reports"