import keys from 'shared/constants/keys';
import { useEffect } from 'react';

const useOnEscapeKeyDown = (isListening: boolean, onEscapeKeyDown: Function) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === keys.ESCAPE) {
        onEscapeKeyDown();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening, onEscapeKeyDown]);
};

export default useOnEscapeKeyDown;
