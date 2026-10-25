---
title: Faraday's Candle Lectures, read slowly
date: 2026-10-25
description: >-
  A six-part, unhurried narration of Michael Faraday's "The Chemical History of
  a Candle", with painted illustrations, made with a local AI pipeline.
tags:
  - youtube
  - faraday
  - ai-assisted-development
  - side-projects
---

In December 1860, Michael Faraday stood in front of a young audience at the
Royal Institution in London and spent six evenings talking about a candle. Not
a machine, not a new element: a candle. Where the wax goes, why the flame is
bright, what comes out the other end. By the last lecture he had walked the
audience from the flame to hydrogen, oxygen, the atmosphere, and the breath of
a living creature.

I have recorded the whole series as slow, quiet narrations with painted
illustrations. No music, no sudden sounds, roughly half an hour each.

![Faraday's Candle Lectures: a lit candle in a dark room, painted illustration](/faraday-candle-lectures.jpg)

## Watch

<iframe width="560" height="315" style="max-width:100%;height:auto;aspect-ratio:16/9" src="https://www.youtube.com/watch?v=q5U7-EJLSMM&list=PLQF4slN9oRNQ" title="The Chemical History of a Candle" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe>

**[The full playlist on YouTube](https://www.youtube.com/playlist?list=PLQF4slN9oRNQ)**

| Lecture | About | Length |
|---|---|---|
| I | The candle itself: the flame, the melted wax, how a candle burns | ~32 min |
| II | The brightness of the flame, the air a candle needs, the production of water | ~27 min |
| III | The water a candle makes, what water is, and hydrogen | ~32 min |
| IV | Hydrogen in the candle burning into water, and oxygen as the other half | ~30 min |
| V | The oxygen in the air, the atmosphere, and what a burning candle does to it | ~34 min |
| VI | Carbon, charcoal, coal-gas, and the likeness between a candle and breathing | ~36 min |
| Platinum | A bonus lecture, delivered at the Royal Institution on 22 February 1861 | ~38 min |

## Why it is a good thing to fall asleep to

The text is plain, patient and curious. Faraday explains one idea, shows it,
and only then moves to the next. It is a rare case where "explained slowly" is
the point of the original, not a simplification of it.

## How it was made

The text is Project Gutenberg #14474. Faraday died in 1867, so the book is in
the public domain, and it is read as written apart from footnote markers and
figure labels.

Everything else is synthetic, and the videos are marked that way on YouTube:

- **Script:** the book text, split into scenes, each with a pause length and an
  illustration prompt. A human (me) reviewed it before publishing.
- **Voice:** Kokoro text-to-speech, running locally.
- **Illustrations:** AI-generated paintings (Google Gemini image model), one
  every 30 to 45 seconds, in a dark, warm style.
- **Assembly:** FFmpeg for the slow zooms, crossfades, subtitles and final
  video, driven by one Python project.


