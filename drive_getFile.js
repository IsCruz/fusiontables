const {google} = require('googleapis');
const path = require('path');

/**
    Use Function to get the specific file from the service account using the Google Drive API
*/

async function run_getFile() {
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
        Insert the File Id name code Manually before run the function
  */
  const res = await drive.files.get({
  acknowledgeAbuse : false,
  supportsTeamDrives : false,
  fileId : '1YDp7tugUbPYT1nvWBkHyubfcwNlu74ZTzwrU_gD-'
  });
  console.log(res.data.id);
  return res.data;
}

if (module === require.main) {
    run_getFile().catch(console.error);
}

module.exports.drive = function(){
  run_getFile().catch((error) => {
assert.isNotOk(error,'Promise error');
done();
});
};
