(()=>{"use strict";var e,n={998:()=>{const e=window.wp.blocks,n=JSON.parse('{"UU":"create-block/bento-ninja"}'),t=window.wp.i18n,i=window.wp.blockEditor,a=window.wp.components,o=window.ReactJSXRuntime;(0,e.registerBlockType)(n.UU,{edit:function({attributes:e,setAttributes:n}){const{align:l,mediaId:r,mediaUrl:s,mediaType:c,mediaWidth:d,isStackedOnMobile:g,verticalAlignment:b,imageFill:m}=e,p=(0,i.useBlockProps)({className:`bento-grid-layout${l?` align${l}`:""}${g?" is-stacked-on-mobile":""}${b?` is-vertically-aligned-${b}`:""}`}),h=[["core/image",{}],["core/heading",{level:3,placeholder:(0,t.__)("Enter heading...","bento-ninja")}],["core/paragraph",{placeholder:(0,t.__)("Enter content...","bento-ninja")}]];return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.BlockControls,{children:(0,o.jsx)(i.BlockAlignmentToolbar,{value:l,onChange:e=>n({align:e})})}),(0,o.jsx)(i.InspectorControls,{children:(0,o.jsxs)(a.PanelBody,{title:(0,t.__)("Grid Settings","bento-ninja"),children:[(0,o.jsx)(a.RangeControl,{label:(0,t.__)("Media Width %","bento-ninja"),value:d,onChange:e=>n({mediaWidth:e}),min:10,max:90}),(0,o.jsx)(a.ToggleControl,{label:(0,t.__)("Stack on mobile","bento-ninja"),checked:g,onChange:e=>n({isStackedOnMobile:e})}),(0,o.jsx)(a.SelectControl,{label:(0,t.__)("Vertical Alignment","bento-ninja"),value:b,options:[{label:(0,t.__)("Top","bento-ninja"),value:"top"},{label:(0,t.__)("Center","bento-ninja"),value:"center"},{label:(0,t.__)("Bottom","bento-ninja"),value:"bottom"}],onChange:e=>n({verticalAlignment:e})}),(0,o.jsx)(a.ToggleControl,{label:(0,t.__)("Image Fill","bento-ninja"),checked:m,onChange:e=>n({imageFill:e})})]})}),(0,o.jsx)("div",{...p,children:(0,o.jsx)("div",{className:"bento-grid-content",style:{gridTemplateColumns:`repeat(auto-fit, minmax(${d}%, 1fr))`,gap:"20px"},children:(0,o.jsx)(i.InnerBlocks,{allowedBlocks:["core/image","core/heading","core/paragraph","core/buttons"],template:h,templateLock:!1})})})]})},save:function({attributes:e}){const{align:n,mediaWidth:t,isStackedOnMobile:a,verticalAlignment:l,imageFill:r}=e,s=i.useBlockProps.save({className:`bento-grid-layout${n?` align${n}`:""}${a?" is-stacked-on-mobile":""}${l?` is-vertically-aligned-${l}`:""}${r?" is-image-fill":""}`});return(0,o.jsx)("div",{...s,children:(0,o.jsx)("div",{className:"bento-grid-content",style:{gridTemplateColumns:`repeat(auto-fit, minmax(${t}%, 1fr))`,gap:"20px"},children:(0,o.jsx)(i.InnerBlocks.Content,{})})})}})}},t={};function i(e){var a=t[e];if(void 0!==a)return a.exports;var o=t[e]={exports:{}};return n[e](o,o.exports,i),o.exports}i.m=n,e=[],i.O=(n,t,a,o)=>{if(!t){var l=1/0;for(d=0;d<e.length;d++){t=e[d][0],a=e[d][1],o=e[d][2];for(var r=!0,s=0;s<t.length;s++)(!1&o||l>=o)&&Object.keys(i.O).every((e=>i.O[e](t[s])))?t.splice(s--,1):(r=!1,o<l&&(l=o));if(r){e.splice(d--,1);var c=a();void 0!==c&&(n=c)}}return n}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[t,a,o]},i.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={57:0,350:0};i.O.j=n=>0===e[n];var n=(n,t)=>{var a,o,l=t[0],r=t[1],s=t[2],c=0;if(l.some((n=>0!==e[n]))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(s)var d=s(i)}for(n&&n(t);c<l.length;c++)o=l[c],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(d)},t=self.webpackChunkbento_ninja=self.webpackChunkbento_ninja||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var a=i.O(void 0,[350],(()=>i(998)));a=i.O(a)})();