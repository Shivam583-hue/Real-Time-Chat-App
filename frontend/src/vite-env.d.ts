/// <reference types="vite/client" />
declare module '*.scss' {
    const content: string;
    export default content;
  }

declare module 'react-dom/client' {
  export * from 'react-dom/client';
}