import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from 'src/app/utilities/services/app.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import local from '../../../utilities/constants/local';
import {ActivatedRoute, Router} from '@angular/router';
import {DocsService} from '../../../utilities/services/docs.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Doctorant, ListItem} from '../../../utilities/models';
import {stringListToItems, stringToItem, toFormData} from '../../../utilities/helpers';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-update-doc',
    templateUrl: './update-doc.component.html',
    styleUrls: ['./update-doc.component.css']
})
export class UpdateDocComponent implements OnInit {
    loading = true;
    isExternalCoEncad = false;
    isUpdating = false;
    submitted1 = false;
    profileForm: FormGroup;

    passwordForm: FormGroup;
    doc: Doctorant;
    photo = null;
    oldPdp = null;
    lang = local();

    @ViewChild('PDPInput')
    PDPInputVariable: ElementRef;





    maroc: ListItem = {value: 111, label: 'Maroc'};
    autre: ListItem = {value: 0, label: 'Autre'};


    situations: ListItem[] = [];
    genres: ListItem[] = [];
    villes: ListItem[] = [];
    pays: ListItem[] = [];
    sps: ListItem[] = [];
    cedocs: ListItem[] = [];
    fds: ListItem[] = [];
    labos: ListItem[] = [];
    profs: ListItem[] = [];
    etabs: ListItem[] = [];
    guests: ListItem[] = [];
    sujetData = {
        encad: null,
        coencad: null,
        excoencad: null,
        sujet: null,
        sps: null,
        fd: null,
        cedoc: null,
        labo: null,
        etab: null,
    };


    constructor(private apps: AppService,
                public dc: DocsService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private route: ActivatedRoute) {
        //   this.genres = [
        //     {genre: 'Homme', code: 'H'},
        //     {genre: 'Femme', code: 'F'},
        // ];
    }

    ngOnInit(): void {

        this.passwordForm = new FormGroup({
            new_password: new FormControl(null, Validators.required),
            new_password2: new FormControl(null, Validators.required)
        });

        this.profileForm = new FormGroup({

            email: new FormControl(null, Validators.required),
            cin: new FormControl( null, Validators.required),
            nom_fr: new FormControl(null, Validators.required),
            nom_ar: new FormControl(null, Validators.required),
            prenom_fr: new FormControl(null, Validators.required),
            prenom_ar: new FormControl(null, Validators.required),
            adresse_fr: new FormControl(null, Validators.required),
            adresse_ar: new FormControl(null, Validators.required),
            tel: new FormControl(null, Validators.required),
            ville: new FormControl(null, Validators.required),
            pays: new FormControl(null, Validators.required),
            situation_matrimonial: new FormControl(null, Validators.required),
            nationalite: new FormControl(Validators.required),
            autre_nationalite_fr: new FormControl(null),
            autre_nationalite_ar: new FormControl(null),
            date_naissance: new FormControl(null, Validators.required),
            genre: new FormControl(null, Validators.required),
            cne: new FormControl(null, Validators.required),
            autre_ville_fr: new FormControl(null),
            autre_ville_ar: new FormControl(null),
            autre_pays_fr: new FormControl(null),
            autre_pays_ar: new FormControl(null),
            ville_naissance: new FormControl(null, Validators.required),
            autre_lieu_naissance_fr: new FormControl(null),
            autre_lieu_naissance_ar: new FormControl(null),
            email_institu: new FormControl(null),
        });

        this.loadDoc();
    }

    updateProfile() {
        this.submitted1 = true;

        if (!this.profileForm.valid) {
            /*
                  const controls = this.profileForm.controls;
                  for (const name in controls) {
                      if (controls[name].invalid) {
                         console.log(name);
                      }
                  } */
            return;
        }
        this.isUpdating = true;

        this.dc.putProfile(toFormData(this.profileForm.value), this.doc.id).subscribe(
            res => {
                this.apps.showSuccessMessages(res.message, this.messageService);
                this.isUpdating = false;
                this.submitted1 = false;
            }, err => {
                console.log(err);
                this.apps.showErrorMessages(err, this.messageService);
                this.isUpdating = false;
            });
    }
    updatePwd() {
        this.submitted1 = true;

        if (!this.passwordForm.valid) {

            return;
        }
        this.isUpdating = true;

        this.dc.putPwd(toFormData(this.passwordForm.value), this.doc.id).subscribe(
            res => {
                this.apps.showSuccessMessages(res.message, this.messageService);
                this.isUpdating = false;
                this.submitted1 = false;
            }, err => {
                console.log(err);
                this.apps.showErrorMessages(err, this.messageService);
                this.isUpdating = false;
            });
    }

