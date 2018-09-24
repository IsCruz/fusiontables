
var Client = require('mariasql');
var gofuta = require('./fusiontable_insert_into_table.js');
var delfuta = require('./fusiontable_delete_rows.js');
var fs = require('fs');

/**
  Use this function for call the Whitelabel Data from the Data Base and
  divide it into .CSV files from  2,000 rows.
  Once the files are created, import the data into the Fusion Table.
*/
 function cronsFusion(table){
      var mariadb = new Client({
        host: 'localhost',
        user: 'root',
        password: '',
        db: 'services_api'
      });
      /**
        Call the Stored Procedure to create the wl_all table with New Data.
      */
    var query = "call SP_FUSIONTABLES()";
    let coso = new Array();
      mariadb.query( query, {},
          function(err, rows) {
              if (err){
                  throw err;
              }
              var sql = "select * FROM wl_all";
              mariadb.query( sql, {},
                  function(err, rows) {
                      if (err){
                          throw err;
                      }

              /**
                Starting to structurate the info into an array before chunked in a 2,000 rows arrays.
                (where Magic happens)
              */

              var arr = new Array();
              for(var index = 0; index < rows.length; index++){

                   arr.push('"'+validateData(rows[ index ].resort_id)+'","'+validateData(rows[ index ].check_in_date)+'","'+rows[ index ].location+'","'+validateData(rows[ index ].wl30001)+'","'+validateData(rows[ index ].wl30020)+'","'+validateData(rows[ index ].wl40018)+'","'+validateData(rows[ index ].wl40022)+'","'
                           +validateData(rows[ index ].wl90014)+'","'+validateData(rows[ index ].wl90022)+'","'+validateData(rows[ index ].wl100021)+'","'+validateData(rows[ index ].wl100011)+'","'+validateData(rows[ index ].wl100010)+'","'+validateData(rows[ index ].wl100009)+'","'+validateData(rows[ index ].wl180003)+'","'
                           +validateData(rows[ index ].wl190004)+'","'+validateData(rows[ index ].wl200018)+'","'+validateData(rows[ index ].wl200021)+'","'+validateData(rows[ index ].wl210018)+'","'+validateData(rows[ index ].wl210021)+'","'+validateData(rows[ index ].wl220021)+'","'+validateData(rows[ index ].wl220018)+'","'
                           +validateData(rows[ index ].wl240008)+'","'+validateData(rows[ index ].wl240022)+'","'+validateData(rows[ index ].wl250014)+'","'+validateData(rows[ index ].wl250022)+'","'+validateData(rows[ index ].wl260018)+'","'+validateData(rows[ index ].wl260022)+'","'+validateData(rows[ index ].wl270022)+'","'
                           +validateData(rows[ index ].wl270014)+'","'+validateData(rows[ index ].wl290002)+'","'+validateData(rows[ index ].wl290021)+'","'+validateData(rows[ index ].wl300018)+'","'+validateData(rows[ index ].wl300021)+'","'+validateData(rows[ index ].wl320018)+'","'+validateData(rows[ index ].wl320021)+'","'
                           +validateData(rows[ index ].wl370014)+'","'+validateData(rows[ index ].wl370022)+'"');
              }
              var i,j,temparray,chunk = 2000;
              var master = new Array();
              /**
                Chunk the Array into a 2,000 rows arrays
              */
              for (i=0,j = arr.length; i<j; i+=chunk) {
                  temparray = arr.slice(i,i+chunk);
                  master.push(temparray);
              }
             var dir = './csv-files';
              if (!fs.existsSync(dir)){
                  fs.mkdirSync(dir);
              }
              /**
                Deleting the oldest .CSV files before create the new ones.
              */
               delfuta.deleterows(table);
              for (var y = 0; y < master.length; y++) {
                    var file = './csv-files/demo'+y+'.csv';
                    if(fs.existsSync(file)){
                        checkFiles(file);
                    }
                    /**
                      Create the New .CSV Files with the new WL Data and inserting into the
                    */
               var ws = fs.createWriteStream('./csv-files/demo'+y+'.csv');
                console.log('NEW File Created!! - '+'demo'+y+'.csv  with '+master[y].length+' rows');
                for(var m =0; m < master[y].length; m++){
                     fs.appendFileSync('./csv-files/demo'+y+'.csv', master[y][m]+'\r\n');
                }
                /**
                  Import the File into the Fusiontable assigned
                */
                 gofuta.insert(file,table);
              }
          });
      });
      mariadb.end();
}
function validateData(value){
  if(value == ''){
      return 'N/A';
  }
  return value
}

function checkFiles(file){
  fs.unlink(file, function(error) {
  if (error) {
      throw error;
  }
  console.log('Deleted File: '+file);
});
}
if (module === require.main) {
    cronsFusion();
}
// Exports for unit testing purposes
module.exports.cron = function(table){
  cronsFusion(table);
};
