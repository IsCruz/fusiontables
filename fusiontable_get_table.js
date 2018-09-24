const {google} = require('googleapis');
const path = require('path');

/** Each API may support multiple version. With this sample, we're getting
   v1 of the urlshortener API, and using an API key to authenticate. */

const client =  google.auth.getClient({
    keyFile: path.join(__dirname, 'jwt.keys.json'),
    scopes: 'https://www.googleapis.com/auth/fusiontables'
});
const fusiontables = google.fusiontables({
  version: 'v2',
  auth: client
});
/**
    Add the table who wants to get
*/
const params = {
  tableId: '1YDp7tugUbPYT1nvWBkHyubfcwNlu74ZTzwrU_gD-'
};
  /**
      call the  fusiontables API
  */
fusiontables.table.get(params, (err, res) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(JSON.stringify(res.data));
});
