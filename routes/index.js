var express = require('express');
var router = express.Router();
var device_controller = require('../controllers/device_controller');
const jsStringify = require('js-stringify');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'My Device Portal' });
});

// GET all devices
router.get('/devicelist', async (req, res) => {
  var devices = await device_controller.device_list();
  res.render('devicelist', {title: 'My Devices', devices: devices})
});

router.get('/devicedetails/:id', async (req , res) => {
  await device_controller.device_details(req.params.id);
  res.send('id:' + req.params.id);
});

module.exports = router;
