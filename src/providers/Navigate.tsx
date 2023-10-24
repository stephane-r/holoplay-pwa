import {
  type FC,
  type MutableRefObject,
  type PropsWithChildren,
  createContext,
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
  const navigateRef = useContext(
    StableNavigateContext,
  ) as MutableRefObject<NavigateFunction>;

  if (navigateRef.current === null)
    throw new Error("StableNavigate context is not initialized");

  return navigateRef.current;
};
