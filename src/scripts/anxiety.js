(() => {
  "use strict";

  const initializeInternalNavigation = () => {
    const links = Array.from(
      document.querySelectorAll(
        ".anxiety-desktop-nav a[href^='#'], .anxiety-mobile-nav a[href^='#']"
      )
    );

    if (!links.length) return;

    const ids = [...new Set(links.map((link) => link.hash.slice(1)))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const setCurrent = (id) => {
      links.forEach((link) => {
        if (link.hash === `#${id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    links.forEach((link) => {
      link.addEventListener("click", () => {
        setCurrent(link.hash.slice(1));
        const mobileMenu = link.closest("details");
        if (mobileMenu) mobileMenu.open = false;
      });
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (visible) setCurrent(visible.target.id);
        },
        {
          rootMargin: "-18% 0px -65% 0px",
          threshold: [0.05, 0.2, 0.5],
        }
      );

      sections.forEach((section) => observer.observe(section));
    }

    setCurrent("visao-geral");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeInternalNavigation, {
      once: true,
    });
  } else {
    initializeInternalNavigation();
  }
})();
