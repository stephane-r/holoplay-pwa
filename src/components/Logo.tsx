import { UnstyledButton } from "@mantine/core";
import { memo } from "react";

import { useAppColorScheme } from "../hooks/useAppColorScheme";
import { useStableNavigate } from "../providers/Navigate";

export const Logo = memo(() => {
  const colorScheme = useAppColorScheme();
  const navigate = useStableNavigate();

  const isDarkMode = colorScheme === "dark";
  const imageSrc = isDarkMode
    ? "/logo-holoplay-white.png"
    : "/logo-holoplay-blue.png";

  return (
    <UnstyledButton
      component="a"
      onClick={() => navigate("/")}
      style={{ marginTop: 8 }}
    >
      <img src={imageSrc} width={40} alt="Logo HoloPlay" />
    </UnstyledButton>
  );
});
