import {Component, OnInit} from '@angular/core';
import local from '../../../../utilities/constants/local';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';

import {ProductServiceP} from './productservice';
import {Formation, Requette, Session} from './formation';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FormationFilterComponent} from '../../../components/formation-filter/formation-filter.component';
import {ListItem} from '../../../../utilities/models';
import {Time} from '@angular/common';
import {ApiService} from '../../../../utilities/services/api.service';

@Component({
  selector: 'app-p-list-formations',
  templateUrl: './p-list-formations.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  styleUrls: ['./p-list-formations.component.css']
})
export class PListFormationsComponent implements OnInit {

    //----------------------------------------------------------------------------------------------
    constructor(
        private productService: ProductServiceP,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        public api : ApiService
        )
    {
        this.typesFormation = [
            {label:"Langue étrangère",          value:1},
            {label:"Soft skills",               value:2},
            {label:"Formation spécifique",      value:3},
            {label:"Formation transversale",    value:4},
            {label:"Manifestation scientifique",value:5}
        ];
        this.discipline = [
            {label:"Sciences et Techniques",                                          value:1},
            {label:"Sciences Économiques et de Gestion",                              value:2},
            {label:"Sciences Juridiques et Politiques",                               value:3},
            {label:"Langues, Dialogue Interculturel, Société, Histoire et Traduction",value:4}
        ]
        this.niveaux = [
            {label:"première année" ,value:1 },
            {label:"deuxième année" ,value:2 },
            {label:"troisième année",value:3 },
            {label:"quatrième année",value:4 },
            {label:"cinquième année",value:5 },
            {label:"sixième année"  ,value:6 },
        ]
        this.participation = [
            {label:"oui",value:"oui"},
            {label:"non",value:"non"}
        ];
        this.etat = [
            {label: 'TERMINÉE' ,value: 'TERMINÉE'},
            {label: 'PLANIFIER',value: 'PLANIFIER'},
            {label: 'ENCOURS'  ,value: 'ENCOURS'}
        ]
    }

    ngOnInit() {
        this.getFormation()
        this.cols = [
            { field: "titre", header: "titre" },
            { field: "formateur", header: "formateur" },
            { field: "category", header: "Category" },
            { field: "nombreHeures", header: "nombreHeures" },
            { field: "dateF_F", header: "dateF_F" },
            { field: "inventoryStatus", header: "inventoryStatus" },
            { field: "discipline", header: "discipline" },
            { field: "niveau", header: "niveau" },
            { field: "participation", header: "participation" }
        ];
        this.exportColumns = this.cols.map(col => ({
            title: col.header,
            dataKey: col.field
        }));
    }

//--------------------------------------------------------------------------------------------------------
    //category;
    //niv;
    selectedFormateur : number | string ;
    formateur:ListItem[];
    copydata
//-- Export --------------------------------------------------------------------------------------
    cols: any[];
    exportColumns: any[];
//-- Manipulation des session ----------------------------------------------------------------------------------------------
    session : Session;
    sessions : Session[];
    newSession=false
    ajouterSession() {
        this.session={}
        this.dateS=null
        this.heureD=null
        this.heureF=null
        this.selectedPres=""
        this.newSession=true
    }
    editSession(sess: Session) {
        this.session = {...sess}
        this.selectedPres = sess.mode
        this.dateS = new Date(this.reFormatDate(sess.date.toString()))//sess.dateS
        //console.log(typeof sess.heure_debut+ sess.heure_debut)
        this.heureD = new Date(sess.heure_debut)
        this.heureF = new Date(sess.heure_fin)
        this.newSession=true
    }
    saveSession(formation : Formation) {
        if(formation.id && this.session.id) {
            this.session.mode = this.selectedPres
            this.session.date = this.dateS //.toLocaleDateString()

            this.session.heure_debut = this.heureD.getHours()+":"+this.heureD.getMinutes()
            this.session.heure_fin =  this.heureF.getHours()+":"+this.heureF.getMinutes()

            let indexF = this.findIndexById(this.formation.id)
            this.sessions = this.formations[indexF].session_formations
            let indexS = this.findIndexByIdS(this.sessions,this.session.id)
            this.formations[indexF].session_formations[indexS]=this.session

            this.messageService.add({severity:'success', summary: 'réussi', detail: 'les information ', life: 3000});
        }
        else if(this.session.id) {
            this.session.mode = this.selectedPres
            this.session.date = this.dateS //.toLocaleDateString()

            this.session.heure_debut = this.heureD.getHours()+":"+this.heureD.getMinutes()
            this.session.heure_fin =  this.heureF.getHours()+":"+this.heureF.getMinutes()

            let index = this.findIndexByIdS(this.formation.session_formations,this.session.id)

            this.formation.session_formations[index]=this.session
        }
        else if(formation.id) {

            this.session.id = this.createId()
            this.session.mode = this.selectedPres
            this.session.date = this.dateS //.toLocaleDateString()

            this.session.heure_debut = this.heureD.getHours()+":"+this.heureD.getMinutes()
            this.session.heure_fin = this.heureF.getHours()+":"+this.heureF.getMinutes()

            this.formation.session_formations.push(this.session);

            this.messageService.add({severity:'success', summary: 'réussi', detail: 'Les informations sur la Session sont ajoutée', life: 3000});
        }
        else {
            this.session.id = this.createId()
            this.session.mode = this.selectedPres
            this.session.date = this.dateS //.toLocaleDateString()

            this.session.heure_debut = this.heureD.getHours()+":"+this.heureD.getMinutes()
            this.session.heure_fin = this.heureF.getHours()+":"+this.heureF.getMinutes()

            if(!Array.isArray(this.formation.session_formations))
                this.formation.session_formations=[]
            this.formation.session_formations.push(this.session);
            this.messageService.add({severity:'success', summary: 'réussi', detail: 'Les informations sur la Session sont ajoutée', life: 3000});
        }
        this.session={}
        this.newSession=false
    }
    deleteSession(sess: Session) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer la session ' + sess.intitule + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let indexF = this.findIndexById(this.formation.id)
                let indexS = this.findIndexByIdS(this.formation.session_formations,sess.id)
                if(indexF !== -1) {
                    this.formations[indexF].session_formations = this.formations[indexF].session_formations.filter(val => val.id !== sess.id)
                    this.formation.session_formations.splice(indexS,1)
                }
                else {
                    //let indexS = this.findIndexByIdS(this.formation.session,sess.id)
                    this.formation.session_formations.splice(indexS,1)
                }
                    //console.log(indexS)

