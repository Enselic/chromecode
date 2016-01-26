/*

node_modules/requirejs/bin/r.js -o build.js

*/
({
    baseUrl: "js",
    paths: {
        "jquery": "jquery-2.1.4.min",
        "jquery.lazyload": "jquery.lazyload-1.9.7.min"
    },
    shim: {
        "jquery.lazyload": ["jquery"]
    },
    name: "default",
    out: "js/default-built.js"
})
