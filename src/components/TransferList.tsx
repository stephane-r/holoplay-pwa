import {
  ActionIcon,
  Checkbox,
  Combobox,
  Flex,
  Group,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./TransferList.module.css";

interface TransferListProps {
  data: string[];
}

export const TransferList: FC<TransferListProps> = memo(
  ({ data: userData }) => {
    const [data, setData] = useState<[string[], string[]]>([userData, []]);

    const handleTransfer = (transferFrom: number, options: string[]) => {
      setData((current) => {
        const transferTo = transferFrom === 0 ? 1 : 0;
        const transferFromData = current[transferFrom].filter(
          (item) => !options.includes(item),
        );
        const transferToData = [...current[transferTo], ...options];

        const result = [];
        result[transferFrom] = transferFromData;
        result[transferTo] = transferToData;

        return result as [string[], string[]];
      });
    };

    return (
      <Flex className={classes.container}>
        <RenderList
          type="forward"
          options={data[0]}
          onTransfer={(options) => handleTransfer(0, options)}
        />
        <RenderList
          type="backward"
          options={data[1]}
          onTransfer={(options) => handleTransfer(1, options)}
        />
      </Flex>
    );
  },
);

interface RenderListProps {
  options: string[];
  onTransfer(options: string[]): void;
  type: "forward" | "backward";
}

const RenderList: FC<RenderListProps> = memo(
  ({ options, onTransfer, type }) => {
    const { t } = useTranslation("translation", {
      keyPrefix: "settings.data.export",
    });
    const combobox = useCombobox();
    const [value, setValue] = useState<string[]>([]);
    const [search, setSearch] = useState("");

    const handleValueSelect = (selectedValue: string) => {
      setValue((current) =>
        current.includes(selectedValue)
          ? current.filter((value) => value !== selectedValue)
          : [...current, selectedValue],
      );
    };

    const items = options
      .filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim()),
      )
      .map((item) => (
        <Combobox.Option
          value={item}
          key={item}
          active={value.includes(item)}
          onMouseOver={() => combobox.resetSelectedOption()}
        >
          <Group gap="sm">
            <Checkbox
              checked={value.includes(item)}
              onChange={() => {}}
              aria-hidden
              tabIndex={-1}
              style={{ pointerEvents: "none" }}
            />
            <span>{item}</span>
          </Group>
        </Combobox.Option>
      ));

    return (
      <div className={classes.renderList} data-type={type}>
        <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
          <Combobox.EventsTarget>
            <Group wrap="nowrap" gap={0} className={classes.controls}>
              <TextInput
                placeholder={t("search.placeholder")}
                classNames={{ input: classes.input }}
                value={search}
                onChange={(event) => {
                  setSearch(event.currentTarget.value);
                  combobox.updateSelectedOptionIndex();
                }}
              />
              <ActionIcon
                radius={0}
                variant="default"
                size={36}
                className={classes.control}
                onClick={() => {
                  onTransfer(value);
                  setValue([]);
                }}
              >
                <IconChevronRight className={classes.icon} />
              </ActionIcon>
            </Group>
          </Combobox.EventsTarget>

          <div className={classes.list}>
            <Combobox.Options>
              {items.length > 0 ? (
                items
              ) : (
                <Combobox.Empty>{t("search.nothing.found")}</Combobox.Empty>
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    );
  },
);
