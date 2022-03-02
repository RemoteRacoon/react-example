import { FC } from "react";
import { RiErrorWarningLine } from 'react-icons/ri';
import { IconI } from "../IconI";

const WarningIcon: FC<IconI> = (props) => {
  return (
    <RiErrorWarningLine {...props} />
  )
}

WarningIcon.displayName = 'icon-warning';

export default WarningIcon;