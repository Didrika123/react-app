import React, { Component } from 'react'
import Table from "./components/Table"
import Form from './components/Form'
import ApiCallTest from './components/ApiCallTest'


class App extends React.Component {
   state = {
      dudes: [
         {
            name: 'Charlie',
            job: 'Janitor',
         },
         {
            name: 'Mac',
            job: 'Bouncer',
         },
         {
            name: 'Dee',
            job: 'Aspring actress',
         },
         {
            name: 'Dennis',
            job: 'Bartender',
         },
      ],
   }

   removeDude = (index) => {
      const { dudes } = this.state

      this.setState({
         dudes: dudes.filter((dude, i) => {
            return i !== index
         }),
      })
   }
   addDude = (newDude) => {
      this.setState({dudes: [...this.state.dudes, newDude]})
    }

   render() {
      return (
         <div className="container">
            <h1>Presons</h1>
            <Table dudes={this.state.dudes} removeDude={this.removeDude} />
            <Form addDude={this.addDude} />
            <ApiCallTest />
         </div>
      )
   }
}

export default App