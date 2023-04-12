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
