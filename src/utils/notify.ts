import { notifications } from "@mantine/notifications";

interface NotifyOptions {
  title?: string;
  message: string;
}

// The exact same `notifications.show({ title, message, color: "red"|"green" })`
// shape was hand-written at ~20 call sites with minor drift (some omitted
// `title`, one used a literal English string instead of an i18n key).
export const notifySuccess = ({ title, message }: NotifyOptions) =>
  notifications.show({ title, message, color: "green" });

export const notifyError = ({ title, message }: NotifyOptions) =>
  notifications.show({ title, message, color: "red" });
