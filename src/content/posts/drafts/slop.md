---
title: "Your code was slop before AI."
description: "Your code wasn't good before AI. Don't kid yourself. Don't blame AI."
draft: true
pubDate: "2026.07.26"
heroImage: "FIXME"
heroImageAlt: "FIXME"
tags: ["ai"]
---

[AI slop](https://en.wikipedia.org/wiki/AI_slop) is everywhere. Code is no different. I'm not going to try to convince you that's not true, but I am going to tell you your code wasn't any good before, either.

Okay, okay, I see you sputtering and stammering and trying to tell me how wrong I am. Maybe, just _maybe_, your code is amazing. Maybe you're writing code like [NASA](https://en.wikipedia.org/wiki/The_Power_of_10:_Rules_for_Developing_Safety-Critical_Code). Maybe _you're_ amazing or maybe your team is amazing or whatever... but... ask __any__ staff+ software engineer, and they've seen some shit. Like some horrible 💩. If your code's so amazing, why does every staff+ software engineer have horror stories? Don't believe me? Ask your senior most engineers.

But, but, AI makes it worse! They're only producing average code. Maybe, but that means it's better than about half the code you might have ended up with.

Listen, I'm a big Mitchell Hashimoto fan. He recently [posted on X](https://x.com/mitchellh/status/2060088112257372610) about an agent optimizing some code from 88ms to 2ms and allocations from ~150k to 500. To paraphrase, he said it wasn't very good because he then did similar, with hand-rolled code, in 0.02 ms and 0 allocations. Listen, I'll fanboy for a moment. Mitchell, you're not average. You're an amazing developer. Ghostty is beautiful. So, maybe you, John Carmack, and Chris Sawyer (the guy who wrote [Roller Coaster Tycoon](https://en.wikipedia.org/wiki/RollerCoaster_Tycoon_(video_game)) in assembly) should just carry on. (Yes, I know Carmack is now working on [AGI](https://keenagi.com/).) For the rest of us, 88ms to 2 is pretty damn good. Now listen, I don't want to paper over it. Mitchell also shared it took 4 hours and $350 to get the suboptimal results. So, yeah, we'd like better performance faster and cheaper. The most AI-pilled amongst us will tell you, the models will get better, faster, and cheaper. I _want_ that to be true. I also want it to be true that I could have bested the AI's results, but 🤷, dunno.

![The Swedish Chef from The Muppets makes a “chef’s kiss” gesture while holding a whisk.](../chef_kiss.jpg)
In appreciation of [Ghostty](https://ghostty.org/).

So, if the AI code is good enough, why is there so much shitty software in circulation? Why have we all become used to things crashing, running slowly, and generally misbehaving? Well, I think I know one big reason. The people writing the code don't use the product.

In my last two roles, amongst the first things I did was ask to be onboarded like a customer. If you work in B2C, consumer facing software, hopefully you use your product. I envy the folks at companies like 1Password, Uber, or Netflix. Don't get me wrong, it's not necessarily _easy_ to have complete customer sympathy. Plenty of engineers aren't going to try their apps on slow internet connections or on ancient hardware, but at least they can experience the happier paths. What happens if you work on a enterprise doohickey? Good luck testing it in anything approaching a real scenario. It's not impossible to make good software in those circumstances, but it's a damn sight harder.

I'll give a personal example. I used to buy Madden every freaking year. It's terrible. It's horrendously bad, laughably bad. The best offensive linemen in the league block absolutely nothing. The game would crash... would crash a console. There were years they didn't even update the rules to match the NFL's rules. I'm convinced most of that team did NOT play that damn game. It was that damn bad. So, you don't care about your software, don't use it at all? Yeah... slop. I'll pass, thanks.

![FIXME](../madden.jpg)