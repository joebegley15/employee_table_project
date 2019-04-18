import React, { Component } from "react";
import {
  Table,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import AddNew from "./AddNew";

class NameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [
        {
          firstName: "Joe",
          lastName: "Begley",
          role: "Developer",
          startDate: "06-01-2019",
          _id: String(Math.random()),
          vacationStart: null,
          vacationEnd: null
        }
      ],
      showNewPersonField: false,
      dropdownOpen: false,
      selectedPerson: null
    };
    this.addPerson = this.addPerson.bind(this);
    this.dropDownSelect = this.dropDownSelect.bind(this);
    this.enablePerson = this.enablePerson.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateVacation = this.updateVacation.bind(this);
  }

  addPerson(person) {
    const people = this.state.people;
    people.push(person);
    this.setState({ people, showNewPersonField: false });
  }

  dropDownSelect(event) {
    const selectedPersonId = event.target.id;
    const selectedPerson = this.state.people.find(obj => {
      return obj._id === selectedPersonId;
    });
    console.log(selectedPerson);
    this.setState({ selectedPerson });
  }

  enablePerson() {
    this.setState({ showNewPersonField: true });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  updateVacation(event) {
    if (this.state.selectedPerson) {
      const personId = this.state.selectedPerson._id;
      const property = event.target.name;
      const value = event.target.value;
      const people = this.state.people.map(person => {
        console.log(person._id, personId);
        if (person._id === personId) {
          person[property] = value;
        }
        return person;
      });
      this.setState({ people });
    }
  }

  render() {
    const { selectedPerson } = this.state;
    return (
      <div className="person-form-wrapper">
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.people.map((person, i) => {
              return (
                <tr key={person._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.role}</td>
                  <td>{person.startDate}</td>
                </tr>
              );
            })}
            {this.state.showNewPersonField && (
              <AddNew
                number={this.state.people.length + 1}
                addPerson={this.addPerson}
              />
            )}
          </tbody>
        </Table>
        <Button active={this.state.formValid} onClick={this.enablePerson}>
          Add New
        </Button>
        <Table dark>
          <thead>
            <tr>
              <th>Name</th>
              <th>Vacation Start</th>
              <th>Vacation End</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                    {selectedPerson
                      ? `${selectedPerson.firstName} ${selectedPerson.lastName}`
                      : "Pick a Person"}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.state.people.map(person => {
                      return (
                        <DropdownItem
                          key={person._id}
                          id={person._id}
                          onClick={this.dropDownSelect}
                        >
                          {`${person.firstName} ${person.lastName}`}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </td>
              <td>
                {selectedPerson && selectedPerson.vacationStart ? (
                  `${selectedPerson.vacationStart}`
                ) : (
                  <input
                    name="vacationStart"
                    onBlur={this.updateVacation}
                    type="date"
                  />
                )}
              </td>
              <td>
                {selectedPerson && selectedPerson.vacationEnd ? (
                  `${selectedPerson.vacationEnd}`
                ) : (
                  <input
                    name="vacationEnd"
                    onBlur={this.updateVacation}
                    type="date"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default NameTable;