import { Injectable } from "@angular/core";
import {
    getString,
    setString,
    remove,
    getAllKeys
} from "tns-core-modules/application-settings";


@Injectable({
    providedIn: "root"
})

export class DataStorageService {
    private readonly prefix: string = 'ztoe_ap_';

    constructor() { }

    saveAccountingPoint(accountingPoint: AccountingPoint) {
        setString(this.prefix + accountingPoint.id, JSON.stringify({
            id: accountingPoint.id,
            name: accountingPoint.name,
            ren: accountingPoint.ren,
            address: accountingPoint.address,
            zoneCount: accountingPoint.zoneCount,
            digitCapacity: accountingPoint.digitCapacity,
            owner: { fullName: accountingPoint.owner.fullName }
        }));
    }

    getAccountingPoints() {
        let accountingPoints: Array<AccountingPoint> = [];
        getAllKeys().filter(k => k.startsWith(this.prefix)).forEach(id => {
            let json = getString(id);
            accountingPoints.push(JSON.parse(json));
        });

     /*    
        if (keys.length > 0) {
            keys.filter(k => k.startsWith(this.prefix)).forEach(id => {
                let json = getString(id);
                accountingPoints.push(JSON.parse(json));
            })
        } */
        return accountingPoints;
    }

    getAccountingPoint(id: string) {
        const json = getString(this.prefix + id);
        const accountingPoint = JSON.parse(json);
        return accountingPoint;
    }

    removeAccountingPoint(id: string) {
        remove(this.prefix + id);
    }
}