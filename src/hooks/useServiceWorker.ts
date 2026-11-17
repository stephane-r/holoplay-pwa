import { useCallback, useEffect, useRef, useState } from "react";
import { registerSW } from "virtual:pwa-register";

export const useServiceWorker = () => {
  const [showReload, setShowReload] = useState<boolean>(false);
  const updateSWRef = useRef<((reloadPage?: boolean) => Promise<void>) | null>(
    null,
  );

  useEffect(() => {
    updateSWRef.current = registerSW({
      immediate: true,
      onNeedRefresh: () => setShowReload(true),
    });
  }, []);

  const reloadPage = useCallback(() => {
    setShowReload(false);
    updateSWRef.current?.(true);
  }, []);

  return { showReload, reloadPage };
};
