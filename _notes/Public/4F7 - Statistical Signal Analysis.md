---
title: 4F7 - Statistical Signal Analysis
feed: hide
date: 28-03-2023
format: list
---


**Introduction / summary:**
In order of _increasing generality we have_
    1.  3F3's optimal filtering:
        -   Wiener filter, only applied to [[wide-sense-stationary]] (WSS) signals
        -   ⇒ Not applicable for many situations
    2.  4F7's optimal filtering:
        -   SSMs - no need for WSS
        -   Exact computation possible!
        -   Assume model can be written as a linear difference equation
        -   ⇒ Inapplicable situations decreases
    3.  HMMs
        -   For when SSMs fail
        -   The is the most general set of time series models
        -   Exact computation not generally possible
        -   Very effective Monte Carlo models though!

**Key definitions before getting started**
- [[orthogonality (random variables)]]
- [[white noise process]] - defined by its moments, without a distribution
- [[state-space model]] _**5 images**_

**Linear filtering**
- The essential example is the [[sequential best linear unbiased predictor]] a.k.a. the BLU predictor, which you should know how to solve in scalar and vector forms _**many images**_
- The BLU predictor adheres to the [[orthogonality principle]]
- Importantly, combining and transforming the data does not change the BLU (see page)
- This helps define [[recursion in the sequential BLU predictor]] _**many images**_

**The Non-Bayesian Kalman Filter**
- Check out [[Kalman Filter - object tracking notebook]]
- This algorithm just breaks down into a prediction step and an update step, summarised in the main page: [[Kalman Filter]]
- Need to also know the Kalman filter error analysis covered on that page

**Inference in Hidden Markov Models**
- The basic formulation of a [[Hidden Markov Model]], and a [[continuous state Hidden Markov Model]] should be known

- The specific example of the [[Linear Gaussian State Space Model (LGSSM)]] will be reused

- The main objectives of inference in a HMM are:
	- Filtering - i.e. current hidden state from all past data
	- Prediction - i.e. future hidden state from all past data
	- Smoothing - i.e. past hidden state from all past data (or current hidden state from all past and future data)

- The nice cases are covered here:
	- For discrete state space: [[exact inference for finite state HMMs]]
	- For continuous state space: [[exact inference for continuous state HMMs]]
		- Again, the specific example for LGSSMs is covered in this page

**Very insightful added content**:
- [[the forward-backward algorithm]]
- [[the Viterbi algorithm]]
- [[the Baum-Welch algorithm]]

The above pages are also useful if you're studying [[4F10 - Deep Learning and Structure Data]]

But then things become less tractable and approximations have to be considered...

**Importance sampling**
- Start with: [[importance sampling]]
- In the sequential setting: [[sequential importance sampling]]
- And to deal with domination: [[sequential importance sampling with resampling]]
	- NB: for the last page, there is some proof missing that is needed (for the 2022 course at least)


**The Particle Filter**
- Once we have the importance sampling pages learned, defining [[the Particle Filter]] should not be too difficult
- also need to know some [[Particle Filter analysis]]
	- NB: again, some proofs missing here - didn't like this section anyway, too handwavey

**Finally:** [[state-space model calibration]]