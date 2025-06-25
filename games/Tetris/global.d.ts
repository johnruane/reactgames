declare global {
  interface CellPosition {
    r: number;
    c: number;
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

export {};
