(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero background video (landing page only) ---------- */
  var heroVideo = document.querySelector(".hero-video");
  if (heroVideo && !reduceMotion) {
    heroVideo.setAttribute("autoplay", "");
    var playPromise = heroVideo.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(function () {});
    }
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Service panel tabs (space / basic-extra tabs) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var buttons = Array.prototype.slice.call(group.querySelectorAll(".tab-btn"));
    var panelsWrap = group.querySelector("[data-tab-panels]") || group;
    var panels = Array.prototype.slice.call(panelsWrap.querySelectorAll(".tab-panel"));

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab-target");
        buttons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        panels.forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-tab") === target);
        });
      });
    });
  });
})();
