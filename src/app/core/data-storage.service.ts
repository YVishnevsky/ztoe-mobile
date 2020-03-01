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

    constructor() { }

    saveAccountingPoint(accountingPoint: AccountingPoint) {
        remove(accountingPoint.id); //remove
        setString('ztoe_ap_' + accountingPoint.id, JSON.stringify({
            id: accountingPoint.id,
            name: accountingPoint.name,
            ren: accountingPoint.ren,
            address: accountingPoint.address,
            zoneCount: Number(accountingPoint.zoneCount),
            digitCapacity: accountingPoint.digitCapacity,
            owner: { fullName: accountingPoint.owner.fullName }
        }));
    }

    getAccountingPoints() {
        let keys = getAllKeys();
        let accountingPoints: Array<AccountingPoint> = [];
        if (keys.length > 0) {
            keys.filter(k => k.startsWith('ztoe_ap_')).forEach(id => {
                let json = getString(id);
                accountingPoints.push(JSON.parse(json));
            })
        }
        return accountingPoints;
    }

    getAccountingPoint(id: string) {
        const json = getString('ztoe_ap_' + id);
        const accountingPoint = JSON.parse(json);
        return accountingPoint;
    }
}