---
title: vastly different interpretations of credible and confidence sets
feed: hide
date: 10-02-2023
format: list
page_order: 42
---


Using [[credible sets for Bayesian decision theory]] shows how these constructs might be considered similar to [[confidence intervals]], i.e. you pick some $$\alpha$$ and make a decision such that you have some probability mass that the true parameter is held in your decision

However there are some key differences, and for finite sample sizes, $$\alpha$$-[[credible sets]] rarely coicide with confidences sets of coverage $$1-\alpha$$, even though they have been compared above.

In the case of i.i.d. data, credible sets can have the same coverage in the [[Frequentist]] sense, but only asymptotically as data count $$n\to\infty$$. These are covered by the [[Bernstein-von Mises theorems]]

Take this example:

	To assess the probability of failure, we can test a machine multiple times. We model the outcomes of successive tests X1, X2, . . . as i.i.d. Bernoulli(Θ) random variables, with Θ the probability of failure. Consider two different experiments. In the first, we test the machine 12 times, and we observe 3 failures. In the second, we will test the machine until we observe 3 failures. In this experiment, we performed 12 tests as well, before observing 3 failures.

Bayesian view of this:
	- The likelihood of the two experiments is the same!
	- The investigators *intenstions to continue sampling* should not make a difference
	- Following the [[likelihood principle]], the posterior should be the same, so the two cases produce the same credible set

Frequentist view of this:
	- Confidence interval depends on experimental structure, so is different in the two cases
	- The confidence set guarantee is that "the true parameter will be contained in the conf. set if we repeat the experiment multiple times"
	- There is the *plan to do more experiments, which matters here*
	- i.e. the guarantees are meant to hold in hypthetical repititions of the experiment, not over single events like a Bayesian!