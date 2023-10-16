const sql = require('mssql/msnodesqlv8')

const config = {
  database: 'xxxxxxxxxxxx',
  server: 'xxxxxxxxxxxx',
  driver: 'msnodesqlv8',
  user: 'xxxxxxxxxxxx',
  password: 'xxxxxxxxxxxx',
  options: {
    trustedConnection: false
  }
} 
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => { 
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}