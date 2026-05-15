import { Argument } from "commander";
import { t } from "../i18n.mjs";

const VALID_SHELLS = ["bash", "zsh", "fish"];

export function registerCompletion(program) {
  program
    .command("completion")
    .description("Generate shell completion script")
    .addArgument(new Argument("<shell>", "Shell type").choices(VALID_SHELLS))
    .action(async (shell) => {
      const exitCode = await runCompletionCommand(shell);
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runCompletionCommand(shell) {
  switch (shell) {
    case "bash":
      console.log(generateBashCompletion());
      return 0;
    case "zsh":
      console.log(generateZshCompletion());
      return 0;
    case "fish":
      console.log(generateFishCompletion());
      return 0;
    default:
      console.error(`Invalid shell '${shell}'. Valid: ${VALID_SHELLS.join(", ")}`);
      return 1;
  }
}

function generateBashCompletion() {
  return `#!/bin/bash
# OmniRoute CLI Bash Completion

_omniroute() {
  local cur prev opts cmds
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"

  opts="--help --version"
  cmds="setup doctor status logs providers config test update serve stop restart keys models combo completion dashboard backup restore health quota cache mcp a2a tunnel env"

  case "\${prev}" in
    setup) COMPREPLY=($(compgen -W "--password --add-provider --non-interactive" -- \${cur})); return 0 ;;
    logs)  COMPREPLY=($(compgen -W "--lines --level --follow" -- \${cur})); return 0 ;;
    keys)  COMPREPLY=($(compgen -W "add list remove" -- \${cur})); return 0 ;;
    models) COMPREPLY=($(compgen -W "--json --search openai anthropic google groq" -- \${cur})); return 0 ;;
    combo) COMPREPLY=($(compgen -W "list switch create delete" -- \${cur})); return 0 ;;
    providers) COMPREPLY=($(compgen -W "available list test test-all validate" -- \${cur})); return 0 ;;
    config) COMPREPLY=($(compgen -W "list get set validate" -- \${cur})); return 0 ;;
    completion) COMPREPLY=($(compgen -W "bash zsh fish" -- \${cur})); return 0 ;;
    serve) COMPREPLY=($(compgen -W "--port --daemon --no-open" -- \${cur})); return 0 ;;
    cache) COMPREPLY=($(compgen -W "status stats clear" -- \${cur})); return 0 ;;
    mcp) COMPREPLY=($(compgen -W "status restart" -- \${cur})); return 0 ;;
    a2a) COMPREPLY=($(compgen -W "status card" -- \${cur})); return 0 ;;
    tunnel) COMPREPLY=($(compgen -W "list create stop" -- \${cur})); return 0 ;;
    env) COMPREPLY=($(compgen -W "show list get set" -- \${cur})); return 0 ;;
    *) COMPREPLY=($(compgen -W "\${cmds} \${opts}" -- \${cur})); return 0 ;;
  esac
}

complete -F _omniroute omniroute
`;
}

function generateZshCompletion() {
  return `#compdef omniroute

local -a commands
commands=(
  'serve:Start the OmniRoute server'
  'stop:Stop the server'
  'restart:Restart the server'
  'setup:Configure OmniRoute'
  'doctor:Run health diagnostics'
  'status:Show server status'
  'logs:View application logs'
  'providers:Manage providers'
  'config:Show CLI tool config'
  'keys:Manage API keys'
  'models:Browse available models'
  'combo:Manage routing combos'
  'dashboard:Open dashboard'
  'backup:Create a backup'
  'restore:Restore from backup'
  'health:Show server health'
  'quota:Show provider quotas'
  'cache:Manage response cache'
  'mcp:MCP server management'
  'a2a:A2A server management'
  'tunnel:Tunnel management'
  'env:Environment variables'
  'test:Test provider connection'
  'update:Check for updates'
  'completion:Generate shell completion'
)

_arguments -C \\
  '1: :->command' \\
  '*:: :->arg' \\
  && return 0

case $state in
  command) _describe 'command' commands ;;
  arg)
    case $words[1] in
      keys) _arguments '1:subcommand:(add list remove)' ;;
      combo) _arguments '1:subcommand:(list switch create delete)' ;;
      providers) _arguments '1:subcommand:(available list test test-all validate)' ;;
      config) _arguments '1:subcommand:(list get set validate)' ;;
      cache) _arguments '1:subcommand:(status stats clear)' ;;
      mcp) _arguments '1:subcommand:(status restart)' ;;
      a2a) _arguments '1:subcommand:(status card)' ;;
      tunnel) _arguments '1:subcommand:(list create stop)' ;;
      env) _arguments '1:subcommand:(show list get set)' ;;
      completion) _arguments '1:shell:(bash zsh fish)' ;;
      serve) _arguments '--port[Port number]:port:' '--daemon[Run in background]' ;;
    esac
    ;;
esac
`;
}

function generateFishCompletion() {
  return `# OmniRoute CLI Fish Completion
complete -c omniroute -f
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'serve' -d 'Start server'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'stop' -d 'Stop server'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'restart' -d 'Restart server'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'setup' -d 'Configure OmniRoute'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'doctor' -d 'Run diagnostics'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'status' -d 'Show status'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'keys' -d 'Manage API keys'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'models' -d 'Browse models'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'combo' -d 'Manage combos'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'providers' -d 'Manage providers'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'dashboard' -d 'Open dashboard'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'health' -d 'Server health'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'backup' -d 'Create backup'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'restore' -d 'Restore backup'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'completion' -d 'Shell completion'
complete -c omniroute -n '__fish_seen_subcommand_from keys' -a 'add list remove'
complete -c omniroute -n '__fish_seen_subcommand_from combo' -a 'list switch create delete'
complete -c omniroute -n '__fish_seen_subcommand_from completion' -a 'bash zsh fish'
`;
}
