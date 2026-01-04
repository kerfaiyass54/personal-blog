"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InserCodeComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var InserCodeComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-inser-code',
            imports: [
                forms_1.ReactiveFormsModule,
                router_1.RouterLink
            ],
            templateUrl: './inser-code.component.html',
            styleUrl: './inser-code.component.scss',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _verified_decorators;
    var _verified_initializers = [];
    var _verified_extraInitializers = [];
    var InserCodeComponent = _classThis = /** @class */ (function () {
        function InserCodeComponent_1(fb, toastr, resetService) {
            this.fb = fb;
            this.toastr = toastr;
            this.resetService = resetService;
            this.codeSent = false;
            this.submitted = false;
            this.codeVerified = false;
            this.verified = __runInitializers(this, _verified_initializers, new core_1.EventEmitter());
            this.form = (__runInitializers(this, _verified_extraInitializers), this.fb.nonNullable.group({
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                code: ['', forms_1.Validators.required]
            }));
        }
        InserCodeComponent_1.prototype.verifyCode = function () {
            this.submitted = true;
            if (this.form.invalid)
                return;
        };
        InserCodeComponent_1.prototype.sendCode = function () {
            var _this = this;
            this.resetService.sendEmail(this.form.value.email).subscribe(function () {
                _this.codeSent = true;
                _this.toastr.success("Code sent", "SUCCESS");
            });
        };
        return InserCodeComponent_1;
    }());
    __setFunctionName(_classThis, "InserCodeComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _verified_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _verified_decorators, { kind: "field", name: "verified", static: false, private: false, access: { has: function (obj) { return "verified" in obj; }, get: function (obj) { return obj.verified; }, set: function (obj, value) { obj.verified = value; } }, metadata: _metadata }, _verified_initializers, _verified_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InserCodeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InserCodeComponent = _classThis;
}();
exports.InserCodeComponent = InserCodeComponent;
