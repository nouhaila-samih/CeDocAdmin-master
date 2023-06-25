import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppService} from '../../../utilities/services/app.service';
import {DocsService} from '../../../utilities/services/docs.service';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {EnseignantsService} from '../../../utilities/services/enseignants.service';
import {ListItem, User} from '../../../utilities/models';
import local from '../../../utilities/constants/local';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {stringListToItems, stringToItem, toFormData} from '../../../utilities/helpers';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-full-ens-details',
    templateUrl: './full-ens-details.component.html',
    styleUrls: ['./full-ens-details.component.css']
})
export class FullEnsDetailsComponent implements OnInit {


    loading = true;
    isUpdating = false;
    submitted = false;
    ens: User = {};
    photo = null;
    oldPdp = null;
    lang = local();
    isAdminPedoc = false;

    profileForm: FormGroup;
    profileDocForm: FormGroup;
    passwordForm: FormGroup;

    @Input() id = null;
    @Input() cedocs: ListItem[] = [];
    @Input() fds: ListItem[] = [];
    @Input() labos: ListItem[] = [];
    @Input() etabs: ListItem[] = [];
    sps: ListItem[] = [];
    @Output() OnChange = new EventEmitter<any>();
    @ViewChild('PDPInput')
    PDPInputVariable: ElementRef;
    grades: ListItem[] = [];
    genres: ListItem[] = [];
    sujetData = {
        sps: [],
        nbr_sujets: null,
        fd: null,
        cedoc: null,
        labo: null,
        etab: null,
    };

    constructor(private apps: AppService,
                public es: EnseignantsService,
                public lss: LocalStorageService,
                private confirmationService: ConfirmationService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.isAdminPedoc = this.lss.isPedocAdmin();
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
            tel: new FormControl(null, Validators.required),
            date_naissance: new FormControl(null, Validators.required),
            genre: new FormControl(null, Validators.required),
            enseignant_grade: new FormControl(null, Validators.required),
            ppr: new FormControl(null, Validators.required),
            email_institu: new FormControl(null),
        });


        this.loadEns();

    }

    updatePwd() {
        this.submitted = true;

        if (!this.passwordForm.valid) {

            return;
        }
        this.isUpdating = true;

        this.es.putPwd(toFormData(this.passwordForm.value), this.ens.id).subscribe(
            res => {
                this.apps.showSuccessMessages(res.message, this.messageService);
                this.isUpdating = false;
                this.submitted = false;
            }, err => {
                console.log(err);
                this.apps.showErrorMessages(err, this.messageService);
                this.isUpdating = false;
            });
    }

    onPDPChanged(event) {
        this.oldPdp = this.photo;
        this.photo = environment.loading_image_url;
        this.es.changePDP(event.target.files[0], this.ens.id).subscribe(res => {

            console.log(res);
            this.photo = res.url;
            this.oldPdp = res.url;

        }, err => {
            console.log(err);
            this.apps.showErrorMessages(err, this.messageService);

            this.photo = this.oldPdp;

        }, () => {
            this.PDPInputVariable.nativeElement.value = '';
        });
    }

    isValideInput(input: any){
        return (input.dirty
            || input.touched
            || this.submitted) && input.invalid
    }

    updateProfile(){
        this.submitted = true;

        if (!this.profileForm.valid) {

            return;
        }
        this.isUpdating = true;

        this.es.putProfile(toFormData(this.profileForm.value), this.ens.id).subscribe(
            res => {
                this.apps.showSuccessMessages(res.message, this.messageService);
                this.isUpdating = false;
                this.submitted = false;
            }, err => {
                console.log(err);
                this.apps.showErrorMessages(err, this.messageService);
                this.isUpdating = false;
            });
    }

    updateSujetProfile(type){
        this.confirmationService.confirm({
            message: this.lang.valide_confirmation_op,
            header: this.lang.valide_confirmation,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let data = null;
                switch (type) {


                    case 'sps':{
                        data = this.sujetData.sps.map(e=>e.value);
                        break;
                    }
                    case 'nbr_sujets':{
                        data = this.sujetData.nbr_sujets;
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
                this.es.putSujetProfile({data},this.ens.id, type).subscribe(
                    res => {
                        this.apps.showSuccessMessages(this.lang.suc, this.messageService);
                        this.isUpdating = false;
                        this.OnChange.emit(res.item);
                    }, err => {
                        console.log(err);
                        this.apps.showErrorMessages(err, this.messageService);
                        this.isUpdating = false;
                    });

            },
            reject: (type) => {

            }
        });
    }

    loadEns(){
        this.loading = true;
        this.es.getEns(this.id,
            {
                genres: 1,
                sps: 1,
                enseignant_grades: 1,

            }).subscribe(res =>{
            console.log(res);
            this.ens = res.item;
            this.sps = res.dataCollections.sps;
            this.photo = this.ens.photo;

            this.genres = stringListToItems(res.dataCollections.genres);
            this.grades = stringListToItems(res.dataCollections.enseignant_grades);

            this.profileForm.patchValue({
                nom_fr: this.ens.nom_fr,
                nom_ar: this.ens.nom_ar,
                prenom_fr: this.ens.prenom_fr,
                prenom_ar: this.ens.prenom_ar,
                cin: this.ens.cin,
                email: this.ens.email,
                email_institu: this.ens.email_institu,
                tel: this.ens.tel,
                ppr: this.ens.ppr,
                genre: stringToItem(this.ens.genre ?? 'M'),
                enseignant_grade: stringToItem(this.ens.enseignant_grade),
                date_naissance: this.ens.date_naissance,
            });
            if (this.isAdminPedoc)
            this.sujetData = {
                sps: [],
                nbr_sujets: this.ens.enseignant_nbr_sujets,
                fd: this.ens.fd ? this.fds.find(e => this.ens.fd.id === e.value) : null,
                cedoc:  this.ens.cedoc ? this.cedocs.find(e => this.ens.cedoc.id === e.value) : null,
                labo:  this.ens.labo ? this.labos.find(e => this.ens.labo.id === e.value) : null,
                etab:  this.ens.etab ? this.etabs.find(e => this.ens.etab.id === e.value) : null,

            }
            this.ens.specialites.forEach(e => {
                this.sujetData.sps.push(this.sps.find( i=>i.value=== e.id));
            })

            this.loading = false;
        }, err => {
            this.apps.showErrorMessages(err, this.messageService);
            this.loading = false;
        });
    }

}
