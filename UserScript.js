// ==UserScript==
// @name         Steam 擷取照片功能
// @namespace    https://gist.github.com/poynt2005
// @version      0.1
// @description  將遊戲添加入願望單之後，一鍵截圖
// @author       poynt2005
// @match        https://store.steampowered.com/app/*
// @grant        GM.xmlHttpRequest
// @require      https://html2canvas.hertzen.com/dist/html2canvas.min.js
// @require      https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.9/runtime.min.js
// @require      https://cdn.jsdelivr.net/gh/poynt2005/SteamWishlistVerifyCapture@latest/dist/steamwishlistverifycapture.min.js
// @run-at       document-end
// ==/UserScript==


(function(){
    var swl = new SteamWishlistVerifyCapture.default();

    //設為 false 將不會下載 video resource
    swl.isVideo = true;

    var refNode = document.getElementById('ignoreBtn').nextElementSibling;
    var btn = document.createElement('div');
    document.getElementById('queueActionsCtn').insertBefore(btn, refNode);
    btn.outerHTML = `
        <div id="capture-btn" class="queue_control_button queue_btn_follow" style="flex-grow: 0;">                                 
            <div class="btnv6_blue_hoverfade btn_medium queue_btn_active">
                <span id="capture-btn-text"> 截圖 </span>
            </div>
        </div>
    `;

    var captureBtn = document.getElementById('capture-btn');
    var captureBtnText = document.getElementById('capture-btn-text');

    captureBtn.addEventListener('click', function(evt){
        evt.preventDefault();

        if(swl.originDOC === null){
            swl.initPage();
        }

        if(captureBtn.isProcessing === 1){
            return;
        }

        var setToBusy = function(){
            captureBtn.isProcessing = 1;
            captureBtnText.innerText = '渲染中';
            captureBtn.style.cursor = 'not-allowed';
        };

        var setToAvailable = function(){
            captureBtn.isProcessing = 0;
            captureBtnText.innerText = '截圖';
            captureBtn.style.cursor = 'pointer';
        };

        setToBusy();

        var copyTo = function(){
            console.log("SWL: 正在生成圖像並置入剪貼簿...");
            swl.copyToClipboard(function(err){
                if(err){
                    console.error("SWL: " + err.message);
                    return setToAvailable();
                }
                console.log("SWL: 生成圖像並置入剪貼簿完成");
                setToAvailable();
            });
        };
        
        if(swl.domElement === null){
            console.log("SWL: 正在渲染畫布...");
            swl.buildPage(function(err){
                if(err){
                    console.error("SWL: " + err.message);
                    return setToAvailable();
                }
                console.log("SWL: 渲染畫布完成");
                copyTo();
            })
        }
        else {
            copyTo();
        }
    });
})();