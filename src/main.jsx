import React from "react";
import { hydrateRoot } from "react-dom/client"
import App from './layers/app';

console.log("executing client-bundle")

hydrateRoot(
    document.getElementById('root'),
    <App message={"Hello from the Client"} />
);