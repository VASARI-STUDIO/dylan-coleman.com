// Tiny signal between the hero canvas and the Preloader.
//
// The Preloader used to wait on `window.load`, which does not fire until every
// image on the page has downloaded — including the whole hero frame sequence.
// That made the curtain sit there for its full timeout and then lift onto a
// blank canvas. Now the hero announces itself as soon as its FIRST frame is
// painted, and the Preloader lifts on that instead.

const EVENT = "hero:ready";

let fired = false;

/** Called by the hero canvas once its first frame has been drawn. */
export function markHeroReady() {
  if (fired) return;
  fired = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

/**
 * Run `cb` when the hero's first frame is up. Fires immediately if that already
 * happened before this subscriber attached (the Preloader and the canvas mount
 * in the same tick, so the race is real). Returns an unsubscribe function.
 */
export function onHeroReady(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (fired) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(EVENT, handler, { once: true });
  return () => window.removeEventListener(EVENT, handler);
}
