import { Component, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import local from 'src/app/utilities/constants/local';
import { ListItem } from 'src/app/utilities/models';
import { AppService } from 'src/app/utilities/services/app.service';
import { LocalStorageService } from 'src/app/utilities/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-c-newboursier',
  templateUrl: './c-newboursier.component.html',
  styleUrls: ['./c-newboursier.component.css']
})
export class CNewboursierComponent implements OnInit {

  docs: any[] = [];
  lang = local();
  loading = true;
  decision: String;
  exporter: MenuItem[];


  bourses: ListItem[];

  constructor(public dialogService: DialogService, private apps: AppService, private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private lss: LocalStorageService,

  ) { }


  ngOnInit(): void {
    this.exporter = [

    /*   {
        label: this.lang.filter_par_etab,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/bourses/exporteBoursiers/etab?token=' + this.lss.getToken()
      },
      {
        label: this.lang.filter_par_labo,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/bourses/exporteBoursiers/labo?token=' + this.lss.getToken()
      },
      {
        label: this.lang.filter_par_fd,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/bourses/exporteBoursiers/fd?token=' + this.lss.getToken()
      }, 
       {
        label: this.lang.filter_par_cedoc,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/bourses/exporteBoursiers/cedoc?token=' + this.lss.getToken()
      }, */ {
        label: this.lang.canevas,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/bourses/exporteBoursiers/canevas?token=' + this.lss.getToken()
      },

    ];



    this.loadSujets();
  }






  loadSujets() {
    this.loading = true;

    this.apps.getNouveauBoursier('cedoc').subscribe(
      (res) => {

        //console.log(res);
        this.docs = res.docs;

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
