---
title: recursion in the sequential BLU predictor.md
feed: hide
date: 28-03-2023
format: list
---


Given the formulation of the [[sequential best linear unbiased predictor]], we can start to define the predictor recursively

This can aid with computational costs

- If a new member of the observation sequence is uncorrelated with the existing sequence (i.e. $Cov(Y_i, Y_n) = 0\ \forall\ i<n$):
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/48deac9d-2b8b-41f8-ac72-d83e4bbdb36f/Untitled.png)
    
    -   i.e. when we receive a new observation, we don't need to repeat all calculations
    -   We just have to compute a correction term
        -   the $-\mathbb{E}[X]$ is because both of the K filters will have one of those terms, so one is redundant
    -   NB: again, this only works if the new observation is uncorrelated to the existing sequence