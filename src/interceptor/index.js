/**
 * Created by NieFZ on 2018/9/11.
 */
import axios from 'axios';

axios.defaults.baseURL = '/';

axios.interceptors.response.use((response) => {
  if (response && response.data && response.data.code) {
    if (response.data.code !== '0') {
    }
  }
  return response;
});

export default axios;
