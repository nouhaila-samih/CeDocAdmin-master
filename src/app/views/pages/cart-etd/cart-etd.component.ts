import { Component, OnInit } from '@angular/core';
import local from 'src/app/utilities/constants/local';
import { AppService } from 'src/app/utilities/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-cart-etd',
  templateUrl: './cart-etd.component.html',
  styleUrls: ['./cart-etd.component.css']
})
export class CartEtdComponent implements OnInit {
  idInfos :any;
  default_img = "http://127.0.0.1:8000/photos/img_264570.png";
  photo = "";
  lange='fr';
  fr=false;
  nom = 'NOM';
  prenom = 'PRENOM';
  anne = 'PREMIERE INSCRIPTION';
  cin = "CIN";
  cne = "CNE";
  qrcode= 'uh1';
  

  lang = local();
  doc: any = {};
  loading = true;
  constructor(private apps: AppService, private route: ActivatedRoute) { }

  cardForm = new FormGroup({
    nom: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
    ]),
    prenom: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
      //Validators.maxLength(16),
    ]),
    cin: new FormControl('',[
      Validators.required,
    ]),
    cne: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      //Validators.maxLength(3),
    ]),
    annee_universitaire: new FormControl('',[
      Validators.required,
    ]),
    photo: new FormControl('',[
      Validators.required,
    ]),
    labo: new FormControl('',[
      Validators.required,
    ]),
    cedoc: new FormControl('',[
      Validators.required,
    ]),
    etab: new FormControl('',[
      Validators.required,
    ]),
    fd: new FormControl('',[
      Validators.required,
    ]),
  });

  onRadioChange(){
    this.fr=!this.fr;
    console.log(this.lange);
    if(this.lange === 'fr'){
      this.nom = 'NOM';
      this.prenom = 'PRENOM';
      this.cin = 'CIN';
      this.cne = 'CNE';
      this.anne = 'PREMIERE INSCRIPTION';
      console.log(this.doc['nom_fr']);
      this.cardForm.patchValue({
        nom : this.doc['nom_fr']
      });
      this.cardForm.patchValue({
        prenom : this.doc['prenom_fr']
      });
      this.cardForm.patchValue({
        labo : this.doc['labo']['designation_labo_fr']
      });
      this.cardForm.patchValue({
        cedoc : this.doc['cedoc']['intitule_fr']
      });
      this.cardForm.patchValue({
        etab : this.doc['etab']['intitule_fr']
      });
      this.cardForm.patchValue({
        fd : this.doc['fd']['intitule_formation_fr']
      });
    }

    if(this.lange === 'ar'){
      this.nom = 'النسب';
      this.prenom = 'الإسم';
      this.cin = 'ر.ب.و';
      this.cne = 'ر.ط.و';
      this.anne = 'السنة الأولى لإلتحاق الطالب';
      console.log(this.doc['nom_ar']);
      
      this.cardForm.patchValue({
        nom :this.doc['nom_ar']
      });
      this.cardForm.patchValue({
        prenom : this.doc['prenom_ar']
      });
      this.cardForm.patchValue({
        labo : this.doc['labo']['designation_labo_ar']
      });     
      
      this.cardForm.patchValue({
        cedoc : this.doc['cedoc']['intitule_ar']
      });
      this.cardForm.patchValue({
        etab : this.doc['etab']['intitule_ar']
      });
      this.cardForm.patchValue({
        fd : this.doc['fd']['intitule_formation_ar']
      });
    }
  }

  ngOnInit(): void {
    this.loadDoc();
    this.apps.getDocs('pedoc').subscribe( res => {
      let ln=[];
      let labs = res['dataCollections']['cedocs'];
      labs.forEach(function(item){
        ln.push(item['label'].length);
        ln = [...new Set(ln)];
      });
      console.log(res);
      

    })
  }

  loadDoc(){
    this.apps.getFullDoc(this.route.snapshot.params.id, 'cedoc').subscribe(
      res => {
        let ln = 0;
        this.loading = false;
        console.log(res.data);
        // res.forEach(function(doct){
        //   if(doct['cedoc']['intitule_ar'].length > ln){
        //     ln = doct['cedoc']['intitule_ar'].length;
        //   }
        // });
        // console.log(ln);
        
        this.doc = res.data;
        console.log(this.doc['cedoc']['intitule_ar'].length );
        
        
        this.photo = this.doc['photo'];
        this.qrcode = this.doc['qr_id_url'];
        
        this.cardForm.setValue({
        nom : this.doc['nom_fr'],
        prenom :this.doc['prenom_fr'],
        cin : this.doc['cin'],
        cne :this.doc['massar_cne'],
        cedoc :this.doc['cedoc']['intitule_fr'] ,
        etab :this.doc['etab']['intitule_fr'] ,
        labo :this.doc['labo']['designation_labo_fr'] ,
        annee_universitaire :this.doc['sujet']['annee_universitaire'] ,
        photo : this.doc['photo'],
        fd : this.doc['fd']['intitule_formation_fr'],
        });
      },
      err =>{

      }
    );
  }

  onReset(){
    this.cardForm.reset()
  }

}
