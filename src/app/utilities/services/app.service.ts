import { LocalStorageService } from "./local-storage.service";
import { ApiService } from "./api.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import local from '../constants/local';
import {ListItem} from '../models';

@Injectable({
    providedIn: "root",
})
export class AppService {
    lang = local();
    constructor(
        private router: Router,
        private api: ApiService,
        private lss: LocalStorageService
    ) {}



    getOptionsData(
        query: any
    ) {
        return this.api.getOptionsData(query);
    }

    findGuests( keywords) {
        return this.api.getOptionsData({
            guests: 1,
            search: keywords
        });
    }
    executeDecision(
        data: any,
        decision
    ) {
        return this.api.executeDecision(
            data,
            decision
        );
    }

    setLog(data: any, idDoc, statut, choix = "pedoc") {
        return this.api.setLog(data, idDoc, statut, choix);
    }

    setBourse(data: any, idDoc, statut, choix = "pedoc") {
        return this.api.setBourse(data, idDoc, statut, choix);
    }

    setInscEtape(data: any, idDoc, statut, choix = "pedoc") {
        return this.api.setInscEtape(data, idDoc, statut, choix);
    }

    setInscStatut(data: any, idDoc, statut, choix = "pedoc") {
        return this.api.setInscStatut(data, idDoc, statut, choix);
    }

    setReinsStatut(data: any, idDoc, statut, choix = "pedoc") {
        return this.api.setReinsStatut(data, idDoc, statut, choix);
    }

    setStatut(data: any, idDoc, statut, choix = "pedoc") {
        return this.api.setStatut(data, idDoc, statut, choix);
    }

    setAdmis(data: any, idDoc, statut, choix = "pedoc") {
        return this.api.setAdmis(data, idDoc, statut, choix);
    }

    addDossier(data: any, idDoc, choix = "pedoc") {
        return this.api.addDossier(data, idDoc, choix);
    }

    confirmeAllPreinsc(choix = "pedoc") {
        return this.api.confirmeAllPreinsc(choix);
    }

    changePreinsc(id, data: any, choix = "pedoc") {
        return this.api.changePreinsc(id, data, choix);
    }

    getReinscritBoursier(query: any, choix = "pedoc") {
        return this.api
            .getReinscritBoursier(query, choix)
            .pipe(map((data) => this.prepareDocData(data)));
    }

    getNouveauBoursier(choix = "pedoc") {
        return this.api.getNouveauBoursier(choix).pipe(
            map((data) => {
                if (data.dataCollections.bourses) {
                    data.dataCollections.bourses =
                        data.dataCollections.bourses.map((ob) => {
                            return this.prepareIntitule(ob);
                        });
                }
                return data;
            })
        );
    }

    public changeDemandeStatus(id, statut, observation, choix = "pedoc")  {
        return this.api
       . changeDemandeStatus(id, statut, observation, choix);
    }
    getDemandes(query: any, choix = "pedoc") {
        return this.api.getDemandes(query,choix);
    }
    getFullDoc(id: number, choix = "pedoc") {
        return this.api.getFullDoc(id, choix);
    }

    getDocs(query: any, choix = "pedoc") {
        return this.api
            .getDocs(query, choix)
            .pipe(map((data) => this.prepareDocData(data)));
    }
    getInsc(query: any, choix = "pedoc") {
        return this.api
            .getInsc(query, choix)
            .pipe(map((data) => this.prepareDocData(data)));
    }

