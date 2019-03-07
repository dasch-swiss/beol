import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
let CurrentUser = class CurrentUser {
    constructor() {
        this.name = undefined;
        this.jwt = undefined;
        this.lang = undefined;
        this.sysAdmin = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('name', String),
    tslib_1.__metadata("design:type", String)
], CurrentUser.prototype, "name", void 0);
tslib_1.__decorate([
    JsonProperty('jwt', String, true),
    tslib_1.__metadata("design:type", String)
], CurrentUser.prototype, "jwt", void 0);
tslib_1.__decorate([
    JsonProperty('lang', String, true),
    tslib_1.__metadata("design:type", String)
], CurrentUser.prototype, "lang", void 0);
tslib_1.__decorate([
    JsonProperty('sysAdmin', Boolean),
    tslib_1.__metadata("design:type", Boolean)
], CurrentUser.prototype, "sysAdmin", void 0);
CurrentUser = tslib_1.__decorate([
    JsonObject
], CurrentUser);
export { CurrentUser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC11c2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7SUFHOUMsV0FBVyxTQUFYLFdBQVc7SUFEeEI7UUFJVyxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBR3pCLFFBQUcsR0FBVyxTQUFTLENBQUM7UUFHeEIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUd6QixhQUFRLEdBQVksU0FBUyxDQUFDO0lBRXpDLENBQUM7Q0FBQSxDQUFBO0FBWEc7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7eUNBQ0c7QUFHaEM7SUFEQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O3dDQUNIO0FBRy9CO0lBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzt5Q0FDSDtBQUdoQztJQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDOzs2Q0FDRztBQVo1QixXQUFXO0lBRHZCLFVBQVU7R0FDRSxXQUFXLENBY3ZCO1NBZFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0XG5leHBvcnQgY2xhc3MgQ3VycmVudFVzZXIge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnand0JywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBqd3Q6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmcnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N5c0FkbWluJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3lzQWRtaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbn1cbiJdfQ==