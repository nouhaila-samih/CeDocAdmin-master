import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import local from 'src/app/utilities/constants/local';
import { ListItem } from 'src/app/utilities/models';
import { AppService } from 'src/app/utilities/services/app.service';
import { LocalStorageService } from 'src/app/utilities/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-p-newboursier',
  templateUrl: './p-newboursier.component.html',
  styleUrls: ['./p-newboursier.component.css']
})
export class PNewboursierComponent implements OnInit {

  docs: any[] = [];
  lang = local();
  loading = true;
  decision: String;
  exporter: MenuItem[];
  executer: MenuItem[];

  changeStatutLoading = false;
  confirm = false;

  statuses: ListItem[];
  inscr_statuses: ListItem[];
  bourses: ListItem[];

  constructor(public dialogService: DialogService, private apps: AppService, private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private lss: LocalStorageService,

  ) { }


  ngOnInit(): void {
    this.exporter = [

      {
        label: this.lang.filter_par_etab,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/pedoc/bourses/exporteBoursiers/etab?token=' + this.lss.getToken()
      },
      {
        label: this.lang.filter_par_labo,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/pedoc/bourses/exporteBoursiers/labo?token=' + this.lss.getToken()
      },
      {
        label: this.lang.filter_par_fd,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/pedoc/bourses/exporteBoursiers/fd?token=' + this.lss.getToken()
      }, {
        label: this.lang.filter_par_cedoc,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/pedoc/bourses/exporteBoursiers/cedoc?token=' + this.lss.getToken()
      }, {
        label: this.lang.filter_par_pedoc,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/pedoc/bourses/exporteBoursiers/pedoc?token=' + this.lss.getToken()
      }, {
        label: this.lang.canevas,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/pedoc/bourses/exporteBoursiers/canevas?token=' + this.lss.getToken()
      }, /* {
        label: this.lang.filter_final,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/pedoc/bourses/exporteBoursiers/final?token=' + this.lss.getToken()
      },
 */
    ];

    this.executer = [

      {
        label: this.lang.filter_par_etab,
        icon: 'pi pi-caret-right',
        command: () => {
          this.executeDecision('etab');
        }
      },
      {
        label: this.lang.filter_par_labo,
        icon: 'pi pi-caret-right',
        command: () => {
          this.executeDecision('labo');
        }
      },
      {
        label: this.lang.filter_par_fd,
        icon: 'pi pi-caret-right',
        command: () => {
          this.executeDecision('fd');
        }
      }, {
        label: this.lang.filter_par_cedoc,
        icon: 'pi pi-caret-right',
        command: () => {
          this.executeDecision('cedoc');
        }
      }, {
        label: this.lang.filter_all,
        icon: 'pi pi-caret-right',
        command: () => {
          this.executeDecision('pedoc');
        }
      }, {
        label: this.lang.reinitialiser,
        icon: 'pi pi-replay',
        command: () => {
          this.executeDecision('reinitialiser');
        }
      },

    ];

    this.loadSujets();
  }


  executeDecision(decision){
    this.decision = decision;
    this.confirm = true;
  }

  OnAction(event) {
    if (!event.action) {
      this.confirm = false;
      return;
    }
    this.changeStatutLoading = true;

    this.apps.executeDecision({ observation: event.observation },
      this.decision
   
    ).subscribe(
      (res) => {
        console.log(res);
        
        this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
        this.changeStatutLoading = false;
        this.confirm = false;



      },
      (err) => {
        console.log(err);
        this.showErrorMessages(err);
        this.changeStatutLoading = false;

      });

  }


  loadSujets() {
    this.loading = true;

    this.apps.getNouveauBoursier('pedoc').subscribe(
      (res) => {

        //console.log(res);
        this.docs = res.docs;
        this.statuses = res.dataCollections.statuses;
        this.inscr_statuses = res.dataCollections.inscr_statuses;
        this.bourses = res.dataCollections.bourses;

        this.loading = false;
      },
      (err) => {
        console.log(err);

        this.loading = false;
      }
    );
  }



  showErrorMessages(err) {

    if (err.error.errors) {
      for (const error in err.error.errors) {
        this.messageService.add({ detail: err.error.errors[error], life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
      }
      return;
    }
    if (err.error.message) {
      this.messageService.add({ detail: err.error.message, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
      return;
    }
    this.messageService.add({ detail: this.lang.v5, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

  }

}
