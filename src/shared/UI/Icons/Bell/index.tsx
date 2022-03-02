import { FC } from "react";
import { IconI } from "../IconI";
import { VscBell, VscBellDot } from 'react-icons/vsc';

interface BellI extends IconI {
  active?: boolean,
}

const BellIcon: FC<BellI> = ({ active, ...props }) => {
  if (active) {
    return <VscBellDot {...props} />
  }

  return <VscBell {...props} />
}

BellIcon.displayName = 'bell-icon';

export default BellIcon;