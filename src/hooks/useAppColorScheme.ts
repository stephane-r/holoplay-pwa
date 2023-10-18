import { useMantineColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

export const useAppColorScheme = () => {
  const { colorScheme: mantineColorScheme } = useMantineColorScheme();
  const osColorScheme = useColorScheme();
  return mantineColorScheme === "auto" ? osColorScheme : mantineColorScheme;
};
