import { Anchor, Flex, Space, Text, Title } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import pkg from "../../package.json";
import { PageHeader } from "../components/PageHeader";

export const AboutPage = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "page.about",
  });

  return (
    <div>
      <PageHeader title={t("title")} />
      <Text mt="sm" mb="xl">
        <strong>HoloPlay</strong> {t("description1")}
        <Anchor href="https://invidious.io/" target="_blank" ml={4}>
          Invidious
        </Anchor>{" "}
        {t("description2")}
      </Text>
      <Title order={3}>{t("version")}</Title>
      <Anchor
        href={`https://github.com/stephane-r/holoplay-pwa/releases/tag/v${pkg.version}`}
        target="_blank"
      >
        <Text mt="sm">{pkg.version}</Text>
      </Anchor>
      <Space h={28} />
      <Title order={3}>{t("github")}</Title>
      <Text mt="sm">
        <Flex align="center" gap={4}>
          {t("source.code1")}{" "}
          <Anchor
            href="https://github.com/stephane-r/holoplay-pwa"
            target="_blank"
          >
            <Flex align="center">
              {t("source.code2")}
              <IconExternalLink size={16} style={{ marginLeft: 2 }} />
            </Flex>
          </Anchor>
        </Flex>
      </Text>
      <Space h={28} />
      <Title order={3}>{t("troubleshooting")}</Title>
      <Text mt="sm">
        <Anchor
          href="https://github.com/stephane-r/holoplay-pwa/issues/new"
          target="_blank"
        >
          <Flex align="center">
            {t("issue")}
            <IconExternalLink size={16} style={{ marginLeft: 2 }} />
          </Flex>
        </Anchor>
      </Text>
      <Text mt="sm">
        <Anchor
          href="https://github.com/stephane-r/holoplay-pwa/issues"
          target="_blank"
        >
          <Flex align="center">
            {t("feature")}
            <IconExternalLink size={16} style={{ marginLeft: 2 }} />
          </Flex>
        </Anchor>
      </Text>
    </div>
  );
};
