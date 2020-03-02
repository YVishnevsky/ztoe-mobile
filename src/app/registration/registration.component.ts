import { Component, OnInit } from "@angular/core";
import { alert } from "tns-core-modules/ui/dialogs";
import { MainHttpService } from "../core/main-http.service";
import { NewRegistrationService } from "../core/new-registration.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "registration",
    
    templateUrl: "./registration.component.html",
    styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {

    isBusy: boolean = false;
    showCancel: boolean = false;
    accountingPointName: string = "06-5-258/101";
    ownerLastName: string = "Яремчук";
   
    constructor(private httpService: MainHttpService, private regService: NewRegistrationService, private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {
    }

    isFormFilled() {
        return this.ownerLastName.length > 2 && this.accountingPointName.length > 7 && !this.isBusy;
    }

    signUp() {
        
        if (this.isFormFilled()) {
            this.isBusy = true;
            this.httpService.register(this.accountingPointName, this.ownerLastName).subscribe(data => {
                console.log(data.name);
                
                this.regService.setData(data);
                this.isBusy = false;
                this.routerExtensions.navigate(["/confirm-registration"]);
            }, (error) => {
                console.log(error);
                this.isBusy = false;
                let options = {
                    title: "Помилка",
                    message: "Не вдалося знайти точку обліку. Перевірте дані та спробуйте знову",
                    okButtonText: "Закрити"
                };
                alert(options);
            });
        }
    }
}
