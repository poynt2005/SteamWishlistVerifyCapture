import ReadPage from "./ReadPage";
import BuildPage from "./BuildPage";

class SteamWishlistVerifyCapture {
    constructor(){
        this.originDOC = null;
        this.doc = null;
        this.domElement = null;
    }

    initPage(){
        this.originDOC = ReadPage();
    }

    async buildPage(cb){
        try{
            this.doc = await BuildPage(this.originDOC);

            const tempDIV = document.createElement('div');
            tempDIV.appendChild(this.doc.body);
            document.body.appendChild(tempDIV);

            this.domElement = await html2canvas(tempDIV);
            tempDIV.remove();

            if(typeof cb == 'function'){
                cb(null);
            }
        }
        catch(e){
            if(typeof cb == 'function'){
                return cb(e);
            }
            else {
                return Promise.reject(e);
            }
        }
    }

    downloadImage(cb){
        if(this.domElement == null){
            if(typeof cb == 'function'){
                return cb({message: 'Canvas not initalized'});
            }
            return Promise.reject({message: 'Canvas not initalized'});
        }

        return new Promise(resolve => {
            this.domElement.toBlob(blob => {
                const a = document.createElement('a');
                a.download = document.getElementById('appHubAppName').innerText.trim();
                a.href = URL.createObjectURL(blob);
                a.click();

                if(typeof cb == 'function'){
                    return cb(null);
                }

                resolve();
            }, 'image/png');
        });
    }

    copyToClipboard(cb){
        if(this.domElement == null){
            if(typeof cb == 'function'){
                return cb({message: 'Canvas not initalized'});
            }
            return Promise.reject({message: 'Canvas not initalized'});
        }

        return new Promise(resolve => {
            this.domElement.toBlob(blob => {
                window.navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(() => {
                    if(typeof cb == 'function'){
                        return cb(null);
                    }
                    resolve();
                });
            }, 'image/png');
        });
    }

    static get html2canvas(){ return html2canvas; }
};

export default SteamWishlistVerifyCapture;