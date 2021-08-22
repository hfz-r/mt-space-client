import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { actions, selectors } from 'stores';
import useDropComponent from 'hooks/DropComponent';
import ComponentPreview from './ComponentPreview';

const Editor = () => {
  const showLayout = useSelector(selectors.queryApp.getShowLayout);
  const showQuery = useSelector(selectors.queryApp.getShowQuery);
  const components = useSelector(selectors.query.getComponents);
  const dispatch = useDispatch();

  const { drop } = useDropComponent('root');
  const isEmpty = !components.root.children.length;
  const rootProps = components.root.props;

  const gridStyles = {
    backgroundImage: useColorModeValue(
      'linear-gradient(to right, #d9e2e9 1px, transparent 1px),linear-gradient(to bottom, #d9e2e9 1px, transparent 1px)',
      'linear-gradient(to right, rgb(41, 44, 46) 1px, transparent 1px), linear-gradient(to bottom, rgb(41, 44, 46) 1px, transparent 1px)'
    ),
    bgColor: useColorModeValue('#edf2f6', 'rgb(32, 34, 36)'),
    backgroundSize: '20px 20px',
    p: 10,
  };

  let editorBackgroundProps = {};

  const onSelectBackground = () => {
    dispatch(actions.query.unselect());
  };

  if (showLayout) {
    editorBackgroundProps = gridStyles;
  }

  editorBackgroundProps = {
    ...editorBackgroundProps,
    ...rootProps,
  };

  const Playground = (
    <Box
      p={2}
      {...editorBackgroundProps}
      top="16px"
      height="100%"
      minWidth="10rem"
      width="100%"
      display={isEmpty ? 'flex' : 'block'}
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      ref={drop}
      position="relative"
      flexDirection="column"
      onClick={onSelectBackground}
    >
      {isEmpty && (
        <Text maxWidth="md" color="gray.400" fontSize="xl" textAlign="center">
          Drag some component to start coding without code! Or load{' '}
          <Link
            color="gray.500"
            onClick={e => {
              e.stopPropagation();
              dispatch(actions.query.loadDemo('onboarding'));
            }}
            textDecoration="underline"
          >
            the onboarding components
          </Link>
          .
        </Text>
      )}

      {components.root.children.map(name => (
        <ComponentPreview key={name} componentName={name} />
      ))}
    </Box>
  );

  if (!showQuery) {
    return Playground;
  }

  //   return (
  //     <SplitPane
  //       style={{ overflow: 'auto' }}
  //       defaultSize="50%"
  //       resizerStyle={{
  //         border: '3px solid rgba(1, 22, 39, 0.21)',
  //         zIndex: 20,
  //         cursor: 'row-resize',
  //       }}
  //       split="horizontal"
  //     >
  //       {Playground}
  //       <CodePanel />
  //     </SplitPane>
  //   );
};

export default memo(Editor);
