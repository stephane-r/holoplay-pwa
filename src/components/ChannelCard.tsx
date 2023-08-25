import {
  Box,
  Card,
  createStyles,
  Flex,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconDiscountCheckFilled } from "@tabler/icons-react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { VideoThumbnail } from "../types/interfaces/Video";
import { Channel } from "../types/interfaces/Channel";
import { useTranslation } from "react-i18next";
import { CardImage } from "./CardImage";

const useStyles = createStyles((theme) => ({
  card: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

interface ChannelCardProps {
  channel: Channel;
}

export const ChannelCard: React.FC<ChannelCardProps> = memo(({ channel }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goToChannel = () => {
    navigate(`/channels/${channel.authorId}`);
  };

  const image = channel.authorThumbnails.find(
    (thumbnail) => thumbnail.width === 512
  ) as VideoThumbnail;

  return (
    <Card withBorder radius="md" p="sm" className={classes.card}>
      <UnstyledButton style={{ width: "100%" }} onClick={goToChannel}>
        <CardImage image={image} title={channel.author} />
        <Flex align="center" gap={8}>
          <Title order={3} mb="xs" mt="md" lineClamp={1}>
            {channel.author}
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
          <Text size="xs" weight={600} mb={4}>
            {new Intl.NumberFormat().format(channel.subCount)}{" "}
            {t("channel.subscribers")}
          </Text>
          <Text size="xs" weight={600}>
            {channel.videoCount} videos
          </Text>
        </Box>
      </Flex>
    </Card>
  );
});
