# NutriCore — Magazin de Suplimente Premium
### Proiect Semestrial · Materia: Tehnici Web

---

## Descrierea Proiectului

**NutriCore** este un magazin online de suplimente sportive și nutriție, construit ca proiect semestrial pentru materia *Tehnici Web*. Site-ul prezintă produse premium (proteine, creatină, vitamine, aminoacizi) organizate după obiectivele utilizatorului: Masă Musculară, Slăbire și Energie.



## Structura Proiectului

```
nutricore/
│
├── index.html              # Pagina principală (Hero, Categorii, Produse Featured)
├── produse.html            # Catalog produse cu filtrare după obiectiv
├── produs.html             # Pagina de detaliu produs (cu tabel nutrițional)
├── blog.html               # Blog cu articole despre nutriție și fitness
├── cos.html                # Coș de cumpărături
├── contact.html            # Formular de contact
│
├── css/
│   ├── reset.css           # CSS Reset pentru compatibilitate cross-browser
│   ├── variables.css       # Variabile CSS (culori, fonturi, spații)
│   ├── global.css          # Stiluri globale (tipografie, butoane, layout)
│   ├── header.css          # Navigație și header
│   ├── footer.css          # Footer
│   ├── home.css            # Stiluri specifice paginii principale
│   ├── produse.css         # Stiluri catalog și carduri de produs
│   ├── produs.css          # Stiluri pagina detaliu produs
│   ├── blog.css            # Stiluri secțiunea de blog
│   ├── cos.css             # Stiluri coș de cumpărături
│   └── contact.css         # Stiluri formular contact
│
├── js/
│   ├── main.js             # Logică generală (nav mobil, scroll, animații)
│   ├── produse.js          # Filtrare și sortare produse
│   ├── cos.js              # Gestionare coș (adăugare, ștergere, cantitate)
│   └── formular.js         # Validare formular contact
│
└── assets/
    ├── img/                # Imagini produse, hero, blog
    └── icons/              # Iconuri SVG
```

---

## Paleta de Culori (schema oficială — Etapa 2)

| Rol | Culoare | HEX |
|---|---|---|
| C1 — Highlight | Verde Lime Electric | `#A3E635` |
| C2 — Background | Negru Antracit / Dark Navy | `#111827` |
| C3 — Text | Alb Rece | `#F9FAFB` |
| C4 — Borduri | Gri Închis | `#374151` |
| C5 — Surface | Gri Petrol | `#1F2937` |

---

## Pagini și Funcționalități

### `index.html` — Acasă
- **Hero Section**: Headline de impact, CTA (Call-to-Action), imagine produs
- **Secțiunea "Obiective"**: Filtrare rapidă pe: Masă Musculară / Slăbire / Energie
- **Produse Featured**: Grilă cu top 6 produse recomandate
- **Secțiunea Avantaje**: Livrare rapidă, produse certificate, suport nutriționist
- **Newsletter Banner**: Formular de abonare

### `produse.html` — Catalog
- Sidebar cu filtre: Categorie, Obiectiv, Gamă de preț
- Grilă de carduri responsive (3 col desktop → 2 col tablet → 1 col mobil)
- Sortare: Preț crescător/descrescător, Popularitate, Noutăți
- Fiecare card include: imagine, nume, rating stele, preț, buton "Adaugă în Coș"

### `produs.html` — Detaliu Produs
- Galerie imagini produs
- Informații complete: descriere, gramaj, arome
- **Tabel nutrițional** (element specific cerut)
- Selector cantitate + buton "Adaugă în Coș"
- Secțiune "Produse similare"

### `blog.html` — Blog Fitness
- Grid articole cu imagine de copertă, titlu, preview text, dată și categorie
- Categorii: Nutriție / Antrenament / Rețete Fit / Suplimente
- Articol individual cu conținut bogat

### `cos.html` — Coș de Cumpărături
- Tabel cu produse adăugate (imagine, denumire, preț unitar, cantitate, subtotal)
- Modificare cantitate în timp real
- Calcul automat total + TVA
- Buton "Finalizare Comandă"

### `contact.html` — Contact
- Formular cu: Nume, Email, Subiect (select), Mesaj, buton Trimite
- Validare HTML5 + validare JavaScript custom
- Secțiune cu date de contact și hartă embed

