// ==UserScript==
// @name         Facebook Ad Blocker
// @namespace    http://tampermonkey.net/
// @version      2.7
// @description  Xóa bài quảng cáo trên Facebook News Feed
// @author       dxchien
// @match        *://www.facebook.com/*
// @updateURL    https://raw.githubusercontent.com/dxchien/Facebook-Ad-Blocker/refs/heads/main/script.js
// @downloadURL  https://raw.githubusercontent.com/dxchien/Facebook-Ad-Blocker/refs/heads/main/script.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeSponsoredPosts() {
        let adsFound = false;
        const sponsoredText = "Được tài trợ".split('').filter(char => char.trim() !== '').map(char => `>${char}<`).join(' ');

        document.querySelectorAll('a[href]').forEach(link => {
            if (link.href.includes("?__cft__[0]=")) {
                const linkHTML = link.innerHTML;
                if (sponsoredText.split(' ').every(segment => linkHTML.includes(segment))) {
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
