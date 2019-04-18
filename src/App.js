import React, { Component } from "react";
import "./App.css";
import NameTable from "./components/NameTable";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NameTable />
      </div>
    );
  }
}

export default App;
