import React, { lazy, Suspense } from "react";
import LoginForm from "./LoginForm";

const MessageProvider = lazy(() =>
  import("container/useMessage").then((module) => ({
    default: module.MessageProvider,
  })),
);

const MessageDisplay = lazy(() =>
  import("container/MessageDisplay").then((module) => ({
    default: module.default,
  })),
);

export const Login = () => {
  return (
    <Suspense fallback={<div>Loading message provider...</div>}>
      <MessageProvider>
        <Suspense fallback={<div>Loading message display...</div>}>
          <MessageDisplay />
        </Suspense>
        <LoginForm />
      </MessageProvider>
    </Suspense>
  );
};
