# Code Illustrated Online School
## Student Onboarding Playbook — Lead to First Class

**Version 1.0 · August 2026**
Scope: codeillustrated.com/academy · Ages 8–18 (plus adult tracks) · Nigeria + international/diaspora

---

## 0. How to use this document

Sections 1–2 are diagnosis and architecture — read once. Sections 3–5 are the build spec — work through them in order. Section 6 is copy you can paste today. Section 8 is a 30-day sequenced roadmap; if you only act on one part of this document, act on that.

Current state assumed: enquiries arrive via WhatsApp, bookings and payments handled manually, no CRM. Chosen first touchpoint: **Parent Discovery Call + Student Placement Assessment**. Payments: **manual invoice + bank transfer**.

---

## 1. Audit: what is costing you conversions right now

I reviewed the live `/academy` page. Eight issues, ranked by revenue impact.

| # | Issue | Why it costs you | Severity |
|---|---|---|---|
| 1 | **Every CTA is a `wa.me` link.** "Get Started", "Talk to Advisor", "Enroll Now" all deep-link to WhatsApp. | You capture zero contact data unless the parent actually sends a message. A parent who taps, sees WhatsApp open, and hesitates is gone forever — no email, no retargeting, no follow-up. Realistically 50–70% of taps never become a message. | **Critical** |
| 2 | **Course cards show "Starts from" with no price.** | The single highest-friction unknown for a parent. Missing price reads as "expensive" or "unprofessional". It also forces every price question into a manual WhatsApp conversation you have to staff. | **Critical** |
| 3 | **Meta Pixel is installed but has no conversion event to optimise toward.** WhatsApp clicks are not attributable back. | You are paying for traffic you cannot optimise. A form submission gives the Pixel a `Lead` event to learn from. | **High** |
| 4 | **Offer mismatch.** Footer CTA promises "Book your first free interactive class today." Your actual offer is a consult + assessment. | Bait-and-switch feeling at the moment of highest intent. Fix the copy or fix the offer — not both later. | **High** |
| 5 | **Buyer/user confusion in the hero.** "From zero experience to software engineer" is adult career-changer copy. Half your catalogue is ages 8–12, where the buyer is a parent with entirely different motivations (confidence, screen time with purpose, future-proofing). | One page trying to convert two buyers converts neither well. | **High** |
| 6 | **No safeguarding or instructor-vetting signals.** "Safe Environment" is a claim with nothing behind it. | For a parent handing a child to a stranger on video, this is a top-3 objection and you are not addressing it. World-class kids' academies lead with it. | **High** |
| 7 | **No timezone handling anywhere.** You serve Nigeria, UK, and diaspora. | Every scheduling conversation becomes manual arithmetic and a source of no-shows. | **Medium** |
| 8 | **Testimonials mix parents of 9-year-olds with 31-year-old professionals** in one carousel. | Dilutes proof for both segments. You already have filter tabs — default them by audience. | **Medium** |

**The through-line:** you have a credible product and real proof (300+ students, prospectus, structured curriculum) sitting behind a funnel with no capture layer, no price transparency, and no automation. Everything below fixes that.

---

## 2. Architecture blueprint

### 2.1 The pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 0 — TRAFFIC                                                      │
│  Meta/IG ads · Organic search · Referral · WhatsApp status · Prospectus │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 1 — LANDING (/academy, /academy/courses/[slug])                  │
│  Age-tier selector → Price visible → Trust + safeguarding block         │
│  PRIMARY CTA: "Book a Free Discovery Call"                              │
│  SECONDARY CTA: "Download the 2026 Prospectus" (email gate)             │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 2 — ENQUIRY FORM (2 steps, 6 fields)                            │
│  Step 1: Student age + goal        ── on submit, lead is CAPTURED       │
│  Step 2: Parent name/email/WhatsApp + timezone                          │
│  ⚡ Fires: Pixel `Lead` · CRM record created · Sequence starts          │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 3 — INSTANT BOOKING (redirect, not email)                        │
│  Cal.com embed, timezone auto-detected, 20-min slots                    │
│  ├─ BOOKED ────────► continue to Stage 4                                │
│  └─ NOT BOOKED ────► exit to Nurture Track B (5 msgs over 9 days)       │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 4 — PRE-CALL WARM-UP (T-24h, T-1h)                              │
│  Confirmation + calendar invite + 4-question intake + prospectus        │
│  Student Placement Assessment link sent to parent (10–15 min, async)    │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 5 — DISCOVERY CALL (20 min, video, parent ± student)            │
│  Diagnose → Recommend tier & track → Show a real lesson artefact        │
│  → Quote price live → Send proposal + invoice within 15 min             │
│  ├─ YES ───────────► continue to Stage 6                                │
│  ├─ NOT NOW ───────► exit to Nurture Track C (long-horizon)             │
│  └─ NO-SHOW ───────► Rebook flow (2 attempts), then Track B             │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 6 — ENROLMENT & PAYMENT                                          │
│  Registration form (full data schema) → Invoice (NGN/USD/GBP)           │
│  → Payment confirmed manually → Receipt + Enrolment Confirmed           │
│  ⏱ SLA: invoice issued < 15 min from call end; 72h payment window       │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 7 — WELCOME KIT (D0 → D+3)                                       │
│  W1 Welcome + what happens next  │  W2 Setup instructions + checklist   │
│  W3 Consent & safeguarding forms │  W4 Discord/Portal invites           │
│  W5 Schedule locked + calendar series + instructor intro                │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 8 — TECH CHECK (10 min, ≥24h before Class 1) ── MANDATORY        │
│  Video/audio/screen-share · Accounts live · Editor runs "Hello World"   │
│  Gate: Class 1 does not proceed until this passes                       │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 9 — CLASS 1 ("First Win in 20 Minutes")                          │
│  Instructor pre-flight 10 min prior · Student ships something visible   │
│  and shareable by end of session · Screenshot captured                  │
└───────────────────────────────┬─────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGE 10 — RETENTION LOOP                                              │
│  T+2h Parent Win Report (with artefact) → T+48h 3-question check-in     │
│  → D+14 progress note → D+30 milestone call → renewal/upsell            │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Stage ownership and SLAs

