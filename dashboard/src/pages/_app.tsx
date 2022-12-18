import { type AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";

import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loading = <LoadingSpinner />;

  const dashbaord = (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );

  return <div className="App">{isLoading ? loading : dashbaord}</div>;
};

export default MyApp;
