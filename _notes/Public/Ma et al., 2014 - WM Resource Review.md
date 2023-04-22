---
title: Ma et al., 2014 - WM Resource Review
feed: hide
date: 15-04-2023
format: list
page_order: 42
---


- **Slot theory** - WM involves filling a fixed number of 'slots' in the brain with pieces of information
- **Resource model** - There is a finite resource that is distributed amongst information in some way
	- Key evidence given in Figure 1 (see also: [[Xie et al., 2022 - CNN-RNN]])
	- The [[set-size effect]] is evidence of this, particularly the graduality of it


- **Figure 2 - visualisations of WM models and their error patterns**	
	- Slot model:
		- Once an item is committed to a slot, there is no degradation of its recall pattern, even as other slots are populated
		- Items not committed are not stored at all
		- The error pattern for these is uniform - a complete guess
	
	- Equal resource model
		- Every item is stored, and a finite resource is shared
		- Error pattern retains form, but widens as more items are stored and resources are spread more thinly
	
	- Discrete representations
		- This is hybrid model of sorts
		- Also results in neglected items after the quanta run out, resulting in some guess work
	
	- Variable precision
		- Salience and similairty to other items impacts resource allocation
		- Error pattern has a more complex shape
		- When subjects are asked to recall the item they remembered best, they often do better than a randomly chosen one (16)


- **Allocation of resources**
	- Evidence for this cannot be explained by biased competition for sensory processing
		- Stimuli presented in a time sequence (10) have similar findings
		- Cues after observation can have similar effect as those before (26)
	
	- Allocation controllers include: behavioural priorities, visual salience, and covert shifts in attention
	- These can of course change as the task/trial goes on
	
	- [[FEF]] and [[LIP]] produce [[retinotopic maps]] modulated by these factors, suggesting priority


- **Sources of noise**
	- 1) input (sensory and encoding); 2) maintainance of state; 3) decoding (retrieval)
	
	- Sensory examples are plenty
	- Encoding is not instantaneous, e.g. (26)
		- Accuracy = f(duration of observation)
		- Slope of f = g(number of items)
		- i.e. [[accumulation of sensory information]] is *parallelised* across the items
	
	- Accuracy decreases with wait duration, i.e. there is accumulation of noise
	- Decoding effects are less suspected (is this fair??)


- **Neural data**
	- [[fMRI]] has shown regions of human [[PFC]] and [[posterior parietal cortex]] have shown elevanted [[BOLD]] during WM maintainance
	- The [[contralateral delay activity]] (CDA) is another example
	- Both BOLD and CDA are sensitive to the number of items, N
	
	- In the past, a plateau in these signals against N suggested that slots are filled, and no more load is taken
	- However, these findings are not statistically rigourous
	
	- (Something wacky here about alpha-band oscillations)
	
	- Interestingly:
		- Activity (BOLD and CDA) = h(N)
		- Slope of h $$\propto$$ performance in WM task
		- CDA also correlated with recall precision, regardless of N
	- i.e. these signals may reflect information content as well
	
	- Delay period decodability decreases with N, suggesting  a shaed signal resource


- **Resource models and neural data**
	- Wait, why would h have a positive slope, if the same amount of resource is getting distributed to N items?
	- One would expect load-independent signal
	- Do not despair!...
	
	1. BOLD and EEG have more to do with synaptic conductance, rather than spiking activity
		- Both E and I synaptic conductanct contribute
		- Effects such as [[divisive normalisation]] can therefore create constant spiking signals (which *could* be the resource substrate), with increased background synaptic activity
		
	2. These could be metadata signals, i.e. to do with the control of resource allocation



- **Neural models**
	- The slot theory suggested that items were stored in non-interfering oscillations, with sparse evidence
	
	- As mentioned above, one resource substrated could be the number of spikes used to encode the item in memory
	- Amplitude of neural activity arises in some past work:
		1. Precision may correlated with 1/gain, see: [[probabilistic population codes]]
		2. Attention modulates gain also
		3. Effects such as [[divisive normalisation]] suggest decreasing amplitude per item as N increases. (See 68, and this may be a job for SSNs)
		4. Neural spiking is energetically costly, so it makes sense as a resource



- **Memory error patterns**
	- *Notes from this section are incorporated into the Figure 2 notes!*

- **Binding errors (Figure 6)**
	- When remembering the colour of a cued-of-many item, there are two representation spaces storing data - location and colour space
	
	- Modes of failure:
		1. Variability in position representation space
		2. Binding failure - variability in colour conditioned on position
		3. Variability in colour representation space
	
	- 1 and 2 can cause **seemingly** uniform error
		- i.e. guess work in selecting position of square, or guess work in selecting colour based on that
		- Only mode 3 suggests that the "intention" to choose the right colour was there, but there was poor encoding in that space
	
	- **However**, plotting error wrt non-target colours shows non chance accuracy
	- This indicates either:
		- Wrong cue selected in position space
		- Interference with another item's binding
	
	- Bith frame the representation spaces as a sort of finite resource, where [[signal-to-noise ratio]] matters


- **Probabilistic inference in change detection**
	- Change detection requires both retrieval and 'use' of a working memory
	- Figure 7 + annotations summarises this really well by itself:
	- ![MaBays2014Figure7.jpeg](/notes/Public/MaBays2014Figure7.jpeg){:class="img-responsive"}


- SEE OPEN QUESTIONS AT THE END - MIGHT BE A BIT DATED