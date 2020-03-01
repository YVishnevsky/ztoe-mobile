import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class NewRegistrationService {

    private newAccountingPoint: AccountingPoint = null;

    constructor() { }

    setData(acountingPoint: AccountingPoint) {
        this.newAccountingPoint = acountingPoint;
    }

    getData()
    {
        return this.newAccountingPoint;
    }
}