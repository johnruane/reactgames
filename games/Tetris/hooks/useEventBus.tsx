import { useEffect } from 'react';

import { eventBus } from '../../../shared/utils/eventBus';

const useEventBus = (moveFn: (dir: string) => void) => {
  useEffect(() => {
    const unsubUp = eventBus.on('up', () => moveFn('ArrowUp'));
    const unsubDown = eventBus.on('down', () => moveFn('ArrowDown'));
    const unsubLeft = eventBus.on('left', () => moveFn('ArrowLeft'));
    const unsubRight = eventBus.on('right', () => moveFn('ArrowRight'));
    const unsubActionA = eventBus.on('actionA', () => moveFn('Space'));

    return () => {
      unsubUp();
      unsubDown();
      unsubLeft();
      unsubRight();
      unsubActionA();
    };
  }, [moveFn]);
};

export default useEventBus;
