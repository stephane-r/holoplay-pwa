import { ColorScheme, MantineProvider as Provider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

interface MantineProviderProps {
  children: React.ReactNode;
}

export const MantineProvider: React.FC<MantineProviderProps> = ({
  children,
}) => {
  const [colorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
  });

  return (
    <Provider
      theme={{
        colorScheme,
        breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1200,
          xl: 1400,
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </Provider>
  );
};
