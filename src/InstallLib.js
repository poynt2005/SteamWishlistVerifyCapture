const InstallLib = () => {
    let libCDN = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';

    const checkInstalled = () => typeof window.html2canvas == 'function';

    const install = cb => new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = libCDN;
        document.head.appendChild(s);

        s.addEventListener('load', () => {
            if(typeof cb == 'function'){
                cb(null);
            }
            return resolve();
        });

        s.addEventListener('error', () => {
            if(typeof cb == 'function'){
                cb(true);
            }
            return reject();
        });
    });

    return {
        checkInstalled,
        install,
        set libCDN(url){ libCDN = url; },
        get libCDN(){ return libCDN; } 
    }
};

export default InstallLib;