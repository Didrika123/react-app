import React, { Component } from 'react'

export default class PersonDetails extends Component {
   render() {
      const {person, removePerson} = this.props;
      if (this.props.person != null) 
      {
         return (
            <div>
               Name: {person.name} <br />
               City: {person.city} <br />
               Langush: {person.languages.join(",")} <br />
               Phone number: {person.phoneNumber} <br />
               <button onClick={() => removePerson(person)}>Delete</button>
            </div>
         )
      }
      else return <div></div>
   }
}