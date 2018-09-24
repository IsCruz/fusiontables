//var fusta = require('./fusiontables.config.json');
const { google } = require('googleapis');
const path = require('path');
// demo '1YDp7tugUbPYT1nvWBkHyubfcwNlu74ZTzwrU_gD-',

/**
    Setup the Table id in the params.sql variable before launch the call
*/


async function run_deleteRows(table){
  /**
    Create a new JWT client using the key file downloaded from the Google Developer Console
  */

  const params = {
      sql: 'DELETE FROM '+table,
      options: {
          url: 'https://www.googleapis.com/fusiontables/v2/',
          encoding: 'UTF-8',
          method: 'POST'
      }
  };

  const client = await google.auth.getClient({
      keyFile: path.join(__dirname, 'jwt.keys.json'),
      scopes: 'https://www.googleapis.com/auth/fusiontables'
  });

  /** Each API may support multiple version. With this sample, we're getting
      v1 of the urlshortener API, and using an API key to authenticate. */
  const fusiontables = google.fusiontables({
      version: 'v2',
      auth: client
  });

  /**
      call the fusion table querys
  */
      await fusiontables.query.sql(params).then((res) =>{
        console.log(JSON.stringify(res.data));
      }).catch((err) => {
        console.error('AN ERROR OCURRED - Delete Rows: '+err);
      });
}

if (module === require.main) {
    run_deleteRows(table).catch(console.error);
}
module.exports.deleterows = function(table){
  run_deleteRows(table).catch((error) => {
assert.isNotOk(error,'Promise error');
done();
});
};
