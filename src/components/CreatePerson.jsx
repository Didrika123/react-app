import React, { Component } from 'react'

export default class CreatePerson extends Component {
   initialState = {
      id: -1,
      name: '',
      phoneNumber: '',
      country: 'Select Country',
      city: 'Select City',
      languages: [],
      nameError: false,
      phoneNumberError: false,
      countryError: false,
      cityError: false,
      criticalError: false
   }
   state = this.initialState;

   componentDidMount(){
      const editPerson = this.props.editPerson;
      if(editPerson != null)
      {
         this.setState({
            id: editPerson.id, 
            name: editPerson.name, 
            phoneNumber: editPerson.phoneNumber, 
            country: editPerson.city.country.id, 
            city: editPerson.city.id, 
            languages: editPerson.languages.map((lang) => {return lang.id} )
         })
         this.props.filterCities(editPerson.city.country.id);
      }
      
   }

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
      if (this.validateForm(this.state)) 
         this.props.addPerson(this.state, this.addPersonFail);
   }
   addPersonFail = () => {
      this.setState({ criticalError: true });
   }

   validateForm = (formData) => {
      let nameError        = (formData.name.length < 6 || formData.name.length >= 40);
      let phoneNumberError = (formData.phoneNumber.length < 6 || formData.phoneNumber.length >= 20);
      let countryError     = isNaN(formData.country);
      let cityError        = isNaN(formData.city);
      this.setState({ nameError: (formData.name.length < 6 || formData.name.length >= 40), phoneNumberError: phoneNumberError, cityError: cityError, countryError: countryError, criticalError: false })
      return !(nameError || phoneNumberError || cityError || countryError);
   }

   render() {
      const { name, city, country, languages, phoneNumber } = this.state;
      return (
         <form>
            <h2>{this.props.editPerson === null? "Add Person" : "Edit Person"}</h2>

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
            
            <label htmlFor="country">Country</label>
            <select
               type="text"
               name="country"
               id="country"
               value={country}
               onChange={(event) => { this.handleChange(event); this.props.filterCities(event.target.value); this.setState({city: "Select City"}); }}>
               <option>Select Country</option>
               {this.props.allCountries.map((oneCountry, index) => { return <option key={index} value={oneCountry.id}>{oneCountry.name}</option>; })}
            </select>
            {this.state.countryError && <span className="error-text">Please select a Country.</span>}
               
            {!isNaN(country) &&
               <div>
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
               </div>
            }

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
            <input className="button-good" type="submit" value={this.props.editPerson === null? "Add" : "Save"} onClick={this.submitForm} />

         </form>
      );
   }


}


