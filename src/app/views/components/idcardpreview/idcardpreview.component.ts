import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-idcardpreview',
  templateUrl: './idcardpreview.component.html',
  styleUrls: ['./idcardpreview.component.css']
})
export class IdcardpreviewComponent implements OnInit {
  idInfos :any;
  default_img = "http://127.0.0.1:8000/photos/img_264570.png";
  photo = "http://127.0.0.1:8000/public/docsImages/";
  lang='fr';
  fr=false;
  nom = 'NOM';
  prenom = 'PRENOM';
  anne = 'PREMIERE INSCRIPTION';
  cin = "CIN";
  cne = "CNE";

  


  constructor( ) { }


  ngOnInit(): void {
  }

}
