/**
 * English site content. Mirrors src/content/ar.ts field for field.
 * Written editorially, not as a literal translation. Comments starting with
 * REVIEW mark draft text that needs Omar's confirmation.
 * Full guide: docs/content-guide.md
 */
import { notFoundText } from "./not-found";
import type { SiteContent } from "./types";

const GT = "https://globaltrainig.com/courses";

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Eng. Omar Al-Thaidi | AI Digital Transformation Consultant",
    description:
      "Engineer and certified AI trainer based in Kuwait. Training programmes and AI transformation consulting for individuals and organisations.",
    personName: "Eng. Omar Al-Thaidi",
    jobTitle: "AI Digital Transformation Consultant",
  },
  nav: {
    about: "About",
    programs: "Programmes",
    readiness: "Readiness check",
    research: "Research",
    solutions: "Enterprise",
    book: "Book a consultation",
    tour: "Guided tour",
    switchLanguage: "عربي",
    switchLanguageLabel: "النسخة العربية",
    skipToContent: "Skip to content",
    sectionsLabel: "Page sections",
    home: "Home",
  },
  hero: {
    prefix: "Eng.",
    name: "Omar Al-Thaidi",
    role: "AI Digital Transformation Consultant",
    lead: [
      "I help organisations and professionals move from ",
      { em: "individual use" },
      " of AI tools to ",
      { em: "an intelligent way of working" },
      " that measures its impact. Electrical engineer with a US master's degree and an accredited trainer in Kuwait.",
    ],
    primaryCta: "Explore programmes",
    secondaryCta: "Check your readiness",
    scrollHint: "Scroll to explore",
    nextSessionLabel: "Next programme",
    countdown: { in: "in", days: "d", hours: "h", minutes: "m", started: "Now running" },
    markCaption: "MARK / 01 — CONSTRUCTION",
  },
  credentialsLabel: "Credentials and certifications",
  credentials: [
    "Arizona State University",
    "IBM AI Engineering",
    "Google · Generative AI Leader",
    "Microsoft Learn",
    "PAAET Kuwait",
    "Civil Service Commission",
    "Informatics Academy",
    "IEEE",
  ],
  about: {
    eyebrow: "About",
    title: "Engineering first, then AI applied inside the organisation",
    paragraphs: [
      "I started as an engineer at Kuwait's Ministry of Electricity, Water and Renewable Energy, leading a section that maintained equipment rated up to 11 kV. That background shapes how I approach AI: like any engineered system, it needs clear inputs and an impact you can measure.",
      "Today I train employees, teachers and leadership teams, and I am developing a framework for moving organisations from scattered individual use to an integrated institutional system.",
    ],
    card: {
      name: "Eng. Omar Al-Thaidi",
      role: "Generative AI consultant and trainer",
      photoAlt: "Portrait of Eng. Omar Al-Thaidi",
      rows: [
        { label: "Education", value: "MS Electrical Engineering · ASU" },
        { label: "Trainer accreditation", value: "PAAET · Civil Service Commission" },
        { label: "Latest certificate", value: "IBM AI Engineering · 2026" },
        { label: "Based in", value: "Kuwait" },
      ],
    },
    stats: [
      { value: 150, plus: true, label: "People trained in 2026" },
      { value: 4, label: "Organisations trained in 2026" },
      { value: 10, plus: true, label: "Years of engineering experience since 2016" },
      { value: 1, label: "Published research paper" },
    ],
  },
  programs: {
    eyebrow: "Training programmes",
    title: "Four programmes, one for each audience",
    intro: "Every programme ends with hands-on work on the participant's real tasks, not a tour of tools.",
    detailsCta: "Details",
    registerCta: "Book a seat",
    requestCta: "Request this programme",
    nextLabel: "Next:",
    andLabel: "and",
    courses: [
      {
        slug: "distinguished-employee",
        icon: "employee",
        audience: "For employees",
        title: "The Distinguished Employee in the Age of AI",
        summary:
          "Write reports, summarise meetings and analyse data in a fraction of the usual time, while keeping accuracy and confidential information safe.",
        tags: ["Report writing", "Data analysis", "Information security"],
        // REVIEW
        topics: [
          "Generative AI basics and limits",
          "Prompting for everyday administrative work",
          "Drafting reports and official correspondence",
          "Summarising meetings and long documents",
          "Analysing and presenting data",
          "Protecting confidential information",
        ],
        outcomes: [
          "Repetitive writing tasks done in less time",
          "Choosing the right tool for each task",
          "Safe use that respects organisational policy",
        ],
        format: "In-person or remote workshop for organisations",
        availability: "Available to organisations on request",
        sessions: [],
        image: { src: "/images/programs/distinguished-employee.jpg", alt: "Eng. Omar Al-Thaidi with the title of The Distinguished Employee in the Age of AI" },
      },
      {
        slug: "ai-digital-transformation",
        icon: "enterprise",
        audience: "For leaders and organisations",
        title: "AI Digital Transformation for Organisations",
        summary:
          "A roadmap for senior management: choosing use cases that pay back, setting usage policy and governance, and measuring impact before scaling.",
        tags: ["Roadmap", "Governance", "Measuring return"],
        // REVIEW
        topics: [
          "Assessing organisational AI readiness",
          "Selecting the highest-return use cases",
          "Usage policy, governance and risk",
          "Building the transformation team",
          "Impact metrics",
          "Scaling from pilot to organisation-wide use",
        ],
        outcomes: [
          "A first roadmap tailored to your organisation",
          "A draft usage policy ready for approval",
          "A shortlist of metrics to track return",
        ],
        format: "Closed workshop for senior management",
        availability: "Closed workshop for organisations",
        sessions: [],
        image: { src: "/images/programs/ai-digital-transformation.jpg", alt: "Eng. Omar Al-Thaidi with the title of AI Digital Transformation for Organisations" },
        poster: {
          src: "/images/programs/ai-digital-transformation-poster.jpg",
          alt: "Eng. Omar Al-Thaidi with the title of AI Digital Transformation for Organisations",
          width: 1080,
          height: 1934,
        },
      },
      {
        slug: "successful-teacher",
        icon: "teacher",
        audience: "For teachers",
        title: "The Successful Teacher in the Age of AI",
        summary:
          "Prepare lessons and activities, build assessment tools and design interactive content suited to different student levels.",
        tags: ["Lesson planning", "Assessment", "Interactive content"],
        // REVIEW
        topics: [
          "Lesson and unit planning",
          "Activities for mixed-ability classes",
          "Building tests and rubrics",
          "Producing visual and interactive material",
          "Ethical use in schools",
        ],
        outcomes: [
          "A ready set of lessons built by the teacher",
          "Less weekly preparation time",
          "Faster, more precise assessment tools",
        ],
        format: "Public cohorts: one day online, with an attendance certificate from Global Training. Also available in person for schools.",
        availability: "Available to schools on request",
        sessions: [
          { startsAt: "2026-11-30T17:00:00+03:00", endsAt: "2026-11-30T20:30:00+03:00", mode: "Online", registerUrl: `${GT}/the-successful-teacher-with-artificial-intelligence-5` },
        ],
      },
      {
        slug: "double-your-efficiency",
        icon: "individual",
        audience: "For individuals",
        title: "Double Your Efficiency in the Age of AI",
        summary:
          "A practical method for writing effective prompts, automating repetitive work and choosing between ChatGPT, Claude and Gemini.",
        tags: ["Prompting", "Automation", "Comparing tools"],
        // REVIEW
        topics: [
          "Principles of effective prompting",
          "Hands-on comparison of ChatGPT, Claude and Gemini",
          "Automating repetitive tasks",
          "Personal knowledge and research workflows",
          "A daily AI-assisted routine",
        ],
        outcomes: [
          "A personal prompt library ready to use",
          "Hours saved each week on repetitive work",
          "Confidence choosing the right tool",
        ],
        format: "One day online, with an attendance certificate from Global Training.",
        availability: "Regular cohorts",
        sessions: [
          { startsAt: "2026-10-26T17:00:00+03:00", endsAt: "2026-10-26T20:30:00+03:00", mode: "Online", registerUrl: `${GT}/increase-your-productivity-in-the-age-of-artificial-intelligence-4` },
          { startsAt: "2026-11-09T17:00:00+03:00", endsAt: "2026-11-09T20:30:00+03:00", mode: "Online", registerUrl: `${GT}/increase-your-productivity-in-the-age-of-artificial-intelligence-5` },
        ],
      },
    ],
    page: {
      back: "All programmes",
      topics: "Topics",
      outcomes: "What participants leave with",
      format: "Format",
      upcoming: "Upcoming dates",
      noUpcoming: "No public cohort is scheduled right now. The programme can be run for your organisation on request.",
      ctaTitle: "Want this programme for your team?",
      ctaBody: "Send the number of participants and a preferred date, and I will reply with a tailored proposal.",
    },
  },
  readiness: {
    eyebrow: "Interactive tool",
    title: "How ready is your organisation for AI?",
    intro: "Four questions and an instant result, with the programme that makes the best starting point. The answers selected now are an example; change them to fit your organisation.",
    questions: [
      { prompt: "How do employees use AI tools today?", options: ["They don't", "Individually, ad hoc", "In some departments", "Within approved processes"] },
      { prompt: "Is there a usage policy or governance?", options: ["None", "Under discussion", "Initial guidelines", "Approved policy"] },
      { prompt: "How well trained is the team?", options: ["Not trained", "Individual efforts", "Some departments", "Organisation-wide programme"] },
      { prompt: "Do you measure the impact on productivity?", options: ["No", "General impressions", "Partial metrics", "Clear metrics"] },
    ],
    sampleAnswers: [1, 0, 1, 0],
    levels: [
      {
        title: "Exploring",
        body: "Use is individual and unstructured, with large opportunities still untapped.",
        recommendation: "Start with: The Distinguished Employee in the Age of AI",
        courseSlug: "distinguished-employee",
      },
      {
        title: "Adopting",
        body: "AI is in real use, but it needs governance and consistency.",
        recommendation: "Start with: AI Digital Transformation for Organisations",
        courseSlug: "ai-digital-transformation",
      },
      {
        title: "Scaling",
        body: "The foundation is ready for custom solutions and automation.",
        recommendation: "Start with: a custom solutions consultation",
      },
    ],
    startHere: "Suggested starting point",
    resultLabel: "Readiness",
  },
  research: {
    eyebrow: "Research and memberships",
    title: "A research track behind the training",
    // REVIEW: confirm the official English names of the organisations below.
    events: [
      {
        year: "2026",
        title: "Published paper · First Kuwait International Conference on Training and Development",
        body: "“Integrating generative AI into training management: a proposed conceptual framework for moving from individual use to an intelligent system.”",
        badge: "October 2026",
      },
      { year: "2025", title: "Member, Kuwait International Institute for Training", body: "Accredited AI trainer with PAAET and the Civil Service Commission." },
      { year: "2022", title: "Technology and Innovation Consultant · Binaa Consulting", body: "Board member of a non-profit that raises cultural awareness in Kuwaiti society." },
      { year: "2019", title: "MS Electrical Engineering · Arizona State University", body: "Attended the MRS Spring Meeting on electronic, magnetic, quantum and energy materials." },
      { year: "2016", title: "Founding member · Kuwait Society for Supporting Inventors", body: "Supporting Kuwaiti inventors through awareness, skills development and access to investors." },
      { year: "2012", title: "IEEE member", body: "Continuous IEEE membership, and a member of the IEEE honour society since 2014." },
    ],
  },
  solutions: {
    eyebrow: "Enterprise solutions",
    title: "From training to building systems",
    intro: "Training opens the door inside an organisation and reveals what it actually needs. The next step is turning those needs into ready solutions.",
    phases: [
      {
        label: "Phase 1",
        state: "Live now",
        current: true,
        title: "Training and consulting",
        body: "Accredited programmes for individuals, government and private organisations.",
        items: ["4 organisations and 150+ people trained in 2026", "Four training programmes", "Accredited by two government bodies"],
      },
      {
        label: "Phase 2",
        state: "In planning",
        title: "Custom solutions",
        body: "Delivering what an organisation needs after training.",
        items: ["An AI assistant over internal documents", "Automating administrative workflows", "Dashboards that measure AI impact"],
      },
      {
        label: "Phase 3",
        state: "Vision",
        title: "Products and platforms",
        body: "Repeatable solutions across many organisations.",
        items: ["An AI-powered corporate training platform", "Ready AI agents for the public sector", "Annual subscriptions for organisations"],
      },
    ],
    note: "Phases 2 and 3 are an early outline; details will be set with partners.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's start from what your organisation needs",
    copy: "Copy",
    copied: "Copied ✓",
    copyFallback: "Select and copy",
    whatsappCta: "Message me on WhatsApp",
    form: {
      name: "Name",
      namePlaceholder: "Full name",
      nameRequired: "Enter your name to continue",
      org: "Organisation",
      orgPlaceholder: "Company or organisation",
      type: "Request type",
      types: ["Training for my organisation", "Digital transformation consulting", "Custom solution", "Partnership or investment"],
      details: "Details",
      detailsPlaceholder: "Number of participants, preferred dates, or what you need",
      submit: "Send via WhatsApp",
      privacyNote: "This site does not store your data. The button opens WhatsApp with a ready message, and you choose whether to send it.",
      opened: "WhatsApp opened with your message. If it didn't, message me directly on the number above.",
      messageTemplate: "Hello Eng. Omar,\nName: {name}\nOrganisation: {org}\nRequest: {type}\nDetails: {details}",
    },
  },
  footer: { tagline: "AI and digital transformation · Solutions and systems", privacy: "Privacy policy", rights: "All rights reserved" },
  social: { label: "Follow and contact", whatsapp: "WhatsApp", email: "Email", instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube" },
  privacy: {
    title: "Privacy policy",
    // REVIEW: first draft; needs a lawyer's review before launch.
    updated: "Last updated: October 2026",
    sections: [
      { heading: "What we collect", body: "This site does not collect or store personal data. The contact form prepares a WhatsApp message on your device, and it only reaches me if you send it." },
      { heading: "Cookies", body: "The site does not use tracking or advertising cookies." },
      { heading: "External links", body: "Course registration links take you to the organiser's website, which has its own privacy policy." },
      { heading: "Your rights and contact", body: "For any question about your data, or to ask me to delete a message you sent, contact me by the email or WhatsApp number on this site." },
    ],
  },
  tour: {
    steps: [
      { target: "hero", title: "First impression", body: "The mark assembles from its construction lines and the name decodes like a cipher. Move the pointer over the background to see the neural field react." },
      { target: "credentials", title: "Credibility in a second", body: "The credentials strip answers “who is behind this name?” before the visitor scrolls." },
      { target: "about", title: "Early traction", body: "4 organisations and 150+ people trained in 2026 alone, by an engineer who applies AI with a systems-and-measurement mindset." },
      { target: "programs", title: "The current product", body: "Four programmes for four audiences, each with its own details page. Upcoming dates link straight to registration." },
      { target: "readiness", title: "Lead generation", body: "The readiness check turns a visitor into a lead and points them to the right programme. Change the answers and watch the result." },
      { target: "research", title: "Research depth", body: "A timeline that fills as you scroll: research and memberships that build trust with government clients." },
      { target: "solutions", title: "The growth opportunity", body: "Training is a low-cost way into organisations; custom solutions and products are the revenue that scales." },
      { target: "contact", title: "Conversion", body: "Every path ends here: a form that classifies the request and sends it via WhatsApp, including a partnership and investment option." },
    ],
    prev: "Back",
    next: "Next",
    finish: "Finish",
    close: "End tour",
    of: "of",
  },
  notFound: notFoundText.en,
};
