---
title: paracompactness
feed: hide
date: 16-04-2023
format: list
---


A [[topological space]] $(M, \mathcal O)$ is paracompact if every open [[cover]] has an open [[cover refinement]] that is locally finite.

This is a very natural property, and non-paracompact spaces look very artificial

If compact, the space is also paracompact, see: [[compactness]]. Vice versa not true.

**Stone's Theorem**: every [[metrisable space]] is also paracompact
e.g. [[the standard topology]] on Euclidean space is paracompact

**Interaction with [[product topology]]:**
- If $(M, \mathcal O_M)$ is a paracompact space and $(N, \mathcal O_N)$ is a compact space, then $(M\times N, \mathcal O_{M\times N})$ is *paracompact*
- In fact, if $(N_i, \mathcal O_{N_i})_{i=1:n}$ are all compact, then $M\times N_1 \times ... \times N_n$ equipped with the product topology is also compact

**Standard check for paracompactness of [[T2 (Hausdroff) topological space]]s**:
- A Hausdroff space $(M, \mathcal O_M)$ is paracompact iff *every* open [[cover]] of $M$ admits a [[partition of unity]] that is subordinate to that cover
