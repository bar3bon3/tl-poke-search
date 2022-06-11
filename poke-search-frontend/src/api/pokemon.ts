import axios from 'axios';

import { API_BASE_URL } from '../helpers/constants';

export default axios.create({
  baseURL: `${API_BASE_URL}/pokemon`,
});
