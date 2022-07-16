
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
      displayName
      traits {
        name instance 
        ... on BatteryLevelDeviceTrait {
          state {
            percentage {
              reported { value sampledAt createdAt }
            }
            status {
              reported { value sampledAt createdAt }
            }
          }
        }
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
        ... on PinCodeCredentialDeviceTrait {
          state {
            pinCodeCredentialList {
              reported {
                sampledAt
                createdAt
                value {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

exports.setLocked = 
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

exports.setUnlocked =  
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

