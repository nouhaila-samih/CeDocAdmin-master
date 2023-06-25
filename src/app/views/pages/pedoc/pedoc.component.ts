import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/utilities/services/app.service';
import local from 'src/app/utilities/constants/local';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pedoc',
    templateUrl: './pedoc.component.html',
    styleUrls: ['./pedoc.component.css']
})
export class PedocComponent implements OnInit {

    isLoading = true;
    nbr_profs = 0;
    nbr_sujets = 0;
    nbr_docs = 0;
    nbr_stns = 0;
    nbr_labos = 0;
    nbr_cedocs = 0;
    lang = local();

    sujetsData: any;
    prodData: any;
    docsAbnStnData: any;
    docsInscReinData: any;
    start_year = 0;
    years = [];

    constructor(private messageService: MessageService, private appService: AppService) { }

    ngOnInit(): void {
        this.start_year = (new Date()).getFullYear() - environment.history_years ;
        for(let i = this.start_year; i <= (new Date()).getFullYear() ; i++){
            this.years.push(i);
        }
        this.appService.getPedocDashData().subscribe(
            res => {
                console.log(res);

                this.nbr_profs = res.nbr_profs;
                this.nbr_sujets = res.nbr_sujets_reject + res.nbr_sujets_new + res.nbr_sujets_accepted +
                    res.nbr_sujets_affected + res.nbr_sujets_finished
                    + res.nbr_sujets_exceed;
                this.nbr_stns = res.nbr_stns;
                this.nbr_docs = res.nbr_docs;
                this.nbr_labos = res.nbr_labos;
                this.nbr_cedocs = res.nbr_cedocs;

                this.sujetsData = {
                    labels: ['Refusé', 'Nouveau', 'Validé', 'Affecté', 'Soutenu', 'Abandonné'],
                    datasets: [
                        {
                            data: [res.nbr_sujets_reject, res.nbr_sujets_new, res.nbr_sujets_accepted,
                            res.nbr_sujets_affected, res.nbr_sujets_finished
                                , res.nbr_sujets_exceed],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(170, 50, 1)',
                                    'rgb(235, 162, 54)',
                                ]

                        }]
                };
                this.prodData = {
                    labels:  this.years,
                    datasets: [
                        {
                            label: this.lang.articles,
                            data: this.getProdData(res.prod.articles),
                            fill: false,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)'
                        },
                        {
                            label: this.lang.coms,

                            data: this.getProdData(res.prod.coms),
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgb(75, 192, 192)'
                        }
                        ,
                        {
                            label: this.lang.brevets,
                            data: this.getProdData(res.prod.brevets),
                            fill: false,
                            backgroundColor: 'rgb(20, 162, 33)',
                            borderColor: 'rgb(20, 162, 33)'
                        }
                    ]
                };


                this.docsAbnStnData = {
                    labels:  this.years,
                    datasets: [
                        {
                            label: this.lang.abandonnes,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: this.getProdData(res.docs.abad)
                        },
                        {
                            label: this.lang.soutenu,
                            backgroundColor: 'rgb(54, 162, 235)',
                            borderColor: 'rgb(54, 162, 235)',
                            data: this.getProdData(res.docs.stn)
                        }
                    ]
                };
                this.docsInscReinData = {
                    labels:  this.years,
                    datasets: [
                        {
                            label:  this.lang.inscrits,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: this.getProdData(res.docs.insc)
                        },
                        {
                            label: this.lang.reinscrit,
                            backgroundColor: 'rgb(54, 162, 235)',
                            borderColor: 'rgb(54, 162, 235)',
                            data: this.getProdData(res.docs.reinsc)
                        }
                    ]
                };

                this.isLoading = false;

            },
            err => {
                console.log(err);

                this.isLoading = false;
                this.messageService.add({ detail: this.lang.err, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

            });
    }

    getProdData(ob : any){
        const data = [];
        for(let i = this.start_year; i <= (new Date()).getFullYear() ; i++){
            data.push(ob[i]);
        }


        return data;
    }

}
