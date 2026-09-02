/* DMV Restorations — homepage interactions */
(function () {
  "use strict";

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector("[data-header]");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 8) header.setAttribute("data-scrolled", "");
    else header.removeAttribute("data-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  var scrim = document.querySelector("[data-scrim]");
  var closeBtn = document.querySelector("[data-menu-close]");

  function openMenu() {
    menu.setAttribute("data-open", "");
    scrim.setAttribute("data-open", "");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    menu.removeAttribute("data-open");
    scrim.removeAttribute("data-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (toggle) toggle.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (scrim) scrim.addEventListener("click", closeMenu);
  if (menu) {
    menu.querySelectorAll("a[href^='#']").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu && menu.hasAttribute("data-open")) closeMenu();
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.setAttribute("data-visible", ""); });
  }

  /* ---------- Portfolio filter ---------- */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll("#gallery .gcard");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      filters.forEach(function (f) { f.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      cards.forEach(function (card) {
        var show = cat === "all" || card.getAttribute("data-cat") === cat;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Estimate form (demo) ---------- */
  var form = document.getElementById("estimate-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var success = form.querySelector("[data-success]");
      if (success) {
        success.setAttribute("data-show", "");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  }

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
