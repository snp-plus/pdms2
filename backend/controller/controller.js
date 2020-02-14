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
        if(req.body.Name != null && req.body.Email != null && req.body.Password != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('user',sql.VarChar , req.body.Name)
          .input('email',sql.VarChar , req.body.Email)
          .input('password',sql.VarChar,req.body.Password)
          .query(queries.addNewUser)
          res.json(result)
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    }
    async updateData(req , res){
      try {
        console.log("result", req.body)
        
        const pool = await poolPromise
        const result = await pool.request()
        .input('id',sql.VarChar , req.body.id)
        .input('first',sql.VarChar , req.body.first)
        .input('last',sql.VarChar,req.body.last)
        .input('degree',sql.VarChar,req.body.degree)
        .input('entity',sql.VarChar,req.body.entity)
        .input('specialty',sql.VarChar,req.body.specialty)
        .input('dwc',sql.VarChar,req.body.dwc)
        .input('code',sql.VarChar,req.body.code)
        .input('address',sql.VarChar,req.body.address)
        .input('suite',sql.VarChar,req.body.suite)
        .input('city',sql.VarChar,req.body.city)
        .input('state',sql.VarChar,req.body.state)
        .input('zip',sql.VarChar,req.body.zip)
        .input('phone',sql.VarChar,req.body.phone)
        .input('fax',sql.VarChar,req.body.fax)
        .input('latitude',sql.VarChar,req.body.latitude)
        .input('longitude',sql.VarChar,req.body.longitude)
        .input('taxid',sql.VarChar,req.body.taxid)
        .input('statelicensenumber',sql.VarChar,req.body.statelicensenumber)
        .input('county',sql.VarChar,req.body.county)
        .input('workinghrs',sql.VarChar,req.body.workinghrs)
        .input('priority',sql.VarChar,req.body.priority)
        .input('referral',sql.VarChar,req.body.referral)
        .input('mpn0589',sql.VarChar,req.body.mpn0589)
        .input('mpn0701',sql.VarChar,req.body.mpn0701)
        .input('mpn1203',sql.VarChar,req.body.mpn1203)
        .input('mpn2079',sql.VarChar,req.body.mpn2079)
        .input('mpn2125',sql.VarChar,req.body.mpn2125)
        .input('mpn2126',sql.VarChar,req.body.mpn2126)
        .input('mpn2128',sql.VarChar,req.body.mpn2128)
        .input('mpn2347',sql.VarChar,req.body.mpn2347)
        .input('mpn2376',sql.VarChar,req.body.mpn2376)
        .input('mpn2394',sql.VarChar,req.body.mpn2394)
        .input('mpn2451',sql.VarChar,req.body.mpn2451)
        .input('mpn2452',sql.VarChar,req.body.mpn2452)
        .input('mpn3091',sql.VarChar,req.body.mpn3091)
        .input('mpn3095',sql.VarChar,req.body.mpn3095)
        .input('mpn3096',sql.VarChar,req.body.mpn3096)
        .input('mpn3097',sql.VarChar,req.body.mpn3097)
        .input('deleted',sql.VarChar,req.body.deleted)
        .input('created',sql.VarChar,req.body.created)
        .input('delete_date',sql.VarChar,req.body.delete_date)
        .input('deleted_by',sql.VarChar,req.body.deleted_by)
        .input('newid',sql.VarChar,req.body.newid)
        .query(queries.updateData)
        res.json(result)

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteData(req , res){
      try {
        if(req.body.Name != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('userName',sql.VarChar,req.body.Name)
            .query(queries.deleteUser)
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new MainController()
module.exports = controller;