const _ = require('lodash');

module.exports = {
  generateUID: (ids) => {
    const uid = (`0000${(Math.random() * (36 ** 4) << 0).toString(36)}`).slice(-4);
    if (_.includes(ids, uid)) {
      return this.generateUID(ids);
    }
    return uid;
  },
  logger: ({ getState }) => {
    return next => (action) => {
      console.log('--- DISPATCH ---');
      console.log(JSON.stringify(action, null, 2));
      const returnValue = next(action);
      console.log('--- UPDATED STATE ---');
      console.log(JSON.stringify(getState(), null, 2));
      return returnValue;
    };
  },
  clearFieldValues: (fields) => {
    fields.forEach((field) => {
      field.value = '';
    });
  },
  fieldsNotEmpty: (fields) => {
    let output = true;
    fields.forEach((field) => {
      if (field.value === '') {
        output = false;
      }
    });
    return output;
  },
};
