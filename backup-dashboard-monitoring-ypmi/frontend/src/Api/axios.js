import axios from 'axios'
export const httpClient = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});
export const httpClientPrivate = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,

});
httpClientPrivate.interceptors.response.use(
    function (response) {
        return response;
    }, 
    function (error) {
        if (error.response.data.message === "Unauthorized!") {
            localStorage.clear();
            window.location.href = '/'
        }
        return Promise.reject(error);
  });