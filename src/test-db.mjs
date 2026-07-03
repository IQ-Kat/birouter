import sqlite from 'node:sqlite';
import path from 'node:path';
import os from 'node:os';

const db1 = 'C:\\Users\\ikbal\\AppData\\Roaming\\birouter\\db\\data.sqlite';
const db2 = 'D:\\DataApp\\birouter\\db\\data.sqlite';

function dumpDb(dbPath, name) {
  console.log(`\n=== DUMPING ${name} (${dbPath}) ===`);
  try {
    const db = new sqlite.DatabaseSync(dbPath);
    const query = db.prepare('SELECT id, provider, isActive, authType, name FROM providerConnections');
    const rows = query.all();
    console.log("CONNECTIONS:", JSON.stringify(rows, null, 2));
  } catch (e) {
    console.error("Error reading database:", e.message);
  }
}

dumpDb(db1, "AppData Database");
dumpDb(db2, "DataApp Database");
