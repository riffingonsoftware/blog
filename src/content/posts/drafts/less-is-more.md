---
title: "Less is more"
description: "Skills are all you need, and maybe soon not even that."
draft: true
pubDate: "2026.05.18"
heroImage: "./less-is-more.jpg"
heroImageAlt: "'Always has been' meme: One astronaut looks at Earth labeled 'LESS IS MORE' while another points a gun at their back saying 'ALWAYS HAS BEEN'."
tags: ["ai"]
---

Some of you have elaborate skills, giant AGENTS.md/CLAUDE.md files, and mountains of docs. But... you probably don't need them. Know why? Because the models are getting smarter that fast. Go [here](https://metr.org/time-horizons/), click linear, and change it to 80% success rate. That METR eval defaulted to a logarithmic scale for a reason.

Listen, you might need a skill. You might even need a pretty beefy skill, one with multiple files and progressive discovery. But... as time goes on, and new models come out, the shape of that skill should change and usually get smaller. I'll give you a concrete example. Inspired by Matt Pocock's wonderful [agent skills](https://github.com/mattpocock/skills), I used to have a [very deep skill](https://github.com/riffingonsoftware/agent-skills/blob/d68b3503d285b301c8353d33729a3be9ab82d8fe/skills/init-or-refactor-agents-md/SKILL.md) for initializing or refactoring an AGENTS.md. That thing was 513 lines of awesomeness, and it worked. I now have [something](https://github.com/riffingonsoftware/agent-skills/blob/trunk/skills/init-or-refactor-agents-md/SKILL.md) that is much simpler. The new one is 89 lines (at the time of writing), and in my usage, I see essentially the same behavior from agents using either (allowing for actual, semantic differences), and the latter is far easier for me to understand, far less verbose. Multiply that across all the things. All your fancy configs and AGENTS.mds and MCPs... their surfaces need to shrink.

I'll give another example. I should preface this by saying I use Pi, `--dangerously-bypass-approvals-and-sandbox`,

Ever try to do math while someone is counting out loud? It's distracting AF. Yeah, you putting all of that noise into your agent's context... same thing. It's wasting cycles trying to interpret all of your instructions, some of them redundant with newer models, some just to make you feel better ("no mistakes") or playing charades ("you're an expert X"). Some of these things used to work, or at least they seemed to. I get it.

The thing is, with every new frontier model drop, you have to challenge your priors. While, we'll sometimes see some [interesting regressions](https://openai.com/index/where-the-goblins-came-from/), the frontier models are on an upward trajectory. If I was super hardcore, everytime I updated my model or switched harnesses, I'd delete my AGENTS.md, delete all my skills, clean up everything, and just start fresh. Unfortunately, I'm a little too lazy to go that far, but I do try to revisit all the things each time I feel there's a significant change.

Now, some of you might be thinking, bro... Anthropic now has 1M token context windows. Yeah... I don't use that. First, I prefer OpenAI models. Second, when using Claude Opus 1M... it felt dumber to me. Maybe I was holding it wrong. I can accept that. Some of you might be thinking if the models are so smart, they can just ignore unnecessary instructions. Sure, telling the model to write clean code doesn't hurt, but does it help? In both cases, why waste context on useless instructions. If nothing else, you're burning tokens. If you're on a personal account, you might feel like tokens are cheap. If you're involved in any of the billing conversations for an enterprise plan... you know they're not that cheap, and they all add up.
