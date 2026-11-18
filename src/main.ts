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

  if (!listeLivre) return;
  listeLivre.innerHTML = "";

  for (const livre of bibliotheque) {
    const li = document.createElement("li");
    const titre = document.createElement("h2");
    const pages = document.createElement("p");
    const lu = document.createElement("p");

    titre.textContent = livre.titre;
    pages.textContent = String(livre.pages);
    lu.textContent = livre.lu ? "lu" : "pas lu" ;

    li.append(titre, pages, lu);
    listeLivre.appendChild(li);
  }
}

afficherBibliotheque();
