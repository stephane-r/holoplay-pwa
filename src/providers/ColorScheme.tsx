import {
  ColorScheme,
  ColorSchemeProvider as MColorSchemeProvider,
} from "@mantine/core";
import { useState } from "react";

interface ColorSchemeProviderProps {
  children: React.ReactNode;
}

export const ColorSchemeProvider: React.FC<ColorSchemeProviderProps> = ({
  children,
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <MColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </MColorSchemeProvider>
  );
};
