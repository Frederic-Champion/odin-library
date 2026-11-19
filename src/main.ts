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
    const lu = document.createElement("p");
    const btnSup = document.createElement("button");

    titre.textContent = livre.titre;
    auteur.textContent = livre.auteur;
    pages.textContent = `${livre.pages} ${livre.pages <= 1 ? "page" : "pages"}`;
    lu.textContent = livre.lu ? "lu" : "pas lu";
    btnSup.textContent = "supprimer"

    li.append(titre, auteur, pages, lu, btnSup);
    listeLivre.appendChild(li);
  }
}

listeLivre.addEventListener("click", (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
})

btn.addEventListener("click", () => {
  dialog.showModal();
});

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(formulaire);
  ajouterLivre(
    String(form.get("titre")),
    String(form.get("auteur")),
    Number(form.get("pages")),
    form.has("lu"),
  );
  afficherBibliotheque();
  formulaire.reset();
  dialog.close();
});

btnRetour.addEventListener("click", () => {
  dialog.close();
});

afficherBibliotheque();
