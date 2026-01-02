---
title: "Tech Debt as TDD"
description: "Good tech debt can be test driven development for an engineering org"
draft: true
pubDate: "2026.01.01"
heroImageAlt: "FIXME"
tags: ["engineering"]
---

I like to say all code is technical debt, but most engineers I know view technical debt strictly as a bad thing. If only things were so easy. There is good technical debt.

So, what is good technical debt? Sometimes we have to make technical choices we know to be suboptimal for business reasons. Maybe we need to hit a date. Maybe we have to work around organizational friction. Maybe we don't yet know the *right* solution.

Ship it!

That can be great. In the most extreme case, this could mean the business lives to fight another day, but it's not usually quite so dramatic. Regardless, knowingly taking on the debt can be good for the business. And the reality is, we devs, we have a job because the business is in business, not for the purity of the craft, not for the pursuit of perfection or even technical superiority.

Now, I do want to go back to my all code is debt belief. I would hazard a guess most engineers who have worked in a long-lived codebase would do things very differently given the chance to rewrite from scratch. Sometimes, usually rarely, but sometimes you get a chance to do a full rewrite. Now... I know... you're l33t and are probably using Rust and that buttery smooth [FP](https://en.wikipedia.org/wiki/Functional_programming) to replace your old and busted Java codebase. Even if you were using functional patterns in Java, I'd hazard a guess you're change more than just idioms. That Java codebase, the same one that's made plenty of money, yeah, it was debt. No, not because it wasn't Rust. It's just because that's the nature of code. It's debt.

Damn it... I *really* shouldn't do this, but I'm going to digress for a moment. I see you in the comments (hahahahah, I know there are no readers, it's just a literary device, a conceit 😉). Yeah, *you*. You're saying, what about that grail software, the software that's actually __done__. I will concede that some software can get to done, but I hope you'll be willing to grant that that kind of software is uncommon, and software that's done __and__ making money is vanishingly rare.

Now, before I tie it all together, I should briefly introduce Test-Driven Development (TDD). I'll admit I have a mixed relationship with TDD. Once upon a time, I was a big believer and strong adherent. I have friends who refused to believe me, but I would very often start by writing out tests for code that didn't exist. (One of the things I miss from IntelliJ with Java is it's ability to create methods that don't exist from a call site.) I was proficient with my tools, had a good feel for what I would need to mock, a good handle on design principles for the domains I tended to play in, and I truly knew the testing frameworks I used. So, it was straightforward for me, if not always easy.

The phrase you'll often see for TDD is some variation of "red -> green -> refactor." That's to say, you write a test for the functionality you'll want to add/modify but have yet to do so. So the test will fail, ie red. You'll then do the minimum to get the test green. Now, in the "purest" form of TDD you should do the *absolute* minimum to make the test green. So, for example, if you were wanting to create an addition function, and your test was asserting that 2 + 2 == 4, you would then implement by having your addition function return 4, always, statically. See, you should add another test or tests for other cases, back to red. Then you can start refactoring. Yeah, I know, I just described red -> green -> red -> refactor. Yes, I *could* describe the proper red -> green -> refactor, but I hope you now get the point.

> Often, the first step to getting to right is getting it wrong.  &mdash;  Ricardo Torres
(Yep, I just quoted myself.)

So, let's see if we can land this puppy. In my experience, we very often think we know what software we're building. That is, hopefully we know what we're building, but we think it's what we, or the customer, want. We don't know. Let's get it it out there. Ship it! Is it working? Is it selling? Is it resonating? No? Not quite? Not as well as we hoped? Refactor! Chase that green... wait... yeah...

![US one hundred dollar bills falling.](../../../images/money.png)
Image by <a href="https://pixabay.com/users/scr3amfr3ak-3207092/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2082383">Patrick Pascal Schauß</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2082383">Pixabay</a>

Maybe you're that mythical dev that gets it right the first time, every time. Maybe you're that CPO. I'd love chat over coffee, alcohol, water, whatever. Please tell me all your secrets. For me, I'll ship it, red, green, refactor.
