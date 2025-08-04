---
title: Curl's Latest Statement on AI Slop
description: The latest statement made by Daniel Stenberg, founder of curl, on AI slop
date: 2025-08-01
seo:
  title: "Curl's Latest Statement on AI Slop"
  description: "The latest statement made by Daniel Stenberg, founder of curl, on AI slop"
  keywords: ["curl", "web development", "http", "https", "command line tool", "development tools"]
  author: "Alex Lanthier"
  image: "/curl.jpg"
  url: "/curl"
---

In [his latest email](https://lists.haxx.se/pipermail/daniel/2025-August/000119.html), Daniel Stenberg released a statement doubling down on the consideration of ending the bug bounty program for curl if the AI slop doesn’t stop.

## Bug Bounty Program

Curl’s bug bounty program incentivizes programmers to find and solve bugs by paying them to do so. The bug bounty program has been active since 2019, giving over $90,000 in payouts. This is an extremely cost-efficient way to make your software safer.

## AI Slop

“AI slop” in the context of security reports for curl refers to people using AI to create a legitimate-looking pull request that doesn’t actually solve any problems. Daniel has compiled [a list](https://gist.github.com/bagder/07f7581f6e3d78ef37dfbfc81fd1d1cd) that is now at 23 separate pull requests that have wasted the curl team’s time.

As entertaining as these comment sections are, I can’t help but feel a deep sense of frustration for the curl team. In one [report](https://hackerone.com/reports/2887487), a user caught using AI slop had the audacity to say, “…after engaging with [curl’s] creator, I felt disrespected, met with a lack of empathy, and faced unprofessional behavior.” The username? b3fbcf5debe00185bbe06c0, a hash.

So AI is not only creating this “dead internet” comment section on hacker one with a “user” who wouldn’t even do the work to create a unique username, but is now swamping the curl security team with heavier workloads, having them take on the cognitive load of reading through and testing an AI generated string of nonsense.

## A Call to Action

**For You**: Read up on how to use AI responsibly. Read through and test your AI code. If you’re going to submit a security report for a team on hacker one, reproduce the issue first.

**For HackerOne**: Give security teams the tools they need to reduce the instances of AI slop. Similar to many other areas in the industry, unfortunately, the entry-level bar must be raised: it must be harder for accounts with low reputation to submit reports. Create an AI pre-screening layer that spots and rejects AI-generated noise. Give security teams the option to create their own validation steps such as forcing the user to print the log stack, match the specific lines of code, or have an exact reproduction. 

**For Regulators**: Models should Watermark AI generated content and make entities responsible for their AI use by defining specific and clear guidelines of misuse. The unregulated tech problem is being drastically amplified with the mainstream use of LLMs.