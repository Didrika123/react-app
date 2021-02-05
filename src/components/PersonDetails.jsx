import React, { Component } from 'react'

export default class PersonDetails extends Component {
   render() {
      const { person, removePerson, editDetails } = this.props;
      if (this.props.person != null) {
         return (
            <div>
               <table>
                  <thead>
                     <tr>
                        <th><h2>{person.name}</h2></th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Country</td>
                        <td>{person.city.country?.name}</td>
                     </tr>
                     <tr>
                        <td>City</td>
                        <td>{person.city.name}</td>
                     </tr>
                     <tr>
                        <td>Phone number</td>
                        <td>{person.phoneNumber}</td>
                     </tr>
                     <tr>
                        <td>Languages</td>
                        <td>{person.languages?.map(lang => { return lang.name}).join(",")}</td>
                     </tr>
                  </tbody>
               </table>
               <button className="button-info" onClick={() => editDetails()}>Edit</button>
               <button className="button-bad" onClick={() => removePerson(person)}>Delete</button>
            </div>
         )
      }
      else return <div></div>
   }
}