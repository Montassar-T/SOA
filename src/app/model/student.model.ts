import { Specialite } from "./specialite.model";

export class Student {
    id: number;
    nom: string;
    prenom: string;
    specialite: Specialite;
    niveau: string;
    email: string;
  
    constructor(id: number, nom: string, prenom: string, specialite: Specialite, niveau: string, email: string) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.specialite = specialite;
      this.niveau = niveau;
      this.email = email;
    }
  }
  