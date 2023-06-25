import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class TestDataService {
    constructor() {}

    data = [
        [
            {
                id: 1,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 1,
            },
            {
                id: 2,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "10:30", heureFin: "11:00", statut: 0 },
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 5,
            },
            {
                id: 3,
                objet: "something",
                dates: [
                    { date: "2022-06-05", statut: 0 },
                    { date: "2022-06-07", statut: 1 },
                ],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 10,
            },
            {
                id: 4,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "10:30", heureFin: "11:00", statut: 0 },
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 3800,
            },
            {
                id: 5,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 1,
            },
            {
                id: 6,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "10:30", heureFin: "11:00", statut: 0 },
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 5,
            },
            {
                id: 7,
                objet: "something",
                dates: [
                    { date: "2022-06-05", statut: 0 },
                    { date: "2022-06-07", statut: 1 },
                ],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 10,
            },
            {
                id: 8,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "10:30", heureFin: "11:00", statut: 0 },
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 3800,
            },
        ],
        [
            {
                id: 9,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 1,
            },
            {
                id: 10,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "10:30", heureFin: "11:00", statut: 0 },
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 5,
            },
            {
                id: 11,
                objet: "something",
                dates: [
                    { date: "2022-06-05", statut: 0 },
                    { date: "2022-06-07", statut: 1 },
                ],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 10,
            },
            {
                id: 12,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "10:30", heureFin: "11:00", statut: 0 },
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 3800,
            },
        ],
    ];

    dataRdvNouveau = [
        [
            {
                id: 1,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 1,
            },
            {
                id: 2,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 5,
            },
            {
                id: 3,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 10,
            },
            {
                id: 4,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 3800,
            },
            {
                id: 5,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 1,
            },
            {
                id: 6,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 5,
            },
            {
                id: 7,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 10,
            },
            {
                id: 8,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 3800,
            },
        ],
        [
            {
                id: 9,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 1,
            },
            {
                id: 10,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 5,
            },
            {
                id: 11,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 10,
            },
            {
                id: 12,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 0,
                id_doc: 3800,
            },
        ],
    ];

    dataRdvAccepte = [
        [
            {
                id: 1,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 1,
            },
            {
                id: 2,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 5,
            },
            {
                id: 3,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 10,
            },
            {
                id: 4,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 3800,
            },
        ],
        [
            {
                id: 9,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 1,
            },
            {
                id: 10,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 5,
            },
            {
                id: 11,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 10,
            },
            {
                id: 12,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 2,
                id_doc: 3800,
            },
        ],
    ];

    dataRdvTraite = [
        [
            {
                id: 1,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 1,
            },
            {
                id: 2,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 5,
            },
            {
                id: 3,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 10,
            },
            {
                id: 4,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 3800,
            },
        ],
        [
            {
                id: 9,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 1,
            },
            {
                id: 10,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 5,
            },
            {
                id: 11,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 10,
            },
            {
                id: 12,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 3,
                id_doc: 3800,
            },
        ],
    ];

    dataRdvRefuse = [
        [
            {
                id: 1,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 4,
                id_doc: 1,
            },
            {
                id: 2,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 4,
                id_doc: 5,
            },
            {
                id: 3,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 4,
                id_doc: 10,
            },
            {
                id: 4,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 4,
                id_doc: 3800,
            },
        ],
        [
            {
                id: 9,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 4,
                id_doc: 1,
            },
            {
                id: 10,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 4,
                id_doc: 5,
            },
            {
                id: 11,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 4,
                id_doc: 10,
            },
            {
                id: 12,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 4,
                id_doc: 3800,
            },
        ],
    ];

    dataRdvReprogramme = [
        [
            {
                id: 1,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "10:30", heureFin: "11:00", statut: 0 },
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 1,
            },
            {
                id: 2,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "10:30", heureFin: "11:00", statut: 0 },
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 5,
            },
            {
                id: 3,
                objet: "something",
                dates: [{ date: "2022-06-07", statut: 1 }],
                horaires: [
                    { heureDebut: "10:30", heureFin: "11:00", statut: 0 },
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 10,
            },
            {
                id: 4,
                objet: "something",
                dates: [
                    { date: "2022-06-05", statut: 0 },
                    { date: "2022-06-07", statut: 1 },
                ],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 3800,
            },
        ],
        [
            {
                id: 9,
                objet: "something",
                dates: [
                    { date: "2022-06-05", statut: 0 },
                    { date: "2022-06-07", statut: 1 },
                ],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 1,
            },
            {
                id: 10,
                objet: "something",
                dates: [
                    { date: "2022-06-05", statut: 0 },
                    { date: "2022-06-07", statut: 1 },
                ],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 5,
            },
            {
                id: 11,
                objet: "something",
                dates: [
                    { date: "2022-06-05", statut: 0 },
                    { date: "2022-06-07", statut: 1 },
                ],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 10,
            },
            {
                id: 12,
                objet: "something",
                dates: [
                    { date: "2022-06-05", statut: 0 },
                    { date: "2022-06-07", statut: 1 },
                ],
                horaires: [
                    { heureDebut: "11:30", heureFin: "12:00", statut: 1 },
                ],
                statut: 1,
                id_doc: 3800,
            },
        ],
    ];

    getRdv() {
        return this.data;
    }

    getRdvFiltre(statut: number) {
        switch (statut) {
            case 0:
                return this.dataRdvNouveau;
                break;
            case 1:
                return this.dataRdvReprogramme;
                break;
            case 2:
                return this.dataRdvAccepte;
                break;
            case 3:
                return this.dataRdvTraite;
                break;
            case 4:
                return this.dataRdvRefuse;
                break;
            default:
                return this.dataRdvNouveau;
        }
    }
}