| Stage | Owner | SLA | Exit criteria | Automation |
|---|---|---|---|---|
| 2 Enquiry | System | Instant | Email + WhatsApp captured | Full |
| 3 Booking | System | Instant | Slot held on calendar | Full |
| 4 Pre-call | System | T-24h, T-1h | Intake answered | Full |
| 5 Discovery call | Advisor | Within 48h of enquiry | Decision recorded in CRM | Manual |
| 6 Payment | Admin | Invoice <15 min; confirm <2h of transfer | Funds cleared, receipt sent | Semi |
| 7 Welcome kit | System | D0 within 30 min of confirmation | Consent signed, accounts created | Semi |
| 8 Tech check | Ops/Instructor | ≥24h pre-Class 1 | Checklist 100% green | Manual |
| 9 Class 1 | Instructor | On schedule | Artefact shipped + screenshot | Manual |
| 10 Retention | Advisor | T+2h, T+48h, D+14, D+30 | NPS captured, renewal path set | Semi |

**Design rule:** the parent should never have to ask "what happens next?" Every stage ends by naming the next stage and its timing.

---

## 3. Phase 1 — Lead capture & enquiry management

### 3.1 Landing page architecture

Rebuild `/academy` in this order. Everything above the fold does one job: get the age tier selected.

**1. Hero — segment immediately**

Replace the current single hero with an age-tier fork. This resolves the buyer/user confusion in one move.

> **Headline:** Live 1-on-1 coding classes for ages 8–18
> **Sub:** Personal instructor. Real projects. Your child builds something they can show you in the first lesson.
> **Selector:** `[ Ages 8–12 ] [ Ages 13–17 ] [ 18+ / Adult ]`
> **Primary CTA:** Book a Free Discovery Call → *(button, high contrast, repeats 4× down the page)*
> **Micro-copy under CTA:** 20 minutes. No card required. You'll leave with a recommended learning path whether or not you enrol.
> **Trust strip:** 300+ students · 97% completion · Vetted, background-checked instructors · Parent-approved safety policy

Selecting a tier filters the course grid, swaps the testimonial set, and passes `tier` as a hidden field into the enquiry form. Store it in a query param so ad campaigns can deep-link (`?tier=8-12`).

**2. Price transparency block — fix immediately**

Every course card must show a number. Options in order of preference:

- Best: `From $X / month · 4 live 1-on-1 sessions` (anchors on cadence, not total)
- Acceptable: `From $X per session`
- Never: blank, or "Contact for pricing"

Add a three-column plan comparison below the grid: **1-on-1**, **Small Group (3–5)**, **Intensive/Holiday**. Parents need to self-select a budget tier before they talk to you, otherwise your discovery calls fill with unqualified leads.

**3. The Safety & Trust section — new, non-negotiable**

Place directly under pricing. This is the section that separates world-class kids' academies from generic tutoring sites.

- Instructor vetting: how you screen, interview, and background-check (name the actual process)
- Recording policy: are sessions recorded, who can access them, retention period
- Parent visibility: parents can join or observe any session
- Communication policy: no instructor–student contact outside the monitored platform
- Moderated Discord: named moderators, no DMs between adults and minors
- Data policy: link to your Privacy Policy, mention NDPR/GDPR compliance
- Refund/pause policy stated in plain language

**4. "How it works" — retitle from Enroll to Discover**

Your current step 01 is "Enroll Now", which asks for commitment before value. Reframe:

`01 Free Discovery Call → 02 Placement & Path Plan → 03 Live 1-on-1 Sessions → 04 Build & Showcase → 05 Certification`

**5. Curriculum proof**

Parents buy structure. Add one expandable "What they'll build" module per course — 6–8 week outline with the actual project shipped each fortnight. This is the single strongest differentiator against ad-hoc tutors, and you already have the curriculum.

**6. Segmented testimonials** — default the filter to the selected age tier.

**7. FAQ** — pre-handle the objections you currently answer manually on WhatsApp: price, what if my child has never coded, what device do we need, what if we miss a class, can I get a refund, is it safe, what timezone, do you teach in my time zone, how do I know they're progressing.

**8. Exit-intent / sticky footer** — on mobile, a persistent bottom bar: `Book Free Call` + a small `Chat on WhatsApp` secondary. Keep WhatsApp — just demote it from primary to secondary everywhere.

### 3.2 The enquiry form — exact specification

**Principle: capture before you qualify.** Two steps. Step 1 asks nothing personal, so completion rate is high; the lead is *saved on Step 1 submit* via partial submission, so even Step 2 abandoners are recoverable.

**Step 1 — "Tell us about your learner" (zero friction, no PII)**

| Field | Type | Options | Required |
|---|---|---|---|
| Student age | Segmented buttons | 8–10 · 11–12 · 13–15 · 16–18 · 18+ | Yes |
| Experience level | Segmented buttons | Complete beginner · Some blocks/Scratch · Has written code | Yes |
| Main goal | Segmented buttons | Build websites · Build games · AI & chatbots · Data/Python · School/exams · Not sure yet | Yes |

**Step 2 — "Where should we send the plan?"**

| Field | Type | Notes | Required |
|---|---|---|---|
| Parent/guardian name | Text | Label explicitly "Parent/Guardian" — signals you know who's buying | Yes |
| Email | Email | Primary CRM key | Yes |
| WhatsApp number | Phone w/ country selector | Auto-detect country; this is your highest-response channel | Yes |
| Country / timezone | Dropdown | Auto-detect, allow override. Drives all scheduling | Yes |
| Preferred class times | Multi-select | Weekday after-school · Weekday evening · Sat AM · Sat PM · Sun | No |
| Anything we should know? | Textarea | Optional. Where you learn about learning differences, anxiety, prior bad experiences — gold for the call | No |

