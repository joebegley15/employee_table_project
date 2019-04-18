import React, { Component } from "react";

class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        firstName: null,
        lastName: null,
        role: null,
        startDate: null,
        _id: String(Math.random())
      }
    };
    this.updateProperty = this.updateProperty.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    function allTrue(obj) {
      for (var o in obj) if (!obj[o]) return false;
      return true;
    }
    return allTrue(this.state.person);
  }

  updateProperty(event) {
    const person = this.state.person;
    person[event.target.name] = event.target.value;
    this.setState({
      person: person
    });
    if (this.isValid()) {
      this.props.addPerson(this.state.person);
    }
  }

  render() {
    return (
      <tr key={this.state._id}>
        <th scope="row"> {this.props.number} </th>
        <td>
          {this.state.person.firstName ? (
            this.state.person.firstName
          ) : (
            <input name="firstName" onBlur={this.updateProperty} />
          )}
        </td>
        <td>
          {this.state.person.lastName ? (
            this.state.person.lastName
          ) : (
            <input name="lastName" onBlur={this.updateProperty} />
          )}
        </td>
        <td>
          {this.state.person.role ? (
            this.state.person.role
          ) : (
            <input name="role" onBlur={this.updateProperty} />
          )}
        </td>
        <td>
          {this.state.person.startDate ? (
            this.state.person.startDate
          ) : (
            <input name="startDate" onBlur={this.updateProperty} type="date" />
          )}
        </td>
      </tr>
    );
  }
}

export default AddNew;
