import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject, Injectable, Component, Input, defineInjectable, inject, NgModule } from '@angular/core';
import { KnoraConstants, KuiCoreConfigToken, UsersService, ApiServiceError } from '@knora/core';
import * as momentImported from 'moment';
import { map, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { KuiActionModule } from '@knora/action';

var moment = momentImported;
var SessionService = /** @class */ (function () {
    function SessionService(_http, config, _users) {
        this._http = _http;
        this.config = config;
        this._users = _users;
        /**
         * max session time in milliseconds
         * default value (24h): 86400000
         *
         */
        this.MAX_SESSION_TIME = 86400000; // 1d = 24 * 60 * 60 * 1000
    }
    /**
     * set the session by using the json web token (jwt) and the user object;
     * it will be used in the login process
     *
     * @param jwt
     * @param username
     */
    SessionService.prototype.setSession = function (jwt, username) {
        var _this = this;
        this.session = {
            id: this.setTimestamp(),
            user: {
                name: username,
                jwt: jwt,
                lang: 'en',
                sysAdmin: false
            }
        };
        // store in the localStorage
        localStorage.setItem('session', JSON.stringify(this.session));
        // get user information
        this._users.getUserByUsername(username).subscribe(function (result) {
            var sysAdmin = false;
            var permissions = result.permissions;
            if (permissions.groupsPerProject[KnoraConstants.SystemProjectIRI]) {
                sysAdmin = permissions.groupsPerProject[KnoraConstants.SystemProjectIRI]
                    .indexOf(KnoraConstants.SystemAdminGroupIRI) > -1;
            }
            // define a session id, which is the timestamp of login
            _this.session = {
                id: _this.setTimestamp(),
                user: {
                    name: result.username,
                    jwt: jwt,
                    lang: result.lang,
                    sysAdmin: sysAdmin
                }
            };
            // store in the localStorage
            localStorage.setItem('session', JSON.stringify(_this.session));
        }, function (error) {
            console.error(error);
        });
    };
    SessionService.prototype.setTimestamp = function () {
        return (moment().add(0, 'second')).valueOf();
    };
    SessionService.prototype.getSession = function () {
    };
    SessionService.prototype.updateSession = function () {
    };
    SessionService.prototype.validateSession = function () {
        // mix of checks with session.validation and this.authenticate
        this.session = JSON.parse(localStorage.getItem('session'));
        var tsNow = this.setTimestamp();
        if (this.session) {
            // the session exists
            // check if the session is still valid:
            // if session.id + MAX_SESSION_TIME > now: _session.validateSession()
            if (this.session.id + this.MAX_SESSION_TIME < tsNow) {
                // the internal session has expired
                // check if the api v2/authentication is still valid
                if (this.authenticate()) {
                    // the api authentication is valid;
                    // update the session.id
                    this.session.id = tsNow;
                    // localStorage.removeItem('session');
                    localStorage.setItem('session', JSON.stringify(this.session));
                    return true;
                }
                else {
                    // console.error('session.service -- validateSession -- authenticate: the session expired on API side');
                    // a user is not authenticated anymore!
                    this.destroySession();
                    return false;
                }
            }
            else {
                return true;
            }
        }
        return false;
    };
    SessionService.prototype.authenticate = function () {
        return this._http.get(this.config.api + '/v2/authentication').pipe(map(function (result) {
            // console.log('AuthenticationService - authenticate - result: ', result);
            // return true || false
            return result.status === 200;
        }));
    };
    SessionService.prototype.destroySession = function () {
        localStorage.removeItem('session');
    };
    SessionService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    SessionService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [KuiCoreConfigToken,] }] },
        { type: UsersService }
    ]; };
    SessionService.ngInjectableDef = defineInjectable({ factory: function SessionService_Factory() { return new SessionService(inject(HttpClient), inject(KuiCoreConfigToken), inject(UsersService)); }, token: SessionService, providedIn: "root" });
    return SessionService;
}());

var AuthGuard = /** @class */ (function () {
    function AuthGuard(_session, _router) {
        this._session = _session;
        this._router = _router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (!this._session.validateSession()) {
            this._router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        return true;
    };
    AuthGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = function () { return [
        { type: SessionService },
        { type: Router }
    ]; };
    AuthGuard.ngInjectableDef = defineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(inject(SessionService), inject(Router)); }, token: AuthGuard, providedIn: "root" });
    return AuthGuard;
}());

