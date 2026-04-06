const url = location.href;

// ================= ImageVenue =================
if (url.includes('imagevenue.com')) {

    const isValidImage = (src) => {
        if (!src) return false;

        return (
            // dominio correcto
            (
                src.includes('cdno-data.imagevenue.com') ||
                src.match(/img\d+\.imagevenue\.com/)
            )
            &&
            // extensión válida
            (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))
        );
    };

    const tryRedirect = () => {
        // 1. prioridad: main-image
        const main = document.querySelector('#main-image');
        if (isValidImage(main?.src)) {
            location.replace(main.src);
            return true;
        }

        // 2. fallback: buscar en todas
        const img = [...document.images]
            .find(i => isValidImage(i.src));

        if (img) {
            location.replace(img.src);
            return true;
        }

        return false;
    };

    if (!tryRedirect()) {
        const observer = new MutationObserver(() => {
            if (tryRedirect()) observer.disconnect();
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
    
// ================= ImageBam =================
} else if (url.includes('imagebam.com')) {

    const tryRedirect = () => {
        const img = document.querySelector('img.main-image');

        if (img?.src && !img.src.includes('loader')) {
            location.replace(img.src);
            return true;
        }
        return false;
    };

    if (!tryRedirect()) {
        const observer = new MutationObserver(() => {
            if (tryRedirect()) observer.disconnect();
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }


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
