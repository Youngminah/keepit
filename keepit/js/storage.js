// import logger from '../js/logger.js'

// export default {
//   storageCache: {},

//   get(key) {
//     return new Promise((resolve, reject) => {
//       if (this.storageCache[key]) {
//         logger.log('on-cache')
//         resolve(this.storageCache[key])
//         return
//       }
//       chrome.storage.local.get([key], (result) => {
//         this.storageCache[key] = this.storageCache[key]
//           ? this.storageCache[key]
//           : null
//         resolve(result[key])
//       })
//     })
//   },

//   set(key, value) {
//     return new Promise((resolve, reject) => {
//       const data = {}
//       data[key] = value
//       try {
//         chrome.storage.local.set(data, resolve(data))
//       } catch (error) {
//         reject(error)
//       }
//     })
//   }
// }
