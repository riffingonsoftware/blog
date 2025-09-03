---
title: "I'm back..."
description: "maybe, possibly, we'll see."
draft: true
pubDate: "2025.09.02"
heroImage: "/images/fawkes.png"
heroImageAlt: "The phoenix Fawkes rising from the ashes with Professor Dumbledore leaning over him, from Harry Potter."
tags: ["ai", "astro", "javascript", "typescript", "vibe coding"]
---

## I'm back

So, I haven't been writing, not here, and not really anywhere. Part of the reason I've not been writing is because I really want to have a positive tone, and I just wasn't feeling it. Well, I'm going to try to push past that.


![Quote "Don't fake it till you make it. Fake it till you become it." -- Amy Cuddy; the quote is impose over a sunrise over mountains.](../../images/fake-it.jpg)

Maybe...

But hey, let's talk about some software.

I originally started this site using [Manuel Ernesto Garcia's excellent template](https://github.com/manuelernestog/astro-modern-personal-website). Over time I did some small modifications. Eventually, Tailwind v4 came out. Getting the dependencies sorted (the template also used DaisyUI, but I didn't really, having removed some of its value, and it was a bit before DaisyUI was updated for Tailwind v4), wasn't fun for me. I tried the instructions, I did [RTFM](https://en.wikipedia.org/wiki/RTFM), honest, but I failed miserably trying to get things upgraded and looking okay. (Funny enough, I have [Renovate](https://www.mend.io/renovate/) running, and through my own neglect, auto-updates had also destroyed my styling.)

Well, something had to change. A few months back, I created a branch with the idea of rebuilding the site from scratch. Brilliant! That truly was my intent, but I kept being drawn to other projects. Astro truly is a great framework, and it does make some things a lot easier, but I've never I think every time I started thinking about learning enough CSS to make the site what I wanted... well, another project would suddenly be a lot more compelling.

I actually had used trying to update dependencies on my old site as a test for new [LLMs](https://en.wikipedia.org/wiki/Large_language_model). Admittedly, it had been a while since I tried that, but none had succeeded. Well, this time, I didn't do that. I instead started with my branch that was a lot closer to empty and asked GPT-5 to get me the same functionality as my trunk branch (I probably should have a post sometime about why I call my main branch trunk, and why you should, too) with minimal dependencies. Okay, this isn't quite what it created the first time, but the first time was so close that it was worth continuing in that vein. The codebase now uses a regular script tag, not SolidJS (still excellent), to inject comments. I was also able to get rid of DaisyUI (also, still excellent). In both cases, I was not using the dependencies in a way that brought meaningful value, and they were simply more dependencies to keep up to date.

Listen, I did review the code, had the LLM talk me through some it, looked some things up. I'm pretty confident I could have done it all by hand, but now I don't have to. I even dealt with some things I'd been kicking the can on. For example, I had a script for generating og:image files for posts, for LinkedIn, but I didn't have it wired in. Now, I have it done as part of the Cloudflare build process using raw Node (I'd originally used TypeScript before because types).
