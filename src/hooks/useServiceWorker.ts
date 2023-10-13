import { useCallback, useEffect, useState } from "react";

import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

export const useServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );
  const [showReload, setShowReload] = useState<boolean>(false);

  const onSWUpdate = useCallback((registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  }, []);

  const reloadPage = useCallback(() => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload();
  }, [waitingWorker]);

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
    });
  }, [onSWUpdate]);

  return { showReload, waitingWorker, reloadPage };
};
