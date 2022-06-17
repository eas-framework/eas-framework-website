export default {
    development: !process.argv.includes('production'),

    general: {
        pageInRam: true,
        ignoreError: ['close-tag']
    },

    compile: {
        define: {
            version: 1,
            specific: '.4.1'
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
        port: 80
    },

    implProd: {
        compile: {
            plugins: ['MinAll']
        }
    }
}