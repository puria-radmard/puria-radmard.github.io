---
title: Kalman Filter.md
feed: hide
date: 28-03-2023
permalink: /Kalman%20Filter.md
format: list
---


This is a very wide topic, but we start with the "non-Bayesian Kalman Filter" defined in [[4F7 - Statistical Signal Analysis]], which involves updating the [[sequential best linear unbiased predictor]]

**Summary**
-   Assume we have already calculated $K[X_n|Y_{1:n}]$
    1.  **Prediction Step**: Convert this to $K[X_{n+1}|Y_{1:n}]$
        
        Can tell why it's called the prediction step: inferring at step $n+1$, but only using observations from $1$ to $n$
	
    2. **Some intermediary steps** 
        
    3.  **Update Step:** Convert this to $K[X_{n+1}|Y_{1:n+1}]$
        
        _Refines_ estimate of $X_{n+1}$ by incorporating newly observed value


**Prediction Step**:
-   The [[state-space model]] update is $X_{n+1} = f_nX_n+W_n$
-   Hence: $K[X_{n+1}|Y_{1:n}] = f_nK[X_{n}|Y_{1:n}] + \sout{K[W_{n}|Y_{1:n}]}$
-   However, the cross-covariances of $W$ and $Y$ mean that the second term is zero


**Intermediary Steps:**
1.  First, we need $K[Y_{n+1}|Y_{1:n}]$ - the _output_ prediction
    -   This follows a similar proof: $= g_{n+1} f_n K[X_{n}|Y_{1:n}]$
    -   NB: this is still all just prediction, hence why we just multiply by factors from the previous estimations. We are yet to witness $Y_{n+1}$
    -   Okay, but now we do witness $Y_{n+1}$, how do we update predictions now?
        
2.  Then, we need to find the MSE of the original prediction
    -   $\sigma_n = \mathbb{E}\{ (X_n - K[X_n|Y_{1:n}])^2 \}$
    -   Assuming we know this, what is the MSE of the next step prediction?
        -   i.e. what is error of $\bar X_{n+1} = K[X_{n+1}|Y_{1:n}]$?
        -   Just be expanding, you can get $\bar \sigma_{n+1} = f_n^2\sigma_n + q_n$
        -   This makes intuitive sense: MSE is inflated by $\mathbb{E}[W_n^2]$ when next noise step added

3.  We can show that the error and the noise are orthogonal.
    -   i.e. $\mathbb{E}[(X_n-K[X_n|Y_{1:n}])W_n] = 0$

	⇒ We have just invented the Kalman Predictor:
		1.  $\hat X_n = K[X_n|Y_{1:n}]$ - current update (estimate)
		2.  $\sigma_n = \mathbb{E}\{(\hat X_n - X_n)^2\}$ - current update error
		3.  $\bar{X}_{n+1} = K[{X}_{n+1}|Y_{1:n}] = f_n\hat X_n$ - next prediction
		4.  $\bar\sigma_{n+1} = \mathbb{E}\{(\bar X_{n+1} - X_{n+1})^2\} = f_n^2\sigma_n + q_n$ - next prediction error


