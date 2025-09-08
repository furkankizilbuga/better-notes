import { ApiProvider } from "@/renderer/providers/api-provider";
import { SqliteProvider } from "@/renderer/providers/sqlite-provider";
import type { IDataProvider } from "@/renderer/types/data-provider";

let provider: IDataProvider;

if (window.electron?.isElectron) {
    provider = new SqliteProvider();
} else {
    provider = new ApiProvider();
}

export const DataService = provider;