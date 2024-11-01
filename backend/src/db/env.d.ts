declare namespace NodeJS {
    interface ProcessEnv {
      MONOGO_DB_URL : string;
      JWT_SECRET : string;
    }
  }