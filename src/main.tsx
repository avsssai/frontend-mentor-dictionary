import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<App />
			<ReactQueryDevtools position='bottom-left' initialIsOpen={true} />
		</QueryClientProvider>
	</React.StrictMode>
);
