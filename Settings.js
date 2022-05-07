export default {
    development: !process.argv.includes('production'),

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
                const version = url.split('/v')[1]?.[0]
                return version ? `/docs/v${version}/index`: url
            }
        }
    },

    serve: {
        port: 8080
    },

    implProd: {
        compile: {
            plugins: ['MinAll']
        }
    }
}