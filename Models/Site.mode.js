function active(name) {
    return Request.path.startsWith('/' + name) ? " active" : "";
}

const darkMode = Request.cookies?.halfmoon_preferredMode == 'dark-mode';