/**
 * NutriCore — server Express (Etapa 4: Tehnici Web)
 * Porțiune: inițializare erori, rute, resurse statice, gestionare erori la randare
 */

const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

/** @type {{ obErori: object | null }} */
const obGlobal = { obErori: null };

const vectFoldere = ['temp', 'logs', 'backup', 'fisiere_uploatate'];

// --- Cerință Etapa 4: informații despre căi (întrebare teoretică: __dirname vs process.cwd()) ---
console.log('__dirname (director index.js):', __dirname);
console.log('__filename (cale completă index.js):', __filename);
console.log('process.cwd() (director de lucru curent):', process.cwd());

/**
 * Validare bonus: erori.json la pornire
 * @param {string} rawText conținut brut fișier
 * @param {object} data obiect parsat
 */
function valideazaErori(rawText, data) {
  const erori = [];

  if (!data || typeof data !== 'object') {
    console.error('Validare erori: JSON invalid.');
    process.exit(1);
  }

  const obligatorii = ['info_erori', 'cale_baza', 'eroare_default'];
  for (const k of obligatorii) {
    if (!(k in data)) {
      erori.push(`Lipsește proprietatea de nivel superior: "${k}".`);
    }
  }

  if (data.eroare_default) {
    const ed = data.eroare_default;
    for (const c of ['titlu', 'text', 'imagine']) {
      if (!(c in ed)) {
        erori.push(`eroare_default: lipsește "${c}".`);
      }
    }
  }

  const caleBazaAbs = path.join(__dirname, data.cale_baza || '');
  if (data.cale_baza && !fs.existsSync(caleBazaAbs)) {
    erori.push(`Directorul cale_baza nu există: ${caleBazaAbs}`);
  }

  // (f) chei duplicate în același obiect JSON — verificare pe șir brut (bloc eroare_default)
  const mDefault = rawText.match(/"eroare_default"\s*:\s*\{([^}]*)\}/s);
  if (mDefault) {
    const bloc = mDefault[1];
    const chei = ['titlu', 'text', 'imagine'];
    for (const c of chei) {
      const re = new RegExp(`"${c}"\\s*:`, 'g');
      const ap = bloc.match(re);
      if (ap && ap.length > 1) {
        erori.push(`Proprietatea "${c}" apare de mai multe ori în obiectul eroare_default (conținut brut).`);
      }
    }
  }

  // (g) identificatori duplicați în info_erori
  if (Array.isArray(data.info_erori)) {
    const map = new Map();
    data.info_erori.forEach((item, idx) => {
      const id = item.identificator;
      if (id === undefined) return;
      if (!map.has(id)) map.set(id, []);
      map.get(id).push({ index: idx, item });
    });
    map.forEach((lista, id) => {
      if (lista.length > 1) {
        const det = lista
          .map(
            (x) =>
              `  • index ${x.index}: titlu="${x.item.titlu}", text="${x.item.text}", imagine="${x.item.imagine}", status=${x.item.status}`
          )
          .join('\n');
        erori.push(`Identificator duplicat ${id}:\n${det}`);
      }
    });
  }

  // (e) fișiere imagine existente
  if (data.cale_baza && fs.existsSync(caleBazaAbs)) {
    const verificaImg = (nume) => {
      if (!nume) return;
      const p = path.join(caleBazaAbs, nume);
      if (!fs.existsSync(p)) {
        erori.push(`Imagine lipsă pentru eroare: ${p}`);
      }
    };
    if (data.eroare_default) verificaImg(data.eroare_default.imagine);
    if (Array.isArray(data.info_erori)) {
      data.info_erori.forEach((e) => verificaImg(e.imagine));
    }
  }

  if (erori.length) {
    console.error('--- Validare erori.json: eșec ---');
    erori.forEach((e) => console.error(e));
    process.exit(1);
  }
  console.log('Validare erori.json: OK.');
}

function initErori() {
  const caleJson = path.join(__dirname, 'erori.json');
  if (!fs.existsSync(caleJson)) {
    console.error('Fișierul erori.json lipsește. Aplicația se oprește.');
    process.exit(1);
  }
  const rawText = fs.readFileSync(caleJson, 'utf8');
  let data;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    console.error('erori.json nu este JSON valid:', e.message);
    process.exit(1);
  }

  valideazaErori(rawText, data);

  const caleBazaAbs = path.join(__dirname, data.cale_baza);
  const bazaUrl = data.cale_baza.replace(/\\/g, '/');
  /** Cale URL absolută pentru <img src> */
  const urlImg = (nume) => `/${bazaUrl}/${nume}`.replace(/\/+/g, '/');

  data.eroare_default.imagineAbs = urlImg(data.eroare_default.imagine);
  data.info_erori.forEach((e) => {
    e.imagineAbs = urlImg(e.imagine);
  });

  obGlobal.obErori = data;
}

/**
 * @param {import('express').Response} res
 * @param {number | null | undefined} identificator
 * @param {string} [titlu]
 * @param {string} [text]
 * @param {string} [imagine]
 */
