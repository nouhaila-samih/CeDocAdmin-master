import { AppService } from './../../../../utilities/services/app.service';
import local from 'src/app/utilities/constants/local';
import { Component, OnInit } from '@angular/core';
import { ListItem } from 'src/app/utilities/models';

@Component({
    selector: 'app-p-list-sps',
    templateUrl: './p-list-sps.component.html',
    styleUrls: ['./p-list-sps.component.css']
})
export class PListSpsComponent implements OnInit {

    lang = local();
    loading = true;
    sps: ListItem[] = [];
    selectedSps: ListItem[] = [];
    cedocs: ListItem[] = [];
    constructor(private as: AppService) { }

    ngOnInit(): void {
        this.as.getPedocData({cedocs:1}).subscribe(res => {
            this.cedocs = res.cedocs;
            console.log('data', res);

        });

        this.as.getSps().subscribe(res => {
            this.sps = res;
            this.loading = false;
            console.log('sps', res);

        });
    }

}
