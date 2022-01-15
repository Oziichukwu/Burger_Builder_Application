import React, { Component } from "react";

import Auxx from "../../hoc/Auxx";
import './layout.css'


const LayOut = (props) => {
  return (
    <Auxx>
      <div>Toolbar, SideDrawer, BackDrop</div>
      <main className="Content">{props.children}</main>
    </Auxx>
  );
};

export default LayOut;
