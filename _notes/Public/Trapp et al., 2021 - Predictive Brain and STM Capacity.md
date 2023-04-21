---
title: Trapp et al., 2021 - Predictive Brain and STM Capacity
feed: hide
date: 18-04-2023
format: list
---


This is a "speculative" paper on the limitations of [[short-term memory]] (STM), which they define distinctly from [[working memory]] (WM) in that it involves purely storage, not manipulation or integration.

Few papers have been functional in their theories on why STM/[[working memory capacity]] may be limited (i.e. look at how [[Molano-Mazón et al., 2023 - structural priors in pretrained RNNs]] gives a functional reason for suboptimality)

This paper aims to develop a [[predictive brain]] hypothesis view on STM the way it has one for [[long-term memory]], and offers STM as a partial answer to the open question of how priors are retrieved from LTM.

Namely, STM offers machinery for predicting sensory inputs and maintaining priors, as a highlighted dataset compared to LTM. Work on [[contextual cuing]] suggests this - see [[Travis et al., 2013 - Contextual cuing]]. Also, [[Cashdollar et al., 2017 - Predictive Correlates]] showed some correlation between STM capacity and neural correlates for predictive/anticipatory processes


**Predictions Must Be Capacity Limited**
Of course, there is a key cost-duration trade-off in representing predictions:
- Long enough to allow for adjusting behaviour
- Short enough to avoid exponential explosion of possibilities, and exponential decay of likely sequences
i.e. a balance between accuracy and complexity

As in [[active inference]], the [[generative model]] used to understand have an evidence (LLH) or an [[variational free energy]]/[[evidence lower bound]].
- This is the difference between the accuracy (numerator) and complexity (denominator)
- There must be an optimal number of time steps into the past/future to maintain a given degree of prediction accuracy

**The capacity limitation of STM is adaptive** - this optial number of timesteps results from a trade-off between the constraints and the complexity of computation, and its accuracy benefits

**Timescales matter greatly** 
- Sensory information tends to change on a much faster timescale than abstract information, e.g. identity of the object. This is why systems like [[iconic memory]] have evolved
- "This difference in timescales is key in [[hierarchical generative models]], where higher levels predict short trajectories at lower levels"


**Overall** - the argument follows the pattern of [[Molano-Mazón et al., 2023 - structural priors in pretrained RNNs]] and [[Xie et al., 2022 - CNN-RNN]]
- **"a system that serves any novel purpose will necessarily be endowed with features that served the original purpose, and those features may seem irrelevant when co-opted by other processes"**

