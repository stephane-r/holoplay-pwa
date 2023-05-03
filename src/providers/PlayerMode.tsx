import { createContext, useContext, useMemo, useState } from "react";

export type PlayerMode = "audio" | "video";

const PlayerModeContext = createContext<PlayerMode>("audio");
const SetPlayerModeContext = createContext<(mode: PlayerMode) => void>(
  () => {}
);

interface PlayerModeProviderProps {
  children: React.ReactNode;
}

export const PlayerModeProvider: React.FC<PlayerModeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<PlayerMode>("audio");

  const value = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode, setMode]
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