**Hidden fields to pass automatically:** `tier`, `source_page`, `utm_source`, `utm_campaign`, `referrer`, `timestamp`.

**Hard rules**

- Six visible fields maximum. Every additional field costs measurable completion.
- No password, no account creation, no "create your student profile" at this stage. That belongs in Stage 6.
- Never ask budget on the form. Ask it on the call, after value is established.
- Mobile-first: large tap targets, numeric keypad for phone, no free-text where buttons will do.
- On submit → **redirect straight to the booking calendar**, do not send them to a "check your email" page. Booking rate roughly halves when you insert an email step.

### 3.3 The offer: Discovery Call + Placement Assessment

You chose consult + assessment over a free trial class. That's the right call at your stage — it costs 20 minutes of advisor time instead of 60 minutes of instructor time, and it converts better for parent-buyers because it sells a *plan*, not a *lesson*. Structure it so it never feels like a sales call.

**Name it externally:** "Free Learning Path Consultation" — not "sales call", not "consultation call".

**The Placement Assessment (async, before the call)**

Send with the booking confirmation. Two tracks:

| Age tier | Format | Duration | Measures |
|---|---|---|---|
| 8–12 | Playful puzzle set — sequencing, loops, pattern recognition, a drag-and-drop mini-build. Zero typing pressure. | 10 min | Logical reasoning, persistence, reading level |
| 13–18 | Short diagnostic — 8 questions scaling from "what does this loop print" to a small logic problem, plus a 2-question self-report on prior tools | 15 min | Actual level, self-awareness, tooling exposure |

Build it in Tally with conditional logic and auto-scoring, or as a lightweight interactive page on your Next.js site. Output a **tier recommendation** (Foundation / Builder / Advanced), not a score. Never show a child a failing grade.

**Why this matters commercially:** arriving at the call already holding an assessment result changes the conversation from "let me sell you a course" to "here's what your child is ready for, and here's the gap." That's consultative, and it converts.

**The 20-minute call structure**

| Min | Segment | Purpose |
|---|---|---|
| 0–2 | Warm open, confirm who's on the call, set the agenda and the time box | Reduce guard |
| 2–7 | **Discovery.** "What made you start looking now?" · "What's your child into outside school?" · "What would a great outcome look like in 6 months?" | Find the emotional driver. Do not pitch yet |
| 7–11 | **Assessment readback.** Walk through their child's result. Name one specific strength. Name the gap | Establishes expertise and creates the need |
| 11–15 | **The path.** Recommend one track and one cadence. Show a real artefact a similar student built at week 4 and week 12 | Concrete beats abstract |
| 15–18 | **Price, stated plainly and once.** Then stop talking. Handle objections | Confidence sells |
| 18–20 | **Close on next step.** "I'll send the plan and invoice in the next 10 minutes. If you'd like to start on the 12th, I can hold that slot for 48 hours." | Scarcity that is actually true |

