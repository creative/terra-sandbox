(this["webpackJsonpterra-sandbox"]=this["webpackJsonpterra-sandbox"]||[]).push([[13],{14:function(e,t){},16:function(e,t,a){e.exports={editor:"Editor_editor__2ZK6b"}},17:function(e,t,a){e.exports={"catalog-item":"CatalogItem_catalog-item__1yJ-b"}},18:function(e,t,a){e.exports={catalog:"Catalog_catalog__gB0WM",search:"Catalog_search__2Y6Ny",input:"Catalog_input__1Hzgz",components:"Catalog_components__xPgEm"}},19:function(e,t,a){e.exports={layers:"Layers_layers__rrXTR",resizer:"Layers_resizer__3c1N3",inactive:"Layers_inactive__hyypz"}},20:function(e,t,a){e.exports={sidebar:"Sidebar_sidebar__ybD5g",resizer:"Sidebar_resizer__3_P5P",inactive:"Sidebar_inactive__1W0Lr"}},23:function(e,t,a){e.exports={canvas:"Canvas_canvas__XH7zY",body:"Canvas_body__3F2s9"}},25:function(e,t,a){e.exports={placeholder:"Placeholder_placeholder__3FXn4",expand:"Placeholder_expand__1Py8x"}},26:function(e,t,a){e.exports={sandbox:"Sandbox_sandbox__oA_MS",header:"Sandbox_header__3YzRS",layout:"Sandbox_layout__625qo"}},28:function(e,t,a){e.exports=a(65)},4:function(e){e.exports=JSON.parse('{"terra-card:Card":{"packageName":"terra-card","name":"Card","version":"3.21.0","description":"","documentation":"http://engineering.cerner.com/terra-ui/#/components/terra-card/card/card","props":{"children":{"type":"node","required":false,"description":"Child Nodes","displayName":"Children"},"visuallyHiddenText":{"type":"string","required":false,"description":"Text that describes the badge to a screen reader. Use this\\nif more information is needed to accurately describe\\nthis card to screen reader users.","displayName":"Visually hidden text"}},"key":"terra-card:Card","exportType":"Default","importFrom":"terra-card","subcomponents":["terra-card:Card:Body"],"componentExports":[]},"terra-card:Card:Body":{"packageName":"terra-card","name":"Body","version":"3.21.0","description":"","documentation":"http://engineering.cerner.com/terra-ui/#/components/terra-card/card/card","props":{"children":{"type":"node","required":false,"description":"Child Nodes","displayName":"Children"},"hasPaddingVertical":{"type":"bool","required":false,"description":"Provides themeable padding vertical","displayName":"Has padding vertical","defaultValue":"true"},"hasPaddingHorizontal":{"type":"bool","required":false,"description":"Provides themeable padding horizontal","displayName":"Has padding horizontal","defaultValue":"true"},"isContentCentered":{"type":"bool","required":false,"description":"Sets the content of the card to be centered","displayName":"Content centered","defaultValue":"false"}},"key":"terra-card:Card:Body","parent":"terra-card:Card","exportType":"Subcomponent"},"terra-list:List":{"packageName":"terra-list","name":"List","version":"4.22.0","description":"","documentation":"http://engineering.cerner.com/terra-ui/#/components/terra-list/list/list","props":{"children":{"type":"node","required":false,"description":"The children list items passed to the component.","displayName":"Children"},"dividerStyle":{"type":"string","required":false,"description":"Whether or not the list\'s child items should have a border color applied.\\nOne of `\'none\'`, `\'standard\'`, `\'bottom-only\'`.","displayName":"Divider style","defaultValue":"none","options":[{"displayName":"None","value":"none","type":"string"},{"displayName":"Standard","value":"standard","type":"string"},{"displayName":"Bottom-only","value":"bottom-only","type":"string"}]},"paddingStyle":{"type":"string","required":false,"description":"The padding styling to apply to the child list item content.\\nOne of `\'none\'`, `\'standard\'`, `\'compact\'`.","displayName":"Padding style","defaultValue":"none","options":[{"displayName":"None","value":"none","type":"string"},{"displayName":"Standard","value":"standard","type":"string"},{"displayName":"Compact","value":"compact","type":"string"}]},"refCallback":{"type":"func","required":false,"description":"Function callback for the ref of the ul.","displayName":"Ref callback"},"role":{"type":"string","required":false,"description":"Accessibility role of the list, defaults to \'none\'. If creating a list with selectable items, pass \'listbox\'.","displayName":"Role","defaultValue":"none"}},"key":"terra-list:List","exportType":"Default","importFrom":"terra-list","subcomponents":[],"componentExports":["terra-list:List:Item","terra-list:List:Section","terra-list:List:SectionHeader","terra-list:List:Subsection","terra-list:List:SubsectionHeader"]},"terra-list:List:Item":{"packageName":"terra-list","name":"Item","version":"4.22.0","description":"","documentation":"http://engineering.cerner.com/terra-ui/#/components/terra-list/list/list","props":{"children":{"type":"node","required":false,"description":"The content element to be placed inside the list item for display.","displayName":"Children"},"hasChevron":{"type":"bool","required":false,"description":"Whether or not the list item has a disclosure indicator presented.","displayName":"Has chevron","defaultValue":"false"},"isSelected":{"type":"bool","required":false,"description":"Whether or not the list item should have selection styles applied.","displayName":"Selected","defaultValue":"false"},"isSelectable":{"type":"bool","required":false,"description":"Whether or not the list item should have styles to indicate the item is selectable.","displayName":"Selectable","defaultValue":"false"},"onSelect":{"type":"func","required":false,"description":"Function callback for when the appropriate click or key action is performed.\\nCallback contains the javascript evnt and prop metadata, e.g. onSelect(event, metaData)","displayName":"On select"},"refCallback":{"type":"func","required":false,"description":"Function callback for the ref of the li.","displayName":"Ref callback"}},"key":"terra-list:List:Item","parent":"terra-list:List","exportType":"Export"},"terra-list:List:Section":{"packageName":"terra-list","name":"Section","version":"4.22.0","description":"","documentation":"http://engineering.cerner.com/terra-ui/#/components/terra-list/list/list","props":{"children":{"type":"node","required":false,"description":"The children list items passed to the component.","displayName":"Children"},"isCollapsed":{"type":"bool","required":false,"description":"Whether or not the section is collapsed.","displayName":"Collapsed","defaultValue":"false"},"isCollapsible":{"type":"bool","required":false,"description":"Whether or not the section can be collapsed.","displayName":"Collapsible","defaultValue":"false"},"level":{"type":"number","required":false,"description":"Optionally sets the heading level. One of `1`, `2`, `3`, `4`, `5`, `6`.","displayName":"Level","defaultValue":"1","options":[{"displayName":"1","value":"1","type":"number"},{"displayName":"2","value":"2","type":"number"},{"displayName":"3","value":"3","type":"number"},{"displayName":"4","value":"4","type":"number"},{"displayName":"5","value":"5","type":"number"},{"displayName":"6","value":"6","type":"number"}]},"onSelect":{"type":"func","required":false,"description":"Function callback for when the appropriate click or key action is performed.\\nCallback contains the javascript event and prop metadata, e.g. onSelect(event, metaData)","displayName":"On select"},"refCallback":{"type":"func","required":false,"description":"Function callback passthrough for the ref of the section li.","displayName":"Ref callback"},"title":{"type":"string","required":true,"description":"Title text to be placed within the section header.","displayName":"Title"}},"key":"terra-list:List:Section","parent":"terra-list:List","exportType":"Export"},"terra-list:List:SectionHeader":{"packageName":"terra-list","name":"SectionHeader","version":"4.22.0","description":"","documentation":"http://engineering.cerner.com/terra-ui/#/components/terra-list/list/list","props":{"level":{"type":"number","required":false,"description":"Optionally sets the heading level. One of `1`, `2`, `3`, `4`, `5`, `6`.","displayName":"Level","defaultValue":"1","options":[{"displayName":"1","value":"1","type":"number"},{"displayName":"2","value":"2","type":"number"},{"displayName":"3","value":"3","type":"number"},{"displayName":"4","value":"4","type":"number"},{"displayName":"5","value":"5","type":"number"},{"displayName":"6","value":"6","type":"number"}]},"refCallback":{"type":"func","required":false,"description":"Function callback passthrough for the ref of the section li.","displayName":"Ref callback"},"title":{"type":"string","required":true,"description":"Title text to be placed within the section header.","displayName":"Title"}},"key":"terra-list:List:SectionHeader","parent":"terra-list:List","exportType":"Export"},"terra-list:List:Subsection":{"packageName":"terra-list","name":"Subsection","version":"4.22.0","description":"","documentation":"http://engineering.cerner.com/terra-ui/#/components/terra-list/list/list","props":{"children":{"type":"node","required":false,"description":"The children list items passed to the component.","displayName":"Children"},"isCollapsed":{"type":"bool","required":false,"description":"Whether or not the subsection is collapsed.","displayName":"Collapsed","defaultValue":"false"},"isCollapsible":{"type":"bool","required":false,"description":"Whether or not the subsection can be collapsed.","displayName":"Collapsible","defaultValue":"false"},"level":{"type":"number","required":false,"description":"Optionally sets the heading level. One of `2`, `3`, `4`, `5`, `6`.","displayName":"Level","defaultValue":"2","options":[{"displayName":"2","value":"2","type":"number"},{"displayName":"3","value":"3","type":"number"},{"displayName":"4","value":"4","type":"number"},{"displayName":"5","value":"5","type":"number"},{"displayName":"6","value":"6","type":"number"}]},"onSelect":{"type":"func","required":false,"description":"Function callback for when the appropriate click or key action is performed.\\nCallback contains the javascript evnt and prop metadata, e.g. onSelect(event, metaData)","displayName":"On select"},"refCallback":{"type":"func","required":false,"description":"Function callback passthrough for the ref of the section li.","displayName":"Ref callback"},"title":{"type":"string","required":true,"description":"Title text to be placed within the subsection header.","displayName":"Title"}},"key":"terra-list:List:Subsection","parent":"terra-list:List","exportType":"Export"},"terra-list:List:SubsectionHeader":{"packageName":"terra-list","name":"SubsectionHeader","version":"4.22.0","description":"","documentation":"http://engineering.cerner.com/terra-ui/#/components/terra-list/list/list","props":{"level":{"type":"number","required":false,"description":"Optionally sets the heading level. One of `2`, `3`, `4`, `5`, `6`.","displayName":"Level","defaultValue":"2","options":[{"displayName":"2","value":"2","type":"number"},{"displayName":"3","value":"3","type":"number"},{"displayName":"4","value":"4","type":"number"},{"displayName":"5","value":"5","type":"number"},{"displayName":"6","value":"6","type":"number"}]},"refCallback":{"type":"func","required":false,"description":"Function callback passthrough for the ref of the section li.","displayName":"Ref callback"},"title":{"type":"string","required":true,"description":"Title text to be placed within the subsection header.","displayName":"Title"}},"key":"terra-list:List:SubsectionHeader","parent":"terra-list:List","exportType":"Export"},"terra-overlay:Overlay":{"packageName":"terra-overlay","name":"Overlay","version":"3.34.0","description":"","documentation":"http://engineering.cerner.com/terra-ui/#/components/terra-overlay/overlay/overlay","props":{"children":{"type":"node","required":false,"description":"The content to be displayed within the overlay.","displayName":"Children"},"isOpen":{"type":"bool","required":false,"description":"Indicates if the overlay is open.","displayName":"Open","defaultValue":"false"},"backgroundStyle":{"type":"string","required":false,"description":"The visual theme to be applied to the overlay background. Accepts \'light\', \'dark\', and \'clear\'.","displayName":"Background style","defaultValue":"light","options":[{"displayName":"Light","value":"light","type":"string"},{"displayName":"Dark","value":"dark","type":"string"},{"displayName":"Clear","value":"clear","type":"string"}]},"isScrollable":{"type":"bool","required":false,"description":"Indicates if the overlay content is scrollable.","displayName":"Scrollable","defaultValue":"false"},"onRequestClose":{"type":"func","required":false,"description":"Callback triggered on overlay click or ESC key. Setting this enables close behavior.","displayName":"On request close"},"isRelativeToContainer":{"type":"bool","required":false,"description":"Indicates if the overlay is relative to the triggering container.","displayName":"Relative to container","defaultValue":"false"},"rootSelector":{"type":"string","required":false,"description":"Used to select the root mount DOM node. This is used to help prevent focus from shifting outside of the overlay when it is opened in a portal.","displayName":"Root selector","defaultValue":"#root"},"zIndex":{"type":"string","required":false,"description":"Z-Index layer to apply to the ModalContent and ModalOverlay. Valid values are \'100\', \'6000\', \'7000\', \'8000\', or \'9000\'.","displayName":"Z index","defaultValue":"100","options":[{"displayName":"100","value":"100","type":"string"},{"displayName":"6000","value":"6000","type":"string"},{"displayName":"7000","value":"7000","type":"string"},{"displayName":"8000","value":"8000","type":"string"},{"displayName":"9000","value":"9000","type":"string"}]}},"key":"terra-overlay:Overlay","exportType":"Default","importFrom":"terra-overlay","subcomponents":[],"componentExports":[]}}')},44:function(e,t){},50:function(e,t){},60:function(e,t){},65:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(10),o=a.n(i),l=a(3),s=a(13),c=a.n(s),d=a(1),p=a.n(d),u=a(16),m=a.n(u),y=p.a.bind(m.a),f=function(){return n.a.createElement("div",{className:y("editor")},"Editor")},h=a(17),v=a.n(h),b=p.a.bind(v.a),g=function(e){var t=e.identifier,a=e.name;return n.a.createElement("div",{className:b("catalog-item"),draggable:!0,onDragStart:function(e){e.dataTransfer.setData("terra-sandbox-data",JSON.stringify({identifier:t}))}},a)},N=a(18),k=a.n(N),x=a(4),O=p.a.bind(k.a),C=function(){var e=Object(r.useState)(""),t=Object(l.a)(e,2),a=t[0],i=t[1],o=Object.keys(x).map((function(e){var t=x[e],r=t.name;if("Default"===t.exportType&&r.toLowerCase().indexOf(a)>-1)return n.a.createElement(g,{key:e,identifier:e,name:r})}));return n.a.createElement("div",{className:O("catalog")},n.a.createElement("div",null,"Components"),n.a.createElement("div",{className:O("search")},n.a.createElement("input",{className:O("input"),onChange:function(e){i(e.target.value.toLowerCase())},placeholder:"Search Components",type:"Search",value:a})),n.a.createElement("div",{className:O("components")},o))},S=a(19),_=a.n(S),E=p.a.bind(_.a),w=function(){var e=Object(r.useState)("40%"),t=Object(l.a)(e,2),a=t[0],i=t[1],o=function(e){var t=e.clientY;i("".concat(window.innerHeight-t,"px"))},s=function e(){document.body.classList.remove(E("inactive")),document.documentElement.style.cursor="",window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",e)};return n.a.createElement("div",{className:E("layers"),style:{height:a}},n.a.createElement("div",{className:E("header"),onMouseDown:function(e){e.button>1||(document.documentElement.style.cursor="ns-resize",document.body.className+=E("inactive"),window.addEventListener("mousemove",o),window.addEventListener("mouseup",s))},role:"presentation"},n.a.createElement("div",{className:E("resizer")}),"Layers"))},q=a(20),L=a.n(q),T=p.a.bind(L.a),j=function(){var e=Object(r.useState)(230),t=Object(l.a)(e,2),a=t[0],i=t[1],o=function(e){var t=e.clientX;i(t)},s=function e(){document.body.classList.remove(T("inactive")),document.documentElement.style.cursor="",window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",e)};return n.a.createElement("div",{className:T("sidebar"),style:{width:"".concat(a,"px")}},n.a.createElement(C,null),n.a.createElement(w,null),n.a.createElement("div",{className:T("resizer"),onMouseDown:function(e){e.button>1||(document.documentElement.style.cursor="ew-resize",document.body.className+=T("inactive"),window.addEventListener("mousemove",o),window.addEventListener("mouseup",s))},role:"presentation"}))},D=a(21),V=a(22),P=function(){function e(){Object(D.a)(this,e)}return Object(V.a)(e,null,[{key:"generate",value:function(t,a){var r=a.root.map((function(r){return e.component(t,a[r])}));return n.a.createElement(n.a.Fragment,null,r)}},{key:"import",value:function(e,t){var a=t.name;if("terra-sandbox:Placeholder"===a)return e[a];var r=x[a],n=r.importFrom;return"Default"===r.exportType?e[n].default:void 0}},{key:"component",value:function(t,a){var r=a.id,i=a.props,o=e.import(t,a),l=e.properties(i);return n.a.createElement(o,Object.assign({key:r,id:r},l))}},{key:"properties",value:function(t){var a={};return Object.keys(t).forEach((function(r){var n=e.property(t[r]);void 0!==n&&null!==n&&(a[r]=n)})),a}},{key:"property",value:function(e){var t=e.type,a=e.value;if("Bool"===t)return a;console.log("WARNING: Unable to interpret property. ".concat(JSON.stringify(e)))}}]),e}(),F=a(23),z=a.n(F),H=p.a.bind(z.a),I=function(e){var t=e.imports,a=e.workspace;return n.a.createElement("div",{className:H("canvas")},n.a.createElement("div",{className:H("body")},P.generate(t,a)))},R=n.a.createContext(),W=a(7);function B(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function J(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?B(a,!0).forEach((function(t){Object(W.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):B(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var M=function(e,t){var a=e.imports,r=e.workspace,n=t.id,i=t.replacement,o=t.dynamicImport,l=J({},r[n],{name:i,props:{}});o&&(a[x[i].importFrom]=o);return J({},e,{imports:a,workspace:J({},r,Object(W.a)({},n,l))})},A=a(24),X=a.n(A),Y={"terra-card":function(){return a.e(24).then(a.t.bind(null,137,7))},"terra-list":function(){return a.e(22).then(a.t.bind(null,138,7))},"terra-overlay":function(){return a.e(23).then(a.t.bind(null,139,7))}},Z=a(25),U=a.n(Z),G=p.a.bind(U.a),K=function(e){var t=e.id,a=e.expand,i=Object(r.useState)("Drop Zone"),o=Object(l.a)(i,2),s=o[0],c=o[1],d=Object(r.useContext)(R);return n.a.createElement("div",{className:G("placeholder",{expand:a}),onDragOver:function(e){e.preventDefault()},onDragEnter:function(e){e.preventDefault()},onDrop:function(e){var a=e.dataTransfer.getData("terra-sandbox-data");if(a){var r=JSON.parse(a).identifier,n=x[r].importFrom;Y[n]().then((function(e){d({id:t,dynamicImport:e,type:"replace",replacement:r})})).catch((function(e){console.log(e),c("Whoops, something went wrong")}))}}},s)},Q=X()(),$={workspace:Object(W.a)({root:[Q]},Q,{id:Q,parent:"root",name:"terra-sandbox:Placeholder",type:"Component",props:{expand:{type:"Bool",value:!0}}}),imports:{"terra-sandbox:Placeholder":K}},ee=function(e,t){switch(t.type){case"replace":return M(e,t);default:return console.log("WARNING: No reducer action was specified."),e}},te=a(26),ae=a.n(te),re=p.a.bind(ae.a),ne=function(){var e=Object(r.useReducer)(ee,$),t=Object(l.a)(e,2),a=t[0],i=t[1],o=a.imports,s=a.workspace;return n.a.createElement(c.a,{locale:"en"},n.a.createElement("div",{className:re("sandbox")},n.a.createElement("div",{className:re("header")},"Header"),n.a.createElement("div",{className:re("layout")},n.a.createElement(R.Provider,{value:i},n.a.createElement(j,null),n.a.createElement(I,{imports:o,workspace:s}),n.a.createElement(f,null)))))};o.a.render(n.a.createElement(ne,null),document.getElementById("root"))}},[[28,18,21]]]);
//# sourceMappingURL=main.fe6ca373.chunk.js.map