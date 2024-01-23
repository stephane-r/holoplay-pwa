import { Alert, Flex, Table, Text } from "@mantine/core";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";
import { type FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useSettings } from "../providers/Settings";
import type {
  RemoteDevice,
  RemoteDeviceType,
} from "../types/interfaces/Settings";
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
            <Table.Th w="20%">Name</Table.Th>
            <Table.Th w="60%">UUID</Table.Th>
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

const DeviceTypeIcon = {
  desktop: IconDeviceDesktop,
  tablet: IconDeviceTablet,
  mobile: IconDeviceMobile,
};

export const DeviceIcon = memo(
  ({ type, size }: { type: RemoteDeviceType; size?: number }) => {
    const Icon = DeviceTypeIcon[type];
    return <Icon size={size} />;
  },
);

interface DeviceItemProps {
  device: RemoteDevice;
}

const DeviceItem: FC<DeviceItemProps> = memo(({ device }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <strong>
          <Flex align="center" gap="sm">
            <DeviceIcon type={device.type} />
            {device.name}
          </Flex>
        </strong>
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
