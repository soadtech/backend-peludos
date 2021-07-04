export default {
    info: (msg = 'SUCCESS') => {
        console.log(msg)
    },
    error: (msg, e = '') => {
        console.log(`⚠️  ${msg} ⚠️ `, e)
    }
}
