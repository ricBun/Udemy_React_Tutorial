import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-19a6b.firebaseio.com/'
});

export default instance;