import { Injectable } from '@angular/core';

// TODO: delete

export interface IAppConfig {

    env: {
        name: string;
    };
    ontologyIRI: string;
    apiURL: string;
    externalApiURL: string;
    iiifURL: string;
    appURL: string;
    appName: string;
    localData: string;
    pagingLimit: number;
    startComponent: string;
    leibnizApi: string;
    tei: TeiConfig;
}

export interface TeiConfig {

    [index: string]: TeiConfigElement;

}

export interface TeiConfigElement {

    gravsearchTemplateIri: string;
    mappingIRI: string;
    teiHeaderXSLTIri: string;
    textProperty: string;
}

@Injectable()
export class AppInitService {

    static settings: IAppConfig;
    static coreConfig;

    constructor() {
    }

    Init() {

        return new Promise<void>((resolve, reject) => {
            // console.log('AppInitService.init() called');
            // do your initialisation stuff here

            const data = <IAppConfig> window['tempConfigStorage'];
            // console.log('AppInitService: json', data);
            AppInitService.settings = data;

            AppInitService.coreConfig = {
                name: AppInitService.settings.appName,
                api: AppInitService.settings.apiURL,
                media: AppInitService.settings.iiifURL,
                app: AppInitService.settings.appURL
            };

            // console.log('AppInitService: finished');

            resolve();
        });
    }

    public getSettings(): IAppConfig {
        return AppInitService.settings;
    }

    public getCoreConfig() {
        return AppInitService.coreConfig;
    }
}
