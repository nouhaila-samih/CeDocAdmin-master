import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import local from 'src/app/utilities/constants/local';
import { toFormData } from 'src/app/utilities/helpers';
import { ListItem } from 'src/app/utilities/models';
import { AppService } from 'src/app/utilities/services/app.service';
import { LocalStorageService } from 'src/app/utilities/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-full-doc-details',
  templateUrl: './full-doc-details.component.html',
  styleUrls: ['./full-doc-details.component.css']
})
export class FullDocDetailsComponent implements OnInit {

  loading = true;
  doc: any = {};
  lang = local();
  items: MenuItem[] = [];
  statutItems: MenuItem[] = [];
  inscStatutItems: MenuItem[] = [];
  reinscStatutItems: MenuItem[] = [];
  inscEtapetItems: MenuItem[] = [];
  bourseItems: MenuItem[] = [];
  editItems: MenuItem[] = [{label : 'modifier'}];


  msgConfirmation = this.lang.valide_confirmation_op;
  changeStatutLoading = false;
  showPiecesManquantes = true;
  confirm = false;
  actionType: string;
  dossierModal = false;
  fichesModal = false;
  statut: number;
  inscr_date: string = null;
  observation: string = null;
  dossierForm: FormGroup;
  admisForm: FormGroup;
  stateOptions: any[];
  ficher_inscri_url = environment.api_url + '/admin/doctorants/fiches/ficheInsc/';
  ficher_preinscri_url = environment.api_url + '/admin/doctorants/fiches/fichePreinsc/';
  ficher_depot_url = environment.api_url + '/admin/doctorants/fiches/ficheDepot/';
  atte_reinsc_url = environment.api_url + '/admin/doctorants/fiches/getAtteReinscr/';
  atte_insc_url = environment.api_url + '/admin/doctorants/fiches/getAtteInscr/';



  @Input() id = null;
  @Input() options: any = {};

  @Input() inscr_statuses: ListItem[] = [];
  @Input() statuses: ListItem[] = [];
  @Input() reinscr_statuses: ListItem[] = [];
  @Input() bourses: ListItem[] = [];

  @Input() showPersonal = true;
  @Input() showParcours = true;
  @Input() showReinsc = false;
  @Input() showAttestations = false;
  @Input() showMerite = false;
  @Input() showDossier = true;
  @Input() showObs = true;
  @Input() showOperations = true;
  @Input() showActions = false;
  @Input() showActionInscritStatut = false;
  @Input() showActionStatut = false;
  @Input() showActionReinscritStatut = false;
  @Input() showActionEtapes = false;
  @Input() showActionBourse = false;
  @Input() showNotePreselection = false;
  @Input() showNoteOral = false;
  @Input() showNoteBourse = false;
  @Input() showProdSci = false;
  @Input() showFts = false;
  @Input() showBourse = false;
  @Input() showSujet = true;
  @Input() showStatuts = true;

  @Input() actionLable = this.lang.t_dossier;
  @Input() actionInscritStatutLable = this.lang.t_insc_statut;
  @Input() actionStatutLable = this.lang.t_statut;
  @Input() actionReinsStatutLable = this.lang.t_statut_reinsc;
  @Input() actionEtapesLable = this.lang.t_insc_etape;
  @Input() actionBourseLable = this.lang.t_bourse;

  @Output() OnChange = new EventEmitter<any>();



  constructor(private apps: AppService,
    public lss: LocalStorageService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }


