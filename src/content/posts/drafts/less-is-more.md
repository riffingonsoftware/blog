---
title: "Less is more"
description: "Skills are all you need."
draft: true
pubDate: "2026.05.18"
heroImageAlt: "FIXME"
tags: ["ai"]
---

Fine tunes are amazing things. When the AI craze was first heating up, fine tunes were all the rage. Had the models not improved at such a rapid pace, there'd still be a lot of value there. There *is* still value there if you have the right scale and enough similar work, but if you only *think* this might be you, it's probably not. (If you *know* this __is__ you, just focus on the skills and don't think too much about the fine tuning. 😉) For the rest of us...

!["Always has been" meme: One astronaut looks at Earth labeled "LESS IS MORE" while another points a gun at their back saying "ALWAYS HAS BEEN".](./less-is-more.jpg)

Fine tunes can cost anywhere from pennies to... a lot more than that. And, again, that can absolutely [make sense](https://arxiv.org/abs/2406.08660) when you have what's essentially a fixed use case. The problem is, a lot of use cases aren't fixed, and you often just want the best model money can buy. Even if that changes, cool, just use a smaller/cheaper model later once that closes the gap. Maybe one day you even get away with self-hosting on a Raspberry Pi. I'd link something, but that'll go stale even faster than most of this post. Know why? Because the models are getting smarter that fast. Go [here](https://metr.org/time-horizons/), click linear, and change it to 80% success rate. Granted, those are frontier models, and you want to fine tune to get some kind of specific behavior, not just an all-around smarter model, one smarter in some specific way. Great, you're a big, successful company and carry on, but maybe... maybe you just *think* you want to fine tune. That METR eval defaulted to a logarithmic scale for a reason.

In the meantime... you probably just need a skill, or maybe multiple skills. Moreover, as time goes on, and new models come out, the shape of that skill should change and usually get smaller. I'll give you a concrete example. Inspired by Matt Pocock's wonderful [agent skills](https://github.com/mattpocock/skills), I used to have a [very deep skill](https://github.com/riffingonsoftware/agent-skills/blob/d68b3503d285b301c8353d33729a3be9ab82d8fe/skills/init-or-refactor-agents-md/SKILL.md) for initializing or refactoring an AGENTS.md. That thing was 513 lines of awesomeness, and it worked. I now have [something](https://github.com/riffingonsoftware/agent-skills/blob/trunk/skills/init-or-refactor-agents-md/SKILL.md) that is much simpler. The new one is 77 lines, and in my usage, I see essentially the same behavior from agents using either, and the latter is far easier for me to understand, far less verbose. Multiply that across all the things. All your fancy configs and AGENTS.mds and MCPs... their surfaces need to shrink.

Ever try to do math while someone is counting out loud? It's distracting AF. Yeah, you putting all of that noise into your agent's context... same thing. It's wasting cycles trying to interpret all of your instructions, some of them redundant with newer models, some is just to make you feel better ("no mistakes") or playing charades ("you're an expert X"). Some of these things used to work, or at least they seemed to. I get it. The thing is, with ever new frontier model drop, you have to challenge your priors. While, we'll sometimes see some [interesting regressions](goblin link)
