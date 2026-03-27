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
    options?: ApiOptions,
  ): {
    callApi: () => Promise<void>;
    isLoading: boolean;
  };
}

declare module "container/useMessage" {
  export const useMessage: () => {
    showMessage: (type: "success" | "error", text: string) => void;
    messages: Array<{ id: number; text: string; type: string }>;
    clearAllMessages: () => void;
  };
}

declare module "container/useMessage" {
  import { ReactNode } from "react";

  type MessageType = "success" | "error";

  interface Message {
    id: number;
    text: string;
    type: MessageType;
  }

  export function useMessage(): {
    messages: Message[];
    showMessage: (type: MessageType, text: string) => void;
    removeMessage: (id: number) => void;
    clearAllMessages: () => void;
  };

  export const MessageProvider: React.FC<{ children: ReactNode }>;
}

declare module "container/MessageDisplay" {
  const MessageDisplay: React.FC;
  export default MessageDisplay;
}
