/* ============================================================
   Dr. Rajaram Tripathi — interactions
   Vanilla JS, no dependencies. Respects reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
          setTimeout(function () { el.classList.add("is-visible"); }, delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 2. Animated stat counters ---------- */
  function formatNumber(value, decimals) {
    if (decimals > 0) return value.toFixed(decimals);
    return Math.round(value).toLocaleString("en-IN");
  }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = formatNumber(target, decimals) + suffix; return; }
    var duration = 1700, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = formatNumber(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = formatNumber(target, decimals) + suffix;
    }
    requestAnimationFrame(step);
  }
  var statNums = Array.prototype.slice.call(document.querySelectorAll(".stats__number[data-count]"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    statNums.forEach(function (el) { countObserver.observe(el); });
  } else {
    statNums.forEach(animateCount);
  }

  /* ---------- 3. Biography index scrollspy ---------- */
  var bioEntries = Array.prototype.slice.call(document.querySelectorAll(".bio-entry"));
  var bioLinks = Array.prototype.slice.call(document.querySelectorAll("#bioIndex a"));
  if (bioEntries.length && bioLinks.length && "IntersectionObserver" in window) {
    var linkById = {};
    bioLinks.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href) linkById[href.slice(1)] = a;
    });
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      // pick the entry with greatest visibility
      var bestId = null, bestRatio = 0;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > bestRatio) { bestRatio = visible[id]; bestId = id; }
      });
      if (bestId) {
        bioLinks.forEach(function (a) { a.classList.remove("is-active"); });
        if (linkById[bestId]) linkById[bestId].classList.add("is-active");
      }
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] });
    bioEntries.forEach(function (el) { spy.observe(el); });
  }

  /* ---------- 4. Progress + nav + parallax ---------- */
  var progressBar = document.getElementById("progressBar");
  var nav = document.getElementById("nav");
  var heroPhoto = document.getElementById("heroPhoto");
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var ticking = false;

  function onScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
    if (nav) nav.classList.toggle("is-scrolled", scrollTop > 12);

    if (!reduceMotion) {
      if (heroPhoto) heroPhoto.style.transform = "translateY(" + Math.min(scrollTop * 0.1, 50) + "px)";
      parallaxEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0;
        var img = el.querySelector("img");
        if (img && rect.top < window.innerHeight && rect.bottom > 0) {
          var centerOffset = (rect.top + rect.height / 2) - window.innerHeight / 2;
          img.style.transform = "translateY(" + (-centerOffset * speed) + "px)";
        }
      });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- 5. Active top-nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (this.getAttribute("href")) {
        navLinks.forEach(function (l) { l.classList.remove("nav__link--active"); });
        this.classList.add("nav__link--active");
      }
    });
  });
})();
