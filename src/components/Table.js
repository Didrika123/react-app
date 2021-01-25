import React, { Component } from 'react'


const TableHeader = () => {
   return (
      <thead>
         <tr>
            <th>Name</th>
            <th>Job</th>
         </tr>
      </thead>
   )
}

const TableBody = (props) => {
   const rows = props.dudes.map((row, index) => {
      return (
         <tr key={index}>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>
               <button onClick={() => props.removeDude(index)}>Delete</button>
            </td>
         </tr>
      )
   })

   return <tbody>{rows}</tbody>

}

// Components having their own states -> into classes. Other simple comopentnts (best practice)

const Table = (props) => {
   const { dudes, removeDude } = props
   return (
      <table>
         <TableHeader />
         <TableBody dudes={dudes} removeDude={removeDude} />
      </table>
   )
}

export default Table