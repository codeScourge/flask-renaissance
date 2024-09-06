import React from "react";

export default function App({message}) {
    const [count, setCount] = React.useState(0);

    return (
      <div>
        <h1>{message}</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
}