const path = require("path");
module.exports = {
    resolve: {
        alias: {
            'components': path.resolve(__dirname, 'src/components'),
            'helpers': path.resolve(__dirname, 'src/helpers'),
            'services': path.resolve(__dirname, 'src/services'),
            'store': path.resolve(__dirname, 'src/store'),
            // ...etc
        },
    },
}