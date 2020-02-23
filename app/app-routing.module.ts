import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ConfirmRegistrationComponent } from "./confirm-registration/confirm-registration.component";
import { RegistrationComponent } from "./registration/registration.component";
import { HomeComponent } from "./home/home.component";
import { AccountingPointDetailComponent } from "./accounting-point-detail/accounting-point-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "confirm-registration", component: ConfirmRegistrationComponent },
    { path: "accounting-point-datail/:id", component: AccountingPointDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
