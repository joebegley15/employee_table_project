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
import DynamicInput from "./DynamicInput";
import "../NameTable.css";

class NameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [
        {
          firstName: "Joe",
          lastName: "Begley",
          role: "Developer",
          startDate: "2019-06-01",
          _id: String(Math.random()),
          vacationStart: null,
          vacationEnd: null
        }
      ],
      sorted: null,
      showNewPersonField: false,
      dropdownOpen: false,
      selectedPerson: null
    };
    this.addPerson = this.addPerson.bind(this);
    this.delete = this.delete.bind(this);
    this.dropDownSelect = this.dropDownSelect.bind(this);
    this.enablePerson = this.enablePerson.bind(this);
    this.enableSort = this.enableSort.bind(this);
    this.sort = this.sort.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.updateVacation = this.updateVacation.bind(this);
  }

  addPerson(person) {
    const people = this.state.people;
    people.push(person);
    this.setState({ people, showNewPersonField: false });
  }

  delete(event) {
    const people = this.state.people.filter(person => {
      console.log(person.id, event.target.id, person.id !== event.target.id);
      return person._id !== event.target.id;
    });
    this.setState({ people });
  }

  dropDownSelect(event) {
    const selectedPersonId = event.target.id;
    const selectedPerson = this.state.people.find(obj => {
      return obj._id === selectedPersonId;
    });
    this.setState({ selectedPerson });
  }

  enablePerson() {
    this.setState({ showNewPersonField: true });
  }

  enableSort(sortValue) {
    if (sortValue === this.state.sorted) {
      this.setState({ sorted: null });
    } else {
      this.setState({ sorted: sortValue });
    }
  }

  sort(array, key) {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  updateProperty(id, property, value, cb = () => {}) {
    const people = this.state.people.map(person => {
      if (person._id === id) {
        person[property] = value;
      }
      return person;
    });
    this.setState({ people }, cb());
  }

  updateVacation(event) {
    if (this.state.selectedPerson) {
      const personId = this.state.selectedPerson._id;
      const property = event.target.name;
      const value = event.target.value;
      const people = this.state.people.map(person => {
        if (person._id === personId) {
          person[property] = value;
        }
        return person;
      });
      this.setState({ people });
    }
  }

  render() {
    const { selectedPerson, sorted, people } = this.state;
    let sortedPeople = people.slice(0);
    if (sorted) {
      this.sort(sortedPeople, sorted);
    }
    console.log(this.state);
    return (
      <div className="person-form-wrapper">
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th
                onClick={() => this.enableSort("firstName")}
                className={
                  this.state.sorted === "firstName" ? "active-sort" : ""
                }
              >
                First Name
              </th>
              <th
                onClick={() => this.enableSort("lastName")}
                className={
                  this.state.sorted === "lastName" ? "active-sort" : ""
                }
              >
                Last Name
              </th>
              <th
                onClick={() => this.enableSort("role")}
                className={this.state.sorted === "role" ? "active-sort" : ""}
              >
                Role
              </th>
              <th
                onClick={() => this.enableSort("startDate")}
                className={
                  this.state.sorted === "startDate" ? "active-sort" : ""
                }
              >
                Start Date
              </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedPeople.map((person, i) => {
              return (
                <tr key={person._id}>
                  <th scope="row">{i + 1}</th>
                  <DynamicInput
                    value={person.firstName}
                    id={person._id}
                    property="firstName"
                    updateProperty={this.updateProperty}
                  />
                  <DynamicInput
                    value={person.lastName}
                    id={person._id}
                    property="lastName"
                    updateProperty={this.updateProperty}
                  />
                  <DynamicInput
                    value={person.role}
                    id={person._id}
                    property="role"
                    updateProperty={this.updateProperty}
                  />
                  <DynamicInput
                    value={person.startDate}
                    id={person._id}
                    property="startDate"
                    updateProperty={this.updateProperty}
                    type="date"
                  />
                  <td>
                    <Button
                      id={person._id}
                      onClick={this.delete}
                      color="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
            {this.state.showNewPersonField && (
              <AddNew
                number={this.state.people.length + 1}
                addPerson={this.addPerson}
                delete={() => this.setState({ showNewPersonField: false })}
                color="primary"
              />
            )}
          </tbody>
        </Table>
        <Button
          active={this.state.formValid}
          onClick={this.enablePerson}
          color="primary"
          className="new-person"
        >
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
              {selectedPerson && selectedPerson.vacationStart ? (
                <DynamicInput
                  value={selectedPerson.vacationStart}
                  id={selectedPerson._id}
                  property="startDate"
                  updateProperty={this.updateProperty}
                  type="date"
                />
              ) : (
                <td>
                  <input
                    name="vacationStart"
                    onBlur={this.updateVacation}
                    type="date"
                  />
                </td>
              )}
              {selectedPerson && selectedPerson.vacationEnd ? (
                <DynamicInput
                  value={selectedPerson.vacationEnd}
                  id={selectedPerson._id}
                  property="startDate"
                  updateProperty={this.updateProperty}
                  type="date"
                />
              ) : (
                <td>
                  <input
                    name="vacationEnd"
                    onBlur={this.updateVacation}
                    type="date"
                  />
                </td>
              )}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default NameTable;
