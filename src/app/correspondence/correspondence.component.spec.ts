import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material-module';
import { CorrespondenceComponent } from './correspondence.component';
import { BeolService } from '../services/beol.service';

describe('CorrespondenceComponent', () => {
    let component: CorrespondenceComponent;
    let fixture: ComponentFixture<CorrespondenceComponent>;

    const beolServiceSpy = jasmine.createSpyObj('BeolService', ['searchForCorrespondence', 'searchForNewtonCorrespondence', 'searchForLeibnizCorrespondence']); // see https://angular.io/guide/testing#angular-testbed

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule
            ],
            declarations: [CorrespondenceComponent],
            providers: [
                { provide: BeolService, useValue: beolServiceSpy }
            ]
        })
            .compileComponents();


    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CorrespondenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
