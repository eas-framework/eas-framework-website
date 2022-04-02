import {SearchRecord} from '@eas-framework/server'

const docSearch = new SearchRecord('records/search.serv')
await docSearch.load()

export default {
    GET: {
        define: {
            version: String,
            query: String
        },
        func (Request, Response, _, {query, version}){
           return docSearch.search(query, {
               length: 50,
               addAfterMaxLength: '...',
               fuzzy: 0.9,
               filter: ({url}) =>url.startsWith('/docs/' + version + '/')
            })
           .splice(0, 10).map(x => ({text: x.text, url: x.url}))
        }
    }
}