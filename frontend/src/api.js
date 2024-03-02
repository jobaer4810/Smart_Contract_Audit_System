/* Name : Ali Mohammad Jobaer
Student ID : 103835483 */

import axios from 'axios';

// Creating an axios instance with a predefined base URL for the backend

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

export default instance;
