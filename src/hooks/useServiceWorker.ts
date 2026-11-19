import { useCallback, useEffect, useRef, useState } from "react";
import { registerSW } from "virtual:pwa-register";

// By default, the browser only re-checks the service worker script against
// the server on navigation/reload — an already-open tab never notices a
// new release on its own, however long it's left running. Polling
// registration.update() periodically means the "update available" prompt
// shows up without the user having to close and reopen the app first.
const UPDATE_CHECK_INTERVAL_MS = 60 * 1000;

export const useServiceWorker = () => {
  const [showReload, setShowReload] = useState<boolean>(false);
  const updateSWRef = useRef<((reloadPage?: boolean) => Promise<void>) | null>(
    null,
  );

  useEffect(() => {
    updateSWRef.current = registerSW({
      immediate: true,
      onNeedRefresh: () => setShowReload(true),
      onRegisteredSW(_swUrl, registration) {
        if (!registration) return;

        setInterval(() => {
          registration.update();
        }, UPDATE_CHECK_INTERVAL_MS);
      },
    });
  }, []);

  const reloadPage = useCallback(() => {
    setShowReload(false);
    updateSWRef.current?.(true);
  }, []);

  return { showReload, reloadPage };
};
