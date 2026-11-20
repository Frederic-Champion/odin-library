import { Bibliotheque } from "./bibliotheque";
import { afficherBibliotheque } from "./affichage";
import "./style.css";

const bibliotheque = new Bibliotheque();

if (bibliotheque.livres.length === 0) {
  bibliotheque.ajouterLivre("Dune", "Frank Herbert", 600, true);
  bibliotheque.ajouterLivre("Le Petit Prince", "Antoine de Saint-Exupéry", 96, false);
  bibliotheque.ajouterLivre("1984", "George Orwell", 376, true);
}

const listeLivre = document.querySelector<HTMLUListElement>("#liste-livres")!;
const btn = document.querySelector<HTMLButtonElement>("#btnAdd")!;
const dialog = document.querySelector<HTMLDialogElement>("#dialog")!;
const formulaire = document.querySelector<HTMLFormElement>("#formulaire")!;
const btnRetour = document.querySelector<HTMLButtonElement>("#retour")!;


listeLivre.addEventListener("click", (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const id = e.target.getAttribute("data-id")!;
  bibliotheque.supprimerLivre(id);
  afficherBibliotheque(listeLivre, bibliotheque.livres);
});

listeLivre.addEventListener("change", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;
  const id = e.target.getAttribute("data-id")!;
  bibliotheque.validerLecture(id);
  afficherBibliotheque(listeLivre, bibliotheque.livres);
});

btn.addEventListener("click", () => {
  dialog.showModal();
});

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(formulaire);
  bibliotheque.ajouterLivre(
    String(form.get("titre")),
    String(form.get("auteur")),
    Number(form.get("pages")),
    form.has("lu"),
  );
  afficherBibliotheque(listeLivre, bibliotheque.livres);
  formulaire.reset();
  dialog.close();
});

btnRetour.addEventListener("click", () => {
  dialog.close();
});

afficherBibliotheque(listeLivre, bibliotheque.livres);
