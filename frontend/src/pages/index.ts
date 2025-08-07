import React from "react";

const AuthPage = React.lazy(()=> import('./AuthPage'));
const MainPage = React.lazy(()=> import('./MainPage'));

export { AuthPage, MainPage}