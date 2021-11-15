const DownloadSource = async sources => {
    if(typeof window.GM == 'undefined' || typeof window.GM.xmlHttpRequest == 'undefined'){
        return Promise.reject({ 
            status: 'failed', 
            message: 'Not in the GM context' 
        });
    }

    const _download = src => new Promise(resolve => {
        const { id, url } = src;
        const dst = {
            status: '',
            data: { binary: null, id },
            message: ''
        };
        
        GM.xmlHttpRequest({
            url,
            method: 'GET',
            responseType: 'blob',
            onload(xhr){
                dst.status = 'success';
                dst.data.binary = xhr.response;
                return resolve(dst);
            },
            onerror(){
                dst.status = 'failed';
                dst.message = 'download resource failed';
                return resolve(dst);
            }
        });  
    });

    return Promise.all(sources.map(s => _download(s)));
};

export default DownloadSource;