/**
    Use Function create_table for create a fusion table With the Setup of Write and Read
*/

var creta = require('./fusiontable_create_table.js');

async function create_table(){
  await creta.create();
}


if (module === require.main) {
    create_table().catch((error) => {
  console.error(error,'Promise error');
});
}
/** Exports for unit testing purposes */
module.exports.permissions = function(){
  create_table()
};