/**
 * Authentication service includes the login, logout method and a session method to check if a user is logged in or not.
 */
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, _session, config) {
        this.http = http;
        this._session = _session;
        this.config = config;
        // console.log('AuthenticationService constructor: config', config);
    }
    /**
     * validate if a user is logged in or not
     * returns true if the session is active
     *
     * @returns boolean
     */
    AuthenticationService.prototype.session = function () {
        return this._session.validateSession();
    };
    /**
     * login process;
     * it's used by the login component
     *
     * @param {string} identifier email or username
     * @param {string} password
     * @returns Observable<any>
     */
    AuthenticationService.prototype.login = function (username, password) {
        // console.log('AuthenticationService - login - api: ', this.config.api);
        var _this = this;
        return this.http.post(this.config.api + '/v2/authentication', { username: username, password: password }, { observe: 'response' }).pipe(map(function (response) {
            return response;
        }), catchError(function (error) {
            return _this.handleRequestError(error);
        }));
    };
    /**
     * logout the user by destroying the session
     *
     * @param
     */
    AuthenticationService.prototype.logout = function () {
        // destroy the session
        localStorage.removeItem('session');
    };
    /**
     * @ignore
     * handle request error in case of server error
     *
     * @param error
     * @returns
     */
    AuthenticationService.prototype.handleRequestError = function (error) {
        var serviceError = new ApiServiceError();
        serviceError.status = error.status;
        serviceError.statusText = error.statusText;
        serviceError.errorInfo = error.message;
        serviceError.url = error.url;
        return throwError(serviceError);
    };
    AuthenticationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    AuthenticationService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: SessionService },
        { type: undefined, decorators: [{ type: Inject, args: [KuiCoreConfigToken,] }] }
    ]; };
    AuthenticationService.ngInjectableDef = defineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(inject(HttpClient), inject(SessionService), inject(KuiCoreConfigToken)); }, token: AuthenticationService, providedIn: "root" });
    return AuthenticationService;
}());

var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(_auth, _session, _fb, _route, _router) {
        this._auth = _auth;
        this._session = _session;
        this._fb = _fb;
        this._route = _route;
        this._router = _router;
        this.loading = false;
        // specific error messages
        this.loginErrorUser = false;
        this.loginErrorPw = false;
        this.loginErrorServer = false;
        // labels for the login form
        this.login = {
            title: 'Login',
            name: 'Username',
            pw: 'Password',
            button: 'Login',
            remember: 'Remember me',
            forgot_pw: 'Forgot password?',
            error: {
                failed: 'Password or username is wrong',
                server: 'There\'s an error with the server connection. Try it again later or inform the Knora Team'
            }
        };
        // error definitions for the following form fields
        this.formErrors = {
            'username': '',
            'password': ''
        };
        // error messages for the form fields defined in formErrors
        this.validationMessages = {
            'username': {
                'required': 'user name is required.'
            },
            'password': {
                'required': 'password is required'
            }
        };
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        // check if a user is already logged in
        if (this._session.validateSession()) {
            this.loggedInUser = JSON.parse(localStorage.getItem('session')).user.name;
        }
        else {
            this.buildForm();
        }
    };
    LoginFormComponent.prototype.buildForm = function () {
        var _this = this;
        this.frm = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.frm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
    };
    /**
     * @ignore
     *
     * check for errors while using the form
     * @param data
     */
    LoginFormComponent.prototype.onValueChanged = function (data) {
        var _this = this;
        if (!this.frm) {
            return;
        }
        var form = this.frm;
        Object.keys(this.formErrors).map(function (field) {
            _this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages_1 = _this.validationMessages[field];
                Object.keys(control.errors).map(function (key) {
                    _this.formErrors[field] += messages_1[key] + ' ';
                });
            }
        });
    };
    LoginFormComponent.prototype.doLogin = function () {
        var _this = this;
        // reset the error messages
        this.errorMessage = undefined;
        this.loginErrorUser = false;
        this.loginErrorPw = false;
        this.loginErrorServer = false;
        // make sure form values are valid
        if (this.frm.invalid) {
            this.loginErrorPw = true;
            this.loginErrorUser = true;
            return;
        }
        // Reset status
        this.loading = true;
        // Grab values from form
        var username = this.frm.get('username').value;
        var password = this.frm.get('password').value;
        this._auth.login(username, password)
            .subscribe(function (response) {
            // we have a token; set the session now
            _this._session.setSession(response.body.token, username);
            setTimeout(function () {
                // get return url from route parameters or default to '/'
                _this.returnUrl = _this._route.snapshot.queryParams['returnUrl'] || '/';
                // go back to the previous route or to the route defined in the @Input if navigate exists
                if (!_this.navigate) {
                    _this._router.navigate([_this.returnUrl]);
                }
                else {
                    _this._router.navigate([_this.navigate]);
                }
                _this.loading = false;
            }, 2000);
        }, function (error) {
            // error handling
            if (error.status === 0) {
                _this.loginErrorUser = false;
                _this.loginErrorPw = false;
                _this.loginErrorServer = true;
            }
            if (error.status === 401) {
                _this.loginErrorUser = false;
                _this.loginErrorPw = true;
                _this.loginErrorServer = false;
            }
            if (error.status === 404) {
                _this.loginErrorUser = true;
                _this.loginErrorPw = false;
                _this.loginErrorServer = false;
            }
            _this.errorMessage = error;
            _this.loading = false;
        });
    };
    LoginFormComponent.prototype.logout = function () {
        this._auth.logout();
        location.reload(true);
    };
    LoginFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-login-form',
                    template: "<div class=\"login-form\" *ngIf=\"!loggedInUser\">\n    <div class=\"login-form-header\">\n        <h3 mat-subheader>{{login.title}}</h3>\n    </div>\n    <div class=\"login-form-content\">\n        <!-- This is the login form -->\n        <form class=\"login-form\" [formGroup]=\"frm\" (ngSubmit)=\"doLogin()\">\n            <!-- Error message -->\n            <mat-hint *ngIf=\"errorMessage !== undefined\" class=\"full-width\">\n                <span *ngIf=\"loginErrorUser || loginErrorPw\">{{login.error.failed}}</span>\n                <span *ngIf=\"loginErrorServer\">{{login.error.server}}</span>\n            </mat-hint>\n\n            <!-- Username -->\n            <mat-form-field class=\"full-width login-field\">\n                <mat-icon matPrefix>person</mat-icon>\n                <input matInput autofocus [placeholder]=\"login.name\" autocomplete=\"username\" formControlName=\"username\">\n                <mat-hint *ngIf=\"formErrors.username\" class=\"login-error\">{{login.error.failed}}</mat-hint>\n            </mat-form-field>\n\n            <!-- Password -->\n            <mat-form-field class=\"full-width login-field\">\n                <mat-icon matPrefix>lock</mat-icon>\n                <input matInput type=\"password\" [placeholder]=\"login.pw\" autocomplete=\"current-password\" formControlName=\"password\">\n                <mat-hint *ngIf=\"formErrors.password\" class=\"login-error\">{{login.error.failed}}</mat-hint>\n            </mat-form-field>\n\n            <!-- Button: Login -->\n            <div class=\"button-row full-width\">\n                <button mat-raised-button type=\"submit\"\n                        *ngIf=\"!loading\"\n                        [disabled]=\"!frm.valid\"\n                        class=\"full-width submit-button mat-primary\">\n                    {{login.button}}\n                </button>\n                <kui-progress-indicator *ngIf=\"loading\" [color]=\"color\"></kui-progress-indicator>\n            </div>\n        </form>\n    </div>\n</div>\n\n<!-- a user is already logged in; show who it is and a logout button -->\n\n<div class=\"logout-form\" *ngIf=\"loggedInUser\">\n    <p>A user is already logged in:</p>\n    <p>{{loggedInUser}}</p>\n    <br>\n    <p>If it's not you, please logout!</p>\n    <div class=\"button-row full-width\">\n        <button mat-raised-button\n                (click)=\"logout()\"\n                *ngIf=\"!loading\"\n                class=\"full-width mat-warn\">\n            LOGOUT\n        </button>\n        <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n    </div>\n</div>\n",
                    styles: [".full-width{width:100%}.button-row,.mat-form-field,.mat-hint{margin-top:24px}.mat-hint{background:rgba(239,83,80,.39);display:block;margin-left:-16px;padding:16px;text-align:center;width:280px}.login-form,.logout-form{margin-left:auto;margin-right:auto;position:relative;width:280px}.login-form .login-form-header,.logout-form .login-form-header{margin-bottom:24px}.login-form .login-field .mat-icon,.logout-form .login-field .mat-icon{font-size:20px;margin-right:12px}.login-form .button-row,.logout-form .button-row{margin-top:48px}.sign-up{margin-top:24px}"]
                },] },
    ];
    /** @nocollapse */
    LoginFormComponent.ctorParameters = function () { return [
        { type: AuthenticationService },
        { type: SessionService },
        { type: FormBuilder },
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    LoginFormComponent.propDecorators = {
        navigate: [{ type: Input }],
        color: [{ type: Input }]
    };
    return LoginFormComponent;
}());

