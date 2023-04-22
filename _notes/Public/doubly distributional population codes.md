---
title: doubly distributional population codes
feed: hide
date: 19-03-2023
format: list
page_order: 42
---


DDPCs tackle the simultaneous representation of [[multiplicity]] and uncertainty in perception by population codes.

Early [[population coding]] theories, suggested that cell $i$ in a population encodes an environmental variable as its rate, which in expectation follows a tuning curve:


\[
\mathbb{E}[r_i] = f_i(s)
\]


However, multiplicity means that $s$ can be a set of values, or better a function over values, rather than a single value. Further, uncertainty can arise from [[noisy detectors]], [[environmental noise]], and [[noisy sensory processing]].

[[distributional population codes]] (DPCs) suggest that each rate actually has a mean value:


\[
\mathbb E[r_i] = \sigma_i\left(\int f_i(s)m(s)ds\right)
\]


i.e. the rate is distributed . Note that when $m(s) = \delta(s - s')$, DPCs collapse to the original mean firing rate model.

Both multiplicity and uncertainty can be seen as a distribution over different values of $s$, however DPC does not allow these 'types' of distributions to be represented differently.

DDPCs instead posit that rates are based on a *distribution over such functions*, i.e.


\[
\mathbb{E}_{p(m)}[r_i(p(m))] 
= \mathbb{E}_{p(m)}[\phi_i[m]]
= \mathbb{E}_{p(m)}\left[\sigma_i\left(\int f_i(s)m(s)ds\right)\right]
\]


This allows you to differentiate between:
1. A perfectly known (simple/trivial $p(m)$) but multivalued (complex $m(s)$ domain) stimulus
2. A simple but highly/multimodally uncertainty stimulus (vice versa)

$p(m)$ can be learned by experience, and adapt to context. While decoding encoding rates back to $p(m)$ is not biologically necassary, an example is show in the original paper: [[Sahani and Dayan 2003 (notebook)]] 

\[

\(