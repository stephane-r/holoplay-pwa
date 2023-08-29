import { ColorScheme, MantineProvider as Provider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";

interface MantineProviderProps {
  children: React.ReactNode;
}

export const MantineProvider: React.FC<MantineProviderProps> = ({
  children,
}) => {
  const osColorScheme = useColorScheme();
  const [colorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
  });

  return (
    <Provider
      theme={{
        colorScheme: colorScheme ?? osColorScheme,
        breakpoints: {
          xs: "30em",
          sm: "50em",
          md: "62em",
          lg: "75em",
          xl: "90em",
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </Provider>
  );
};
