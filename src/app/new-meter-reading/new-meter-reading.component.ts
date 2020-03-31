import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../core/data-storage.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { GetZoneNames } from "../shared/utils";
import { RouterExtensions } from "nativescript-angular/router";
import * as flashlight from "nativescript-flashlight";
import { Vibrate } from 'nativescript-vibrate';
import { isAndroid } from "tns-core-modules/platform";
import { MainHttpService } from "../core/main-http.service";

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
	intensity: number = 0;
	flashlightIsOn: boolean = false;
	flashlight: any;

	constructor(private httpService: MainHttpService, private storageService: DataStorageService, private route: ActivatedRoute, private routerExtensions: RouterExtensions) {
		this.flashlight = flashlight;
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

	flashLightTap() {
		const v = new Vibrate()
		if (isAndroid) v.vibrate(30);
		flashlight.toggle();
		v.vibrate(15);
	}

	send() {
		const meterReading: CustomerMeterReading = {
			date: this.date,
			t1Value: this.newMeterReadings[0],
			t2Value: this.zoneNames.length > 1 ? this.newMeterReadings[1] : null,
			t3Value: this.zoneNames.length > 2 ? this.newMeterReadings[2] : null,
		}
		console.log(meterReading);
		this.httpService.sendMeterReading(this.accountingPoint.id, meterReading).subscribe(() => {
			this.routerExtensions.navigate(["/accounting-point-datail", this.accountingPoint.id], { clearHistory: true });
		});
	}
}