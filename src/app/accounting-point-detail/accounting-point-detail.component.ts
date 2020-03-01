import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MainHttpService } from "../core/main-http.service";
import { switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { RouterExtensions } from "nativescript-angular/router";
import { DataStorageService } from "../core/data-storage.service";
import { GetZoneNames } from "../shared/utils";

@Component({
	selector: "accounting-point-detail",
	moduleId: module.id,
	templateUrl: "./accounting-point-detail.component.html",
	styleUrls: ['./accounting-point-detail.component.css']
})
export class AccountingPointDetailComponent implements OnInit {

	headerColumns: string = '*,*';
	zoneNames: Array<string> = [];
	accountingPoint$: Observable<AccountingPointDetail>;
	calcMonth: Date = null;

	constructor(private route: ActivatedRoute, private storageService: DataStorageService, private routerExtensions: RouterExtensions, private httpService: MainHttpService) {

	}

	ngOnInit(): void {
		this.accountingPoint$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) =>
				this.httpService.getAccountingPoint(params.get('id')))
		);

		this.accountingPoint$.pipe(map(res => {
			res.meterReadings.forEach(m => m.period = new Date(m.period.toString()));
			return res;
		})).subscribe(ap => {
			this.storageService.saveAccountingPoint(ap);
			let currentPeriod = new Date(2020, 1, 28);
			let day = currentPeriod.getDate();
			if (day < 4) {
				currentPeriod.setTime(currentPeriod.getTime() - (day * 24 * 60 * 60 * 1000));
			}
			day = currentPeriod.getDate();

			currentPeriod = new Date(currentPeriod.getFullYear(), currentPeriod.getMonth(), 1);
			const existingMeterReading = ap.meterReadings.find(m => m.period.getMonth() == currentPeriod.getMonth() && m.period.getFullYear() == currentPeriod.getFullYear());
			if (!existingMeterReading && day >= 28) {
				this.calcMonth = currentPeriod;
			}

			for (let i = 1; i < ap.zoneCount; i++) {
				this.headerColumns += ',*';
			}
			this.headerColumns += ', auto';
			this.zoneNames = GetZoneNames(Number(ap.zoneCount))
		});
	}
	newMeterReading(id:string) {
		let meterReadingDate = new Date(this.calcMonth.getFullYear(), this.calcMonth.getMonth()+1, 1);
		this.routerExtensions.navigate([id, "new-meter-reading", meterReadingDate.toISOString()]);
	}

	getIconForStatus(status: number) {

		switch (status) {
			case 1:
				return {
					icon: String.fromCharCode(0xf059),
					class: 'far',
					color: 'gray'
				}

			case 2:
				return {
					icon: String.fromCharCode(0xf058),
					class: 'far',
					color: 'green'
				}

			default:
				return {
					icon: String.fromCharCode(0xf05e),
					class: 'fas',
					color: 'red'
				}
		}
	}
}