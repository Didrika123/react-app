import React, { Component } from 'react'

export default class CreatePerson extends Component {
   initialState = {
      name: '',
      city: '',
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
      if(this.props.addPerson(this.state))
         this.setState(this.initialState)
   }

   render() {
      const { name, city, languages, phoneNumber } = this.state;

      return (
         <form>
            <h2>Add Person</h2>
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
            <label htmlFor="city">City</label>
            <select
               type="text"
               name="city"
               id="city"
               value={city}
               onChange={this.handleChange}>
               <option>Select City</option>
               {this.props.allCities.map((oneCity, index) => { return <option key={index} value={oneCity.id}>{oneCity.name}</option>; })}
            </select>
            <label htmlFor="languages">Languages</label>
            <select
               multiple
               type="text"
               name="languages"
               id="languages"
               value={languages}
               onChange={this.handleMultiSelect}>
               {this.props.allLanguages.map((oneLanguage, index) => { return <option key={index} value={oneLanguage.id}>{oneLanguage.name}</option>; })}
            </select>

            <input  className="button-good" type="button" value="Add" onClick={this.submitForm} />

         </form>
      );
   }


}