**Rules:** always invite the student for the last 5 minutes if age 13+ (they're the user; their buy-in reduces churn). Never quote price before the path. Never end a call without a named next date.

### 3.4 Automated nurture sequences

Three tracks. Channel logic: **email carries detail and documents; WhatsApp carries time-sensitive nudges.** Never send the same message on both.

**Track A — Booked (the good path)**

| When | Channel | Message |
|---|---|---|
| Instant | Email | Booking confirmed + calendar invite + video link + placement assessment link + prospectus |
| Instant | WhatsApp | Short confirm: date, time in *their* timezone, link. Nothing else |
| T-24h | Email | Reminder + "here's what we'll cover" + nudge to finish the assessment |
| T-3h | WhatsApp | Reminder with one-tap join link |
| T-15m | WhatsApp | "Starting in 15 — see you shortly" |
| T+2h (post-call) | Email | **Personal Learning Path** PDF + invoice + a real student artefact |

The T-3h and T-15m WhatsApp nudges are the single highest-ROI automation in this document. They typically cut no-shows dramatically for consumer bookings.

**Track B — Enquired but did not book**

| When | Channel | Angle |
|---|---|---|
| +20 min | WhatsApp | "Saw you started booking a call for [child's age group] — here's the link again, takes 30 seconds" + direct link |
| +1 day | Email | Value, not ask: "The 3 things that decide whether a child sticks with coding" |
| +3 days | Email | Social proof: parent story matching their selected age tier + prospectus |
| +5 days | WhatsApp | Objection handler: "Most parents ask me three things — price, safety, and whether their child is too young. Quick answers: [link to FAQ]" |
| +9 days | Email | Soft last touch: "Should I close your file? Reply STOP and I won't follow up again." |
| +30 days | Email | Re-engage on a new hook: holiday intensive, new cohort, new course launch |

**Track C — Called but didn't enrol**

| When | Channel | Angle |
|---|---|---|
| +2 days | Email | Personal, from the advisor: "Here's the plan we discussed, no pressure — one question: is it timing or budget?" |
| +7 days | Email | Address the actual objection they gave (tag it in CRM: price / timing / spouse / child unsure / competitor) |
| +21 days | WhatsApp | "Cohort starting [date], I saved you a slot" |
| +60 days | Email | Newsletter drip — long-term nurture, they convert on their own timeline |

**Track D — No-show**

Trigger 10 minutes after start time: WhatsApp "Missed you — everything OK? Here's my calendar to rebook" + one-tap rebook link. Then email at +1 day. Two attempts, then drop to Track B. No-shows convert well when you make rebooking one tap and remove all guilt from the copy.

### 3.5 Booking mechanics

- **Cal.com** (free tier includes unlimited event types and workflows — better fit than Calendly's one-event-type free plan).
- Auto-detect the visitor's timezone; display both their time and yours.
- **20-minute slots**, minimum 2 hours' notice, maximum 14 days out.
- Buffer 10 minutes after each call so you can send the proposal while it's warm.
- Two event types: *Parent Discovery Call (ages 8–12)* and *Discovery Call (13+, student welcome to join)*.
- Booking questions kept to zero — you already have the data from the form.
- Auto-generate the video link (Cal Video or Google Meet). Include a dial-in fallback for parents on poor connections.
- Publish availability in blocks that match your markets: a WAT-morning block for Nigeria and a GMT/EST-evening block for diaspora parents.

---

## 4. Phase 2 — Registration, payment & technical onboarding

### 4.1 Enrolment data schema

Collect this **after** the yes, never before. Split across the registration form (parent fills once) and the tech check (ops verifies).

**Parent / account holder**
- Full name, email, WhatsApp, secondary phone
- Country, city, timezone
- Billing name and address (for invoice)
- Preferred contact channel and preferred contact hours
- How they heard about you (self-reported attribution — keep it, it's more honest than UTMs at this scale)

**Student**
- Full name + preferred name/nickname *(use the nickname in every class — small thing, big rapport effect)*
- Date of birth (not "age" — you need it for tier progression and birthday touches)
- School year / grade
- Experience level + placement assessment result
- Learning goals, in the student's own words if 13+
- Interests outside coding (instructors use these to theme projects — a football fan gets a football-themed game)
- Any learning differences, accessibility needs, or medical notes relevant to a 60-minute video session
- Languages spoken at home

**Programme**
- Track and tier selected
- Format: 1-on-1 / small group
- Sessions per week, session length, start date
- Recurring weekly slot (day + time, stored in UTC, displayed local)
- Assigned instructor
- Contract length and end date

**Technical**
- Device type and OS + version *(critical: Chromebooks and iPads cannot run local dev environments — this determines whether the student goes browser-based or local, and getting it wrong wrecks Class 1)*
- Available RAM if laptop/desktop
- Webcam + microphone present, headphones available
- Internet: connection type, rough speed, backup option (mobile hotspot?)
- Admin rights to install software — yes/no *(school-issued devices are usually locked down)*
- Second screen available
- Who will be nearby during class for a young learner

**Consent & compliance**
- Parental consent for a minor to attend online sessions
- Photo/work-showcase consent — separate, granular, opt-in *(you'll want to post student projects; get this properly)*
- Session recording consent + acknowledgement of retention policy
- Discord/community participation consent, with rules acknowledged
- Terms of service and refund policy acceptance, timestamped
- Emergency contact name and number

**Rule:** the registration form should take under 5 minutes. Anything not needed before Class 1 goes into an optional "complete your profile later" section.

### 4.2 Payment & checkout — making manual invoicing feel premium

You've chosen manual invoice + bank transfer. That's viable and margin-friendly, but manual payment is where enrolments die from silence. Engineer around the three failure modes: **unclear amount, unclear method, unconfirmed receipt.**

**Do this**

1. **Send the invoice within 15 minutes of the call ending.** Momentum is the entire game. Have a pre-built template where you change three fields.
2. **One PDF, three payment rails, clearly labelled:**
   - Nigeria: NGN bank transfer — account name, number, bank, exact NGN amount at today's rate
   - UK/EU: GBP/EUR transfer (Wise Business gives you local account details — parents see a domestic transfer, not an intimidating international one)
   - US/other: USD via Wise
3. **Lock the exchange rate for 72 hours in writing.** Removes "let me wait and see" hesitation.
4. **Name the reference format**: `CIOS-[SURNAME]-[MONTH]`. Untraceable transfers cost you hours.
5. **Offer a deposit option.** "Reserve your slot with 30% today, balance before Class 1" converts fence-sitters who can't move the full amount immediately.
6. **Confirm within 2 hours of receiving funds**, in business hours. A parent who has transferred money and heard nothing for a day is a parent writing a refund message.
7. **Send a real receipt** — numbered, branded, PDF. Not a WhatsApp "received, thanks."
8. **Automate the chase:** unpaid at +24h → gentle WhatsApp ("any trouble with the transfer? I can send alternative details"). +48h → email. +72h → "I'm releasing the slot on [date], let me know if you'd like me to hold it."

**Recurring payments without a payment processor:** for monthly plans, issue the next invoice 7 days before the cycle date with an automated reminder. Track it in the CRM with a `next_invoice_date` field so it never depends on memory.

**Upgrade path (month 2–3).** Manual will cap out around 25–30 active students. When you cross ~15 enrolments/month, add:

- **Paystack** for Nigerian parents — cards, transfers, USSD, and *recurring* NGN subscriptions. This is the single biggest conversion lift available to you domestically.
- **Stripe Payment Links** for international — one-click, saves cards, handles subscriptions, sends receipts automatically.

Both let you keep the human close and just remove the payment friction. Neither requires rebuilding your site — payment links drop into an email.

### 4.3 Welcome Kit sequence

Fires the moment payment is confirmed. Purpose: convert transactional relief into emotional confidence, and complete every technical prerequisite before Class 1. Spread it out — do not dump everything in one email.

| # | Timing | Channel | Content | Action required |
|---|---|---|---|---|
| **W1** | Immediately | Email + WhatsApp | **"Welcome to Code Illustrated, [Student]!"** Receipt attached. Instructor name + photo + one-line bio. Confirmed schedule with dates. A clear 4-step "what happens next" timeline. One line addressed to the student by nickname | None — celebrate only |
| **W2** | +2 hours | Email | **Setup Instructions** — track-specific, illustrated, numbered. Accounts to create, software to install, links. Estimated time stated honestly | Complete before tech check |
| **W3** | +4 hours | Email | **Consent & Safeguarding Pack** — e-sign consent form, code of conduct, safety policy, parent handbook, refund policy | E-signature required |
| **W4** | +1 day | Email | **Join the Community** — Discord invite (age-gated channel), Student Portal login, how to submit work, where to ask for help between classes | Accept invites |
| **W5** | +1 day | Email + WhatsApp | **Book your Tech Check** — 10-minute call, calendar link, why it exists ("so Class 1 is 100% learning and 0% troubleshooting") | Book slot |
| **W6** | +2 days | WhatsApp | Nudge on anything outstanding — personalised, referencing the specific missing item | Complete gaps |
| **W7** | T-24h before Class 1 | Email + WhatsApp | **"Tomorrow's the day"** — join link, what they'll build, one-line prep for the student, "reply here if anything goes wrong" | Show up |

**Add a physical-feeling artefact.** A branded PDF "Student Welcome Certificate" with the student's name and their track, sized for printing or a phone lock screen. Costs nothing, gets shared to family WhatsApp groups, and makes an 8-year-old feel enrolled in something real. This is exactly the sort of small delight that distinguishes premium academies.

### 4.4 Pre-class technical readiness

**Track-specific setup** (send only the relevant one — never a generic list):

| Track | Environment | Accounts needed | Notes |
|---|---|---|---|
| Junior Web Creator (8–12) | Browser-based editor (CodePen / Replit / your portal) | Student account created *by you* and handed over — do not ask a 9-year-old to sign up | No installs. Works on Chromebook/iPad. Bookmark the editor on their device |
| Game Dev Pro (13–17) | Replit or local VS Code + Python | Replit, GitHub (13+ per platform terms) | If device is locked down, default to browser-based |
| Frontend Developer / Architect | VS Code + Node.js LTS + Git | GitHub, Vercel | Requires admin rights — verify at registration |
| Data Science Intro | Google Colab (browser) | Google account | Zero install, works anywhere |
| Generative AI Mastery | Browser | Platform accounts per curriculum — **parent creates and supervises for under-13s** | Check age minimums on each AI tool; document your policy |

**Universal pre-class checklist**

- [ ] Video platform installed and tested (Zoom desktop client, not browser — screen share and annotation are more reliable)
- [ ] Webcam, mic, speakers/headphones working
- [ ] Screen sharing permission granted (macOS in particular requires explicit system permission — this is the #1 cause of a wasted first 10 minutes)
- [ ] Student can join independently, or a parent knows exactly how to launch them
- [ ] Coding environment opens and runs a "Hello World" successfully
- [ ] Portal login works
- [ ] Discord joined, correct role assigned
- [ ] Distraction plan agreed: notifications off, quiet space, other tabs closed
- [ ] Backup connection identified (mobile hotspot)
- [ ] Instructor's WhatsApp/support number saved by the parent
- [ ] Consent forms signed and filed
- [ ] Recording preference recorded

**The Tech Check call (10 minutes, mandatory, ≥24h before Class 1).** Run by ops or the instructor. This is the highest-leverage 10 minutes in your entire operation — it converts "first class went badly, we're not sure about this" into "first class was magic." Never skip it, never let a family opt out, and never schedule it same-day as Class 1 (you need buffer to fix what you find).

Ending the tech check: the student runs one line of code and sees output. They leave the call having already succeeded once.

### 4.5 Class 1 — "First Win in 20 Minutes"

**Instructor pre-flight (T-10 minutes, every single time)**

- [ ] Read the student's profile: nickname, interests, goals, assessment result, notes
- [ ] Lesson plan and starter code open in tabs, pre-loaded
- [ ] Backup lesson ready in case their setup fails
- [ ] Own audio/video/screen share tested
- [ ] Room lit, background clean, notifications silenced
- [ ] Join the room 5 minutes early — the student should never arrive first

**Session structure (60 min)**

| Min | Segment |
|---|---|
| 0–5 | Welcome by nickname. Reference something from their profile ("your mum mentioned you're into Minecraft"). Zero tech talk |
| 5–10 | Set the mission: "By the end of today you'll have built X and you can show it to your family tonight" |
| 10–20 | Guided build — instructor drives, student follows. Fast wins only |
| 20–45 | Student drives. Instructor coaches. **Student must type and run code themselves** |
| 45–55 | Personalise it — change the colours, the name, the character. Ownership creates attachment |
| 55–60 | Show it working. **Screenshot/record it.** Set the hook for next session. Assign one tiny optional challenge |

**Rules**

- Something visible and shareable must exist by minute 60. Not "we covered variables" — a *thing*.
- Never spend Class 1 on setup. That's what the tech check was for.
- Capture the artefact. It's the raw material for the parent report, your testimonials, and your ads.
- If tech fails despite the check, switch to the backup browser-based lesson within 3 minutes. Never let a parent watch 15 minutes of troubleshooting.

### 4.6 Post-first-class feedback & retention

**T+2 hours — Parent Win Report.** Send *before* the parent asks. Short, warm, includes the screenshot or link to what their child built, one specific thing the student did well, and what's next. This is a retention instrument disguised as an update, and it is the moment a parent decides they made a good decision.

**T+48 hours — the check-in.** Three questions maximum. Ask at 48 hours, not immediately: the parent has now heard their child talk about it at dinner, which is when the real opinion forms.

1. How did [Student] feel after the first class? *(Excited / Positive / Neutral / Unsure)*
2. How likely are you to recommend us so far? *(0–10)*
3. Is there anything you'd like us to do differently? *(open text)*

Routing: score 9–10 → ask for a review and a referral (with a referral incentive) two weeks later. Score 7–8 → advisor sends a personal note. Score ≤6 → **advisor calls within 24 hours, no exceptions.** Most churn is recoverable if you catch it in week one.

**Ongoing retention rhythm**

| When | What |
|---|---|
| Every session | 2-line instructor note to parent — what we did, what's next |
| Every 2 weeks | Progress snapshot with an artefact |
| Day 30 | Milestone call — review the path, celebrate, discuss continuation |
| Day 45 | Showcase: student presents a project to family, or posts in Discord #showcase |
| Day 60 | Renewal conversation, initiated *before* the plan lapses |
| Quarterly | Certificate + next-track recommendation |
| Always | Referral ask at moments of peak delight, not at renewal time |

**The 30-day survival rule:** a student who completes 4 sessions and has shipped 2 projects rarely churns. Optimise everything toward getting every enrolment to session 4.

---

## 5. Tooling stack

### 5.1 Recommended lean stack (build this now)

| Function | Tool | Cost | Why |
|---|---|---|---|
| Forms & assessment | **Tally** | Free (Pro $29/mo to remove branding + custom domain) | Unlimited forms and submissions on free tier, conditional logic, partial submissions, webhooks, embeds cleanly into Next.js. Best free form builder available |
| Booking | **Cal.com** | Free (Pro ~$15/user/mo) | Free tier gives unlimited event types, multiple calendars, and workflows — Calendly's free plan caps at one event type. Timezone handling is excellent |
| CRM / pipeline | **Airtable** or **Notion** | Free–$20/mo | At your volume a well-designed base beats a real CRM. One table per entity: Leads, Students, Sessions, Invoices. Views for each pipeline stage. Move to HubSpot Free at ~100 active leads |
| Automation glue | **Make.com** | Free–$10/mo | More generous free operations than Zapier and better for multi-step branching. This connects Tally → Airtable → Cal.com → email → WhatsApp |
| Email sequences | **Brevo** or **MailerLite** | Free tier covers your volume | Both handle transactional + marketing + automation on one account. Brevo also sells SMS/WhatsApp credits on the same platform, so you can consolidate channels later |
| WhatsApp | **WhatsApp Business App** now → **Business Platform (API)** later | Free → ~$0.008–0.03 per utility message | Start with the free app + saved quick replies. Move to the API via a provider (Wati, Twilio, 360dialog) at ~30 leads/week. Note: replies within a 24-hour service window are free; template messages are billed by category, with utility templates far cheaper than marketing |
| E-signature (consent) | **Documenso** or **Zoho Sign** free tier | Free–$10/mo | Consent forms need real signatures with timestamps, not a checkbox |
| Video classes | **Zoom** | $15/host/mo | Breakout rooms, annotation, reliable screen share, recording, works on weak connections. Meet is acceptable but weaker for teaching |
| Community | **Discord** | Free | You already use it. Critical: age-gated channels, disabled DMs between adults and minors, named moderators, logged |
| Coding environment | **Replit Teams for Education** / CodePen / Colab | Free–modest | Browser-based removes the entire class of install problems for under-13s |
| Invoicing | **Wave** or **Zoho Invoice** | Free | Numbered, branded PDF invoices and receipts with payment tracking. Stop sending WhatsApp amounts |
| International receiving | **Wise Business** | Free account, per-transfer fee | Local GBP/USD/EUR account details so diaspora parents make a domestic transfer |
| Student portal / LMS | **Your Next.js site** (phase 2) | Build cost | You already own the front end. Start with a simple authenticated dashboard: schedule, materials, submitted projects, progress |
| Analytics | **PostHog** free + Meta Pixel + GA4 | Free | Funnel analysis per stage, session replay on the enquiry form to see exactly where parents abandon |

**Monthly cost of this stack at your current stage: roughly $30–70.**

### 5.2 Alternative: all-in-one

If assembling the above feels like too much operational overhead, tutoring-specific platforms (**Teachworks**, **TutorBird**, **TutorCruncher**) bundle scheduling, student records, invoicing, and parent portals in one system. Pricing is generally tiered by active student count — check current rates directly, as they change. Trade-off: less flexible, weaker marketing automation, and you'd be paying for scheduling features you can get free from Cal.com. My recommendation is to stay modular until ~50 active students, then reassess.

### 5.3 The core automation to build first

```
Tally form submitted
  → Make.com webhook
      ├─ Create/update record in Airtable (status: New Lead)
      ├─ Fire Meta Pixel `Lead` conversion event
      ├─ Add to Brevo list, tagged by age tier + goal
      ├─ Send WhatsApp confirmation
      ├─ Redirect user to Cal.com booking page (tier-specific)
      └─ Start 15-min timer:
            IF no booking recorded → enter Nurture Track B
            IF booking recorded    → enter Nurture Track A
```

Build this one automation and you have solved roughly 60% of your leakage.

---

## 6. Copy templates

### 6.1 Trial / Discovery Call booking confirmation

**Subject:** You're booked — [Day] [Date] at [Time] [Their Timezone] 🎉

> Hi [Parent First Name],
>
> Your free Learning Path Consultation is confirmed.
>
> **📅 [Day, Date]**
> **🕐 [Time] [Their timezone]** *(that's [Time] [Your timezone])*
> **⏱ 20 minutes**
> **🔗 Join here:** [Video link]
>
> The calendar invite is attached — add it now so you get a reminder.
>
> **One thing before we talk (10 minutes, and [Student Name] will enjoy it):**
>
> 👉 **[Start [Student]'s Placement Activity]**
>
> It's a short set of puzzles, not a test — there's no score and nothing to revise. It tells me exactly where [Student] is starting from so our call is about *their* specific path, not a generic sales pitch.
>
> **What we'll cover on the call:**
> 1. What [Student] is into and what you're hoping they'll get out of this
> 2. Their placement result — where they're strong, where the gap is
> 3. A specific recommended track, with real examples of what students build
> 4. Pricing, schedule options, and your questions
>
> No card needed, no obligation. You'll leave with a written learning path whether or not you enrol with us.
>
> In the meantime, here's our **[2026 Prospectus]** if you'd like to browse the curriculum.
>
> Need to reschedule? [Reschedule link] — takes 10 seconds.
>
> Talk soon,
> **[Advisor Name]**
> Learning Advisor, Code Illustrated Online School
> 📱 WhatsApp: [number] · ✉️ admin@codeillustrated.com

**WhatsApp version (send immediately, keep it short):**

> Hi [Parent Name] 👋 [Advisor] from Code Illustrated. You're booked for **[Day] [Date], [Time] [their TZ]** — link: [url]
>
> I've emailed a short 10-min placement activity for [Student]. If they can do it before we talk, our call will be much more useful.
>
> Any questions before then, just reply here.

---

### 6.2 Pre-class setup instructions (Welcome Kit W2)

**Subject:** [Student]'s setup — 15 minutes, and you're done ✅

> Hi [Parent First Name],
>
> [Student] is officially enrolled in **[Course Name]** — welcome aboard! 🎉
>
> Here's everything needed before the first class. **It takes about 15 minutes.** Do it once, and every session from here is pure learning.
>
> ---
>
> **STEP 1 — Install Zoom (5 min)**
> Download: [zoom.us/download]
> Install the **desktop app**, not the browser version — screen sharing and drawing tools are much more reliable.
> On a Mac: open System Settings → Privacy & Security → Screen Recording → tick Zoom. *(This one step prevents the most common first-class problem.)*
>
> **STEP 2 — [Student]'s coding account (5 min)**
> We've already created it. Here are the details:
> - Platform: **[Platform]**
> - Login: **[username]**
> - Password: **[password]** *(please change it together at first login)*
> - Link: [url]
>
> Open it once now and bookmark it on the device [Student] will use.
>
> **STEP 3 — Student Portal (2 min)**
> Set your password here: [Portal link]
> This is where you'll find the schedule, session notes, and everything [Student] builds.
>
> **STEP 4 — Discord community (3 min)**
> Invite: [link]
> [Student] can ask questions between classes and share projects. It's fully moderated — direct messages between adults and students are disabled, and every channel is supervised. Our full safety policy is here: [link]
>
> ---
>
> **🔧 Book your free 10-minute Tech Check**
>
> **👉 [Pick a time]**
>
> We test the camera, microphone, screen sharing and code editor together — so the first class is 100% learning and 0% troubleshooting. It must happen at least a day before Class 1.
>
> ---
>
> **Quick checklist for class day:**
> - Quiet space, door closed
> - Headphones (big difference in audio quality)
> - Device charged and plugged in
> - Other tabs and notifications closed
> - Join 5 minutes early
>
> **Anything not working? Reply here or WhatsApp me at [number].** Don't spend more than 10 minutes stuck — that's what we're here for.
>
> **[Student] — get ready to build your first [project type]. See you on [Date]!** 🚀
>
> **[Name]**
> Student Success, Code Illustrated Online School

---

### 6.3 Post-first-class parent check-in

**Part A — T+2 hours, the Win Report:**

**Subject:** 🎉 Look what [Student] built today

> Hi [Parent First Name],
>
> [Student]'s first class is done — and they built something real.
>
> **[Screenshot / link to their project]**
>
> **What they did today:** [1–2 specific sentences — "Amara wrote her first HTML page from scratch and got the colour-changing button working on her own, without me prompting her."]
>
> **What impressed me:** [One genuine, specific observation. Not generic praise.]
>
> **Next session ([Date]):** we're [specific next thing].
>
> Ask [Student] to show you what they made tonight — they're proud of it, and talking about it is how it sticks.
>
> **[Instructor Name]**

**Part B — T+48 hours, the feedback ask:**

**Subject:** Quick question about [Student]'s first class

> Hi [Parent First Name],
>
> [Student] has had a couple of days to sit with their first session, so I wanted to check in properly.
>
> **Three questions, 30 seconds:** 👉 **[Give feedback]**
>
> 1. How did [Student] seem after the class?
> 2. How likely are you to recommend us so far? (0–10)
> 3. Anything you'd like us to do differently?
>
> I read every response personally. If something wasn't right, I'd much rather hear it now while it's easy to fix.
>
> And if it went well — [Student]'s next session is [Day] at [Time]. We're building [X].
>
> Thanks,
> **[Advisor Name]**
> Learning Advisor, Code Illustrated Online School
> 📱 [WhatsApp number] — always open

**WhatsApp version:**

> Hi [Parent] 👋 How did [Student] find their first class? Anything we should adjust? Two-tap feedback here if easier: [link] — I read them all personally 🙏

---

### 6.4 Bonus: no-show recovery (send at T+10 minutes)

**WhatsApp:**

> Hi [Parent Name] — we had your consultation at [time] today and I didn't want to keep you waiting, so I've stepped away. No problem at all, these things happen 🙂
>
> Grab any slot that works better here: [rebook link]
>
> Or if it's easier, just tell me two times that suit you this week and I'll set it up.

---

## 7. Metrics: instrument every stage

Track these weekly in a single Airtable dashboard. You cannot improve what you cannot see — and right now you can see none of it.

| Metric | Definition | Where to fix if low |
|---|---|---|
| Landing → form start | % of visitors who begin Step 1 | Hero clarity, CTA prominence, price visibility |
| Form start → submit | Step 1 → Step 2 completion | Field count, mobile UX, trust signals |
| Submit → call booked | Redirect-to-booking conversion | Slot availability, timezone display, Track B nudges |
| Booked → attended | Show rate | Reminder cadence — especially the T-3h WhatsApp |
| Attended → enrolled | Call close rate | Call structure, price framing, assessment quality |
| Enrolled → paid | Invoice conversion | Payment friction, follow-up SLA, deposit option |
| Paid → tech check completed | Setup completion | Welcome kit clarity, W6 nudge |
| Paid → attended Class 1 | The metric that actually matters | Everything upstream |
| Class 1 → session 4 | 30-day survival rate | Instructor fit, project relevance, parent reporting |
| First-class parent NPS | 0–10 at T+48h | Tech check rigour, Class 1 structure |
| Time: enquiry → Class 1 | Median days | Target under 10 days. Longer = more drop-off |

Set a baseline in week one, then change one thing at a time.

---

## 8. 30-day implementation roadmap

Sequenced so that each week's work is usable on its own. Do not skip ahead — Week 1 stops the bleeding.

### Week 1 — Stop losing leads *(highest ROI, lowest effort)*

| # | Action | Effort | Owner |
|---|---|---|---|
| 1 | Build the 2-step enquiry form in Tally | 2h | You |
| 2 | Set up Cal.com with two discovery-call event types + timezone auto-detect | 1h | You |
| 3 | Swap primary CTAs on `/academy` from `wa.me` to the form. Keep WhatsApp as a visible secondary | 2h | Dev |
| 4 | **Publish prices on every course card.** Fix the empty "Starts from" fields | 1h | Dev |
| 5 | Redirect form submission straight to the Cal.com booking page | 30m | Dev |
| 6 | Fire Meta Pixel `Lead` event on form submit | 30m | Dev |
| 7 | Fix the footer CTA copy: "Book your first free interactive class" → "Book a free learning path consultation" | 10m | Dev |

*By end of Week 1 you are capturing every enquiry and can measure your funnel for the first time.*

### Week 2 — Automate the follow-up

| # | Action | Effort |
|---|---|---|
| 8 | Build the Airtable base: Leads, Students, Sessions, Invoices, Instructors | 3h |
| 9 | Make.com scenario: Tally → Airtable → Brevo → WhatsApp → booking redirect | 3h |
| 10 | Write and load Nurture Track A (6 messages) | 2h |
| 11 | Write and load Nurture Track B (5 messages) and Track D (no-show) | 2h |
| 12 | Build the Placement Assessment in Tally — both age variants, with auto-scoring and tier output | 4h |
| 13 | Standardise the 20-minute call structure; write the objection-handling one-pager | 2h |

### Week 3 — Enrolment & welcome

| # | Action | Effort |
|---|---|---|
| 14 | Build the registration form with the full data schema | 3h |
| 15 | Build the invoice template in Wave/Zoho with all three payment rails + FX lock language | 2h |
| 16 | Set up Wise Business for GBP/USD local receiving | 1h |
| 17 | Write Welcome Kit W1–W7 and automate the trigger from "Payment Confirmed" | 4h |
| 18 | Build track-specific setup guides (one per course, illustrated) | 4h |
| 19 | Move consent forms to e-signature; write the safeguarding pack | 3h |
| 20 | Create the Tech Check event type + 12-point checklist | 1h |

### Week 4 — Delivery excellence & measurement

| # | Action | Effort |
|---|---|---|
| 21 | Write the instructor pre-flight checklist; train every instructor on it | 2h |
| 22 | Design the "First Win in 20 Minutes" Class 1 plan for each track | 5h |
| 23 | Build the Parent Win Report template + artefact capture habit | 1h |
| 24 | Build the T+48h feedback form with NPS routing rules | 1h |
| 25 | Add the Safety & Trust section to `/academy` | 3h |
| 26 | Build the weekly funnel dashboard in Airtable; set the baseline | 2h |
| 27 | Segment testimonials by age tier; add the FAQ block | 2h |

### Days 31–90 — Scale

- Add Paystack (Nigeria, recurring NGN) and Stripe Payment Links (international)
- Migrate WhatsApp to the Business Platform API with approved templates
- Build the Student Portal on your existing Next.js app: schedule, materials, submitted projects, progress
- Launch a referral programme with a real incentive, triggered at NPS 9–10
- Add PostHog session replay on the enquiry form
- Consider re-introducing a free trial *class* for the 8–12 tier specifically, where seeing the child engaged is the strongest possible proof

---

## 9. Risk & compliance notes

**Safeguarding is a business risk, not just an ethical one.** Operating with minors across Nigeria, the UK, and elsewhere means: documented instructor vetting, a written child protection policy, no unmonitored 1:1 adult–child communication channels, parental consent on record, and a named safeguarding lead. Publish this. Parents look for it, and its absence is disqualifying for the segment you're targeting.

**Data protection.** You will hold minors' personal data across jurisdictions — NDPR (Nigeria) and UK/EU GDPR both apply depending on where the family sits. Key obligations: lawful basis for processing, parental consent for under-13s, a stated retention period for session recordings, and a documented process for deletion requests. Keep consent granular and separated (attendance vs recording vs showcase). This is general guidance, not legal advice — worth a short review with a data protection adviser before you scale.

**Recording policy.** Decide now, publish it, and be consistent: who can access recordings, how long they're kept, whether other students appear in them, and how a parent opts out.

**Refunds.** Publish a clear, generous-sounding, well-bounded policy (e.g. full refund within the first two sessions). It costs you very little in practice and removes a major purchase objection.

---

## 10. The five things that matter most

If the roadmap is too much at once, these five moves capture most of the value:

1. **Replace WhatsApp-only CTAs with a form that captures email and phone.** Everything else in this document depends on this.
2. **Put prices on the page.** Removes your single largest friction point and pre-qualifies every call.
3. **Redirect form submits straight into a booking calendar,** and add the T-3h WhatsApp reminder.
4. **Make the Tech Check mandatory.** It is how you guarantee a flawless first class, and the first class is where retention is decided.
5. **Send the Parent Win Report two hours after Class 1** with a screenshot of what their child built. This is the moment a parent commits.

---

*Prepared for Code Illustrated Online School · August 2026*
