---
title: dominated model
feed: hide
date: 10-02-2023
format: list
page_order: 42
---


A [[parametric model]] $$f$$ is dominated if there exists some [[measure]] $$\Lambda$$ on $$(\mathcal X, \mathcal B)$$ (i.e. the data sample space) such that 

$$f(\cdot ert \theta) \ll \Lambda \;\;\; \forall \ \theta \in \mathcal P$$


i.e. for all individual members of the parameter space, the induced function is [[absolutely continuous]] wrt the measure

By the [[Radon-Nikodym theorm]] for absolutely continuous measures, then that means some density of the model $$f$$ wrt $$\Lambda$$ exists!

$$\Lambda$$ is typically the [[Lebesgue measure]] for pdfs or some [[counting measure]] for pmfs

Because this assumption is so common for likelihoods, we often denote $$f(xert\theta)$$ to mean its own [[Radon-Nikodym derivative]] wrt this dominating measure

$$