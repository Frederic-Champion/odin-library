
export class Livre {
  id: string;
  titre: string;
  auteur: string;
  pages: number;
  lu: boolean;

  constructor(titre: string, auteur: string, pages: number,lu: boolean, id?: string) {
    this.id = id || crypto.randomUUID();
    this.titre = titre;
    this.auteur = auteur;
    this.pages = pages;
    this.lu = lu
  }
  basculerLu() {
    this.lu = !this.lu
  }
}