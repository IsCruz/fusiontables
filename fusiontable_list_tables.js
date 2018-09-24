const {
    google
} = require('googleapis');
const path = require('path');




async function run_listTables() {

    /**
      Create a new JWT client using the key file downloaded from the Google Developer Console
    */
    const client = await google.auth.getClient({
        keyFile: path.join(__dirname, 'jwt.keys.json'),
        scopes: 'https://www.googleapis.com/auth/fusiontables'
    });


    /** Each API may support multiple version. With this sample, we're getting
        v1 of the urlshortener API, and using an API key to authenticate.
    */
    const fusiontables = google.fusiontables({
        version: 'v2',
        auth: client
    });

    /**
        Get a list a tables from fusiontables API call
    */
    fusiontables.table.list(params, (err, res) => {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(JSON.stringify(res.data));
    });

}


if (module === require.main) {
    run_listTables().catch(console.error);
}

// Exports for unit testing purposes
module.exports = {
    run_listTables
};
