/**
 * NutriCore — Meniu mobil (Etapa 3)
 * Deschide / inchide panoul .nav-principal si actualizeaza aria pe hamburger.
 */
(function () {
    const btn = document.getElementById('btn-meniu');
    const nav = document.getElementById('nav-principal');
    if (!btn || !nav) return;

    function setDeschis(deschis) {
        nav.classList.toggle('nav-principal--deschis', deschis);
        btn.setAttribute('aria-expanded', deschis ? 'true' : 'false');
    }

    btn.addEventListener('click', function () {
        setDeschis(!nav.classList.contains('nav-principal--deschis'));
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            setDeschis(false);
        }
    });

    // Inchide meniul la redimensionare pe desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            setDeschis(false);
        }
    });
})();
