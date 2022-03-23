import { batch, createSignal } from 'solid-js';

type Direction = '' | 'vertical' | 'horizontal';

function getDirection(x: number, y: number) {
  if (x > y) {
    return 'horizontal';
  }
  if (y > x) {
    return 'vertical';
  }
  return '';
}

export function useTouch() {
  const [startX, setStartX] = createSignal(0);
  const [startY, setStartY] = createSignal(0);
  const [deltaX, setDeltaX] = createSignal(0);
  const [deltaY, setDeltaY] = createSignal(0);
  const [offsetX, setOffsetX] = createSignal(0);
  const [offsetY, setOffsetY] = createSignal(0);
  const [direction, setDirection] = createSignal<Direction>('');

  const isVertical = () => direction() === 'vertical';
  const isHorizontal = () => direction() === 'horizontal';

  const reset = () => {
    batch(() => {
      setDeltaX(0);
      setDeltaY(0);
      setOffsetX(0);
      setOffsetY(0);
      setDirection('');
    });
  };

  const start = ((event: TouchEvent) => {
    batch(() => {
      reset();
      setStartX(event.touches[0].clientX);
      setStartY(event.touches[0].clientY);
    });
  }) as EventListener;

  const move = ((event: TouchEvent) => {
    const touch = event.touches[0];
    // safari back will set clientX to negative number
    setDeltaX(touch.clientX < 0 ? 0 : touch.clientX - startX());
    setDeltaY(touch.clientY - startY());
    setOffsetX(Math.abs(deltaX()));
    setOffsetY(Math.abs(deltaY()));

    // lock direction when distance is greater than a certain value
    const LOCK_DIRECTION_DISTANCE = 10;
    if (
      !direction() ||
      (offsetX() < LOCK_DIRECTION_DISTANCE &&
        offsetY() < LOCK_DIRECTION_DISTANCE)
    ) {
      setDirection(getDirection(offsetX(), offsetY()));
    }
  }) as EventListener;

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
  };
}
