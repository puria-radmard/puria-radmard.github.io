---
title: de Finneti's theorem on exchangable priors
feed: hide
date: 20-04-2023
format: list
page_order: 42
---


Here we define the theorem for binary observables,  \((X_i \in \{0,1\})_{i\geq1}\)  and a [[prior distribution]]  \(\pi\) .

 \(\pi\)  is an [[exchangable (prior) distribution]] iff there is a measure  \(\pi_\Theta\)  on  \([0,1]\)  such that for any  \(n\)  and possible observation sequence  \(x\in\{0,1\}^n\)  of that length, we have:


\[
	\pi(X_1=x_1,...,X_n=n_n) = \int_0^1 \prod_{i=1}^n \theta^{x_i} (1-\theta)^{1-x_i} \pi_\Theta(d\theta)
\]


i.e.  \(\exists \pi_\Theta \iff \pi\)  exchangable.

Note that  \(\pi\)  does not assume i.i.d., again this would be trivial if so. However, this theorem effectively tells us that any exchangable prior is *equialent* to an i.i.d. [[parametric model]] Bernoulli with parameter  \(\Theta\)  and some prior  \(\pi_\Theta\)  on that parameter.

Note that the integral is over  \([0,1]\) , which is the parameter space  \(\mathcal P\)  in this case.

**Implication: generally, we have answered the question:**
- Q: "I want do define some prior over the data, but there are too many possibilieis that do not factorise, since we do not take i.i.d."
- A: "If you are willing to accept exchangability, then you can equivalently use a parameteric model with an i.i.d. prior!!"


#### Proof - if
- This is trivial, i.e. if we have a parametric model, i.i.d. measure on the data then of course  \(\pi(X)\)  itself is i.i.d., and therefore exchangable
- It is harder to proove that exchangability follows *only* from such a model

#### Proof - only if
**Take undrawn data**
- Let  \(m>n\) , which we will soon take to infinity. Interpret this as the total seen and unseen observations, from which we select the  \(n\)  observations
- Let  \(S_m = \sum_{i=1}^m X_m\) , i.e. a sum of  \(m\)  binary variables
- By exchangability, any  \(S_m=k\)  is equally likely. The sample subsets can only be  \(\{0\}, \{1\}, \text{or}\ \{0, 1\}\) 
-  \(x\)  is the 'realised version' of  \(X_{1:n}\)  and  \(S_n\)  is 'realised' as  \(s_n\) 

- Consider this sequence without order, i.e. an urn containing  \(k\)  ones and  \(m-k\)  zeros
-  \(\pi(X_{1:n} = x ert S_m=k)\)  is the sum of  \(n\)  draws without replacement from this urn
	- Given that each draw is uniform over remainings (i.e. an urn!)...
	- This value = ( \(k\)  [[choose]]  \(s_n\) ) * ( \(m-k\)  choose  \(n-s_n\) ) / ( \(m\)  choose  \(n\) )
	- This nails home the intuition behind introducing  \(m\) 

**Approximate the prior**
- We denote this  \(q(n, s_n, m, k)\)  - "The probability of the data given that the total possible pool of  \(m\)  binary observations I *could* have had added up to  \(k\) "
- Also denote the [[law]] of the unseen fraction  \(S_m/m\)  on  \([0,1]\) :

\[\rho_m(\cdot) = \sum_{k=0}^m\delta(\cdot - k/m)\pi(S_m=k)\]

i.e. spikes of mass at each discrete fraction
- Therefore, the total prior is:

\[\pi(X_{1:n}=x) = \int_0^1q(n,s_n,m,m\theta)\rho_m(d\theta)\]

i.e.  \(\theta\)  represents some unseen  \(S_m/m\) , and  \(\rho_\theta\)  becomes its law.
- i.e. reparameterise a very simple marginalisation wrt the unseeen fraction  \(S_m/k\) 

- Now, *approximate this posterior* by a [[Bernoulli]]:

\[\pi^{\rho_m}(X_{1:m}=x) = \int_0^1 \theta^{s_n} (1-\theta)^{1-s_n} \rho_m(d\theta)\]

noting that the fraction  \(s_n\)  is actually seen by the data!
- This form looks very much like a [[posterior predictive distribution]]
- But how valid is this Bernoulli approximation?

**Approximation Lemma**
- The result is that  \(ertq(n, s_n, m, m\theta) - \theta^{s_n} (1-\theta)^{1-s_n}ert \leq \exp\left\{\frac{2n^2}{m-n}\right\} -1\) 
- See the bottom of this page for proof
- Note that the approximation bound is independent of  \(\theta\) ...

**Finalise**
- For any observation sequence  \(x\) , we have: 

\[ert\pi(X_{1:n}=x) - \pi^{\rho_m}(X_{1:n}=x)ert \leq \int_0^1 \left(\exp\left\{\frac{2n^2}{m-n}\right\} -1\right)\rho_m(d\theta) = \exp\left\{\frac{2n^2}{m-n}\right\} -1 \to 0\]


- as  \(m\to\infty\) , which is the reasonable case, i.e. we are selecting from an infinitely repeatable pool

- The result: under the reasonable case that we are selecting from an infinite pool, the total prior for an exchangable (expressed by our uniformity given the sum) prior is the same as this equivalent i.i.d parametric model one.
- We even hae a law ove  \(\theta\)  for the Bernoulli distribution

\[ \(