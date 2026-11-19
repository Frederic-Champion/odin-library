import { Livre } from "./livre";
import "./style.css";

const bibliotheque: Livre[] = [];

function ajouterLivre(titre: string, auteur: string, pages: number, lu: boolean) {
  const nouveau = new Livre(titre, auteur, pages, lu);
  bibliotheque.push(nouveau);
}

ajouterLivre("Dune", "Frank Herbert", 600, true);
ajouterLivre("Le Petit Prince", "Antoine de Saint-Exupéry", 96, false);
ajouterLivre("1984", "George Orwell", 376, true);

const listeLivre = document.querySelector<HTMLUListElement>("#liste-livres")!;
function afficherBibliotheque() {
  listeLivre.innerHTML = "";

  for (const livre of bibliotheque) {
    const li = document.createElement("li");
    const titre = document.createElement("h2");
    const auteur = document.createElement("p");
    const pages = document.createElement("p");
    const lu = document.createElement("p");

    titre.textContent = livre.titre;
    auteur.textContent = livre.auteur;
    pages.textContent = `${livre.pages} ${livre.pages <= 1 ? "page" : "pages"}`;
    lu.textContent = livre.lu ? "lu" : "pas lu";

    li.append(titre, auteur, pages, lu);
    listeLivre.appendChild(li);
  }
}

afficherBibliotheque();
