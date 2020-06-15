const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);
const csv = require('csvtojson');

let cnt = 0;

async function insertRow(value, pool, rows_cnt) {
  let findQuery = `SELECT * FROM [dbo].[contacts] WHERE first = "${value.first}" AND last = "${value.last}" AND degree = "${value.degree}" AND entity = "${value.entity}" AND specialty = "${value.specialty}" AND dwc = "${value.dwc}" AND code = "${value.code}" AND address = "${value.address}" AND suite = "${value.suite}" AND city = "${value.city}" AND state = "${value.state}" AND zip = "${value.zip}" AND phone = "${value.phone}" AND fax = "${value.fax}" 
                AND latitude = "${value.latitude}" AND longitude = "${value.longitude}" AND taxid = "${value.taxid}" AND statelicensenumber = "${value.statelicensenumber}" AND county = "${value.county}" AND npi = "${value.npi}" AND workinghrs = "${value.workinghrs}" AND priority = "${value.priority}" AND referral = "${value.referral}" AND mpn3095 = "${value.mpn3095}" AND mpn3096 = "${value.mpn3096}" AND mpn3097 = "${value.mpn3097}" AND mpn0701 = "${value.mpn0701}" AND mpn2347 = "${value.mpn2347}" AND mpn2125 = "${value.mpn2125}" AND mpn2128 = "${value.mpn2128}" AND mpn2126 = "${value.mpn2126}" AND mpn2127 = "${value.mpn2127}" AND mpn2129 = "${value.mpn2129}" AND mpn2130 = "${value.mpn2130}" AND mpn2173 = "${value.mpn2173}" AND mpn2079 = "${value.mpn2079}" AND mpn1635 = "${value.mpn1635}" AND mpn1636 = "${value.mpn1636}" AND mpn1637 = "${value.mpn1637}" AND mpn2474 = "${value.mpn2474}" AND mpn2473 = "${value.mpn2473}" AND mpn0598 = "${value.mpn0598}" AND mpn2502 = "${value.mpn2502}" AND mpn2469 = "${value.mpn2469}" 
                AND mpn2468 = "${value.mpn2468}" AND mpn2376 = "${value.mpn2376}" AND mpn2394 = "${value.mpn2394}" AND mpn1203 = "${value.mpn1203}" AND mpn3104 = "${value.mpn3104}" AND deleted = "${value.deleted}" AND newid = "${value.newid}"`;
  findQuery = findQuery.replace(/\'/gi, "\''");
  findQuery = findQuery.replace(/\"/gi, "'");
  const popPool = await poolPromise
  const result = await popPool.request().query(findQuery);

  if(result.recordset.length) {
    cnt ++;
    return cnt === rows_cnt;
  } else {
    let insertQuery = "INSERT INTO  [dbo].[contacts] (first, last, degree, entity, specialty, dwc, code, address, suite, city, state, zip, phone, fax, latitude, longitude, taxid, statelicensenumber, county, npi, workinghrs, priority, referral, mpn3095, mpn3096, mpn3097, mpn0701, mpn2347, mpn2125, mpn2128, mpn2126, mpn2127, mpn2129, mpn2130, mpn2173, mpn2079, mpn1635, mpn1636, mpn1637, mpn2474, mpn2473, mpn0598, mpn2502, mpn2469, mpn2468, mpn2376, mpn2394, mpn1203, mpn3104, deleted, created, newid) VALUES ";
    let row = `("${value.first}","${value.last}","${value.degree}","${value.entity}","${value.specialty}","${value.dwc}","${value.code}","${value.address}","${value.suite}","${value.city}","${value.state}","${value.zip}","${value.phone}","${value.fax}","${value.latitude}","${value.longitude}","${value.taxid}","${value.statelicensenumber}","${value.county}","${value.npi}", "${value.workinghrs}","${value.priority}","${value.referral}","${value.mpn3095}","${value.mpn3096}","${value.mpn3097}","${value.mpn0701}","${value.mpn2347}","${value.mpn2125}","${value.mpn2128}","${value.mpn2126}","${value.mpn2127}","${value.mpn2129}","${value.mpn2130}","${value.mpn2173}","${value.mpn2079}","${value.mpn1635}","${value.mpn1636}","${value.mpn1637}","${value.mpn2474}","${value.mpn2473}","${value.mpn0598}","${value.mpn2502}","${value.mpn2469}","${value.mpn2468}","${value.mpn2376}","${value.mpn2394}","${value.mpn1203}","${value.mpn3104}","${value.deleted}","${value.created}", "${value.newid}")`;
    insertQuery += row;
    insertQuery = insertQuery.replace(/\'/gi, "\''");
    insertQuery = insertQuery.replace(/\"/gi, "'");
    const result = await pool.request().query(insertQuery);
    cnt ++;
    return cnt === rows_cnt;
  }
}

class MainController {
    async getAllData(req , res){
      try {
        const pool = await poolPromise;
        const result = await pool.request()
        .query(queries.getAllData)
        res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async filterData(req , res){
      try {
        const items = req.body;
        let query = `SELECT * FROM [dbo].[contacts] `;
        let str = '';
        let i = 0;
        const len = items.length;
        for(i = 0; i < len; i ++) {
          if(i > 0) {
            if(items[i].checkbox) str = `AND ${items[i].item} LIKE ${items[i].value * 1} `;
            else str = `AND ${items[i].item} LIKE '%${items[i].value}%' `;
          }
          else {
            if(items[i].checkbox) str = `WHERE ${items[i].item} LIKE ${items[i].value * 1} `;
            else str = `WHERE ${items[i].item} LIKE '%${items[i].value}%' `;
          }
          query += str;
        }
        const pool = await poolPromise;
        const result = await pool.request()
        .query(query)
        res.json(result.recordset)
      } catch (error) {
        console.log(error)
        res.status(500)
        res.send(error.message)
      }
    }
    async quicksearch(req , res){
      try {
        const value = req.body.value;
        const query = `SELECT * FROM [dbo].[contacts] WHERE first LIKE '%${value}%' OR last LIKE '%${value}%' OR degree LIKE '%${value}%' OR entity LIKE '%${value}%' OR specialty LIKE '%${value}%' OR dwc LIKE '%${value}%' OR code LIKE '%${value}%' OR address LIKE '%${value}%' OR suite LIKE '%${value}%' OR city LIKE '%${value}%' OR state LIKE '%${value}%' OR zip LIKE '%${value}%' OR phone LIKE '%${value}%' OR fax LIKE '%${value}%' OR latitude LIKE '%${value}%' OR longitude LIKE '%${value}%' OR taxid LIKE '%${value}%' OR statelicensenumber LIKE '%${value}%' OR county LIKE '%${value}%' OR npi LIKE '%${value}%' OR workinghrs LIKE '%${value}%' OR priority LIKE '%${value}%' OR referral LIKE '%${value}%'`;
        const pool = await poolPromise;
        const result = await pool.request()
        .query(query)
        res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async insertDelReason(req, res) {
      try {
        const value = req.body;
        const pool = await poolPromise;
        const query = `UPDATE [dbo].[contacts] SET del_explanation = '${value.reason}', deleted = 1 WHERE id = ${value.id}`;
        await pool.request().query(query);
        const result2 = await pool.request()
        .query(queries.getAllData)
        res.json(result2.recordset)

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addNewData(req, res){
      try {
        const value = req.body;
        const pool = await poolPromise;
        console.log("????????", value)
        let findQuery = `SELECT * FROM [dbo].[contacts] WHERE first = "${value.firstname}" AND last = "${value.lastname}" AND degree = "${value.degree}" AND entity = "${value.entity}" AND specialty = "${value.specialty}" AND dwc = "${value.dwc}" AND code = "${value.code}" AND address = "${value.address}" AND suite = "${value.suite}" AND city = "${value.city}" AND state = "${value.state}" AND zip = "${value.zip}" AND phone = "${value.phone}" AND fax = "${value.fax}" 
                AND latitude = "${value.latitude}" AND longitude = "${value.longitude}" AND taxid = "${value.taxid}" AND statelicensenumber = "${value.statelicensenumber}" AND county = "${value.county}" AND npi = "${value.npi}" AND workinghrs = "${value.workinghrs}" AND priority = "${value.priority}" AND referral = "${value.referral}" AND mpn3095 = "${value.mpn3095}" AND mpn3096 = "${value.mpn3096}" AND mpn3097 = "${value.mpn3097}" AND mpn0701 = "${value.mpn0701}" AND mpn2347 = "${value.mpn2347}" AND mpn2125 = "${value.mpn2125}" AND mpn2128 = "${value.mpn2128}" AND mpn2126 = "${value.mpn2126}" AND mpn2127 = "${value.mpn2127}" AND mpn2129 = "${value.mpn2129}" AND mpn2130 = "${value.mpn2130}" AND mpn2173 = "${value.mpn2173}" AND mpn2079 = "${value.mpn2079}" AND mpn1635 = "${value.mpn1635}" AND mpn1636 = "${value.mpn1636}" AND mpn1637 = "${value.mpn1637}" AND mpn2474 = "${value.mpn2474}" AND mpn2473 = "${value.mpn2473}" AND mpn0598 = "${value.mpn0598}" AND mpn2502 = "${value.mpn2502}" AND mpn2469 = "${value.mpn2469}" 
                AND mpn2468 = "${value.mpn2468}" AND mpn2376 = "${value.mpn2376}" AND mpn2394 = "${value.mpn2394}" AND mpn1203 = "${value.mpn1203}" AND mpn3104 = "${value.mpn3104}" AND deleted = "${value.deleted}" AND newid = "${value.newid}"`;
        findQuery = findQuery.replace(/\'/gi, "\''").replace(/\"/gi, "'").replace(/undefined/gi, '').replace(/\'false\'/gi, 0).replace(/\'true\'/gi, 1);
        console.log("_)_)", findQuery)
        const popPool = await poolPromise
        const result = await popPool.request().query(findQuery);
        console.log(">>>>", findQuery, result)
        if(!result.recordset.length) {
          const result1 = await pool.request()
          .input('first',sql.VarChar , value.firstname)
          .input('last',sql.VarChar,value.lastname)
          .input('degree',sql.VarChar,value.degree)
          .input('entity',sql.VarChar,value.entity)
          .input('specialty',sql.VarChar,value.specialty)
          .input('dwc',sql.VarChar,value.dwc)
          .input('code',sql.VarChar,value.code)
          .input('address',sql.VarChar,value.address)
          .input('suite',sql.VarChar,value.suite)
          .input('city',sql.VarChar,value.city)
          .input('state',sql.VarChar,value.state)
          .input('zip',sql.VarChar,value.zip)
          .input('phone',sql.VarChar,value.phone)
          .input('fax',sql.VarChar,value.fax)
          .input('latitude',sql.VarChar,value.latitude)
          .input('longitude',sql.VarChar,value.longitude)
          .input('taxid',sql.VarChar,value.taxid)
          .input('statelicensenumber',sql.VarChar,value.statelicensenumber)
          .input('county',sql.VarChar,value.county)
          .input('npi',sql.VarChar,value.npi)
          .input('workinghrs',sql.VarChar,value.workinghrs)
          .input('priority',sql.VarChar,value.priority)
          .input('referral',sql.Bit,value.referral * 1)
          .input('mpn3095',sql.Bit,value.mpn3095 * 1)
          .input('mpn3096',sql.Bit,value.mpn3096 * 1)
          .input('mpn3097',sql.Bit,value.mpn3097 * 1)
          .input('mpn0701',sql.Bit,value.mpn0701 * 1)
          .input('mpn2347',sql.Bit,value.mpn2347 * 1)
          .input('mpn2125',sql.Bit,value.mpn2125 * 1)
          .input('mpn2128',sql.Bit,value.mpn2128 * 1)
          .input('mpn2126',sql.Bit,value.mpn2126 * 1)
          .input('mpn2127',sql.Bit,value.mpn2127 * 1)
          .input('mpn2129',sql.Bit,value.mpn2129 * 1)
          .input('mpn2130',sql.Bit,value.mpn2130 * 1)
          .input('mpn2173',sql.Bit,value.mpn2173 * 1)
          .input('mpn2079',sql.Bit,value.mpn2079 * 1)
          .input('mpn1635',sql.Bit,value.mpn1635 * 1)
          .input('mpn1636',sql.Bit,value.mpn1636 * 1)
          .input('mpn1637',sql.Bit,value.mpn1637 * 1)
          .input('mpn2474',sql.Bit,value.mpn2474 * 1)
          .input('mpn2473',sql.Bit,value.mpn2473 * 1)
          .input('mpn0598',sql.Bit,value.mpn0598 * 1)
          .input('mpn2502',sql.Bit,value.mpn2502 * 1)
          .input('mpn2469',sql.Bit,value.mpn2469 * 1)
          .input('mpn2468',sql.Bit,value.mpn2468 * 1)
          .input('mpn2376',sql.Bit,value.mpn2376 * 1)
          .input('mpn2394',sql.Bit,value.mpn2394 * 1)
          .input('mpn1203',sql.Bit,value.mpn1203 * 1)
          .input('mpn3104',sql.Bit,value.mpn3104 * 1)
          .input('deleted',sql.Bit,value.deleted * 1)
          .input('created',sql.DateTime , new Date())
          .input('newid',sql.VarChar,value.newid)
          .query(queries.addNewData);
        }
        const result2 = await pool.request()
        .query(queries.getAllData)
        res.json(result2.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateData(req , res){
      try {
        const value = req.body;
        const pool = await poolPromise
        const result = await pool.request()
        .input('id',sql.Int , value.id)
        .input('first',sql.VarChar , value.first)
        .input('last',sql.VarChar,value.last)
        .input('degree',sql.VarChar,value.degree)
        .input('entity',sql.VarChar,value.entity)
        .input('specialty',sql.VarChar,value.specialty)
        .input('dwc',sql.VarChar,value.dwc)
        .input('code',sql.VarChar,value.code)
        .input('address',sql.VarChar,value.address)
        .input('suite',sql.VarChar,value.suite)
        .input('city',sql.VarChar,value.city)
        .input('state',sql.VarChar,value.state)
        .input('zip',sql.VarChar,value.zip)
        .input('phone',sql.VarChar,value.phone)
        .input('fax',sql.VarChar,value.fax)
        .input('latitude',sql.VarChar,value.latitude)
        .input('longitude',sql.VarChar,value.longitude)
        .input('taxid',sql.VarChar,value.taxid)
        .input('statelicensenumber',sql.VarChar,value.statelicensenumber)
        .input('county',sql.VarChar,value.county)
        .input('npi',sql.VarChar,value.npi)
        .input('workinghrs',sql.VarChar,value.workinghrs)
        .input('priority',sql.VarChar,value.priority)
        .input('referral',sql.Bit,value.referral)
        .input('mpn3095',sql.Bit,value.mpn3095)
        .input('mpn3096',sql.Bit,value.mpn3096)
        .input('mpn3097',sql.Bit,value.mpn3097)
        .input('mpn0701',sql.Bit,value.mpn0701)
        .input('mpn2347',sql.Bit,value.mpn2347)
        .input('mpn2125',sql.Bit,value.mpn2125)
        .input('mpn2128',sql.Bit,value.mpn2128)
        .input('mpn2126',sql.Bit,value.mpn2126)
        .input('mpn2127',sql.Bit,value.mpn2127)
        .input('mpn2129',sql.Bit,value.mpn2129)
        .input('mpn2130',sql.Bit,value.mpn2130)
        .input('mpn2173',sql.Bit,value.mpn2173)
        .input('mpn2079',sql.Bit,value.mpn2079)
        .input('mpn1635',sql.Bit,value.mpn1635)
        .input('mpn1636',sql.Bit,value.mpn1636)
        .input('mpn1637',sql.Bit,value.mpn1637)
        .input('mpn2474',sql.Bit,value.mpn2474)
        .input('mpn2473',sql.Bit,value.mpn2473)
        .input('mpn0598',sql.Bit,value.mpn0598)
        .input('mpn2502',sql.Bit,value.mpn2502)
        .input('mpn2469',sql.Bit,value.mpn2469)
        .input('mpn2468',sql.Bit,value.mpn2468)
        .input('mpn2376',sql.Bit,value.mpn2376)
        .input('mpn2394',sql.Bit,value.mpn2394)
        .input('mpn1203',sql.Bit,value.mpn1203)
        .input('mpn3104',sql.Bit,value.mpn3104)
        .input('deleted',sql.Bit,req.body.deleted)
        .input('created',sql.DateTime,req.body.created)
        .input('deleted_date',sql.DateTime,req.body.deleted_date)
        .input('deleted_by',sql.VarChar,req.body.deleted_by)
        .input('newid',sql.VarChar,req.body.newid)
        .query(queries.updateData)
        
        const result2 = await pool.request()
        .query(queries.getAllData)
        res.json(result2.recordset)

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteData(req , res){
      try {
        if(req.body.length !== 0 ) {
          let cnt = 0;
          const pool = await poolPromise
          req.body.map(async (value, index) => {
            const result = await pool.request()
            .input('id',sql.Int , value.id)
            .input('first',sql.VarChar , value.first)
            .input('last',sql.VarChar,value.last)
            .input('degree',sql.VarChar,value.degree)
            .input('entity',sql.VarChar,value.entity)
            .input('specialty',sql.VarChar,value.specialty)
            .input('dwc',sql.VarChar,value.dwc)
            .input('code',sql.VarChar,value.code)
            .input('address',sql.VarChar,value.address)
            .input('suite',sql.VarChar,value.suite)
            .input('city',sql.VarChar,value.city)
            .input('state',sql.VarChar,value.state)
            .input('zip',sql.VarChar,value.zip)
            .input('phone',sql.VarChar,value.phone)
            .input('fax',sql.VarChar,value.fax)
            .input('latitude',sql.VarChar,value.latitude)
            .input('longitude',sql.VarChar,value.longitude)
            .input('taxid',sql.VarChar,value.taxid)
            .input('statelicensenumber',sql.VarChar,value.statelicensenumber)
            .input('county',sql.VarChar,value.county)
            .input('npi',sql.VarChar,value.npi)
            .input('workinghrs',sql.VarChar,value.workinghrs)
            .input('priority',sql.VarChar,value.priority)
            .input('referral',sql.Bit,value.referral)
            .input('mpn3095',sql.Bit,value.mpn3095)
            .input('mpn3096',sql.Bit,value.mpn3096)
            .input('mpn3097',sql.Bit,value.mpn3097)
            .input('mpn0701',sql.Bit,value.mpn0701)
            .input('mpn2347',sql.Bit,value.mpn2347)
            .input('mpn2125',sql.Bit,value.mpn2125)
            .input('mpn2128',sql.Bit,value.mpn2128)
            .input('mpn2126',sql.Bit,value.mpn2126)
            .input('mpn2127',sql.Bit,value.mpn2127)
            .input('mpn2129',sql.Bit,value.mpn2129)
            .input('mpn2130',sql.Bit,value.mpn2130)
            .input('mpn2173',sql.Bit,value.mpn2173)
            .input('mpn2079',sql.Bit,value.mpn2079)
            .input('mpn1635',sql.Bit,value.mpn1635)
            .input('mpn1636',sql.Bit,value.mpn1636)
            .input('mpn1637',sql.Bit,value.mpn1637)
            .input('mpn2474',sql.Bit,value.mpn2474)
            .input('mpn2473',sql.Bit,value.mpn2473)
            .input('mpn0598',sql.Bit,value.mpn0598)
            .input('mpn2502',sql.Bit,value.mpn2502)
            .input('mpn2469',sql.Bit,value.mpn2469)
            .input('mpn2468',sql.Bit,value.mpn2468)
            .input('mpn2376',sql.Bit,value.mpn2376)
            .input('mpn2394',sql.Bit,value.mpn2394)
            .input('mpn1203',sql.Bit,value.mpn1203)
            .input('mpn3104',sql.Bit,value.mpn3104)
            .input('deleted',sql.Bit,true)
            .input('created',sql.DateTime,value.created)
            .input('deleted_date',sql.DateTime,new Date())
            .input('deleted_by',sql.VarChar,value.user)
            .input('newid',sql.Int,value.newid)
            .query(queries.updateData)
            .then(() => {
              cnt ++;
            })
            if(cnt === req.body.length) {
              const result2 = await pool.request()
              .query(queries.getAllData)
              res.json(result2.recordset)
            }
          });
        } else {
          res.send('Please select more than one row')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addToDatabase(req , res){
      try {
        if(req.files !== null ) {
          const file = req.files.file;

          file.mv(`${__dirname}/data/${file.name}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
          })
          
          const pool = await poolPromise;
          const ext = file.name.split('.').pop();
          cnt = 0;

          if(ext === "csv") {
            csv()
            .fromFile(`${__dirname}/data/${file.name}`)
            .then(async json => {
              const rows_cnt = json.length;
              let flag = false;

              for(let i = 0; i < rows_cnt; i ++) {
                flag = await insertRow(json[i], pool, rows_cnt);
                if(flag) {
                  let data = await pool.request().query(queries.getAllData);
                  return res.json(data.recordset);
                }
              }
            })
          }
          
          if(ext === "txt") {  
            fs.readFile(`${__dirname}/data/${file.name}`,"utf8", async function(err, data){
              var rows = data.split("\r\n");
              var json = [];
              var keys = [];
          
              rows.forEach((value, index) => {
                if(index < 1){    // get the keys from the first row in the tab space file
                  keys = value.split("\t");
                } else {    // put the values from the following rows into object literals
                  const values = value.split("\t");
                  
                  json[index-1] = values.map((value, ind) => {
                    return {
                      [keys[ind]]: value
                    }
                  }).reduce((currentValue, previousValue) => {
                    return {
                      ...currentValue,
                      ...previousValue
                    }
                  });
                }
              });
          
              json.pop();

              const rows_cnt = json.length;
              let flag = false;

              for(let i = 0; i < rows_cnt; i ++) {
                flag = await insertRow(json[i], pool, rows_cnt);
                if(flag) {
                  let data = await pool.request().query(queries.getAllData);
                  return res.json(data.recordset);
                }
              }
            });
          }
        } else {
          res.send('no file')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateDatabase(req , res){
      try {
        if(req.files !== null ) {
          const file = req.files.file;

          file.mv(`${__dirname}/data/${file.name}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
          })

          const query = 'DELETE FROM [dbo].[contacts]';
          const pool = await poolPromise;
          await pool.request().query(query);
          const ext = file.name.split('.').pop();
          let i = 0;
          if(ext === "csv") {
            csv()
            .fromFile(`${__dirname}/data/${file.name}`)
            .then(async json => {
              const rows_cnt = json.length;
              let flag = false;

              for(let i = 0; i < rows_cnt; i ++) {
                flag = await insertRow(json[i], pool, rows_cnt);
                if(flag) {
                  let data = await pool.request().query(queries.getAllData);
                  return res.json(data.recordset);
                }
              }
            })
          }
          
          if(ext === "txt") {
            fs.readFile(`${__dirname}/data/${file.name}`,"utf8", async function(err, data){
              var rows = data.split("\r\n");
              var json = [];
              var keys = [];
          
              rows.forEach((value, index) => {
                if(index < 1){    // get the keys from the first row in the tab space file
                  keys = value.split("\t");
                } else {    // put the values from the following rows into object literals
                  const values = value.split("\t");
                  
                  json[index-1] = values.map((value, ind) => {
                    return {
                      [keys[ind]]: value
                    }
                  }).reduce((currentValue, previousValue) => {
                    return {
                      ...currentValue,
                      ...previousValue
                    }
                  });
                }
              });
          
              json.pop();
              const rows_cnt = json.length;
              let flag = false;

              for(let i = 0; i < rows_cnt; i ++) {
                flag = await insertRow(json[i], pool, rows_cnt);
                if(flag) {
                  let data = await pool.request().query(queries.getAllData);
                  return res.json(data.recordset);
                }
              }
            });
          }
        } else {
          res.send('no file')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }    
}

const controller = new MainController()
module.exports = controller;