---
title: Building this site with Claude Code
date: 2026-08-29
description: >-
  Why this site exists, the stack it runs on, and what it was like to scaffold
  it phase by phase with an AI pair.
tags:
  - meta
  - astro
  - ai-assisted-development
---

For years my corner of the internet was a GitHub profile README. This is the
first real version: a place for a CV, some writing, travel photos, and recipes.

## The stack

- **[Astro](https://astro.build)** — content-first, ships almost no JavaScript,
  and lets each section (CV page, article list, photo grid, recipe card) have
  its own layout without fighting a theme.
- **Cloudflare Pages** — push to `main`, it builds and deploys; pull requests
  get preview URLs for free.
- **Markdown in the repo** — no CMS. Posts and the CV are plain files with typed
  frontmatter, validated at build time.

## Building it in phases

I worked through it with Claude Code as a pair, one roadmap phase at a time:
scaffold and deploy, then the CV, then this blog. Each phase is a small,
shippable increment with its own commits — skeleton first, content after.

The parts that stayed firmly my job: deciding what goes on the CV, wording the
experience bullets, registering a domain (still to come). The parts that moved
fast with help: the Astro project structure, the light/dark theming, content
collections, RSS and sitemap wiring.

More soon — recipes and travel photography are next on the list.
