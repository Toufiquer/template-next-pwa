if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"75611f268a5b301b2ca7e313d34652ac"},{url:"/_next/static/75EfXsCCqcIX6wIiKkl8M/_buildManifest.js",revision:"ed81f884a0add1e240527a7cf60d2a0c"},{url:"/_next/static/75EfXsCCqcIX6wIiKkl8M/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/341.2903e54d3da731c1.js",revision:"2903e54d3da731c1"},{url:"/_next/static/chunks/472.a3826d29d6854395.js",revision:"a3826d29d6854395"},{url:"/_next/static/chunks/4bd1b696-8c0cc2341ea47d3e.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/684-4a7833009616a1e6.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/940-faa6cdcd913dd674.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/998-6cad503120fd0d17.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/app/_not-found/page-5e71a95423c5221f.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/app/api/v1/users/route-91cd87bb02010f92.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/app/layout-16a29cc3345f19da.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/app/page-7b830ffafaa9facb.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/app/users-redux/page-9dc56ae863d77e30.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/framework-f593a28cde54158e.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/main-874aaa76894b314c.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/main-app-db93cf795db6e317.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/pages/_app-92f2aae776f86b9c.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/pages/_error-71d2b6a7b832d02a.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-456a7a242d83e9ca.js",revision:"75EfXsCCqcIX6wIiKkl8M"},{url:"/_next/static/css/34ea08ea277e237b.css",revision:"34ea08ea277e237b"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icons/icon-1280x720.png",revision:"9c67676f7119ef5878f66ef8b5013677"},{url:"/icons/icon-144x144.png",revision:"7644c54476a2e7348f4bf6224c630aea"},{url:"/icons/icon-192x192.png",revision:"c0b78041dbe48c9784bb8cda73783d1d"},{url:"/icons/icon-412x412.png",revision:"b37edef55441391a947f97760d8d2a64"},{url:"/icons/icon-412x915.png",revision:"b1790b353f3878df7f3bbcf75ea7b517"},{url:"/icons/icon-512x512.png",revision:"f2c905a1ddd7612111e73c21fe229880"},{url:"/manifest.json",revision:"2787ad0306cf2fce73d61610d23ef8b5"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
