export type RoutingStrategyValue =
  | "priority"
  | "weighted"
  | "round-robin"
  | "fill-first"
  | "p2c"
  | "random"
  | "least-used"
  | "cost-optimized"
  | "strict-random";

type RoutingStrategyOption = {
  value: RoutingStrategyValue;
  labelKey: string;
  combosDescKey: string;
  settingsDescKey: string;
  icon: string;
};

export const ROUTING_STRATEGIES: RoutingStrategyOption[] = [
  {
    value: "priority",
    labelKey: "priority",
    combosDescKey: "priorityDesc",
    settingsDescKey: "priorityDesc",
    icon: "sort",
  },
  {
    value: "weighted",
    labelKey: "weighted",
    combosDescKey: "weightedDesc",
    settingsDescKey: "weightedDesc",
    icon: "percent",
  },
  {
    value: "round-robin",
    labelKey: "roundRobin",
    combosDescKey: "roundRobinDesc",
    settingsDescKey: "roundRobinDesc",
    icon: "autorenew",
  },
  {
    value: "fill-first",
    labelKey: "fillFirst",
    combosDescKey: "fillFirstDesc",
    settingsDescKey: "fillFirstDesc",
    icon: "vertical_align_top",
  },
  {
    value: "p2c",
    labelKey: "p2c",
    combosDescKey: "p2cDesc",
    settingsDescKey: "p2cDesc",
    icon: "balance",
  },
  {
    value: "random",
    labelKey: "random",
    combosDescKey: "randomDesc",
    settingsDescKey: "randomDesc",
    icon: "shuffle",
  },
  {
    value: "least-used",
    labelKey: "leastUsed",
    combosDescKey: "leastUsedDesc",
    settingsDescKey: "leastUsedDesc",
    icon: "low_priority",
  },
  {
    value: "cost-optimized",
    labelKey: "costOpt",
    combosDescKey: "costOptimizedDesc",
    settingsDescKey: "costOptDesc",
    icon: "savings",
  },
  {
    value: "strict-random",
    labelKey: "strictRandom",
    combosDescKey: "strictRandomDesc",
    settingsDescKey: "strictRandomDesc",
    icon: "casino",
  },
];

export const SETTINGS_FALLBACK_STRATEGY_VALUES: RoutingStrategyValue[] = [
  "priority",
  "weighted",
  "fill-first",
  "round-robin",
  "p2c",
  "random",
  "least-used",
  "cost-optimized",
  "strict-random",
];
