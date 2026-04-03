function extractExplicitPort(urlStr) {
  try {
    const idx = urlStr.indexOf("://");
    if (idx === -1) return null;
    const authorityStart = idx + 3;
    const authorityEnd = urlStr.indexOf("/", authorityStart);
    const authority =
      authorityEnd === -1
        ? urlStr.slice(authorityStart)
        : urlStr.slice(authorityStart, authorityEnd);
    const lastColon = authority.lastIndexOf(":");
    const atSign = authority.lastIndexOf("@");
    // The colon must be AFTER the @ sign (if any) to be the port colon
    if (lastColon !== -1 && lastColon > atSign) {
      const portStr = authority.slice(lastColon + 1);
      if (/^\d+$/.test(portStr)) {
        const port = Number(portStr);
        if (Number.isInteger(port) && port >= 1 && port <= 65535) return String(port);
      }
    }
  } catch {}
  return null;
}

console.log(extractExplicitPort("http://localhost:80"));
console.log(extractExplicitPort("http://u:p@localhost:80/path?q=1"));
console.log(extractExplicitPort("http://u:p@localhost/path:80"));
console.log(extractExplicitPort("http://u:p@localhost"));
