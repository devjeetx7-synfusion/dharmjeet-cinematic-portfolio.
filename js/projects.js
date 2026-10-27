/* Portfolio content — single source of truth.
   Only verified public information is stored here. Private source code,
   keystores, tokens and client data must never be added to this file. */
window.PORTFOLIO = {
  author: "Dharmjeet Singh",
  brand: "SynFusion",
  role: "Android Developer · Software Creator",
  location: "Bihar, India",
  github: "devjeetx7-synfusion",
  contact: "devjeetx7@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/devjeetx7-synfusion", handle: "@devjeetx7-synfusion" },
    { label: "Instagram", url: "https://instagram.com/devjeetx7", handle: "@devjeetx7" },
    { label: "Telegram", url: "https://t.me/synfusion_coder", handle: "@synfusion_coder" },
    { label: "X", url: "https://x.com/getsynfusion", handle: "@getsynfusion" }
  ],
  projects: [
    {
      slug: "workdaily",
      name: "WorkDaily",
      number: "01",
      year: "2026",
      category: "android",
      featured: true,
      type: "Android Application",
      tagline: "Making everyday work count.",
      summary: "Offline attendance, wages, overtime, advances and PDF passbook management for daily workers.",
      challenge: "Daily-wage workers need reliable attendance and earnings records that keep working without a network connection.",
      solution: "A native Kotlin and Jetpack Compose Android app with local storage, earnings calculations and passbook exports built for everyday use.",
      features: [
        "Attendance and earnings",
        "Overtime and advances",
        "PDF passbook",
        "Offline backup"
      ],
      stack: ["Kotlin", "Jetpack Compose", "Room", "DataStore"],
      cover: "assets/workdaily-cover.svg",
      accent: "#8FA6D9",
      tint: "#394761",
      status: "Live · Google Play",
      statusTone: "live",
      links: [
        {
          label: "Google Play",
          url: "https://play.google.com/store/apps/details?id=com.synfusion.attendance",
          kind: "play"
        }
      ],
      codePrivate: true
    },
    {
      slug: "officemitra",
      name: "Office Mitra",
      number: "02",
      year: "2026",
      category: "android",
      featured: true,
      type: "Workforce Management",
      tagline: "A clearer way to manage work.",
      summary: "Modern native workforce management with attendance, leave, salary and approval workflows.",
      challenge: "Everyday employee workflows — attendance, leave, approvals and salary slips — often live in cluttered interfaces.",
      solution: "A Material 3 Android app built with Kotlin and Jetpack Compose, organised around the tasks employees and approvers repeat every day.",
      features: [
        "Attendance with selfie and location check",
        "Leave balances, requests and approvals",
        "Salary slips and holiday calendar",
        "MVVM with Hilt and DataStore"
      ],
      stack: ["Kotlin", "Jetpack Compose", "Material 3", "MVVM", "Hilt", "Room"],
      cover: "assets/officemitra-cover.svg",
      accent: "#8FBFB2",
      tint: "#394761",
      status: "Open source",
      statusTone: "open",
      links: [
        {
          label: "Source on GitHub",
          url: "https://github.com/devjeetx7-synfusion/OfficeMitra",
          kind: "github"
        }
      ],
      codePrivate: false
    },
    {
      slug: "turtlex",
      name: "TurtleX",
      number: "03",
      year: "2026",
      category: "tools",
      featured: true,
      type: "Developer Tool",
      tagline: "Development, in your pocket.",
      summary: "An offline-first Android coding workspace with a virtualized editor and project templates.",
      challenge: "Mobile code editors are usually either too heavy and cloud-dependent, or too basic to be useful away from a desk.",
      solution: "A native Android IDE workspace built with Jetpack Compose: virtualized editing, syntax tokenization, Room-backed projects and a local-first workflow.",
      features: [
        "Virtualized code editor",
        "Offline-first workspace",
        "Room-backed project library",
        "Material 3 theme system"
      ],
      stack: ["Kotlin", "Jetpack Compose", "Room", "Material 3"],
      cover: "assets/turtlex-cover.svg",
      accent: "#A9BE7C",
      tint: "#394761",
      status: "In development",
      statusTone: "building",
      links: [
        {
          label: "Source on GitHub",
          url: "https://github.com/devjeetx7-synfusion/TurtleX",
          kind: "github"
        }
      ],
      codePrivate: false
    },
    {
      slug: "jump-adventure",
      name: "Jump Adventure",
      number: "04",
      year: "2026",
      category: "games",
      featured: true,
      type: "Android Game",
      tagline: "A small world built to be explored.",
      summary: "An offline portrait 2D platformer built with Kotlin and native Android views.",
      challenge: "Touch controls, rendering performance and reliable collision handling decide whether a mobile game feels good.",
      solution: "Native 2D rendering and gameplay logic behind a CI pipeline that tests, lints and assembles every change.",
      features: [
        "Portrait gameplay",
        "Custom canvas rendering",
        "Platform collisions",
        "GitHub Actions build checks"
      ],
      stack: ["Kotlin", "Android Views", "Canvas"],
      cover: "assets/jump-cover.svg",
      accent: "#D3A17F",
      tint: "#394761",
      status: "In development",
      statusTone: "building",
      links: [
        {
          label: "Source on GitHub",
          url: "https://github.com/devjeetx7-synfusion/Jump-Adventure",
          kind: "github"
        }
      ],
      codePrivate: false
    },
    {
      slug: "cineprompt",
      name: "CinePrompt AI",
      number: "05",
      year: "2026",
      category: "ai",
      featured: false,
      type: "Creative AI Tool",
      tagline: "Better prompts. Better visuals.",
      summary: "An Android cinematic prompt library with category navigation, favourites and a separate admin workflow.",
      challenge: "Creative prompts are difficult to organise, revisit and reuse across projects.",
      solution: "A structured prompt catalogue with copy and share flows, backed by Firebase and a separate content workflow.",
      features: [
        "Curated categories",
        "Copy and favourites",
        "Separate admin workflow",
        "Firebase"
      ],
      stack: ["Kotlin", "Jetpack Compose", "Firebase"],
      cover: "assets/cineprompt-cover.svg",
      accent: "#B79BD3",
      tint: "#394761",
      status: "Private project",
      statusTone: "private",
      links: [],
      codePrivate: true
    },
    {
      slug: "youtube-video-player",
      name: "YouTube Video Player",
      number: "06",
      year: "2026",
      category: "android",
      featured: false,
      type: "Android Experiment",
      tagline: "Exploring mobile playback.",
      summary: "An Android media player experiment focused on playback controls and build workflows.",
      challenge: "Media compatibility and playback controls create practical engineering challenges on Android.",
      solution: "Iterative native playback experiments with a custom interface and GitHub Actions builds.",
      features: [
        "Playback UI",
        "Android integrations",
        "GitHub Actions"
      ],
      stack: ["Kotlin", "Android"],
      cover: "assets/player-cover.svg",
      accent: "#93A2C4",
      tint: "#394761",
      status: "Experiment",
      statusTone: "open",
      links: [
        {
          label: "Source on GitHub",
          url: "https://github.com/devjeetx7-synfusion/YouTube-Video-Player",
          kind: "github"
        }
      ],
      codePrivate: false
    },
    {
      slug: "sm-traders",
      name: "SM Traders",
      number: "07",
      year: "2026",
      category: "web",
      featured: false,
      type: "Blogger Website",
      tagline: "Business presence, thoughtfully designed.",
      summary: "A custom Blogger theme for electrical and solar services, with an interactive solar roadmap.",
      challenge: "A service business needs an inviting, informative experience that also works as a single-file Blogger theme.",
      solution: "A framework-free Blogger XML theme with an orange-and-charcoal identity, service showcase and responsive navigation.",
      features: [
        "Single-file Blogger theme",
        "Interactive solar roadmap",
        "Filterable service gallery",
        "Responsive navigation"
      ],
      stack: ["Blogger XML", "HTML", "CSS", "JavaScript"],
      cover: "assets/sm-cover.svg",
      accent: "#E0A066",
      tint: "#394761",
      status: "Public source",
      statusTone: "open",
      links: [
        {
          label: "Source on GitHub",
          url: "https://github.com/devjeetx7-synfusion/SM-Traders",
          kind: "github"
        }
      ],
      codePrivate: false
    },
    {
      slug: "workdaily-appshow",
      name: "WorkDaily AppShow",
      number: "08",
      year: "2026",
      category: "web",
      featured: false,
      type: "Blogger Theme",
      tagline: "The stories behind the product.",
      summary: "A responsive Blogger XML theme for the WorkDaily website and blog.",
      challenge: "Product updates need a simple publishing surface that still feels designed.",
      solution: "A custom Blogger theme with a responsive layout, custom video player and client-side blog routing.",
      features: [
        "Blogger XML theme",
        "Custom video player",
        "Responsive layout",
        "Blog publishing"
      ],
      stack: ["Blogger XML", "HTML", "CSS", "JavaScript"],
      cover: "assets/appshow-cover.svg",
      accent: "#A7B6D6",
      tint: "#394761",
      status: "Public source",
      statusTone: "open",
      links: [
        {
          label: "Source on GitHub",
          url: "https://github.com/devjeetx7-synfusion/WorkDaily-AppShow",
          kind: "github"
        }
      ],
      codePrivate: false
    }
  ],
  skills: [
    {
      title: "Android",
      icon: "device",
      note: "Native apps, from the first screen to a signed build.",
      items: ["Kotlin", "Java", "Jetpack Compose", "Material 3", "Android Views", "Canvas"]
    },
    {
      title: "Architecture",
      icon: "layers",
      note: "Structure that keeps features readable and dependable.",
      items: ["MVVM", "Coroutines & StateFlow", "Room", "DataStore", "Hilt", "Navigation Compose"]
    },
    {
      title: "Integrations",
      icon: "plug",
      note: "Local-first data plus the services an app needs.",
      items: ["Firebase", "REST APIs", "GitHub API", "CameraX", "AI prompt tooling"]
    },
    {
      title: "Web & tooling",
      icon: "terminal",
      note: "Where the apps are built and where they are documented.",
      items: ["HTML", "CSS", "JavaScript", "Blogger XML", "Git & GitHub", "GitHub Actions", "Gradle"]
    }
  ],
  journey: [
    {
      number: "01",
      title: "Curiosity first",
      text: "Started with science, problem solving and a habit of taking things apart to understand how they work."
    },
    {
      number: "02",
      title: "Learning the craft",
      text: "Moved into Kotlin, Java and Android Studio, rebuilding small apps until the fundamentals became routine."
    },
    {
      number: "03",
      title: "First product",
      text: "Designed and shipped WorkDaily: offline attendance, wages, overtime and PDF passbooks for daily-wage workers."
    },
    {
      number: "04",
      title: "Building in the open",
      text: "Published Office Mitra, TurtleX and Jump Adventure on GitHub, with CI checks and documented project decisions."
    },
    {
      number: "05",
      title: "A wider canvas",
      text: "Extended into AI prompt tools, Blogger themes and web experiments — same care, different surfaces."
    }
  ]
};
