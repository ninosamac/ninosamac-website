---
title: Making The Invisible Fortress, and learning a bunch on the way
date: 2026-11-21
description: >-
  Twelve episodes on how money and logins are kept safe, from clay tablets to
  quantum computers. It is coming soon, and making it has been the best kind of
  homework.
hero: ./making-the-invisible-fortress.webp
heroAlt: "A golden padlock in front of a huge cyan wave breaking over a field of glowing crystals, on a deep navy background"
heroCredit: "Illustration generated with an image model, from the quantum episode"
tags:
  - youtube
  - the-invisible-fortress
  - ai-assisted-development
  - side-projects
---

**The Invisible Fortress is coming soon.**

It is my next YouTube series, twelve episodes about how money and logins are
kept safe, and I have not had this much fun learning something in a long time.
I thought I knew most of the topic when I started. I did not.

## The story in twelve parts

The series follows one idea, that every payment is a promise somebody has to be
able to check, from the oldest records to the newest. It starts with a clay
tablet and a ledger, then goes through the plumbing that moves money between
banks, the mathematics of secrets, and the European rules that opened banks to
outside apps and required stronger logins. After that come the engineering
reality of multi-factor authentication, a ledger that nobody has to trust, how
regulators answered it, the privacy paradox, the quantum threat, the slow
migration away from today's cryptography, and the digital euro.

Together it comes to roughly two and a half hours.

## What I learned, a few examples

- **Reversibility is a design choice.** The 2008 Bitcoin paper opens by
  counting the ability to reverse a payment as a cost of trusting a bank. The
  European payment rules do the opposite and give a customer a refund for an
  unauthorised payment. Same property, two views, and reading both side by side
  made each of them clearer.
- **A signature is not a login until someone says so.** The same mathematics
  signs a payment, proves who you are, and secures a website. What differs is
  who can revoke the key afterwards.
- **"Quantum will break everything" is a more careful story than the
  headlines.** The interesting part is not the day it happens but the long,
  dull migration before it, and the data being collected now to be read later.

## Why it is slow to make, on purpose

I set one rule: every claim in the narration has to come from a source I have
actually read. For each episode there is a table that ties each claim to a
document, marked as read directly, read in part, or my own framing, and the
framing is always flagged as mine. The sources are not blog posts but the
regulations themselves, the original papers, and official guidance, so I
ended up reading a lot of legal text. When I could not get a document, the
claim waited, or it came out.

Reading law as a programmer turns out to be oddly satisfying. It is a very
large, very old codebase with a lot of cross-references.

It also keeps me honest in small ways. When a text says "directly" in one place
and not in another, that difference ends up in the script, because it changes
what the sentence is allowed to say.

## The craft side

- The narrator is a cloned local voice, and acronyms are where it struggles.
  NIST, MiCA, DORA and even "B.C." needed respelling before they sounded right.
  I find the list of fixes oddly charming.
- The illustrations are text-free, painted by a local image model, because
  image models cannot spell. Anything that must be correct, like a diagram of a
  protocol, is drawn by code instead.
- The thumbnails were their own small lesson. The model keeps painting a nice
  scene on a white page, so I ended up filling, fading and shifting the art in
  code, then adding the titles myself.

## What is next

The scripts are written and checked, the episodes are voiced, and the
thumbnails are done. What is left is review and upload. As with the other
videos, the series will be labelled as synthetic on YouTube.

I will post the link here when the first episode goes out. Soon.
