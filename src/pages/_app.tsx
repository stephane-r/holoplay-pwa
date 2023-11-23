import type { AppProps } from 'next/app'

import { AppShell,  ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import "@mantine/notifications/styles.css";
import "../components/App.css";

import { QueryClientProvider } from "react-query";
import { queryClient } from "../queryClient";
import { Notifications } from "@mantine/notifications";
import { SpotlightProvider } from "../providers/Spotlight";
import { appWithTranslation } from 'next-i18next';
 
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Notifications />
        <AppShell>
          <SpotlightProvider />
          <ColorSchemeScript />
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App);