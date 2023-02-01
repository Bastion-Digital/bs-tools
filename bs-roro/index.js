(function () {
  let _this = this;
  const prefix = "bs-roro-";

  getAttr = (el, attr) => el.getAttribute(prefix + attr);

  document.querySelectorAll("[bs-roro-type]").forEach((el) => {
    const cfg = {
      type: getAttr(el, "type"),
      onEvent: getAttr(el, "onEvent"),
      offEvent: getAttr(el, "offEvent"),
      alt: getAttr(el, "alt"),
      class: getAttr(el, "class"),
      duration: getAttr(el, "duration"),
    };

    const transitionDuration = window
      .getComputedStyle(el)
      .getPropertyValue("transition-duration");
    console.log(transitionDuration);
    if (cfg.type === "text") {
      cfg.original = el.innerText;
      try {
        el.addEventListener(cfg.onEvent, (evt) => {
          if (el.innerText === cfg.alt) return;
          el.style.opacity = 0;
          setTimeout(() => {
            el.classList.add(cfg.class);
            el.innerText = cfg.alt;
            el.style.opacity = 1;
          }, cfg.duration);
        });
        el.addEventListener(cfg.offEvent, (evt) => {
          if (el.innerText === cfg.original) return;
          el.style.opacity = 0;
          setTimeout(() => {
            el.classList.remove(cfg.class);
            el.innerText = cfg.original;
            el.style.opacity = 1;
          }, cfg.duration);
        });
      } catch (e) {
        console.log(e);
      }
    }

    if (cfg.type === "src") {
      cfg.original = el.src;

      (function () {
        let img = new Image();
        img.src = cfg.alt;
      })();

      try {
        el.addEventListener(cfg.onEvent, (evt) => {
          if (el.src === cfg.alt) return;
          el.style.opacity = 0;
          setTimeout(() => {
            el.classList.add(cfg.class);
            el.src = cfg.alt;
            el.style.opacity = 1;
          }, cfg.duration);
        });
        el.addEventListener(cfg.offEvent, (evt) => {
          if (el.src === cfg.original) return;
          el.style.opacity = 0;
          setTimeout(() => {
            el.classList.remove(cfg.class);
            el.src = cfg.original;
            el.style.opacity = 1;
          }, cfg.duration);
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
})();
