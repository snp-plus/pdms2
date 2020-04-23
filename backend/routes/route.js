const express =  require('express');
const controller = require('../controller/controller');
const auth = require('../middleware/auth');

const router = express.Router();
router.get('/api/getAllData', auth, controller.getAllData);
router.post('/api/quicksearch', auth, controller.quicksearch);
router.post('/api/addNewData', auth, controller.addNewData);
router.post('/api/filterData', auth, controller.filterData);
router.put('/api/updateData', auth, controller.updateData);
router.delete('/api/deleteData', auth, controller.deleteData);
// router.post('/api/updateFromCSV' , controller.updateFromCSV);
// router.post('/api/addFromCSV' , controller.addFromCSV);
router.post('/api/updateDatabase', auth, controller.updateDatabase);
router.post('/api/addToDatabase', auth, controller.addToDatabase);
router.post('/api/insertDelReason', auth, controller.insertDelReason);

module.exports = router;