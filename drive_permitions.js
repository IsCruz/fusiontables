const { google } = require('googleapis');
const path = require('path');

/**
    Use Function for give permissions to a file from the service account using the Google Drive API
*/
async function run_permitions() {
  /**
      Prepare the Client before create the Call to the Google Drive API
  */
  const cliente = await google.auth.getClient({
      keyFile: path.join(__dirname, 'jwt.keys.json'),
      scopes: 'https://www.googleapis.com/auth/drive'
  });
  /**
      Prepare the Setup for the Call to the Google Drive API
  */
  const drive = google.drive({
    version: 'v3',
    auth: cliente
  });
  const roles = ['reader','writer'];
  /**
        Start a Loop for allow read and write anyone into the file
  */
  for(var i = 0; i < roles.length; i++){
  const body = {
    'type': 'anyone',
    'role':   roles[i],
    'withLink'	: false
  }
  /**
        Insert the File Id Manually before run the function
  */
   await drive.permissions.create({
  resource : body,
  fileId : '',
  fields : 'id'
  }).then((res) =>{
    console.log(JSON.stringify(res.data));
    return res.data;
  }).catch((err) => {
    console.error('AN ERROR OCURREDDDDDD - Drive Permissions: '+err);

  });
 }
}

if (module === require.main) {
    run_permitions().catch((error) => {
  assert.isNotOk(error,'Promise error');
  done();
});
}
// Exports for unit testing purposes
module.exports.permissions = function(){
  run_permitions()
};
