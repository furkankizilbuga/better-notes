import { store } from "@/store"
import { Provider } from "react-redux"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    )
}
