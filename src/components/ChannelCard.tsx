import {
  Box,
  Card,
  Flex,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconDiscountCheckFilled } from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { useStableNavigate } from "../providers/Navigate";
import type { CardChannel } from "../types/interfaces/Card";
import type { VideoThumbnail } from "../types/interfaces/Video";
import { ButtonFavorite } from "./ButtonFavorite";
import { CardImage } from "./CardImage";
import classes from "./ChannelCard.module.css";

interface ChannelCardProps {
  channel: CardChannel;
  currentInstanceUri: string;
}

export const ChannelCard: FC<ChannelCardProps> = memo(
  ({ channel, currentInstanceUri }) => {
    const navigate = useStableNavigate();
    const { t } = useTranslation();

    const goToChannel = () => {
      navigate(`/channels/${channel.authorId}`);
    };

    const imageSrc =
      channel.thumbnail ??
      (
        channel.authorThumbnails?.find(
          (thumbnail) => thumbnail.width === 512,
        ) as VideoThumbnail
      ).url;

    return (
      <Card withBorder radius="md" p="sm" className={classes.card}>
        <UnstyledButton style={{ width: "100%" }} onClick={goToChannel}>
          <CardImage
            src={imageSrc}
            title={channel.author}
            domain={currentInstanceUri}
          />
          <Flex align="center" gap={8}>
            <Title order={3} mb="xs" mt="md">
              <Text style={{ fontSize: 22 }} lineClamp={1}>
                <strong>{channel.author}</strong>
              </Text>
            </Title>
            {channel.authorVerified ? (
              <Box mt={12}>
                <Tooltip label={t("channel.author.verified")}>
                  <IconDiscountCheckFilled size={16} />
                </Tooltip>
              </Box>
            ) : null}
          </Flex>
          <Text lineClamp={3}>{channel.description}</Text>
        </UnstyledButton>
        <Flex align="center" justify="space-between" mt="xs">
          <Box mt="xs">
            <Text size="xs" mb={4}>
              <strong>
                {new Intl.NumberFormat().format(channel.subCount)}{" "}
                {t("channel.subscribers")}
              </strong>
            </Text>
            <Text size="xs">
              <strong>{channel.videoCount} videos</strong>
            </Text>
          </Box>
          <ButtonFavorite card={channel} />
        </Flex>
      </Card>
    );
  },
);
