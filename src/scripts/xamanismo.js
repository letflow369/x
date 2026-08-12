(() => {
  "use strict";

  document.documentElement.classList.add("has-js");

  const navLinks = Array.from(document.querySelectorAll('.shaman-sidenav a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach((link) => link.removeAttribute("aria-current"));
      const active = navLinks.find((link) => link.getAttribute("href") === `#${visible.target.id}`);
      if (active) active.setAttribute("aria-current", "location");
    }, { rootMargin: "-16% 0px -68% 0px", threshold: [0.05, 0.2, 0.45] });

    sections.forEach((section) => observer.observe(section));
  }

  const mapPins = Array.from(document.querySelectorAll("[data-map-target]"));
  const mapCases = Array.from(document.querySelectorAll("[data-map-case]"));

  const activateCase = (id, updateHash = false) => {
    const target = document.getElementById(id);
    if (!target) return;
    mapCases.forEach((item) => item.classList.toggle("is-active", item.id === id));
    mapPins.forEach((pin) => {
      if (pin.dataset.mapTarget === id) pin.setAttribute("aria-current", "true");
      else pin.removeAttribute("aria-current");
    });
    if (updateHash && history.replaceState) history.replaceState(null, "", `#${id}`);
  };

  if (mapCases.length) {
    const initialMapCase = window.location.hash.startsWith("#case-")
      ? window.location.hash.slice(1)
      : mapCases[0].id;
    activateCase(initialMapCase);
  }

  mapPins.forEach((pin) => {
    pin.addEventListener("click", (event) => {
      event.preventDefault();
      activateCase(pin.dataset.mapTarget, true);
    });
  });

  const filterGroup = document.querySelector(".shaman-reference-filters");
  if (filterGroup) filterGroup.hidden = false;
  const filterButtons = Array.from(document.querySelectorAll("[data-reference-filter]"));
  const references = Array.from(document.querySelectorAll(".shaman-reference-list [data-reference-type]"));

  const setReferenceFilter = (filter) => {
    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.referenceFilter === filter));
    });
    references.forEach((reference) => {
      reference.hidden = filter !== "all" && reference.dataset.referenceType !== filter;
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => setReferenceFilter(button.dataset.referenceFilter));
  });

  document.addEventListener("click", (event) => {
    const citation = event.target.closest('a[href^="#ref-"]');
    if (!citation) return;
    const target = document.querySelector(citation.getAttribute("href"));
    if (!(target instanceof HTMLDetailsElement)) return;
    if (target.hidden) setReferenceFilter("all");
    target.open = true;
  });

  if (window.location.hash.startsWith("#ref-")) {
    const target = document.querySelector(window.location.hash);
    if (target instanceof HTMLDetailsElement) {
      setReferenceFilter("all");
      target.open = true;
    }
  }
})();
