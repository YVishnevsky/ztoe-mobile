import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "pdf-view",
    templateUrl: "./pdf.view.component.html",
    styleUrls: ["./pdf.view.component.css"]
})
export class PdfViewComponent implements OnInit {

    pdfUrl: string;
    title: string;

    constructor(private route: ActivatedRoute, private routerExtensions: RouterExtensions) {

    }
    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.pdfUrl = params.get('url');
            this.title = this.pdfUrl.includes('/api/bills/') ? 'Рахунок' : 'Довідка';
        });
    }
}
