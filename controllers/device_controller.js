const { queryFunction } = require('../utilities/queryFunction');
const { allDevices, getLockDetails, setLocked, setUnlocked } = require('../utilities/queries');

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
    var deviceVariable = {deviceId: `${deviceId}`};
    const data = await queryFunction(getLockDetails, deviceVariable);
    const innerData = Object.values(data)[0];
    const deviceData = innerData["device"]
    const deviceName = deviceData.displayName
    const lockTrait = deviceData["traits"][0];
    const lockData = {
      isLocked : lockTrait.state.isLocked.reported.value,
      isJammed : lockTrait.state.isJammed.reported.value
    }
    let lockStatus
    if (lockData.isLocked) {
      lockStatus = "locked"
    } else {
      lockStatus = "unlocked"
    }
    let jammedStatus 
    if (lockData.isJammed) {
      jammedStatus = "jammed"
    } else {
      jammedStatus = "not jammed"
    }
    const batteryTrait = deviceData["traits"][2];
    const batteryLevel = batteryTrait.state.percentage.reported.value
    const pinTrait = deviceData["traits"][1];
    const pinCodeCredentialList = pinTrait.state.pinCodeCredentialList.reported.value.edges
    const pinCodeNames = [] 
    pinCodeCredentialList.map((n)=> {
      let nodes = Object.values(n)
      nodes.map((n) => {
        pinCodeNames.push(n.name)
      })
    })
    return {deviceName, lockStatus, jammedStatus, batteryLevel, pinCodeNames}
  } catch(err) {
    console.log(err)
  }
}

exports.set_locked = async function (deviceId) {
  try {
    var deviceVariable = {deviceId: `${deviceId}`};
    const data = await queryFunction(setLocked, deviceVariable);
    console.log (data)
  } catch(err) {
    console.log(err)
  }
}

exports.set_unlocked = async function (deviceId) {
  try {
    var deviceVariable = {deviceId: `${deviceId}`};
    const data = await queryFunction(setUnlocked, deviceVariable);
    console.log (data)
  } catch(err) {
    console.log(err)
  }
}


