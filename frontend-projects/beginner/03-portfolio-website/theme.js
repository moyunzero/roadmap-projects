/**
 * 深色模式切换（加分项）
 * - 记住用户选择：localStorage
 * - 无选择时跟随系统 prefers-color-scheme
 * - 按钮文案固定为 "Dark mode"，不改文字：可访问名称 = 可见文字（WCAG 2.5.3）
 * - aria-pressed 表示深色是否开启，状态交给它，不再用文字表达
 */
(function () {
  var STORAGE_KEY = "portfolio-theme";
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* 隐私模式可能写不了，忽略即可 */
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (button) {
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  function resolveInitial() {
    var stored = getStored();
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme(resolveInitial());

  if (button) {
    button.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      setStored(next);
    });
  }
})();