    onPDPChanged(event) {
        this.oldPdp = this.photo;
        this.photo = environment.loading_image_url;
        this.dc.changePDF(event.target.files[0], this.doc.id).subscribe(res => {


            this.photo = res.url;
            this.oldPdp = res.url;

        }, err => {
            this.apps.showErrorMessages(err, this.messageService);

            this.photo = this.oldPdp;

        }, () => {
            this.PDPInputVariable.nativeElement.value = '';
        });
    }

    isValideInput(input: any){
        return (input.dirty
            || input.touched
            || this.submitted1) && input.invalid
    }


    updateSujetProfile(type: string){

        this.confirmationService.confirm({
            message: this.lang.valide_confirmation_op,
            header: this.lang.valide_confirmation,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let data = null;
                switch (type) {

                    case 'encad':{
                        data = this.sujetData.encad.value;
                        break;
                    }
                    case 'coencad':{
                        data = this.sujetData.coencad.value;
                        break;
                    }
                    case 'excoencad':{
                        data = this.sujetData.excoencad.value;
                        break;
                    }
                    case 'sujet':{
                        data = this.sujetData.sujet;
                        break;
                    }

                    case 'sps':{
                        data = this.sujetData.sps.value;
                        break;
                    }
                    case 'fd':{
                        data = this.sujetData.fd.value;
                        break;
                    }
                    case 'labo':{
                        data = this.sujetData.labo.value;
                        break;
                    }
                    case 'cedoc':{
                        data = this.sujetData.cedoc.value;
                        break;
                    }
                    case 'etab':{
                        data = this.sujetData.etab.value;
                        break;
                    }

                }
                this.isUpdating = true;
                this.dc.putSujetProfile({data},this.doc.id, type).subscribe(
                    res => {
                        this.apps.showSuccessMessages(this.lang.suc, this.messageService);
                        this.isUpdating = false;
                        this.loadDoc();
                    }, err => {
                        console.log(err);
                        this.apps.showErrorMessages(err, this.messageService);
                        this.isUpdating = false;
                    });
                console.log(event);
            },
            reject: (type) => {

            }
        });




    }



    loadDoc() {
        this.isUpdating = true;
        this.dc.getDoc(this.route.snapshot.params.id,
            {
                villes: 1,
                pays: 1,
                genres: 1,
                situations: 1,
                sps: 1,
                fds: 1,
                profs: 1,
                cedocs: 1,
                labos: 1,
                etabs: 1,
            }
        ).subscribe(
            res => {
                this.doc = res.doc;
                console.log(res);
                this.photo = this.doc.photo;
                this.villes = res.dataCollections.villes;
                this.pays = res.dataCollections.pays;
                this.sps = res.dataCollections.sps;
                this.fds = res.dataCollections.fds;
                this.labos = res.dataCollections.labos;
                this.cedocs = res.dataCollections.cedocs;
                this.profs = res.dataCollections.profs;
                this.etabs = res.dataCollections.etabs;
                this.pays.push(this.autre);
                this.villes.push(this.autre);
                this.situations = stringListToItems(res.dataCollections.situations);
                this.genres = stringListToItems(res.dataCollections.genres);



                this.profileForm.patchValue({
                    nom_fr: this.doc.nom_fr,
                    nom_ar: this.doc.nom_ar,
                    prenom_fr: this.doc.prenom_fr,
                    prenom_ar: this.doc.prenom_ar,
                    cin: this.doc.cin,
                    email: this.doc.email,
                    email_institu: this.doc.email_institu,
                    cne: this.doc.massar_cne,
                    tel: this.doc.tel,

                    situation_matrimonial: stringToItem(this.doc.situation_matrimonial),
                    genre: stringToItem(this.doc.genre),
                    date_naissance: this.doc.date_naissance,
                    adresse_fr: this.doc.adresse_fr,
                    adresse_ar: this.doc.adresse_ar,

                    ville: this.doc.autre_ville_fr ? this.autre :
                        this.villes.some(ob => ob.value === this.doc.ville.id) ? this.villes.find(ob => ob.value === this.doc.ville.id)
                            : {value: null, label: null},


                    pays: this.doc.autre_pays_fr ? this.autre :
                        this.pays.some(ob => ob.value === this.doc.pays.id) ? this.pays.find(ob => ob.value === this.doc.pays.id)
                            : this.maroc,
                    nationalite: this.doc.autre_nationalite_fr ? this.autre :
                        this.pays.some(ob => ob.value === this.doc.nationalite.id) ? this.pays.find(ob => ob.value === this.doc.nationalite.id)
                            : this.maroc,
                    autre_nationalite_fr: this.doc.autre_nationalite_fr,
                    autre_nationalite_ar: this.doc.autre_nationalite_ar,

                    autre_ville_fr: this.doc.autre_ville_fr,
                    autre_ville_ar: this.doc.autre_ville_ar,
                    autre_pays_fr: this.doc.autre_pays_fr,
                    autre_pays_ar: this.doc.autre_pays_ar,
                    ville_naissance: this.doc.autre_lieu_naissance_fr ? this.autre :
                        this.villes.some(ob => ob.value === this.doc.ville_naissance.id) ?
                            this.villes.find(ob => ob.value === this.doc.ville_naissance.id) : {value: null, label: null},
                    autre_lieu_naissance_fr: this.doc.autre_lieu_naissance_fr,
                    autre_lieu_naissance_ar: this.doc.autre_lieu_naissance_ar,


                });

                this.sujetData = {
                    sujet: this.doc.sujet.intitule_fr,
                    sps: this.doc.sujet.specialite ? this.sps.find(e => this.doc.sujet.specialite.id === e.value) : null,
                    fd: this.doc.fd ? this.fds.find(e => this.doc.fd.id === e.value) : null,
                    cedoc:  this.doc.cedoc ? this.cedocs.find(e => this.doc.cedoc.id === e.value) : null,
                    labo:  this.doc.labo ? this.labos.find(e => this.doc.labo.id === e.value) : null,
                    etab:  this.doc.etab ? this.etabs.find(e => this.doc.etab.id === e.value) : null,
                    encad:  this.doc.sujet.directeur ? this.profs.find(e => this.doc.sujet.directeur.id === e.value) : null,
                    coencad: this.doc.sujet.codirecteur && this.doc.sujet.codirecteur_type === 'App\\Models\\User' ?
                        this.profs.find(e => this.doc.sujet.codirecteur.id === e.value) : null
                    ,
                    excoencad:  this.doc.sujet.codirecteur && this.doc.sujet.codirecteur_type !== 'App\\Models\\User' ?
                        {value:this.doc.sujet.codirecteur.id , label: this.doc.sujet.codirecteur.nom_fr + ' '  + this.doc.sujet.codirecteur.prenom_fr } : null
                    ,
                }
                if (this.doc.sujet.codirecteur && this.doc.sujet.codirecteur_type !== 'App\\Models\\User')
                    this.isExternalCoEncad = true;

                this.loading = false;


            },
            err => {
                this.loading = false;
                this.apps.showErrorMessages(err, this.messageService);


            }, ()=> {
                this.isUpdating = false;
            }
        );

    }


    search(event, choix) {

        if (choix === 'guests') {

            if (event.query.length < 2) {
                return;
            }
            this.apps.findGuests(event.query).subscribe(res => {
                if (!res.guests || res.guests.length < 1) { this.guests = [];  return; }
                this.guests = res.guests?.map(e => {
                    return {
                        value: e.value,
                        label: '[ CED-' + e.value + ' ] ' + e.label,
                    };
                });

            });
            return;
        }



    }
}
