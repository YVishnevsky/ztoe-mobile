import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { urls } from "../shared/url"

@Injectable(
    {
        providedIn: "root"
    })

export class MainHttpService {

    constructor(private http: HttpClient) { }

    register(recordpointName: string, personSurname: string) {
        const body = { name: recordpointName, personSurname };
        return this.http.post<AccountingPoint>(urls.serverZtoeApi, body);
    }

    getAccountingPoint(id: string) {
        return this.http.get<AccountingPointDetail>(urls.serverZtoeApi + id);
    }

    sendMeterReading(id: string, meterReading: CustomerMeterReading) {
        return this.http.post(urls.serverZtoeApi + id + '/meter-readings', meterReading);
    }
}