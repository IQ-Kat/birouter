// Minimal Birouter CLI plugin example.
// Usage:
//   1. Copy this folder to ~/.birouter/plugins/birouter-cmd-hello/
//   2. Run `birouter hello`
// See docs/dev/plugins.md for the full plugin contract.

export const meta = {
  name: "birouter-cmd-hello",
  version: "0.1.0",
  description: "Hello-world Birouter CLI plugin example.",
  birouterApi: ">=3.0.0",
};

export function register(program, ctx) {
  program
    .command("hello")
    .description(meta.description)
    .option("-n, --name <name>", "name to greet", "world")
    .action(async (opts, _cmd) => {
      ctx.emit({ message: `Hello, ${opts.name}!`, plugin: meta.name }, opts);
    });
}
