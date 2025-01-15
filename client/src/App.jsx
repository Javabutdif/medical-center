import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { test } from "./api/admin";

function App() {
  const [data, setData] = useState("");
  const getData = async () => {
    const response = await test();
    setData(response);
  };
  useEffect(() => {
    getData();
  });
  return <>{data}</>;
}

export default App;
