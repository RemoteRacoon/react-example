import { MutableRefObject, useEffect, useRef } from 'react';

const useOnClickOutside = (
  $ref: MutableRefObject<HTMLElement>,
  isListening: boolean,
  handler: () => any,
) => {
  const $mouseCurrentRef = useRef(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      $mouseCurrentRef.current = event.target;
    };

    const handleMouseUp = () => {
      if (!$ref.current.contains($mouseCurrentRef.current)) {
        handler();
      }
    };

    if (isListening) {
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });
};

export default useOnClickOutside;