var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(_session) {
        this._session = _session;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        if (this._session.validateSession()) {
            // the session is valid (and up to date)
            var jwt = JSON.parse(localStorage.getItem('session')).user.jwt;
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + jwt
                }
            });
        }
        else {
            this._session.destroySession();
        }
        return next.handle(request);
    };
    JwtInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    JwtInterceptor.ctorParameters = function () { return [
        { type: SessionService }
    ]; };
    return JwtInterceptor;
}());

var WithCredentialsInterceptor = /** @class */ (function () {
    function WithCredentialsInterceptor(_session) {
        this._session = _session;
    }
    WithCredentialsInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        // console.log('WithCredentialsInterceptor - intercept - request: ', request);
        request = request.clone({
            withCredentials: true
        });
        return next.handle(request);
    };
    WithCredentialsInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WithCredentialsInterceptor.ctorParameters = function () { return [
        { type: SessionService }
    ]; };
    return WithCredentialsInterceptor;
}());

var KuiAuthenticationModule = /** @class */ (function () {
    function KuiAuthenticationModule() {
    }
    KuiAuthenticationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        KuiActionModule,
                        MatCardModule,
                        MatIconModule,
                        MatInputModule,
                        MatButtonModule,
                        MatDialogModule,
                        MatFormFieldModule,
                        ReactiveFormsModule,
                        HttpClientModule
                    ],
                    declarations: [
                        LoginFormComponent
                    ],
                    exports: [
                        LoginFormComponent
                    ],
                    providers: [
                        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                        { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true }
                    ]
                },] },
    ];
    return KuiAuthenticationModule;
}());

/*
 * Public API Surface of authentication
 */

/**
 * Generated bundle index. Do not edit.
 */