  ngOnInit(): void {

    this.apps.getFullDoc(this.id, 'cedoc').subscribe(
      res => {
        this.doc = res.data;
        this.loading = false;
        console.log(this.doc);

      },
      err => {
        this.loading = false;
        this.showErrorMessages(err);
        console.log(err);

      }
    );

    this.ficher_inscri_url += this.id + '?token=' + this.lss.getToken();
    this.ficher_preinscri_url += this.id + '?token=' + this.lss.getToken();
    this.ficher_depot_url += this.id + '?token=' + this.lss.getToken();
    this.atte_reinsc_url += this.id + '?token=' + this.lss.getToken();
    this.atte_insc_url += this.id + '?token=' + this.lss.getToken();
    this.stateOptions = [{ label: this.lang.doc_statut_dossier_nc, value: 'no' },
    { label: this.lang.doc_statut_dossier_c, value: 'yes' }];

    this.dossierForm = new FormGroup(
      {
        pieces_manquantes: new FormControl(null),
        etat_dossier: new FormControl({ label: null, value: null }, Validators.required),
      }
    );

    this.admisForm = new FormGroup(
      {
        observation: new FormControl(null),
        pieces_manquantes: new FormControl(null),
        etat_dossier: new FormControl({ label: null, value: null }, Validators.required),
      }
    );

    this.bourses.forEach(e => {
      this.bourseItems.push(
        {
          label: e.label, command: () => {
            this.changeBourse(e.value);
          }
        }
      );
    });

    this.statuses.forEach(e => {
      this.statutItems.push(
        {
          label: e.label, command: () => {
            this.changeStatut(e.value);
          }
        }
      );
    });

    this.inscr_statuses.forEach(e => {
      this.inscStatutItems.push(
        {
          label: e.label, command: () => {
            this.changeInscStatut(e.value);
          }
        }
      );
    });
     this.reinscStatutItems.push(
        {
          label: this.lang.reinitialiser, command: () => {
            this.changeReinscrStatut(0);
          }
        }
      );

    this.reinscr_statuses.forEach(e => {
      this.reinscStatutItems.push(
        {
          label: e.label, command: () => {
            this.changeReinscrStatut(e.value);
          }
        }
      );
    });


    for (let i = 1; i < 6; i++) {

      this.inscEtapetItems.push(
        {
          label: String(i), command: () => {
            this.changeEtape(i);
          }
        }
      );

    }

    this.items = [




      {
        label: this.lang.doc_statut_dossier, icon: 'pi pi-folder-open', command: () => {
          this.setDossier();
        }
      },
      {
        label: this.lang.retrait_inscr, icon: 'pi pi-file-pdf', command: () => {
          this.addRetrait('insc');
        }
      },

      {
        label: this.lang.retrait_reinscr, icon: 'pi pi-file-pdf', command: () => {
          this.addRetrait('reinsc');
        }
      },
      {
        label: this.lang.retrait_id, icon: 'pi pi-id-card', command: () => {
          this.addRetrait('id');
        }
      },
      {
        label: this.lang.doc_fiches, icon: 'pi pi-download', command: () => {
          this.fichesModal = true;
        }
      }
    ];

  }

  getReleveUrl(file) {
    return environment.app_url + '/public/doctorants/' + this.id
      + '/parcours/' + file;
  }

  setDossier() {
    this.dossierModal = true;
  }

  addDossier(choix: boolean) {
    if (!choix) {
      this.dossierModal = false;
      return;
    }
    this.changeStatutLoading = true;

    this.apps.addDossier(toFormData(this.dossierForm.value), this.id,
      'cedoc'
    ).subscribe(
      (res) => {
        this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
        this.changeStatutLoading = false;
        this.dossierModal = false;
        // console.log(this.doc);
        console.log(this.admisForm.value.etat_dossier);

        this.doc.etat_dossier = this.dossierForm.value.etat_dossier === 'yes' ? true : false;
        this.doc.dossiers = res.dossiers;
        this.OnChange.emit(this.doc);

      },
      (err) => {
        console.log(err);
        this.showErrorMessages(err);
        this.changeStatutLoading = false;

      });

  }

