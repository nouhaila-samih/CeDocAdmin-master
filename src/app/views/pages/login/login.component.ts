import { AppService } from './../../../utilities/services/app.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import local from 'src/app/utilities/constants/local';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    lang = local();
    isLoading = false;
    isResetLoading = false;
    isReset = false;
    resetEmail = null;
    loginForm: FormGroup;


    constructor(
        private messageService: MessageService,
        private appService: AppService,
        private router: Router) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            cin: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });

    }
    login() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.appService
                .login(this.loginForm.value.cin, this.loginForm.value.password)
                .subscribe(
                    (res) => {

                        console.log(res);

                        this.appService.loginUser(res);
                        this.isLoading = false;
                        this.router.navigate(['/']);
                    },
                    (err) => {
                        this.isLoading = false;
                        console.log(err);

                        this.messageService.add({ detail: this.lang.v2, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
                    }
                );
        } else {
            this.messageService.add({ detail: this.lang.v2, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

        }
    }

    resetPassword() {
        if (this.resetEmail !== null) {
            this.isResetLoading = true;
            this.appService
                .sendResetPasswordLink(this.resetEmail)
                .subscribe(
                    (res) => {
                        this.isResetLoading = false;
                        this.messageService.add({
                            detail: res.message,
                            life: 10000, key: 'toast',
                            severity: 'success', summary: 'Succès!'
                        });

                    },
                    (err) => {
                        this.isResetLoading = false;
                        console.log(err);

                        this.messageService.add({
                            detail: this.lang.valide_email,
                            life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!'
                        });
                    }
                );
        } else {
            this.messageService.add({ detail: this.lang.valide_email, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

        }
    }
}
