# DEPLOY landing page — feedback log

Source: Daily Stand-up Dev Call, 26 Aug 2026.
Participants: Sanket Shinde, Aaryan, Avi, Prathmesh, Bikash, Sanjeev, Satvik Paramkusham, Rishu, Anshuman S.

Scope of this log: **content and structure only**. Theme, palette and typography stay as-is
(dark base `#050505`, sage accent `#a8d5b5`, Inter / Cormorant Garamond / IBM Plex Mono).
Colour-related notes from the call are recorded at the bottom as deliberately skipped.

---

## 1. Hero — message clarity
- "Transform AI ideas into reality / Join…" reads childish and generic. Cut.
- Approved direction: **"Build the system. Ship it fast."** — also floated:
  "Build the system, deploy the outcome."
- Sub-line must say plainly: *we integrate AI engineers into your team, in one workflow*.
- Core complaint: it takes too long to work out what the company actually does.

**Status:** done — `hero` in `src/lib/content.ts`.

## 2. Hero — first-five-seconds impact
- Needs something interactive in the hero, not static text.
- A visual people remember (image / video / effect) inside the first 2–5 seconds.
- Two panels were mentioned — if there are two, both must be visible, not one hidden.
- Current verdict on the old hero: "not hitting me in the face."

**Status:** kept the existing interactive liquid-lens hero from this repo's theme.

## 3. Social proof, logos, trust
- Far more client logos, and named tiers: Schneider Electric, HPE, Google-level names.
- Testimonials needed (placeholder acceptable for now).
- Audience is explicitly **CTOs, VPs of Engineering and founders**. The page doubles as the
  demo shown at the exec/founder event in the 1st–2nd week of September.

**Status:** logo marquee expanded. Testimonials still open.

## 4. Projects — promote up the page
- Called the single most important section on the site.
- Must appear **before** the process/journey section: the visitor gets inspired by the work
  first, then scrolls into how it is delivered.
- Should read as a showcase with hard metrics, not a list of services.

**Status:** done — `Work` section sits directly under the logo marquee.

## 5. Use cases
- Weakest area on the old page; flagged as "very very important".
- More of them, clearly segmented by function, low reading effort.
- A visitor should recognise their own workflow without hunting for it.

**Status:** done — six functional use cases (Sales, Ops, Finance, People, Eng, Risk).

## 6. Workflow / process section
- Kill the slider — nobody interacts with it.
- Convert to scroll-driven numbered steps: **Scope → Build → Deploy → Hand over**.
- Step one framing: "identify which workflow is worth automating first".
- Landing-page effort should be **scrolling**, not reading.

**Status:** done — `Sprint` renders as stacked scroll-revealed steps, no slider.

## 7. Proof / data section
- Needs a graph or metric block that lands hard — the "95% of AI pilots fail" angle.
- Frame it as: why deployment fails, and what changes here.
- Old data section did not register at all.

**Status:** done — `Problem` section with animated counters + cited sources.

## 8. Copy risks and CTA
- **Timeline:** do not hard-commit to "6 weeks" or "2 weeks". Use **4–6 weeks depending on
  the workflow**.
- **Retainers:** drop any "no open-ended retainers" line — retainers are a business goal.
  Reframe as *zero dependency, you own the code* while leaving the door open.
- **CTA:** "Are you ready to deploy?" should feel like a moment, with animation.
- Primary action is a **30-minute call**. No external lab, no long form.
- The old-way / new-way comparison table was liked — keep it.

**Status:** done across `engagement`, `faq`, `finalCta`.

---

## Deliberately skipped (theme-level, out of scope)
- Dark/black feel vs. a lighter palette with depth in the components.
- The blue / white / red colour debate.
- Any change to fonts or the existing motion system.

---

## Round 2 — 26 Aug, same day

- **Ripple minimised.** Rings now spawn ~7x further apart along the cursor path at
  roughly half strength, decay in 1.8s instead of 2.6s, and the lens radius dropped from
  0.13 to 0.095. Displacement, chromatic split, rim light and glint were all cut. The effect
  is still there, just no longer the loudest thing on the page. Tuned in
  `src/shaders/lens.frag` and `src/components/LiquidLens.tsx`.
