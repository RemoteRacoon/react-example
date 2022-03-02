import { FC } from 'react';
import classes from './Styles.module.scss';

interface PorgressBarI {
  total: number,
  complete: number
}

const ProgressBar: FC<PorgressBarI> = (props) => {
  const { total, complete } = props;
  const result = ((complete / total) * 100).toFixed(0);

  return (
    <div className={classes.progress}>
      <span className={classes.progress__text}>
        заполнено:
        {' '}
        {result}
        {' '}
        %
      </span>
      <div className={classes.progress__bar}>
        <div className={classes.progress__result} style={{ width: `${result}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
