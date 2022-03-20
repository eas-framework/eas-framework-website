export default {
    development: process.argv.includes('production'),

    general: {
        pageInRam: true,
        ignoreError: ['close-tag']
    },

    serve: {
        port: 8080
    }
}