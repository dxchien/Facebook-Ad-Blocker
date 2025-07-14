// ==UserScript==
// @name         Facebook Ad Blocker
// @namespace    http://tampermonkey.net/
// @version      2.10
// @description  Xóa bài quảng cáo trên Facebook News Feed
// @author       dxchien
// @match        *://www.facebook.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facebook.com
// @updateURL    https://raw.githubusercontent.com/dxchien/Facebook-Ad-Blocker/refs/heads/main/script.js
// @downloadURL  https://raw.githubusercontent.com/dxchien/Facebook-Ad-Blocker/refs/heads/main/script.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Start");

    function removeSponsoredPosts() {
        let adsFound = false;

        // find svg id
        var adDetect;
        const elements = document.querySelectorAll('div[class^="__fb-light-mode"] span');

        elements.forEach(el => {
            if(el.textContent.trim() == "Được tài trợ") {
                adDetect = 'aria-labelledby="' + el.id.trim() + '"';
            }
        });

        document.querySelectorAll('a[href]').forEach(link => {
            if (link.href.includes("?__cft__[0]=")) {
                const linkHTML = link.innerHTML;
                if (linkHTML.includes(adDetect)) {
                    let parent = link;
                    for (let i = 0; i < 12; i++) {
                        if (parent.parentElement) {
                            parent = parent.parentElement;
                        } else {
                            break;
                        }
                    }
                    if (parent) {
                        console.log("Removing sponsored post");
                        parent.remove();
                        adsFound = true;
                    }
                }
            }
        });
    }

    setInterval(removeSponsoredPosts, 1000);
})();
