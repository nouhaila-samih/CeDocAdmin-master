import {Component , OnInit} from '@angular/core';
import local from '../../../../utilities/constants/local';
import {Demande, Formation, Requette} from '../../pedoc/p-list-formations/formation';
import { ProductServiceP } from '../../pedoc/p-list-formations/productservice';
import { trigger,state,style,transition,animate } from '@angular/animations';
import {ConfirmationService, MessageService} from 'primeng/api';
import {findIndex} from 'rxjs/operators';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormationFilterComponent} from '../../../components/formation-filter/formation-filter.component';
import {ApiService} from '../../../../utilities/services/api.service';

@Component({
  selector: 'app-c-demandes-inscriptions',
  templateUrl: './c-demandes-inscriptions.component.html',
  styleUrls: ['./c-demandes-inscriptions.component.css'],
  animations: [
        trigger('rowExpansionTrigger', [
            state('void', style({
                transform: 'translateX(-10%)',
                opacity: 0
            })),
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ],
})
export class CDemandesInscriptionsComponent implements OnInit {

    constructor(
        private productService: ProductServiceP,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        public api : ApiService
    ) {
        this.stateOptions = [
            {label: 'Demandes', value: 'Demandes'},
            {label: 'Historique', value: 'Historique'},
        ];
    }

    ngOnInit() {
        //this.productService.getProducts().then(data => this.formations = data)
        //this.productService.getProducts().then(data => this.copydata = data);
        this.getFormation();
    }

    //----------------------------------------------------------------
    stateOptions: any[];
    value1: string = 'Demandes';
    //--------------------------------------------------------------
    lang = local();
    //---------------------------------------------------------------
    formations: Formation[];
    formation: Formation;
    //-------------------------------------------------------------------
    show: boolean = false
    //-------------------------------------------------------------------
    doctorant: any
    showdetail(doct:any) {
        this.doctorant = {...doct}
        this.show=true
    }
    //-------------------------------------------------------------------
    acceptetous(formation: Formation) {
        var index = this.findIndexById(formation.id)
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir accepter toutes les demandes de  ' + formation.titre + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.accepterToutes(formation.id)

                /*
                for (let i = 0; i < this.formations[index].demandes.length; i++) {
                    this.formations[index].demandes[i].etat = "ACCEPTÉE"
                }*/

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Toutes ces demandes ont été acceptées ',
                    life: 2000
                });
            }
        });
    }

    accepte(formation: Formation, demande: Demande) {

        var index = this.findIndexById(formation.id)
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir accepter la demande de mr' + demande.doctorant.nom_fr + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                let indexD = this.findIndexByIdD(formation.demandes, demande.id)

                this.gererDemande(demande.id,'acceptee')
                //this.formations[index].demandes[indexD].etat = "ACCEPTÉE"



                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Formation Deleted', life: 3000});
            }
        });
    }
    refuse(formation: Formation, demande: Demande) {
        var index = this.findIndexById(formation.id)
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir refuser la demande de mr ' + demande.doctorant.nom_fr + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let indexD = this.findIndexByIdD(formation.demandes, demande.id)
                this.gererDemande(demande.id,'refusee')
                //this.formations[index].demandes[indexD].etat = "REFUSÉE"
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Formation Deleted', life: 3000});
            }
        });
    }

    findIndexByIdD(dmnd: Demande[], id: number): number {
        let index = -1;

        if (dmnd) {
            for (let i = 0; i < dmnd.length; i++) {
                if (dmnd[i].id === id) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.formations.length; i++) {
            if (this.formations[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    pasDemandes(): boolean {
        if (this.formations) {
            let leng = this.formations.length
            for (let i = 0; i < leng; i++) {
                if (this.ilExisteDemandes(this.formations[i])) {
                    return false
                }
            }
            return true
        }
    }
    pasHistorique(){
        if (this.formations) {
            let leng = this.formations.length
            for (let i = 0; i < leng; i++) {
                if (this.ilExisteHistorique(this.formations[i])) {
                    return false
                }
            }
            return true
        }
    }
    ilExisteDemandes(formation: Formation): boolean {

        for (let demande of formation.demandes) {
            if (demande.etat === "demandee")
                return true
        }
        return false
    }
    ilExisteHistorique(formation : Formation) {
        for (let demande of formation.demandes) {
            if (demande.etat === "acceptee" || demande.etat === "refusee")
                return true
        }
        return false
    }

//---------------------------------------------------------------------
    ref: DynamicDialogRef;
    query:Requette = {}
    copydata

    filtrer() {
        this.ref = this.dialogService.open(FormationFilterComponent,{
            //data :{},
            header: this.lang.filter
        });
        this.ref.onClose.subscribe((query : Requette)=>{
            if(query) {
                this.query=query
                //console.log(this.query)
                this.loadFormation();
            }
        });
    }
    loadFormation() {
        this.formations = this.copydata

        if(this.query.titre) {
            this.formations = this.formations.filter(item =>
                item.titre.toLowerCase().startsWith(this.query.titre.toLowerCase()) ||
                item.titre.toLowerCase().endsWith(this.query.titre.toLowerCase()) ||
                item.titre.toLowerCase().includes(this.query.titre.toLowerCase())
            )
        }

        /*if(this.query.formateur) {
            this.formations = this.formations.filter(item =>
                item.formateur.toLowerCase().startsWith(this.query.formateur.toLowerCase()) ||
                item.formateur.toLowerCase().endsWith(this.query.formateur.toLowerCase()) ||
                item.formateur.toLowerCase().includes(this.query.formateur.toLowerCase())
            )
        }*/

        if(this.query.type) {
            this.formations = this.formations.filter(item => this.compare(this.query.type,item.type))
        }
        if(this.query.niveau) {
            this.formations = this.formations.filter(item => this.compare2(item.niveau,this.query.niveau))
        }
        if(this.query.discipline) {
            this.formations = this.formations.filter(item => this.compare2(item.discipline,this.query.discipline))
        }
        if(this.query.participation) {
            this.formations = this.formations.filter(item => item.participation === this.query.participation)
        }
    }
    compare(tab:string[] , type:string|number) : boolean{
        for(let itemFil of tab) {
            if(itemFil === type)
                return true
        }
        return false
    }
    compare2(tabFor:string[],tabFil:string[]) {
        for(let itemFor of tabFor) {
            for(let itemFil of tabFil) {
                if(itemFor===itemFil)
                    return true
            }
        }
        return false
    }
//----------------------------------------------------------------------------------------------------------------------------------
    disci(fd_id) {
        switch(fd_id) {
            case 1 : return "Sciences et Techniques" ;
            case 2 : return "Sciences Economiques et de Gestion" ;
            case 3 : return "Sciences Juridiques et Politiques";
            case 4 : return "Langues,  Dialogue Interculturel, Société, Histoire et Traduction";

        }
}

    getFormation() {
        this.productService.getFormation().then(data => this.formations = data);
    }
    gererDemande(id : number , etat:string) {
        this.api.gererD(id,etat).subscribe(res=>{
            this.getFormation()
            console.log(res)
        })
    }
    accepterToutes(id_formation:number) {
        console.log(id_formation)
        this.api.acceptTous(id_formation).subscribe(res=>{

            console.log(res)
            this.getFormation()

            })
    }

}
