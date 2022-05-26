
const allDevices = JSON.stringify({
  query: `{
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
  }`,
});

const lockAction = JSON.stringify({
  mutation: `{
    makelockActionRequest ("75b7763a-2922-46c1-8011-713d47c680a0": ID!) {
      actionLockSetLocked (deviceId: "75b7763a-2922-46c1-8011-713d47c680a0" lock: true) {
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
      }
  }`
})

const unlockAction = JSON.stringify({
  mutation: `{
    makelockActionRequest ("75b7763a-2922-46c1-8011-713d47c680a0": ID!) {
      actionLockSetLocked (deviceId: "75b7763a-2922-46c1-8011-713d47c680a0" lock: false) {
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
      }
  }`
})

module.exports = { allDevices, lockAction, unlockAction };