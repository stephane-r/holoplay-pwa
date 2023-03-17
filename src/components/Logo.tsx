import { ColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { memo } from "react";
import { Link } from "react-router-dom";

export const Logo = memo(() => {
  const [colorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
  });

  const isDarkMode = colorScheme === "dark";
  const imageSrc = isDarkMode
    ? "/logo-holoplay-white.png"
    : "/logo-holoplay-blue.png";

  return (
    <Link to="/" style={{ marginTop: 8 }}>
      <img src={imageSrc} width={40} alt="Logo HoloPlay" />
    </Link>
  );
});
