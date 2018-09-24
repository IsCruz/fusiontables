const {
    google
} = require('googleapis');
const path = require('path');
var driv = require('./drive_permitions.js');
//white label table id -> 1YDp7tugUbPYT1nvWBkHyubfcwNlu74ZTzwrU_gD-
const params = {
    resource: {
      "name": "Whitelabel",
      "columns": [
       {
        "name": "resort_id",
        "type": "STRING"
       },
       {
        "name": "check_in_date",
        "type": "DATETIME"
       },
       {
        "name": "location",
        "type": "LOCATION"
       },
       {
        "name": "wl30001",
        "type": "NUMBER"
       },
       {
        "name": "wl30020",
        "type": "NUMBER"
       },
       {
        "name": "wl40018",
        "type": "NUMBER"
       },
       {
        "name": "wl40022",
        "type": "NUMBER"
       },
       {
        "name": "wl90014",
        "type": "NUMBER"
       },
       {
        "name": "wl90022",
        "type": "NUMBER"
       },
       {
        "name": "wl100021",
        "type": "NUMBER"
       },
       {
        "name": "wl100011",
        "type": "NUMBER"
       },
       {
        "name": "wl100010",
        "type": "NUMBER"
       },
       {
        "name": "wl100009",
        "type": "NUMBER"
       },
       {
        "name": "wl180003",
        "type": "NUMBER"
       },
       {
        "name": "wl190004",
        "type": "NUMBER"
       },
       {
        "name": "wl200018",
        "type": "NUMBER"
       },
       {
        "name": "wl200021",
        "type": "NUMBER"
       },
       {
        "name": "wl210018",
        "type": "NUMBER"
       },
       {
        "name": "wl210021",
        "type": "NUMBER"
       },
       {
        "name": "wl220021",
        "type": "NUMBER"
       },
       {
        "name": "wl220018",
        "type": "NUMBER"
       },
       {
        "name": "wl240008",
        "type": "NUMBER"
       },
       {
        "name": "wl240022",
        "type": "NUMBER"
       },
       {
        "name": "wl250014",
        "type": "NUMBER"
       },
       {
        "name": "wl250022",
        "type": "NUMBER"
       },
       {
        "name": "wl260018",
        "type": "NUMBER"
       },
       {
        "name": "wl260022",
        "type": "NUMBER"
       },
       {
        "name": "wl270022",
        "type": "NUMBER"
       },
       {
        "name": "wl270014",
        "type": "NUMBER"
       },
       {
        "name": "wl290002",
        "type": "NUMBER"
       },
       {
        "name": "wl290021",
        "type": "NUMBER"
       },
       {
        "name": "wl300018",
        "type": "NUMBER"
       },
       {
        "name": "wl300021",
        "type": "NUMBER"
       },
       {
        "name": "wl320018",
        "type": "NUMBER"
       },
       {
        "name": "wl320021",
        "type": "NUMBER"
       },
       {
        "name": "wl370014",
        "type": "NUMBER"
       },
       {
        "name": "wl370022",
        "type": "NUMBER"
       }

      ],
      "description": "Whitelabel Table",
      "isExportable": true
    }

};


async function run_createTable() {

    /** Create a new JWT client using the key file downloaded from the Google Developer Console,
        insert the Fusion Tables Scope and the Google Drive Scope for launch only the functions
        instead of launch two clients.
     */
    const client = await google.auth.getClient({
        keyFile: path.join(__dirname, 'jwt.keys.json'),
        scopes: ['https://www.googleapis.com/auth/fusiontables','https://www.googleapis.com/auth/drive']
    });


    /**Each API may support multiple version. With this sample, we're getting
    v1 of the urlshortener API, and using an API key to authenticate. */
    const fusiontables = google.fusiontables({
        version: 'v2',
        auth: client
    });
    /** insert a new table */
     var insert = Promise.resolve(
       fusiontables.table.insert(params));
    await insert.then((res) =>{
      console.log(res.data.tableId);
      /** config the Setup For Give Permission throught Google Drive API */
      const drive = google.drive({
        version: 'v3',
        auth: client
      });
      const roles = ['reader','writer'];
      for(var i = 0; i < roles.length; i++){
      const body = {
        'type': 'anyone',
        'role':   roles[i],
        'withLink'	: false
      }
      console.log(body);
      console.log(res.data.tableId);
      /**
          Launch the Permissions API call
      */
      drive.permissions.create({
      resource : body,
      fileId : res.data.tableId,
      fields : 'id'
      }).then((res) =>{
        console.log(JSON.stringify(res.data));
        return res.data;
      }).catch((err) => {
        console.error('AN ERROR OCURREDDDDDD - Drive Permissions: '+err);

      });
     }

    }).catch((err) =>{
      console.error(err);
    });
}




if (module === require.main) {
    run_createTable().catch((error) => {
  error+' Promise error';
});
}

/** Exports for unit testing purposes */
module.exports.create = function(){
  run_createTable()
};
