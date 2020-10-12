import React, { Component } from "react";
import "./App.css";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import { AppProvider } from "./AppProvider";
import Dashboard from "../Dashboard";
import Content from "../Shared/Content";
import Footer from "./Footer"

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar />
          <Content>
            <Dashboard />
          </Content>
          <Footer />
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
