import {readFile} from 'fs/promises'
import path from 'path'

const validName = /^[A-Za-z0-9_\-\.]+$/

if(!validName.test(Query.folder) || !validName.test(Query.file)) {
    throw new Error('Invalid folder or file name')
}

const file = path.join(__dirname, '..', 'pages', Query.folder, Query.file + '.html')
const content = await readFile(file, 'utf8')