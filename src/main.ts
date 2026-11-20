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
const btn = document.querySelector<HTMLButtonElement>("#btnAdd")!;
const dialog = document.querySelector<HTMLDialogElement>("#dialog")!;
const formulaire = document.querySelector<HTMLFormElement>("#formulaire")!;
const btnRetour = document.querySelector<HTMLButtonElement>("#retour")!;

function afficherBibliotheque() {
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

function supprimerLivre(id: string) {
  const index = bibliotheque.findIndex((i) => i.id === id);
  if (index === -1) return;
  bibliotheque.splice(index, 1);
}

listeLivre.addEventListener("click", (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const id = e.target.getAttribute("data-id")!;
  supprimerLivre(id);
  afficherBibliotheque();
});

function validerLecture(id: string) {
  const livre = bibliotheque.find((l) => l.id === id);
  livre?.basculerLu();
}

listeLivre.addEventListener("change", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;
  const id = e.target.getAttribute("data-id")!;
  validerLecture(id);
  afficherBibliotheque();
});

btn.addEventListener("click", () => {
  dialog.showModal();
});

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(formulaire);
  ajouterLivre(String(form.get("titre")), String(form.get("auteur")), Number(form.get("pages")), form.has("lu"));
  afficherBibliotheque();
  formulaire.reset();
  dialog.close();
});

btnRetour.addEventListener("click", () => {
  dialog.close();
});

afficherBibliotheque();
