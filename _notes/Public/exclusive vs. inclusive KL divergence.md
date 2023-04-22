---
title: exclusive vs. inclusive KL divergence
feed: hide
date: 31-03-2023
format: list
---


If we're fitting $$q$$ to $$p$$:

**Exclusive KL $$KL(q\ertp)$$:**
- Requires $$p$$ dominates $$q$$
- No normalisation wrt $$p$$ required
- Mode seeking

**Inclusive KL $$KL(p\ertq)$$:**
- Requires $$q$$ dominates $$p$$
- Requires normalisation wrt $$p$$
- Mean seeking

Exclusive KL, used often in [[variational inference]] can cause lowballing of the posterior estimate