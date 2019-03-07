import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { UserResponse, UsersResponse } from '../../declarations/';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
/**
 * This service uses the Knora admin API and handles all user data.
 */
var UsersService = /** @class */ (function (_super) {
    tslib_1.__extends(UsersService, _super);
    function UsersService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    UsersService.prototype.getAllUsers = function () {
        return this.httpGet('/admin/users').pipe(map(function (result) { return result.getBody(UsersResponse).users; }), catchError(this.handleJsonError));
    };
    /**
     * Get user by username, email or by iri.
     *
     * @ignore
     *
     * @param {string} identifier - Get user by username, email or by iri
     * @returns Observable<User>
     */
    UsersService.prototype.getUser = function (identifier, identifierType) {
        var path = '/admin/users/' + identifierType + '/' + encodeURIComponent(identifier);
        return this.httpGet(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Get user by IRI
     *
     * @param {string} iri
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUserByIri = function (iri) {
        return this.getUser(iri, 'iri');
    };
    /**
     * Get user by email
     *
     * @param {string} email
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUserByEmail = function (email) {
        return this.getUser(email, 'email');
    };
    /**
     * Get user by username.
     *
     * @param {string} username
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUserByUsername = function (username) {
        return this.getUser(username, 'username');
    };
    /**
     * Get all groups, where the user is member of
     *
     * @param userIri
     */
    UsersService.prototype.getUsersGroupMemberships = function (userIri) {
        var path = '/admin/users/iri/' + userIri + '/group-memberships';
        return this.httpGet(path).pipe(map(function (result) { return result.getBody(UserResponse).groups; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new user.
     *
     * @param {any} data
     * @returns Observable<User>
     */
    UsersService.prototype.createUser = function (data) {
        var path = '/admin/users';
        return this.httpPost(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Add user to a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToProject = function (userIri, projectIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-memberships/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Remove user from project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromProject = function (userIri, projectIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-memberships/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Add user to an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-admin-memberships/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Delete user of an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-admin-memberships/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * add user to project specific group
     *
     * @param userIri
     * @param groupIri
     */
    UsersService.prototype.addUserToGroup = function (userIri, groupIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/group-memberships/' + encodeURIComponent(groupIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * remove user from project specific group
     *
     * @param userIri
     * @param groupIri
     */
    UsersService.prototype.removeUserFromGroup = function (userIri, groupIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/group-memberships/' + encodeURIComponent(groupIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * Add user to the admin system.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToSystemAdmin = function (userIri) {
        var data = {
            'newSystemAdminMembershipStatus': true
        };
        return this.updateUserSystemAdmin(userIri, data);
    };
    /**
     * Remove user from the admin system.
     * @param userIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromSystemAdmin = function (userIri) {
        var data = {
            'newSystemAdminMembershipStatus': false
        };
        return this.updateUserSystemAdmin(userIri, data);
    };
    /**
     * Update user system admin membership
     * @ignore
     *
     *
     * @param userIri
     * @param data
     *
     * @returns Observable<User>
     */
    UsersService.prototype.updateUserSystemAdmin = function (userIri, data) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/SystemAdmin';
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Activate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.activateUser = function (userIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/Status';
        var data = {
            status: true
        };
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Update own password.
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    UsersService.prototype.updateOwnPassword = function (userIri, oldPassword, newPassword) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/Password';
        var data = {
            newPassword: newPassword,
            requesterPassword: oldPassword
        };
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Update password of another user (not own).
     *
     * @param {string} userIri
     * @param {string} requesterPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    UsersService.prototype.updateUsersPassword = function (userIri, requesterPassword, newPassword) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/Password';
        var data = {
            newPassword: newPassword,
            requesterPassword: requesterPassword
        };
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Update basic user information: given name, family name
     * @param userIri
     * @param data
     */
    UsersService.prototype.updateBasicUserInformation = function (userIri, data) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/BasicUserInformation';
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     * Delete / deactivate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.deleteUser = function (userIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    UsersService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    UsersService.ngInjectableDef = i0.defineInjectable({ factory: function UsersService_Factory() { return new UsersService(i0.inject(i1.HttpClient), i0.inject(i2.KuiCoreConfigToken)); }, token: UsersService, providedIn: "root" });
    return UsersService;
}(ApiService));
export { UsersService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FkbWluL3VzZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUdILFlBQVksRUFDWixhQUFhLEVBQ2hCLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFN0I7O0dBRUc7QUFDSDtJQUdrQyx3Q0FBVTtJQUg1Qzs7S0FvVkM7SUFoVkcsMkVBQTJFO0lBQzNFLE1BQU07SUFDTiwyRUFBMkU7SUFFM0U7Ozs7T0FJRztJQUNILGtDQUFXLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUNwQyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQW5DLENBQW1DLENBQUMsRUFDdEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssOEJBQU8sR0FBZixVQUFnQixVQUFrQixFQUFFLGNBQXNCO1FBQ3RELElBQU0sSUFBSSxHQUFHLGVBQWUsR0FBRyxjQUFjLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzFCLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBakMsQ0FBaUMsQ0FBQyxFQUNwRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUNBQVksR0FBWixVQUFhLEdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxxQ0FBYyxHQUFkLFVBQWUsS0FBYTtRQUN4QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHdDQUFpQixHQUFqQixVQUFrQixRQUFnQjtRQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsK0NBQXdCLEdBQXhCLFVBQXlCLE9BQWU7UUFDcEMsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzFCLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBbkMsQ0FBbUMsQ0FBQyxFQUN0RSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBRU4sQ0FBQztJQUVELDJFQUEyRTtJQUMzRSxPQUFPO0lBQ1AsMkVBQTJFO0lBRTNFOzs7OztPQUtHO0lBQ0gsaUNBQVUsR0FBVixVQUFXLElBQVM7UUFDaEIsSUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNqQyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCx1Q0FBZ0IsR0FBaEIsVUFBaUIsT0FBZSxFQUFFLFVBQWtCO1FBQ2hELElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLHVCQUF1QixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzNCLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBakMsQ0FBaUMsQ0FBQyxFQUNwRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILDRDQUFxQixHQUFyQixVQUFzQixPQUFlLEVBQUUsVUFBa0I7UUFDckQsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEdBQUcsdUJBQXVCLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUgsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDN0IsR0FBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFqQyxDQUFpQyxDQUFDLEVBQ3BFLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsNENBQXFCLEdBQXJCLFVBQXNCLE9BQWUsRUFBRSxVQUFrQjtRQUNyRCxJQUFNLElBQUksR0FBRyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyw2QkFBNkIsR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxpREFBMEIsR0FBMUIsVUFBMkIsT0FBZSxFQUFFLFVBQWtCO1FBQzFELElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLDZCQUE2QixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzdCLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBakMsQ0FBaUMsQ0FBQyxFQUNwRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gscUNBQWMsR0FBZCxVQUFlLE9BQWUsRUFBRSxRQUFnQjtRQUM1QyxJQUFNLElBQUksR0FBRyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxxQkFBcUIsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0SCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUVOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDBDQUFtQixHQUFuQixVQUFvQixPQUFlLEVBQUUsUUFBZ0I7UUFDakQsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEdBQUcscUJBQXFCLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEgsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDN0IsR0FBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFqQyxDQUFpQyxDQUFDLEVBQ3BFLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7SUFFTixDQUFDO0lBR0QsMkVBQTJFO0lBQzNFLE1BQU07SUFDTiwyRUFBMkU7SUFHM0U7Ozs7O09BS0c7SUFDSCwyQ0FBb0IsR0FBcEIsVUFBcUIsT0FBZTtRQUNoQyxJQUFNLElBQUksR0FBRztZQUNULGdDQUFnQyxFQUFFLElBQUk7U0FDekMsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVyRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGdEQUF5QixHQUF6QixVQUEwQixPQUFlO1FBQ3JDLElBQU0sSUFBSSxHQUFHO1lBQ1QsZ0NBQWdDLEVBQUUsS0FBSztTQUMxQyxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSyw0Q0FBcUIsR0FBN0IsVUFBOEIsT0FBZSxFQUFFLElBQVM7UUFDcEQsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEdBQUcsY0FBYyxDQUFDO1FBQ2hGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNoQyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNILG1DQUFZLEdBQVosVUFBYSxPQUFlO1FBQ3hCLElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUUzRSxJQUFNLElBQUksR0FBUTtZQUNkLE1BQU0sRUFBRSxJQUFJO1NBQ2YsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNoQyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFHRDs7Ozs7OztPQU9HO0lBQ0gsd0NBQWlCLEdBQWpCLFVBQWtCLE9BQWUsRUFBRSxXQUFtQixFQUFFLFdBQW1CO1FBQ3ZFLElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUU3RSxJQUFNLElBQUksR0FBRztZQUNULFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGlCQUFpQixFQUFFLFdBQVc7U0FDakMsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNoQyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsMENBQW1CLEdBQW5CLFVBQW9CLE9BQWUsRUFBRSxpQkFBeUIsRUFBRSxXQUFtQjtRQUMvRSxJQUFNLElBQUksR0FBRyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQUM7UUFFN0UsSUFBTSxJQUFJLEdBQUc7WUFDVCxXQUFXLEVBQUUsV0FBVztZQUN4QixpQkFBaUIsRUFBRSxpQkFBaUI7U0FDdkMsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNoQyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsaURBQTBCLEdBQTFCLFVBQTJCLE9BQWUsRUFBRSxJQUFTO1FBQ2pELElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLHVCQUF1QixDQUFDO1FBRXpGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNoQyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFHRCwyRUFBMkU7SUFDM0UsU0FBUztJQUNULDJFQUEyRTtJQUUzRTs7Ozs7T0FLRztJQUNILGlDQUFVLEdBQVYsVUFBVyxPQUFlO1FBQ3RCLElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzdCLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBakMsQ0FBaUMsQ0FBQyxFQUNwRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBRU4sQ0FBQzs7Z0JBalZKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozt1QkFoQkQ7Q0FrV0MsQUFwVkQsQ0FHa0MsVUFBVSxHQWlWM0M7U0FqVlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsIEdyb3VwLFxuICAgIFVzZXIsXG4gICAgVXNlclJlc3BvbnNlLFxuICAgIFVzZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIHVzZXMgdGhlIEtub3JhIGFkbWluIEFQSSBhbmQgaGFuZGxlcyBhbGwgdXNlciBkYXRhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHVzZXJzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0QWxsVXNlcnMoKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL2FkbWluL3VzZXJzJykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2Vyc1Jlc3BvbnNlKS51c2VycyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1c2VyIGJ5IHVzZXJuYW1lLCBlbWFpbCBvciBieSBpcmkuXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllciAtIEdldCB1c2VyIGJ5IHVzZXJuYW1lLCBlbWFpbCBvciBieSBpcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRVc2VyKGlkZW50aWZpZXI6IHN0cmluZywgaWRlbnRpZmllclR5cGU6IFN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgaWRlbnRpZmllclR5cGUgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQoaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSBJUklcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBnZXRVc2VyQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcihpcmksICdpcmknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSBlbWFpbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgZ2V0VXNlckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2VyKGVtYWlsLCAnZW1haWwnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSB1c2VybmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGdldFVzZXJCeVVzZXJuYW1lKHVzZXJuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcih1c2VybmFtZSwgJ3VzZXJuYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBncm91cHMsIHdoZXJlIHRoZSB1c2VyIGlzIG1lbWJlciBvZlxuICAgICAqXG4gICAgICogQHBhcmFtIHVzZXJJcmlcbiAgICAgKi9cbiAgICBnZXRVc2Vyc0dyb3VwTWVtYmVyc2hpcHModXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxHcm91cFtdPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgdXNlcklyaSArICcvZ3JvdXAtbWVtYmVyc2hpcHMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS5ncm91cHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGNyZWF0ZVVzZXIoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byBhIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGFkZFVzZXJUb1Byb2plY3QodXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL3Byb2plY3QtbWVtYmVyc2hpcHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdXNlciBmcm9tIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvcHJvamVjdC1tZW1iZXJzaGlwcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHVzZXIgdG8gYW4gYWRtaW4gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWRkVXNlclRvUHJvamVjdEFkbWluKHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9wcm9qZWN0LWFkbWluLW1lbWJlcnNoaXBzLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHVzZXIgb2YgYW4gYWRtaW4gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL3Byb2plY3QtYWRtaW4tbWVtYmVyc2hpcHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCB1c2VyIHRvIHByb2plY3Qgc3BlY2lmaWMgZ3JvdXBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1c2VySXJpXG4gICAgICogQHBhcmFtIGdyb3VwSXJpXG4gICAgICovXG4gICAgYWRkVXNlclRvR3JvdXAodXNlcklyaTogc3RyaW5nLCBncm91cElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9ncm91cC1tZW1iZXJzaGlwcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdyb3VwSXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSB1c2VyIGZyb20gcHJvamVjdCBzcGVjaWZpYyBncm91cFxuICAgICAqXG4gICAgICogQHBhcmFtIHVzZXJJcmlcbiAgICAgKiBAcGFyYW0gZ3JvdXBJcmlcbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbUdyb3VwKHVzZXJJcmk6IHN0cmluZywgZ3JvdXBJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvZ3JvdXAtbWVtYmVyc2hpcHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChncm91cElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEFkZCB1c2VyIHRvIHRoZSBhZG1pbiBzeXN0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9TeXN0ZW1BZG1pbih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICduZXdTeXN0ZW1BZG1pbk1lbWJlcnNoaXBTdGF0dXMnOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlclN5c3RlbUFkbWluKHVzZXJJcmksIGRhdGEpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHVzZXIgZnJvbSB0aGUgYWRtaW4gc3lzdGVtLlxuICAgICAqIEBwYXJhbSB1c2VySXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tU3lzdGVtQWRtaW4odXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAnbmV3U3lzdGVtQWRtaW5NZW1iZXJzaGlwU3RhdHVzJzogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyU3lzdGVtQWRtaW4odXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHVzZXIgc3lzdGVtIGFkbWluIG1lbWJlcnNoaXBcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1c2VySXJpXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZVVzZXJTeXN0ZW1BZG1pbih1c2VySXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvU3lzdGVtQWRtaW4nO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWN0aXZhdGVVc2VyKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvU3RhdHVzJztcblxuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgb3duIHBhc3N3b3JkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkUGFzc3dvcmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgdXBkYXRlT3duUGFzc3dvcmQodXNlcklyaTogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9QYXNzd29yZCc7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiBvbGRQYXNzd29yZFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgcGFzc3dvcmQgb2YgYW5vdGhlciB1c2VyIChub3Qgb3duKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlclBhc3N3b3JkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1Bhc3N3b3JkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHVwZGF0ZVVzZXJzUGFzc3dvcmQodXNlcklyaTogc3RyaW5nLCByZXF1ZXN0ZXJQYXNzd29yZDogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9QYXNzd29yZCc7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiByZXF1ZXN0ZXJQYXNzd29yZFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYmFzaWMgdXNlciBpbmZvcm1hdGlvbjogZ2l2ZW4gbmFtZSwgZmFtaWx5IG5hbWVcbiAgICAgKiBAcGFyYW0gdXNlcklyaVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgdXBkYXRlQmFzaWNVc2VySW5mb3JtYXRpb24odXNlcklyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL0Jhc2ljVXNlckluZm9ybWF0aW9uJztcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBERUxFVEVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSAvIGRlYWN0aXZhdGUgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGRlbGV0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG5cblxufVxuIl19