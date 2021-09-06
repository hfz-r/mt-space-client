import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { IoAddCircle, IoReloadCircle } from 'react-icons/io5';

const Button = props => {
  return (
    <Tooltip hasArrow placement="top" label={props.label}>
      <IconButton
        color={props.color}
        fontSize={'xl'}
        icon={props.icon}
        aria-label={props.label}
        variant="ghost"
        rounded="full"
        onClick={props.onClick}
        _focus={{ boxShadow: 'none' }}
      />
    </Tooltip>
  );
};

export default function CodeActions(props) {
  return (
    <Flex alignItems="center">
      <Button
        {...props}
        color="blue.400"
        icon={<IoAddCircle />}
        onClick={props.addData}
        label="Create new record"
      />
      <Button
        {...props}
        color="blue.400"
        icon={<IoReloadCircle />}
        onClick={props.refreshData}
        label="Refresh record"
      />
    </Flex>
  );
}
