import { UnstyledButton } from "@mantine/core";
import { memo } from "react";

import { useAppColorScheme } from "../hooks/useAppColorScheme";
import { useStableNavigate } from "../providers/Navigate";

const LOGO_MAP = {
  dark: "logo-holoplay-white.png",
  light: "logo-holoplay-blue.png"
}

export const Logo = memo(() => {
  const colorScheme = useAppColorScheme();
  const navigate = useStableNavigate();

  const imageSrc = `${import.meta.env.BASE_URL}${LOGO_MAP[colorScheme]}`;

  return (
    <UnstyledButton
      component="a"
      onClick={() => navigate("/")}
      mt={8}
    >
      <img src={imageSrc} width={40} alt="Logo HoloPlay" />
    </UnstyledButton>
  );
});
