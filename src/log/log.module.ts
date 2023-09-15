import { Module } from '@nestjs/common';
import { SQLITE_CONNECTION } from './commons/constants';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as Database from 'better-sqlite3';
import { LoggingService } from './commons/logging-service';

@Module({
    providers: [
        {
            provide: SQLITE_CONNECTION,
            useFactory: async () => {
                const sqlite = new Database('src/log/commons/logs.db');
                sqlite.pragma('journal_mode = WAL');
                const db: BetterSQLite3Database = drizzle(sqlite);
                migrate(db, { migrationsFolder: "src/log/commons/migrations" });
                return db;
            },
        },
        LoggingService
    ],
    exports: [
        SQLITE_CONNECTION,
        LoggingService
    ],
})
export class LogModule { }