    getSoutenu(query: any, choix = "pedoc") {
        return this.api
            .getSoutenu(query, choix)
            .pipe(map((data) => this.prepareDocData(data)));
    }
    getEncours(query: any, choix = "pedoc") {
        return this.api
            .getEncours(query, choix)
            .pipe(map((data) => this.prepareDocData(data)));
    }
    getReinsc(query: any, choix = "pedoc") {
        return this.api
            .getReinsc(query, choix)
            .pipe(map((data) => this.prepareDocData(data)));
    }
    getNotReinsc(query: any, choix = "pedoc") {
        return this.api
            .getNotReinsc(query, choix)
            .pipe(map((data) => this.prepareDocData(data)));
    }
    getPreinsc(query: any, choix = "pedoc") {
        return this.api
            .getPreinsc(query, choix)
            .pipe(map((data) => this.prepareDocData(data)));
    }
    getSps(choix = "pedoc") {
        return this.api.getSps(choix);
    }

    getPedocData(query: any) {
        return this.api
            .getPedocData(query)
            .pipe(map((data) => this.prepareData(data)));
    }

    changeConfigCedoc(
        nbr_sujets_ph,
        nbr_sujets_pes,
        nbr_coencad_pa,
        encad_pa,
        has_ecrit
    ) {
        return this.api.changeConfigCedoc(
            nbr_sujets_ph,
            nbr_sujets_pes,
            nbr_coencad_pa,
            encad_pa,
            has_ecrit
        );
    }
    changeReinscriptionDate(date_debut, date_fin) {
        return this.api.changeReinscriptionDate(date_debut, date_fin);
    }

    changePropositionDate(date_debut, date_fin) {
        return this.api.changePropositionDate(date_debut, date_fin);
    }
    changeInscriptionDate(date_debut_inscription, date_fin_inscription) {
        return this.api.changeInscriptionDate(
            date_debut_inscription,
            date_fin_inscription
        );
    }
    changePercent(percent) {
        return this.api.changePercent(percent);
    }
    getConfigData() {
        return this.api.getConfigData();
    }

    getPedocDashData() {
        return this.api.getPedocDashData();
    }
    getCedocDashData() {
        return this.api.getCedocDashData();
    }

    getSujetsAttente(query: any, level = "pedoc") {
        return this.api.getSujetsAttente(query, level).pipe(
            map((data) => {
                console.log(data);

                const labos = data.dataCollections.labos.map((ob) => {
                    return this.prepareLabo(ob);
                });
                return {
                    ...data,
                    dataCollections: {
                        labos,
                        fds: data.dataCollections.fds.map((fd) => {
                            return this.prepareFD(fd);
                        }),

                        specialites: data.dataCollections.specialites.map(
                            (fd) => {
                                return this.prepareSpecialites(fd);
                            }
                        ),
                        statuses: data.dataCollections.statuses.map((fd) => {
                            return this.prepareStatusById(fd);
                        }),
                        enseignants: data.dataCollections.enseignants.map(
                            (fd) => {
                                return this.prepareDirecteurThese(fd);
                            }
                        ),
                        ex_coencad: data.dataCollections.ex_coencad.map(
                            (fd) => {
                                return this.prepareExCoDirecteurThese(fd);
                            }
                        ),
                        keywords: data.dataCollections.keywords.map((fd) => {
                            return this.prepareKeyword(fd);
                        }),
                    },
                    sujets: data.sujets.map((sujet) =>
                        this.prepareSujet(sujet)
                    ),
                };
            })
        );
    }

    getSujets(query: any, level = "pedoc") {
        return this.api.getSujets(query, level).pipe(
            map((data) => {
                console.log(data);

                return {
                    ...data,
                    dataCollections: this.prepareData(data.dataCollections),
                    sujets: data.sujets.map((sujet) =>
                        this.prepareSujet(sujet)
                    ),
                };
            })
        );
    }

    public changeStatut(sujet_id, statut, observation, level = "pedoc") {
        return this.api.changeStatut(sujet_id, statut, observation, level);
    }

    getAdminsTutorials() {
        return this.api.getAdminsTutorials();
    }

    passwordResetProcess(data) {
        return this.api.passwordResetProcess(data);
    }
    sendResetPasswordLink(email) {
        return this.api.sendResetPasswordLink(email);
    }

