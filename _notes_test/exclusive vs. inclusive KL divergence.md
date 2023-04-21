---
title: exclusive vs. inclusive KL divergence.md
feed: hide
date: 31-03-2023
permalink: /exclusive%20vs.%20inclusive%20KL%20divergence.md
format: list
---


If we're fitting $q$ to $p$:

**Exclusive KL $KL(q\|p)$:**
- Requires $p$ dominates $q$
- No normalisation wrt $p$ required
- Mode seeking

**Inclusive KL $KL(p\|q)$:**
- Requires $q$ dominates $p$
- Requires normalisation wrt $p$
- Mean seeking

Exclusive KL, used often in [[variational inference]] can cause lowballing of the posterior estimate