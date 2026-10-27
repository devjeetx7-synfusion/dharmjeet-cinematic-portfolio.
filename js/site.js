/* =========================================================================
   Dharmjeet Singh — SynFusion portfolio
   Dependency-free, accessible interactions. No trackers, no secrets.
   Everything degrades gracefully without JavaScript where possible.
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.PORTFOLIO || { projects: [] };
  var PROJECTS = Array.isArray(DATA.projects) ? DATA.projects : [];
  var reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var requestFrame = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : null;
  var cancelFrame = window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : function () {};

  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var $$ = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function projectUrl(project) {
    return "project.html?slug=" + encodeURIComponent(project.slug);
  }

  function statusMarkup(project) {
    var tone = project.statusTone || "open";
    return '<span class="status status--' + escapeHtml(tone) + '">' +
      '<span class="status__dot" aria-hidden="true"></span>' +
      escapeHtml(project.status || "Public project") +
      "</span>";
  }

  function externalLinks(project) {
    return (project.links || []).map(function (link) {
      return '<a href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(link.label) + ' <span aria-hidden="true">↗</span></a>';
    }).join("");
  }

  var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function projectCard(project, options) {
    var feature = !!(options && options.feature);
    var links = externalLinks(project);
    var chips = (project.stack || []).slice(0, feature ? 6 : 3).map(function (tech) {
      return '<li class="chip">' + escapeHtml(tech) + "</li>";
    }).join("");

    return '<article class="card' + (feature ? " card--feature" : "") + ' will-reveal" ' +
      'style="--accent:' + escapeHtml(project.accent || "#e9b482") + '">' +
        '<div class="card__media">' +
          '<img src="' + escapeHtml(project.cover) + '" width="960" height="740" loading="lazy" decoding="async" ' +
            'alt="Original cover artwork for ' + escapeHtml(project.name) + ', not an app screenshot">' +
          '<span class="card__view" aria-hidden="true">View case study ' + "↗" + "</span>" +
        "</div>" +
        '<div class="card__body">' +
          '<div class="card__meta">' +
            '<span class="card__type">' + escapeHtml(project.number + " / " + project.type) + "</span>" +
            statusMarkup(project) +
          "</div>" +
          '<h3 class="card__title">' +
            '<a class="card__title-link" href="' + projectUrl(project) + '">' + escapeHtml(project.name) +
            '<span class="sr-only"> — read the case study</span></a>' +
          "</h3>" +
          '<p class="card__summary">' + escapeHtml(project.summary) + "</p>" +
          '<ul class="card__chips" aria-label="Technologies used">' + chips + "</ul>" +
          '<div class="card__foot">' +
            '<span class="card__more">Read case study ' + arrow + "</span>" +
            (links ? '<span class="card__links">' + links + "</span>" : '<span class="muted">Case study</span>') +
          "</div>" +
        "</div>" +
      "</article>";
  }

  /* --- Header, progress, mobile menu, active section -------------------- */
  function initHeader() {
    var header = $("[data-header]");
    var bar = $("[data-progress]");
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      if (header) header.classList.toggle("is-scrolled", y > 12);
      if (bar) {
        var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, y / max)) + ")";
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      if (requestFrame) requestFrame(update);
      else update();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  function initMenu() {
    var button = $(".menu-btn");
    var menu = $("#site-menu");
    if (!button || !menu) return;

    var interactiveSelector = 'a[href], button:not([disabled])';
    var lastFocused = null;

    // The panel fades in via a CSS transition, so it only becomes focusable a
    // frame or two after the class is applied. Retry briefly instead of using a
    // single fixed delay, and cancel any pending retry when the menu closes.
    var focusTimers = [];
    function clearFocusTimers() {
      focusTimers.forEach(function (id) { window.clearTimeout(id); });
      focusTimers = [];
    }
    function focusIntoMenu() {
      var first = $(interactiveSelector, menu);
      if (!first) return;
      clearFocusTimers();
      [0, 40, 120, 260].forEach(function (delay) {
        focusTimers.push(window.setTimeout(function () {
          if (!menu.classList.contains("is-open")) return;
          if (menu.contains(document.activeElement)) return;
          if (getComputedStyle(menu).visibility === "hidden" && delay < 260) return;
          first.focus({ preventScroll: true });
        }, delay));
      });
    }

    function setOpen(open, returnFocus) {
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
      if ("inert" in menu) menu.inert = !open;
      document.body.classList.toggle("menu-open", open);
      if (open) {
        focusIntoMenu();
      } else {
        clearFocusTimers();
        if (returnFocus !== false && lastFocused) lastFocused.focus();
      }
    }

    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") !== "true";
      if (open) lastFocused = document.activeElement;
      setOpen(open);
    });

    $$("a", menu).forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false, false); });
    });

    document.addEventListener("keydown", function (event) {
      if (!menu.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      var items = $$(interactiveSelector, menu).filter(function (el) {
        return el.offsetParent !== null;
      });
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1100 && menu.classList.contains("is-open")) setOpen(false, false);
    }, { passive: true });

    setOpen(false, false);
  }

  function initActiveSection() {
    var links = $$("[data-nav]");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (link) { map[link.getAttribute("data-nav")] = link; });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    ["github", "contact"].forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* --- Scroll reveals --------------------------------------------------- */
  var revealObserver = null;

  function observeReveals(root) {
    var items = $$(".will-reveal:not(.is-in)", root || document);
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || reducedQuery.matches) {
      items.forEach(function (item) { item.classList.add("is-in"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    }
    items.forEach(function (item, index) {
      if (!item.style.getPropertyValue("--reveal-delay")) {
        item.style.setProperty("--reveal-delay", (index % 3) * 80 + "ms");
      }
      revealObserver.observe(item);
    });
  }

  function initStaticReveals() {
    $$("[data-reveal]").forEach(function (element) {
      element.classList.add("will-reveal");
    });
    observeReveals(document);
    if ("IntersectionObserver" in window && !reducedQuery.matches) {
      window.setTimeout(function () {
        $$(".will-reveal:not(.is-in)").forEach(function (element) {
          var rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) element.classList.add("is-in");
        });
      }, 1200);
    }
  }

  /* --- Projects --------------------------------------------------------- */
  function renderFeatured() {
    var target = $("#featured-grid");
    if (!target) return;
    var featured = PROJECTS.filter(function (project) { return project.featured; });
    if (!featured.length) {
      target.innerHTML = '<p class="muted">Project details are being updated.</p>';
      return;
    }
    target.innerHTML = featured.map(function (project, index) {
      return projectCard(project, { feature: index === 0 });
    }).join("");
    observeReveals(target);
  }

  function renderArchive() {
    var target = $("#all-projects");
    if (!target) return;
    var buttons = $$("[data-filter]");
    var count = $("#filter-count");
    var live = $("#archive-live");

    function show(filter) {
      var list = PROJECTS.filter(function (project) {
        return filter === "all" || project.category === filter;
      });
      target.innerHTML = list.length
        ? list.map(function (project) { return projectCard(project); }).join("")
        : '<p class="archive__empty">No projects in this category yet. Try another filter.</p>';
      if (count) count.textContent = String(list.length).padStart(2, "0");
      if (live) live.textContent = list.length + " project" + (list.length === 1 ? "" : "s") + " shown";
      observeReveals(target);
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        buttons.forEach(function (other) {
          other.setAttribute("aria-pressed", String(other === button));
        });
        show(button.getAttribute("data-filter"));
      });
    });

    show("all");
  }

  function renderCaseStudy() {
    var root = $("#case-study");
    if (!root) return;
    var slug = new URLSearchParams(window.location.search).get("slug");
    var project = PROJECTS.filter(function (item) { return item.slug === slug; })[0];

    if (!project) {
      root.innerHTML = '<section class="case-empty"><div class="container">' +
        '<p class="eyebrow">404 / Project not found</p>' +
        '<h1 class="display display--xl">Nothing here<em>.</em></h1>' +
        '<p class="lede">That case study does not exist. Browse the full project archive instead.</p>' +
        '<a class="btn btn--primary" href="work.html">View all projects ' + arrow + "</a>" +
        "</div></section>";
      return;
    }

    document.title = project.name + " — Case study — Dharmjeet Singh";
    var description = project.summary;
    var metaDescription = $('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", description);
    var ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", project.name + " — Dharmjeet Singh");
    var ogDescription = $('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", description);

    var next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];
    var actions = (project.links || []).length
      ? (project.links || []).map(function (link) {
          return '<a class="btn btn--primary" href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener noreferrer">' +
            escapeHtml(link.label) + " " + arrow + "</a>";
        }).join("")
      : '<p class="case-private">The source for this project is private, so there is no public repository or store link to share. The case study above reflects what can be described publicly.</p>';

    var features = (project.features || []).map(function (feature, index) {
      return '<div class="feature-row"><span>' + String(index + 1).padStart(2, "0") + "</span>" +
        "<h3>" + escapeHtml(feature) + "</h3>" +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
    }).join("");

    var stack = (project.stack || []).map(function (tech) {
      return '<li class="chip">' + escapeHtml(tech) + "</li>";
    }).join("");

    root.innerHTML =
      '<section class="case-hero"><div class="container">' +
        '<a class="case-back" href="work.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg> All projects</a>' +
        '<p class="eyebrow">' + escapeHtml(project.number + " / " + project.type) + "</p>" +
        '<h1 class="case-title">' + escapeHtml(project.name) + '<span class="dot">.</span></h1>' +
        '<p class="case-tagline">' + escapeHtml(project.tagline) + "</p>" +
        '<div class="case-meta">' + statusMarkup(project) +
          '<span class="chip">' + escapeHtml(project.year) + "</span>" +
          (project.stack || []).slice(0, 4).map(function (tech) { return '<span class="chip">' + escapeHtml(tech) + "</span>"; }).join("") +
        "</div>" +
        '<figure class="case-cover">' +
          '<img src="' + escapeHtml(project.cover) + '" width="960" height="740" alt="Original cover artwork for ' + escapeHtml(project.name) + '" decoding="async">' +
          '<figcaption class="case-cover__note"><span>Original cover artwork — not an app screenshot</span><span>Concept &amp; build: Dharmjeet Singh</span></figcaption>' +
        "</figure>" +
      "</div></section>" +
      '<section class="case-body"><div class="container"><div class="case-inner">' +
        '<h2 class="case-overview">' + escapeHtml(project.summary) + "</h2>" +
        '<dl class="case-data">' +
          "<div><dt>Discipline</dt><dd>" + escapeHtml(project.type) + "</dd></div>" +
          "<div><dt>Year</dt><dd>" + escapeHtml(project.year) + "</dd></div>" +
          "<div><dt>Status</dt><dd>" + escapeHtml(project.status) + "</dd></div>" +
        "</dl>" +
        '<div class="case-cols">' +
          "<div><h2>The problem</h2><p>" + escapeHtml(project.challenge) + "</p></div>" +
          "<div><h2>The approach</h2><p>" + escapeHtml(project.solution) + "</p></div>" +
        "</div>" +
        '<h2 class="case-section-title">What it does</h2>' +
        '<div class="feature-list">' + features + "</div>" +
        '<h2 class="case-section-title">Built with</h2>' +
        '<ul class="case-tags">' + stack + "</ul>" +
        '<div class="case-actions">' + actions + "</div>" +
        '<p class="case-note">Every cover image on this site is original editorial artwork, not a screenshot of a running application. Real screenshots will replace them only when the owner supplies them.</p>' +
      "</div></div></section>" +
      (next && next.slug !== project.slug
        ? '<a class="next-case" href="' + projectUrl(next) + '"><div class="container next-case__inner"><div>' +
            '<p class="next-case__label">Next case study</p>' +
            '<h2 class="next-case__title">' + escapeHtml(next.name) + "</h2></div>" +
            '<span class="next-case__arrow" aria-hidden="true">' + arrow + "</span></div></a>"
        : "");
  }

  /* --- GitHub ----------------------------------------------------------- */
  function fallbackRepos() {
    return PROJECTS.filter(function (project) {
      return !project.codePrivate && (project.links || []).some(function (link) { return link.kind === "github"; });
    }).slice(0, 6).map(function (project) {
      var link = (project.links || []).filter(function (item) { return item.kind === "github"; })[0];
      return {
        name: project.name,
        url: link ? link.url : "https://github.com/" + DATA.github,
        description: project.summary,
        language: (project.stack || [])[0] || "Code"
      };
    });
  }

  function repoCard(repo) {
    return '<a class="repo will-reveal" href="' + escapeHtml(repo.url) + '" target="_blank" rel="noopener noreferrer">' +
      '<div class="repo__top"><span class="repo__lang"><i data-lang="' + escapeHtml(repo.language || "") + '" aria-hidden="true"></i>' + escapeHtml(repo.language || "Code") + "</span>" +
      '<span aria-hidden="true">' + arrow + "</span></div>" +
      '<h3 class="repo__name">' + escapeHtml(repo.name) + "</h3>" +
      '<p class="repo__desc">' + escapeHtml(repo.description || "Public repository on GitHub.") + "</p>" +
      '<span class="repo__go">View repository <span aria-hidden="true">↗</span></span></a>';
  }

  function initGitHub() {
    var target = $("#github-repos");
    if (!target) return;
    var count = $("#public-repo-count");
    var label = $("#github-data-label");
    var account = DATA.github || "devjeetx7-synfusion";
    var cacheKey = "synfusion:repos:v2";
    var controller = null;
    var timeoutId = null;

    function paint(repos, live, total) {
      target.innerHTML = repos.length
        ? repos.map(repoCard).join("")
        : '<p class="repos__status">Public repositories could not be loaded right now. Use the GitHub link below to browse them directly.</p>';
      if (count) count.textContent = total ? String(total) : "—";
      if (label) label.textContent = live ? "Live from the public GitHub API" : "Selected public repositories";
      var status = $("#github-status");
      if (status) status.textContent = live ? "Loaded " + repos.length + " public repositories from GitHub." : "Showing selected public repositories.";
      observeReveals(target);
    }

    target.innerHTML = '<p class="repos__status" aria-busy="true">Fetching public repositories from GitHub…</p>';

    var cached = null;
    try {
      var raw = window.sessionStorage.getItem(cacheKey);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.at && Date.now() - parsed.at < 15 * 60 * 1000 && Array.isArray(parsed.repos)) cached = parsed;
      }
    } catch (error) { cached = null; }

    if (cached) {
      paint(cached.repos, true, cached.total);
    }

    if (!("fetch" in window)) {
      if (!cached) paint(fallbackRepos(), false, 0);
      return;
    }

    controller = new AbortController();
    timeoutId = window.setTimeout(function () { controller.abort(); }, 7000);

    fetch("https://api.github.com/users/" + encodeURIComponent(account) + "/repos?sort=pushed&per_page=100", {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("GitHub API responded " + response.status);
        return response.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) throw new Error("Unexpected GitHub response");
        var repos = data
          .filter(function (repo) { return !repo.fork && !repo.archived; })
          .slice(0, 6)
          .map(function (repo) {
            return {
              name: repo.name,
              url: repo.html_url,
              description: repo.description || "Public repository — source code and updates.",
              language: repo.language || "Code"
            };
          });
        paint(repos, true, data.length);
        try {
          window.sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), repos: repos, total: data.length }));
        } catch (error) { /* storage may be unavailable — ignore */ }
      })
      .catch(function () {
        if (!cached) paint(fallbackRepos(), false, 0);
      })
      .then(function () {
        window.clearTimeout(timeoutId);
        controller = null;
      });
  }

  /* --- Marquee ---------------------------------------------------------- */
  function initMarquee() {
    var track = $("[data-marquee]");
    if (!track || !requestFrame || reducedQuery.matches) return;
    var group = $(".marquee__group", track);
    if (!group) return;
    var offset = 0;
    var last = 0;
    var frameId = null;
    var width = 0;
    var speed = 26;

    function measure() { width = group.getBoundingClientRect().width; }
    function frame(now) {
      if (!last) last = now;
      var delta = Math.min(now - last, 64);
      last = now;
      if (width > 0) {
        offset = (offset + speed * (delta / 1000)) % width;
        track.style.transform = "translate3d(" + (-offset).toFixed(2) + "px,0,0)";
      }
      frameId = requestFrame(frame);
    }
    function start() {
      if (frameId !== null) return;
      last = 0;
      frameId = requestFrame(frame);
    }
    function stop() {
      if (frameId !== null) cancelFrame(frameId);
      frameId = null;
    }

    measure();
    window.addEventListener("resize", measure, { passive: true });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !document.hidden) start();
          else stop();
        });
      }, { threshold: 0 });
      io.observe(track);
    } else {
      start();
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else {
        var rect = track.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) start();
      }
    });
  }

  /* --- About chapters --------------------------------------------------- */
  function initChapters() {
    var viewport = $(".chapters__viewport");
    var stage = $("#chapters-stage");
    if (!viewport || !stage) return;
    var slides = $$("[data-chapter]", stage);
    var dots = $$("[data-chapter-go]");
    var current = $("#chapter-current");
    var total = $("#chapter-total");
    var count = slides.length;
    if (!count) return;

    var active = 0;
    if (total) total.textContent = String(count).padStart(2, "0");

    function setInteractive(slide) {
      var isActive = slide.getAttribute("data-pos") === "0";
      slide.setAttribute("aria-hidden", String(!isActive));
      if ("inert" in slide) slide.inert = !isActive;
      $$("a, button", slide).forEach(function (el) {
        if (isActive) {
          el.removeAttribute("tabindex");
        } else {
          el.setAttribute("tabindex", "-1");
        }
      });
    }

    function go(index, updateHash) {
      active = ((index % count) + count) % count;
      slides.forEach(function (slide, i) {
        var distance = (i - active + count) % count;
        if (distance > count / 2) distance -= count;
        slide.setAttribute("data-pos", String(distance));
        setInteractive(slide);
      });
      dots.forEach(function (dot, i) {
        if (i === active) dot.setAttribute("aria-current", "step");
        else dot.removeAttribute("aria-current");
      });
      if (current) current.textContent = String(active + 1).padStart(2, "0");
      if (updateHash !== false) {
        try {
          window.history.replaceState(null, "", "#chapter-" + (active + 1));
        } catch (error) { /* file:// or restricted history — ignore */ }
      }
    }

    var next = $("#chapter-next");
    var prev = $("#chapter-prev");
    if (next) next.addEventListener("click", function () { go(active + 1); });
    if (prev) prev.addEventListener("click", function () { go(active - 1); });
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        go(Number(dot.getAttribute("data-chapter-go")) || 0);
      });
    });

    stage.addEventListener("click", function (event) {
      var slide = event.target.closest("[data-chapter]");
      if (!slide) return;
      var position = Number(slide.getAttribute("data-pos"));
      if (position === 1 || position === -1) {
        event.preventDefault();
        go(active + position);
      }
    });

    viewport.addEventListener("keydown", function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowRight") { event.preventDefault(); go(active + 1); }
      else if (event.key === "ArrowLeft") { event.preventDefault(); go(active - 1); }
      else if (event.key === "Home") { event.preventDefault(); go(0); }
      else if (event.key === "End") { event.preventDefault(); go(count - 1); }
    });

    var start = null;
    viewport.addEventListener("touchstart", function (event) {
      var touch = event.touches[0];
      if (!touch) return;
      start = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });

    viewport.addEventListener("touchend", function (event) {
      if (!start) return;
      var touch = event.changedTouches[0];
      start = null;
      if (!touch) return;
      var dx = touch.clientX - start.x;
      var dy = touch.clientY - start.y;
      if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      go(active + (dx < 0 ? 1 : -1));
    }, { passive: true });

    var mouseStart = null;
    viewport.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if (event.target.closest("button, a")) return;
      mouseStart = { x: event.clientX, y: event.clientY };
    });
    viewport.addEventListener("pointerup", function (event) {
      if (!mouseStart || event.pointerType !== "mouse") return;
      var dx = event.clientX - mouseStart.x;
      var dy = event.clientY - mouseStart.y;
      mouseStart = null;
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      go(active + (dx < 0 ? 1 : -1));
    });
    viewport.addEventListener("pointercancel", function () { mouseStart = null; });

    var pickers = $$("[data-chapter-project]", stage);
    var projectImage = $("#chapter-project-img");
    var projectLink = $("#chapter-project-link");
    pickers.forEach(function (button) {
      button.addEventListener("click", function () {
        var slug = button.getAttribute("data-chapter-project");
        var project = PROJECTS.filter(function (item) { return item.slug === slug; })[0];
        if (!project) return;
        pickers.forEach(function (other) {
          other.setAttribute("aria-pressed", String(other === button));
        });
        if (projectImage) {
          projectImage.src = project.cover;
          projectImage.alt = "Concept cover artwork for " + project.name + ", not an app screenshot";
        }
        if (projectLink) {
          projectLink.href = projectUrl(project);
          projectLink.innerHTML = "Open " + escapeHtml(project.name) + " case study " + arrow;
        }
      });
    });

    window.addEventListener("hashchange", function () {
      var match = window.location.hash.match(/^#chapter-([0-9]+)$/);
      if (match) go(Number(match[1]) - 1, false);
    });

    var hashMatch = window.location.hash.match(/^#chapter-([0-9]+)$/);
    go(hashMatch ? Number(hashMatch[1]) - 1 : 0, false);
  }

  /* --- Copy email ------------------------------------------------------- */
  function initCopyEmail() {
    var buttons = $$("[data-copy-email]");
    if (!buttons.length) return;
    var email = (DATA.contact || "devjeetx7@gmail.com").trim();
    var feedback = $("#copy-feedback");

    function legacyCopy(text) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-1000px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (error) { ok = false; }
      document.body.removeChild(textarea);
      return ok;
    }

    function announce(message, isError) {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.classList.toggle("is-error", !!isError);
      window.clearTimeout(feedback._timer);
      feedback._timer = window.setTimeout(function () {
        feedback.textContent = "";
        feedback.classList.remove("is-error");
      }, 4500);
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var done = function (ok) {
          if (ok) announce("Email copied to clipboard — " + email);
          else announce("Copy failed. The address is " + email, true);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(email).then(function () { done(true); }).catch(function () { done(legacyCopy(email)); });
        } else {
          done(legacyCopy(email));
        }
      });
    });
  }

  /* --- Small utilities -------------------------------------------------- */
  function initUtilities() {
    $$("[data-year]").forEach(function (node) { node.textContent = String(new Date().getFullYear()); });
    $$("[data-project-count]").forEach(function (node) { node.textContent = String(PROJECTS.length); });

    var clock = $("#local-time");
    if (clock) {
      var updateClock = function () {
        try {
          clock.textContent = new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }).format(new Date()) + " IST";
        } catch (error) {
          clock.textContent = "IST";
        }
      };
      updateClock();
      window.setInterval(updateClock, 60000);
    }
  }

  function init() {
    initHeader();
    initMenu();
    initActiveSection();
    renderFeatured();
    renderArchive();
    renderCaseStudy();
    initGitHub();
    initChapters();
    initCopyEmail();
    initMarquee();
    initStaticReveals();
    initUtilities();
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
