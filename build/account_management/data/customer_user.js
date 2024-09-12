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
var CustomerUser_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerUser = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../../data_source");
const base_entity_1 = require("../../common/typeorm/base_entity");
const uuid_1 = require("../../common/utils/uuid");
const class_validator_1 = require("class-validator");
const postgresql_1 = require("../../common/constants/postgresql");
const customer_account_1 = require("./customer_account"); // Assuming the CustomerAccount entity is in the same directory
/**
 * Represents a customer user entity, associated with a customer account.
 */
let CustomerUser = CustomerUser_1 = class CustomerUser extends base_entity_1.BaseEntity {
    generateUuid() {
        this.id = (0, uuid_1.uuidWithPrefix)(true, 'cuusr');
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this, { validationError: { target: false } });
        });
    }
    static create(firstName, lastName, role, idempotencyKey, customerAccount, transactionalEntityManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerUser = new CustomerUser_1();
            customerUser.firstName = firstName.trim();
            customerUser.lastName = lastName.trim();
            customerUser.role = role.trim();
            customerUser.idempotencyKey = idempotencyKey.trim();
            customerUser.customerAccount = customerAccount;
            const manager = transactionalEntityManager !== null && transactionalEntityManager !== void 0 ? transactionalEntityManager : data_source_1.AppDataSource.manager;
            const insertResult = yield manager
                .createQueryBuilder()
                .insert()
                .into(CustomerUser_1)
                .values(customerUser)
                .orIgnore()
                .returning('*')
                .execute();
            if (insertResult.raw.length === 0) {
                const collidingEntry = yield data_source_1.AppDataSource.getRepository(CustomerUser_1).findOne({
                    where: { idempotencyKey: customerUser.idempotencyKey }
                });
                if (collidingEntry) {
                    return collidingEntry;
                }
                else {
                    throw {
                        code: postgresql_1.POSTGRESQL_ERROR.UNIQUE_VIOLATION,
                        constraint: 'customer_user_unique_idempotency_key',
                        message: 'duplicate key value violates unique constraint "customer_user_unique_idempotency_key"'
                    };
                }
            }
            return customerUser;
        });
    }
};
exports.CustomerUser = CustomerUser;
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', type: 'text', nullable: false }),
    __metadata("design:type", String)
], CustomerUser.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'text', nullable: false }),
    __metadata("design:type", String)
], CustomerUser.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role', type: 'text', nullable: false }),
    __metadata("design:type", String)
], CustomerUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'idempotency_key', type: 'text', unique: true, nullable: false }),
    __metadata("design:type", String)
], CustomerUser.prototype, "idempotencyKey", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_account_1.CustomerAccount, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_account_id' }),
    __metadata("design:type", customer_account_1.CustomerAccount)
], CustomerUser.prototype, "customerAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamptz',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], CustomerUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerUser.prototype, "generateUuid", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerUser.prototype, "validate", null);
exports.CustomerUser = CustomerUser = CustomerUser_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'customer_user' }),
    (0, typeorm_1.Index)('customer_user_unique_idempotency_key', ['idempotencyKey'], { unique: true })
], CustomerUser);
