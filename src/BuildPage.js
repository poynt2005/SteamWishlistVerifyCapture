import DownloadSource from "./DownloadSource";

const BuildPage = async doc => {
    const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

    const nodesWithSrc = doc.querySelectorAll('*[src]');
    const resources = [];

    nodesWithSrc.forEach(node => {
        const id = uuidv4();
        resources.push({ id, url: node.src });
        node.setAttribute('id', id);
        node.src = '';
    });

    let result;

    try{
        result = await DownloadSource(resources);
    }
    catch(e){
        return Promise.reject(e);
    }

    result.forEach(r => {
        const { status, data, message } = r;

        if(status == 'success') {
            const { binary, id } = data;
            const url = URL.createObjectURL(binary);
            doc.getElementById(id).src = url;
        }
        else {
            const { binary, id } = data;
            doc.getElementById(id).errorMessage = message;
        }
    });

    return doc;
};

export default BuildPage;