import React, { lazy, Suspense } from "react";
import { RegisterForm } from "../RegisterForm";

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

export const Register = () => {
  return (
    <Suspense fallback={<div>Loading message provider...</div>}>
      <MessageProvider>
        <Suspense fallback={<div>Loading message display...</div>}>
          <MessageDisplay />
        </Suspense>
        <RegisterForm />
      </MessageProvider>
    </Suspense>
  );
};
