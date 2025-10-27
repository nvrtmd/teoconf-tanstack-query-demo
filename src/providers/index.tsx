import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { AppProps } from "next/app";

export default function AppProvider(props: React.PropsWithChildren<AppProps>) {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      {props.children}
    </>
  );
}
