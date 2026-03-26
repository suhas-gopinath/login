declare module "container/useApi" {
  export interface ApiOptions {
    method: "GET" | "POST";
    headers?: Record<string, string>;
    body?: string;
    credentials: RequestCredentials;
  }

  export function useApi(
    path: string,
    onSuccess: (message: string) => void,
    onError: (message: string) => void,
    options?: ApiOptions
  ): {
    callApi: () => Promise<void>;
    isLoading: boolean;
  };
}
