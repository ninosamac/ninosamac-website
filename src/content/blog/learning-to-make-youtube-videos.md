---
title: Learning to make YouTube videos, one slow episode at a time
date: 2026-10-27
description: >-
  Notes from a beginner on the stack behind two YouTube projects, the Faraday
  candle lectures and The Greek Thinkers: which models, and why I chose them.
tags:
  - youtube
  - faraday
  - greek-thinkers
  - ai-assisted-development
  - side-projects
---

I am learning how to make YouTube videos, and it turns out to be one of the more
enjoyable things I have done in a while. The format I have settled on is the
slow, quiet one: a calm narration, painted illustrations, no music, no sudden
sounds. Videos you can listen to in the evening or fall asleep to.

Two projects so far.

## The pilot: Faraday's Candle Lectures

The [Faraday series](/blog/faraday-candle-lectures) was the pilot. Its job was
not to be perfect but to find out whether the whole pipeline works from text to
finished video, and what breaks on the way. A lot did, and most of what I know
now comes from that.

## The real thing: The Greek Thinkers

The second project is **The Greek Thinkers**, ten episodes of about an hour
each, in chronological order: from Thales and the first philosophers around 600
BC, through Pythagoras, Socrates, Plato and Aristotle, to Archimedes, the Roman
Stoics, and the closing of the Athenian schools in AD 529. Each episode mixes
biography, ideas and a little history of what was going on in the Greek world at
the time, and marks clearly which parts are the sources and which are my own
commentary.

## The stack, and why

Everything is driven by one Python project that turns an episode script into a
finished video. The choices were made for practical reasons, and a few of them
changed after the pilot.

- **Script: Claude.** It drafts scripts from my notes and writes the
  illustration prompts. A draft is only a draft: I read and edit every script
  before anything is built. Where a text is in the public domain, it is read as
  written and the model only helps with the pictures.
- **Voice: Kokoro, running locally.** I started with Google's Gemini
  text-to-speech, which sounds good, but the daily request limit stopped a
  full episode halfway through. Kokoro is a small open model that runs on a
  laptop CPU, with no quota, no cost and no network. The price is that it takes
  no style instructions, so the delivery comes from choosing the voice and
  slowing it down, which I did by ear.
- **Illustrations: a local image model.** The pilot used a cloud image model.
  For the Greek series the stills are painted locally in a red-figure vase
  style, in one overnight batch per episode. Painting about forty images per
  episode in the cloud adds up, and a style that looks like Greek pottery is
  easier to keep consistent than "a painting".
- **Captions: Whisper.** It only listens to the audio to work out the timing.
  The words themselves come from the script, so the subtitles are exactly what
  is said.
- **Assembly: FFmpeg.** Slow zooms, crossfades, loudness normalisation, and a
  few drawn diagrams for maps and timelines.

The pattern behind the choices: use a large model where judgement and writing
matter, and run everything repetitive locally, so that making the next episode
costs electricity rather than money.

## What I have learned so far

- Review everything. The scripts are checked by me, the finished videos are
  checked frame by frame on a contact sheet, and the videos are labelled as
  synthetic on YouTube.
- Cache everything. A rebuild after fixing one sentence should not redo the
  whole episode.
- Pick one narrator per channel. The same voice preset sounds like a different
  person on a different model.
- Slow is a feature, not a limitation.

I will post the episodes here as they go out.
