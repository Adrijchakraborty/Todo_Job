import React from "react";

const AuthForm = React.lazy(()=> import("./AuthComponents/AuthForm"));

const MainHeader = React.lazy(()=> import("./MainComponents/MainHeader"));
const AddItems = React.lazy(()=> import("./MainComponents/AddItems"));
const DisplayItems = React.lazy(()=> import("./MainComponents/DisplayItems"));

export {AuthForm, MainHeader, AddItems, DisplayItems}