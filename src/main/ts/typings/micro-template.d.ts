// typings/micro-template.d.ts

declare module 'micro-template' {
  function template(id: string): Function;
  function template(id: string, data: any): string;

  function extended(id: string): Function;
  function extended(id: string, data: any): string;

  namespace template {
    let variable: string;
  }
}
