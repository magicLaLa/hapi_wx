const good = require('good')

module.exports = {
  register: good,
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      typeConsole: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        },
        {
          module: 'good-console',
          args: [{ color: true }]
        },
        'stdout'
      ],
      typeFile: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ ops: '*' }]
        },
        {
          module: 'good-squeeze',
          name: 'SafeJson'
        },
        {
          module: 'good-file',
          args: ['logs/awesome_log']
        }
      ],
      typeHttp: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ error: '*' }]
        },
        {
          module: 'good-http',
          args: ['http://target.log:3000', {
            wreck: {
              headers: {
                'x-api-key': 12345
              }
            }
          }]
        }
      ]
    }
  }
}