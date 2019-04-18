import React, { Component } from "react";

class DynamicInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnClick() {
    this.setState({ active: true });
  }

  handleOnBlur(event) {
    if (event.target.value) {
      const { id, property, updateProperty } = this.props;
      const { value } = event.target;
      const cb = () => {
        this.setState({ active: false });
      };
      updateProperty(id, property, value, cb);
    }
  }

  render() {
    const { active } = this.state;
    return (
      <td>
        {active ? (
          <input
            onBlur={this.handleOnBlur}
            placeholder={this.props.value}
            type={this.props.type}
          />
        ) : (
          <span onClick={this.handleOnClick}> {this.props.value} </span>
        )}
      </td>
    );
  }
}

export default DynamicInput;
