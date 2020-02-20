const pgp = require('pg-promise')({
    // Initialization Options: http://vitaly-t.github.io/pg-promise/module-pg-promise.html
    
})

module.exports = function ({username, password, host,port,  database }) {
    const connectionString = `postgresql://${username}:${password}`
                           + `@${host}:${port}/${database}?application_name=LearnDB`;                       
    return db = pgp(connectionString);
};