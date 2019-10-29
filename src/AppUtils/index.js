const axios = require('axios');
const Queries = {
    getData: async function() {
      return axios({
        method: 'get',
        url: 'https://bbymakeitright.nalgroup.com/app/service/mobile/?request=RetrieveForms&forms%5b0%5d%5bid%5d=96f782b2-34a8-1398-ea37-6db618c62171%7C%7Cd870f9a1-3407-0488-bb20-526f4083b036&forms%5b0%5d%5bversion%5d=-1.12',
      })
        .then(
          response => {
            return response;
          },
          function(error) {
            console.log("Error: ", error);
          }
        )
        .catch(error => {
          console.log("Error: ", error);
        });
    },
}
export default Queries;