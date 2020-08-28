import Constants from './Constants';

function getForecastByCity(data){
    let url = Constants.urls[Constants.enviroment] + "&" + Constants.queryParams.byCity;
    url = url.replace("{city}", data.city);
    console.log("URL::", url)
    return fetch(url, { method: 'GET'})
            .then((response) => {
                return response.text()
            }).then(responseBodyAsText => { 
                try {
                  const bodyAsJson = JSON.parse(responseBodyAsText);
                  return bodyAsJson;
                } catch (e) {
                    console.log("catch httpRequest-error :", url,  e);                       
                    return false;
                  }

            })
}

const ForecastAPI = {
    getForecastByCity
};

export default ForecastAPI;