- **Hero content cut.** Eyebrow shortened, sub-line reduced from three lines to one
  ("AI engineers embedded in your team. One workflow, taken to production."), and the three
  stat labels cut to two or three words each.
- **Images replaced.** The rocket-launch photo (left over from the course page) and the
  other two backdrops are gone. Now: dark server racks with green/amber cabling (hero),
  a circuit-board macro (problem section), an engineer working at the racks (final CTA).
  All three sit in the dark/sage palette rather than fighting it.
- **Company logos added.** Each name in the marquee now carries its mark, stored locally
  in `public/logos` — greyscale at rest, full colour on hover.
- **Project index added.** A new scannable section under the featured cards: twelve rows in
  two groups — six client deployments with their outcomes, six reusable components. It also
  makes the "round two is cheaper than round one" argument visible.
- Removed leftover `console.log` debug statements that were firing on every hero mount and
  every 120 frames.

## Round 3 — hero rebuild and card graphics

- **Backgrounds swapped for near-black ones.** The previous photos were mid-tone and the copy
  fought them. Measured mean luminance dropped from 74/255 to 14/255 (problem section) and
  64/255 to 10/255 (final CTA). Image opacity also came down (0.45 to 0.18, and 1.0 to 0.40)
  with a second radial scrim behind the text block in each. The photos now read as texture.
- **Hero has no background photo at all.** It is a two-column layout: copy on the left, a
  live 3D scene on the right, over a gradient and a masked grid. Nothing sits behind the
  words, so legibility is no longer a judgement call.
- **Hero text cut again and down to one button.** Sub-line is now six words on one line, the
  secondary CTA is gone, and the three stats moved below a hairline rule.
- **New 3D hero scene** (`src/components/HeroScene.tsx`): 34 nodes on a deterministic
  Fibonacci sphere, 89 edges between near neighbours, and 16 signal pulses running along
  those edges. It turns slowly and tilts towards the cursor. Reduced-motion and no-WebGL
  visitors get the same graph as a static SVG.
- **Cards carry graphics now.** A single line-art set (`src/components/Glyph.tsx`), all drawn
  on one 48x48 grid at one stroke weight, so the twelve marks read as diagrams of the same
  machine. Work cards use an oversized watermark that brightens on hover; use-case cards use
  a framed tile. Card copy was cut roughly in half to let the graphic do the work.
- **The rack photo moved to the pod section** as a framed image with a caption, where no text
  sits on top of it.
- The liquid-lens ripple is no longer mounted — the 3D scene replaced it. The component is
  still in the repo if it is wanted back somewhere else.

## Round 4 — hero, graph, index, real names

- **Hero pill and stat row removed** (both crossed out in review). What is left is the
  headline, one line of copy and one button.
- **Hero button reworded to "Bring us one workflow".** The nav CTA still says "Book a
  30-min call"; both were visible at once and read as the same button. Same destination,
  different words.
- **Hero backdrop rebuilt.** Was one flat radial gradient. Now four layered lights (sage
  bloom behind the orb, a cool counter-light on the copy side, a horizon lift, a fade into
  the next section) plus two grids at different scales, each with its own radial mask.
  All CSS, so it stays crisp at any resolution.
- **3D replaced.** The scattered node cloud is gone. It is now a subdivided icosahedron:
  every edge the same length, vertices marked on the coarser hull, a fresnel shell that only
  lights where the surface turns away from the camera, and two orbit rings on fixed axes.
  Nothing is randomised, which is what made the old one look noisy. You can grab and spin it;
  it carries inertia and eases back to a slow drift.
- **Sprint section rebuilt as the scroll-scrubbed graph from forge-deploy-v1.html.** Sticky
  rail on the left: a curve that draws itself as you scroll, a dot riding the path, fourteen
  progress bars and a percentage readout. Steps on the right light up as you reach them.
  Theme is ours — sage on near-black, glass panel, mono labels.
- **Project index no longer a long table.** Two tabs, a compact list, and one detail panel
  that follows hover or click. Section height is now ~1120px instead of running for three
  screens. Fixed a stall while building it: `AnimatePresence mode="wait"` made the panel
  wait for an exit animation on every hover, so it lagged behind the cursor — the panel now
  remounts and fades in with no exit.
