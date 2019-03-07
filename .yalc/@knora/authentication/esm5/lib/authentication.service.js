import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiServiceError, KuiCoreConfigToken } from '@knora/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionService } from './session/session.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./session/session.service";
import * as i3 from "@knora/core";
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
    AuthenticationService.ngInjectableDef = i0.defineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(i0.inject(i1.HttpClient), i0.inject(i2.SessionService), i0.inject(i3.KuiCoreConfigToken)); }, token: AuthenticationService, providedIn: "root" });
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hdXRoZW50aWNhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQW1DLE1BQU0sc0JBQXNCLENBQUM7QUFDbkYsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsRSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7OztBQUUzRDs7R0FFRztBQUNIO0lBS0ksK0JBQW1CLElBQWdCLEVBQ2YsUUFBd0IsRUFDRyxNQUFNO1FBRmxDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDZixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUNHLFdBQU0sR0FBTixNQUFNLENBQUE7UUFFakQsb0VBQW9FO0lBQ3hFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHVDQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxxQ0FBSyxHQUFMLFVBQU0sUUFBZ0IsRUFBRSxRQUFnQjtRQUVwQyx5RUFBeUU7UUFGN0UsaUJBZ0JDO1FBWkcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsb0JBQW9CLEVBQ3RDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLEVBQ3hDLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUN2QixHQUFHLENBQUMsVUFBQyxRQUEyQjtZQUM1QixPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsVUFBQyxLQUF3QjtZQUVoQyxPQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ1YsQ0FBQztJQUdEOzs7O09BSUc7SUFDSCxzQ0FBTSxHQUFOO1FBQ0ksc0JBQXNCO1FBQ3RCLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUdEOzs7Ozs7T0FNRztJQUNPLGtEQUFrQixHQUE1QixVQUE2QixLQUF3QjtRQUNqRCxJQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzNDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxZQUFZLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDM0MsWUFBWSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM3QixPQUFPLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkExRUosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFaUSxVQUFVO2dCQUtWLGNBQWM7Z0RBWU4sTUFBTSxTQUFDLGtCQUFrQjs7O2dDQWpCMUM7Q0FxRkMsQUEzRUQsSUEyRUM7U0F4RVkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBLdWlDb3JlQ29uZmlnVG9rZW4gfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIHNlcnZpY2UgaW5jbHVkZXMgdGhlIGxvZ2luLCBsb2dvdXQgbWV0aG9kIGFuZCBhIHNlc3Npb24gbWV0aG9kIHRvIGNoZWNrIGlmIGEgdXNlciBpcyBsb2dnZWQgaW4gb3Igbm90LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9zZXNzaW9uOiBTZXNzaW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZykge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBdXRoZW50aWNhdGlvblNlcnZpY2UgY29uc3RydWN0b3I6IGNvbmZpZycsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGUgaWYgYSB1c2VyIGlzIGxvZ2dlZCBpbiBvciBub3RcbiAgICAgKiByZXR1cm5zIHRydWUgaWYgdGhlIHNlc3Npb24gaXMgYWN0aXZlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAgICovXG4gICAgc2Vzc2lvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24udmFsaWRhdGVTZXNzaW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9naW4gcHJvY2VzcztcbiAgICAgKiBpdCdzIHVzZWQgYnkgdGhlIGxvZ2luIGNvbXBvbmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXIgZW1haWwgb3IgdXNlcm5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT5cbiAgICAgKi9cbiAgICBsb2dpbih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnQXV0aGVudGljYXRpb25TZXJ2aWNlIC0gbG9naW4gLSBhcGk6ICcsIHRoaXMuY29uZmlnLmFwaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpICsgJy92Mi9hdXRoZW50aWNhdGlvbicsXG4gICAgICAgICAgICB7dXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmR9LFxuICAgICAgICAgICAge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogYW55ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBsb2dvdXQgdGhlIHVzZXIgYnkgZGVzdHJveWluZyB0aGUgc2Vzc2lvblxuICAgICAqXG4gICAgICogQHBhcmFtXG4gICAgICovXG4gICAgbG9nb3V0KCkge1xuICAgICAgICAvLyBkZXN0cm95IHRoZSBzZXNzaW9uXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogaGFuZGxlIHJlcXVlc3QgZXJyb3IgaW4gY2FzZSBvZiBzZXJ2ZXIgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlcnJvclxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSBlcnJvci51cmw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG4gICAgfVxufVxuIl19