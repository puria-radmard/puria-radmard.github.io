---
title: probabilistic population codes
feed: hide
date: 23-03-2023
format: list
page_order: 42
---


PPCs, as described in [[Ma et al. 2006 (notebook)]], consider neurons as encoders of probability distributions rather than encoders of variable values.

This gives an explanation of response variability, since the population response is drawn from $p(\boldsymbol r\verts)$, e.g. in the independent Poisson case 

$$p(\boldsymbol r\verts) = \prod_i \frac{e^{-f_i(s)}f_i(s)^{r_i}}{r_i!}$$


This then encodes a posterior ditribution naturally, e.g.  in the independent Poisson case: 

$$p(s\vert\boldsymbol r) \propto  p(s)\prod_i \frac{e^{-f_i(s)}f_i(s)^{r_i}}{r_i!}$$

Where the prior over stimulus is often taken as flat over stimulus values $s$.

The aim now is to combine the information from multiple (wlog 2 here) presynaptic populations of neurons into one postsynaptic one, in a 'Bayes optimal' way. If the rates are related with:

$$\boldsymbol r_3 = \boldsymbol F(\boldsymbol r_1, \boldsymbol r_2)$$

then the transformation $\boldsymbol F$ is called Bayes optimal if the two equivalent statements apply:

$$p(\boldsymbol r_3\verts) = p(\boldsymbol F(\boldsymbol r_1, \boldsymbol r_2)\verts) \propto p(\boldsymbol r_1, \boldsymbol r_2\verts) \iff p(s\vert\boldsymbol r_3) = p(s \vert \boldsymbol r_1, \boldsymbol r_2)$$

i.e. there is no *loss of information* during the message passing.

The analysis in the paper considers the exponential family likelihood case, that is when:

$$p(\boldsymbol r_k \vert s) = \frac{\phi_k(\boldsymbol r_k)}{\eta_k(s)}\exp\left(\boldsymbol h_k^\intercal (s) \boldsymbol r_k\right)$$


In the case when the presynaptic rates are independent, i.e. $p(\boldsymbol r_1, \boldsymbol r_2\verts) = p(\boldsymbol r_1 \vert s) p(\boldsymbol r_2\verts)$, then a *linear* Bayes optimal combination of rates applies:

$$\boldsymbol F(\boldsymbol r_1, \boldsymbol r_2) = \boldsymbol A_1^\intercal \boldsymbol r_1 + \boldsymbol A_2^\intercal \boldsymbol r_2$$

where the matrices are chosen such that $\boldsymbol h_k(s) = \boldsymbol A_k \boldsymbol b(s)$ for all (both) presynaptic populations. A similar pattern applies in the dependent case (see supplementary material).

The special case is when $\boldsymbol r_1$ and $\boldsymbol r_2$ have the same number of neurons, and each corresponding tuning curve is proportional (i.e. $r_{1,i}, r_{2,i} \propto f_i(s) \ \forall\ i$ ), when $\boldsymbol F$ is just a sum. The notebook shows examples where this is and examples where this is not the case.

**Example: combining Gaussian and sigmoidal tuning curves**
In the notebook we follow the example in Figure 3 (also in Supplementary Material section 3) except that we do not randomly generate the tuning curves but rather define them with a grid of parameters.

We follow the example given here by the supplementary material:
1. Define a 'basis set' of tuning functions, which are of Gaussian shape but have different parameters to the one Gaussian presynaptic layer's tuning curves
2. Get the output of the basis set, and the three presynaptic layers to all possible stimuli. 'Output' here refers to the value of the tuning curves, i.e. the mean rate, rather than an actual Poisson trial
3. Find the A matrices using the standard var.-over-covar. linear regression solution (with a unit regulariser):

$$\boldsymbol A_k^\intercal = \left[\boldsymbol C_b + \boldsymbol I \right]\boldsymbol C_{bh^*,k}$$

which solves the OLS of $\boldsymbol h_k(s) = \boldsymbol A_k \boldsymbol b(s)$ as required

More commetary given on the notebook!