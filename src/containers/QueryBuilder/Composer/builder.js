import Composer from './composer';

export const buildContainer = parent => {
  const composer = new Composer('Container');

  const nodeId = composer.addNode({ type: 'Container', parent });
  composer.addNode({ type: 'Operator', parent: nodeId });

  const components = composer.getComponents();

  return {
    components,
    root: nodeId,
    parent,
  };
};

export const buildRule = parent => {
  const composer = new Composer('Rule');

  const nodeId = composer.addNode({ type: 'Rule', parent });
  composer.addNode({ type: 'Field', parent: nodeId });
  composer.addNode({ type: 'Operator', parent: nodeId });

  const components = composer.getComponents();

  return {
    components,
    root: nodeId,
    parent,
  };
};

export const buildRuleGroup = parent => {
  const composer = new Composer('RuleGroup');

  const nodeId = composer.addNode({ type: 'RuleGroup', parent });
  composer.addNode({ type: 'Field', parent: nodeId });
  composer.addNode({ type: 'Operator', parent: nodeId });
  composer.addNode({ type: 'Rule', parent: nodeId });

  const components = composer.getComponents();

  return {
    components,
    root: nodeId,
    parent,
  };
};

export const buildOperator = parent => {
  const composer = new Composer('Operator');

  const nodeId = composer.addNode({ type: 'OperatorGroup', parent });

  composer.addNode({
    type: 'Operator',
    parent: nodeId,
    props: { isChecked: true, children: 'And' },
  });
  composer.addNode({
    type: 'Operator',
    parent: nodeId,
    props: { children: 'Or' },
  });

  const components = composer.getComponents();

  return {
    components,
    root: nodeId,
    parent,
  };
};

const builders = {
  ContainerMeta: buildContainer,
  RuleMeta: buildRule,
  RuleGroupMeta: buildRuleGroup,
  OperatorMeta: buildOperator,
};

export default builders;
