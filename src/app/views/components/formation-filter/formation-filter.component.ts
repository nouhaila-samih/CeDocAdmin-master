import {Component, OnInit, Output} from '@angular/core';
import local from '../../../utilities/constants/local';
import {ListItem} from '../../../utilities/models';
import {FormControl,FormGroup} from '@angular/forms';
import {Requette} from '../../pages/pedoc/p-list-formations/formation';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';


@Component({
  selector: 'app-formation-filter',
  templateUrl: './formation-filter.component.html',
  styleUrls: ['./formation-filter.component.css']
})
export class FormationFilterComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {

      this.type = [
          {label:"Langue étrangère",          value:"Langue étrangère"},
          {label:"Soft skills",               value:"Soft skills"},
          {label:"Formation spécifique",      value:"Formation spécifique"},
          {label:"Formation transversale",    value:"Formation transversale"},
          {label:"Manifestation scientifique",value:"Manifestation scientifique"}
      ];
      this.disci =[
          {value:1, label:'Sciences et Techniques'                                          },
          {value:2, label:'Sciences Économiques et de Gestion'                              },
          {value:3, label:'Sciences Juridiques et Politiques'                               },
          {value:4, label:'Langues, Dialogue Interculturel, Société, Histoire et Traduction'}
      ]
      this.niv =[
          {value:1, label:'première année' },
          {value:2, label:'deuxième année' },
          {value:3, label:'troisième année'},
          {value:4, label:'quatrième année'},
          {value:5, label:'cinquième année'},
          {value:6, label:'sixième année'  },
      ]
      this.etat = [
          {label: 'TERMINÉE' ,value: 'TERMINÉE'},
          {label: 'PLANIFIER',value: 'PLANIFIER'},
          {label: 'ENCOURS'  ,value: 'ENCOURS'}
      ]
      this.part = [
          {label:"Oui",value:"oui"},
          {label:"non",value:"non"}
      ];




      this.filterForm = new FormGroup({

          keyword_titre: new FormControl(null),
          keyword_formateur: new FormControl(null),
          disci: new FormControl(null),
          niv: new FormControl(null),
          type: new FormControl(null),
          part: new FormControl(null)
      });
  }

    lang = local();

    filterForm: FormGroup;
    disci :ListItem[] = []
    niv   :ListItem[] = []
    type  :ListItem[] = []
    etat  :ListItem[] = []
    part :any[]

    showDiscipline=true
    showNiveau=true
    showtype=true
    showPart=true

    query : Requette = {};


    filtrer() {

        if (this.filterForm.value.keyword_titre) {
            this.query.titre = this.filterForm.value.keyword_titre
        }

        if (this.filterForm.value.keyword_formateur) {
            this.query.formateur = this.filterForm.value.keyword_formateur
            //console.log(this.filterForm.value.keyword_formateur)
        }

        if (this.filterForm.value.part) {
             this.query.participation = this.filterForm.value.part
             //console.log(this.filterForm.value.part)
         }

        if (this.filterForm.value.disci) {
           for(let item of this.filterForm.value.disci) {
               if(!this.query.discipline)
                   this.query.discipline=[]
               this.query.discipline.push(item)
           }
           //console.log(this.query.discipline)
        }

        if(this.filterForm.value.niv) {
            for(let item of this.filterForm.value.niv) {
                if(!this.query.niveau)
                    this.query.niveau=[]
                this.query.niveau.push(item)
            }
        }
            //console.log(this.query.niveau)

        if (this.filterForm.value.type) {
            for(let item of this.filterForm.value.type) {
                if(!this.query.type)
                    this.query.type=[]
                this.query.type.push(item.value)
            }
        }
        this.ref.close(this.query);
    }

    claire(){
        this.ref.close({});
    }

}
