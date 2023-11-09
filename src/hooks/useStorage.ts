import prettyBytes from "pretty-bytes";
import { useEffect, useState } from "react";

interface Storage extends StorageEstimate {
  formatedQuota: string;
  formatedUsage: string;
  percentageUsed: number;
  remaining: number;
}

export const useStorage = (): Storage | null => {
  const [storage, setStorage] = useState<Storage | null>(null);

  useEffect(() => {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage.estimate().then(({ quota, usage }) => {
        if (usage !== undefined && quota) {
          setStorage({
            usage,
            quota,
            formatedQuota: prettyBytes(quota),
            formatedUsage: prettyBytes(usage),
            percentageUsed: Number(((usage / quota) * 100).toFixed(2)),
            remaining: quota - usage,
          });
        }
      });
    }
  }, []);

  return storage;
};
