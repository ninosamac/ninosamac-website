---
title: A guitar songbook, 11 years later
date: 2026-09-01
description: >-
  How I rewrote Vino i gitare, my 2015 chord songbook, as an app
tags:
  - vinoigitare
  - spring-boot
  - side-projects
---

**Wine and guitars. Ex-Yu classics.**

![A black electric guitar on a wooden table beside a glass of red wine and sheet music, in warm lamplight](/vinoigitare-wine-and-guitar.jpg)

- Spring Boot on Java 21
- Songs are plain `.tab` files on disk; a database handles caching and event logs
- Mobile first, because nobody opens a laptop at a campfire

## What I added once it worked

- Works offline as a PWA, so it still loads with no signal
- Chord diagrams
- A personalized songbook PDF, so you can pick songs and print your own
- Sitemap and SEO, so people can find it
- 1600+ songs
- Tuner and metronome
- Analytics and bot filtering

It's live at **[vinoigitare.com](https://vinoigitare.com)**. Pour something,
grab a guitar, pick a song!
