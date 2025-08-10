import React from "react";

const ProtectedAuth = React.lazy(() => import('./ProtectedAuth'));
const ProtectedMain = React.lazy(() => import('./ProtectedMain'));

export { ProtectedAuth, ProtectedMain }