---
title: Phase precession
feed: hide
date: 31-03-2023
format: list
page_order: 42
---


*Notes from a meeting with Máté*

[[Theta oscillation]] modulates [[LFP]] at around 5-12 Hz. This is a robust observation in rodent hippocampus when they are moving. That is, when moving, rodent hippocampal LFP's global magnitude oscillates at the theta range.

Meanwhile, on a 1D track, [[place cells]] in rodents fire selective to the location on the track. This [[place field]] can be seen as a [[tuning curve]], tuned to location along the track. One might expect that if you contoured firing rate of cell against location on track and oscillation phase, you get a 'bump' where the place field and the high LFP of the theta oscillations coincide.

However, place fields change with the phase of the rodent in its hippocampal theta oscillations. Namely, as theta oscillations progress in their cycle:
1. Place fields become less selective of location - they spread out
2. Place fields move 'backwards', against the rodent's direction of travel
i.e. the place fields are tuned not just to place, but also phase - see the figure at the bottom.

If one was to train a location decoder purely on the stationary place fields on the rodent, and instead deocde its moving position, you would expect the following observations:
1. At the start of the theta oscillations, i.e. when phase is low, cells for which their place fields you are leaving are most active.
2. At the end of the theta oscillations, i.e. when phase is high, cells for which their place fields you are entering are most active.

This means, over the single theta oscillation, cell activation 'moves' from cells that have place fields behind the animal 'to' those that have place fields ahead of the animal.

All of the above is purely empirical observations. Some papers, such as [[Ujfalussy and Orbán 2022]], assume that this constitutes an implementation of trajectory planning. This might be a shakey assumption, given that the above observations are for a 1D track, where planning is minimal.


![Phase precession notes from Mate.jpg](/notes/Public/Phase precession notes from Mate.jpg){:class="img-responsive"}