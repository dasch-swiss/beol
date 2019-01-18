// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    name: 'dev',
    production: false,
    api: 'http://0.0.0.0:3333',
    externalApiURL: 'http://0.0.0.0:3333',
    app: 'http://localhost:4200',
    appName: 'BEOL | Bernoulli-Euler OnLine',
    media: 'http://localhost:1024',
    pagingLimit: 25,
    firebase: {
        apiKey: 'AIzaSyAGr-TWw1NaycUrL3IaJQ63D2YguVafYTA',
        authDomain: 'test-5034c.firebaseapp.com',
        databaseURL: 'https://test-5034c.firebaseio.com',
        projectId: 'test-5034c',
        storageBucket: 'test-5034c.appspot.com',
        messagingSenderId: '44326559957'
    },
    tei: {
        letter: {
            'textProperty': 'http://0.0.0.0:3333/ontology/0801/beol/v2#hasText',
            'mappingIRI': '',
            'gravsearchTemplateIri': '',
            'teiHeaderXSLTIri': ''
        }
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
