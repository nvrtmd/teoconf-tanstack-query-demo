import Head from "next/head";
import { trpc } from "../queries/trpc";
import AppProvider from "../providers";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

function CustomApp(props: AppProps) {
  return (
    <>
      <Head>
        <title>TeoConf Demo</title>
      </Head>
      <AppProvider {...props}>
        <props.Component {...props.pageProps} />
      </AppProvider>
    </>
  );
}

export default trpc.withTRPC(CustomApp);