    addSujet(data: any) {
        return this.api.addSujet(data);
    }
    updateSujet(data: any, id) {
        return this.api.updateSujet(data, id);
    }
    addOg(name, email, site, national) {
        return this.api.addOg(name, email, site, national);
    }
    addEtab(etab_name, etab_email, etab_site, etab_national) {
        return this.api.addEtab(
            etab_name,
            etab_email,
            etab_site,
            etab_national
        );
    }

    getDataForUpdateSujet(id) {
        return this.api.getDataForUpdateSujet(id).pipe(
            map((data) => {
                // console.log(data);

                data.fds = data.fds.map((fd) => {
                    return this.prepareFD(fd);
                });
                // data.directeurs = data.enseignents.filter(
                //     (ob) => ob.grade === 'PES' || ob.grade === 'PH'
                // );

                // data.directeurs = data.directeurs.map((ob) =>
                //     this.prepareDirecteurThese(ob)
                // );

                data.enseignents = data.enseignents.map((ob) =>
                    this.prepareDirecteurThese(ob)
                );
                data.specialites = data.specialites.map((ob) =>
                    this.prepareSpecialites(ob)
                );
                data.etabs = data.etabs.map((ob) => this.prepareEtab(ob));
                data.ogs = data.ogs.map((ob) => this.prepareOG(ob));
                data.keywords = data.keywords.map((ob) =>
                    this.prepareKeyword(ob)
                );

                return data;
            })
        );
    }
    getDataForAddSujet() {
        return this.api.getDataForAddSujet().pipe(
            map((data) => {
                // console.log(data);

                data.fds = data.fds.map((fd) => {
                    return this.prepareFD(fd);
                });
                // data.directeurs = data.enseignents.filter(
                //     (ob) => ob.grade === 'PES' || ob.grade === 'PH'
                // );

                // data.directeurs = data.directeurs.map((ob) =>
                //     this.prepareDirecteurThese(ob)
                // );

                data.enseignents = data.enseignents.map((ob) =>
                    this.prepareDirecteurThese(ob)
                );
                data.specialites = data.specialites.map((ob) =>
                    this.prepareSpecialites(ob)
                );
                data.etabs = data.etabs.map((ob) => this.prepareEtab(ob));
                data.ogs = data.ogs.map((ob) => this.prepareOG(ob));
                data.keywords = data.keywords.map((ob) =>
                    this.prepareKeyword(ob)
                );

                return data;
            })
        );
    }

    ficheEncad() {
        return this.api.ficheEncad().pipe(
            map((data) => {
                let nbrTotalCoEnc = 0;
                let nbrTotalEnc = 0;
                data.annee_universitaires = data.annee_universitaires.map(
                    (ob) => {
                        let nbrCoEnc = 0;
                        let nbrEnc = 0;
                        if (
                            ob.affected_co_encad_sujets &&
                            ob.affected_co_encad_sujets.length
                        ) {
                            ob.affected_co_encad_sujets.forEach((element) => {
                                nbrCoEnc += element.doctorants.length;
                            });
                            ob.nbrCoEnc = nbrCoEnc;
                            nbrTotalCoEnc += nbrCoEnc;
                        }
                        if (
                            ob.affected_encad_sujets &&
                            ob.affected_encad_sujets.length
                        ) {
                            ob.affected_encad_sujets.forEach((element) => {
                                nbrEnc += element.doctorants.length;
                            });
                            ob.nbrEnc = nbrEnc;
                            nbrTotalEnc += nbrEnc;
                        }

                        return ob;

                        // this.data.nbrTotal += ob.affected_co_encad_sujets.length;
                        // this.data.nbrTotal += ob.affected_encad_sujets.length;
                    }
                );
                return {
                    ...data,
                    nbrTotalEnc,
                    nbrTotalCoEnc,
                };
            })
        );
    }
    publicProfile(id) {
        return this.api.publicProfile(id);
    }
    getFullLaboInfo() {
        return this.api.getFullLaboInfo();
    }

