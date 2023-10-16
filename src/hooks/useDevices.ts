import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useDevices = () => {
  const theme = useMantineTheme();

  const isLessThanSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isSmall = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
  const isLessThanMedium = useMediaQuery(
    `(max-width: ${theme.breakpoints.md})`,
  );
  const isMedium = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const isLarge = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);
  const isLessThanLarge = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);
  const isXlarge = useMediaQuery("(min-width: 1600px)");

  return {
    isSmall,
    isLessThanSmall,
    isMedium,
    isLessThanMedium,
    isLarge,
    isLessThanLarge,
    isXlarge,
  };
};
