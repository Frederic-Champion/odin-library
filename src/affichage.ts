import type { Livre } from "./livre";

export function afficherBibliotheque(listeLivre: HTMLTableSectionElement, bibliotheque: Livre[]) {
  listeLivre.innerHTML = "";

  for (const livre of bibliotheque) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const tdAuteur = document.createElement("td");
    const tdPages = document.createElement("td");
    const tdCaseLu = document.createElement("td");
    const etiquette = document.createElement("label");
    const caseLu = document.createElement("input");
    const tdBtnSup = document.createElement("td");
    const btnSup = document.createElement("button");

    th.textContent = livre.titre;
    th.scope = "row";
    tdAuteur.textContent = livre.auteur;
    tdPages.textContent = String(livre.pages);

    btnSup.textContent = "Supprimer";
    btnSup.setAttribute("data-id", livre.id);
    btnSup.setAttribute("data-action", "supprimer");
    tdBtnSup.append(btnSup);
    tdBtnSup.classList.add("bouton");

    caseLu.type = "checkbox";
    caseLu.checked = livre.lu;
    caseLu.setAttribute("data-id", livre.id);
    caseLu.setAttribute("data-action", "check");

    etiquette.append(caseLu, livre.lu ? "Lu" : "À lire");
    tdCaseLu.append(etiquette);

    tr.append(th, tdAuteur, tdPages, tdCaseLu, tdBtnSup);
    listeLivre.appendChild(tr);
  }
}
