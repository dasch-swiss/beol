import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material-module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LetterComponent } from './letter.component';

import { KuiActionModule } from '@knora/action';
import { KuiCoreConfig, OntologyCacheService } from '@knora/core';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadTextValueAsXmlComponent } from '../../properties/read-text-value-as-xml/read-text-value-as-xml.component';
import { ReadUriValueComponent } from '../../properties/read-uri-value/read-uri-value.component';
import { ReadListValueComponent } from '../../properties/read-list-value/read-list-value.component';
import { ReadTextfileValueComponent } from '../../properties/read-textfile-value/read-textfile-value.component';

import { MathJaxDirective } from '../../directives/mathjax.directive';
import { KuiViewerModule } from '@knora/viewer';


describe('LetterComponent', () => {
    let component: LetterComponent;
    let fixture: ComponentFixture<LetterComponent>;
    const id = 'http://rdfh.ch/0801/7ZvL2A5PQ9C4eAmr-n26gw';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                KuiViewerModule,
                MaterialModule,
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule
            ],
            declarations: [
                LetterComponent,
                MathJaxDirective,
                ReadTextValueAsHtmlComponent,
                ReadTextValueAsXmlComponent,
                ReadUriValueComponent,
                ReadListValueComponent,
                ReadTextfileValueComponent],
            providers: [
                OntologyCacheService,
                {
                    provide: ActivatedRoute,
                    useValue: {params: of({id})}
                },
                {provide: 'config', useValue: KuiCoreConfig}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
