"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerUserRole = exports.Country = exports.AuthType = exports.AssetAccountStatus = exports.AccountType = void 0;
var AccountType;
(function (AccountType) {
    AccountType["Business"] = "BUSINESS";
    AccountType["Personal"] = "PERSONAL";
})(AccountType || (exports.AccountType = AccountType = {}));
var AssetAccountStatus;
(function (AssetAccountStatus) {
    AssetAccountStatus["Active"] = "ACTIVE";
    AssetAccountStatus["Deleted"] = "DELETED";
})(AssetAccountStatus || (exports.AssetAccountStatus = AssetAccountStatus = {}));
var AuthType;
(function (AuthType) {
    AuthType["Email"] = "EMAIL";
    AuthType["Phone"] = "PHONE";
})(AuthType || (exports.AuthType = AuthType = {}));
var Country;
(function (Country) {
    Country["Us"] = "US";
    Country["Zimbabwe"] = "ZIMBABWE";
})(Country || (exports.Country = Country = {}));
var CustomerUserRole;
(function (CustomerUserRole) {
    CustomerUserRole["Admin"] = "ADMIN";
    CustomerUserRole["Regular"] = "REGULAR";
})(CustomerUserRole || (exports.CustomerUserRole = CustomerUserRole = {}));