                //this.session={}

                //this.formation={}
                this.messageService.add({severity:'success', summary: 'réussi', detail: 'Formation Supprimée', life: 3000});
            }
        });
    }
//------------------------------------------------------------------------------------------------
    lang = local();
//------------------------------------------------------------------------------------------------
    etat
    participation
//--------------------------------------------------------------------------------------------------
    selectedDis:string[]
    discipline :ListItem[]
//--------------------------------------------------------------------------------------------------
    selectedtype:string | number;
    typesFormation:ListItem[];
//---------------------------------------------------------------------------------------------------
    selectedNiv:string[]
    niveaux:ListItem[]
//---------------------------------------------------------------------------------------------------
    selectedPart:string;
    selectedPres:string;
//-----------------------------------------------------------------------------------------------------
    dateS:Date;
    heureD:Date;
    heureF:Date;
//-----------------------------------------------------------------------------------------------------
    dateDebut_F:Date;
    dateFin_F:Date
//------------------------------------------------------------------------------------------------------
    detailDialogue: boolean
    formationDialog: boolean;
    formations: Formation[];
    formation: Formation;
    selectedFormations: Formation[];
    submitted: boolean;
    header=""
    openNew() {
        this.getFormateur()
        this.header="Ajouter Formation"
        this.formation = {}
        this.selectedDis=[]
        this.selectedtype=""
        this.selectedNiv=[]
        this.selectedPart=""
        this.dateDebut_F=null
        this.dateFin_F=null
        this.submitted = false
        this.formationDialog = true
        this.selectedFormateur = ""

        //console.log(this.formateur);

    }
    deleteSelectedFormation() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les formations sélectionnés ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.formations = this.formations.filter(val => !this.selectedFormations.includes(val));
                this.selectedFormations = null;
                this.messageService.add({severity:'success', summary: 'réussi', detail: 'les formations sélectionnées sont supprimées', life: 3000});
            }
        });
    }
    editFormation(frmtn: Formation) {
        this.formation = {...frmtn};
        this.header="Modifier la Formation: "+frmtn.titre
        this.selectedtype = frmtn.type
        this.selectedDis = this.changeFormat(frmtn.discipline)
        this.selectedNiv = this.changeFormat(frmtn.niveau)
        this.selectedPart = frmtn.participation
        this.dateDebut_F = frmtn.date_debut
        this.dateFin_F = frmtn.date_fin
        this.formationDialog = true
    }
    changeFormat(tab : ListItem[]):string[] {
        let str:string[]=[]
        for(let item of tab) {
            str.push(item.label)
        }
        return str
    }
    deleteFormation(frmtn: Formation) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer la formation ' + frmtn.titre + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.formations = this.formations.filter(val => val.id !== frmtn.id);
                this.formation = {};
                this.messageService.add({severity:'success', summary: 'réussi', detail: 'Formation Supprimée', life: 3000});
            }
        });
    }
    hideDialog() {
        this.formationDialog = false;
        this.newSession=false
        this.submitted = false;
    }
    saveFormation() {
        this.submitted = true;

        if (this.formation.titre.trim()) {
            if (this.formation.id) {
                this.formation.discipline=this.selectedDis
                this.formation.type=this.selectedtype
                this.formation.niveau=this.selectedNiv
                this.formation.participation=this.selectedPart

                this.formation.date_debut=this.dateDebut_F
                this.formation.date_fin=this.dateFin_F
                //this.formation.etat= this.creatEtat(this.formation.date_debut,this.formation.date_fin)

                this.formations[this.findIndexById(this.formation.id)] = this.formation;
                this.messageService.add({severity:'success', summary: 'réussi', detail: 'Les informations sur la formation ont été mises à jour', life: 3000});
            }
            else {
                //this.formation.id = this.createId();
                //this.formation.code = this.createCode();
                this.formation.type = this.selectedtype
                this.formation.discipline=this.selectedDis
                this.formation.niveau=this.selectedNiv
                this.formation.participation = this.selectedPart
                this.formation.date_debut = this.dateDebut_F
                this.formation.date_fin = this.dateFin_F
                this.formation.formateur = this.selectedFormateur

                //this.formation.etat= this.creatEtat(this.formation.date_debut,this.formation.date_fin)

                this.sendFormation()
                //this.formation.image = 'product-placeholder.svg';
                //this.formations.push(this.formation);
                this.messageService.add({severity:'success', summary: 'réussi', detail: 'Les informations sur la formation ont été ajouter', life: 3000});
            }

            //this.formations = [...this.formations];
            this.formationDialog = false;
            //this.formation = {};
        }

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
    findIndexByIdS(sessi :Session[],id: number): number {
        let index = -1;
        for (let i = 0; i < sessi.length; i++) {
            if (sessi[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    reFormatDate(date : string):string {
        let splitDate = date.split("/")
        let permute=splitDate[0]
        splitDate[0]=splitDate[1]
        splitDate[1]=permute

        return(splitDate.join("/"))
    }
    createId(): number {
        let id ;
        let chars = '0123456789';
        for ( let i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    createCode(): string {
        let code="" ;
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0; i < 5; i++ ) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return(code);
    }
    creatEtat(dateD: Date , dateF:Date):string {

        if( ( new Date(this.reFormatDate(dateD.toString())) ).getTime() > (new Date()).getTime()) {
            return "PLANIFIER"
        }
        else if((new Date(this.reFormatDate(dateD.toString()))).getTime() <= (new Date()).getTime() && (new Date(this.reFormatDate(dateF.toString()))).getTime() > (new Date()).getTime() ) {
            return "ENCOURS"
        }
        else
            return"TERMINÉE"
    }
    showDetail(frmtn: Formation ) {
        this.formation = {...frmtn};
        this.detailDialogue=true ;
    }
//-- Filtre ---------------------------------------------------------------------------------------------------
    ref: DynamicDialogRef;
    query:Requette = {}


    filtrer() {
        this.ref = this.dialogService.open(FormationFilterComponent,{
            //data :{},
            header: this.lang.filter
        });
        this.ref.onClose.subscribe((query : Requette)=>{
            if(query) {
                this.query=query
                this.loadFormation();
            }
        });
    }

    loadFormation() {
        this.formations = this.copydata

        if(this.query.titre) {
            this.formations = this.formations.filter(item =>
                //item.titre.toLowerCase().startsWith(this.query.titre.toLowerCase()) ||
                //item.titre.toLowerCase().endsWith(this.query.titre.toLowerCase()) ||
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

    compare2(Formation :any[], Filtrage :any[]) {
        for(let For of Formation) {
            for(let Fil of Filtrage) {

                console.log("for",For.value,"fil",Fil.value)
                console.log(For.value==Fil.value)

                if(For.value==Fil.value) {
                    return true
                }
            }
        }
        return false
    }

//-- Envoyer ------------------------------------------------------------------------------------------------------
    sendFormation() {
        console.log(this.formation)
        this.api.sendF(this.formation).subscribe(res=>{
            console.log(res)
            this.getFormation()
            })
        this.getFormation()
    }

    getFormation() {
        this.productService.getFormation().then(data => {
            this.formations = data
            this.copydata = data
        });

    }

    getFormateur() {
        this.api.getFormateur().subscribe(res=>{
            this.formateur=res[0]
            console.log(this.formateur)
        })
    }



}
