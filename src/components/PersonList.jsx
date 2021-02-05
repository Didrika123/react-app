import React, { Component } from 'react'

const TableHeader = (props) => {
   return (
      <thead>
         <tr>
            <th><button className="sortButton" onClick={() => props.sortPersons("name")}>Name</button></th>
            <th><button className="sortButton" onClick={() => props.sortPersons("phoneNumber")}>Phone number</button></th>
            <th></th>
         </tr>
      </thead>
   )
}

const TableBody = (props) => {

   const rows = props.persons.map((row, index) => {
      return (
         <tr key={index}>
            <td>{row.name}</td>
            <td>{row.phoneNumber}</td>
            <td>
               <button  className="button-info" onClick={() => props.showDetails(row)}>Details</button>
            </td>
         </tr>
      )
   })

   return <tbody>{rows}</tbody>
}

export default class PersonList extends Component {
   render() {
      const { persons, sortPersons, showDetails } = this.props
      return (
         <table>
            <TableHeader sortPersons={sortPersons} />
            <TableBody persons={persons} showDetails={showDetails}/>
         </table>
      )
   }
}

