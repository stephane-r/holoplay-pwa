import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type PlayerMode = "audio" | "video";

const PlayerModeContext = createContext<PlayerMode>("audio");
const SetPlayerModeContext = createContext<(mode: PlayerMode) => void>(
  () => {},
);

export const PlayerModeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<PlayerMode>("audio");

  const value = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode, setMode],
  );

  return (
    <PlayerModeContext.Provider value={value.mode}>
      <SetPlayerModeContext.Provider value={value.setMode}>
        {children}
      </SetPlayerModeContext.Provider>
    </PlayerModeContext.Provider>
  );
};

export const usePlayerMode = () => useContext(PlayerModeContext);
export const useSetPlayerMode = () => useContext(SetPlayerModeContext);
