import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataStorageService } from "~/core/data-storage.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    accountingPoints: Array<AccountingPoint> = [];

    constructor(private storageService: DataStorageService, private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {
        this.accountingPoints = this.storageService.getAccountingPoints();
        //con
        if (this.accountingPoints.length == 0) {
            this.routerExtensions.navigate(["/registration"], { clearHistory: true });
        }
    }
}
