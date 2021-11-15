const ReadPage = () => {
    const globalHeader = document.getElementById('global_header');
    const storeNav = document.querySelector('.responsive_store_nav_ctn_spacer');
    const blocks = Array.from(document.querySelectorAll('#tabletGrid .page_content_ctn > div')).filter((e,i) => i<=3);

    const blocksHTML = blocks.map(block => block.outerHTML);

    const htmlStr = `
        <div class="responsive_page_content">
            <div id="global_header">
                ${globalHeader.innerHTML}
            </div>
            <div class="responsive_page_template_content>
                <div class="game_page_background game">
                    <div class="page_content_ctn">
                        ${storeNav.innerHTML}     
                        ${blocksHTML}
                    </div>
                </div>
            </div>
        </div>
    `;

    const doc = new DOMParser().parseFromString(htmlStr, 'text/html');
    
    //檢測 Augmented Steam Node
    doc.querySelectorAll('*[id^=es]').forEach(node => {
        node.remove();
    });
    
    return doc;
};

export default ReadPage;