import React, { Component } from "react";
import "./App.css";
import styled, { css } from "styled-components";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import {AppProvider} from "./AppProvider";
import Dashboard from '../Dashboard';
import Content from '../Shared/Content';

class App extends Component {
    render() {
        return (
            <AppLayout>
                <AppProvider>
                    <AppBar />
                    <Content>
                        <Dashboard />
                    </Content>
                </AppProvider>
            </AppLayout>
        );
    }
}

export default App;