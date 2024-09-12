"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var CustomerAccount_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAccount = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../../data_source");
const base_entity_1 = require("../../common/typeorm/base_entity");
const uuid_1 = require("../../common/utils/uuid");
const postgresql_1 = require("../../common/constants/postgresql");
const class_validator_1 = require("class-validator");
/**
 * We keep track of the customer account, which is an entity under which any action can be taken.
 */
let CustomerAccount = CustomerAccount_1 = class CustomerAccount extends base_entity_1.BaseEntity {
    generateUuid() {
        this.id = (0, uuid_1.uuidWithPrefix)(true, 'cuacc');
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this, { validationError: { target: false } });
        });
    }
    equal(name) {
        return this.name == name;
    }
    static create(name, transactionalEntityManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerAccount = new CustomerAccount_1();
            customerAccount.name = name.trim();
            customerAccount.normalizedName = name.trim().toLowerCase();
            const manager = transactionalEntityManager !== null && transactionalEntityManager !== void 0 ? transactionalEntityManager : data_source_1.AppDataSource.manager;
            const insertResult = yield manager
                .createQueryBuilder()
                .insert()
                .into(CustomerAccount_1)
                .values(customerAccount)
                .orIgnore()
                .returning('*')
                .execute();
            if (insertResult.raw.length == 0) {
                let collidingEntry = yield data_source_1.AppDataSource.getRepository(CustomerAccount_1).findOne({
                    where: { normalizedName: customerAccount.normalizedName }
                });
                if (collidingEntry === null || collidingEntry === void 0 ? void 0 : collidingEntry.equal(name)) {
                    return collidingEntry;
                }
                else {
                    throw {
                        code: postgresql_1.POSTGRESQL_ERROR.UNIQUE_VIOLATION,
                        constraint: 'customer_account_unique_name',
                        message: 'duplicate key value violates unique constraint "customer_account_unique_name"'
                    };
                }
            }
            return customerAccount;
        });
    }
};
exports.CustomerAccount = CustomerAccount;
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'text', update: false, nullable: false }),
    __metadata("design:type", String)
], CustomerAccount.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Length)(3) // should be at least 3 characters
    ,
    (0, typeorm_1.Column)({ name: 'normalized_name', type: 'text', update: false, nullable: false }),
    __metadata("design:type", String)
], CustomerAccount.prototype, "normalizedName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamptz',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], CustomerAccount.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerAccount.prototype, "generateUuid", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerAccount.prototype, "validate", null);
exports.CustomerAccount = CustomerAccount = CustomerAccount_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'customer_account' }),
    (0, typeorm_1.Index)('customer_account_unique_normalized_name', ['normalizedName'], { unique: true })
], CustomerAccount);