- **"The work" carries real project names** taken from the actual case studies: Enterprise
  SQL RAG (~95% query accuracy, up from 90%), Real-Time AI Interviewer (150+ engineer-days),
  Agentic Learning System (9 learner stages, 30+ capabilities), Document Intelligence
  Pipeline, Conversational BI, SUTRA LLM Launch. Each card also lists its stack.

## Round 5 — bento work grid, smoother rail

- **"The work" rebuilt as a bento grid**, following the reference layout: copy sits top-left,
  the drawing takes the rest of the card and bleeds off the bottom-right. Cards run 4+2, 2+4
  and 3+3 across a six-column grid, so the row rhythm changes as you scroll.
- **Copy per card cut to the bone**: sector, metric, title, one sentence, and two or three
  short check bullets. Nothing longer than a line.
- **Six bespoke illustrations** (`src/components/ProjectVisual.tsx`), one per project, all on
  a shared 320x200 grid at one stroke weight. Each one shows the actual mechanism — a
  question resolving into a table with an accuracy arc for SQL RAG, a waveform over a code
  sandbox and a score chart for the interviewer, documents clearing a verification gate,
  nine stages climbing for the learning system, chat into agents into a bar chart for BI,
  and a model broadcasting into a developer grid for SUTRA.
- **`Glyph.tsx` trimmed** to the six use-case marks it still serves; the six project glyphs
  it used to hold are superseded by the illustrations.
- **"How a build runs" copy cut back.** Each step is now a title, one sentence and exactly
  three short bullets. Dropped the stamps, the "what we need from you" lines and the
  four-item mark lists — that was filler.
- **Rail made smooth.** The old version called `getPointAtLength` and `getBoundingClientRect`
  on every scroll frame and moved the dot with `left`/`top`. Now:
  - the curve is sampled once into a `Float32Array` at mount and interpolated (verified
    pixel-exact against `getPointAtLength` at 0/25/50/75/100%)
  - the dot moves by `translate3d`, so it stays on the compositor
  - the SVG box is measured once and re-measured only on resize, via `ResizeObserver`
  - progress bars, step states and the percentage readout only touch the DOM when their
    value actually changes, not every frame
  - `scrub: 1` for damping, `invalidateOnRefresh` so it stays correct after layout shifts

## Round 6 — the orbiting ring

Reference: the Gallery Heading study (`forge`-adjacent ThreeUI component), Canvas 2D.

- **New hero visual** (`src/components/HeroRing.tsx`). Twelve 4:3 plates orbiting a tilted
  plane, with **DEPLOY** set between the far half and the near half — so plates pass in front
  of the word as they come round. What was taken from the reference is the geometry: the ring
  plane basis, the perspective projection, the per-tile affine transform, and the depth
  sandwich. Everything the eye reads is ours.
- **Our palette, not the reference's.** Twelve flat plates in near-blacks, deep greens, sage
  and bone, each shaded by a value-noise field and finished with the same film grain the rest
  of the page carries. The far half of the ring is desaturated and sunk toward the page
  ground.
- **Layout:** copy stays on the left (headline, one line, one button); the ring sits on the
  right in a square box. Briefly tried a centred version with the two-line headline inside
  the ring — it squeezed the CTA (the overlay overlapped the lower plates by 19px at a 720px
  viewport), so the split layout won.
- **Motion:** a slow idle that eases up to full speed while the pointer is over it. The
  reference holds dead still until hover; in a hero that reads as broken, so it drifts.
- **Bundle dropped from 441 kB to 203 kB first load** — the WebGL hero went with the change,
  so three.js and react-three-fiber are no longer pulled into the page.

### Two things worth knowing

- `npm run build` and `npm run dev` share `.next`. Running a build while the dev server is up
  clobbers the dev chunks — the symptom is Tailwind silently not applying, then
  `__webpack_modules__[moduleId] is not a function`. Stop dev, `rm -rf .next`, then build.
- A percentage height (`h-full`) does not resolve against a flex item, which is why the first
  version of the ring host measured zero. The square box now gets its height from
  `aspect-square`.

## Round 7 — ring size, card graphics

- **Hero ring made much bigger.** It was fitted to a square design frame it never filled, so
  it sat at roughly 45% of its box. It now measures its own reach — how far the tilted
  ellipse plus a plate actually extends on each axis — and scales to fill whatever box it is
  given. Measured after the change: **82% of the width and 87% of the height**. The plane
  tilt was also opened up (ratio 0.492 to 0.58) so the ellipse is rounder and uses the
  vertical space, the plates are larger, and DEPLOY went from 45% to 52% of the box width.
  The right column now takes 1.12fr of the hero grid at a 7:5 box.
