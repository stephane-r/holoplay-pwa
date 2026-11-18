import { type FC, type PropsWithChildren, createContext, useContext, useState } from "react";

const ScrollParentContext = createContext<HTMLElement | null>(null);
const SetScrollParentContext = createContext<(node: HTMLElement | null) => void>(
  () => {},
);

// `.App-Content` (not the window) is the element that actually scrolls in
// this layout — `body` has `overflow: hidden` and `.App-Content` carries
// `overflow-y: auto` (see App.css). Anything that virtualizes a list driven
// by scroll position (e.g. VirtuosoGrid) needs a reference to that real
// scroll container instead of assuming window scroll.
export const ScrollParentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null);

  return (
    <ScrollParentContext.Provider value={scrollParent}>
      <SetScrollParentContext.Provider value={setScrollParent}>
        {children}
      </SetScrollParentContext.Provider>
    </ScrollParentContext.Provider>
  );
};

export const useScrollParent = () => useContext(ScrollParentContext);
export const useSetScrollParent = () => useContext(SetScrollParentContext);
