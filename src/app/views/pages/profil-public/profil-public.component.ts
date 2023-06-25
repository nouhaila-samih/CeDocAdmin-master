import { User } from './../../../utilities/models/index';
import { Sujet } from 'src/app/utilities/models';
import { AppService } from 'src/app/utilities/services/app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import local from 'src/app/utilities/constants/local';

@Component({
    selector: 'app-profil-public',
    templateUrl: './profil-public.component.html',
    styleUrls: ['./profil-public.component.css']
})
export class ProfilPublicComponent implements OnInit {

    public user: User = {};
    public sujets: Sujet[] = [];
    public lang = local();
    public loading = true;
    constructor(private route: ActivatedRoute,private appService: AppService) { }

    ngOnInit(): void {
        this.appService.publicProfile(this.route.snapshot.params.id).subscribe(
            (res) => {
                this.user = res.user;
                this.sujets = res.sujets;
                this.loading = false;
            },
            (err) => {
                this.loading = false;

            }
        );
    }

}
