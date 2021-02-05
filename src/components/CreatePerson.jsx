import React, { Component } from 'react'

export default class CreatePerson extends Component {
   initialState = {
      name: '',
      city: '',
      languages: [],
      phoneNumber: '',
      nameError: false,
      phoneNumberError: false,
      cityError: false,
      criticalError: false
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

   submitForm = (event) => {
      event.preventDefault();
      if (this.validateForm(this.state)) {
         if (this.props.addPerson(this.state))
            this.setState(this.initialState)
         else this.setState({ criticalError: true })
      }
   }

   validateForm = (formData) => {
      let nameError = (formData.name.length < 6 || formData.name.length >= 40);
      let phoneNumberError = (formData.phoneNumber.length < 6 || formData.phoneNumber.length >= 20);
      let cityError = (!Number(formData.city));
      this.setState({ nameError: (formData.name.length < 6 || formData.name.length >= 40), phoneNumberError: phoneNumberError, cityError: cityError, criticalError: false })
      return !(nameError || phoneNumberError || cityError);
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
            {this.state.nameError && <span className="error-text">Name must be longer than 6 characters.</span>}
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
               type="text"
               name="phoneNumber"
               id="phoneNumber"
               value={phoneNumber}
               onChange={this.handleChange} />
            {this.state.phoneNumberError && <span className="error-text">Phone Number must be longer than 6 characters.</span>}
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
            {this.state.cityError && <span className="error-text">Please select a City.</span>}
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

            {this.state.criticalError && <span className="error-text">CRITICAL ERROR, PLEASE TRY AGEN LATER !!!</span>}
            <input className="button-good" type="submit" value="Add" onClick={this.submitForm} />

         </form>
      );
   }


}


