const express =  require('express');
const controller = require('../controller/controller');

const router = express.Router();
router.get('/api/getAllData', controller.getAllData);
router.post('/api/quicksearch', controller.quicksearch);
router.post('/api/addNewData' , controller.addNewData);
router.put('/api/updateData',controller.updateData);
router.delete('/api/deleteData' , controller.deleteData);
// router.post('/api/updateFromCSV' , controller.updateFromCSV);
// router.post('/api/addFromCSV' , controller.addFromCSV);
router.post('/api/updateDatabase', controller.updateDatabase);
router.post('/api/addToDatabase', controller.addToDatabase);

module.exports = router;