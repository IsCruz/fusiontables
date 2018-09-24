const {google} = require('googleapis');
const path = require('path');

/**
    Use Function to get all the files from the service account using the Google Drive API
*/

async function run_listFiles() {
  /**
      Prepare the Client before create the Call to the Google Drive API
  */
  const client = await google.auth.getClient({
      keyFile: path.join(__dirname, 'jwt.keys.json'),
      scopes: 'https://www.googleapis.com/auth/drive'
  });
  /**
      Prepare the Setup for the Call to the Google Drive API
  */
  const drive = google.drive({
    version: 'v3',
    auth: client
  });

    /**
          Insert the Page Size Manually before run the function
    */
  const params = { pageSize: 100 };
  params.q = client;
  const res = await drive.files.list(params);
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
    run_listFiles().catch(console.error);
}

module.exports.drive = function(){
  run_listFiles().catch((error) => {
assert.isNotOk(error,'Promise error');
done();
});
};
