import { getSettings } from "../database/utils";

export interface PingRemotePlayResponse {
  deviceId: string;
  videoId: string;
}

export const pingRemotePlay = async (): Promise<PingRemotePlayResponse> => {
  const request = await fetch(
    `${process.env.REACT_APP_API_URL}/api/remotePlay?deviceUuid=${
      getSettings().deviceId
    }`,
  );
  const { data } = await request.json();
  return data;
};

export interface SendToRemoteDevicePayload {
  deviceUuid: string;
  videoId: string;
}

export const sendToRemoteDevice = ({
  deviceUuid,
  videoId,
}: SendToRemoteDevicePayload) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/remotePlay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deviceUuid,
      videoId,
    }),
  });
};

export const clearRemoteDevice = (deviceUuid: string) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/api/clearRemotePlay?deviceUuid=${deviceUuid}`,
  );
};
