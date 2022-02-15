import React from "react";
import type { FunctionComponent } from "react";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const App: FunctionComponent = () => {
  return (
    <div className="app">
      <div className="main">
        <Header />
        <main></main>
      </div>
      <Footer />
    </div>
  );
};
