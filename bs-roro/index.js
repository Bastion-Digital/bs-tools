(function () {
  let _this = this;
  const prefix = "bs-roro-";

  const defaults = {
    type: "text",
    onEvent: "mouseover",
    offEvent: "mouseout",
    alt: "Te Reo",
    class: "bs-roro-active",
    duration: "0",
  };

  getAttr = (el, attr) => {
    const elAttr = el.getAttribute(prefix + attr);
    if (elAttr) return elAttr;
    else return defaults[attr];
  };

  document.querySelectorAll("[bs-roro-type]").forEach((el) => {
    const cfg = {
      type: getAttr(el, "type"),
      onEvent: getAttr(el, "onEvent"),
      offEvent: getAttr(el, "offEvent"),
      alt: getAttr(el, "alt"),
      class: getAttr(el, "class"),
      duration: getAttr(el, "duration"),
    };

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
