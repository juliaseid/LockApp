var express = require('express');
var router = express.Router();
var device_controller = require('./controllers/device_controller');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'My Device Portal' });
});

// GET all devices
router.get('/devicelist', async (req, res) => {
  var devices = await device_controller.device_list();
  res.render('devicelist', {title: 'My Devices', devices: devices})
});

router.get('/devicedetails/:deviceId', async (req , res) => {
  var deviceId = req.params.deviceId;
  var deviceData = await device_controller.device_details(deviceId);
  res.render('devicedetails', {title: 'Device Detail', deviceName: deviceData.deviceName, deviceId:deviceId, lockStatus: deviceData.lockStatus, jammedStatus: deviceData.jammedStatus, batteryLevel: deviceData.batteryLevel, pinCodeNames: deviceData.pinCodeNames });
});

router.get('/devicedetails/:deviceId/set_locked', async (req, res) => {
  var deviceId = req.params.deviceId;
  await device_controller.set_locked(deviceId);
  res.redirect(`/devicedetails/${deviceId}`);
});

router.get('/devicedetails/:deviceId/set_unlocked', async (req, res) => {
  var deviceId = req.params.deviceId;
  await device_controller.set_unlocked(deviceId);
  res.redirect(`/devicedetails/${deviceId}`);
});


module.exports = router;
