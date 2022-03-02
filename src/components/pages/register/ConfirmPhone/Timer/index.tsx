import Button from "@/UI/Button";
import { FC, useContext, useState } from "react";
import RegisterService from "services/RegisterService";
import useTimer from "shared/hooks/timer";
import toast from "shared/utils/toast";
import RegisterCtx from "../../RegisterContext";
import styles from './Styles.module.scss';

const Timer: FC = () => {
  const { user, setUser } = useContext(RegisterCtx);
  const { timer, setTimer } = useTimer();
  const [isWorking, setIsWorking] = useState(false);

  const resendCode = async () => {
    setIsWorking(true);
    const { code, error } = await RegisterService.resend(user?.phone);

    if (code) {
      setUser(user => ({ ...user, confirmCode: code }));
      setTimer();
    } else {
      toast.error(error);
    }
    setIsWorking(false);
  }

  return (
    <div className={styles.timer}>
      {timer ?
        <>
          <span>Новый код можно получить через</span>
          <span>
            0:
            {timer.toString().length === 1 ? `0${timer}` : timer}
          </span>
        </>
        :
        <Button
          type="button"
          onClick={resendCode}
          isWorking={isWorking}
        >
          Запросить код снова
        </Button>
      }
    </div>
  )
}

Timer.displayName = 'ConfirmModalTimer';

export default Timer;