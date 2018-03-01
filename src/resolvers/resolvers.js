import axios from 'axios';

import { MAGENTO_URI } from '../config/magento';

const resolvers = {
  Query: {
    products: () => axios.get(`${MAGENTO_URI}products/?searchCriteria[filter_groups][0][filters][0][field]=category_gear&searchCriteria[filter_groups][0][filters][0][value]=86&searchCriteria[filter_groups][0][filters][0][condition_type]=finset`)
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
