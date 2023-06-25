import { AppService } from 'src/app/utilities/services/app.service';
import { Component, OnInit } from '@angular/core';
import local from 'src/app/utilities/constants/local';

@Component({
    selector: 'app-fiche-encad',
    templateUrl: './fiche-encad.component.html',
    styleUrls: ['./fiche-encad.component.css']
})
export class FicheEncadComponent implements OnInit {
    lang = local();
    loading = true;
    data = {
        name: null,
        email: null,
        laboName: null,
        etabName: null,
        nbrTotalEnc: 0,
        nbrTotalCoEnc: 0,
        annee_universitaires: null,
        nbrTotal: 0
    }
    print() {
        window.print();
    }
    constructor(private appService: AppService) { }

    ngOnInit(): void {
        this.appService.ficheEncad().subscribe(res => {
            //console.log(res);
            this.data.name = res.enseignant.nom_fr + ' ' + res.enseignant.prenom_fr;
            this.data.email = res.enseignant.email;
            this.data.laboName = res.enseignant.labo.designation_labo_fr
                ? res.enseignant.labo.designation_labo_fr : res.enseignant.labo.designation_labo_ar;
            this.loading = false;
            this.data.annee_universitaires = res.annee_universitaires ;
            this.data.nbrTotalEnc = res.nbrTotalEnc ;
            this.data.nbrTotalCoEnc = res.nbrTotalCoEnc ;
            this.data.nbrTotal = res.nbrTotalCoEnc * 0.75 + res.nbrTotalEnc ;
            this.data.etabName = res.enseignant.etab.intitule_fr
                ? res.enseignant.etab.intitule_fr : res.enseignant.etab.intitule_ar;

            this.loading = false;



        }, err => {
            //console.log(err);
            this.loading = false;

        });
    }

}
