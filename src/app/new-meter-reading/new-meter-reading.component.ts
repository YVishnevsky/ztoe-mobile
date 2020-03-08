import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../core/data-storage.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { GetZoneNames } from "../shared/utils";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
	selector: "MeterReading",
	moduleId: module.id,
	templateUrl: "./new-meter-reading.component.html",
	styleUrls: ['./new-meter-reading.component.css']
})
export class NewMeterReadingComponent implements OnInit {

	newMeterReadings: Array<number> = [];
	date: Date;
	accountingPoint: AccountingPoint;
	zoneNames: Array<string>

	constructor(private storageService: DataStorageService, private route: ActivatedRoute, private routerExtensions: RouterExtensions) {
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.date = new Date(params.get('date'));
			this.accountingPoint = this.storageService.getAccountingPoint(params.get('id'));
			this.zoneNames = GetZoneNames(this.accountingPoint.zoneCount)
			console.log(this.date);
		});
	}

	isFormFilled() {
		let result = true;
		for (let i = 0; i < this.zoneNames.length; i++) {
			result = (result && this.newMeterReadings[i] != null);
		}
		return result;
	}

	send()
	{
		console.log(this.newMeterReadings);
		this.routerExtensions.navigate(["/accounting-point-datail", this.accountingPoint.id], { clearHistory: true });
	}
}