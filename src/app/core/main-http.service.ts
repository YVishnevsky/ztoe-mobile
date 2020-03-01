import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable(
    {
        providedIn: "root"
    })

export class MainHttpService {
    private serverUrl = "https://www.ztoe.com.ua/dso/recs/my/api/recordpoints/";

    constructor(private http: HttpClient) { }

    register(recordpointName: string, personSurname: string) {
        const body = { name: recordpointName, personSurname };
        return this.http.post<AccountingPoint>(this.serverUrl, body);
    }

    getAccountingPoint(id: string) {
        return this.http.get<AccountingPointDetail>(this.serverUrl+id);
    }
}