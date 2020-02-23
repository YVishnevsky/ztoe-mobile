import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { AccountingPointDetailComponent } from "./accounting-point-detail/accounting-point-detail.component";
import { RegistrationComponent } from "./registration/registration.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        ConfirmRegistrationComponent,
        AccountingPointDetailComponent,
        RegistrationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [AccountingPointDetailComponent]
})
export class AppModule { }