- **Card graphics rebuilt.** The old ones bled off the card and were cropped, and the copy
  sat over them. Every diagram is now drawn inside one 320x136 box with a margin and stays
  inside it — measured 33px of clearance on every card, nothing cut. Element counts roughly
  halved (the SQL RAG drawing went from 14 marks to 8), because at card size a busy drawing
  reads as texture rather than as a diagram.
- **The two compartments merged.** The cards had a gradient band between the copy and the
  drawing, which made each card look like two stacked cards. The band is gone: copy and
  drawing now share one padded column, and the drawing centres in whatever space the copy
  leaves rather than stranding at the floor.
- **The floating metric caption moved.** "QUERY ACCURACY, FROM 90%" used to sit at the card
  foot on top of the drawing; it now sits directly under its metric in the card header.

## Round 8 — hero polish, card diet

- **"Build the system." holds on one line.** It had started wrapping when the left column
  narrowed. Headline clamp came down (5.6rem to 4.15rem at the top end), the columns went
  back to roughly even, and line one is now `whitespace-nowrap` so it can never break
  mid-phrase again.
- **DEPLOY is bold and much bigger.** Weight 500 to 700, tracking loosened off, and the word
  now spans **65% of the ring box** (was 52%) — wider than the ring's inner opening, so the
  near plates cross over the ends of the word as they come round, instead of politely
  clearing it.
- **The plates carry motifs now.** Each of the twelve is a piece of what a deployed system is
  made of, drawn at one stroke weight in ink that contrasts with its own plate colour: an
  agent graph, a prompt, code, the measured result, a terminal, a verified document, a voice
  waveform, a fleet of runs, structured output, a shipped arrow, an evaluation gauge, and
  layers in production.
- **Hero CTA now matches the navbar** — both read "Book a 30-min call".
- **Work cards cut down hard.** Card heights went from **636px to 224px**; the section as a
  whole from roughly 2,000px to **1,304px**. The drawings shrank from 674x286 to **150x64**
  and now sit beside the bullets on the card's floor rather than under them.
- **The metrics came off the cards** ("~95%", "query accuracy, from 90%" and the rest). They
  were making each card read as a dashboard tile; the numbers still live in the project index
  below, which is where someone goes looking for them.

## Round 9 — hero type up, cards evened out

- **Hero copy scaled up.** Headline 55px to **69px** and the sub-line 18px to **22px**, with
  the left column widened so "Build the system." still holds on one line at 532px inside a
  605px column.
- **Card drawings back up to a readable size.** They had gone to 113x48 in the previous pass,
  which was too small to read. Now **217x92** on every card, at a heavier stroke, sitting
  beside the copy rather than under it.
- **The bento spans are gone, and this is why.** Mixed 4/2/3 spans meant a narrow card
  stacked its drawing (tall) while the wide card beside it sat side-by-side (short) — and
  the grid stretched the wide one to match. Measured: 741x399 cards with **139px of dead
  space** underneath. Six cards of one size fixed it: every card is now 552px wide, rows are
  263px and 238px, and the slack below the copy is **1–14px**.
- **Four drawings redrawn.** The SQL RAG and interviewer ones were working; the other four
  were not.
  - *Documents* — the folded-corner pages were too fine to read; now two plain stacked
    sheets, a dashed gate, and one verified record.
  - *Learning* — the thin rising line and the floating pill are replaced by six ascending
    bars, the reached ones filled, with the teacher's boundary marked where the learner is.
  - *Conversational BI* — the blobby bubbles are now plain rounded boxes, and the result
    bars are filled rather than stroked.
  - *SUTRA* — the hand-rolled arcs were coming out as a lopsided spiral; they are proper
    circular arcs now, with a bigger dot grid.

## Still open
- Real testimonials and named references.
- More logos once permission is confirmed per client.
- Proper brand assets: the IIT Bombay mark is only available at 16x16 from their site, so it
  is soft at display size. Same for Accel and Schneider Electric at 32x32.
- A short hero video, if one gets produced before the September event.