    public deleteSujet(id) {
        return this.api
            .deleteSujet(id)
            .pipe(map((data) => data.map((sujet) => this.prepareSujet(sujet))));
    }

    public getMySujetsFd() {
        return this.api.getMySujetsFd().pipe(
            map((data) => {
                const labos = data.dataCollections.labos.map((ob) => {
                    return this.prepareLabo(ob);
                });
                return {
                    ...data,
                    dataCollections: {
                        labos,
                        fds: data.dataCollections.fds.map((ob) => {
                            return this.prepareFD(ob);
                        }),

                        specialites: data.dataCollections.specialites.map(
                            (ob) => {
                                return this.prepareSpecialites(ob);
                            }
                        ),
                        statuses: data.dataCollections.statuses.map((ob) => {
                            return this.prepareStatus(ob);
                        }),
                        enseignants: data.dataCollections.enseignants.map(
                            (ob) => {
                                return this.prepareDirecteurThese(ob);
                            }
                        ),
                    },
                    sujets: data.sujets.map((sujet) =>
                        this.prepareSujetWithDataCollections(sujet, labos)
                    ),
                };
            })
        );
    }
    public getMySujetsCeDoc() {
        return this.api.getMySujetsCeDoc().pipe(
            map((data) => {
                const labos = data.dataCollections.labos.map((ob) => {
                    return this.prepareLabo(ob);
                });
                return {
                    ...data,
                    dataCollections: {
                        labos,
                        fds: data.dataCollections.fds.map((fd) => {
                            return this.prepareFD(fd);
                        }),

                        specialites: data.dataCollections.specialites.map(
                            (fd) => {
                                return this.prepareSpecialites(fd);
                            }
                        ),
                        statuses: data.dataCollections.statuses.map((fd) => {
                            return this.prepareStatus(fd);
                        }),
                        enseignants: data.dataCollections.enseignants.map(
                            (fd) => {
                                return this.prepareDirecteurThese(fd);
                            }
                        ),
                    },
                    sujets: data.sujets.map((sujet) =>
                        this.prepareSujetWithDataCollections(sujet, labos)
                    ),
                };
            })
        );
    }
    public getMySujetsLabo() {
        return this.api.getMySujetsLabo().pipe(
            map((data) => {
                return {
                    ...data,
                    dataCollections: {
                        fds: data.dataCollections.fds.map((fd) => {
                            return this.prepareFD(fd);
                        }),

                        specialites: data.dataCollections.specialites.map(
                            (fd) => {
                                return this.prepareSpecialites(fd);
                            }
                        ),
                        statuses: data.dataCollections.statuses.map((fd) => {
                            return this.prepareStatus(fd);
                        }),
                        enseignants: data.dataCollections.enseignants.map(
                            (fd) => {
                                return this.prepareDirecteurThese(fd);
                            }
                        ),
                    },
                    sujets: data.sujets.map((sujet) =>
                        this.prepareSujet(sujet)
                    ),
                };
            })
        );
    }
    public getMySujets() {
        return this.api.getMySujets().pipe(
            map((data) => {
                return {
                    dataCollections: {
                        fds: data.dataCollections.fds.map((fd) => {
                            return this.prepareFD(fd);
                        }),

                        specialites: data.dataCollections.specialites.map(
                            (fd) => {
                                return this.prepareSpecialites(fd);
                            }
                        ),
                        statuses: data.dataCollections.statuses.map((fd) => {
                            return this.prepareStatus(fd);
                        }),
                        enseignants: data.dataCollections.enseignants.map(
                            (fd) => {
                                return this.prepareDirecteurThese(fd);
                            }
                        ),
                    },
                    sujets: data.sujets.map((sujet) =>
                        this.prepareSujet(sujet)
                    ),
                };
            })
        );
    }