function afisareEroare(res, identificator, titlu, text, imagine) {
  const o = obGlobal.obErori;
  if (!o) {
    res.status(500).send('Erori neinițializate.');
    return;
  }

  let titluF;
  let textF;
  let imgAbs;
  let statusCode = 500;

  if (identificator != null) {
    const info = o.info_erori.find((x) => x.identificator === identificator);
    if (info) {
      titluF = titlu !== undefined ? titlu : info.titlu;
      textF = text !== undefined ? text : info.text;
      imgAbs = imagine !== undefined ? (imagine.startsWith('/') ? imagine : `/${o.cale_baza}/${imagine}`.replace(/\/+/g, '/')) : info.imagineAbs;
      if (info.status) statusCode = identificator;
    } else {
      titluF = titlu !== undefined ? titlu : o.eroare_default.titlu;
      textF = text !== undefined ? text : o.eroare_default.text;
      imgAbs =
        imagine !== undefined
          ? imagine.startsWith('/')
            ? imagine
            : `/${o.cale_baza}/${imagine}`.replace(/\/+/g, '/')
          : o.eroare_default.imagineAbs;
    }
  } else {
    titluF = titlu !== undefined ? titlu : o.eroare_default.titlu;
    textF = text !== undefined ? text : o.eroare_default.text;
    imgAbs =
      imagine !== undefined
        ? imagine.startsWith('/')
          ? imagine
          : `/${o.cale_baza}/${imagine}`.replace(/\/+/g, '/')
        : o.eroare_default.imagineAbs;
  }

  res.status(statusCode).render(
    'pagini/eroare',
    {
      ...res.locals,
      titlu: titluF,
      text: textF,
      imagine: imgAbs,
      title: `${titluF} | NutriCore`,
      description: textF,
      keywords: 'nutricore, eroare',
    },
    (err2, html) => {
      if (err2) {
        console.error(err2);
        res.status(statusCode).send(`<pre>${titluF}\n${textF}</pre>`);
      } else {
        res.send(html);
      }
    }
  );
}

function creeazaFoldere() {
  vectFoldere.forEach((d) => {
    const p = path.join(__dirname, d);
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p, { recursive: true });
      console.log('Creat folder:', p);
    }
  });
}

// --- Pornire: inițializare ---
initErori();
creeazaFoldere();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.clientIp = req.ip || req.connection.remoteAddress || 'necunoscută';
  next();
});

// 400 — acces direct la .ejs
app.use((req, res, next) => {
  if (req.path.startsWith('/') && req.path.endsWith('.ejs')) {
    afisareEroare(res, 400);
    return;
  }
  next();
});

// Favicon — sendFile (evită răspunsuri fără HTML)
app.get('/favicon.ico', (req, res) => {
  const p = path.join(__dirname, 'resurse', 'ico', 'favicon.ico');
  res.sendFile(p, (err) => {
    if (err) {
      res.status(404).end();
    }
  });
});

// 403 — cerere către director în /resurse/ (cale terminată în /)
app.use((req, res, next) => {
  if (req.path.startsWith('/resurse') && req.path.endsWith('/') && req.path.length > '/resurse/'.length) {
    afisareEroare(res, 403);
    return;
  }
  next();
});

app.use('/resurse', express.static(path.join(__dirname, 'resurse')));

function randareCuCallback(res, view, locals) {
  res.render(view, { ...res.locals, ...locals }, (err, html) => {
    if (err) {
      if (err.message && err.message.startsWith('Failed to lookup view')) {
        afisareEroare(res, 404);
      } else {
        console.error(err);
        afisareEroare(res, undefined, 'Eroare la randare', err.message, '');
      }
    } else {
      res.send(html);
    }
  });
}

// Acasă — un singur app.get cu tablou de rute
app.get(['/', '/index', '/home'], (req, res) => {
  randareCuCallback(res, 'pagini/index', {
    title: 'NutriCore – Performanță și Nutriție | Magazin Suplimente Sportive',
    description:
      'NutriCore — Suplimentele tale de performanta, nutritie de incredere. Magazin nutritie sportiva cu proteine, creatina, vitamine si aminoacizi care chiar functioneaza.',
    keywords:
      'suplimente care chiar functioneaza, proteine pentru sala pret, magazin nutritie sportiva, vitamine fitness online, cele mai bune suplimente, nutritie de incredere, creatina, aminoacizi, bcaa, zer izolat, suplimente sportive',
  });
});

// Ultima rută: /pagină → pagini/pagină.ejs (fără a intercepta /resurse — deja servit static)
app.get('/:pagina', (req, res) => {
  let segment = req.params.pagina.replace(/\.html$/i, '');
  const view = `pagini/${segment}`;

  const titluri = {
    magazin: 'Magazin | NutriCore',
    blog: 'Blog & Ghiduri | NutriCore',
    contact: 'Contact | NutriCore',
    'galerie-statica': 'Galerie statică | NutriCore',
    'galerie-dinamica': 'Galerie dinamică | NutriCore',
    'despre-noi': 'Despre noi | NutriCore',
  };

  randareCuCallback(res, view, {
    title: titluri[segment] || `NutriCore — ${segment}`,
    description: 'NutriCore — suplimente sportive și nutriție de performanță.',
    keywords: 'nutricore, suplimente, fitness',
  });
});

app.listen(PORT, () => {
  console.log(`Server NutriCore pornit pe http://localhost:${PORT}`);
});
