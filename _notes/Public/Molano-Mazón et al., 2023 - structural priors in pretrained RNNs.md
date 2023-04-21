---
title: Molano-Mazón et al., 2023 - structural priors in pretrained RNNs.md
feed: hide
date: 18-04-2023
format: list
---


- This paper follows a similar structure as [[Xie et al., 2022 - CNN-RNN]]
	- Animals have a very specific fail case in a task
	- A neural network trained only on that task performs super-animally
	- Pretraining on some "harder" task brings about animal-like error behaviours in primary task

- **[[2AFC]] Task (Figure 1A):**
	- Rats hear two tones and must go to louder one to get food
	- Long (many tone) lasting blocks are either 'repeating' or 'alternating'
	- Latter: succissive foods are more likely to be on the same side, v.v. for former
	- Rats can use this statistical structure to boost performance

- **Bad behaviour (Figure 1B,C):**
	- Rats do use this statistical structure - only after correct trials
	- Probability of rat repeating is plotted against evidence for a repeat
		- a.k.a. the [[psychometric curve]] for an individual trial
		
	- After correct trials, the psychometric curve for repeating blocks boosts repeating probability
		- i.e. the rat has accumulated evidence of alternation an dused it in its decision making
		
	- After error trials, the rat does not do this - the two psychometric curves collapse

- **Analysis of bad behaviour (Figure 1E,F):**
	- A [[generalised linear model (GLM)]] is fit on rat choices
	- Weights correspond to impact of previous choices on next choice
	- After correct choices (orange) - decaying evidence accumulation
	- After incorrect choices (black) - no accumulation, only the tone is used!
	- i.e., an *assymetrical* use of correct and incorrect choices

- **Model for bad behaviour and motivation for RNN**
	- This assymetricality is hypothesised because the rat cannot do the *counterfactual inference* required to use incorrect trials
		- Imagine a perfectly alternating trial, correct answer - LRLRLRLR
		- Imagine the rat answers LRLRR - i.e. last one is wrong!
		- The counterfactual is simple to solve - "I said R and it was wrong **so the right answer must be L**, and I already knew I was in an alternating block, so let me try R again"
	
	- The bit in **bold** is the key to the hypothesis
	- Rats are 'pretrained' on much more complex environments, where number of choices  N>>2
	- A wrong choice does not rule out 1/2 of the choice set there, but 1/N $\approx$ 0

- **RNNs are super-rat (Figure 1D,E)**
	- No such correct/incorrect bias in psychometric curves
	- GLM weights show symmatric weighting, hence the counterfactual inference solved perfectly

- **Figure 3B:**
	- This is the key to the theories of this paper and of [[Xie et al., 2022 - CNN-RNN]]
	- In fact, in [[Xie et al., 2022 - CNN-RNN]], I would have really liked to see this kind of story telling about why exactly constraining the sensory module affects the cognition, as is done in this paper

- **RNNs pretrained on an equivalent task with N > 2 also have asymmetrical GLM weightings (Figure 4)**
	- Alternating blocks are just replaced by rotationg blocks (see Figure 3C)
	- This suggests the counterfactual inference is not used by the rat exactly because it is "used to"/pretrained on environments in which it is not useful

I think figure 5 is best interpreted after considering Figure 6, namely the relevant variables graphed out in Figure 6D. The hypothesis they test in these figures is that the network trained in the difficult environment runs the following computation:
1. Integrate transition history -> estimate context
2. Combine context estimation and previous choice information -> next choice bias
3. Combine next choice bias and sensory evidence -> generate choice

Item two is particularly interesting. It interprets the previous choice information (L/R, wrong/right) as a gating mechanism that allows or prevents the context estimation to impact the next choice bias. After a wrong choice, this gate is closed.

Importantly, this hypothesised gating allows the context representation to survive. This means the evidence accumulated to build this can be retained evern through an incorrect choice, and used after future correct choices. This gating is also seen in rat behaviour

- **Gating rather than dropping context (Figure 5A-C)**:
	- This gate-retain-recover strategy is tested in the N>2 case
	- Empirical transition bias matrices are calculated - these are probabilities of transitioning from a choice i at time t-1 to a choice j at time t in the face of zero stimulus evidence on the time t trial
	- After correct trials, a clear bias is seen in the matrices
	- After a single incorrect trial, the bias is lost, and the matrix becomes uniform, however...
	- After a following correct trial, the bias is regained, i.e. context estimation was still being stored despite being gated out
	- Interestingly, after this correct trial, other context transition biases are also shown, indicating evidence from past blocks is also integrated in

- **GLM weights agree (Figure 5D,C):**
	- After a pattern of correct-incorrect-correct, the GLM weights suggest the evidence from the first correct  trial is used in the following trial
	- Again, this disregard of statistical sttructure is a gating mechanism
	- This is also seen in rat behaviour

- **Neural representations (in the 2AFC case for pretrained networks; Figure 6):**
	- This figure explores neural encoding of the three key variables above: context, previous choice information, and transition bias
	- B: Good discrimination of the context by the context encoding
	- C: After context is switched, the context encoding lingers for a bit, accumulating some evidence, then nicely switches sides
	- D: The hypothesised computation
	- E: The neural encodings