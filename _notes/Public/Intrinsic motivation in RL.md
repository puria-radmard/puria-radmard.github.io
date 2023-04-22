---
title: Intrinsic motivation in RL
feed: hide
date: 25-03-2023
format: list
page_order: 42
---


**Notes from Latyshev & Ranov 2023 - Intrinsic Motivation in Model-Based Reinforcement Learning: A Brief Review**

**Introduction:**
- Human beings are not not only extrinsically motivated
- They pay attention to leanring the cause-and-effect relationship in the environment and their previously acquired skills
- They can also reuse accumulated knowledge in this way, i.e. they understand the environments they move between, not just specfiic tasks
- There can be "effective \[task-agnostic\] leanring in the absense of extrinsic drives", which requires some internal model of the environment

**[[Model-based RL]]**:
- They summarise model based RL in this helpful diagram:
![](assets/img/Latyshev and Ranov 2023 figure 1.jpg)
- Overall, the model $$\mathcal M$$ is a *set of functions* that describe the dynamics of the environment

**Intrinsically motivated agent learning**:
- Intrinsic motivation is "doing an activity for its inherent satisfaction rather than for some *seperable consequence*"
- Intrinsic motivation can mix and match three broad types:
	1. A complementary intrinsic reward $$R_\text{int}^*$$, which 'corrects' the main task reward
	2. An exploratory policy $$\pi_\epsilon$$ to guide the agent to collect experience
	3. A set of task agnostic *intrinsic goals* $$\mathcal G_\text{int}$$ and a schedule for learning them
- This is again summarised nicely in a figure: ![](assets/img/Latyshev and Ranov 2023 figure 2.jpg)

- Table 1 shows which papers mix and match which types of motivation. Will return to this below, giving more fine grained examples

