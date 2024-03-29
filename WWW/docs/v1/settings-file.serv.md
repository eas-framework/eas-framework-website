# Settings File
The settings file can be a TypeScript file OR JavaScript file.
In this example, we use a JavaScript file

In our root folder, we create `Settings.js`

### Recommended Settings
```js
export default {
    development: true, // development mode, if off, then is optimize for production

    general: {
        pageInRam: true,
    },

    implDev: {
        serveLimits: {
            cacheDays: 0
        }
    }
}    
```

### All Settings
```js
export default {
    development: true, // development mode, if off, then is optimize for production
    websiteDirectory: '.',
    
    general: {
        pageInRam: true,
        importOnLoad: ["OnStart.serv.ts"] // Search for 'StartServer' function (app: TinyApp, {server: http.server, listen: (port) => {}, close: () => {}}, settings: ExportSettings)
    },

    compile: {
        compileSyntax: ["TypeScript"],
        ignoreError: [], //"close-tag" | "component-not-found" | "ts-warning" | "js-warning" | "page-not-found" | "sass-import-not-found" | "css-warning" | "compilation-error" | "jsx-warning" | "tsx-warning"
        plugins: [], // "MinAll" | "MinHTML" | "MinCss" | "MinSass" | "MinJS" | "MinTS" | "MinJSX" | "MinTSX"...
        define: { // global define - will bee explained later
            name: 'cool',
            version: 20
        },
        pathAliases: { // esm path aliases (not for dynamic imports)
            "@imr": "/server/import/" // for example: import {func} from '@imp/data.serv.js' -> import {func} from '/server/import/data.serv.js'
            //      ('/' is relative to the WWW folder)
        },
        global: { // const variables that available globaly
            versionDate: Date.now()
        }
    },

    routing: {
        rules: {
            "/Examples/User/": (url, req, res) => '/Files/User/Examples/' + url.split('/').pop()
        },
        urlStop: [ // make sure any path after x remains same as x, for example /admin/editUsers/34234/cool => /admin/editUsers
            "/User/Files"
        ],
        errorPages: false || {
            notFound: {
                code: 404,
                path: "errors/e404"
            },
            serverError: {
                code: 500,
                path: "errors/e500"

            }
        },
        sitemap: true || {
            rules: true,
            urlStop: false,
            errorPages: false,
            validPath: true,
            file: 'sitemap.xml',
            updateAfterHours: 0 // update sitemap on new request after x hours
        },
        ignoreTypes: ["json"], // ignore file extension (auto ignore common server files)
        ignorePaths: ["/Private"],
        validPath: [(url, req, res) => url.substring(3, 5) != 'hi'] // check url path, if one of the methods return false, then the server returns a 404
    }, 
    serveLimits: {
        cacheDays: 3,
        fileLimitMB: 10,
        requestLimitMB: 4,
        cookiesExpiresDays: 1,
        sessionTotalRamMB: 150,
        sessionTimeMinutes: 40,
        sessionCheckPeriodMinutes: 30,
    },
    serve: {
        port: 8080,
        http2: false,
        greenLock: { // for production
            agreeToTerms: false,
            email: "example@@example.com",
            sites: [{ "subject": "example.com", "altnames": ["example.com", "www.example.com"] }]
        }
    },
    //custom settings - same as above but only active if development is on/off
    implDev: {
        //custom settings for development
    }, 
    implProd: {
        //custom settings for production
    }
}
```