
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

      let response = await axios.post(url, this.assembleDTOPerson(person))
         .catch(function (error) { console.log(error) });
      
      return response != null? this.dissembleDTOPerson(response.data) : null;
   }

   async getAllLanguages(){

      const url = 'https://localhost:44319/api/react/languages/';
      let response = await axios.get(url)
         .catch(function (error) { console.log(error) });

      return response != null? response.data : null;
   }
   async getAllCities(){

      const url = 'https://localhost:44319/api/react/cities/';
      let response = await axios.get(url)
         .catch(function (error) { console.log(error) });

      return response != null? response.data : null;
   }

   assembleDTOPerson(person){
      //console.log(person)
      return { 
         id: person.id, 
         name: person.name, 
         phoneNumber: person.phoneNumber, 
         personLanguages: null,
         languageSelectionViewModel: {LanguageIds: person.languages.map( languageIdStr => {return Number(languageIdStr);}) }, 
         city: { 
                 id: Number(person.city), 
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