---

## Etapele Proiectului

| Etapă | Conținut | Status |
|---|---|---|
| ✅ **Etapa 0** | Planificare, structură, documentație | **Finalizat** |
| ✅ **Etapa 1** | Structura HTML semantic — index.html complet | **Finalizat** |
| ✅ **Etapa 2** | Design CSS: schema cromatică, grid 8 zone, responsive | **Finalizat** |
| ⏳ **Etapa 3** | JavaScript (coș, filtre, validări, animații) | Urmează |
| ⏳ **Etapa 4** | Testare, optimizare, validare W3C | Urmează |

---

## Cerințe Academice Îndeplinite (pe etape)

### Etapa 0 — Planificare

- [x] Alegerea temei și titlul site-ului (NutriCore – Performanță și Nutriție)
- [x] Descrierea temei și motivația (nișă suplimente / nutriție sportivă)
- [x] Organizarea informațiilor (proteine, aminoacizi, vitamine, greutate optimă)
- [x] Hartă site (Acasă, Magazin, Produs, Blog, Contact — planificate)
- [x] Cuvinte cheie globale și per pagină (home / shop / blog)
- [x] Analiza competiției (tabel: ce preluăm / ce evităm)

### Etapa 1 — Structură HTML (`index.html`)

- [x] Structură proiect: folder, `index.html`, editor cu evidențiere sintaxă
- [x] `DOCTYPE`, `html lang="ro"`
- [x] `title` + meta: charset, autor, keywords, description (+ viewport)
- [x] Cuvinte cheie din meta prezente în conținutul paginii
- [x] Folder `resurse/`, subfolder `ico/`, favicon (RealFaviconGenerator), `msapplication-TileColor`
- [x] `body`: `<header>`, `<main>`, `<footer>`
- [x] Secționare: `section` / `article`, secțiuni imbricate, ierarhie corectă `h2`–`h4`
- [x] `hgroup` cu subtitlu
- [x] `nav` + listă neordonată, submeniu imbricat pentru „Acasă” (ancore interne)
- [x] Grupare: `p`, `blockquote`, `dl`
- [x] Secțiune evenimente: `ol` / `ul`, `<time datetime>`, `<b>` pentru denumiri
- [x] `figure` + `figcaption`, `picture` (3 variante mobil / tabletă / desktop), `img` cu `title`
- [x] Text semantic: `b`, `i`, `strong`, `em`, `s`, `ins`, `abbr`, `dfn`, `q`, `cite`
- [x] Linkuri: extern (tab nou), extern cu `#id` + `wbr`, început pagină, imagine mare, `download` cu nume fișier
- [x] YouTube: `iframe` + `div` cu 3 linkuri către același iframe
- [x] Tabel: `caption`, `thead`/`tbody`/`tfoot`, `th`, min. 5 rânduri / 4 coloane, `rowspan`/`colspan`
- [x] `details` / `summary` (FAQ)
- [x] `meter` (min. 2: valoare mică + valoare mare, atribute low/high/optimum)
- [x] `address`: `tel:`, link Maps, `mailto:`, WhatsApp; copyright `small`, `&copy;`, `time datetime`
- [x] **Bonus:** MathML (formulă proteine), iframe Google Maps, playlist YouTube (parametri)

### Etapa 2 — Design CSS

- [x] Schema cromatică documentată (5 culori + motiv psihologic — Adobe Color / Dark Mode)
- [x] Variabile CSS (`:root`) aliniate schemei oficiale
- [x] Layout complex **CSS Grid**: 8 zone + rând video, `grid-template-areas`
- [x] Layout responsive: ecran mare / mediu / mic (coloane și zone rearanjate)
- [x] Tipografie scalabilă (`rem`/`em`), diferențe mici între breakpoints, tranziții la resize
- [x] Tranziții pe hover (nav, carduri, detalii, linkuri)
- [x] **link-top:** fix jos-dreapta, gradient, border `dashed`, cerc care se rotește la hover, săgeată `&#8593;` centrată (fără imagini), tooltip CSS, `opacity` semi-transparent → opac
- [x] Flexbox: header, nav, elemente UI liniare
- [x] Fără overflow nedorit (tabel scroll orizontal unde e cazul)



*Ultima actualizare: Etapa 2 — Design CSS & Layout Grid*
