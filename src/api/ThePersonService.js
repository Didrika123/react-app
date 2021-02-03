
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

      return response != null? response.data : null;
   }
   async delete(id) {
      const url = 'https://localhost:44319/api/react/' + id;

      axios.delete(url)
         .catch(function (error) { console.log(error) });

      //return response.data; 
   }
   async add(person) {

      const url = 'https://localhost:44319/api/react/';

      axios.post(url, { id: 4, name: "Gytis Barzdukas", phoneNumber: "2012-09-01", personLanguages: null, city: { id: 1, name: "asd", country: { id: 0, name: "asd" } } })
         .catch(function (error) { console.log(error) });
   }
}

export default new PersonService();