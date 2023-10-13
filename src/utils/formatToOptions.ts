interface IOption {
  value: string;
  label: string;
}

export const formatToOptionsCollection = (
  data: any[],
  key: string = "ID",
): IOption[] => {
  return data.map((p) => ({
    value: p[key],
    label: p.title,
  }));
};
