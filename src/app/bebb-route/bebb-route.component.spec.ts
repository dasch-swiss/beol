import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BebbRouteComponent } from './bebb-route.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KuiCoreConfig } from '@knora/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BebbRouteComponent', () => {
    let component: BebbRouteComponent;
    let fixture: ComponentFixture<BebbRouteComponent>;
    const lt = '1706-03-17_Hermann_Jacob-Scheuchzer_Johannes';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [BebbRouteComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: () => {
                                return lt;
                            }
                        })
                    }
                },
                {provide: 'config', useValue: KuiCoreConfig}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BebbRouteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
