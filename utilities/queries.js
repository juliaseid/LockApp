
exports.allDevices =
  `query
  getMyDevices {
    me {
      devices {
        edges{
          node {
            id
            displayName
            productInformation {
              description
              manufacturer
              model
              serialNumber
            }
          }
        }
      }
    }
  }
  `;

exports.getLockDetails =
  `query getLockDetails($deviceId: ID!) {
    device ( id: $deviceId ) {
      traits {
        name instance 
        ... on LockDeviceTrait {
          properties { supportsIsJammed }
          state {
            isLocked {
              reported { value sampledAt createdAt }
            },
            isJammed {
              reported { value sampledAt createdAt }
            }
          }
        }
      }
    }
  }`;

exports.lockAction = 
  `
  mutation 
  makelockActionRequest ($deviceId: ID!) {
    actionLockSetLocked (deviceId: $deviceId lock: true) {
      actionId
      device {
        traits {
          name instance
          ... on LockDeviceTrait {
            properties { supportsIsJammed }
            state {
              isLocked {
                reported { value sampledAt createdAt }
                desired { value delta updatedAt }
                }
              }
            }
          }
        }
      }
    }`
  ;

exports.unlockAction =  
  `mutation
  makelockActionRequest ($deviceId: ID!) {
    actionLockSetLocked (deviceId: $deviceId lock: false) {
      actionId
      device {
        traits {
          name instance
          ... on LockDeviceTrait {
            properties { supportsIsJammed }
            state {
              isLocked {
                reported { value sampledAt createdAt }
                desired { value delta updatedAt }
                }
              }
            }
          }
        }
      }
    }`

