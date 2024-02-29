declare module '*.glb' {
  const content: string | string[];
  export default content;
}
declare module 'use-sound' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const content: Function;
  export default content;
}
