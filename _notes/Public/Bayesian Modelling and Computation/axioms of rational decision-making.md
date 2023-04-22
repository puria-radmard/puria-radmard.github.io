---
title: axioms of rational decision-making
feed: hide
date: 10-02-2023
format: list
page_order: 42
---



#### Setup

Consider a **[[sample space]] of outcomes**  \((\Omega, \mathcal F)\) , and a **decision space**  \(\mathcal D\) 

 \(\mathcal D\)  is [[set-theoretic isomorphic]] to  \(\mathcal P_d\) , such that each decision  \(d\in\mathcal D\)  gives some probability distribution  \(P_d\) , defined on  \((\Omega, \mathcal F)\) 

Each  \(P_d\)  can be considered environmental randomness, i.e. after I make decision  \(d\) , what are the probabilities of sets of outcomes in the [[sigma-algebra]]?

 \(\{P_d: d\in\mathcal D\}\)  is a [[convex set]] i.e.: 

\[P_{\alpha d_1 + (1-\alpha)d_2} = \alpha P_{d_1} + (1-\alpha) P_{d_2}\]

and the subscript is also in  \(\mathcal D\) .

This can be thought of randomly choosing a decision:  \(d_1\)  with probability  \(\alpha\) , and  \(d_2\)  with probability  \(1-\alpha\) , then applying chain rule!



#### The axioms

Any rational decision maker can express some preference over elements of  \(\mathcal D\)  using an order  \(\preceq\) , such that:

1. **Symmetry:**  \(d_1\preceq d_2\)  and/or  \(d_2\preceq d_1\) , with both satisfied meaning the decisions are of equal preference
2. **Ordering**:  \(d_1\preceq d_2\)  and  \(d_2\preceq d_3\)   \(\implies d_1\preceq d_3\) , i.e. consistent ordering of decisions wrt preference
3. **Combination**:  \(\forall\alpha, d \in\mathcal D, d_1\preceq d_2\ iff. \alpha d_1 + (1-\alpha)d \preceq \alpha d_2 + (1-\alpha)d\) ., i.e. combining a prefered decision with a new one should create a better decision than doing the same with a less prefered decision. i.e. *contamination should not change order*
4. **Continuity**: if  \(d_1\preceq d_2 \preceq d_3\) , then  \(\exists\alpha, \beta \in (0, 1)\)  such that:

\[\alpha d_1 + (1-\alpha)d_3 \preceq d_2 \preceq  \alpha d_1 + (1-\alpha)d_3\]


The [[von Neumann-Morgenstern theorem]] proves that if the ordering  \(\preceq\)  follows these axioms, then the rational decision maker is actually following the [[principle of expected utility maximisation]] for some (latent) utility over outcomes

\[ \(