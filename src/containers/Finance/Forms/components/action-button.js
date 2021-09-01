import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { IoBag, IoBagAdd, IoSave } from 'react-icons/io5';
import useDataContext from 'hooks/ChildData';

const Button = props => {
  return (
    <Tooltip hasArrow placement="top" label={props.label}>
      <IconButton
        isLoading={props.busy}
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
  const { busy } = useDataContext();
  return (
    <Flex alignItems="center">
      <Button
        {...props}
        color="green.400"
        busy={busy}
        icon={<IoSave />}
        onClick={props.syncData}
        label={'Save & Sync'}
      />
      <Button
        {...props}
        color="blue.500"
        icon={<IoBagAdd />}
        onClick={props.addData}
        label="Create new record"
      />
      <Button
        {...props}
        color="red.400"
        icon={<IoBag />}
        onClick={props.resetData}
        label="Refresh record"
      />
    </Flex>
  );
}
