import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { KnoraConstants, KuiCoreConfigToken, UsersService } from '@knora/core';
import * as momentImported from 'moment';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@knora/core";
const moment = momentImported;
export class SessionService {
    constructor(_http, config, _users) {
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
    setSession(jwt, username) {
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
        this._users.getUserByUsername(username).subscribe((result) => {
            let sysAdmin = false;
            const permissions = result.permissions;
            if (permissions.groupsPerProject[KnoraConstants.SystemProjectIRI]) {
                sysAdmin = permissions.groupsPerProject[KnoraConstants.SystemProjectIRI]
                    .indexOf(KnoraConstants.SystemAdminGroupIRI) > -1;
            }
            // define a session id, which is the timestamp of login
            this.session = {
                id: this.setTimestamp(),
                user: {
                    name: result.username,
                    jwt: jwt,
                    lang: result.lang,
                    sysAdmin: sysAdmin
                }
            };
            // store in the localStorage
            localStorage.setItem('session', JSON.stringify(this.session));
        }, (error) => {
            console.error(error);
        });
    }
    setTimestamp() {
        return (moment().add(0, 'second')).valueOf();
    }
    getSession() {
    }
    updateSession() {
    }
    validateSession() {
        // mix of checks with session.validation and this.authenticate
        this.session = JSON.parse(localStorage.getItem('session'));
        const tsNow = this.setTimestamp();
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
    }
    authenticate() {
        return this._http.get(this.config.api + '/v2/authentication').pipe(map((result) => {
            // console.log('AuthenticationService - authenticate - result: ', result);
            // return true || false
            return result.status === 200;
        }));
    }
    destroySession() {
        localStorage.removeItem('session');
    }
}
SessionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
SessionService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [KuiCoreConfigToken,] }] },
    { type: UsersService }
];
SessionService.ngInjectableDef = i0.defineInjectable({ factory: function SessionService_Factory() { return new SessionService(i0.inject(i1.HttpClient), i0.inject(i2.KuiCoreConfigToken), i0.inject(i2.UsersService)); }, token: SessionService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQW1CLGNBQWMsRUFBRSxrQkFBa0IsRUFBaUIsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRS9HLE9BQU8sS0FBSyxjQUFjLE1BQU0sUUFBUSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVyQyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFNOUIsTUFBTSxPQUFPLGNBQWM7SUFXdkIsWUFDWSxLQUFpQixFQUNVLE1BQU0sRUFDakMsTUFBb0I7UUFGcEIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNVLFdBQU0sR0FBTixNQUFNLENBQUE7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQVZoQzs7OztXQUlHO1FBQ00scUJBQWdCLEdBQVcsUUFBUSxDQUFDLENBQUMsMkJBQTJCO0lBTXpFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxVQUFVLENBQUMsR0FBVyxFQUFFLFFBQWdCO1FBRXBDLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN2QixJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFLEtBQUs7YUFDbEI7U0FDSixDQUFDO1FBQ0YsNEJBQTRCO1FBQzVCLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUks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SSxDQUM5RCxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUVoQiwwRUFBMEU7WUFDMUUsdUJBQXVCO1lBQ3ZCLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCxjQUFjO1FBQ1YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUF2SUosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7O1lBYlEsVUFBVTs0Q0EyQlYsTUFBTSxTQUFDLGtCQUFrQjtZQXpCMkMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgS25vcmFDb25zdGFudHMsIEt1aUNvcmVDb25maWdUb2tlbiwgU2Vzc2lvbiwgVXNlciwgVXNlcnNTZXJ2aWNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRJbXBvcnRlZCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRJbXBvcnRlZDtcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlc3Npb25TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBzZXNzaW9uOiBTZXNzaW9uO1xuXG4gICAgLyoqXG4gICAgICogbWF4IHNlc3Npb24gdGltZSBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiBkZWZhdWx0IHZhbHVlICgyNGgpOiA4NjQwMDAwMFxuICAgICAqXG4gICAgICovXG4gICAgcmVhZG9ubHkgTUFYX1NFU1NJT05fVElNRTogbnVtYmVyID0gODY0MDAwMDA7IC8vIDFkID0gMjQgKiA2MCAqIDYwICogMTAwMFxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnLFxuICAgICAgICBwcml2YXRlIF91c2VyczogVXNlcnNTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0IHRoZSBzZXNzaW9uIGJ5IHVzaW5nIHRoZSBqc29uIHdlYiB0b2tlbiAoand0KSBhbmQgdGhlIHVzZXIgb2JqZWN0O1xuICAgICAqIGl0IHdpbGwgYmUgdXNlZCBpbiB0aGUgbG9naW4gcHJvY2Vzc1xuICAgICAqXG4gICAgICogQHBhcmFtIGp3dFxuICAgICAqIEBwYXJhbSB1c2VybmFtZVxuICAgICAqL1xuICAgIHNldFNlc3Npb24oand0OiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcpIHtcblxuICAgICAgICB0aGlzLnNlc3Npb24gPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5zZXRUaW1lc3RhbXAoKSxcbiAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBqd3Q6IGp3dCxcbiAgICAgICAgICAgICAgICBsYW5nOiAnZW4nLFxuICAgICAgICAgICAgICAgIHN5c0FkbWluOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBzdG9yZSBpbiB0aGUgbG9jYWxTdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXNzaW9uJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zZXNzaW9uKSk7XG5cbiAgICAgICAgLy8gZ2V0IHVzZXIgaW5mb3JtYXRpb25cbiAgICAgICAgdGhpcy5fdXNlcnMuZ2V0VXNlckJ5VXNlcm5hbWUodXNlcm5hbWUpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXN1bHQ6IFVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3lzQWRtaW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pc3Npb25zID0gcmVzdWx0LnBlcm1pc3Npb25zO1xuICAgICAgICAgICAgICAgIGlmIChwZXJtaXNzaW9ucy5ncm91cHNQZXJQcm9qZWN0W0tub3JhQ29uc3RhbnRzLlN5c3RlbVByb2plY3RJUkldKSB7XG4gICAgICAgICAgICAgICAgICAgIHN5c0FkbWluID0gcGVybWlzc2lvbnMuZ3JvdXBzUGVyUHJvamVjdFtLbm9yYUNvbnN0YW50cy5TeXN0ZW1Qcm9qZWN0SVJJXVxuICAgICAgICAgICAgICAgICAgICAgICAgLmluZGV4T2YoS25vcmFDb25zdGFudHMuU3lzdGVtQWRtaW5Hcm91cElSSSkgPiAtMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkZWZpbmUgYSBzZXNzaW9uIGlkLCB3aGljaCBpcyB0aGUgdGltZXN0YW1wIG9mIGxvZ2luXG4gICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5zZXRUaW1lc3RhbXAoKSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVzdWx0LnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgand0OiBqd3QsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5nOiByZXN1bHQubGFuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5c0FkbWluOiBzeXNBZG1pblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBpbiB0aGUgbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlc3Npb24pKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRUaW1lc3RhbXAoKSB7XG4gICAgICAgIHJldHVybiAobW9tZW50KCkuYWRkKDAsICdzZWNvbmQnKSkudmFsdWVPZigpO1xuICAgIH1cblxuICAgIGdldFNlc3Npb24oKSB7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVTZXNzaW9uKCkge1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGVTZXNzaW9uKCkge1xuICAgICAgICAvLyBtaXggb2YgY2hlY2tzIHdpdGggc2Vzc2lvbi52YWxpZGF0aW9uIGFuZCB0aGlzLmF1dGhlbnRpY2F0ZVxuICAgICAgICB0aGlzLnNlc3Npb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uJykpO1xuXG4gICAgICAgIGNvbnN0IHRzTm93OiBudW1iZXIgPSB0aGlzLnNldFRpbWVzdGFtcCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlc3Npb24pIHtcbiAgICAgICAgICAgIC8vIHRoZSBzZXNzaW9uIGV4aXN0c1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNlc3Npb24gaXMgc3RpbGwgdmFsaWQ6XG4gICAgICAgICAgICAvLyBpZiBzZXNzaW9uLmlkICsgTUFYX1NFU1NJT05fVElNRSA+IG5vdzogX3Nlc3Npb24udmFsaWRhdGVTZXNzaW9uKClcbiAgICAgICAgICAgIGlmICh0aGlzLnNlc3Npb24uaWQgKyB0aGlzLk1BWF9TRVNTSU9OX1RJTUUgPCB0c05vdykge1xuICAgICAgICAgICAgICAgIC8vIHRoZSBpbnRlcm5hbCBzZXNzaW9uIGhhcyBleHBpcmVkXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGFwaSB2Mi9hdXRoZW50aWNhdGlvbiBpcyBzdGlsbCB2YWxpZFxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0aGVudGljYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFwaSBhdXRoZW50aWNhdGlvbiBpcyB2YWxpZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBzZXNzaW9uLmlkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5pZCA9IHRzTm93O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXNzaW9uJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zZXNzaW9uKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignc2Vzc2lvbi5zZXJ2aWNlIC0tIHZhbGlkYXRlU2Vzc2lvbiAtLSBhdXRoZW50aWNhdGU6IHRoZSBzZXNzaW9uIGV4cGlyZWQgb24gQVBJIHNpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYSB1c2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkIGFueW1vcmUhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGF1dGhlbnRpY2F0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaSArICcvdjIvYXV0aGVudGljYXRpb24nKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0F1dGhlbnRpY2F0aW9uU2VydmljZSAtIGF1dGhlbnRpY2F0ZSAtIHJlc3VsdDogJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdHJ1ZSB8fCBmYWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuc3RhdHVzID09PSAyMDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlc3Ryb3lTZXNzaW9uKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvbicpO1xuICAgIH1cblxuXG59XG4iXX0=