
const uuid = require('uuid');

function newMessage(body) {
  const msg = {
    id: uuid.v4(),
    attachments: {},
    body,
    headers: {},
    metadata: {},
  };

  return msg;
}


function fillQueryTemplate(template, data) {
  const matches = Array.from(template.matchAll(/[\{](.*?)[\}]/gmu)); // eslint-disable-line no-useless-escape
  const matchesLength = matches.length;

  let query = template;
  for (let i = 0; i < matchesLength; i += 1) {
    const key = matches[i][1].trim();
    if (key in data) {
      query = query.replace(matches[i][0], data[key]);
    } else {
      console.error('Key', key, 'not found!');
    }
  }

  console.log('Filled template:', query);
  return query;
}


module.exports = {
  newMessage,
  fillQueryTemplate,
};
