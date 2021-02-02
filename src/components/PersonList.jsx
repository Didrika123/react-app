import React, { Component } from 'react'


const TableHeader = (props) => {
   return (
      <thead>
         <tr>
            <th><button onClick={() => props.sortPersons("name")}>Name</button></th>
            <th><button onClick={() => props.sortPersons("phoneNumber")}>Phone number</button></th>
            <th>Action</th>
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
               <button onClick={() => props.showDetails(row)}>Details</button>
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
         <div>
            <table>
               <TableHeader sortPersons={sortPersons} />
               <TableBody persons={persons} showDetails={showDetails}/>
            </table>
         </div>
      )
   }
}

