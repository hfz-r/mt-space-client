import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import * as Chakra from '@chakra-ui/react';
import { selectors } from 'stores';
import PreviewContainer from './PreviewContainer';
import WithChildrenPreviewContainer from './WithChildrenPreviewContainer';
import { FieldPreview, OperatorGroupPreview } from './previews';

const Map = {
  Container: Chakra['Box'],
  Operator: Chakra['Radio'],
  OperatorGroup: Chakra['RadioGroup'],
};

const ComponentPreview = ({ componentName, ...forwardedProps }) => {
  const component = useSelector(selectors.query.getComponentBy(componentName));
  if (!component) {
    console.error(
      `ComponentPreview unavailable for component ${componentName}`
    );
  }

  const type = (component && component.type) || null;

  switch (type) {
    case 'Operator':
      return (
        <PreviewContainer
          component={component}
          type={Map[type]}
          {...forwardedProps}
        />
      );
    case 'Container':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Map[type]}
          {...forwardedProps}
        />
      );
    case 'Field':
      return <FieldPreview component={component} />;
    case 'OperatorGroup':
      return <OperatorGroupPreview component={component} />;
    default:
      return null;
  }
};

export default memo(ComponentPreview);
