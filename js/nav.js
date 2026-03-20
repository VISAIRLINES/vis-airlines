// VIS Airlines — Shared Navigation
// Include this on every page: <script src="js/nav.js"></script>
// It will inject the nav, mobile drawer, and handle auth state.

document.addEventListener('DOMContentLoaded', function(){
    // Firebase config
    const FB_CONFIG = {
        apiKey:"AIzaSyBhn5Tv3iUCBYczQhfYnlHEjBIBDlPk0HQ",
        authDomain:"vis-airlines-b1677.firebaseapp.com",
        projectId:"vis-airlines-b1677",
        storageBucket:"vis-airlines-b1677.firebasestorage.app",
        messagingSenderId:"159896846581",
        appId:"1:159896846581:web:f7b41f69945004599e05bc"
    };

    // Init Firebase if not already
    if(!firebase.apps.length) firebase.initializeApp(FB_CONFIG);
    const auth = firebase.auth();

    // NAV HTML
    const navHTML = `
    <nav class="vis-nav" id="vis-nav">
        <div class="vis-nav-top">
            <button class="vis-nav-top-btn">PL Polski</button>
            <button class="vis-nav-top-btn">PLN</button>
            <a href="login.html" class="vis-nav-top-btn" id="vis-auth-1">Zaloguj się</a>
            <a href="register.html" class="vis-nav-top-btn vis-accent" id="vis-auth-2">Załóż konto</a>
        </div>
        <div class="vis-nav-bottom">
            <a href="index.html" class="vis-nav-logo">
                <div class="vis-nav-logo-mark">V</div>
                <div class="vis-nav-logo-text">VIS <em>Airlines</em></div>
            </a>
            <div class="vis-nav-links">
                <a href="routemap.html" class="vis-nav-link">Zaplanuj podróż</a>
                <a href="odprawa.html" class="vis-nav-link">Odpraw się</a>
                <a href="rezerwacje.html" class="vis-nav-link" id="vis-manage-link">Zarządzaj rezerwacją</a>
                <div class="vis-nav-dd" id="vis-dd">
                    <button class="vis-nav-link vis-nav-dd-btn" id="vis-dd-btn">Pomoc i informacje ▾</button>
                    <div class="vis-nav-mega" id="vis-dd-panel">
                        <div class="vis-mega-col">
                            <div class="vis-mega-title">Flota</div>
                            <a href="fleet.html" class="vis-mega-link">Przegląd floty</a>
                            <a href="fleet-e175.html" class="vis-mega-link">Embraer 175-E2</a>
                            <a href="fleet-a220-100.html" class="vis-mega-link">Airbus A220-100</a>
                        </div>
                        <div class="vis-mega-col">
                            <div class="vis-mega-title">Bagaż</div>
                            <a href="#" class="vis-mega-link">Zasady i wymiary</a>
                            <a href="#" class="vis-mega-link">Bagaż specjalny</a>
                        </div>
                        <div class="vis-mega-col">
                            <div class="vis-mega-title">Na pokładzie</div>
                            <a href="#" class="vis-mega-link">Posiłki i napoje</a>
                            <a href="#" class="vis-mega-link">Klasy podróży</a>
                            <a href="#" class="vis-mega-link">Wybór miejsca</a>
                        </div>
                        <div class="vis-mega-col">
                            <div class="vis-mega-title">Na lotnisku</div>
                            <a href="odprawa.html" class="vis-mega-link">Odprawa</a>
                            <a href="#" class="vis-mega-link">Status lotu</a>
                            <a href="#" class="vis-mega-link">Fast Track</a>
                            <a href="#" class="vis-mega-link">Saloniki biznesowe</a>
                        </div>
                        <div class="vis-mega-col">
                            <div class="vis-mega-title">Obsługa pasażera</div>
                            <a href="#" class="vis-mega-link">Zmiana i zwrot biletu</a>
                            <a href="#" class="vis-mega-link">Programy lojalnościowe</a>
                            <a href="#" class="vis-mega-link">Kontakt</a>
                        </div>
                    </div>
                </div>
            </div>
            <button class="vis-nav-hamburger" id="vis-hamburger">☰</button>
        </div>
    </nav>
    <div class="vis-mobile-overlay" id="vis-overlay"></div>
    <div class="vis-mobile-drawer" id="vis-drawer">
        <div class="vis-drawer-header">
            <a href="index.html" class="vis-nav-logo" style="gap:8px;">
                <div class="vis-nav-logo-mark" style="width:32px;height:32px;font-size:14px;">V</div>
                <div class="vis-nav-logo-text" style="font-size:18px;">VIS <em>Airlines</em></div>
            </a>
            <button class="vis-drawer-close" id="vis-drawer-close">✕</button>
        </div>
        <div class="vis-drawer-links">
            <a href="routemap.html" class="vis-drawer-link">Zaplanuj podróż</a>
            <a href="odprawa.html" class="vis-drawer-link">Odpraw się</a>
            <a href="rezerwacje.html" class="vis-drawer-link">Zarządzaj rezerwacją</a>
            <a href="fleet.html" class="vis-drawer-link">Flota</a>
        </div>
        <div style="height:1px;background:rgba(255,255,255,.06);margin:4px 20px;"></div>
        <div class="vis-drawer-links">
            <a href="login.html" class="vis-drawer-link" id="vis-mob-auth-1">Zaloguj się</a>
            <a href="register.html" class="vis-drawer-link" style="color:var(--gold-500);" id="vis-mob-auth-2">Załóż konto</a>
        </div>
    </div>`;

    // NAV CSS
    const navCSS = `
    .vis-nav{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;flex-direction:column;background:rgba(4,10,20,.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
    .vis-nav-top{display:flex;align-items:center;justify-content:flex-end;padding:0 48px;height:38px;border-bottom:1px solid rgba(255,255,255,.05);font-size:12px}
    .vis-nav-top-btn{background:none;border:none;color:var(--gray-300);font-size:12px;font-family:var(--font-body);padding:0 14px;height:38px;cursor:pointer;transition:color .2s;display:inline-flex;align-items:center;border-left:1px solid rgba(255,255,255,.06);text-decoration:none;white-space:nowrap}
    .vis-nav-top-btn:first-child{border-left:none}
    .vis-nav-top-btn:hover{color:var(--white)}
    .vis-accent{color:var(--gold-500)!important;font-weight:500}
    .vis-nav-bottom{display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:56px;border-bottom:1px solid rgba(255,255,255,.04)}
    .vis-nav-logo{display:flex;align-items:center;gap:12px;text-decoration:none}
    .vis-nav-logo-mark{width:40px;height:40px;border:2px solid var(--gold-600);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--gold-500)}
    .vis-nav-logo-text{font-family:var(--font-display);font-size:20px;font-weight:600;color:var(--white)}
    .vis-nav-logo-text em{font-style:normal;color:var(--gold-500)}
    .vis-nav-links{display:flex;gap:0;align-items:center;height:100%}
    .vis-nav-link{display:flex;align-items:center;height:100%;padding:0 18px;font-size:13px;font-weight:400;color:var(--gray-200);text-decoration:none;border-bottom:2px solid transparent;transition:all .2s;background:none;border-top:none;border-left:none;border-right:none;cursor:pointer;font-family:var(--font-body)}
    .vis-nav-link:hover{color:var(--white);border-bottom-color:var(--gold-500)}
    .vis-nav-dd{position:relative;height:100%}
    .vis-nav-dd-btn{cursor:pointer}
    .vis-nav-mega{position:absolute;top:100%;right:0;background:var(--navy-700);border:1px solid rgba(201,168,76,.15);border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5);padding:24px 28px;min-width:700px;z-index:200;display:none;grid-template-columns:repeat(5,1fr);gap:20px}
    .vis-nav-mega.show{display:grid;animation:visScaleIn .15s ease-out}
    @keyframes visScaleIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
    .vis-mega-title{font-size:13px;font-weight:600;color:var(--white);margin-bottom:12px}
    .vis-mega-link{display:block;font-size:13px;color:var(--gray-400);padding:5px 0;text-decoration:none;transition:color .15s}
    .vis-mega-link:hover{color:var(--gold-500)}
    .vis-nav-hamburger{display:none;background:none;border:none;color:var(--gold-500);font-size:22px;cursor:pointer;padding:8px}
    .vis-mobile-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:1100}
    .vis-mobile-overlay.show{display:block}
    .vis-mobile-drawer{position:fixed;top:0;right:-300px;width:300px;height:100vh;background:var(--navy-700);border-left:1px solid rgba(201,168,76,.12);z-index:1200;transition:right .3s cubic-bezier(.16,1,.3,1);overflow-y:auto}
    .vis-mobile-drawer.show{right:0}
    .vis-drawer-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.06)}
    .vis-drawer-close{background:none;border:none;color:var(--gray-300);font-size:20px;cursor:pointer;padding:8px}
    .vis-drawer-links{padding:12px 0}
    .vis-drawer-link{display:block;padding:14px 24px;font-size:15px;color:var(--gray-200);text-decoration:none;transition:all .15s}
    .vis-drawer-link:hover{background:rgba(201,168,76,.06);color:var(--gold-500)}
    @media(max-width:768px){
        .vis-nav-top{padding:0 16px}
        .vis-nav-bottom{padding:0 16px;height:50px}
        .vis-nav-links{display:none}
        .vis-nav-hamburger{display:block}
    }`;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = navCSS;
    document.head.appendChild(style);

    // Inject HTML at start of body
    const container = document.createElement('div');
    container.innerHTML = navHTML;
    while(container.firstChild){
        document.body.insertBefore(container.firstChild, document.body.firstChild);
    }

    // Remove any old nav elements that pages might have
    document.querySelectorAll('nav.nav').forEach(function(el){ el.remove(); });

    // === DROPDOWN ===
    var ddBtn = document.getElementById('vis-dd-btn');
    var ddPanel = document.getElementById('vis-dd-panel');
    ddBtn.addEventListener('click', function(e){
        e.stopPropagation();
        ddPanel.classList.toggle('show');
    });
    document.addEventListener('click', function(){
        ddPanel.classList.remove('show');
    });
    ddPanel.addEventListener('click', function(e){ e.stopPropagation(); });

    // === MOBILE DRAWER ===
    var hamburger = document.getElementById('vis-hamburger');
    var drawer = document.getElementById('vis-drawer');
    var overlay = document.getElementById('vis-overlay');
    var drawerClose = document.getElementById('vis-drawer-close');

    function openDrawer(){ drawer.classList.add('show'); overlay.classList.add('show'); document.body.style.overflow='hidden'; }
    function closeDrawer(){ drawer.classList.remove('show'); overlay.classList.remove('show'); document.body.style.overflow=''; }
    hamburger.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // === ZARZĄDZAJ REZERWACJĄ — force navigation ===
    document.getElementById('vis-manage-link').addEventListener('click', function(e){
        e.preventDefault();
        window.location.href = 'rezerwacje.html';
    });

    // === AUTH STATE ===
    auth.onAuthStateChanged(function(u){
        var a1 = document.getElementById('vis-auth-1');
        var a2 = document.getElementById('vis-auth-2');
        var m1 = document.getElementById('vis-mob-auth-1');
        var m2 = document.getElementById('vis-mob-auth-2');

        if(u){
            var name = u.displayName || u.email;

            // Desktop nav
            a1.textContent = '✈ ' + name;
            a1.href = 'rezerwacje.html';
            a1.style.color = 'var(--gray-200)';
            a1.onclick = function(e){ e.preventDefault(); window.location.href = 'rezerwacje.html'; };

            a2.textContent = 'Wyloguj się';
            a2.href = '#';
            a2.style.color = '#e74c3c';
            a2.className = 'vis-nav-top-btn';
            a2.onclick = function(e){ e.preventDefault(); auth.signOut().then(function(){ location.reload(); }); };

            // Mobile drawer
            if(m1){
                m1.textContent = '✈ ' + name;
                m1.href = 'rezerwacje.html';
            }
            if(m2){
                m2.textContent = 'Wyloguj się';
                m2.href = '#';
                m2.style.color = '#e74c3c';
                m2.onclick = function(e){ e.preventDefault(); auth.signOut().then(function(){ location.reload(); }); };
            }
        }
    });
});
