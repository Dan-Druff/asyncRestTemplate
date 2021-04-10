


var environments = {};

environments.staging = {
'httpPort':3000,
'httpsPort':3001,
'envName': 'staging',
'hashingSecret':'thisIsASecret',
'templateGlobals':{
    'appName':'asyncTemplate',
    'companyName':'hamtronmedia',
    'yearCreated':'2021',
    'baseUrl' : 'http://localhost:3000'
}

};
//  -------   tttooooo ddddoooo...base url for production
environments.production = {
'httpPort':process.env.PORT || 5000,
'envName': 'production',
'hashingSecret':'thisIsASecret',
'templateGlobals':{
    'appName':'asyncTemplate',
    'companyName':'hamtronmedia',
    'yearCreated':'2021',
    'baseUrl' : ''
}
};

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;