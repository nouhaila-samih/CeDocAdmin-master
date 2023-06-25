import { AnneeUniv } from './../models/index';
import { R_SUPER_ADMIN, R_DIR_PEDOC, R_DIR_CEDOC, R_ADMIN_PEDOC, R_ADMIN_CEDOC } from './../constants/index';
import { User } from '../models/index';
import { Injectable } from '@angular/core';





const TOKEN_KEY = 'AuthToken';
const CEDOC_NAME = 'CedocName';
const USER_ID = 'UserID';
const ROLES = 'roles';
const PERMISSIONS = 'permissions';

const NOM_FR = 'NomFR';
const PRENOM_FR = 'PrenomFR';
const EMAIL = 'Email';
const PDP = 'pdp';
const ANNEE_UNI = 'AnneeUni';
const ANNEE_UNI_ID = 'AnneeUniID';


@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() { }

    public loginUser(user: User, access_token: string, annee_uni: AnneeUniv) {
        localStorage.setItem(TOKEN_KEY, access_token);
        localStorage.setItem(NOM_FR, user.nom_fr);
        localStorage.setItem(PRENOM_FR, user.prenom_fr);
        localStorage.setItem(USER_ID, String(user.id));
        localStorage.setItem(EMAIL, user.email);
        localStorage.setItem(PDP, user.photo);
        localStorage.setItem(ANNEE_UNI, annee_uni.annee_universitaire);
        localStorage.setItem(ANNEE_UNI_ID, String(annee_uni.id));
        localStorage.setItem(ROLES, JSON.stringify(user.roles));
        localStorage.setItem(PERMISSIONS, JSON.stringify(user.permissions));

        if (user.cedoc && user.cedoc.intitule) {
            localStorage.setItem(CEDOC_NAME, user.cedoc.intitule);
        } else {
            localStorage.setItem(CEDOC_NAME, null);
        }


        return true;
    }

    public loginUserWithoutToken(user: User) {
        localStorage.setItem(NOM_FR, user.nom_fr);
        localStorage.setItem(PRENOM_FR, user.prenom_fr);
        localStorage.setItem(USER_ID, String(user.id));
        localStorage.setItem(EMAIL, user.email);
        localStorage.setItem(PDP, user.photo);
        localStorage.setItem(ROLES, JSON.stringify(user.roles));
        localStorage.setItem(PERMISSIONS, JSON.stringify(user.permissions));

        if (user.cedoc && user.cedoc.intitule) {
            localStorage.setItem(CEDOC_NAME, user.cedoc.intitule);
        } else {
            localStorage.setItem(CEDOC_NAME, null);
        }


        return true;
    }

    public getCedocName() {
        return localStorage.getItem(CEDOC_NAME);
    }
    public updateUserFullName(nom: string, prenom: string) {
        localStorage.setItem(NOM_FR, nom);
        localStorage.setItem(PRENOM_FR, prenom);
    }
    public getAuthFullName() {
        return (
            localStorage.getItem(NOM_FR) + ' ' + localStorage.getItem(PRENOM_FR)
        );
    }
    public getAuthGradeName() {
        if (this.hasRole(R_SUPER_ADMIN)) { return 'Super Admin'; }
        if (this.hasRole(R_DIR_PEDOC)) { return 'Directeur PeDoc'; }
        if (this.hasRole(R_DIR_CEDOC)) { return 'Directeur CeDoc'; }
        if (this.hasRole(R_ADMIN_PEDOC)) { return 'Admin PeDoc'; }
        if (this.hasRole(R_ADMIN_CEDOC)) { return 'Admin CeDoc'; }
        return 'Admin';
    }
    public hasRole(role: string) {
        const roles = JSON.parse(localStorage.getItem(ROLES));
        return roles.includes(role);
    }
    public hasPermissions(permission: string) {
        const permissions = JSON.parse(localStorage.getItem(PERMISSIONS));
        return permissions.includes(permission);

    }
    public setPhoto(photo: string) {
        return localStorage.setItem(PDP, photo);
    }
    public getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }
    public getPDP() {
        return localStorage.getItem(PDP);
    }

    public getAnneeUniId() {
        return Number(localStorage.getItem(ANNEE_UNI_ID));
    }

    public getAnneeUni() {
        return localStorage.getItem(ANNEE_UNI);
    }

    public isPedocAdmin() {
        return this.hasRole(R_ADMIN_PEDOC) ||  this.hasRole(R_DIR_PEDOC);
    }

    public isDir() {
        return this.hasRole(R_DIR_CEDOC) ||  this.hasRole(R_DIR_PEDOC);
    }


    public logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CEDOC_NAME);
        localStorage.removeItem(USER_ID);
        localStorage.removeItem(ROLES);
        localStorage.removeItem(PERMISSIONS);
        localStorage.removeItem(NOM_FR);
        localStorage.removeItem(PRENOM_FR);
        localStorage.removeItem(EMAIL);
        localStorage.removeItem(PDP);
        localStorage.removeItem(ANNEE_UNI);
        localStorage.removeItem(ANNEE_UNI_ID);


    }
    public isLoggedIn() {
        return !!this.getToken();
    }



}
