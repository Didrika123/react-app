import React, { Component } from 'react'

export default class CreatePerson extends Component {
   initialState = {
      name: '',
      city: 'Select City',
      languages: [],
      phoneNumber: ''
   }

   state = this.initialState

   handleChange = (event) => {
      const { name, value } = event.target
      this.setState({
         [name]: value,
      })
   }
   handleMultiSelect = (event) => {
      const { name, value } = event.target
      this.setState({
         [name]: Array.from(event.target.selectedOptions, (item) => item.value),
      })
   }

   submitForm = () => {
      // validate event.preventdefault();
      this.props.addPerson(this.state)
      this.setState(this.initialState)
   }

   render() {
      const { name, city, languages, phoneNumber } = this.state;

      return (
         <form>
            <h3>Add Person</h3>
            <label htmlFor="name">Name</label>
            <input
               type="text"
               name="name"
               id="name"
               value={name}
               onChange={this.handleChange} />
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
               type="text"
               name="phoneNumber"
               id="phoneNumber"
               value={phoneNumber}
               onChange={this.handleChange} />
            <select
               type="text"
               name="city"
               id="city"
               value={city}
               onChange={this.handleChange}>
               {this.props.allCities.map((oneCity, index) => { return <option key={index} value={oneCity.id}>{oneCity.name}</option>; })}
            </select>
            <select
               multiple
               type="text"
               name="languages"
               id="languages"
               value={languages}
               onChange={this.handleMultiSelect}>
               {this.props.allLanguages.map((oneLanguage, index) => { return <option key={index} value={oneLanguage.id}>{oneLanguage.name}</option>; })}
            </select>

            <input type="button" value="Submit" onClick={this.submitForm} />

         </form>
      );
   }


}


