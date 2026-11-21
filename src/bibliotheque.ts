import { Livre } from "./livre";

export class Bibliotheque {
  livres: Livre[];

  constructor() {
    const saved = localStorage.getItem("bibliotheque");

    try {
      const donnees = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(donnees)) throw new Error("ce n'est pas une bibliothèque");
      this.livres = donnees.map((l: Livre) => new Livre(l.titre, l.auteur, l.pages, l.lu, l.id));
    } catch (e) {
      if (e instanceof Error) console.log("erreur :", e.message);
      this.livres = [];
    }
  }

  ajouterLivre(titre: string, auteur: string, pages: number, lu: boolean): void {
    const nouveau = new Livre(titre, auteur, pages, lu);
    this.livres.push(nouveau);
    localStorage.setItem("bibliotheque", JSON.stringify(this.livres));
  }

  trouverId(id: string): Livre | undefined {
    const livre = this.livres.find((l) => l.id === id);
    return livre;
  }

  validerLecture(id: string): void {
    this.trouverId(id)?.basculerLu();
    localStorage.setItem("bibliotheque", JSON.stringify(this.livres));
  }

  supprimerLivre(id: string): void {
    const index = this.livres.findIndex((i) => i.id === id);
    if (index === -1) return;
    this.livres.splice(index, 1);
    localStorage.setItem("bibliotheque", JSON.stringify(this.livres));
  }
}
