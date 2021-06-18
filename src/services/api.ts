import { AxiosError, AxiosResponse } from 'axios';
import { ITodo } from '../interface';

const axios = require('axios');

const instanceUrl = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  transformRequest: [
    function (data: any, headers: any) {
      headers['authorization'] = 'Bearer ' + sessionStorage['authToken'];
      return JSON.stringify(data);
    },
  ],
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * for fetching data 'GET
 * @param {} path
 * @returns
 */
export async function fetchAPI(path: string): Promise<AxiosResponse> {
  return await instanceUrl
    .get(path)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((err: AxiosError) => {
      return err;
    });
}

/**
 * for submit data 'POST'
 * @param {*} path
 * @param {*} postData
 * @returns
 */
export async function postAPI(path: string, postData: ITodo) {
  return await instanceUrl
    .post(path, postData)
    .then((response: AxiosResponse) => {
      console.log(response);
      return response;
    })
    .catch((err: AxiosError) => {
      return err;
    });
}
/**
 * delete entry  'DELETE'
 * @param {*} path
 * @returns
 */
export async function deleteAPI(path: string) {
  return await instanceUrl
    .delete(`${path}`)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((err: AxiosError) => {
      return err;
    });
}
/**
 * modify entry api 'PUT'
 * @param {*} path
 * @returns
 */
export async function updateAPI(path: string, putData: ITodo) {
  return await instanceUrl
    .put(path, putData)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((err: AxiosError) => {
      return err;
    });
}
