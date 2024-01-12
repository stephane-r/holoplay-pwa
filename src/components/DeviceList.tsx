import { Alert, Flex, Table, Text } from "@mantine/core";
import { type FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useSettings } from "../providers/Settings";
import type { RemoteDevice } from "../types/interfaces/Settings";
import { ButtonAddOrEditDevice } from "./ButtonAddOrEditDevice";
import { ButtonDeleteDevice } from "./ButtonDeleteDevice";

export const DevicesList = memo(() => {
  const { t } = useTranslation();
  const settings = useSettings();
  const devices = useMemo(() => settings?.devices ?? [], [settings.devices]);

  if (!devices.length) {
    return (
      <>
        <Alert title={t("devices.alert.title")} mb="lg">
          <Text>{t("devices.alert.description")}</Text>
        </Alert>
        <ButtonAddOrEditDevice />
      </>
    );
  }

  return (
    <>
      <Table role="list" aria-label="Devices list" highlightOnHover mb="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w="30%">Name</Table.Th>
            <Table.Th w="50%">ID</Table.Th>
            <Table.Th w="20%" style={{ textAlign: "right" }}>
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {settings.devices.map((device) => (
            <DeviceItem key={device.id} device={device} />
          ))}
        </Table.Tbody>
      </Table>
      <ButtonAddOrEditDevice />
    </>
  );
});

interface DeviceItemProps {
  device: RemoteDevice;
}

const DeviceItem: FC<DeviceItemProps> = memo(({ device }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <strong>{device.name}</strong>
      </Table.Td>
      <Table.Td>
        <strong>{device.id}</strong>
      </Table.Td>
      <Table.Td align="right">
        <Flex gap={8} justify="flex-end">
          <ButtonAddOrEditDevice initialValues={device} />
          <ButtonDeleteDevice device={device} />
        </Flex>
      </Table.Td>
    </Table.Tr>
  );
});
