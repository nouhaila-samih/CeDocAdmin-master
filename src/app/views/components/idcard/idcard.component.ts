import { Component, OnInit, Input } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { Subject } from 'rxjs';
import local from 'src/app/utilities/constants/local';

const printingChange: Subject<boolean> = new Subject<boolean>();

@Component({
  selector: 'app-idcard',
  templateUrl: './idcard.component.html',
  styleUrls: ['./idcard.component.css']
})
export class IdcardComponent implements OnInit {
  @Input() nom!: string;
  @Input() prenom!: string;
  @Input() etablissement!: string;
  @Input() cedoc!: string;
  @Input() labo!: string;
  @Input() photo!: string;
  @Input() cin!: string;
  @Input() cne!: string;
  @Input() annee_universitaire!: string;
  @Input() fd!: string;
  @Input() nom_t!: string;
  @Input() prenom_t!: string;
  @Input() anne_t!: string;
  @Input() cin_t!: string;
  @Input() cne_t!: string;
  @Input() qr!: string;

  @Input() fr!: string;

  lang = local();
  
  isPrinting = false;
  isTitleExact = true;
  qrcode: any;

  laboIncr = 210.5;
  cedocIncr = 270.5;
  etabIncr = 330.5;
  constructor() {
    printingChange.subscribe((value) => {
      this.isPrinting = value
    });
    
   
   // this.qrcode = 'http://pedoc.ngcloud.ma/qr/N1NPMTE5dE1UYldDRUE1MTM0OURXdz09';
  }

  ngOnInit(): void {

    
      // this.labo += this.labo;
      // this.cedoc += 'frgfr ghtrght htht hthj hjytj j yhhy';
      // this.etablissement += 'frgfr ghtrght htht hthj hjytj j yhhyg htrght htht hthj hjytj j yhhy';
    
    if(this.labo.length > 74){ 
      this.laboIncr += 25;
      this.cedocIncr += 25;
      this.etabIncr += 25;
      this.isTitleExact = false;
    }
    if(this.cedoc.length > 74){ 
      this.cedocIncr += 25;
      this.etabIncr += 25;
      this.isTitleExact = false;
    }
    
    if(this.etablissement.length > 74){ 
      this.etabIncr += 25;
      this.isTitleExact = false;
    }
    
    
    

  }

  printId() {

    const divContents = document.getElementById("print-section").innerHTML;
    let a = window.open();
    let ch = '<html>';
    ch += '<head>';
    ch += '<link rel="stylesheet" href="assets/print.css">';
    ch += '</head>';
    ch += '<body > ';
    ch += divContents;
    ch += '</body></html>';
    setTimeout(function () { a.document.write(ch) }, 1000);
    a.document.write('<html>');
    // a.document.write('<head>');
    // a.document.write('<link rel="stylesheet" href="assets/print.css">');

    // a.document.write('</head>');
    // a.document.write('<body > ');
    // a.document.write(divContents);
    // a.document.write('</body></html>');
    setTimeout(function () { a.print() }, 7000);
    //a.print();


  }

  htmltoimg() {

  }
  print() {
  
   
    }
  download() {
    const nom = this.nom;
    const prenom = this.prenom;
    printingChange.next(true);
   
    htmlToImage.toJpeg(document.getElementById('cardfront'), {
      quality: 0.95, width: 1004, height: 590
    })
    .then(function (dataUrl, firstname = nom, lastname = prenom) {
      var link = document.createElement('a');
      link.download = 'card_' + firstname + '_' + lastname + '_front.jpeg';
      link.href = dataUrl;
      link.click();
      printingChange.next(false);
      
    });
    htmlToImage.toJpeg(document.getElementById('cardback'), {
      quality: 0.95, width: 1004, height: 590
    })
      .then(function (dataUrl, firstname = nom, lastname = prenom) {
        var link = document.createElement('a');
        link.download = 'card_' + firstname + '_' + lastname + '_back.jpeg';
        link.href = dataUrl;
        link.click();
       
       
      });

      
  }




}
