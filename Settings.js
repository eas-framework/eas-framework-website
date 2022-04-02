export default {
    development: true && !process.argv.includes('production'),

    general: {
        pageInRam: true,
        ignoreError: ['close-tag']
    },

    compile: {
        define: {
            version: 1
        }
    },

    routing: {
        rules: {
            "/docs/"(url) {
                const version = url.split('/v')[1][0]
                return `/docs/v${version}/index`
            }
        }
    },

    serve: {
        port: 8080
    },

    impProd: {
        compile: {
            plugins: ['MinAll']
        }
    }
}