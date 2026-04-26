-- 028_compression_settings.sql
-- Insert default compression settings into key_value table (namespace='compression')
-- Uses INSERT OR REPLACE for idempotency

INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression', 'enabled', 'false');
INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression', 'defaultMode', '"off"');
INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression', 'autoTriggerTokens', '0');
INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression', 'cacheMinutes', '5');
INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression', 'preserveSystemPrompt', 'true');
INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression', 'comboOverrides', '{}');
