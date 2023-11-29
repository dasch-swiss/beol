import { Component, OnInit, ViewChild } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiResponseError } from '@dasch-swiss/dsp-js';
import { StatusMsg } from '../../../i18n/statusMsg';
import { DspMessageData, MessageComponent } from './message.component';

/**
 * Test host component to simulate parent component.
 */
@Component({
    template: `<dsp-message #message [message]="shortMessage" [size]="size"></dsp-message>`
})
class ShortMessageTestHostComponent implements OnInit {

    @ViewChild('message', { static: false }) messageComponent: MessageComponent;

    shortMessage: DspMessageData = {
        status: 200,
        statusMsg: 'Success',
        statusText: 'You just updated the user profile.',
        type: 'Note',
        footnote: 'Close it'
    };

    size = 'short';

    constructor() {
    }

    ngOnInit() { }
}

/**
 * Test host component to simulate parent component.
 */
@Component({
    template: `<dsp-message #message [message]="errorMessage"></dsp-message>`
})
class LongMessageTestHostComponent implements OnInit {

    @ViewChild('message', { static: false }) messageComponent: MessageComponent;

    errorMessage: ApiResponseError = {
        status: 403,
        url: 'http://0.0.0.0:3333/admin/projects/shortcode/001/members',
        method: 'Http failure response for http://0.0.0.0:3333/admin/projects/shortcode/001/members: 400 Bad Request',
        error: 'error message'
    };

    constructor() {
    }

    ngOnInit() { }
}

/**
 * Test host component to simulate parent component.
 */
@Component({
    template: `<dsp-message #message [message]="shortMessage" [size]="size" [duration]="2000"></dsp-message>`
})
class ShortMessageWithDurationTestHostComponent implements OnInit {

    @ViewChild('message', { static: false }) messageComponent: MessageComponent;

    shortMessage: DspMessageData = {
        status: 200,
        statusMsg: 'Success',
        statusText: 'You just updated the user profile.',
        type: 'Note',
        footnote: 'Close it'
    };

    size = 'short';

    constructor() {
    }

    ngOnInit() { }
}

describe('MessageComponent', () => {
    let shortMsgTestHostComponent: ShortMessageTestHostComponent;
    let shortMsgTestHostFixture: ComponentFixture<ShortMessageTestHostComponent>;

    let longMsgTestHostComponent: LongMessageTestHostComponent;
    let longMsgTestHostFixture: ComponentFixture<LongMessageTestHostComponent>;

    let shortMsgDurationTestHostComponent: ShortMessageWithDurationTestHostComponent;
    let shortMsgDurationTestHostFixture: ComponentFixture<ShortMessageWithDurationTestHostComponent>;

    let status: StatusMsg;
    let apiResonseError: ApiResponseError;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatIconModule,
                MatListModule,
                RouterTestingModule
            ],
            providers: [
                StatusMsg,
                ApiResponseError
            ],
            declarations: [
                MessageComponent,
                ShortMessageTestHostComponent,
                LongMessageTestHostComponent,
                ShortMessageWithDurationTestHostComponent
            ]
        }).compileComponents();

        status = TestBed.inject(StatusMsg);
        apiResonseError = TestBed.inject(ApiResponseError);

    }));

    describe('display a short message', () => {
        beforeEach(() => {
            shortMsgTestHostFixture = TestBed.createComponent(ShortMessageTestHostComponent);
            shortMsgTestHostComponent = shortMsgTestHostFixture.componentInstance;
            shortMsgTestHostFixture.detectChanges();
        });

        it('should create', () => {
            expect(shortMsgTestHostComponent.messageComponent).toBeTruthy();
        });

        it('should display a short message', () => {
            expect(shortMsgTestHostComponent.messageComponent).toBeTruthy();
            expect(shortMsgTestHostComponent.messageComponent.message.status).toEqual(200);
            expect(shortMsgTestHostComponent.messageComponent.message.statusMsg).toEqual('Success');

            const hostCompDe = shortMsgTestHostFixture.debugElement;

            const messageEl = hostCompDe.query(By.directive(MessageComponent));

            const spanShortMessageElement = messageEl.query(By.css('.dsp-short-message-text'));

            expect(spanShortMessageElement.nativeElement.innerText).toEqual('You just updated the user profile.');

        });

    });

    describe('display a long message', () => {
        beforeEach(() => {
            longMsgTestHostFixture = TestBed.createComponent(LongMessageTestHostComponent);
            longMsgTestHostComponent = longMsgTestHostFixture.componentInstance;
            longMsgTestHostFixture.detectChanges();
        });

        it('should create', () => {
            expect(longMsgTestHostComponent.messageComponent).toBeTruthy();
        });

        it('should display a long message', () => {
            expect(longMsgTestHostComponent.messageComponent).toBeTruthy();

            expect(longMsgTestHostComponent.messageComponent.message.status).toEqual(403);
            expect(longMsgTestHostComponent.messageComponent.message.statusMsg).toEqual('Forbidden');
            expect(longMsgTestHostComponent.messageComponent.message.statusText).toEqual(
                'The request was a legal request, but the server is refusing to respond to it');

            const hostCompDe = longMsgTestHostFixture.debugElement;

            const messageEl = hostCompDe.query(By.directive(MessageComponent));

            const messageSubtitleElement = messageEl.query(By.css('.message-subtitle .left'));

            expect(messageSubtitleElement.nativeElement.innerText).toEqual('ERROR 403 | Forbidden');

            const messageTitleElement = messageEl.query(By.css('.message-title'));

            expect(messageTitleElement.nativeElement.innerText).toEqual(
                'The request was a legal request, but the server is refusing to respond to it');

        });
    });

    describe('display a short message with a duration of 2 seconds', () => {
        beforeEach(() => {
            shortMsgDurationTestHostFixture = TestBed.createComponent(ShortMessageWithDurationTestHostComponent);
            shortMsgDurationTestHostComponent = shortMsgDurationTestHostFixture.componentInstance;
            shortMsgDurationTestHostFixture.detectChanges();
        });

        it('should create', () => {
            expect(shortMsgDurationTestHostComponent.messageComponent).toBeTruthy();
        });

        it('should display a short message', fakeAsync(() => {
            expect(shortMsgDurationTestHostComponent.messageComponent).toBeTruthy();
            expect(shortMsgDurationTestHostComponent.messageComponent.message.status).toEqual(200);
            expect(shortMsgDurationTestHostComponent.messageComponent.message.statusMsg).toEqual('Success');

            const hostCompDe = shortMsgDurationTestHostFixture.debugElement;

            const messageEl = hostCompDe.query(By.directive(MessageComponent));

            const spanShortMessageElement = messageEl.query(By.css('.dsp-short-message-text'));

            expect(spanShortMessageElement.nativeElement.innerText).toEqual('You just updated the user profile.');

            shortMsgDurationTestHostFixture.whenStable().then(() => {
                expect(shortMsgDurationTestHostComponent.messageComponent.disable).toBeTruthy();
            });
        }));
    });
});
