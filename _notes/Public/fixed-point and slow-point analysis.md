---
title: fixed-point and slow-point analysis.md
feed: hide
date: 31-03-2023
permalink: /fixed-point%20and%20slow-point%20analysis.md
format: list
---


The infamous [[Sussillo and Barak (2013)]] paper outlines the standard way to look for fixed points in a non-linear system. 

Given an (autonomous) system $\boldsymbol x = \boldsymbol F(\boldsymbol x),\ \boldsymbol x\in G\subseteq \mathbb{R}^N$, fixed points have $\boldsymbol F(\boldsymbol x) = \boldsymbol 0$.

However, we more generally want to find points around which $\boldsymbol F(\boldsymbol x)$ is roughly linear. These are points for which: $\boldsymbol F(\boldsymbol x + \boldsymbol \delta \boldsymbol x)\approx \boldsymbol F'(\boldsymbol x)\delta \boldsymbol x$, approximated by the constraints $|\boldsymbol F'(\boldsymbol x)\delta \boldsymbol x| > |\boldsymbol F(\boldsymbol x)|$ and $|\boldsymbol F'(\boldsymbol x)\delta \boldsymbol x| > |\frac{1}{2}\delta \boldsymbol x^\intercal\boldsymbol F''(\boldsymbol x)\delta \boldsymbol x|$

Of course, fixed points suit these criteria. It can be more interesting to look for slow points too, where $\boldsymbol F(\boldsymbol x) \neq \boldsymbol 0$ is still small.

This can be achieved by minimising the 'kinetic energy' $q(\boldsymbol x) = \frac{1}{2} \|\boldsymbol F(\boldsymbol x)\|_2^2$ of the system. The standard recipe for this is to take the trajectory of $\boldsymbol x$ for a given trial, subsample from it, corrupt the sample with some small white noise, and use this as the starting point to locally minimising $q(\boldsymbol x)$.


See 'fixed-point-finder' on Github for a tensorflow example