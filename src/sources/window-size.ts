// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getWindowSize() {
  return {
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  };
}