export { JwtInterceptor as ɵb, WithCredentialsInterceptor as ɵc, SessionService as ɵa, AuthGuard, LoginFormComponent, AuthenticationService, KuiAuthenticationModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtYXV0aGVudGljYXRpb24uanMubWFwIiwic291cmNlcyI6WyJuZzovL0Brbm9yYS9hdXRoZW50aWNhdGlvbi9saWIvc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9hdXRoZW50aWNhdGlvbi9saWIvZ3VhcmQvYXV0aC5ndWFyZC50cyIsIm5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uL2xpYi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvYXV0aGVudGljYXRpb24vbGliL2xvZ2luLWZvcm0vbG9naW4tZm9ybS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS9hdXRoZW50aWNhdGlvbi9saWIvaW50ZXJjZXB0b3JzL2p3dC5pbnRlcmNlcHRvci50cyIsIm5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uL2xpYi9pbnRlcmNlcHRvcnMvd2l0aC1jcmVkZW50aWFscy5pbnRlcmNlcHRvci50cyIsIm5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uL2xpYi9hdXRoZW50aWNhdGlvbi5tb2R1bGUudHMiLCJuZzovL0Brbm9yYS9hdXRoZW50aWNhdGlvbi9wdWJsaWNfYXBpLnRzIiwibmc6Ly9Aa25vcmEvYXV0aGVudGljYXRpb24va25vcmEtYXV0aGVudGljYXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBLbm9yYUNvbnN0YW50cywgS3VpQ29yZUNvbmZpZ1Rva2VuLCBTZXNzaW9uLCBVc2VyLCBVc2Vyc1NlcnZpY2UgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbmltcG9ydCAqIGFzIG1vbWVudEltcG9ydGVkIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudEltcG9ydGVkO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2Vzc2lvblNlcnZpY2Uge1xuXG4gICAgcHVibGljIHNlc3Npb246IFNlc3Npb247XG5cbiAgICAvKipcbiAgICAgKiBtYXggc2Vzc2lvbiB0aW1lIGluIG1pbGxpc2Vjb25kc1xuICAgICAqIGRlZmF1bHQgdmFsdWUgKDI0aCk6IDg2NDAwMDAwXG4gICAgICpcbiAgICAgKi9cbiAgICByZWFkb25seSBNQVhfU0VTU0lPTl9USU1FOiBudW1iZXIgPSA4NjQwMDAwMDsgLy8gMWQgPSAyNCAqIDYwICogNjAgKiAxMDAwXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgQEluamVjdChLdWlDb3JlQ29uZmlnVG9rZW4pIHB1YmxpYyBjb25maWcsXG4gICAgICAgIHByaXZhdGUgX3VzZXJzOiBVc2Vyc1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIHNlc3Npb24gYnkgdXNpbmcgdGhlIGpzb24gd2ViIHRva2VuIChqd3QpIGFuZCB0aGUgdXNlciBvYmplY3Q7XG4gICAgICogaXQgd2lsbCBiZSB1c2VkIGluIHRoZSBsb2dpbiBwcm9jZXNzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gand0XG4gICAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAgICovXG4gICAgc2V0U2Vzc2lvbihqd3Q6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnNldFRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIGp3dDogand0LFxuICAgICAgICAgICAgICAgIGxhbmc6ICdlbicsXG4gICAgICAgICAgICAgICAgc3lzQWRtaW46IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIHN0b3JlIGluIHRoZSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlc3Npb24pKTtcblxuICAgICAgICAvLyBnZXQgdXNlciBpbmZvcm1hdGlvblxuICAgICAgICB0aGlzLl91c2Vycy5nZXRVc2VyQnlVc2VybmFtZSh1c2VybmFtZSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlc3VsdDogVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzeXNBZG1pbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvbnMgPSByZXN1bHQucGVybWlzc2lvbnM7XG4gICAgICAgICAgICAgICAgaWYgKHBlcm1pc3Npb25zLmdyb3Vwc1BlclByb2plY3RbS25vcmFDb25zdGFudHMuU3lzdGVtUHJvamVjdElSSV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3lzQWRtaW4gPSBwZXJtaXNzaW9ucy5ncm91cHNQZXJQcm9qZWN0W0tub3JhQ29uc3RhbnRzLlN5c3RlbVByb2plY3RJUkldXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZihLbm9yYUNvbnN0YW50cy5TeXN0ZW1BZG1pbkdyb3VwSVJJKSA+IC0xO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRlZmluZSBhIHNlc3Npb24gaWQsIHdoaWNoIGlzIHRoZSB0aW1lc3RhbXAgb2YgbG9naW5cbiAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnNldFRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXN1bHQudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBqd3Q6IGp3dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbmc6IHJlc3VsdC5sYW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzQWRtaW46IHN5c0FkbWluXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIHN0b3JlIGluIHRoZSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvbicsIEpTT04uc3RyaW5naWZ5KHRoaXMuc2Vzc2lvbikpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRpbWVzdGFtcCgpIHtcbiAgICAgICAgcmV0dXJuIChtb21lbnQoKS5hZGQoMCwgJ3NlY29uZCcpKS52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgZ2V0U2Vzc2lvbigpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZVNlc3Npb24oKSB7XG5cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVNlc3Npb24oKSB7XG4gICAgICAgIC8vIG1peCBvZiBjaGVja3Mgd2l0aCBzZXNzaW9uLnZhbGlkYXRpb24gYW5kIHRoaXMuYXV0aGVudGljYXRlXG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb24nKSk7XG5cbiAgICAgICAgY29uc3QgdHNOb3c6IG51bWJlciA9IHRoaXMuc2V0VGltZXN0YW1wKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2Vzc2lvbikge1xuICAgICAgICAgICAgLy8gdGhlIHNlc3Npb24gZXhpc3RzXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2Vzc2lvbiBpcyBzdGlsbCB2YWxpZDpcbiAgICAgICAgICAgIC8vIGlmIHNlc3Npb24uaWQgKyBNQVhfU0VTU0lPTl9USU1FID4gbm93OiBfc2Vzc2lvbi52YWxpZGF0ZVNlc3Npb24oKVxuICAgICAgICAgICAgaWYgKHRoaXMuc2Vzc2lvbi5pZCArIHRoaXMuTUFYX1NFU1NJT05fVElNRSA8IHRzTm93KSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlIGludGVybmFsIHNlc3Npb24gaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgYXBpIHYyL2F1dGhlbnRpY2F0aW9uIGlzIHN0aWxsIHZhbGlkXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYXBpIGF1dGhlbnRpY2F0aW9uIGlzIHZhbGlkO1xuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHNlc3Npb24uaWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uLmlkID0gdHNOb3c7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb24nKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlc3Npb24pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdzZXNzaW9uLnNlcnZpY2UgLS0gdmFsaWRhdGVTZXNzaW9uIC0tIGF1dGhlbnRpY2F0ZTogdGhlIHNlc3Npb24gZXhwaXJlZCBvbiBBUEkgc2lkZScpO1xuICAgICAgICAgICAgICAgICAgICAvLyBhIHVzZXIgaXMgbm90IGF1dGhlbnRpY2F0ZWQgYW55bW9yZSFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgYXV0aGVudGljYXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBpICsgJy92Mi9hdXRoZW50aWNhdGlvbicpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogYW55KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQXV0aGVudGljYXRpb25TZXJ2aWNlIC0gYXV0aGVudGljYXRlIC0gcmVzdWx0OiAnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0cnVlIHx8IGZhbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zdGF0dXMgPT09IDIwMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZGVzdHJveVNlc3Npb24oKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uJyk7XG4gICAgfVxuXG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBSb3V0ZXIsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2Vzc2lvbjogU2Vzc2lvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcblxuICAgIH1cblxuICAgIGNhbkFjdGl2YXRlKFxuICAgICAgICBuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgICAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9zZXNzaW9uLnZhbGlkYXRlU2Vzc2lvbigpKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWydsb2dpbiddLCB7cXVlcnlQYXJhbXM6IHtyZXR1cm5Vcmw6IHN0YXRlLnVybH19KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBLdWlDb3JlQ29uZmlnVG9rZW4gfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIHNlcnZpY2UgaW5jbHVkZXMgdGhlIGxvZ2luLCBsb2dvdXQgbWV0aG9kIGFuZCBhIHNlc3Npb24gbWV0aG9kIHRvIGNoZWNrIGlmIGEgdXNlciBpcyBsb2dnZWQgaW4gb3Igbm90LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9zZXNzaW9uOiBTZXNzaW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZykge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBdXRoZW50aWNhdGlvblNlcnZpY2UgY29uc3RydWN0b3I6IGNvbmZpZycsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGUgaWYgYSB1c2VyIGlzIGxvZ2dlZCBpbiBvciBub3RcbiAgICAgKiByZXR1cm5zIHRydWUgaWYgdGhlIHNlc3Npb24gaXMgYWN0aXZlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAgICovXG4gICAgc2Vzc2lvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24udmFsaWRhdGVTZXNzaW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9naW4gcHJvY2VzcztcbiAgICAgKiBpdCdzIHVzZWQgYnkgdGhlIGxvZ2luIGNvbXBvbmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXIgZW1haWwgb3IgdXNlcm5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT5cbiAgICAgKi9cbiAgICBsb2dpbih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnQXV0aGVudGljYXRpb25TZXJ2aWNlIC0gbG9naW4gLSBhcGk6ICcsIHRoaXMuY29uZmlnLmFwaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpICsgJy92Mi9hdXRoZW50aWNhdGlvbicsXG4gICAgICAgICAgICB7dXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmR9LFxuICAgICAgICAgICAge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogYW55ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBsb2dvdXQgdGhlIHVzZXIgYnkgZGVzdHJveWluZyB0aGUgc2Vzc2lvblxuICAgICAqXG4gICAgICogQHBhcmFtXG4gICAgICovXG4gICAgbG9nb3V0KCkge1xuICAgICAgICAvLyBkZXN0cm95IHRoZSBzZXNzaW9uXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogaGFuZGxlIHJlcXVlc3QgZXJyb3IgaW4gY2FzZSBvZiBzZXJ2ZXIgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlcnJvclxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSBlcnJvci51cmw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1sb2dpbi1mb3JtJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJsb2dpbi1mb3JtXCIgKm5nSWY9XCIhbG9nZ2VkSW5Vc2VyXCI+XG4gICAgPGRpdiBjbGFzcz1cImxvZ2luLWZvcm0taGVhZGVyXCI+XG4gICAgICAgIDxoMyBtYXQtc3ViaGVhZGVyPnt7bG9naW4udGl0bGV9fTwvaDM+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImxvZ2luLWZvcm0tY29udGVudFwiPlxuICAgICAgICA8IS0tIFRoaXMgaXMgdGhlIGxvZ2luIGZvcm0gLS0+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwibG9naW4tZm9ybVwiIFtmb3JtR3JvdXBdPVwiZnJtXCIgKG5nU3VibWl0KT1cImRvTG9naW4oKVwiPlxuICAgICAgICAgICAgPCEtLSBFcnJvciBtZXNzYWdlIC0tPlxuICAgICAgICAgICAgPG1hdC1oaW50ICpuZ0lmPVwiZXJyb3JNZXNzYWdlICE9PSB1bmRlZmluZWRcIiBjbGFzcz1cImZ1bGwtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImxvZ2luRXJyb3JVc2VyIHx8IGxvZ2luRXJyb3JQd1wiPnt7bG9naW4uZXJyb3IuZmFpbGVkfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJsb2dpbkVycm9yU2VydmVyXCI+e3tsb2dpbi5lcnJvci5zZXJ2ZXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbWF0LWhpbnQ+XG5cbiAgICAgICAgICAgIDwhLS0gVXNlcm5hbWUgLS0+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJmdWxsLXdpZHRoIGxvZ2luLWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdFByZWZpeD5wZXJzb248L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBhdXRvZm9jdXMgW3BsYWNlaG9sZGVyXT1cImxvZ2luLm5hbWVcIiBhdXRvY29tcGxldGU9XCJ1c2VybmFtZVwiIGZvcm1Db250cm9sTmFtZT1cInVzZXJuYW1lXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1oaW50ICpuZ0lmPVwiZm9ybUVycm9ycy51c2VybmFtZVwiIGNsYXNzPVwibG9naW4tZXJyb3JcIj57e2xvZ2luLmVycm9yLmZhaWxlZH19PC9tYXQtaGludD5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgICAgICAgIDwhLS0gUGFzc3dvcmQgLS0+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJmdWxsLXdpZHRoIGxvZ2luLWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdFByZWZpeD5sb2NrPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgW3BsYWNlaG9sZGVyXT1cImxvZ2luLnB3XCIgYXV0b2NvbXBsZXRlPVwiY3VycmVudC1wYXNzd29yZFwiIGZvcm1Db250cm9sTmFtZT1cInBhc3N3b3JkXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1oaW50ICpuZ0lmPVwiZm9ybUVycm9ycy5wYXNzd29yZFwiIGNsYXNzPVwibG9naW4tZXJyb3JcIj57e2xvZ2luLmVycm9yLmZhaWxlZH19PC9tYXQtaGludD5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgICAgICAgIDwhLS0gQnV0dG9uOiBMb2dpbiAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tcm93IGZ1bGwtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhbG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWZybS52YWxpZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZ1bGwtd2lkdGggc3VibWl0LWJ1dHRvbiBtYXQtcHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgICAgICB7e2xvZ2luLmJ1dHRvbn19XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGt1aS1wcm9ncmVzcy1pbmRpY2F0b3IgKm5nSWY9XCJsb2FkaW5nXCIgW2NvbG9yXT1cImNvbG9yXCI+PC9rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIGEgdXNlciBpcyBhbHJlYWR5IGxvZ2dlZCBpbjsgc2hvdyB3aG8gaXQgaXMgYW5kIGEgbG9nb3V0IGJ1dHRvbiAtLT5cblxuPGRpdiBjbGFzcz1cImxvZ291dC1mb3JtXCIgKm5nSWY9XCJsb2dnZWRJblVzZXJcIj5cbiAgICA8cD5BIHVzZXIgaXMgYWxyZWFkeSBsb2dnZWQgaW46PC9wPlxuICAgIDxwPnt7bG9nZ2VkSW5Vc2VyfX08L3A+XG4gICAgPGJyPlxuICAgIDxwPklmIGl0J3Mgbm90IHlvdSwgcGxlYXNlIGxvZ291dCE8L3A+XG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1yb3cgZnVsbC13aWR0aFwiPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImxvZ291dCgpXCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFsb2FkaW5nXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZ1bGwtd2lkdGggbWF0LXdhcm5cIj5cbiAgICAgICAgICAgIExPR09VVFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGt1aS1wcm9ncmVzcy1pbmRpY2F0b3IgKm5nSWY9XCJsb2FkaW5nXCI+PC9rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2AuZnVsbC13aWR0aHt3aWR0aDoxMDAlfS5idXR0b24tcm93LC5tYXQtZm9ybS1maWVsZCwubWF0LWhpbnR7bWFyZ2luLXRvcDoyNHB4fS5tYXQtaGludHtiYWNrZ3JvdW5kOnJnYmEoMjM5LDgzLDgwLC4zOSk7ZGlzcGxheTpibG9jazttYXJnaW4tbGVmdDotMTZweDtwYWRkaW5nOjE2cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MjgwcHh9LmxvZ2luLWZvcm0sLmxvZ291dC1mb3Jte21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG87cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MjgwcHh9LmxvZ2luLWZvcm0gLmxvZ2luLWZvcm0taGVhZGVyLC5sb2dvdXQtZm9ybSAubG9naW4tZm9ybS1oZWFkZXJ7bWFyZ2luLWJvdHRvbToyNHB4fS5sb2dpbi1mb3JtIC5sb2dpbi1maWVsZCAubWF0LWljb24sLmxvZ291dC1mb3JtIC5sb2dpbi1maWVsZCAubWF0LWljb257Zm9udC1zaXplOjIwcHg7bWFyZ2luLXJpZ2h0OjEycHh9LmxvZ2luLWZvcm0gLmJ1dHRvbi1yb3csLmxvZ291dC1mb3JtIC5idXR0b24tcm93e21hcmdpbi10b3A6NDhweH0uc2lnbi11cHttYXJnaW4tdG9wOjI0cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Gb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbmF2aWdhdGVdXG4gICAgICogbmF2aWdhdGUgdG8gdGhlIGRlZmluZWQgdXJsIGFmdGVyIHN1Y2Nlc3NmdWwgbG9naW5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBuYXZpZ2F0ZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbY29sb3JdXG4gICAgICogc2V0IHlvdXIgdGhlbWUgY29sb3IgaGVyZSxcbiAgICAgKiBpdCB3aWxsIGJlIHVzZWQgaW4gdGhlIHByb2dyZXNzLWluZGljYXRvclxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbG9yPzogc3RyaW5nO1xuXG4gICAgcmV0dXJuVXJsOiBzdHJpbmc7XG5cbiAgICAvLyBpcyB0aGVyZSBhbHJlYWR5IGEgdmFsaWQgc2Vzc2lvbj9cbiAgICBsb2dnZWRJblVzZXI6IHN0cmluZztcblxuICAgIC8vIGZvcm1cbiAgICBmcm06IEZvcm1Hcm91cDtcblxuICAgIGxvYWRpbmcgPSBmYWxzZTtcblxuICAgIC8vIGdlbmVyYWwgZXJyb3IgbWVzc2FnZVxuICAgIGVycm9yTWVzc2FnZTogYW55O1xuXG4gICAgLy8gc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXNcbiAgICBsb2dpbkVycm9yVXNlciA9IGZhbHNlO1xuICAgIGxvZ2luRXJyb3JQdyA9IGZhbHNlO1xuICAgIGxvZ2luRXJyb3JTZXJ2ZXIgPSBmYWxzZTtcblxuICAgIC8vIGxhYmVscyBmb3IgdGhlIGxvZ2luIGZvcm1cbiAgICBsb2dpbiA9IHtcbiAgICAgICAgdGl0bGU6ICdMb2dpbicsXG4gICAgICAgIG5hbWU6ICdVc2VybmFtZScsXG4gICAgICAgIHB3OiAnUGFzc3dvcmQnLFxuICAgICAgICBidXR0b246ICdMb2dpbicsXG4gICAgICAgIHJlbWVtYmVyOiAnUmVtZW1iZXIgbWUnLFxuICAgICAgICBmb3Jnb3RfcHc6ICdGb3Jnb3QgcGFzc3dvcmQ/JyxcbiAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgIGZhaWxlZDogJ1Bhc3N3b3JkIG9yIHVzZXJuYW1lIGlzIHdyb25nJyxcbiAgICAgICAgICAgIHNlcnZlcjogJ1RoZXJlXFwncyBhbiBlcnJvciB3aXRoIHRoZSBzZXJ2ZXIgY29ubmVjdGlvbi4gVHJ5IGl0IGFnYWluIGxhdGVyIG9yIGluZm9ybSB0aGUgS25vcmEgVGVhbSdcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBlcnJvciBkZWZpbml0aW9ucyBmb3IgdGhlIGZvbGxvd2luZyBmb3JtIGZpZWxkc1xuICAgIGZvcm1FcnJvcnMgPSB7XG4gICAgICAgICd1c2VybmFtZSc6ICcnLFxuICAgICAgICAncGFzc3dvcmQnOiAnJ1xuICAgIH07XG5cbiAgICAvLyBlcnJvciBtZXNzYWdlcyBmb3IgdGhlIGZvcm0gZmllbGRzIGRlZmluZWQgaW4gZm9ybUVycm9yc1xuICAgIHZhbGlkYXRpb25NZXNzYWdlcyA9IHtcbiAgICAgICAgJ3VzZXJuYW1lJzoge1xuICAgICAgICAgICAgJ3JlcXVpcmVkJzogJ3VzZXIgbmFtZSBpcyByZXF1aXJlZC4nXG4gICAgICAgIH0sXG4gICAgICAgICdwYXNzd29yZCc6IHtcbiAgICAgICAgICAgICdyZXF1aXJlZCc6ICdwYXNzd29yZCBpcyByZXF1aXJlZCdcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2F1dGg6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9zZXNzaW9uOiBTZXNzaW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9mYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAvLyBjaGVjayBpZiBhIHVzZXIgaXMgYWxyZWFkeSBsb2dnZWQgaW5cbiAgICAgICAgaWYgKHRoaXMuX3Nlc3Npb24udmFsaWRhdGVTZXNzaW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvbicpKS51c2VyLm5hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkRm9ybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRGb3JtKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZybSA9IHRoaXMuX2ZiLmdyb3VwKHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mcm0udmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5vblZhbHVlQ2hhbmdlZChkYXRhKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogY2hlY2sgZm9yIGVycm9ycyB3aGlsZSB1c2luZyB0aGUgZm9ybVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgb25WYWx1ZUNoYW5nZWQoZGF0YT86IGFueSkge1xuXG4gICAgICAgIGlmICghdGhpcy5mcm0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLmZybTtcblxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm1FcnJvcnMpLm1hcChmaWVsZCA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1FcnJvcnNbZmllbGRdID0gJyc7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sID0gZm9ybS5nZXQoZmllbGQpO1xuICAgICAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5kaXJ0eSAmJiAhY29udHJvbC52YWxpZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy52YWxpZGF0aW9uTWVzc2FnZXNbZmllbGRdO1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbnRyb2wuZXJyb3JzKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtRXJyb3JzW2ZpZWxkXSArPSBtZXNzYWdlc1trZXldICsgJyAnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb0xvZ2luKCkge1xuXG4gICAgICAgIC8vIHJlc2V0IHRoZSBlcnJvciBtZXNzYWdlc1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5sb2dpbkVycm9yVXNlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ2luRXJyb3JQdyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ2luRXJyb3JTZXJ2ZXIgPSBmYWxzZTtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgZm9ybSB2YWx1ZXMgYXJlIHZhbGlkXG4gICAgICAgIGlmICh0aGlzLmZybS5pbnZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JQdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JVc2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc2V0IHN0YXR1c1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIEdyYWIgdmFsdWVzIGZyb20gZm9ybVxuICAgICAgICBjb25zdCB1c2VybmFtZSA9IHRoaXMuZnJtLmdldCgndXNlcm5hbWUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSB0aGlzLmZybS5nZXQoJ3Bhc3N3b3JkJykudmFsdWU7XG5cbiAgICAgICAgdGhpcy5fYXV0aC5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXNwb25zZTogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgYSB0b2tlbjsgc2V0IHRoZSBzZXNzaW9uIG5vd1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXNzaW9uLnNldFNlc3Npb24ocmVzcG9uc2UuYm9keS50b2tlbiwgdXNlcm5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHJldHVybiB1cmwgZnJvbSByb3V0ZSBwYXJhbWV0ZXJzIG9yIGRlZmF1bHQgdG8gJy8nXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVyblVybCA9IHRoaXMuX3JvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zWydyZXR1cm5VcmwnXSB8fCAnLyc7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ28gYmFjayB0byB0aGUgcHJldmlvdXMgcm91dGUgb3IgdG8gdGhlIHJvdXRlIGRlZmluZWQgaW4gdGhlIEBJbnB1dCBpZiBuYXZpZ2F0ZSBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5uYXZpZ2F0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5yZXR1cm5VcmxdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLm5hdmlnYXRlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5FcnJvclVzZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5FcnJvclB3ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JTZXJ2ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkVycm9yVXNlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkVycm9yUHcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkVycm9yU2VydmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JVc2VyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5FcnJvclB3ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JTZXJ2ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICB0aGlzLl9hdXRoLmxvZ291dCgpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXNzaW9uOiBTZXNzaW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuIGlmIGF2YWlsYWJsZVxuXG4gICAgICAgIGlmICh0aGlzLl9zZXNzaW9uLnZhbGlkYXRlU2Vzc2lvbigpKSB7XG4gICAgICAgICAgICAvLyB0aGUgc2Vzc2lvbiBpcyB2YWxpZCAoYW5kIHVwIHRvIGRhdGUpXG4gICAgICAgICAgICBjb25zdCBqd3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uJykpLnVzZXIuand0O1xuICAgICAgICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe1xuICAgICAgICAgICAgICAgIHNldEhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2p3dH1gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uLmRlc3Ryb3lTZXNzaW9uKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXaXRoQ3JlZGVudGlhbHNJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXNzaW9uOiBTZXNzaW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuIGlmIGF2YWlsYWJsZVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdXaXRoQ3JlZGVudGlhbHNJbnRlcmNlcHRvciAtIGludGVyY2VwdCAtIHJlcXVlc3Q6ICcsIHJlcXVlc3QpO1xuXG4gICAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTLCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdENhcmRNb2R1bGUsIE1hdERpYWxvZ01vZHVsZSwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEt1aUFjdGlvbk1vZHVsZSB9IGZyb20gJ0Brbm9yYS9hY3Rpb24nO1xuXG5pbXBvcnQgeyBMb2dpbkZvcm1Db21wb25lbnQgfSBmcm9tICcuL2xvZ2luLWZvcm0vbG9naW4tZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSnd0SW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9ycy9qd3QuaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgV2l0aENyZWRlbnRpYWxzSW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9ycy93aXRoLWNyZWRlbnRpYWxzLmludGVyY2VwdG9yJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgS3VpQWN0aW9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExvZ2luRm9ybUNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBMb2dpbkZvcm1Db21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogSnd0SW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgIHsgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBXaXRoQ3JlZGVudGlhbHNJbnRlcmNlcHRvciwgbXVsdGk6IHRydWV9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBLdWlBdXRoZW50aWNhdGlvbk1vZHVsZSB7XG59XG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIGF1dGhlbnRpY2F0aW9uXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZ3VhcmQvYXV0aC5ndWFyZCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9sb2dpbi1mb3JtL2xvZ2luLWZvcm0uY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvYXV0aGVudGljYXRpb24ubW9kdWxlJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtKd3RJbnRlcmNlcHRvciBhcyDDicK1Yn0gZnJvbSAnLi9saWIvaW50ZXJjZXB0b3JzL2p3dC5pbnRlcmNlcHRvcic7XG5leHBvcnQge1dpdGhDcmVkZW50aWFsc0ludGVyY2VwdG9yIGFzIMOJwrVjfSBmcm9tICcuL2xpYi9pbnRlcmNlcHRvcnMvd2l0aC1jcmVkZW50aWFscy5pbnRlcmNlcHRvcic7XG5leHBvcnQge1Nlc3Npb25TZXJ2aWNlIGFzIMOJwrVhfSBmcm9tICcuL2xpYi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7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