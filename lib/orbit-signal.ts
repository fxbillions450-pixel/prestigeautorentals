// Scroll signal shared between the pinned hero stage and the R3F OrbitScene.
// The stage scrubs `progress` 0->1 to drive a full 360 camera orbit around the
// car; `idle: true` (reduced-motion / mobile) makes the camera auto-orbit on a
// time base instead. Module-level so it crosses the Canvas boundary cheaply.
export const orbitScroll = { progress: 0, idle: false };
