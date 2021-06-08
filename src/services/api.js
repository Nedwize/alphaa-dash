const axios = require("axios");

const instanceUrl = axios.create({
  baseURL: "/api/v1",
  transformRequest: [
    function (data, headers) {
      headers["authorization"] = "Bearer " + sessionStorage["authToken"];
      return JSON.stringify(data);
    },
  ],
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * for fetching data 'GET
 * @param {} path 
 * @returns 
 */
export async function fetchAPI(path) {
  return await instanceUrl
    .get(path)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}
 /**
  * for submit data 'POST'
  * @param {*} path 
  * @param {*} postData 
  * @returns 
  */
export async function postAPI(path, postData) {
return await instanceUrl
    .post(path,postData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}
/**
 * delete entry  'DELETE'
 * @param {*} path 
 * @returns 
 */
export async function deleteAPI(path) {
return await instanceUrl
    .delete(`${path}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });

}
 /**
  * modify entry api 'PUT'
  * @param {*} path 
  * @returns 
  */
export async function updateAPI(path,putData) {
return await instanceUrl
    .put(`${path}`,putData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });

}