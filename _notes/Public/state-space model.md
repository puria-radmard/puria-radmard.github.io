---
title: state-space model.md
feed: hide
date: 28-03-2023
format: list
---


-   Describes a sequence of observations $\{\bold{Y}_n\}_n$
    
-   Consists of two equations
    
    1.  The Observation Equation: $\bold{Y}_n = G_n \bold{X}_n + \bold{V}_n$
        
        -   $\{\bold{V}_n\}_n\sim WN(0, \{R_n\}_n)$ is a white noise process
        -   $\{G_n\}_n$ is a _deterministic sequence of matrices_
        -   Hence, the observations are functions of the unobserved sequence $\{\bold{X}_n\}_n$
	
    2.  The State Equation: $\bold{X}_{n+1} = F_n \bold{X}_n + \bold{W}_n$
        
        -   Very similar to observation equation...
        -   $\{\bold{W}_n\}_n\sim WN(0, \{Q_n\}_n)$
        -   $\{F_n\}_n$ is a _deterministic sequence of matrices_

- Typically, as in [[4F7 - Statistical Signal Analysis]], we assume that $\forall m\geq1, n\geq1$:
	- $\text{Cov}(\boldsymbol X_1, \boldsymbol W_n) = 0$
	- $\text{Cov}(\boldsymbol X_1, \boldsymbol V_n) = 0$
	- $\text{Cov}(\boldsymbol W_m, \boldsymbol V_n) = 0$
	
	- i.e. first state uncorrelated with any of the noise introduced, and the two noise sequences are uncorrelated at all times
	
	- NB: if two r.v.s are uncorrelated, then the above form applies, but if the above form is true, this does not mean the two r.v.s are uncorrelated


-   **Example of a state space model:**
    
    -   Noisy observations of a molecule's trajectory
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e90cd8f-8cc4-414d-a4af-b45663fe1460/Untitled.png)
    
    -   SSM formulation involves a state vector that covers both position and velocity:
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8a799eb3-b294-4bb8-b3af-b635f8bd1741/Untitled.png)
        
        -   See that this system can be defined by a linear difference equation
        -   By discretising time and ignoring position derivatives above accelerations this is made possible
    
    -   In this example, $\bold{X}_n$ describes the physical state of the molecule, which we observe via $\bold{Y}_n$
        
    -   In other examples, e.g. financial markets, the state vector has no physical meaning, but allows generating an observation sequence that is more faithful than non-state space models


-   We can **represent the SSM recursively** as a function of its initial state and the two _driving noise vector_ sequences:
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f8907593-b547-4573-8770-e32e51bcd373/Untitled.png)
    
    -   i.e. each state vector is just a linear function of the initial state and the driving sequence: $\bold{X}_n = f_n(\bold{X}_1,\bold{W}_1,...,\bold{W}_{n-1})$
        
    -   This should also mean that the mean of the state never shifts, hence the mean of the observation sequence also never shifts...?
        
    -   Therefore, these two become fairly clear:
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8b9f27c0-91be-4de9-b8ed-95302f8cf618/Untitled.png)
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1681dd6c-1745-42d4-9a74-f0c97adc6ab5/Untitled.png)
        
        -   i.e. consider which noise vectors interact with which other noise vectors in the expansions of these expectations, then apply white noise definitions


-  Counter example: **the stochastic volatility model is not an SSM**
    -   We require the data is zero mean
    -   However for share price $\{S_k\}$, we only have positive data
    -   (recall 3E6) ⇒ use the log return: $Y_k = \log(\frac{S_k}{S_{k-1}})$
    -   The *Stochastic Volatility Model* (NOT a state space model):
        -   $X_k = aX_{k-1} + bW_k$
        -   $Y_k = ce^{X_k/2}V_k$
            -   ⇒ The state models periods of high volatility (high variance noise) and low volatility (low variance noise), rather than high and low observation value itself
            -   ⇒ This is NOT a state space model