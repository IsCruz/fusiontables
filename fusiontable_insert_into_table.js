
const {google} = require('googleapis');
const path = require('path');
var fs = require('fs');

/** Call the function to import a file into a fusiontable throught fusiontables API call */
async function run_insert(file,table) {
    var rowsimport = fs.createReadStream( path.join(__dirname, file) );

    const params = {
        tableId: table,
        delimiter: ",",
        isStrict: false,
        media: {
            mimeType:"application/octet-stream",
            body: rowsimport
        }

    };

    /** Create a new JWT client using the key file downloaded from the Google Developer Console */
   const client = await google.auth.getClient({
        keyFile: path.join(__dirname, 'jwt.keys.json'),
        scopes: 'https://www.googleapis.com/auth/fusiontables'
    });

    /** Each API may support multiple version. With this sample, we're getting
        v1 of the urlshortener API, and using an API key to authenticate.*/
    const fusiontables = await google.fusiontables({
        version: 'v2',
        auth: client
    });
    /**
        import a file into a table
    */
    await fusiontables.table.importRows(params).then((res) =>{
      console.log(JSON.stringify(res.data));
    }).catch((err) => {
      console.error('AN ERROR OCURREDDDDDD - Insert into Table: '+err);
    });
}


if (module === require.main) {
    run_insert(file,table).catch((error) => {
  assert.isNotOk(error,'Promise error');
  done();
});
}

// Exports for unit testing purposes
module.exports.insert = function(file,table){
  run_insert(file,table)
};
