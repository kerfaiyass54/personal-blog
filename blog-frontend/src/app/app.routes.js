"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var login_screen_component_1 = require("./login-screen/login-screen.component");
var signup_screen_component_1 = require("./signup-screen/signup-screen.component");
var home_page_component_1 = require("./home-page/home-page.component");
var auth_guard_1 = require("./shared/guards/auth.guard");
var writer_ui_component_1 = require("./writer-ui/writer-ui.component");
var reader_ui_component_1 = require("./reader-ui/reader-ui.component");
var error_not_found_component_1 = require("./error-not-found/error-not-found.component");
var noAuth_guard_1 = require("./shared/guards/noAuth.guard");
var forgot_password_component_1 = require("./forgot-password/forgot-password.component");
exports.routes = [
    { path: '', component: home_page_component_1.HomePageComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_screen_component_1.LoginScreenComponent, canActivate: [noAuth_guard_1.NoAuthGuard] },
    { path: 'register', component: signup_screen_component_1.SignupScreenComponent, canActivate: [noAuth_guard_1.NoAuthGuard] },
    { path: 'password', component: forgot_password_component_1.ForgotPasswordComponent, canActivate: [noAuth_guard_1.NoAuthGuard] },
    {
        path: 'writer',
        canActivate: [auth_guard_1.AuthGuard],
        data: { roles: ['WRITER'] },
        component: writer_ui_component_1.WriterUiComponent
    },
    { path: 'reader', canActivate: [auth_guard_1.AuthGuard], component: reader_ui_component_1.ReaderUiComponent },
    { path: '**', component: error_not_found_component_1.ErrorNotFoundComponent }
];
