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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FoodController__service;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodController = void 0;
const common_1 = require("@nestjs/common");
const food_service_1 = require("./food.service");
const dtos_1 = require("./dtos");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
let FoodController = class FoodController {
    constructor(service) {
        _FoodController__service.set(this, void 0);
        __classPrivateFieldSet(this, _FoodController__service, service, "f");
    }
    async getAllFoods() {
        return await __classPrivateFieldGet(this, _FoodController__service, "f").getAllFoods();
    }
    async createFood(createFoodPayload, image) {
        await __classPrivateFieldGet(this, _FoodController__service, "f").createFood({
            ...createFoodPayload,
            image: image,
        });
    }
    async deleteFood(foodId) {
        await __classPrivateFieldGet(this, _FoodController__service, "f").deleteFood(foodId);
    }
};
exports.FoodController = FoodController;
_FoodController__service = new WeakMap();
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all foods' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getAllFoods", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'create food' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Post)('/add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateFoodDto, Object]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "createFood", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Food' }),
    (0, common_1.Delete)('/delete/:foodId'),
    __param(0, (0, common_1.Param)('foodId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "deleteFood", null);
exports.FoodController = FoodController = __decorate([
    (0, swagger_1.ApiTags)('Foods'),
    (0, common_1.Controller)('foods'),
    __metadata("design:paramtypes", [food_service_1.FoodService])
], FoodController);
//# sourceMappingURL=food.controller.js.map