/* =========================================================
   CIOS HTML Course Book — Shared Script
   Handles: reading progress bar, mobile sidebar toggle,
   lesson completion tracking (saved in localStorage).
   ========================================================= */

(function () {
  "use strict";

  var STORAGE_KEY = "ciosHtmlCourseProgress";
  var TOTAL_LESSONS = 16;

  function getProgress() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveProgress(list) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) { /* storage unavailable — fail silently */ }
  }

  function refreshSidebarProgress() {
    var done = getProgress();
    var links = document.querySelectorAll(".nav-list a[data-lesson-id]");
    links.forEach(function (a) {
      if (done.indexOf(a.getAttribute("data-lesson-id")) !== -1) {
        a.classList.add("done");
      } else {
        a.classList.remove("done");
      }
    });
    var fill = document.querySelector(".sidebar-progress__fill");
    var label = document.querySelector(".sidebar-progress__count");
    var pct = Math.round((done.length / TOTAL_LESSONS) * 100);
    if (fill) fill.style.width = pct + "%";
    if (label) label.textContent = done.length + " / " + TOTAL_LESSONS;
  }

  function setupMarkComplete() {
    var btn = document.querySelector(".mark-complete button");
    if (!btn) return;
    var lessonId = btn.getAttribute("data-lesson-id");

    function render() {
      var done = getProgress();
      var isDone = done.indexOf(lessonId) !== -1;
      btn.classList.toggle("is-done", isDone);
      btn.textContent = isDone ? "✓ Lesson Completed" : "Mark Lesson as Complete";
    }

    btn.addEventListener("click", function () {
      var done = getProgress();
      var idx = done.indexOf(lessonId);
      if (idx === -1) {
        done.push(lessonId);
      } else {
        done.splice(idx, 1);
      }
      saveProgress(done);
      render();
      refreshSidebarProgress();
    });

    render();
  }

  function setupMobileSidebar() {
    var toggle = document.querySelector(".sidebar-toggle");
    var sidebar = document.querySelector(".sidebar");
    var scrim = document.querySelector(".sidebar-scrim");
    if (!toggle || !sidebar) return;

    function close() {
      sidebar.classList.remove("open");
      if (scrim) scrim.classList.remove("show");
    }

    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      if (scrim) scrim.classList.toggle("show", sidebar.classList.contains("open"));
    });
    if (scrim) scrim.addEventListener("click", close);
  }

  function setupReadingProgress() {
    var fill = document.querySelector(".top-progress__fill");
    if (!fill) return;
    function update() {
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var height = (doc.scrollHeight - doc.clientHeight) || 1;
      var pct = Math.min(100, Math.max(0, (scrollTop / height) * 100));
      fill.style.width = pct + "%";
    }
    document.addEventListener("scroll", update, { passive: true });
    update();
  }

  document.addEventListener("DOMContentLoaded", function () {
    refreshSidebarProgress();
    setupMarkComplete();
    setupMobileSidebar();
    setupReadingProgress();
  });
})();
