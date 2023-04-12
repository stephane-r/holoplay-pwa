import { Badge, Checkbox, Flex, Switch, Table } from "@mantine/core";
import { memo } from "react";
import { Instance } from "../types/interfaces/Instance";
import { useSetSettings, useSettings } from "../providers/Settings";
import { db } from "../database";
import { Settings } from "../types/interfaces/Settings";
import { useTranslation } from "react-i18next";
import { ModalAddCustomInstance } from "./ModalAddCustomInstance";
import { ModalDeleteCustomInstance } from "./ModalDeleteCustomInstance";

export const SelectInvidiousInstance = memo(() => {
  const settings = useSettings();
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.general",
  });

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>
            <Flex align="center">
              {t("invidious.domain")}
              <ModalAddCustomInstance />
            </Flex>
          </th>
          <th style={{ width: 120 }}>{t("invidious.type")}</th>
          <th style={{ width: 120 }}>{t("invidious.actions")}</th>
          <th style={{ width: 120 }}></th>
          <th style={{ width: 120 }}></th>
        </tr>
      </thead>
      <tbody>
        {settings.customInstances
          ? settings.customInstances.map((instance) => (
              <TableRow key={instance.domain} instance={instance} custom />
            ))
          : null}
        {settings.instances.map((instance) => (
          <TableRow key={instance.domain} instance={instance} />
        ))}
      </tbody>
    </Table>
  );
});

const TableRow = memo(
  ({ instance, custom }: { instance: Instance; custom?: boolean }) => {
    const settings = useSettings();
    const setSettings = useSetSettings();
    const { t } = useTranslation("translation", {
      keyPrefix: "settings.general",
    });

    const isCurrent = settings.currentInstance?.domain === instance.domain;
    const isDefault = settings.defaultInstance?.domain === instance.domain;

    const handleInstanceChange = (
      key: "currentInstance" | "defaultInstance",
      value: Instance | null
    ) => {
      db.update("settings", { ID: 1 }, (data: Settings) => ({
        ...data,
        [key]: value,
      }));
      db.commit();
      setSettings((previousState) => ({
        ...previousState,
        [key]: value,
      }));
    };

    return (
      <tr>
        <td>
          {instance.flag} {instance.domain}
          {isCurrent ? (
            <Badge size="xs" ml="xs" color="lime">
              {t("invidious.current")}
            </Badge>
          ) : null}
          {isDefault ? (
            <Badge size="xs" ml="xs">
              {t("invidious.default")}
            </Badge>
          ) : null}
          {custom ? (
            <Badge size="xs" ml="xs" color="grape">
              {t("invidious.custom")}
            </Badge>
          ) : null}
        </td>
        <td>{instance.type}</td>
        <td>
          <Switch
            checked={isCurrent}
            label={t("invidious.use")}
            onChange={() => handleInstanceChange("currentInstance", instance)}
          />
        </td>
        <td>
          <Checkbox
            checked={isDefault}
            label={t("invidious.default")}
            onChange={() =>
              handleInstanceChange(
                "defaultInstance",
                isDefault ? null : instance
              )
            }
          />
        </td>
        <td>
          {custom ? (
            <ModalDeleteCustomInstance
              disabled={isCurrent || isDefault}
              instance={instance}
            />
          ) : null}
        </td>
      </tr>
    );
  }
);
