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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBaseEntity = void 0;
const base_entity_1 = require("../../../src/common/typeorm/base_entity");
const typeorm_1 = require("typeorm");
// TODO(felix): bring state and statusReason to be in this table as well
let StatusBaseEntity = class StatusBaseEntity extends base_entity_1.BaseEntity {
    validateEntryNotDeleted() {
        if (this.deletedAt) {
            throw new Error("cannot insert a deleted entry");
        }
    }
    static validateStateChange(allowedToStates, toState, from) {
        if (!allowedToStates.includes(toState)) {
            throw new Error(`invalid state transition from ${from} to ${toState}`);
        }
    }
    static isValidStateTransition(allowedToStates, toState) {
        return allowedToStates === null || allowedToStates === void 0 ? void 0 : allowedToStates.includes(toState);
    }
    static validStateTransition(from, to, validStateTransitions) {
        return this.isValidStateTransition(validStateTransitions[from], to);
    }
    static validateStateTransition(from, to, validStateTransitions) {
        this.validateStateChange(validStateTransitions[from], to, from);
    }
};
exports.StatusBaseEntity = StatusBaseEntity;
__decorate([
    (0, typeorm_1.Column)({ name: "created_by_internal_user_id", type: "text", nullable: true, update: false }),
    __metadata("design:type", String)
], StatusBaseEntity.prototype, "createdByInternalUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], StatusBaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", name: "deleted_at", nullable: true }),
    __metadata("design:type", Date)
], StatusBaseEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatusBaseEntity.prototype, "validateEntryNotDeleted", null);
exports.StatusBaseEntity = StatusBaseEntity = __decorate([
    (0, typeorm_1.Entity)()
], StatusBaseEntity);
