
import axios from 'axios'


class PersonService {
   async getAll() {
      const url = 'https://localhost:44319/api/react';
      let response = await axios.get(url)
         .catch(function (error) { console.log(error) });  

      return response != null? response.data : [];
   }

   async get(id) {
      const url = 'https://localhost:44319/api/react/' + id;
      let response = await axios.get(url)
         .catch(function (error) { console.log(error) });

      return response != null? this.dissembleDTOPerson(response.data) : null;
   }
   async delete(id) {
      const url = 'https://localhost:44319/api/react/' + id;

      axios.delete(url)
         .catch(function (error) { console.log(error) });

      //return response.data; 
   }
   async add(person) {

      const url = 'https://localhost:44319/api/react/';

      axios.post(url, this.assembleDTOPerson(person))
         .catch(function (error) { console.log(error) });
   }

   async getAllLanguages(){

      return [
         {
            id: 5,
            name: 'Swahil',
         },
         {
            id: 98,
            name: 'Spnahish'
         },
         {
            id: 126,
            name: 'Russian'
         },
      ];
   }
   async getAllCities(){

      const url = 'https://localhost:44319/api/react/countries/';
      let response = await axios.get(url)
         .catch(function (error) { console.log(error) });

      //return response != null? this.dissembleDTOPerson(response.data) : null;
      console.log(response);
      return [
         {
            id: 5,
            name: 'Sofia'
         },
         {
            id: 23,
            name: 'Helsingfors'
         },
      ];
   }

   assembleDTOPerson(person){
      //console.log(person.languages)
      return { 
         id: person.id, 
         name: person.name, 
         phoneNumber: person.phoneNumber, 
         personLanguages: null,
         languageSelectionViewModel: {LanguageIds: person.languages.map( languageIdStr => {return Number(languageIdStr);}) }, 
         city: { 
                 id: 1, 
                 name: "asd", 
                 country: { 
                            id: 0, 
                            name: "asd" } } };
   }
   dissembleDTOPerson(personData){
      //console.log(personData);
      return { 
         id: personData.id, 
         name: personData.name, 
         phoneNumber: personData.phoneNumber, 
         languages: personData.personLanguages.map(pl => {return pl.language;}),
         city: personData.city};
   }
}

export default new PersonService();