**Update step**
    -   First, let's define the _Innovations:_
        $$ I_{n+1} = Y_{n+1} - K[Y_{n+1} | Y_{1:n}] = Y_{n+1} - g_{n+1}K[X_{n+1}|Y_{1:n}] = Y_{n+1} - g_{n+1}f_n\hat X_n $$
        -   i.e. the difference between the newly revealed _output_, and the prediction made using all previous outputs
    -   Let's look at an important Kalman filter fact:
        
        $$ K[\cdot|Y_{1:n+1}] = K[\cdot|Y_{1:n},I_{n+1}] = K[\cdot|Y_{1:n}] + K[\cdot|I_{n+1}] - \mathbb{E}[\cdot] $$
        1.  i.e No gain or loss in estimation based on $Y_{n+1}$ vs. $I_{n+1}$, given $Y_{1:n}$
        2.  This is because $(Y_{1:n},I_{n+1})^\intercal$ is an affine transformation of $(Y_{1:n},Y_{n+1})^\intercal$, so predictor stays the same!
    -   This means that we have:
  $$ \hat{X}_{n+1} = K[X_{n+1}|Y_{1:n+1}] = K[X_{n+1}|Y_{1:n}] + K[X_{n+1}|I_{n+1}] - \mathbb{E}[X_{n+1}] $$
        1.  ⇒ Having calculated the first term, we only need $K[X_{n+1}|I_{n+1}]$ and $\mathbb{E}[X_{n+1}]$!
        2.  This is starting to look like recursion...
        3.  And what is the thing we are adding?
            1.  $K[X_{n+1}|I_{n+1}] - \mathbb{E}[X_{n+1}]$ is some linear function of the innovation $I_{n+1}$ of course
            2.  To find the function, can do the scalar version of $\bold\Sigma \bold h^* = \bold p$
                
                -   i.e. $h^* = cov(X_{n+1}, I_{n+1}) / Var(I_{n+1})$
                    
                -   This would make most sense as a demeaned version, i.e.:
                    
                    $$ K[X_{n+1}|I_{n+1}] = \mathbb{E}[X_{n+1}] + cI_{n+1} \quad \text{s.t. } \quad c = \argmin\ \mathbb{E}[(X_{n+1} - \mathbb{E}[X_{n+1}] - cI_{n+1})^2] $$
                    
                -   Differentiating, we get:
                    
                    $$ \mathbb{E}[(X_{n+1} - \mathbb{E}[X_{n+1}] - cI_{n+1}) I_{n+1}] = 0 \implies c = \mathbb{E}[X_{n+1}I_{n+1}] / Var(I_{n+1})
                    
                    $$
                    
                -   $Var(I_{n+1}) = \mathbb{E}[I_{n+1}^2] \sout{- \mathbb{E}[I_{n+1}]^2}$, since $I_{n+1} = Y_{n+1} - K[Y_{n+1} | Y_{1:n}]$ and the output prediction is unbiased
                    
            3.  so...
                
                $$ K[X_{n+1}|I_{n+1}] - \mathbb{E}[X_{n+1}] = \frac{g_{n+1}(f_n^2\sigma_n + q_n)}{g_{n+1}^2(f_n^2\sigma_n + q_n) + r_{n+1}}I_{n+1} $$
                
                -   This is a couple page derivation in the notes, but can be done easily (also in EP):
                    
                -   Numerator is covariance of new state and innovation:
                    
                    -   $\mathbb{E}[X_{n+1}(Y_{n+1} - g_{n+1}f_nK[X_{n}|Y_{1:n}])] = g_{n+1}\mathbb{E}[X_{n+1}(X_{n+1} - f_nK[X_{n}|Y_{1:n}])]$ since $V_{n+1}$ is zero mean and uncorrelated to anything else
                        
                    -   Some rearragement and we get: $g_{n+1}\mathbb{E}[(X_{n+1} - f_nK[X_{n}|Y_{1:n}])^2] + \cancel{g_{n+1}\mathbb{E}[K[X_{n+1}|Y_{1:n}](X_{n+1} - K[X_{n+1}|Y_{1:n}])]}$
                        
                    -   The second term is the cross correlation of the error and predictor, which are orthogonal!
                        
                    -   ⇒ $cov(X_{n+1}, I_{n+1})$ gets to the numerator above
                        
                        -   The $g_{n+1}$ factor is evident
                            
                        -   The error between the new state and $f_n$ times the updated estimation of the previous state:
                            
                            -   $\mathbb{E}[(X_{n+1} - f_nK[X_{n}|Y_{1:n}])^2] = \mathbb{E}[(f_n X_{n} + W_n - f_nK[X_{n}|Y_{1:n}])^2]$
                                
                            -   Taking out cross terms...
                                
                            -   $= \mathbb{E}[f_n^2(X_n - K[X_n|Y_{1:n}])^2] + q_n = f_n^2 \sigma_n + q_n$
                                
                                -   NB: this is the same as the prediction error: $\mathbb{E}[(X_{n+1} - K[X_{n+1} | Y_{1:n}])^2]$
                            -   i.e. the error we found previously, for the _updated_ value, with relevant scalings
                                
                -   Denominator is the innovation variance:
                    
                    -   Similar to above, $Var(I_{n+1}) = \mathbb{E}[(Y_{n+1} - K[Y_{n+1} | Y_{1:n}])^2]$
                        
                    -   Rolling back on both terms in the brackets and dealing with cross-terms:
                        
                        -   $Var(I_{n+1}) = \mathbb{E}[g_n^2 (X_{n+1} - K[X_{n+1} | Y_{1:n}])^2 + V_{n+1}^2]$
                    -   Subbing in what we know, we get the denominator above!


**Finishing update step + expected squared error**
    -   We can have a similar look at the MSE of updates:
        
        -   i.e. take MSE of update: $\sigma_{n+1} = \mathbb{E}[(X_{n+1} - \hat X_{n+1})^2]$
            
            -   Recall that $\hat X_{n+1}$ is the _next_ _updated estimate_ of $X_{n+1}$ now that we have observed $Y_{n+1}$
        -   How can we derive this?
            
            1.  Start with the updated estimate: $\hat{X}_{n+1} = K[X_{n+1}|Y_{1:n}] + K[X_{n+1}|I_{n+1}] - \mathbb{E}[X_{n+1}]$
                
            2.  Subtract the true new state to get:
	               $X_{n+1} - \hat X_{n+1} = (K[X_{n+1} | I_{n+1}] - \mathbb{E}[X_{n+1}]) = X_{n+1} - K[X_{n+1}|Y_{1:n}]$
	               
            3.  Call this $A+B = C$, hence $\mathbb{E}[A^2+B^2+2AB] = \mathbb{E}[C^2]$
                
            4.  Some of these are familiar:
                
                1.  $\mathbb{E}[A^2]$ is the _MSE of the update, $\sigma_{n+1}$_
                2.  $\mathbb{E}[C^2]$ is the _MSE of the prediction, $\bar{\sigma}_{n+1}$_
                3.  $\mathbb{E}[AB] = 0$
                4.  $\mathbb{E}[B^2] = \mathbb{E}[(K[X_{n+1}|I_{n+1}] - \mathbb{E}[X_{n+1}])^2]$ remains
            5.  ...derivation...
                
            6.  Finally - we get to next update error:
                
                $$ \sigma_{n+1} = \frac{\bar\sigma_{n+1}r_{n+1}}{g_{n+1}^2\bar\sigma_{n+1} + r_{n+1}} $$
                
        -   With this, we have got the Kalman update step
            
            1.  Define the innovation
            2.  Update the estimate using the simple update to the prediction
            3.  Calculate the updated error, again a simple update