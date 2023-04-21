---
title: SC-H et al., 2016 - Active Sensing
feed: hide
date: 15-04-2023
format: list
---


- This paper uses the [[BALD score]] to characterise eye movements when identifying a new scene

- **Task**
	- Scenes were generated from patchy, stripy v, or stripy h 2D Gaussian processes
	- Subjects could reveal 5-25 pixels, then rescane those pixels for some time
	- They then classify into patchy or stripy
	- Pixel reveals could be:
		- Baseline - random
		- Human - eye motion
		- Optimal - BAS (BALD) score
	
	- The [[Bayesian ideal observer]] used to generate the BALD scores was like a [[noisy evidence accumulation model]]

- **Results**
	- Saccade dynamics similar to those of everyday tasks
	- Figure 2C shows performance is in order expected, also increases with pixels as expected
	- Figure 3A shows that movement from one pixel to the next was very similar to optimal
	- Rescanning time correlated negatively for 2/3 subjects, suggesting it is an uncertainty indicator
	- No rescanning trials also run, and gave very similar revealing density maps and performances

- **BAS as a model**
	- Look at Figure 4
	- A compares human selection to BAS score, bottom compares it to maxent
	- Beautiful

Didn't mak enotes on rest of it