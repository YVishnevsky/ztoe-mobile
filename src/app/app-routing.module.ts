import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ConfirmRegistrationComponent } from "./confirm-registration/confirm-registration.component";
import { RegistrationComponent } from "./registration/registration.component";
import { HomeComponent } from "./home/home.component";
import { AccountingPointDetailComponent } from "./accounting-point-detail/accounting-point-detail.component";
import { NewMeterReadingComponent } from "./new-meter-reading/new-meter-reading.component";
import { PdfViewComponent } from "./pdf-view/pdf.view.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "confirm-registration", component: ConfirmRegistrationComponent },
    { path: "accounting-point-datail/:id", component: AccountingPointDetailComponent },
    { path: ":id/new-meter-reading/:date", component: NewMeterReadingComponent },
    { path: "pdf-view/:url", component: PdfViewComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
