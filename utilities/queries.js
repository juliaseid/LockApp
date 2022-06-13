
exports.allDevices = JSON.stringify({
  query: `
    query
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
  `,
});

exports.getLockDetails(deviceId) = JSON.stringify({
  query: `
  query getLockStatus ($deviceId: ID!) {
    device (id: $deviceId) {
      traits {
        name instance 
        ... on LockDeviceTrait {
          state {
            isLocked {
              reported { value sampledAt createdAt }
            },
            isJammed {
              reported { value sampledAt createdAt }
            }
          }
        }
        ...on BatteryLevelDeviceTrait {
          state {
            percentage {
              reported { value sampledAt createdAt }
            }
            status {
              reported { value sampledAt createdAt }
            }
          }
        }
        ...on PinCodeCredentialDeviceTrait {
          properties { maxNumberOfPinCodeCredentials }
          state {
            pinCodeCredentialList {
              reported { 
                value {
                  edges {
                    node {
                      name
                      pinCode
                    }
                  }  
                } 
                sampledAt createdAt }
            }
          }
        }
      }
    }
  }`,
  variables: `{
    "deviceId": "${deviceId}"
  }`,
});

exports.lockAction = JSON.stringify({
  query: `
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
  }
)

exports.unlockAction = JSON.stringify({
  query: 
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
  }
)

