const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);
const csv = require('csv-parser');

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
    async quicksearch(req , res){
      try {
        const value = req.body.value;
        const query = `SELECT * FROM [dbo].[contacts] WHERE first LIKE '%${value}%' OR last LIKE '%${value}%' OR degree LIKE '%${value}%' OR entity LIKE '%${value}%' OR specialty LIKE '%${value}%' OR dwc LIKE '%${value}%' OR code LIKE '%${value}%' OR address LIKE '%${value}%' OR suite LIKE '%${value}%' OR city LIKE '%${value}%' OR state LIKE '%${value}%' OR zip LIKE '%${value}%' OR phone LIKE '%${value}%' OR fax LIKE '%${value}%' OR latitude LIKE '%${value}%' OR longitude LIKE '%${value}%' OR taxid LIKE '%${value}%' OR statelicensenumber LIKE '%${value}%' OR county LIKE '%${value}%' OR workinghrs LIKE '%${value}%' OR priority LIKE '%${value}%' OR referral LIKE '%${value}%'`;
        const pool = await poolPromise;
        const result = await pool.request()
        .query(query)
        res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async addNewData(req , res){
      try {
        const pool = await poolPromise
        const result1 = await pool.request()
        .input('created',sql.DateTime , new Date())
        .query(queries.addNewData)

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
        .input('workinghrs',sql.VarChar,value.workinghrs)
        .input('priority',sql.VarChar,value.priority)
        .input('referral',sql.VarChar,value.referral)
        .input('mpn0589',sql.Bit,value.mpn0589)
        .input('mpn0701',sql.Bit,value.mpn0701)
        .input('mpn1203',sql.Bit,value.mpn1203)
        .input('mpn2079',sql.Bit,value.mpn2079)
        .input('mpn2125',sql.Bit,value.mpn2125)
        .input('mpn2126',sql.Bit,value.mpn2126)
        .input('mpn2128',sql.Bit,value.mpn2128)
        .input('mpn2347',sql.Bit,value.mpn2347)
        .input('mpn2376',sql.Bit,value.mpn2376)
        .input('mpn2394',sql.Bit,value.mpn2394)
        .input('mpn2451',sql.Bit,value.mpn2451)
        .input('mpn2452',sql.Bit,value.mpn2452)
        .input('mpn3091',sql.Bit,value.mpn3091)
        .input('mpn3095',sql.Bit,value.mpn3095)
        .input('mpn3096',sql.Bit,value.mpn3096)
        .input('mpn3097',sql.Bit,value.mpn3097)
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
            .input('workinghrs',sql.VarChar,value.workinghrs)
            .input('priority',sql.VarChar,value.priority)
            .input('referral',sql.VarChar,value.referral)
            .input('mpn0589',sql.Bit,value.mpn0589)
            .input('mpn0701',sql.Bit,value.mpn0701)
            .input('mpn1203',sql.Bit,value.mpn1203)
            .input('mpn2079',sql.Bit,value.mpn2079)
            .input('mpn2125',sql.Bit,value.mpn2125)
            .input('mpn2126',sql.Bit,value.mpn2126)
            .input('mpn2128',sql.Bit,value.mpn2128)
            .input('mpn2347',sql.Bit,value.mpn2347)
            .input('mpn2376',sql.Bit,value.mpn2376)
            .input('mpn2394',sql.Bit,value.mpn2394)
            .input('mpn2451',sql.Bit,value.mpn2451)
            .input('mpn2452',sql.Bit,value.mpn2452)
            .input('mpn3091',sql.Bit,value.mpn3091)
            .input('mpn3095',sql.Bit,value.mpn3095)
            .input('mpn3096',sql.Bit,value.mpn3096)
            .input('mpn3097',sql.Bit,value.mpn3097)
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
    // async updateFromCSV(req , res){
    //   try {
    //     if(req.body.length !== 0 ) {
    //       const data = req.body;
    //       let query1 = "INSERT INTO [dbo].[contacts] (first, last, degree, entity, specialty, dwc, code, address, suite, city, state, zip, phone, fax, latitude, longitude, taxid, statelicensenumber, county, workinghrs, priority, referral, mpn0589, mpn0701, mpn1203, mpn2079, mpn2125, mpn2126, mpn2128, mpn2347, mpn2376, mpn2394, mpn2451, mpn2452, mpn3091, mpn3095, mpn3096, mpn3097, deleted, created, newid) VALUES ";
    //       data.map((value, index) => {
    //         let row = `("${value.first}","${value.last}","${value.degree}","${value.entity}","${value.specialty}","${value.dwc}","${value.code}","${value.address}","${value.suite}","${value.city}","${value.state}","${value.zip}","${value.phone}","${value.fax}","${value.latitude}","${value.longitude}","${value.taxid}","${value.statelicensenumber}","${value.county}","${value.workinghrs}","${value.priority}","${value.referral}","${value.mpn0589}","${value.mpn0701}","${value.mpn1203}","${value.mpn2079}","${value.mpn2125}","${value.mpn2126}","${value.mpn2128}","${value.mpn2347}","${value.mpn2376}","${value.mpn2394}","${value.mpn2451}","${value.mpn2452}","${value.mpn3091}","${value.mpn3095}","${value.mpn3096}","${value.mpn3097}","${value.deleted}","${value.created}", "${value.newid}")`;
    //         if(index !== data.length - 1) query1 += row + ',';
    //         else query1 += row + ';';
    //       })
          
    //       query1 = query1.replace(/\'/gi, "\''");
    //       query1 = query1.replace(/\"/gi, "'");
    //       let result2;
    //       const query = 'DELETE FROM [dbo].[contacts]';
    //       const pool = await poolPromise
    //       pool.request()
    //       .query(query)
    //       .then(() => {
    //         pool.request()
    //         .query(query1)
    //         .then(async () => {
    //           result2 = await pool.request()
    //           .query(queries.getAllData);
    //           res.json(result2.recordset)
    //         })
    //       })                  
    //     } else {
    //       res.send('Please select more than one row')
    //     }
    //   } catch (error) {
    //     res.status(500)
    //     res.send(error.message)
    //   }
    // }
    // async addFromCSV(req , res){
    //   try {
    //     if(req.body.length !== 0 ) {
    //       const data = req.body;
    //       let query1 = "INSERT INTO [dbo].[contacts] (first, last, degree, entity, specialty, dwc, code, address, suite, city, state, zip, phone, fax, latitude, longitude, taxid, statelicensenumber, county, workinghrs, priority, referral, mpn0589, mpn0701, mpn1203, mpn2079, mpn2125, mpn2126, mpn2128, mpn2347, mpn2376, mpn2394, mpn2451, mpn2452, mpn3091, mpn3095, mpn3096, mpn3097, deleted, created, newid) VALUES ";
    //       data.map((value, index) => {
    //         let row = `("${value.first}","${value.last}","${value.degree}","${value.entity}","${value.specialty}","${value.dwc}","${value.code}","${value.address}","${value.suite}","${value.city}","${value.state}","${value.zip}","${value.phone}","${value.fax}","${value.latitude}","${value.longitude}","${value.taxid}","${value.statelicensenumber}","${value.county}","${value.workinghrs}","${value.priority}","${value.referral}","${value.mpn0589}","${value.mpn0701}","${value.mpn1203}","${value.mpn2079}","${value.mpn2125}","${value.mpn2126}","${value.mpn2128}","${value.mpn2347}","${value.mpn2376}","${value.mpn2394}","${value.mpn2451}","${value.mpn2452}","${value.mpn3091}","${value.mpn3095}","${value.mpn3096}","${value.mpn3097}","${value.deleted}","${value.created}", "${value.newid}")`;
    //         if(index !== data.length - 1) query1 += row + ',';
    //         else query1 += row + ';';
    //       })
          
    //       query1 = query1.replace(/\'/gi, "\''");
    //       query1 = query1.replace(/\"/gi, "'");
    //       let result2;
    //       const pool = await poolPromise          
    //       pool.request()
    //       .query(query1)
    //       .then(async () => {
    //         result2 = await pool.request()
    //         .query(queries.getAllData);
    //         res.json(result2.recordset)
    //       })              
    //     } else {
    //       res.send('Please select more than one row')
    //     }
    //   } catch (error) {
    //     res.status(500)
    //     res.send(error.message)
    //   }
    // }

    async addToDatabase(req , res){
      try {
        if(req.body.length !== 0 ) {
          const data = req.body;
          let query1 = "INSERT INTO [dbo].[contacts] (first, last, degree, entity, specialty, dwc, code, address, suite, city, state, zip, phone, fax, latitude, longitude, taxid, statelicensenumber, county, workinghrs, priority, referral, mpn0589, mpn0701, mpn1203, mpn2079, mpn2125, mpn2126, mpn2128, mpn2347, mpn2376, mpn2394, mpn2451, mpn2452, mpn3091, mpn3095, mpn3096, mpn3097, deleted, created, newid) VALUES ";
          data.map((value, index) => {
            let row = `("${value.first}","${value.last}","${value.degree}","${value.entity}","${value.specialty}","${value.dwc}","${value.code}","${value.address}","${value.suite}","${value.city}","${value.state}","${value.zip}","${value.phone}","${value.fax}","${value.latitude}","${value.longitude}","${value.taxid}","${value.statelicensenumber}","${value.county}","${value.workinghrs}","${value.priority}","${value.referral}","${value.mpn0589}","${value.mpn0701}","${value.mpn1203}","${value.mpn2079}","${value.mpn2125}","${value.mpn2126}","${value.mpn2128}","${value.mpn2347}","${value.mpn2376}","${value.mpn2394}","${value.mpn2451}","${value.mpn2452}","${value.mpn3091}","${value.mpn3095}","${value.mpn3096}","${value.mpn3097}","${value.deleted}","${value.created}", "${value.newid}")`;
            if(index !== data.length - 1) query1 += row + ',';
            else query1 += row + ';';
          })
          
          query1 = query1.replace(/\'/gi, "\''");
          query1 = query1.replace(/\"/gi, "'");
          let result2;
          const query = 'DELETE FROM [dbo].[contacts]';
          const pool = await poolPromise
          pool.request()
          .query(query)
          .then(() => {
            pool.request()
            .query(query1)
            .then(async () => {
              result2 = await pool.request()
              .query(queries.getAllData);
              res.json(result2.recordset)
            })
          })                  
        } else {
          res.send('Please select more than one row')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateDatabase(req , res){
      try {
        console.log("herhehehreh", req.files, req.file);        

        if(req.files !== null ) {
          const file = req.files.file;

          file.mv(`${__dirname}/${file.name}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
          })

          console.log(`${__dirname}/${file.name}`);

          const query = 'DELETE FROM [dbo].[contacts]';
          const pool = await poolPromise;
          pool.request()
          .query(query)

          fs.createReadStream(`${__dirname}/${file.name}`)
          .pipe(csv())
          .on('data', async function(value){
            console.log("*", value)
            try{
              let query1 = `INSERT INTO [dbo].[contacts] (first, last, degree, entity, specialty, dwc, code, address, suite, city, state, zip, phone, fax, latitude, longitude, taxid, statelicensenumber, county, workinghrs, priority, referral, mpn0589, mpn0701, mpn1203, mpn2079, mpn2125, mpn2126, mpn2128, mpn2347, mpn2376, mpn2394, mpn2451, mpn2452, mpn3091, mpn3095, mpn3096, mpn3097, deleted, created, newid) VALUES 
                ("${value.first}","${value.last}","${value.degree}","${value.entity}","${value.specialty}","${value.dwc}","${value.code}","${value.address}","${value.suite}","${value.city}","${value.state}","${value.zip}","${value.phone}","${value.fax}","${value.latitude}","${value.longitude}","${value.taxid}","${value.statelicensenumber}","${value.county}","${value.workinghrs}","${value.priority}","${value.referral}","${value.mpn0589}","${value.mpn0701}","${value.mpn1203}","${value.mpn2079}","${value.mpn2125}","${value.mpn2126}","${value.mpn2128}","${value.mpn2347}","${value.mpn2376}","${value.mpn2394}","${value.mpn2451}","${value.mpn2452}","${value.mpn3091}","${value.mpn3095}","${value.mpn3096}","${value.mpn3097}","${value.deleted}","${value.created}", "${value.newid}")`;
              query1 = query1.replace(/\'/gi, "\''");
              query1 = query1.replace(/\"/gi, "'");
              await pool.request().query(query1);
            }
            catch(err) {
              console.error(err);
              return res.status(500).send(err);
            }
          })
          .on('end', function() {
            const result2 = pool.request()
            .query(queries.getAllData)
            .then((result) => {
              console.log("end", result);
              res.json(result.recordset)
            })
          })
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