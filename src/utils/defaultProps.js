export const DEFAULT_PROPS = {
  Operator: {
    children: 'And',
  },
};

export const getDefaultFormProps = type => {
  return { ...DEFAULT_PROPS[type]?.form };
};
