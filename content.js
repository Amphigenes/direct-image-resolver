const url = location.href;

// ================= ImageVenue =================
if (url.includes('imagevenue.com')) {

    const tryRedirect = () => {
        const img = document.querySelector('img#main-image');
        if (img && img.src) {
            location.replace(img.src);
            return true;
        }
        return false;
    };

    // intento inmediato
    if (!tryRedirect()) {
        // observar el DOM hasta que aparezca la imagen
        const observer = new MutationObserver(() => {
            if (tryRedirect()) {
                observer.disconnect();
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

// ================= ImageTwist =================
} else if (url.includes('imagetwist.com')) {

    document.documentElement.style.display = 'none';

    const cleanURL = url + '?clean=' + Date.now();
    fetch(cleanURL, { cache: "no-store", credentials: "omit" })
        .then(r => r.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html");
            const link = doc.querySelector(
                'a[href*=".imagetwist.com/i/"]'
            );
            if (link?.href) {
                location.replace(link.href);
            } else {
                document.documentElement.style.display = '';
            }
        })
        .catch(() => {
            document.documentElement.style.display = '';
        });

// ================= Pixhost =================
} else if (url.includes('pixhost.to')) {

    document.documentElement.style.display = 'none';

    fetch(url, { cache: "no-store", credentials: "omit" })
        .then(r => r.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html");
            const img = doc.querySelector('img#image');
            if (img?.src) {
                location.replace(img.src);
            } else {
                document.documentElement.style.display = '';
            }
        })
        .catch(() => {
            document.documentElement.style.display = '';
        });
}
