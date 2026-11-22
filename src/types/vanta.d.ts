declare module 'vanta/dist/vanta.clouds.min.js' {
  interface VantaEffect {
    destroy: () => void;
  }
  const CLOUDS: (options: Record<string, unknown>) => VantaEffect;
  export default CLOUDS;
}
