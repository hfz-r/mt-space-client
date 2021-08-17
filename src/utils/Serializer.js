import Remote from './remote';

const serializer = {
  reviver(key, value) {
    if (
      typeof value === 'object' &&
      value !== null &&
      '__serializedType__' in value
    ) {
      const { data } = value;
      switch (value.__serializedType__) {
        case 'Success':
          return Remote.Success(data.__remote);
        case 'Failure':
          return Remote.Failure(data.__remote);
        case 'Loading':
          return Remote.Loading;
        case 'NotAsked':
          return Remote.NotAsked;
        default:
          return data;
      }
    }
    return value;
  },
};

export default serializer;
