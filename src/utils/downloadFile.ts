import { showNotification } from "@mantine/notifications";

export const downloadFile = (url: string, filename: string): Promise<void> => {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    })
    .catch((error) => {
      showNotification({
        title: "Download",
        message: "Failed to download file",
        color: "red",
      });
    });
};
