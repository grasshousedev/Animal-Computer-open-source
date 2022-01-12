import React from "react";
import "./SplashScreen.css";

function SplahScreen() {
  return (
    <div id="root">
      <div id="loading">
        <div id="inner">
          <h1 id="heading">Alamal Computers</h1>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplahScreen;
