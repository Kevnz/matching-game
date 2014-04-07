var config = {
    root: '.',
    port: 3000,
    filename: 'index.html'
}
//overriding defaults
require('static-cling').cling({ port: 4321, root : './' });