import { Component, OnInit, Input } from '@angular/core';
import local from 'src/app/utilities/constants/local';


@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.scss']
})
export class StatutComponent implements OnInit {
  lang = local();
  @Input() statut = null;

  constructor() { }

  ngOnInit(): void {
  }

}