**Training part 1: datasets**:
- There are three objects to be learned: task policy $$\pi_g$$, exploration policy $$\pi_\epsilon$$, and model $$\mathcal M$$
- Each of these have a training set of transition triplets (s,a,s')
- The difference is how they are sampled:

	- Learning the task requires we are following a task policy, but this can be done by interacting with the environment, and/or dreaming trials in the model:

$$
	\mathcal D_g = \{\tau_H = (s_i, a_i, s_{i+1})_{0:H-1}\ ert\ a_i\sim\pi_g(s_i), s_{i+1}\sim[\mathcal M, T](s_i, a_i) \}
	$$


	- Similarly, to learn an exploration policy, an agent needs to be exploring effectively:

$$
	\mathcal D_\epsilon = \{\tau_H = (s_i, a_i, s_{i+1})_{0:H-1}\ ert\ a_i\sim\pi_\epsilon(s_i), s_{i+1}\sim[\mathcal M, T](s_i, a_i) \}
	$$


	- But if you are learning a model, you can learn from any policy, as long as the training data comes from real interactions with the environment: 

$$\mathcal D_\epsilon = \{\tau_H = (s_i, a_i, s_{i+1})_{0:H-1}\ ert\ a_i\sim[\pi_\epsilon, \pi_g](s_i), s_{i+1}\sim T(s_i, a_i) \}
	$$



**Training part 2: loss functions**:
- These three objects require a loss function each.
- The first two are standard RL loss functions, i.e. return optimisation while following that policy
- Learning $$\pi_g$$ can involve a mixture of task reward signal $$R$$ and intrinsic reward signal $$R_\text{int}$$, but leanring $$\pi_\epsilon$$ requires only the latter
- Learning the model stands out as it requires a *supervised learning* signal, since the true transition functions can be sampled from the environment
- A few are provided in equation 6:
	- $$\mathcal L_\mathcal M = \mathbb{E}_{\tau_H \sim \mathcal D_\mathcal M} l_\mathcal M(\tau_H, \mathcal M)$$
	- $$\mathcal L_\mathcal M = \mathbb{E}_{\tau_H \sim \mathcal D_\mathcal M} l_F(\mathcal M(S^n, A^h), \tilde{S})$$
	- $$\mathcal L_\mathcal M = \mathbb{E}_{\tau_H \sim \mathcal D_\mathcal M} l_I(\mathcal M(S^n, \tilde{S}), A^h)$$
- Note that these can depend on the forward dynamics model or the backwards dynamics models!




**Types of Intrinsic signal**
- A feedback signal $$R_\text{int}$$ is needed to train any policy
- This can be *knowledge based*, i.e. depends on $$(s_t, a_t, s_{t+1})$$, or *competence based*, which also incorporates some *intrinsic goals*: $$(s_t, a_t, s_{t+1})$$.
- However, to understand past approaches, a better classification is how they use the model...

1. **Model uncertainty intrinsic signals** $$\mathcal L[M]$$
	1. Error between model and true dynamics $$R_\text{int} = ert\tilde{S} - \mathcal M(S)ert$$
			Examples: [[ICM (Pathak, et al. 2017)]], [[SelMo (Groth, et al. 2021)]], [[EMI (Kim, et al. 2019)]], [[Director (Hafner, et al. 2022)]]
	2. Diversity between model ensemble members $$D[\mathcal M^k(S)]$$
			Examples: [[Plan2Explore (Sekar, et al. 2020)]], [[LEXA (Mendonca, et al. 2021)]], [[MEEE (Yao, et al. 2021)]], [[MAX (Shyam, et al. 2019)]]

2. **Knowledge gain** $$\Delta \mathcal M$$
	This is the change in the model after receiving new information $$R_\text{int}(t) = ert\mathcal M(t) - \mathcal M(t-n)ert$$
			Examples: [[AWML gamma-Progress (Kim, et al. 2020)]], [[VIME (Houthooft, et al. 2022)]], [[Deep ICAC (Hafez, et al. 2019)]]

3. **Environment morphology** $$\chi [\mathcal M]: R_\text{int} = X[\mathcal M, S]$$
	Signal characterises the morphology of the model/environment
	This is a weird case as there cannot be learning of this signal
	There is no comparison of this signal between models or between timesteps
	Two examples:
	1. *Empowerment* - information capacity between action sequences and 'resulting' states: [[Goal-Directed Empowerment (Volpi and Polani, 2020)]]
	2. *Reachability* - [[Walking the Random Walk (Mezghani, et al. 2022)]], [[Episodic Curiousity through Reachability (Savinov, et al. 2019)]]




**Using the signal**
- Now that we've defined the intrinsic signal, there are three further ways to divide methodologies, based on how exactly they use this signal...

1. **Intrinsic reward as a complement to extrinsic**
	- This is the simplest to conceptualise - just redefine the reward as $$r = R + \alpha R +\text{int}$$
	- [[ICM (Pathak, et al. 2017)]], [[VIME (Houthooft, et al. 2022)]], and [[EMI (Kim, et al. 2019)]] use this simple method
	- [[MEEE (Yao, et al. 2021)]] goes further and combines *value functions*, not rewards
	
	- The mixed signal will bias task learning
	- To eliminate this effect, either schedule $$\alpha$$ to zero, or choose a $$R_\text{int}$$ that goes to zero
		- This is the case for signal types 1 and 2
	
	- Either way, the model will be used so long as the agent "should" explore
	
	- However, binding the two reward signals can cause issues, and does not divorce the agent from the task
	- This means finetuning is required when introduced to new tasks

2. **To build an exploration policy**
	- We can instsead introduce a completely seperated $$\pi_\epsilon$$, the only objective of which is to generate training data which does not depend on the task
	- Naturally, the reward of this policy depends only on the intrinsic signal
	- Examples: [[MAX (Shyam, et al. 2019)]], [[Plan2Explore (Sekar, et al. 2020)]]
	- [[LEXA (Mendonca, et al. 2021)]] uses the exploration policy as an initialisation of the task policy

3. **Intrinsically motivated goals**
	- A goal space must be defined here, and it is typically done by making the agent hierarchical:
		- A lower level $$\pi(aerts, g)$$ selects actions, and an upper level $$\pi(gerts)$$ selects goals
		- This means the goal space is the same as the state space (i.e. goals select based on current state)
		- See: [[Director (Hafner, et al. 2022)]]
	
	- However, many methods sophisticate this approach by basing goal definition on history of interactions.
	- This can be achieved in two ways:
	
	- Method 1: **forming a goal set**
		- One can use the model itself as a way to form goals
		- Goals can be states in which the model makes poor predictions, e.g. [[LEXA (Mendonca, et al. 2021)]] 
		- The model can also advise on reachability, so as *not to try to learn the impossible*, e.g. [[Walking the Random Walk (Mezghani, et al. 2022)]]
		- [[CC-RIG (Nair, et al. 2020)]] defines reachability by binding state representations with those from which they are accessible
		- Further examples which I didn't really understand from this review: [[SMORL (Zdianchuk, et al. 2020)]], [[SRICS (Zadianchuck, et al. 2022)]]
	
	- Method 2: **choice of goals**
		- I don't know what they were getting at here but they mention [[SRICS (Zadianchuck, et al. 2022)]] again

$$