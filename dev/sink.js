const pug = require('pug')
const fs = require('fs')

let html = pug.renderFile('dev/sink.pug')
fs.writeFileSync('dev/sink.html', html)