    changePDF(file: any) {
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append("photo", file, file.name);
        return this.api.changePDF(formData);
    }
    changePassword(
        current_password: string,
        new_password: string,
        new_password2: string
    ) {
        return this.api.changePassword({
            current_password,
            new_password,
            new_password2,
        });
    }

    updateProfile(
        nom_fr: string,
        nom_ar: string,
        prenom_fr: string,
        prenom_ar: string,
        date_naissance: string,
        tel: string,
        email: string
    ) {
        return this.api.updateProfile({
            nom_fr,
            nom_ar,
            prenom_fr,
            prenom_ar,
            date_naissance,
            tel,
            email,
        });
    }
    me() {
        return this.api.me();
    }
    login(cin, password) {
        return this.api.login(cin, password);
    }
    loginUser(res: any) {
        return this.lss.loginUser(res.user, res.access_token, res.annee_uni);
    }
    logout() {
        this.lss.logout();
        this.router.navigate(["/login"]);
        return;
    }

    prepareSujet(sujet) {
        const codirecteur = sujet.codirecteur;
        if (sujet.codirecteur) {
            if (sujet.codirecteur_type === "App\\Models\\User") {
                codirecteur.nom = codirecteur.nom_fr;
                codirecteur.prenom = codirecteur.prenom_fr;
            }
            codirecteur.fullName = codirecteur.nom + " " + codirecteur.prenom;
        }
        return {
            ...sujet,
            intitule: sujet.intitule_fr ? sujet.intitule_fr : sujet.intitule_ar,
            resume: sujet.resume_fr ? sujet.resume_fr : sujet.resume_ar,
            type: sujet.is_etudiant ? "Etudiant" : "Fonctionnaire",
            conv_type: sujet.is_projet
                ? "Projet"
                : sujet.is_cotutelle
                ? "Cotutelle"
                : null,
            codirecteur,
            // profName: sujet.directeur
            //     ? sujet.directeur.user.nom_fr +
            //       ' ' +
            //       sujet.directeur.user.prenom_fr
            //     : this.lss.getAuthFullName(),
            statutName: this.getSujetStatut(sujet.statut),
        };
    }
    prepareSujetWithDataCollections(
        sujet,
        labos = [],
        fds = [],
        specialites = [],
        enseignants = []
    ) {
        return {
            ...sujet,
            intitule: sujet.intitule_fr ? sujet.intitule_fr : sujet.intitule_ar,
            resume: sujet.resume_fr ? sujet.resume_fr : sujet.resume_ar,
            labo: this.findItemById(labos, sujet.labo_id),
            type: sujet.is_etudiant ? "Etudiant" : "Fonctionnaire",
            conv_type: sujet.is_projet
                ? "Projet"
                : sujet.is_cotutelle
                ? "Cotutelle"
                : null,

            //    fd:  this.findItemById(fds, sujet.fd_id),
            //    specialite:  this.findItemById(specialites, sujet.specialite_id),
            //   directeur: this.findItemById(enseignants, sujet.directeur_id),
            // profName: sujet.directeur
            //     ? sujet.directeur.user.nom_fr +
            //       ' ' +
            //       sujet.directeur.user.prenom_fr
            //     : this.lss.getAuthFullName(),
            statutName: this.getSujetStatut(sujet.statut),
        };
    }
    findItemById(items, id) {
        const item = items.find((ob) => ob.value === id);
        return item
            ? item
            : {
                  value: 0,
                  label: "-",
              };
    }

