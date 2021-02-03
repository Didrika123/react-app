import React, { Component } from 'react'
import PersonList from './components/PersonList'
import CreatePerson from './components/CreatePerson'
import PersonDetails from './components/PersonDetails'
import PersonService from './api/ThePersonService'

export default class App extends React.Component {
   state = {
      persons: [
         {
            id: 3,
            name: 'Charlie',
            city: 23,
            languages: [],
            phoneNumber: 'aaa'
         },
         {
            id: 5,
            name: 'Marla',
            city: 5,
            languages: [5, 98],
            phoneNumber: 'bbb'
         },
      ],
      allCities: [
         {
            id: 5,
            name: 'Sofia'
         },
         {
            id: 23,
            name: 'Helsingfors'
         },
      ],
      allLanguages: [
         {
            id: 5,
            name: 'Swahil',
         },
         {
            id: 98,
            name: 'Spnahish'
         },
         {
            id: 126,
            name: 'Russian'
         },
      ],
      personToShowDetailsOf: null,
      personsSortedBy: "unsorted",
      numSortedPersons: 0,
      showCreatePerson: false
   }

   componentDidMount = () => {
      const fetchData = async() => {
         let data = await PersonService.getAll();
         this.setState({persons: data});
      };
      fetchData();
   }

   removePerson = (personToRemove) => {
      this.setState({ persons: this.state.persons.filter((person) => { return person !== personToRemove }), personToShowDetailsOf: null })
      PersonService.delete(personToRemove.id)
   }
   addPerson = (newPerson) => {
      this.setState({ 
         persons: [...this.state.persons, newPerson], 
         personToShowDetailsOf: newPerson,
         showCreatePerson: false })
        
      PersonService.add(newPerson);
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
      else
         this.setState({ persons: this.state.persons.reverse() });
   }

   showDetails = (person) => {
      const fetchData = async() => {
         person = await PersonService.get(person.id);
         this.setState({ personToShowDetailsOf: person, showCreatePerson: false })
      };
      fetchData();
   }

   render() {
      return (
         <div className="container">
            <h1>People Register</h1>
            <section className="borderRight">
               <PersonList persons={this.state.persons} sortPersons={this.sortPersons} showDetails={this.showDetails} />
               <button  className="button-good" onClick={() => this.setState({ showCreatePerson: true })}>&nbsp;+&nbsp;</button>
            </section>
            <section>
               {this.state.showCreatePerson ?
                  <CreatePerson addPerson={this.addPerson} allCities={this.state.allCities} allLanguages={this.state.allLanguages} />
                  : this.state.personToShowDetailsOf !== null ?
                     <PersonDetails person={this.state.personToShowDetailsOf} removePerson={this.removePerson} allCities={this.state.allCities} allLanguages={this.state.allLanguages} />
                     :
                     <h2>Good Morning !</h2>

               }
            </section>
         </div>
      )
   }
}