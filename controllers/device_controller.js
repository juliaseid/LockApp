const { queryFunction } = require('../utilities/queryFunction');
const { allDevices } = require('../utilities/queries');

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


