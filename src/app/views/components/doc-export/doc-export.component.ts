import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ListItem} from '../../../utilities/models';
import local from '../../../utilities/constants/local';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';

@Component({
    selector: 'app-doc-export',
    templateUrl: './doc-export.component.html',
    styleUrls: ['./doc-export.component.css']
})
export class DocExportComponent implements OnInit {

    exportForm: FormGroup;
    isDircteur = false;

    lang = local();

    constructor(public ref: DynamicDialogRef,
                private lss: LocalStorageService,
                public config: DynamicDialogConfig) { }

    ngOnInit(): void {
        this.isDircteur = this.lss.isDir();
        this.exportForm = new FormGroup({
            exoprt_fd: new FormControl(false),
            exoprt_labo: new FormControl(false),
            exoprt_cedoc: new FormControl(false),
            exoprt_etab: new FormControl(false),
            exoprt_sujet: new FormControl(false),
            exoprt_encad: new FormControl(false),
            exoprt_coencad: new FormControl(false),

            exoprt_email: new FormControl(false),
            exoprt_email_institu: new FormControl(false),
            exoprt_cin: new FormControl(false),
            exoprt_tel: new FormControl(false),
            exoprt_cne: new FormControl(false),
            exoprt_date_naissance: new FormControl(false),

            exoprt_annee_univ: new FormControl(false),
            exoprt_note_selection: new FormControl(false),
            exoprt_note_sps: new FormControl(false),
            exoprt_note_oral: new FormControl(false),
            exoprt_inscription_etape: new FormControl(false),
            exoprt_etat: new FormControl(false),


        });
    }

    exporter() {

        // console.log(this.exportForm.value);
       this.ref.close(this.exportForm.value);

    }

}
