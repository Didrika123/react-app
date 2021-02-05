import React, { Component } from 'react'
import PersonList from './components/PersonList'
import CreatePerson from './components/CreatePerson'
import PersonDetails from './components/PersonDetails'
import PersonService from './api/ThePersonService'

export default class App extends React.Component {
   state = {
      persons: [],
      allCities: [],
      allLanguages: [],
      personToShowDetailsOf: null,
      personsSortedBy: "unsorted",
      numSortedPersons: 0,
      showCreatePerson: false,
      loadingLeft: true,
      loadingRight: false
   }

   componentDidMount = () => {
      (async () => {
         let data = await PersonService.getAll();
         this.delay();
         this.setState({ persons: data, loadingLeft: false });
      }).call();
   }

   delay(){
      for (let i = 0; i < 99999; i+= 0.0001) {};
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
   showAddPerson = () => {
      this.setState({loadingRight: true});
      (async () => {
         let langs = await PersonService.getAllLanguages();
         let cities = await PersonService.getAllCities();
         this.delay();
         this.setState({ allCities: cities, allLanguages: langs, showCreatePerson: true, loadingRight: false });
      }).call();
   }
   addPerson = (newPerson) => {
      (async () => {
         newPerson = await PersonService.add(newPerson);
         if (newPerson !== null)
            this.setState({
               persons: [...this.state.persons, newPerson],
               personToShowDetailsOf: newPerson,
               showCreatePerson: false
            })

      }).call();
      if (newPerson === null)
         return false;
   }
   showDetails = (person) => {
      this.setState({loadingRight: true});
      (async () => {
         person = await PersonService.get(person.id);
         this.delay();
         this.setState({ personToShowDetailsOf: person, showCreatePerson: false, loadingRight: false })
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
                  <CreatePerson addPerson={this.addPerson} allCities={this.state.allCities} allLanguages={this.state.allLanguages} />
                  : this.state.personToShowDetailsOf !== null ?
                     <PersonDetails person={this.state.personToShowDetailsOf} removePerson={this.removePerson} />
                     :
                     <h2>Good Morning !</h2>
               }
            </section>)
   }
}