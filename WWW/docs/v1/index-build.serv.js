
import fs from 'fs/promises'
import path from 'path';

const titles = {
    "getting-started": "Getting Started",
    "cli-commands": "CLI Commands",
    "settings-file": "Settings File",

    "mpc": "Model, Page, Component",
    "ssr": "SSR (Server Side Rendering)",
    "server-files": "Server Files",
    "ssr-compile": "Compile RunTime",

    "binding-connect": "Connect Component",
    "binding-form": "Form Component",
    "binding-api": "API File",

    "client-component": "Client Component",
    "markdown-component": "Markdown Component",
    "record-component": "Record Component",
    "search-component": "Search Component",
    "isolate-component": "Isolate Component",

    "client-ts": "Client TypeScript",
    "client-sass": "Client SASS",
    "client-jsx": "Client JSX & TSX",
    "client-scope": "Client Scope - Script/Style",
    "client-svelte": "Client Svelte",


    "external-packages": "External Packages",
    "global": "Global Objects",
    "troubleshooting": "Troubleshooting",
    "examples": "Guides and Examples",

    "example/calculator": "Simple Calculator",
    "example/chat": "WS Chat",
    "example/gallery": "Simple Gallery",
}

export default async function readPath(dir, __localpath) {
    let buildText = '', writeTitle = '';

    const files = await fs.readdir(path.join(__dirname, dir), { withFileTypes: true }); // read markdown from folder

    for (const file of files) {
        if (!file.name.endsWith('.serv.md')) continue;

        const filePath = dir + file.name;
        if (file.isDirectory()) {
            await readPath(filePath + '/')
            continue;
        }

        const normalize = path.normalize(filePath).slice(0, -8); // file path

        // build script checker - switch markdown
        writeTitle += `
if(pagePath == "${normalize}"){
title = "${titles[normalize]}";
}
`;
        buildText += `@if(pagePath == "${normalize}"){
<MSearch file="${filePath}" link="${path.join(__localpath.substring(1), '..', normalize)}" />
}`;

    }

    return {writeTitle, buildText}
}