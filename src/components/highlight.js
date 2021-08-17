import React from 'react';
import { chakra, useColorMode, useColorModeValue } from '@chakra-ui/react';
import BaseHighlight, { defaultProps } from 'prism-react-renderer';
import { prismDark, prismLight } from './theme-prism';

const Highlight = props => {
  const { codeString, language, showLines } = props;
  const { colorMode } = useColorMode();
  const baseTheme = useColorModeValue(prismLight, prismDark);

  const customTheme = {
    ...baseTheme,
    plain: {
      ...baseTheme.plain,
      // fontFamily: 'Fira Code, mono',
      // fontSize: '14px',
      // lineHeight: '20px',
    },
  };

  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={customTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <chakra.div data-language={language} maxH={600} overflowY="auto">
          <pre className={className} style={style}>
            {tokens.splice(0, tokens.length).map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <chakra.div
                  px={4}
                  bg={colorMode === 'light' ? 'blue.50' : 'blue.800'}
                  boxShadow={
                    colorMode === 'light'
                      ? 'inset 3px 0px 0px 0px #4299E1'
                      : 'inset 3px 0px 0px 0px #90CDF4'
                  }
                  {...lineProps}
                >
                  {showLines && (
                    <chakra.span opacity={0.5} mr={4} fontSize="xs">
                      {i + 1}
                    </chakra.span>
                  )}
                  {line.map((token, key) => (
                    <chakra.span {...getTokenProps({ token, key })} />
                  ))}
                </chakra.div>
              );
            })}
          </pre>
        </chakra.div>
      )}
    </BaseHighlight>
  );
};

export default Highlight;
