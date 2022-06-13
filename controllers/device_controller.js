const { queryFunction } = require('../utilities/queryFunction');
const { allDevices, getLockDetails } = require('../utilities/queries');

exports.device_list = async function () {
  try {
  const data =  await queryFunction(allDevices);
  const innerData = Object.values(data)[0];
  const myData = innerData["me"];
  const deviceData = myData["devices"];
  const edgeData = deviceData["edges"];
  let nodeArray = [];
  edgeData.forEach(element => {
    nodeArray.push(Object.values(element));
  });
  let deviceArray = [];
  console.log("inside function")
  nodeArray.forEach(e => {
    e.forEach(d => {
      deviceArray.push(d);
    })
  })
  return deviceArray;
  } catch(err) {
      console.log(err);
  }
}

exports.device_details = async function (deviceId) {
  try {
    const data = await queryFunction(getLockDetails(deviceId));
    const innerData = Object.values(data)[0];
    const deviceData = innerData["device"]
    const lockTrait = deviceData[0];
    const pinTrait = deviceData[1];
    const batteryTrait = deviceData[2];
    console.log("lock trait");
    console.log(lockTrait);
    console.log("PIN trait");
    console.log(pinTrait);
    console.log("battery trait");
    console.log(batteryTrait);
  } catch(err) {
    console.log(err)
  }
}


