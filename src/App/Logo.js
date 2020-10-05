import React from "react";
import Img from "../Shared/logo_darkmode_transparent.png";

class App extends React.Component {
  render() {
    return (
      <div>
        <center>
          <img src={Img} alt="pic" style={{ width: "40%", height: "40%" }} />
        </center>
      </div>
    );
  }
}

export default App;
