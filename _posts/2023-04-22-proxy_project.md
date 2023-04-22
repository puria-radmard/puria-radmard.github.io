---

title: Who needs decoders?

---

Continuing from my Master's project, I'm working with Yassir Fathullah on training lightweight, decoder-less systems to act as a proxy for larger models when estimating their uncertainty. The addition here is that we use proxies to predict any sequence property conditioned on the primary model, such as word error rate, BERT score, etc.

This is a really exciting project with a application in resource allocation and edge computing. I'm looking forward to bringing it back to [[active learning]] and systematically investigating exactly what makes a good proxy.

Paper on Arxiv soon...
