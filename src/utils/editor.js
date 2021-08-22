export const Components = [
  'Container',
  'Field',
  'Operator',
  'OperatorGroup',
  'Rule',
  'RuleGroup',
  // Allow meta components
  'ContainerMeta',
  'RuleMeta',
  'RuleGroupMeta',
  'OperatorMeta',
];

export const RootComponents = Components
  // Remove specific components
  .filter(name => ![].includes(name));
