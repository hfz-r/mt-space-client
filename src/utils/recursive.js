import { filter, omit } from 'ramda';
import { generateId } from './generateId';

export const duplicateComponent = (componentToClone, components) => {
  const clonedComponents = {};

  const cloneComponent = component => {
    const newid = generateId();
    const children = component.children.map(child => {
      return cloneComponent(components[child]);
    });

    let newComponentName = component.componentName;
    if (newComponentName) {
      const matches = /^([a-zA-Z]*)(\d+)?$/g.exec(newComponentName);
      // Get all components with a similar name (same base component name + number suffix)
      const similarComponents = filter(
        comp => !!comp.componentName?.includes(matches[1])
      )(components);
      let highestNumber = 0;
      // Get the highest suffix number
      similarComponents.forEach(comp => {
        const nameMatches = /^([a-zA-Z]*)(\d+)?$/g.exec(comp.componentName);
        const number = nameMatches?.length === 2 ? 0 : Number(nameMatches[2]);

        if (number > highestNumber) {
          highestNumber = number;
        }
      });
      // Use the suffix number + 1 to name our duplicated component
      newComponentName = newComponentName.replace(
        /^([a-zA-Z]*)(\d+)?$/g,
        `$1${highestNumber + 1}`
      );
    }

    clonedComponents[newid] = {
      ...component,
      id: newid,
      props: { ...component.props },
      children,
      componentName: newComponentName,
    };

    children.forEach(child => {
      clonedComponents[child].parent = newid;
    });

    return newid;
  };

  const newId = cloneComponent(componentToClone);
  return {
    newId,
    clonedComponents,
  };
};

export const deleteComponent = (component, components) => {
  let updatedComponents = { ...components };
  const deleteRecursive = (children, id) => {
    children.forEach(child => {
      updatedComponents[child] &&
        deleteRecursive(updatedComponents[child].children, child);
    });
    updatedComponents = omit(id, updatedComponents);
  };

  deleteRecursive(component.children, component.id);
  updatedComponents = omit(component.id, updatedComponents);
  return updatedComponents;
};
