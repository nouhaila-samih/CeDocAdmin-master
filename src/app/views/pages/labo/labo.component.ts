import { AppService } from 'src/app/utilities/services/app.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import local from 'src/app/utilities/constants/local';

@Component({
  selector: 'app-labo',
  templateUrl: './labo.component.html',
  styleUrls: ['./labo.component.css']
})
export class LaboComponent implements OnInit {

    sujets: any[] = [];

     loading = true;
     laboName = '';
     nbr_doctorants = 0;
     nbr_soutenances = 0;
     nbr_sujets_affecte = 0;
     nbr_sujets_refuse = 0;
     nbr_sujets_nouveau = 0;
     nbr_sujets_accepte = 0;

     enseignants = [];
     lang = local();

  constructor(private messageService: MessageService,  private appService: AppService) { }

  ngOnInit(): void {

    this.appService.getFullLaboInfo().subscribe(
        (res) => {
           // console.log(res);

            this.laboName = res.designation_labo_fr
                ? res.designation_labo_fr
                : res.designation_labo_ar;
            this.enseignants = res.enseignants;
            this.sujets = res.sujets;
            this.nbr_soutenances = res.nbr_soutenances;
            this.nbr_doctorants = res.nbr_doctorants;
            this.nbr_sujets_affecte = res.nbr_sujets_affecte;
            this.nbr_sujets_refuse = res.nbr_sujets_refuse;
            this.nbr_sujets_nouveau = res.nbr_sujets_nouveau;
            this.nbr_sujets_accepte = res.nbr_sujets_accepte;

            this.loading = false;

        },
        (err) => {
            this.loading = false;
           // console.log(err);

           this.messageService.add({ detail: this.lang.v5, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

        }
    );
  }

  public getProfNameOfSujet(prof_id) {
    let name = '-';
    this.enseignants.forEach((prof) => {
        if (prof.id === prof_id) {
            name = prof.nom_fr + ' ' + prof.prenom_fr;
        }
    });
    return name;
}

}
