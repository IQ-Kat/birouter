export function registerProvider(program) {
  program
    .command("provider [subcommand]")
    .description("Manage provider connections (use 'providers' for the full interface)")
    .allowUnknownOption()
    .allowExcessArguments()
    .action(() => {
      console.log(`
  Use \`birouter providers\` for the full provider management interface:

    birouter providers available   — show provider catalog
    birouter providers list        — list configured connections
    birouter providers test <name> — test a provider connection
    birouter providers test-all    — test all active connections
    birouter providers validate    — validate local configuration
`);
    });
}
