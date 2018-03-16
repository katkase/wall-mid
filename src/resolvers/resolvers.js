import axios from 'axios';

import magentoConfig from '../config/magento';

const {
  url,
  store,
  accessToken,
} = magentoConfig;

axios.defaults.headers.common['Authorization'] = `bearer ${accessToken}`;

const resolvers = {
  Query: {
    products: (root, {id}) => axios.get(`${url}/rest/${store}/V1/products/?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${id}`)
      .then(resp => resp.data.items),
  },
  Custom: {
    __resolveType(Object) {
      if (typeof Object.value === 'string') {
        return 'Value';
      }
      if (Array.isArray(Object.value)) {
        return 'Values';
      }
      return null;
    },
  },
};

export default resolvers;
