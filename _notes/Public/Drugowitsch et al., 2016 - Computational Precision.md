---
title: Drugowitsch et al., 2016 - Computational Precision.md
feed: hide
date: 15-04-2023
format: list
---


This paper asserts that the maority of suboptimality in a choice task arise from *limited precision of neural computation*, rather than any systematic deviation from Bayesian inference.

However, previous tasks fail to discriminate between the two behaviourally.

**Task 1 (figure 1A)**
- 2 or 3 von-Mises distributions shown around ring
- One of these chosen, and 2-16 gratings sequentially shown
- After sequence, subject choses from which distribution they think gratings were chosen

**Computational model - ideal (S2.2)**
- This is a standard [[ideal evidence accumulation model]], with von Mises likelihood and 2 or 3 posterior values maintained

**Computational model - noisy (S2.3)**
- This is the [[noisy evidence accumulation model]]
- Specifically - sensory, inference, and selection stage variability are considered
- Each source of variability is parameterised, e.g. by variance, and these are fitted in various ways...

**Fitting single sources of variability (figure 3)**
- Figure 3B: synthetic behavioural data is generated from each single variability model, and then the variability parameters are fitted for each source.
- [[Bayes factor]] comparison of the fitted models shows very good identifiability of the underlying variability

- Figure 3A: real data is used
- Patterns of overall choice variance for fitted variability models follows those noted in [[noisy evidence accumulation model]]
- Bayes factor comparison suggests *inference variability model is the best fit to real data*
- Note that only sensory variability can be used to make preditions across values of $K$, and these predictions are not great


**Task 2 (Figure 4)**
- Now a tone is played at the end last observation, 50% of the time
- If no tone - task is the same as last time (and data is combined with Task 1 when fitting models)
- If tone - last card is selected independently of the last $T_n-1$ cards, and task is to discriminate only that one (disregard accumulated evidence)

- As one would expect, the sensory model fit the tone trials best, and performance was much better than that predicted from the no-tone fitted model.
- Vice-versa: choice variability is much higher in the no-tone sensory models than predicted by the tone sensory model

**Combining variability sources (Figure 5)**
- Model with all sources fitted to no tone trials only
- Figure 3B: after fitting all three sources, but generating behavioural data with only one, *only inference variability aspect comes close to the human behaviour*
- Figure 3C: number suboptimal
	- This is an interesting metric. It basically says the number of choices amde that don't agree with even the noisy Bayesian decision making model
	- Look at the integral in [[noisy evidence accumulation model]] to see this
	- This proprotion decreases with $T$, given that [[signal-to-noise ratio]] of the decision variables ($z_{1:K}$) increases with observations


**Task 3 (Figure 6 and 7)**
- In this task, every sequences were sometimes repeated, without the subject knowing
- This was to try to sus out [[determinstic biases]] from the behaviour, against unstructured noise in the computation
- The former would cause repeated answers for the repeated structures
- The latter would cause unrelated choices, chosen from the same choice distribution in the noisy model

- This is essentially a [[bias-variance decomposition]] of human behaviour, from [[estimator theory]], which can capture determinstic biases without knowing exactly what they are
- Figure 6B suggests total inference variability arises from unstrcutured perturbations, rather than these biases, i.e. subjects made inconsistent choices

- Figure 7B: Peturbing the data spatially and temporally (i.e. orientation and order) between the two repeats changes the consistency rate
- This suggests we can characterise the biases, and they make models that incorporate these biases in the supplementary information