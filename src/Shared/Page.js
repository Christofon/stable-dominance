import React from "react";
import { AppContext } from "../App/AppProvider";

export default function ({ name, children }) {
  return (
    <AppContext.Consumer>
      {({}) => {
        return <div> {children} </div>;
      }}
    </AppContext.Consumer>
  );
}
