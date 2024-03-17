declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
        }
    }
}

declare module 'express-session' {
    interface Session {
      accountId: number;
    }
}

export {};
