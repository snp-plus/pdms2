const sql = require('mssql/msnodesqlv8')

const config = {
  database: 'MPN',
  server: 'localhost\\PDMS',
  driver: 'msnodesqlv8',
  user: 'sa',
  password: 'pdms',
  options: {
    trustedConnection: false
  }
} 

// ---- srever config ---------
//
// const config = {
//   options: {
//     trustedConnection: false,
//   },
//   database: 'MPN',
//   server: '192.168.1.40',
//   driver: 'msnodesqlv8',
//   user: 'pdms2user',
//   password:'8htf0nh%QS8bJUc@Z8Jf'
// }


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