  setStatut(data) {

    this.changeStatutLoading = true;

    this.apps.setStatut(data,
      this.doc.id,
      this.statut,
      'cedoc'
    ).subscribe(
      (res) => {

        this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
        this.changeStatutLoading = false;
        this.confirm = false;
        this.doc.statut = this.statut;
        this.doc.inscr_statut = this.statut === 0 ? this.statut : this.doc.inscr_statut;
        this.OnChange.emit(this.doc);


      },
      (err) => {
        console.log(err);
        this.showErrorMessages(err);
        this.changeStatutLoading = false;

      });

  }
  setReinsStatut(data) {

    this.changeStatutLoading = true;

    this.apps.setReinsStatut(data,
      this.doc.id,
      this.statut,
      'cedoc'
    ).subscribe(
      (res) => {

        this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
        this.changeStatutLoading = false;
        this.confirm = false;
        this.doc.reinscr_statut = this.statut !== 0 ? this.statut : null;
        this.doc.reinscs = res.reinscs;
        this.OnChange.emit(this.doc);


      },
      (err) => {
        console.log(err);
        this.showErrorMessages(err);
        this.changeStatutLoading = false;

      });

  }

  setInscStatut(data) {

    this.changeStatutLoading = true;

    this.apps.setInscStatut(data,
      this.doc.id,
      this.statut,
      'cedoc'
    ).subscribe(
      (res) => {

        this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
        this.changeStatutLoading = false;
        this.confirm = false;
        this.doc.inscr_statut = this.statut;
        this.OnChange.emit(this.doc);


      },
      (err) => {
        console.log(err);
        this.showErrorMessages(err);
        this.changeStatutLoading = false;

      });

  }

  setInscEtape(data) {

    this.changeStatutLoading = true;

    this.apps.setInscEtape(data,
      this.doc.id,
      this.statut,
      'cedoc'
    ).subscribe(
      (res) => {

        this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
        this.changeStatutLoading = false;
        this.confirm = false;
        this.doc.inscr_etape = this.statut;
        this.OnChange.emit(this.doc);


      },
      (err) => {
        console.log(err);
        this.showErrorMessages(err);
        this.changeStatutLoading = false;

      });

  }
  setBourse(data) {

    this.changeStatutLoading = true;

    this.apps.setBourse(data,
      this.doc.id,
      this.statut,
      'cedoc'
    ).subscribe(
      (res) => {

        this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
        this.changeStatutLoading = false;
        this.confirm = false;
        this.OnChange.emit(this.doc = res);



      },
      (err) => {
        console.log(err);
        this.showErrorMessages(err);
        this.changeStatutLoading = false;

      });

  }

  setLog(data) {

    this.changeStatutLoading = true;

    this.apps.setLog(data,
      this.doc.id,
      this.statut,
      'cedoc'
    ).subscribe(
      (res) => {

        this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
        this.changeStatutLoading = false;
        this.confirm = false;

        this.OnChange.emit(this.doc = res);


      },
      (err) => {
        console.log(err);
        this.showErrorMessages(err);
        this.changeStatutLoading = false;

      });

  }

  changeBourse(statut) {

    this.statut = statut;
    this.actionType = 'Bourse';
    this.confirm = true;
  }

  changeEtape(statut) {

    this.statut = statut;
    this.actionType = 'Etape';
    this.confirm = true;
  }


  changeStatut(statut) {

    this.statut = statut;
    this.actionType = 'Statut';
    this.confirm = true;
  }
  changeReinscrStatut(statut) {

    this.statut = statut;
    this.actionType = 'ReinscStatut';
    this.confirm = true;
  }

  changeInscStatut(statut) {

    this.statut = statut;
    this.actionType = 'InscStatut';
    this.confirm = true;
  }
  addRetrait(statut) {

    this.statut = statut;
    this.actionType = 'Retrait';
    this.confirm = true;
  }


  OnAction(event) {

    if (!event.action) {
      this.confirm = false;
      return;
    }
    switch (this.actionType) {
      case 'Retrait':
        this.setLog({ observation: event.observation });

        break;
      case 'InscStatut':
        this.setInscStatut({ observation: event.observation });

        break;
      case 'Statut':
        this.setStatut({ observation: event.observation });

        break;
      case 'ReinscStatut':
        this.setReinsStatut({ observation: event.observation });

        break;
      case 'Etape':
        this.setInscEtape({ observation: event.observation });
        break;

      case 'Bourse':
        this.setBourse({ observation: event.observation });
        break;

      default:
        break;
    }


  }

  onChangeDossier(event) {
    this.showPiecesManquantes = event.value === 'no';

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
