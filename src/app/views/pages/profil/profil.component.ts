import { LocalStorageService } from './../../../utilities/services/local-storage.service';
import { AppService } from './../../../utilities/services/app.service';
import { environment } from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import local from 'src/app/utilities/constants/local';
import { MessageService } from 'primeng/api';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

    profileForm: FormGroup;
    passwordForm: FormGroup;
    photo = environment.loading_image_url;
    safePhoto = environment.loading_image_url;
    lang = local();
    loading = true;
    isUpdating = false;
    isChanging = false;
    isMobile = false;
    constructor(private messageService: MessageService, private deviceService: DeviceDetectorService
            ,   private appService: AppService, public lss: LocalStorageService) { }


    ngOnInit() {
        this.isMobile = this.deviceService.isMobile() || this.deviceService.isTablet() ;
        this.profileForm = new FormGroup({
            nom_fr: new FormControl(null, Validators.required),
            nom_ar: new FormControl(null, Validators.required),
            prenom_fr: new FormControl(null, Validators.required),
            prenom_ar: new FormControl(null, Validators.required),
            date_naissance: new FormControl(null, Validators.required),
            tel: new FormControl(null, Validators.required),
            cin: new FormControl(
                {value: null, disabled: true},
                Validators.required
            ),
            ppr: new FormControl(
                {value: null, disabled: true},
                Validators.required
            ),
            email_institu: new FormControl(
                {value: null, disabled: true},
                Validators.required
            ),
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ])
        });

        this.passwordForm = new FormGroup({
            current_password: new FormControl(null, Validators.required),
            new_password: new FormControl(null, Validators.required),
            new_password2: new FormControl(null, Validators.required)
        });

        this.appService.me().subscribe(
            (res) => {
                console.log(res);

                this.safePhoto = res.photo;
                this.photo = res.photo;
                this.profileForm.patchValue({nom_fr: res.nom_fr});
                this.profileForm.patchValue({nom_ar: res.nom_ar});
                this.profileForm.patchValue({prenom_fr: res.prenom_fr});
                this.profileForm.patchValue({prenom_ar: res.prenom_ar});
                this.profileForm.patchValue({
                    date_naissance: res.date_naissance
                });
                this.profileForm.patchValue({cin: res.cin});
                this.profileForm.patchValue({email: res.email});
                this.profileForm.patchValue({ppr: res.ppr});
                this.profileForm.patchValue({email_institu: res.email_institu});
                this.profileForm.patchValue({tel: res.tel});
                this.loading = false;
            },
            (err) => {
                console.log(err);
                this.loading = false;

                this.messageService.add({ detail: this.lang.v5, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

            }
        );

    }

    onPDPChanged(event) {
        this.photo = environment.loading_image_url;
        this.appService.changePDF(event.target.files[0]).subscribe(
            (res) => {
                console.log(res);
                this.lss.setPhoto(res.url);
                this.photo = res.url;
                this.safePhoto = res.url;
            },
            (err) => {
                console.log(err);
                this.messageService.add({ detail: this.lang.v5, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

                this.photo = this.safePhoto;
            }
        );
    }
    updateProfile(){
        this.isUpdating = true;
        if (this.profileForm.valid) {
            this.appService
                .updateProfile(
                    this.profileForm.value.nom_fr,
                    this.profileForm.value.nom_ar,
                    this.profileForm.value.prenom_fr,
                    this.profileForm.value.prenom_ar,
                    this.profileForm.value.date_naissance,
                    this.profileForm.value.tel,
                    this.profileForm.value.email,

                )
                .subscribe(
                    (res) => {
                        console.log(res);
                        this.lss.updateUserFullName(this.profileForm.value.nom_fr, this.profileForm.value.prenom_fr)
                        this.isUpdating = false;

                        this.messageService.add({ detail: res.message, life: 10000, key: 'toast',
                         severity: 'success', summary: 'Succès!' });

                    },
                    (err) => {
                        console.log(err);
                        this.isUpdating = false;
                        this.showErrorMessages(err);
                    }
                );
        } else {
            this.isUpdating= false;
            this.messageService.add({ detail: this.lang.v6, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

        }
    }
    changePassword() {
        this.isChanging = true;
        if (this.passwordForm.valid) {
            this.appService
                .changePassword(
                    this.passwordForm.value.current_password,
                    this.passwordForm.value.new_password,
                    this.passwordForm.value.new_password2
                )
                .subscribe(
                    (res) => {
                        console.log(res);
                        this.isChanging = false;

                        this.messageService.add({ detail: res.message, life: 10000, key: 'toast',
                         severity: 'success', summary: 'Succès!' });
                    },
                    (err) => {
                        console.log(err);
                        this.isChanging = false;

                        this.showErrorMessages(err);
                    }
                );
        } else {
            this.isChanging = false;
            this.messageService.add({ detail: this.lang.v6, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

        }
    }

    selectInput(event, input) {
        switch (input) {
            case 'prenom_ar':
                this.profileForm.value.prenom_ar = event.target.value;
                break;
            case 'nom_ar':
                this.profileForm.value.nom_ar = event.target.value;
                break;
        }
    }

    showErrorMessages(err){

        if (err.error.errors){
            for (const error in err.error.errors) {
                this.messageService.add({ detail: err.error.errors[error], life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
            }
            return;
        }
        if (err.error.message){
            this.messageService.add({ detail: err.error.message, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
            return;
        }
    }

}
