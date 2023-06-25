import { environment } from "src/environments/environment";
import { Component } from "@angular/core";

@Component({
    selector: "app-footer",
    template: `
        <div class="layout-footer">
            <span class="footer-text-left">
                <strong
                    >Copyright &copy; 2020-{{ year }}
                    <a href="http://www.uh1.ac.ma">UH1-CEDOC</a>.</strong
                >
                All rights reserved.
            </span>
            <span style="float: right;"> <strong>{{a}}</strong> <a target="_blank" href="{{c}}"> {{b}}. </a> Version : {{version}}</span>
        </div>

    `,
})
export class AppFooterComponent {
    public year = new Date().getFullYear();
    public version = environment.version;


    a = atob(environment.api_key);
    b = atob(environment.api_token);
    c = atob(environment.api_secret);

}
