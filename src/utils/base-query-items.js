export const queryItems = {
  Container: {
    children: {
      Container: {},
    },
  },
  Field: {},
  Operator: {
    children: {
      Operator: {},
      OperatorGroup: {},
    },
  },
  Rule: {
    children: {
      Rule: {},
    },
  },
  RuleGroup: {
    rootParentType: 'Rule',
    children: {
      RuleGroup: {},
    },
  },
};
