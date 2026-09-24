import {useCallback, useRef} from "react";

export interface SectionHandler<T> {
  getValues: () => T;
  validate?: () => Promise<boolean>;
  getErrors?: () => string[];
}

export function useFormRegistry<TRecord extends Record<string, any>>() {
  type Key = keyof TRecord;

  // Cada key se guarda con su handler tipado (pero en el Map internamente lo “borramos”)
  const handlersRef = useRef(new Map<Key, SectionHandler<any>>());

  const register = useCallback(
    <K extends Key>(key: K, handler: SectionHandler<NonNullable<TRecord[K]>>) => {
      handlersRef.current.set(key, handler);

      return () => handlersRef.current.delete(key);
    },
    [],
  );

  const getAll = useCallback(() => {
    return Array.from(handlersRef.current.entries());
  }, []);

  return {register, getAll};
}
