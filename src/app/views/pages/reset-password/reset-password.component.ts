import { AppService } from 'src/app/utilities/services/app.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import local from 'src/app/utilities/constants/local';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    lang = local();
    isLoading = false;
    isConnexion = false;

    resetForm: FormGroup;


    constructor(
        private messageService: MessageService,
        private appService: AppService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.resetForm = new FormGroup({
            password: new FormControl(null, Validators.required),
            password_confirmation: new FormControl(null, Validators.required),
            passwordToken: new FormControl(null, Validators.required),
        });

        this.route.queryParams.subscribe((params) => {
            console.log(params.token);

            this.resetForm.patchValue({passwordToken: params.token});

          })

    }
    resetPass() {
        if (this.resetForm.valid) {
            this.isLoading = true;
            this.appService
                .passwordResetProcess(this.resetForm.value)
                .subscribe(
                    (res) => {

                        this.isLoading = false;
                        this.isConnexion = true;

                        this.messageService.add({ detail: res.message, life: 10000, key: 'toast',
                        severity: 'success', summary: 'Succès!' });
                    },
                    (err) => {
                        this.isLoading = false;
                        console.log(err);

                        this.messageService.add({ detail: this.lang.v6, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
                    }
                );
        } else {
            this.messageService.add({ detail: this.lang.v6, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

        }
    }


}
