import React from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./pages/manage/List";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={routerConfig}></RouterProvider>
    </div>
  );
}

export default App;
