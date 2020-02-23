import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "accounting-point-detail",
	moduleId: module.id,
	templateUrl: "./accounting-point-detail.component.html",
	styleUrls: ['./accounting-point-detail.component.css']
})
export class AccountingPointDetailComponent implements OnInit {

	@Input()
	accountingPoint: AccountingPoint;

	constructor(private route: ActivatedRoute,) {
		
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			console.log(params.get('id'));
		  });
	}
}