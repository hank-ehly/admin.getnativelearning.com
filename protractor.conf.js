// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

let mockAPI;

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {
        }
    },
    beforeLaunch: function() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });

        mockAPI = require('./mock-api').listen(3000, () => {
            console.log('Mock API is running')
        });
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    },
    afterLaunch: function() {
        mockAPI.close();
    }
};
