import React, { Component } from 'react'
import PersonList from './components/PersonList'
import CreatePerson from './components/CreatePerson'
import PersonDetails from './components/PersonDetails'
import PersonService from './api/ThePersonService'

export default class App extends React.Component {
   state = {
      persons: [],
      allCities: [],
      allCountries: [],
      allLanguages: [],
      personToShowDetailsOf: null,
      editPerson: null,
      personsSortedBy: "unsorted",
      numSortedPersons: 0,
      showCreatePerson: false,
      loadingLeft: true,
      loadingRight: false
   }

   componentDidMount = () => {
      (async () => {
         let data = await PersonService.getAll();
         this.setState({ persons: data, loadingLeft: false });
      }).call();
   }

   sortPersons = (sortBy) => {
      let numPersons = this.state.persons.length;
      if (sortBy !== this.state.personsSortedBy || numPersons > this.state.numSortedPersons) {
         this.setState({
            persons: this.state.persons.sort((a, b) => ("" + a[sortBy]).localeCompare(b[sortBy])),
            personsSortedBy: sortBy,
            numSortedPersons: numPersons
         });
      }
      else this.setState({ persons: this.state.persons.reverse() });
   }

   removePerson = (personToRemove) => {
      this.setState({ persons: this.state.persons.filter((person) => { return person.id !== personToRemove.id }), personToShowDetailsOf: null })
      PersonService.delete(personToRemove.id)
   }
   showAddPerson = (isEditing) => {
      if(this.state.showCreatePerson)
         return;
      this.setState({loadingRight: true});
      (async () => {
         this.setState({ 
            allCountries: await PersonService.getAllCountries(), 
            allLanguages: await PersonService.getAllLanguages(), 
            showCreatePerson: true, 
            editPerson: isEditing? this.state.editPerson : null,
            loadingRight: false });
      }).call();
   }
   addPerson = (newPerson, addPersonFail) => {
      (async () => {
         newPerson = newPerson.id < 1? await PersonService.add(newPerson) : await PersonService.put(newPerson);
         if (newPerson !== null)
            this.setState({
               persons: [newPerson, ...this.state.persons.filter((person) => { return person.id !== newPerson.id })],
               personToShowDetailsOf: newPerson,
               showCreatePerson: false,
               editPerson: null
            })
         else addPersonFail.call();
      }).call();
   }
   showDetails = (person) => {
      if(this.state.personToShowDetailsOf !== null && this.state.personToShowDetailsOf.id === person.id)
         return;
      this.setState({loadingRight: true});
      (async () => {
         person = await PersonService.get(person.id);
         this.setState({ personToShowDetailsOf: person, showCreatePerson: false, loadingRight: false })
      }).call();
   }
   editDetails = () => {
      this.setState({editPerson: this.state.personToShowDetailsOf});
      this.showAddPerson(true);
   }
   filterCities = (countryId) => {
      if(isNaN(countryId))
         return;
      (async () => {
         this.setState({ allCities: await PersonService.getCitiesOfCountry(countryId)});
      }).call();
   }

   render() {
      return (
         <div className="container">
            <h1>People Register</h1>
            <main>
               {this.leftSide()}
               {this.rightSide()}
            </main>
         </div>
      )
   }

   leftSide = () => {
      return (
         <section className="borderRight">
            <PersonList persons={this.state.persons} sortPersons={this.sortPersons} showDetails={this.showDetails} />
            {this.state.loadingLeft && <h3>Loading...</h3>}
            <button className="button-good" onClick={() => this.showAddPerson()}>&nbsp;+&nbsp;</button>
         </section>)
   }

   rightSide = () => {
      if (this.state.loadingRight)
         return <h3>Loading...</h3>
      else
         return (
            <section>
               {this.state.showCreatePerson ?
                  <CreatePerson editPerson={this.state.editPerson} addPerson={this.addPerson} filterCities={this.filterCities} allCities={this.state.allCities}  allCountries={this.state.allCountries} allLanguages={this.state.allLanguages} />
                  : this.state.personToShowDetailsOf !== null ?
                     <PersonDetails person={this.state.personToShowDetailsOf} removePerson={this.removePerson} editDetails={this.editDetails} />
                     :
                     <h2>Good Morning !</h2>
               }
            </section>)
   }
}