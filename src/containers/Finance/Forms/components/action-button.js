import {
  Flex,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { IoAddCircleSharp ,IoRefreshCircleSharp} from "react-icons/io5";

const Button = props => {
  return (
    <Tooltip hasArrow placement="top" label={props.label}>
      <IconButton
        fontSize="2xl"
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
        color="blue.400"
        icon={<IoAddCircleSharp />}
        onClick={props.addData}
        label="Create new record"
      />
      <Button
        color="blue.400"
        icon={<IoRefreshCircleSharp />}
        onClick={props.resetData}
        label="Refresh record"
      />
    </Flex>
  );
}