    prepareData(data) {
        // console.log(data);
        if (data.annees_uni) {
            data.annees_uni = data.annees_uni.map((ob) => {
                return this.prepareAnneesUni(ob);
            });
        }
        if (data.annee_uni) {
            data.annee_uni = this.prepareAnneesUni(data.annee_uni);
        }
        if (data.keywords) {
            data.keywords = data.keywords.map((ob) => {
                return this.prepareKeyword(ob);
            });
        }
        if (data.enseignants) {
            data.enseignants = data.enseignants.map((ob) => {
                return this.prepareDirecteurThese(ob);
            });
        }
        if (data.ex_coencad) {
            data.ex_coencad = data.ex_coencad.map((ob) => {
                return this.prepareExCoDirecteurThese(ob);
            });
        }
        if (data.statuses) {
            data.statuses = data.statuses.map((ob) => {
                return this.prepareStatusById(ob);
            });
        }

        if (data.cedocs) {
            data.cedocs = data.cedocs.map((ob) => {
                return this.prepareCedocs(ob);
            });
        }

        if (data.labos) {
            data.labos = data.labos.map((ob) => {
                return this.prepareLabo(ob);
            });
        }
        if (data.fds) {
            data.fds = data.fds.map((ob) => {
                return this.prepareFD(ob);
            });
        }
        if (data.specialites) {
            data.specialites = data.specialites.map((ob) => {
                return this.prepareSpecialites(ob);
            });
        }

        return data;
    }

    prepareDocData(data) {
        // console.log(data);
        if (data.dataCollections.bourses) {
            data.dataCollections.bourses = data.dataCollections.bourses.map(
                (ob) => {
                    return this.prepareIntitule(ob);
                }
            );
        }

        if (data.dataCollections.annees_uni) {
            data.dataCollections.annees_uni =
                data.dataCollections.annees_uni.map((ob) => {
                    return this.prepareAnneesUni(ob);
                });
        }
        if (data.dataCollections.annee_uni) {
            data.dataCollections.annee_uni = this.prepareAnneesUni(
                data.dataCollections.annee_uni
            );
        }

        if (data.dataCollections.enseignants) {
            data.dataCollections.enseignants =
                data.dataCollections.enseignants.map((ob) => {
                    return this.prepareDirecteurThese(ob);
                });
        }
        if (data.dataCollections.ex_coencad) {
            data.dataCollections.ex_coencad =
                data.dataCollections.ex_coencad.map((ob) => {
                    return this.prepareExCoDirecteurThese(ob);
                });
        }

        if (data.dataCollections.cedocs) {
            data.dataCollections.cedocs = data.dataCollections.cedocs.map(
                (ob) => {
                    return this.prepareCedocs(ob);
                }
            );
        }

        if (data.dataCollections.labos) {
            data.dataCollections.labos = data.dataCollections.labos.map(
                (ob) => {
                    return this.prepareLabo(ob);
                }
            );
        }
        if (data.dataCollections.fds) {
            data.dataCollections.fds = data.dataCollections.fds.map((ob) => {
                return this.prepareFD(ob);
            });
        }

        return data;
    }

    prepareIntitule(ob) {
        return {
            value: ob.id,
            label: ob.intitule,
        };
    }
    prepareCedocs(ob) {
        return {
            value: ob.id,
            label: ob.intitule,
        };
    }

    prepareLabo(fd) {
        return {
            value: fd.id,
            label: fd.designation_labo_fr
                ? fd.designation_labo_fr
                : fd.designation_labo_ar,
        };
    }
    prepareFD(fd) {
        return {
            value: fd.id,
            label: fd.intitule_formation_fr
                ? fd.intitule_formation_fr
                : fd.intitule_formation_ar,
        };
    }
    prepareOG(ob) {
        return {
            value: ob.id,
            label: ob.name,
        };
    }
    prepareAnneesUni(ob) {
        return {
            value: ob.id,
            label: ob.annee_universitaire,
        };
    }
    prepareKeyword(ob) {
        return {
            value: ob.id,
            label: ob.word,
        };
    }
    prepareSpecialites(ob) {
        return {
            value: ob.id,
            label: ob.specialite_fr ? ob.specialite_fr : ob.specialite_ar,
        };
    }
    prepareStatus(ob) {
        return {
            value: this.getSujetCodeStatut(ob),
            label: ob,
        };
    }
    prepareStatusById(ob) {
        return {
            value: ob,
            label: this.getSujetStatut(ob),
        };
    }
    prepareEtab(ob) {
        return {
            value: ob.id,
            label: ob.intitule,
        };
    }
    prepareDirecteurThese(ob) {
        return {
            value: ob.id,
            label: ob.nom_fr + " " + ob.prenom_fr,
        };
    }
    prepareExCoDirecteurThese(ob) {
        return {
            value: ob.id,
            label: ob.nom + " " + ob.prenom,
        };
    }
    preparePays(ob) {
        return {
            value: ob.id,
            label: ob.intitule_fr,
        };
    }

