import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA, LOCALE_ID } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { AccountingPointComponent } from "./accounting-point/accounting-point.component";
import { RegistrationComponent } from "./registration/registration.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { HomeComponent } from "./home/home.component";
/* import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular/calendar-directives";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular/chart-directives";

import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular/autocomplete-directives"; */
import { NativeScriptCommonModule } from "nativescript-angular/common";
/* import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular/dataform-directives";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular/gauges-directives"; */
import { AccountingPointDetailComponent } from "./accounting-point-detail/accounting-point-detail.component";
import { NewMeterReadingComponent } from "./new-meter-reading/new-meter-reading.component";
import { PdfViewComponent } from "./pdf-view/pdf.view.component";

registerLocaleData(uk);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        /* NativeScriptUISideDrawerModule,
        
        NativeScriptUICalendarModule,
        NativeScriptUIChartModule,
        NativeScriptUIDataFormModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIGaugeModule, */
        NativeScriptCommonModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ConfirmRegistrationComponent,
        AccountingPointComponent,
        AccountingPointDetailComponent,
        RegistrationComponent,
        NewMeterReadingComponent,
        PdfViewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers:[ { provide: LOCALE_ID, useValue: 'uk-UA' },]
})
export class AppModule { }
