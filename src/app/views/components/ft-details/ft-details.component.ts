import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import local from 'src/app/utilities/constants/local';
import { AppService } from 'src/app/utilities/services/app.service';
import { DocsService } from 'src/app/utilities/services/docs.service';
import { LocalStorageService } from 'src/app/utilities/services/local-storage.service';

@Component({
    selector: "app-ft-details",
    templateUrl: "./ft-details.component.html",
    styleUrls: ["./ft-details.component.css"],
})
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class FtDetailsComponent implements OnInit {
    loading = true;
    @Input() id = null;
    @Input() ob = null;
    @Input() showFts = false;
    @Input() type = null;
    lang = local();

    constructor(
        private apps: AppService,
        public dc: DocsService,
        public lss: LocalStorageService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        
    }
}
