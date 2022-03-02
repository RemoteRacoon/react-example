import { FC } from 'react';
import classes from './Styles.module.scss';

interface SplitterI {
  customClasses?: string
}
const Splitter: FC<SplitterI> = (props) => {
  const { customClasses } = props;
  const splitterClasses = customClasses ? [classes.splitter, customClasses].join(' ') : classes.splitter;

  return (
    <div className={splitterClasses} />
  );
};

Splitter.defaultProps = {
  customClasses: '',
};

export default Splitter;
