declare global {
    namespace NodeJS {
      interface ProcessEnv {
        URI: string;
        PORT?: string;
        SECRET: string;
      }
    }
  }
  
export {};
  