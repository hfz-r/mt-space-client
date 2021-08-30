import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import {
  IoAddCircleSharp,
  IoRefreshCircleSharp,
  IoSyncCircleSharp,
} from 'react-icons/io5';

const Button = props => {
  return (
    <Tooltip hasArrow placement="top" label={props.label}>
      <IconButton
        fontSize="xl"
        disabled={props.isEditable}
        color={props.color}
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
        icon={<IoSyncCircleSharp />}
        onClick={props.handleSyncSave}
        label="Save & Sync"
      />
      <Button
        {...props}
        color="blue.400"
        icon={<IoAddCircleSharp />}
        onClick={props.addData}
        label="Create new record"
      />
      <Button
        {...props}
        color="blue.400"
        icon={<IoRefreshCircleSharp />}
        onClick={props.resetData}
        label="Refresh record"
      />
    </Flex>
  );
}
