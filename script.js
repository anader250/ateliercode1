// ==========================================================
// LES ŒUVRES : copiez un bloc pour en ajouter une.
// format : "portrait", "paysage" ou "carre"
// image  : "images/nom.jpg" pour une vraie image ("" = couleurs)
// ==========================================================
const oeuvres = [
  {
    titre: "La Joconde", artiste: "Léonard de Vinci", annee: "vers 1503",
    courant: "Renaissance", lieu: "Musée du Louvre, Paris", format: "portrait",
    texte: "Portrait à l'huile sur bois de peuplier, célèbre pour son sourire discret et son paysage flou à l'arrière-plan.",
    fond: "linear-gradient(160deg, #8a7650, #4f4228 55%, #2b3a2a)", image: "images/joconde.jpg"
  },
  {
    titre: "La Nuit étoilée", artiste: "Vincent van Gogh", annee: "1889",
    courant: "Post-impressionnisme", lieu: "Museum of Modern Art, New York", format: "paysage",
    texte: "Peint depuis l'asile de Saint-Rémy-de-Provence, un ciel tourbillonnant au-dessus d'un village endormi.",
    fond: "radial-gradient(circle at 70% 25%, #f2d46b 0 6%, transparent 7%), linear-gradient(180deg, #14306e, #2b57a8 60%, #0f1b3a)", image: "images/nuitétoilée.jpg"
  },
  {
    titre: "Le Cri", artiste: "Edvard Munch", annee: "1893",
    courant: "Expressionnisme", lieu: "Nasjonalmuseet, Oslo", format: "portrait",
    texte: "Une figure angoissée sur un pont, devant un ciel rouge. Munch en a réalisé plusieurs versions.",
    fond: "linear-gradient(170deg, #d4571c, #e8a13a 40%, #2a4a63 70%, #14202b)", image: "images/lecri.jpg"
  },
  {
    titre: "Impression, soleil levant", artiste: "Claude Monet", annee: "1872",
    courant: "Impressionnisme", lieu: "Musée Marmottan Monet, Paris", format: "paysage",
    texte: "Vue du port du Havre à l'aube. Son titre a donné son nom au mouvement impressionniste. Monet en était le précurseur.",
    fond: "radial-gradient(circle at 60% 40%, #f08a3c 0 5%, transparent 6%), linear-gradient(180deg, #a9bccb, #7d95a8 60%, #4a6275)", image: "images/impressionmonet.jpg"
  },
  {
    titre: "Le Baiser", artiste: "Gustav Klimt", annee: "1908",
    courant: "Art nouveau", lieu: "Belvédère, Vienne", format: "carre",
    texte: "Un couple enlacé, aux vêtements ornés de motifs dorés, emblème de la Sécession viennoise.",
    fond: "linear-gradient(135deg, #e0b94a, #a8791c 50%, #5b4210)", image: "images/lebaiser.jpg"
  },
  {
    titre: "La Persistance de la mémoire", artiste: "Salvador Dalí", annee: "1931",
    courant: "Surréalisme", lieu: "Museum of Modern Art, New York", format: "paysage",
    texte: "Des montres molles dans un paysage onirique, l'une des images les plus connues du surréalisme.",
    fond: "linear-gradient(180deg, #e7c36a, #d79c4a 55%, #6b4a2a 56%, #3a2a1a)", image: "images/persistancedali.jpg"
  },
  {
    titre: "La Jeune Fille à la perle", artiste: "Johannes Vermeer", annee: "vers 1665",
    courant: "Âge d'or néerlandais", lieu: "Mauritshuis, La Haye", format: "portrait",
    texte: "Une étude de visage peinte sur un fond sombre qui fait ressortir la lumière.",
    fond: "linear-gradient(160deg, #24384d, #131d29 70%)", image: "images/jeunefilleperle.jpg"
  },
  {
    titre: "Guernica", artiste: "Pablo Picasso", annee: "1937",
    courant: "Cubisme", lieu: "Museo Reina Sofía, Madrid", format: "paysage",
    texte: "Immense toile en noir, blanc et gris, réaction de Picasso au bombardement de la ville basque de Guernica.",
    fond: "linear-gradient(120deg, #e9e9e9, #8a8f94 45%, #2b2e32)", image: "images/guernica.jpg"
  }
];

// ==========================================================
// LE CODE : construit le mur et la fiche.
// ==========================================================
const mur = document.getElementById("mur");
const fiche = document.getElementById("fiche");

function peindre(element, o) {
  element.style.backgroundImage = o.image ? `url("${o.image}")` : o.fond;
}

oeuvres.forEach(o => {
  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = "cadre " + o.format;
  bouton.setAttribute("aria-label", o.titre + ", " + o.artiste + ". Ouvrir la fiche.");

  const passe = document.createElement("div");
  passe.className = "passe";

  const toile = document.createElement("div");
  toile.className = "toile";
  peindre(toile, o);

  if (!o.image) {
    const manque = document.createElement("span");
    manque.className = "manque";
    manque.textContent = "Image à ajouter";
    toile.appendChild(manque);
  }

  const infos = document.createElement("div");
  infos.className = "infos";
  const titre = document.createElement("strong");
  titre.textContent = o.titre;
  const auteur = document.createElement("span");
  auteur.textContent = o.artiste + ", " + o.annee;
  const lien = document.createElement("em");
  lien.textContent = "Lire la fiche";
  infos.append(titre, auteur, lien);

  toile.appendChild(infos);
  passe.appendChild(toile);
  bouton.appendChild(passe);
  bouton.addEventListener("click", () => ouvrir(o));
  mur.appendChild(bouton);
});

function ouvrir(o) {
  peindre(document.getElementById("f-toile"), o);
  document.getElementById("f-titre").textContent = o.titre;
  document.getElementById("f-artiste").textContent = o.artiste;
  document.getElementById("f-date").textContent = o.annee;
  document.getElementById("f-courant").textContent = o.courant;
  document.getElementById("f-lieu").textContent = o.lieu;
  document.getElementById("f-texte").textContent = o.texte;
  fiche.showModal();
}

document.getElementById("fermer").addEventListener("click", () => fiche.close());
fiche.addEventListener("click", e => { if (e.target === fiche) fiche.close(); });

// Projecteur : suit la souris
const ombre = document.getElementById("ombre");
window.addEventListener("mousemove", e => {
  ombre.style.setProperty("--x", e.clientX + "px");
  ombre.style.setProperty("--y", e.clientY + "px");
});