export type EventBusEvents = {
  up: void;
  down: void;
  left: void;
  right: void;
  actionA: void;
  actionB: void;
};

type Listener<T> = (payload: T) => void;

export const createEventBus = <E extends Record<string, unknown>>() => {
  const listeners: { [K in keyof E]?: Listener<E[K]>[] } = {};

  const on = <K extends keyof E>(event: K, listener: Listener<E[K]>) => {
    listeners[event] = listeners[event] || [];
    listeners[event]!.push(listener);
    return () => off(event, listener);
  };

  const off = <K extends keyof E>(event: K, listener: Listener<E[K]>) => {
    listeners[event] = (listeners[event] || []).filter((l) => l !== listener);
  };

  const emit = <K extends keyof E>(event: K, payload: E[K]) => {
    (listeners[event] || []).forEach((listener) => listener(payload));
  };

  return { on, off, emit };
};

export const eventBus = createEventBus<EventBusEvents>();
