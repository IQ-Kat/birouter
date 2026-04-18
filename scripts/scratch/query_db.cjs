const Database = require('better-sqlite3');
const db = new Database(process.env.HOME + '/.omniroute/storage.sqlite');

const providers = db.prepare("SELECT * FROM provider_connections").all();
console.log("=== provider_connections ===");
console.log(providers.filter(p => JSON.stringify(p).toLowerCase().includes('iflow')));

const combos = db.prepare("SELECT * FROM combos").all();
console.log("=== combos ===");
console.log(combos.filter(c => JSON.stringify(c).toLowerCase().includes('iflow')));

const settings = db.prepare("SELECT * FROM settings").all();
console.log("=== settings ===");
console.log(settings.filter(s => JSON.stringify(s).toLowerCase().includes('iflow')));

const apiKeys = db.prepare("SELECT * FROM api_keys").all();
console.log("=== api_keys ===");
console.log(apiKeys.map(k => ({...k, key: "[REDACTED]"})).filter(k => JSON.stringify(k).toLowerCase().includes('iflow')));
