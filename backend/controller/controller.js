const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAllData(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
        .query(queries.getAllData)
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
          const pool = await poolPromise
          req.body.map(async value => {
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

            const result2 = await pool.request()
            .query(queries.getAllData)
            res.json(result2.recordset)
          })
        
        // res.json(result)
        } else {
          res.send('Please select more than one row')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new MainController()
module.exports = controller;