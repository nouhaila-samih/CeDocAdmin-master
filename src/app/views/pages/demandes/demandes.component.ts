import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import local from 'src/app/utilities/constants/local';
import { Query } from 'src/app/utilities/models';
import { AppService } from 'src/app/utilities/services/app.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  obs: any[] = [];

  anneeUni = '';

  lang = local();
  loading = true;

  changeStatutLoading = false;
  observation: string;
  id: any;
  statut: number;
  msgConfirmation: string;
  total_records: number;
  per_page: number;
  query: Query = {};

  confirm = false;

  constructor(private router: Router,private messageService: MessageService,  private appService: AppService,
              private confirmationService: ConfirmationService,

      ) { }

  ngOnInit(): void {

      this.loadSujets();
     
  }


  changeStatut(sujet_id, statut) {

    console.log("hhhhh");
    
    this.id = sujet_id;
    this.statut = statut;
    this.confirm = true;
}


confirme(confirme) {
    if (!confirme) {
        this.refrecheChangeStatutData();
    }else {
        this.changeStatutLoading = true;
        this.appService.changeDemandeStatus(this.id, this.statut, this.observation, 'cedoc').subscribe(
            (res) => {
              console.log(res);
              
              this.total_records = res.total;
              this.per_page = res.per_page;
              this.obs = res.obs;

              this.loading = false;
              this.changeStatutLoading = false;

              this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
              this.refrecheChangeStatutData();


            },
            (err) => {
              console.log(err);
              this.changeStatutLoading = false;
              this.loading = false;
              this.messageService.add({ detail: this.lang.v5, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
              this.refrecheChangeStatutData();

            });

    }

}

refrecheChangeStatutData(){
    this.observation = null;
    this.id = null;
    this.statut = null;
    this.confirm = false;
}



search() {
  this.query.page = 1;
  this.loadSujets();
}

paginate(event) {
  this.query.page = (event.first / this.per_page) + 1;
  this.loadSujets();
}

  loadSujets() {
    this.loading = true;
      this.appService.getDemandes(this.query, 'cedoc').subscribe(
          (res) => {

              //this.sujets = res;
              console.log(res);
              this.total_records = res.total;
              this.per_page = res.per_page;
              this.obs = res.obs;
           

              this.loading = false;
          },
          (err) => {
              console.log(err);

               this.loading = false;
          }
      );
  }

}
