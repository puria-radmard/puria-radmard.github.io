---
title: sequential best linear unbiased predictor
feed: hide
date: 28-03-2023
format: list
page_order: 42
---


-   _The Best Linear Predictor_
    -   A linear predictor of an r.v. $X$ using an r.v. sequence ${}

$$\{Y_1,...,Y_n\}$ has the form:
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7222d37b-fb9a-458c-a74d-c7cae0ca7a5b/Untitled.png)
        
        -   Where h0,...,hn are constants
    -   The best linear predictor minimises the squared error loss function:
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1ff8ba7d-8a3f-4e91-9c0f-29562a6bf97d/Untitled.png)
        
    -   We denote this filter with $K[X | Y_{1:n}]$
        
        -   NB K is a function with two arguments
        -   For any target r.v. and r.v. sequence, there is a relevant set of filter coefficients that K solves the minimisation problem for
    -   To solve the squared loss minimisation problem we can use the same trick as in [3F3: Statistical signal analysis](https://www.notion.so/3F3-Statistical-signal-analysis-24372d0d860b47c9a0c423bab0bc21b1):
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1a3ff72c-4b44-44a1-9a64-ffe24beba7bf/Untitled.png)
        
        -   With the factor of 2 ignored because it is set to zero
            
        -   1.8: differentiate wrt $h_0$. 1.9: differentiate wrt $h_1,...,h_n$
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7fb42f03-d865-457a-aece-34142883ce4c/Untitled.png)


-   Solving [1.8] simply for h0, you get:
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a0610f48-002e-4805-ab3b-9d667bc25620/Untitled.png)
    
-   Then substituting this into [1.9], each term just gets its mean taken from it:
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/30183200-c0c2-4c93-82b3-c25f28cc5710/Untitled.png)
    
    -   for i = 1,...,n
    -   The $-\mathbb{E}[Y_i]$ at the end depends on the sum in the inner bracket being $0$, as shown ⇒ multiplying it by $-\mathbb{E}[Y_i]$ retains 0
        -   $\mathbb{E}[\mathbb{E}[Y_i]] = \mathbb{E}[Y_i]$
-   You can represent this in vector form!
    
    -   $\bold{m} = \mathbb{E}[\bold{Y}] = [\mathbb{E}[Y_1],...,\mathbb{E}[Y_n]]^\intercal$
        
    -   $\bold{p} = [Cov(X,Y_1),...,Cov(X,Y_n)]^\intercal$
        
    -   $\Sigma = Cov(\bold{Y}) = \mathbb{E}[\bold{Y}^\intercal\bold{Y}] - \bold{m}\bold{m}^\intercal$
        
        -   i.e. $[\Sigma]_{ij} = Cov(Y_i, Y_j)$
    -   ⇒ $\bold{h} = \Sigma^{-1}\bold{p}$
        
    -   i.e. optimal filter = (covariance of Y)^-1 *(cross-correlation of X and Y)


**Transformation properties of the BLU predictor:**
1. For constants a, b, c, the best filter is linear:
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be0fd676-80d1-4d58-baf2-707f33003d4f/Untitled.png)
    
    -   This is a _key result needed for [[recursion in the sequential BLU predictor]]_

2. For an invertible matrix $C\in\R^{n\times n}$ and a vector $\bold{b}$, we can apply the affine (invertible) transformation to the data:
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1c6f8a9f-b47c-484f-897f-816f7cc8c8fd/Untitled.png)
    
    -   The filter remains the same:
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/71dc43fc-48aa-42f7-847f-8a35ed5b2318/Untitled.png)
        
    -   i.e. we can transform data to make it suit any assumptions!
        
    -   If we ignore $\bold b$, we can show this fairly easily:
        
        1.  Covariance matrix of transformed data:
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/83cf8138-23a1-430b-b841-129ca2139573/Untitled.png)
            
        2.  Therefore:
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7fe939ae-f7a6-4c1f-a47d-78d9f9ff4d22/Untitled.png)
            
        3.  And a similar thing can be said about the cross-covariance:
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ba98f310-05c7-4fef-aacf-ae16cde2a4ff/Untitled.png)
            
        4.  Putting these together:
            
            ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1fd694cb-f25a-436c-8cdb-3db37a3210e0/Untitled.png)
            
        5.  Derivation... the filters are the same

$$

