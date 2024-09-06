import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './layers/app';

export function renderToString() {
    return ReactDOMServer.renderToString(
        <App message={"Hello from the Server"} />
    );
} 