/* ==========================================================================
   AMÉDÉE RÉNOVATION — JS principal
   ========================================================================== */

(function () {
  "use strict";

  /* ============ HEADER + SCROLL-TOP : effet scroll ============ */
  const header = document.getElementById("header");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const scrollTopBar = scrollTopBtn ? scrollTopBtn.querySelector(".scroll-top__bar") : null;

  const onScroll = () => {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? Math.min(Math.max(y / docHeight, 0), 1) : 0;

    if (header) {
      if (y > 30) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }

    if (scrollTopBtn) {
      if (y > window.innerHeight * 0.4) scrollTopBtn.classList.add("is-visible");
      else scrollTopBtn.classList.remove("is-visible");
    }

    if (scrollTopBar) {
      // pathLength=100 → 0 = anneau plein, 100 = anneau vide
      scrollTopBar.style.strokeDashoffset = String(100 - ratio * 100);
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============ MENU OVERLAY (mobile / burger) ============ */
  const burger = document.querySelector(".header__burger");
  const FB_URL = "https://www.facebook.com/people/Amedee-r%C3%A9novation/61581433885918/";

  const overlayHTML = `
    <div class="menu-overlay" id="menuOverlay" aria-hidden="true" role="dialog" aria-label="Menu de navigation">
      <div class="menu-overlay__bg-letter" aria-hidden="true">AMEDEE</div>

      <div class="menu-overlay__top">
        <a href="index.html" class="menu-overlay__logo" aria-label="Amédée Rénovation - Accueil">
          <img src="assets/images/Logo_AmedeeBatiment.png" alt="Amédée Rénovation">
        </a>
        <button type="button" class="menu-overlay__close" aria-label="Fermer le menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <nav class="menu-overlay__nav" aria-label="Navigation principale">
        <ul class="menu-overlay__list">
          <li><a href="index.html">Accueil</a></li>
          <li><a href="a-propos.html">À propos</a></li>
          <li>
            <div class="menu-overlay__service-row">
              <a href="index.html#services">Services</a>
              <button type="button" class="menu-overlay__sub-toggle" aria-label="Afficher les services" aria-expanded="false"></button>
            </div>
            <ul class="menu-overlay__sub">
              <li><a href="toiture-couverture.html">Toiture : neuf &amp; rénovation</a></li>
              <li><a href="charpente-isolation.html">Charpente &amp; isolation</a></li>
              <li><a href="etancheite-toiture.html">Étanchéité de toiture</a></li>
              <li><a href="maconnerie-generale.html">Maçonnerie générale</a></li>
            </ul>
          </li>
          <li><a href="zones-intervention.html">Zones d'intervention</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>

      <div class="menu-overlay__footer">
        <div class="menu-overlay__footer-contact">
          <a href="tel:+33633393195" class="menu-overlay__footer-phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            06 33 39 31 95
          </a>
          <a href="mailto:williamamedeeartisan@gmail.com">williamamedeeartisan@gmail.com</a>
        </div>
        <a href="${FB_URL}" target="_blank" rel="noopener">Facebook ↗</a>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", overlayHTML);
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = overlay.querySelector(".menu-overlay__close");
  const subToggle = overlay.querySelector(".menu-overlay__sub-toggle");
  const subMenu = overlay.querySelector(".menu-overlay__sub");

  const openMenu = () => {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    if (burger) burger.setAttribute("aria-expanded", "true");
  };
  const closeMenu = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
    // reset sub-menu
    subMenu.classList.remove("is-open");
    subToggle.classList.remove("is-active");
    subToggle.setAttribute("aria-expanded", "false");
  };

  if (burger) {
    burger.addEventListener("click", openMenu);
  }
  closeBtn.addEventListener("click", closeMenu);

  /* Sous-menu Services toggle */
  subToggle.addEventListener("click", () => {
    const isOpen = subMenu.classList.toggle("is-open");
    subToggle.classList.toggle("is-active", isOpen);
    subToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* Click sur un lien → fermer le menu */
  overlay.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* Escape key */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeMenu();
    }
  });

  /* ============ ANIMATIONS GSAP ============ */
  const initAnimations = () => {
    if (typeof window.gsap === "undefined") return;

    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    /* --- Intro Hero (style poster) --- */
    gsap.set(".hero__bg img", { scale: 1.15 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".hero__bg img", {
      scale: 1,
      duration: 2.2,
      ease: "power2.out",
    })
    .from(".hero__kicker", {
      y: -20,
      opacity: 0,
      duration: 0.8,
    }, "-=1.8")
    .from(".hero__title-line", {
      yPercent: 105,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power4.out",
    }, "-=1.5")
    .from(".hero__sticker--left", {
      scale: 0,
      rotate: -180,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.6)",
    }, "-=0.6")
    .from(".hero__sticker--cta", {
      scale: 0,
      rotate: 180,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.6)",
    }, "-=0.7")
    .from(".hero__bottom > *", {
      y: 16,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
    }, "-=0.4")
    .from(".hero__strip", {
      yPercent: 100,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    }, "-=0.4");

    /* --- Parallax léger sur la photo de fond --- */
    if (window.ScrollTrigger) {
      gsap.to(".hero__bg img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero__title", {
        yPercent: -10,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        },
      });

      /* --- Section Services : reveal au scroll --- */
      gsap.from(".services__eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services",
          start: "top 80%",
        },
      });
      gsap.from(".services__title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services",
          start: "top 78%",
        },
      });
      gsap.from(".services__intro", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services",
          start: "top 76%",
        },
      });
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services__grid",
          start: "top 82%",
        },
      });

      /* --- Section About / Travail soigné --- */
      gsap.from(".about__photo--main", {
        scale: 0.94,
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about", start: "top 78%" },
      });
      gsap.from(".about__photo--accent", {
        scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".about", start: "top 75%" },
      });
      gsap.from(".about__sticker", {
        scale: 0,
        rotate: 180,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".about", start: "top 70%" },
      });
      gsap.from(".about__eyebrow, .about__title, .about__text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about__content", start: "top 80%" },
      });
      gsap.from(".about__badge", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about__badges", start: "top 88%" },
      });
      gsap.from(".about__checks li", {
        x: -16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about__checks", start: "top 90%" },
      });
      gsap.from(".about__footer > *", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about__footer", start: "top 92%" },
      });

      /* --- Parallax photos About --- */
      gsap.to(".about__photo--main", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".about__photo--accent", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* --- Section Zone d'intervention --- */
      gsap.from(".zone__eyebrow, .zone__title, .zone__text", {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".zone__head", start: "top 78%" },
      });
      gsap.from(".zone__city", {
        y: 20,
        scale: 0.9,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".zone__cities", start: "top 85%" },
      });
      gsap.from(".zone__cta > *", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".zone__cta", start: "top 90%" },
      });

      /* --- CTA band (pré-footer) --- */
      gsap.from(".cta-band__eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-band", start: "top 80%" },
      });
      gsap.from(".cta-band__title", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-band", start: "top 78%" },
      });
      gsap.from(".cta-band__cta", {
        scale: 0,
        rotate: 180,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".cta-band", start: "top 75%" },
      });
      gsap.to(".cta-band__bg-letter", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".cta-band",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* --- Footer reveal --- */
      gsap.from(".footer__col", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer__top", start: "top 90%" },
      });

      /* --- Page Hero (pages secondaires) --- */
      if (document.querySelector(".page-hero")) {
        const phTL = gsap.timeline({ defaults: { ease: "power3.out" } });
        phTL
          .from(".page-hero__breadcrumb", { y: 20, opacity: 0, duration: 0.7 })
          .from(".page-hero__title", { y: 40, opacity: 0, duration: 0.95 }, "-=0.4")
          .from(".page-hero__subtitle", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5");

        gsap.to(".page-hero__bg img", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".page-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* --- Pillars (3 engagements) --- */
      if (document.querySelector(".pillars")) {
        gsap.from(".pillars__eyebrow, .pillars__title", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pillars", start: "top 78%" },
        });
        gsap.from(".pillar-card", {
          y: 50,
          opacity: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pillars__grid", start: "top 82%" },
        });
      }

      /* --- Zones intro (page zones-intervention) --- */
      if (document.querySelector(".zones-intro")) {
        gsap.from(".zones-intro__eyebrow, .zones-intro__title, .zones-intro__text, .zones-intro__content .btn", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".zones-intro", start: "top 78%" },
        });
        gsap.from(".zones-intro__list", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".zones-intro__list", start: "top 85%" },
        });
        gsap.from(".zones-intro__list .check-list li", {
          x: -16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: ".zones-intro__list", start: "top 80%" },
        });
      }

      /* --- Service detail (page service) --- */
      if (document.querySelector(".service-detail")) {
        gsap.from(".service-detail__eyebrow, .service-detail__title", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".service-detail", start: "top 80%" },
        });
        gsap.from(".service-detail__photo", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".service-detail__photo", start: "top 85%" },
        });
        gsap.from(".service-detail__text > *", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".service-detail__text", start: "top 85%" },
        });
        gsap.from(".service-nav, .service-cta", {
          y: 40,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".service-detail__sidebar", start: "top 85%" },
        });
      }

      /* --- FAQ --- */
      if (document.querySelector(".faq")) {
        gsap.from(".faq__eyebrow, .faq__title", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq", start: "top 80%" },
        });
        gsap.from(".faq-item", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq__list", start: "top 85%" },
        });
      }

      /* --- Contact page --- */
      if (document.querySelector(".contact")) {
        gsap.from(".contact__eyebrow, .contact__title, .contact__text", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact__info", start: "top 80%" },
        });
        gsap.from(".contact-card", {
          x: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact__cards", start: "top 88%" },
        });
        gsap.from(".contact__form", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact__form", start: "top 85%" },
        });
      }

      /* --- Zones howto --- */
      if (document.querySelector(".zones-howto")) {
        gsap.from(".zones-howto__title, .zones-howto__lead", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".zones-howto", start: "top 78%" },
        });
        gsap.from(".howto-card", {
          y: 50,
          opacity: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: ".zones-howto__grid", start: "top 82%" },
        });
      }

      /* --- CTA Photo (pré-footer pages) --- */
      if (document.querySelector(".cta-photo")) {
        gsap.from(".cta-photo__eyebrow, .cta-photo__title, .cta-photo__cta", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-photo", start: "top 78%" },
        });
      }
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimations);
  } else {
    initAnimations();
  }
  window.addEventListener("load", () => {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
})();
