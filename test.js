const yargs = require('yargs');
const fs = require('fs/promises');
const path = require('path');


const argv = yargs
    .options('component', {alias: 'c', string: true})
    .demandOption(['component'], 'Enter component type')
    .command(['create <fileName> [name]', 'crt'], 'Template creation', {}, (argv)=>{
        const filepath = path.resolve(argv.name||argv.fileName);
        const content = `import React from "react";
            function ${argv.fileName} () {
                return(
                    <>
                        <${argv.component} />
                    </>
                )
            }
            export default ${argv.fileName}`
        fs.writeFile(`${filepath}.js`, content)
            .then(( )=> console.log('File saved'))
            .catch(() => console.error('File did not save'))
    })
    .demandCommand(1, 'At least 1 command should be passed')
    .argv;