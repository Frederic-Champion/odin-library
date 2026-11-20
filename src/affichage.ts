import type { Livre } from "./livre";


export function afficherBibliotheque(listeLivre: HTMLUListElement, bibliotheque: Livre[]) {
  listeLivre.innerHTML = "";

  for (const livre of bibliotheque) {
    const li = document.createElement("li");
    const titre = document.createElement("h2");
    const auteur = document.createElement("p");
    const pages = document.createElement("p");
    const btnSup = document.createElement("button");
    const etiquette = document.createElement("label");
    const caseLu = document.createElement("input");

    titre.textContent = livre.titre;
    auteur.textContent = livre.auteur;
    pages.textContent = `${livre.pages} ${livre.pages <= 1 ? "page" : "pages"}`;

    btnSup.textContent = "supprimer";
    btnSup.setAttribute("data-id", livre.id);
    btnSup.setAttribute("data-action", "supprimer");

    caseLu.type = "checkbox";
    caseLu.checked = livre.lu;
    caseLu.setAttribute("data-id", livre.id);
    caseLu.setAttribute("data-action", "check");

    etiquette.append(caseLu, livre.lu ? "Lu" : "À lire");

    li.append(titre, auteur, pages, etiquette, btnSup);
    listeLivre.appendChild(li);
  }
}
