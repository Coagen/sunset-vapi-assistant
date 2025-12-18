export {};

declare global {
  interface Window {
    vapiSDK: {
      run: (config: any) => any;
    };
    vapiInstance: any;
  }
}