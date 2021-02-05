
import axios from 'axios'
const url = 'https://localhost:44319/api/react/';

class PersonService {
   async getAll() {
      let response = await axios.get(url)
         .catch(function (error) { console.log(error) });

      return response != null ? response.data : [];
   }

   async get(id) {
      let response = await axios.get(url + id)
         .catch(function (error) { console.log(error) });

      return response != null ? this.dissembleDTOPerson(response.data) : null;
   }

   async delete(id) {
      axios.delete(url + id)
         .catch(function (error) { console.log(error) });
   }

   async add(person) {
      let response = await axios.post(url, this.assembleDTOPerson(person))
         .catch(function (error) { console.log(error) });

      return response != null ? this.dissembleDTOPerson(response.data) : null;
   }

   async getAllLanguages() {

      let response = await axios.get(url + 'languages')
         .catch(function (error) { console.log(error) });

      return response != null ? response.data : null;
   }

   async getAllCities() {

      let response = await axios.get(url + 'cities')
         .catch(function (error) { console.log(error) });

      return response != null ? response.data : null;
   }

   assembleDTOPerson(person) {
      return {
         id: person.id,
         name: person.name,
         phoneNumber: person.phoneNumber,
         personLanguages: null,
         languageSelectionViewModel: { LanguageIds: person.languages.map(languageIdStr => { return Number(languageIdStr); }) },
         city: {
            id: Number(person.city),
            name: "isValid",
            country: {
               id: 0,
               name: "isValid"
            }
         }
      };
   }
   dissembleDTOPerson(personData) {
      return {
         id: personData.id,
         name: personData.name,
         phoneNumber: personData.phoneNumber,
         languages: personData.personLanguages.map(pl => { return pl.language; }),
         city: personData.city
      };
   }
}

export default new PersonService();