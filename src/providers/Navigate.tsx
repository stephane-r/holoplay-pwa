import {
  type FC,
  type MutableRefObject,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";
import { type NavigateFunction, useNavigate } from "react-router-dom";

const StableNavigateContext =
  createContext<MutableRefObject<NavigateFunction> | null>(null);

export const StableNavigateProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  return (
    <StableNavigateContext.Provider value={navigateRef}>
      {children}
    </StableNavigateContext.Provider>
  );
};

export const useStableNavigate = (): NavigateFunction => {
  const navigateRef = useContext(StableNavigateContext);

  if (!navigateRef) {
    throw new Error("StableNavigate context is not initialized");
  }

  // Refs should only be read outside of render (event handlers, effects), so
  // `navigate` is wrapped here and `.current` is read lazily, once it's
  // actually called, rather than dereferenced directly during render. The
  // cast is needed because `Parameters<NavigateFunction>` can only pick one
  // of its two call signatures — the wrapper still forwards every argument
  // through to `navigateRef.current` unchanged, for either call shape.
  return useCallback(
    (...args: Parameters<NavigateFunction>) => navigateRef.current(...args),
    [navigateRef],
  ) as NavigateFunction;
};
