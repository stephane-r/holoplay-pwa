import { memo, useMemo } from "react";

import { useScript } from "../hooks/useScript";
import { useSettings } from "../providers/Settings";

const PLAUSIBLE_INSTANCE_SCRIPT_URL =
  "https://plausible.holoplay.io/js/script.js";

export const Scripts = memo(() => {
  const settings = useSettings();
  const analyticsEnabled = useMemo(
    () =>
      process.env.REACT_APP_PLAUSIBLE_ANALYTICS === "true" &&
      settings.analytics,
    [settings.analytics],
  );
  useScript(analyticsEnabled ? PLAUSIBLE_INSTANCE_SCRIPT_URL : null);
  return null;
});
