import keys from "shared/constants/keys";
import React from "react";

const useTel = () => {

  const handleTelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, inputValue: string) => {
    if (e.key === keys.BACKSPACE && inputValue.length === 2) {
      e.preventDefault();
      return;
    }
  }

  return {
    handleTelKeyDown,
  }
}

export default useTel;