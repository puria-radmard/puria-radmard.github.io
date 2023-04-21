---
title: Xie et al., 2022 - CNN-RNN.md
feed: hide
date: 15-04-2023
permalink: /Xie%20et%20al.,%202022%20-%20CNN-RNN.md
format: list
---


See also: [[Molano-Mazón et al., 2023 - structural priors in pretrained RNNs]] for some critique points of this paper

## Poster summary

Introduction

- We know humans have limited working memory capacity, but how can we quantify limitations to compare to a model?
- Several tasks that offer a rich description of working memory performance use

The model

- CNN-RNN model
    - CNN generates a feature vector, fed to RNN
    - Top-down feedback (from RNN → CNN)
- CNN can receive naturalistic images, or task images
- RNN output depends on the task, e.g. binary output, motor output, etc. - see tasks below

- Key training paradigm: *****first***** train the CNN on some sensory task, ****then**** train the RNN on supervised task with the CNN fixed
- This pretraining can be natural image recognition or contrastive representational learning, for example

**The [[set-size effect]] tasks (binary choice)**

- Task:
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled.png]]
    
    - Binary choice - just has to say whether there has been a change or not
    - Positions stay the same, one colour changes 50% of the time
    
- Performance:
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 1.png]]
    
    - Unsurprisingly, number of stimuli rapidly decreases performance
    - End-to-end model training does not have this effect - model performs perfectly

- Other statistics of performance
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 2.png]]
    
- Pretraining also recreates human behaviour wrt size of colour change
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 3.png]]
    
    - ‘deg’ change here is degrees on colour wheel
    - Steeper increase with fewer stimuli, recreated in model

- Handicapping the end-to-end model by decreasing size or injecting noise will somewhat harm performance, but will not recreate performance curves
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 4.png]]
    

- This means, of the constraints tested, the naturalistic sensory constrained enforced by pretraining is required to recreate human-like capacity limitation

- Pretrained model’s capacity markers were also robust to hyperparameters, but not to unnaturalistic datasets!
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 5.png]]
    
    - Black line here is a randomly initialised CNN

**Continuous decision variables**

- Performance
    - Binary choice tasks can be limited in probing behaviour
    - Now, rather than report a change amongst N stimuli, subject must recall colour of a chosen stimulus
        
        ![[Xie et al., 2022 - CNN-RNN/Untitled 6.png]]
        

- Performance
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 7.png]]
    
    - Pretrained model recreates wider errors for larger N
    - End-to-end trained model has mostly consistent error distribution

- To reiterate: the SD of this error distribution resembles the pretrained case only
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 8.png]]
    
    - Increase in SD with N indicates capacity limitation of pretrained model only

- The shape of this error distribution also resembles that of the human subjects
- It is not exactly normal, so one way to describe its shape is to take the residual when you minus a normal from it:
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 9.png]]
    
    - Shape indicates sharper peak and fatter tails of error distribution

- Confidence reporting
    - Subjects can report colour *and* the confidence of their colour recall
    - For humans, error distribution was more spread in lower confidence cases, as you’d expect
    - This was again recreated in the pretrained models
        
        ![[Xie et al., 2022 - CNN-RNN/Untitled 10.png]]
        
    - Not sure how they quantified model confidence here!

- Swap error is roughly recreated
    - This is when the human reports colour of one of the *********other N-1 stimuli*********
    - This is indicated by a higher-than-chance resemblance of the reported colour to that of another stimulus
        
        ![[Xie et al., 2022 - CNN-RNN/Untitled 11.png]]
        

- Prioritising cue
    - From Ma et al. 2014:
        
        ![[Xie et al., 2022 - CNN-RNN/Untitled 12.png]]
        
        - Task requires subjects to view a sequence of coloured, oriented bars
        - At the end of the sequence, a colour is probed, and the subject must recall its orientation in the sequence
        - Over trials, one colour (called the cue colour, here green) is more likely to be probed
        - This makes it more important to commit that colour’s orientation to memory
        - This colour’s presence in sequence decreases performance recalling other colour’s orientation (Fig e above)
    
    - This result is again recreated with the pretrained model
        
        ![[Xie et al., 2022 - CNN-RNN/Untitled 13.png]]
        
        - Note: confusing colour swap, but the line graph on the right means that increasing the importance of the cued colour in the training of the model increases the difference in performance between that colour and the others
    

Neural mechanisms of capacity

- There are similarities between overall neural activation in the pretrained CNN and fMRI data when performing the binary decision task
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 14.png]]
    

- Decoding ability only shows human-like set-size effect in later layers of the CNN
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 15.png]]
    

- Increasing number of distractors (i.e. N-1) shrinks the neural representation of the encoded colour ring
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 16.png]]
    
    - This shrinkage may be the underlying mechanism for the decrease in performance

Counter example: sequential presentation

- An alternative task formulation is to present each stimulus sequentially, rather than all together, then present a positional cue
- In this case, pretraining can recreate human-like capacity only in small RNN models, not in larger ones
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled 17.png]]
    
    - Flatter curve on the right means smaller change in error distribution

- This suggests the constraints placed on the CNN do not effect RNN performance as much, as it is able to store the N stimuli in memory rather than spatially

## Paper summary

- The paper has a wider contribution than the poster, namely “a pipeline to compose multi-system WM models”
- This is a generalised structure of a WM task model, which follow a pattern:
    - A sensory system modelled by a CNN
    - A cognitive system modelled by an RNN
    - Feedforward sensory → cognitive connections always exist, and feedback connections optionally exist
    - Parts of the full system can be trained with different objectives, as seen on the poster
- Options for all parts of the above pipeline are given in their Figure 1:
    
    ![[Xie et al., 2022 - CNN-RNN/Untitled.jpeg]]
    

Preliminary WM results

- Xie et al. 2022: “Geometry of sequence WM in macaque PFC”
    - Macaque’s trained to remember a sequence of spatial locations and reproduce same sequence after delay
    - Model neural state space trained on task very similar to PFC two-photon imaging
        
        ![[Xie et al., 2022 - CNN-RNN/Untitled 1.jpeg]]
        
        - b, c, d main: model response for a given rank-stimulus combination, projected onto the principle subspace for that rank
        - b, c, d insets: same analysis for experimental data
        - e: rank subspaces are all roughly orthogonal to one another

- Panichello & Buschman, 2021: “Shared mechanisms underlie the control of WM and attention”
    - Macaques trained to either remember the colours of two patches and later select one to recall, or pay attention to one of the patches and then report
    - Shared mechanisms were shown for models with top-down or lateral attentional feedback, qualitatively similar to experimental response

Rest of paper is the content of the poster

NB: there is a full paper on BioArxiv, with the bulk of the results also here