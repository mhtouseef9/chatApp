const dbConfig = () => {
    let mongoose = require('mongoose');
    mongoose.set('strictQuery', true);  // just to suppress a warning
    let url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000';
    //we can also specify DB name in URL like "mongodb://127.0.0.1:27017/authDev".
    mongoose.connect(url, {dbName: "authDev"});
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("DB Connected");
        //trying to get collection names
        // mongoose.connection.db.listCollections().toArray(function (err, names) {
        //   console.log(names); // [{ name: 'dbname.myCollection' }]
        // });

        //trying to get database
        // var Admin = mongoose.mongo.Admin;
        // new Admin(mongoose.connection.db).listDatabases(function(err, result) {
        //   console.log(result.databases);
        // });
    });
};

const someOtherConfig = () => {

}

module.exports = [
    dbConfig(),
    someOtherConfig()
];
