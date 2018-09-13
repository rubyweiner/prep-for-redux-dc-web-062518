import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";

// keys and _types_ of values
// { count: number } starts at 0
// get an init action first
// state comes in as undefined

// default param
// if (oldState === undefined) {
//   return {
//     count: 0
//   };
// }

const reducer = (oldState = { count: 5 }, action) => {
  console.log("action", action, "state", oldState);
  switch (action.type) {
    case "INCREMENT":
      return { count: oldState.count + 1 };
    case "DECREMENT":
      return { count: oldState.count - 1 };
    case "INCREMENT_BY_THREE":
      return { count: oldState.count + 3 };
    case "DECREMENT_BY_FIVE":
      return { count: oldState.count - 5 };
    default:
      return oldState;
  }
  // if (action.type === "INCREMENT") {
  // WRONG:
  // oldState.count += 1
  // mutates the old state!
  // Right:
  // return { count: oldState.count + 1 };
  // }
  // return oldState;
};

// we probably want this to live in it's own file
const store = createStore(reducer);

class App extends Component {
  // state = { count: 0 };

  // increment = () => {
  // this.setState(prevState => ({ count: prevState.count + 1 }));
  // };

  // decrement = () => {
  // this.setState(prevState => ({ count: prevState.count - 1 }));
  // };

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Counter />
      </div>
    );
  }
}

class Header extends Component {
  renderDescription = () => {
    const remainder = store.getState().count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${store.getState().count +
      upToNext}`;
  };

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

class Counter extends Component {
  decrement = () => {
    // action: type
    // { type: 'DECREMENT' }
    store.dispatch({ type: "DECREMENT" });
  };

  increment = () => {
    store.dispatch({ type: "INCREMENT" });
  };

  decrementByFive = () => {
    store.dispatch({ type: "DECREMENT_BY_FIVE"});
  }

  incrementByThree = () => {
    store.dispatch({ type: "INCREMENT_BY_THREE"});
  }

  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={this.decrement}> - </button>
        <button onClick={this.increment}> + </button>
        <button onClick={this.decrementByFive}>-5</button>
        <button onClick={this.incrementByThree}>+3</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
