import { Injectable } from "@angular/core";
import { DataStorageService } from "./data-storage.service";

@Injectable({
    providedIn: "root"
})

export class NewRegistrationService {

    private newAccountingPoint: AccountingPoint = null;

    constructor(private storageService: DataStorageService) {
        
    }

    setData(acountingPoint: AccountingPoint) {
        this.newAccountingPoint = acountingPoint;
    }

    getData() {
        return this.newAccountingPoint;
    }

    isFirstRegistration(){
         return this.storageService.getAccountingPoints().length == 0;
    }
}