    getSujetStatut(statut) {
        switch (Number(statut)) {
            case 0: {
                return "Refusé";
            }
            case 1: {
                return "Nouveau";
            }
            case 2: {
                return "Validé";
            }
            case 3: {
                return "En cours";
            }
            case 4: {
                return "Soutenue";
            }
            case 5: {
                return "Abandonné";
            }
            case 6: {
                return "Validé Par Labo";
            }
            case 7: {
                return "Validé Par Cedoc";
            }
            case 8: {
                return "Refusé Par Labo";
            }
            case 9: {
                return "Refusé Par Cedoc";
            }
            case 10: {
                return "Refusé Par Pedoc";
            }
            case 11: {
                return "Déposé";
            }
            case 12: {
                return "Annulé";
            }
            default: {
                return "Nouveau";
            }
        }
    }
    getSujetCodeStatut(statut) {
        switch (statut) {
            case "Refusé": {
                return 0;
            }
            case "Nouveau": {
                return 1;
            }
            case "Validé": {
                return 2;
            }
            case "En cours": {
                return 3;
            }
            case "Soutenue": {
                return 4;
            }
            case "Abandonné": {
                return 5;
            }
            case "Validé_Par_Labo": {
                return 6;
            }
            case "Validé_Par_Cedoc": {
                return 7;
            }
            case "Refusé_Par_Labo": {
                return 8;
            }
            case "Refusé_Par_Cedoc": {
                return 9;
            }
            case "Refusé_Par_Pedoc": {
                return 10;
            }
            case "Déposé": {
                return 11;
            }
            case "Annulé": {
                return 12;
            }
            default: {
                return 1;
            }
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /************************* //* 12-06-2022 */ /*******************************************************/
    //Pedoc Rdvs methods
    /************************* */

    // all Rdv
    getListeRendezvousPedoc(query) {
        return this.api.getListeRendezvousPedoc(query).pipe(
            map((data) => {
                data.rdvs = this.toRdvsFormat(data.rdvs);
                return data;
            })
        );
    }

    // Filtrer Rdv
    filtreRdvPedoc(query, statut: string) {
        const codeSatut = this.getRendezVousCodeStatut(statut);
        return this.api.getListeRendezvousFiltrePedoc(query, codeSatut).pipe(
            map((data) => {
                data.rdvs = this.toRdvsFormat(data.rdvs);
                return data;
            })
        );
    }

    //Cedoc Rdvs methods
    /************************* */

    // all Rdv
    getListRendezVousCedoc(query) {
        return this.api.getListRendezVousCedoc(query).pipe(
            map((data) => {
                data.rdvs = this.toRdvsFormat(data.rdvs);
                return data;
            })
        );
    }

    // Filtrer Rdv
    filtreRdvCedoc(query, statut: string) {
        const codeSatut = this.getRendezVousCodeStatut(statut);
        return this.api.getListeRendezvousFiltreCedoc(query, codeSatut).pipe(
            map((data) => {
                data.rdvs = this.toRdvsFormat(data.rdvs);
                return data;
            })
        );
    }

    //Cedoc and Pedoc Rdvs methods
    /************************* */

    // Valider
    validerRendezVous(idRdv: number) {
        return this.api.validerRendezVous(idRdv).pipe(
            map((data) => {
                if (data.status == true) {
                    data.rdv = this.toRdvFormat(data.rdv);
                }
                return data;
            })
        );
    }

    // Reprogrammer
    reprogrammerRendezVous(
        idRdv: number,
        objet: string,
        date: string,
        heureDebut: string,
        heureFin: string
    ) {
        const data = { objet, date, heureDebut, heureFin };
        return this.api.reprogrammerRendezVous(idRdv, data).pipe(
            map((data) => {
                if (data.status == true) {
                    data.rdv = this.toRdvFormat(data.rdv);
                }
                return data;
            })
        );
    }

    // Events
    getEvenements(choix) {
        if (choix == "pedoc") {
            return this.api.getEvenementsPedoc();
        }
        return this.api.getEvenementsCedoc();
    }

    //Cedoc and Pedoc Helper methods
    /************************* ********************************************/

    toRdvsFormat(rdvs: any[]) {
        let Rdvs = [{}];
        rdvs.forEach((element) => {
            let dates = [{}];
            let horaires = [{}];

            element.dates.forEach((el) => {
                el.horaires.forEach((v) => {
                    horaires.push({
                        heureDebut: v.heureDebut,
                        heureFin: v.heureFin,
                        statut: v.statut,
                    });
                });

                dates.push({
                    date: el.dateRdv,
                    statut: el.statut,
                });
            });

            dates.shift();
            horaires.shift();

            Rdvs.push({
                id: element.id,
                objet: element.objet,
                statut: element.statut,
                id_doc: element.doc_id,
                dates: dates,
                horaires: horaires,
            });

            //
        });
        Rdvs.shift();
        return Rdvs;
    }

    toRdvFormat(rdv: any) {
        let Rdv = {};

        let dates = [{}];
        let horaires = [{}];

        rdv.dates.forEach((el) => {
            el.horaires.forEach((v) => {
                horaires.push({
                    heureDebut: v.heureDebut,
                    heureFin: v.heureFin,
                    statut: v.statut,
                });
            });

            dates.push({
                date: el.dateRdv,
                statut: el.statut,
            });
        });

        dates.shift();
        horaires.shift();

        Rdv = {
            id: rdv.id,
            objet: rdv.objet,
            statut: rdv.statut,
            id_doc: rdv.doc_id,
            dates: dates,
            horaires: horaires,
        };

        return Rdv;
    }

    getRendezVousCodeStatut(statut: string) {
        switch (statut) {
            case "Nouveau": {
                return 0;
            }
            case "Reprogrammé": {
                return 1;
            }
            case "Accepté": {
                return 2;
            }
            case "Traité": {
                return 3;
            }
            case "Refusé": {
                return 4;
            }
            default: {
                return 0;
            }
        }
    }


    cedCode(ob: ListItem) {
        if (!ob) { return  null; }
        return {
            value: ob.value,
            label: '[ CED-' + ob.value + ' ] ' + ob.label,
        };

    }

    showSuccessMessages(message, messageService) {
        messageService.add({ detail: message,
            life: 10000, key: 'toast', severity: 'success', summary: this.lang.action_success });

    }


    showErrorMessages(err, messageService) {

        if (err.error?.errors) {
            for (const error in err.error.errors) {
                messageService.add({
                    detail: err.error.errors[error],
                    life: 10000, key: 'toast', severity: 'error',
                    summary: this.lang.action_error
                });
            }
            return;
        }
        if (err.error?.message) {
            messageService.add({ detail: err.error.message, life: 10000, key: 'toast', severity: 'error', summary: this.lang.action_error });
            return;
        }
        if (typeof err === 'string' || err instanceof String) {
            messageService.add({ detail: err, life: 10000, key: 'toast', severity: 'error', summary: this.lang.action_error });
            return;
        }

        messageService.add({ detail: this.lang.err, life: 10000, key: 'toast', severity: 'error', summary: this.lang.action_error });

    }

}
