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
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useStableNavigate } from "../providers/Navigate";
import { Channel } from "../types/interfaces/Channel";
import { VideoThumbnail } from "../types/interfaces/Video";
import { ButtonFavorite } from "./ButtonFavorite";
import { CardImage } from "./CardImage";
import classes from "./ChannelCard.module.css";

interface ChannelCardProps {
  channel: Channel;
}

export const ChannelCard: React.FC<ChannelCardProps> = memo(({ channel }) => {
  const navigate = useStableNavigate();
  const { t } = useTranslation();

  const goToChannel = () => {
    navigate(`/channels/${channel.authorId}`);
  };

  const image = channel.authorThumbnails.find(
    (thumbnail) => thumbnail.width === 512,
  ) as VideoThumbnail;

  return (
    <Card withBorder radius="md" p="sm" className={classes.card}>
      <UnstyledButton style={{ width: "100%" }} onClick={goToChannel}>
        <CardImage image={image} title={channel.author} />
        <Flex align="center" gap={8}>
          <Title order={3} mb="xs" mt="md">
            <Text lineClamp={1}>{channel.author}</Text>
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
        {/* @ts-ignore */}
        <ButtonFavorite video={channel} />
      </Flex>
    </Card>
  );
});
