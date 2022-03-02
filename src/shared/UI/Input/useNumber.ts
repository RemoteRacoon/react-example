import keys from "shared/constants/keys";
import { InputI } from ".";

const useNumber = () => {
  const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, props: Partial<InputI>) => {
    const { max, min } = props;
    const { value } = e.currentTarget;

    if (value.toString().length === max?.toString().length && e.key.match(/^\d$/)) {
      e.preventDefault();
      return;
    }

    if (min >= 0) {
      if (e.key === keys.DASH) {
        e.preventDefault();
        return;
      }
    }

  }

  return { handleNumberKeyDown }
}

export default useNumber;