// Dissolve (Thanos snap) effect for any HTMLElement using the global SVG filter.
export const useDissolve = () => {
  const setRandomSeed = () => {
    const turb = document.getElementById(
      "dissolve-filter-turbulence"
    ) as SVGFETurbulenceElement | null;
    if (turb) turb.setAttribute("seed", String(Math.random() * 1000));
  };

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const maxDisplacementScale = 2000;

  /**
   * Dissolve an element.
   * @param el Element to dissolve.
   * @param opts duration (ms), remove (if true, remove from DOM; otherwise hide)
   */
  const dissolve = (
    el: HTMLElement,
    opts?: { duration?: number; remove?: boolean }
  ) => {
    if (!el || el.dataset.beingDestroyed === "true") return;

    const displacement = document.getElementById(
      "dissolve-filter-displacement"
    ) as SVGFEDisplacementMapElement | null;
    if (!displacement) return;

    setRandomSeed();
    el.style.filter = "url(#dissolve-filter)";

    const duration = opts?.duration ?? 1000;
    const start = performance.now();
    el.dataset.beingDestroyed = "true";

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const dispScale = easeOutCubic(progress) * maxDisplacementScale;

      displacement.setAttribute("scale", String(dispScale));

      // Optional: small zoom to sell the effect
      el.style.transform = `scale(${1 + 0.05 * progress})`;

      // Optional: fade out
      const opacity = progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2;
      el.style.opacity = String(Math.max(0, opacity));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        displacement.setAttribute("scale", "0");
        el.style.filter = "none";
        el.style.transform = "";
        if (opts?.remove) {
          el.remove();
        } else {
          el.style.display = "none";
        }
        el.dataset.beingDestroyed = "false";
      }
    };

    requestAnimationFrame(step);
  };

  return { dissolve };
};
