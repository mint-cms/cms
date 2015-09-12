!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.mint=t()}}(function(){var t;return function e(t,n,i){function s(o,a){if(!n[o]){if(!t[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(r)return r(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var h=n[o]={exports:{}};t[o][0].call(h.exports,function(e){var n=t[o][1][e];return s(n?n:e)},h,h.exports,e,t,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(t,e,n){var i=t("../editor"),s=(t("v-utils/dom"),{components:{},register:function(t,e){this.components[t]=e},create:function(t,e){return this.components[t]?new this.components[t](e):!1},createComponent:function(t){if(!t.component&&!t.dataset.ignore){var e=t.dataset.component,n=s.create(e,t);if(!n)return console.warn('Component "'+e+'" does not exists!');var r=new i(null,{node:t,component:n});n.insertEditor(r),t.component=n,t.editor=r,t.classList.add("m-anchor")}}});e.exports=s},{"../editor":4,"v-utils/dom":23}],2:[function(t,e,n){function i(t){this.node=t,this.initialize()}var s=(t("v-utils/utils"),t("v-utils/extend")),r=t("../overlay");i.prototype={initialize:function(){},enable:function(){r.show(),this.view.activate()},disable:function(){r.hide(),this.view.deactivate()},insertEditor:function(t){this.editor=t,this.node.appendChild(t.node)},save:function(){},cancel:function(){}},i.extend=s(i),e.exports=i},{"../overlay":11,"v-utils/extend":25,"v-utils/utils":27}],3:[function(t,e,n){var i=t("../fields"),s=t("v-mvc/view"),r=(t("v-utils/extend"),t("v-utils/utils")),o=t("v-utils/dom");e.exports=s.extend({initialize:function(){this.fields=this.fields||{},this.nodes=this.nodes||{},this.lang=this.lang||{},this.initiateFields(this.node,this.fields),this.initiateForm(this.nodes),this.data.model.on("change",this.render.bind(this)),this.render()},initiateFields:function(t,e){var n=this;r.each(e,function(e,s){var r=e.type,a=o.find(e.target,t);e.name=s,n.nodes[s]=new i[r](a,e,n.lang[s])})},initiateForm:function(t){var e=this;this.form=o.node('<div class="m-hidden"></div>'),r.each(t,function(t){e.form.appendChild(t.field)}),this.node.insertBefore(this.form,this.node.children[0])},render:function(){var t=this.data.model.all();r.each(this.nodes,function(e,n){n in t&&e.set(t[n])})},collectData:function(){var t={};return r.each(this.nodes,function(e){t[e.name]=e.value()}),t},activate:function(){this.node.classList.add("m-editing"),this.form.classList.remove("m-hidden"),r.each(this.nodes,function(t){t.activate()})},deactivate:function(){this.node.classList.remove("m-editing"),this.form.classList.add("m-hidden"),r.each(this.nodes,function(t){t.deactivate()})}})},{"../fields":6,"v-mvc/view":20,"v-utils/dom":23,"v-utils/extend":25,"v-utils/utils":27}],4:[function(t,e,n){var i=t("v-mvc/view"),s=t("v-utils/dom"),r='<div class="m-editor m-dynamic"><a class="remove-button button">    <i class="fa fa-fw fa-trash"></i></a><a class="cancel-button button">    <i class="fa fa-fw fa-times"></i></a><a class="edit-button button">    <i class="fa fa-fw fa-pencil"></i></a><a class="save-button button">    <i class="fa fa-fw fa-hdd-o"></i></a></div>',o=i.extend({initialize:function(){this.node=s.node(r),this.buttons={edit:this.find(".edit-button"),save:this.find(".save-button"),remove:this.find(".remove-button"),cancel:this.find(".cancel-button")},this.setupEvents(),this.show(!0)},setupEvents:function(){this.bind(".edit-button","click",this.edit),this.bind(".save-button","click",this.save),this.bind(".remove-button","click",this.remove),this.bind(".cancel-button","click",this.cancel)},disable:function(){this.data.component.disable(),o.editing=!1,this.show(!0)},edit:function(){o.editing||(o.editing=!0,this.data.component.enable(),this.show(!1))},remove:function(){window.confirm("Are you sure you want to delete this entry?")&&(this.disable(),this.data.component.remove(),this.destroy())},save:function(){this.disable(),this.data.component.save()},cancel:function(){this.disable(),this.data.component.cancel()},destroy:function(){this.node.parentNode.removeChild(this.node)},show:function(t){this.buttons.edit.style.display=t?"":"none",this.buttons.remove.style.display=t?"":"none",this.buttons.save.style.display=t?"none":"",this.buttons.cancel.style.display=t?"none":"",this.data.component.notRemovable&&(this.buttons.remove.style.display="none")}});o.editing=!1,e.exports=o},{"v-mvc/view":20,"v-utils/dom":23}],5:[function(t,e,n){var i=t("v-utils/extend"),s=function(t,e,n){this.options=e,this.title=n||"",this.name=e.name,this.node=t,this.field=this.create(t),this.options.set&&(this.set=this.options.set)};s.prototype.create=function(t){return t},s.prototype.set=function(t){this.field.value=t,this.node&&(this.node.innerHTML=t)},s.prototype.activate=function(){},s.prototype.deactivate=function(){},s.prototype.value=function(){return this.field.value},s.extend=i(s),e.exports=s},{"v-utils/extend":25}],6:[function(t,e,n){e.exports={input:t("./input"),text:t("./text")}},{"./input":7,"./text":8}],7:[function(t,e,n){var i=t("v-utils/dom"),s=t("./field");e.exports=s.extend({create:function(t){var e=i.node('<input class="m-input-field m-field" placeholder="'+this.title+'">');return t&&(e.className+=" "+t.className),e},activate:function(){this.node&&this.node.classList.add("m-hidden")},deactivate:function(){this.node&&this.node.classList.remove("m-hidden")}})},{"./field":5,"v-utils/dom":23}],8:[function(t,e,n){var i=t("v-utils/dom"),s=t("./input");e.exports=s.extend({create:function(t){var e=i.node('<textarea class="m-text-field m-field" placeholder="'+this.title+'"></textarea>');return t&&(e.className+=" "+t.className),e},activate:function(){s.prototype.activate.call(this),this.field.style.height=this.field.scrollHeight+6+"px"}})},{"./input":7,"v-utils/dom":23}],9:[function(t,e,n){var i=t("./components/collection"),s=t("./settings"),r=t("v-utils/utils"),o=t("v-utils/dom");e.exports=function(e){s.assign(e),t("v-utils/ajax").base_url=s.get("baseurl"),r.toArray(o.findAll("[data-component]")).forEach(i.createComponent)}},{"./components/collection":1,"./settings":12,"v-utils/ajax":21,"v-utils/dom":23,"v-utils/utils":27}],10:[function(t,e,n){var i=null;e.exports=function(t,e){if("undefined"==typeof t)return i;if("string"!=typeof t)return void(i=t);var n=i;return t.split(".").forEach(function(t){"undefined"!=typeof n&&(n=n[t])}),"undefined"==typeof n&&e?t:n}},{}],11:[function(t,e,n){var i=t("v-utils/dom");e.exports={element:null,show:function(){null===this.element&&(this.element=i.node('<div class="m-hidden m-overlay"></div>'),document.body.appendChild(this.element)),this.element.classList.remove("m-hidden")},hide:function(){this.element&&this.element.classList.add("m-hidden")}}},{"v-utils/dom":23}],12:[function(t,e,n){var i={settings:{},get:function(t){return this.settings[t]?this.settings[t]:null},set:function(t,e){this.settings[t]=e},assign:function(t){this.settings=t}};e.exports=i},{}],13:[function(t,e,n){(function(n){var i={components:t("./core/components/collection"),component:t("./core/components/component"),settings:t("./core/settings"),editor:t("./core/editor"),fields:t("./core/fields"),field:t("./core/fields/field"),init:t("./core/init"),lang:t("./core/lang"),events:t("v-utils/events"),unique:t("v-utils/unique"),utils:t("v-utils/utils"),ajax:t("v-utils/ajax"),dom:t("v-utils/dom"),mvc:t("v-mvc")};i.component.view=t("./core/components/view"),n.markdown=t("marked"),e.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./core/components/collection":1,"./core/components/component":2,"./core/components/view":3,"./core/editor":4,"./core/fields":6,"./core/fields/field":5,"./core/init":9,"./core/lang":10,"./core/settings":12,marked:14,"v-mvc":17,"v-utils/ajax":21,"v-utils/dom":23,"v-utils/events":24,"v-utils/unique":26,"v-utils/utils":27}],14:[function(e,n,i){(function(e){(function(){function e(t){this.tokens=[],this.tokens.links={},this.options=t||d.defaults,this.rules=p.normal,this.options.gfm&&(this.options.tables?this.rules=p.tables:this.rules=p.gfm)}function s(t,e){if(this.options=e||d.defaults,this.links=t,this.rules=f.normal,this.renderer=this.options.renderer||new r,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=f.breaks:this.rules=f.gfm:this.options.pedantic&&(this.rules=f.pedantic)}function r(t){this.options=t||{}}function o(t){this.tokens=[],this.token=null,this.options=t||d.defaults,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options}function a(t,e){return t.replace(e?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function l(t){return t.replace(/&([#\w]+);/g,function(t,e){return e=e.toLowerCase(),"colon"===e?":":"#"===e.charAt(0)?"x"===e.charAt(1)?String.fromCharCode(parseInt(e.substring(2),16)):String.fromCharCode(+e.substring(1)):""})}function u(t,e){return t=t.source,e=e||"",function n(i,s){return i?(s=s.source||s,s=s.replace(/(^|[^\[])\^/g,"$1"),t=t.replace(i,s),n):new RegExp(t,e)}}function h(){}function c(t){for(var e,n,i=1;i<arguments.length;i++){e=arguments[i];for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t}function d(t,n,i){if(i||"function"==typeof n){i||(i=n,n=null),n=c({},d.defaults,n||{});var s,r,l=n.highlight,u=0;try{s=e.lex(t,n)}catch(h){return i(h)}r=s.length;var p=function(t){if(t)return n.highlight=l,i(t);var e;try{e=o.parse(s,n)}catch(r){t=r}return n.highlight=l,t?i(t):i(null,e)};if(!l||l.length<3)return p();if(delete n.highlight,!r)return p();for(;u<s.length;u++)!function(t){return"code"!==t.type?--r||p():l(t.text,t.lang,function(e,n){return e?p(e):null==n||n===t.text?--r||p():(t.text=n,t.escaped=!0,void(--r||p()))})}(s[u])}else try{return n&&(n=c({},d.defaults,n)),o.parse(e.lex(t,n),n)}catch(h){if(h.message+="\nPlease report this to https://github.com/chjj/marked.",(n||d.defaults).silent)return"<p>An error occured:</p><pre>"+a(h.message+"",!0)+"</pre>";throw h}}var p={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:h,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:h,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:h,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};p.bullet=/(?:[*+-]|\d+\.)/,p.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,p.item=u(p.item,"gm")(/bull/g,p.bullet)(),p.list=u(p.list)(/bull/g,p.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+p.def.source+")")(),p.blockquote=u(p.blockquote)("def",p.def)(),p._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",p.html=u(p.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,p._tag)(),p.paragraph=u(p.paragraph)("hr",p.hr)("heading",p.heading)("lheading",p.lheading)("blockquote",p.blockquote)("tag","<"+p._tag)("def",p.def)(),p.normal=c({},p),p.gfm=c({},p.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),p.gfm.paragraph=u(p.paragraph)("(?!","(?!"+p.gfm.fences.source.replace("\\1","\\2")+"|"+p.list.source.replace("\\1","\\3")+"|")(),p.tables=c({},p.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),e.rules=p,e.lex=function(t,n){var i=new e(n);return i.lex(t)},e.prototype.lex=function(t){return t=t.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(t,!0)},e.prototype.token=function(t,e,n){for(var i,s,r,o,a,l,u,h,c,t=t.replace(/^ +$/gm,"");t;)if((r=this.rules.newline.exec(t))&&(t=t.substring(r[0].length),r[0].length>1&&this.tokens.push({type:"space"})),r=this.rules.code.exec(t))t=t.substring(r[0].length),r=r[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?r:r.replace(/\n+$/,"")});else if(r=this.rules.fences.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"code",lang:r[2],text:r[3]||""});else if(r=this.rules.heading.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"heading",depth:r[1].length,text:r[2]});else if(e&&(r=this.rules.nptable.exec(t))){for(t=t.substring(r[0].length),l={type:"table",header:r[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:r[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:r[3].replace(/\n$/,"").split("\n")},h=0;h<l.align.length;h++)/^ *-+: *$/.test(l.align[h])?l.align[h]="right":/^ *:-+: *$/.test(l.align[h])?l.align[h]="center":/^ *:-+ *$/.test(l.align[h])?l.align[h]="left":l.align[h]=null;for(h=0;h<l.cells.length;h++)l.cells[h]=l.cells[h].split(/ *\| */);this.tokens.push(l)}else if(r=this.rules.lheading.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"heading",depth:"="===r[2]?1:2,text:r[1]});else if(r=this.rules.hr.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"hr"});else if(r=this.rules.blockquote.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"blockquote_start"}),r=r[0].replace(/^ *> ?/gm,""),this.token(r,e,!0),this.tokens.push({type:"blockquote_end"});else if(r=this.rules.list.exec(t)){for(t=t.substring(r[0].length),o=r[2],this.tokens.push({type:"list_start",ordered:o.length>1}),r=r[0].match(this.rules.item),i=!1,c=r.length,h=0;c>h;h++)l=r[h],u=l.length,l=l.replace(/^ *([*+-]|\d+\.) +/,""),~l.indexOf("\n ")&&(u-=l.length,l=this.options.pedantic?l.replace(/^ {1,4}/gm,""):l.replace(new RegExp("^ {1,"+u+"}","gm"),"")),this.options.smartLists&&h!==c-1&&(a=p.bullet.exec(r[h+1])[0],o===a||o.length>1&&a.length>1||(t=r.slice(h+1).join("\n")+t,h=c-1)),s=i||/\n\n(?!\s*$)/.test(l),h!==c-1&&(i="\n"===l.charAt(l.length-1),s||(s=i)),this.tokens.push({type:s?"loose_item_start":"list_item_start"}),this.token(l,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(r=this.rules.html.exec(t))t=t.substring(r[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===r[1]||"script"===r[1]||"style"===r[1]),text:r[0]});else if(!n&&e&&(r=this.rules.def.exec(t)))t=t.substring(r[0].length),this.tokens.links[r[1].toLowerCase()]={href:r[2],title:r[3]};else if(e&&(r=this.rules.table.exec(t))){for(t=t.substring(r[0].length),l={type:"table",header:r[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:r[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:r[3].replace(/(?: *\| *)?\n$/,"").split("\n")},h=0;h<l.align.length;h++)/^ *-+: *$/.test(l.align[h])?l.align[h]="right":/^ *:-+: *$/.test(l.align[h])?l.align[h]="center":/^ *:-+ *$/.test(l.align[h])?l.align[h]="left":l.align[h]=null;for(h=0;h<l.cells.length;h++)l.cells[h]=l.cells[h].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(l)}else if(e&&(r=this.rules.paragraph.exec(t)))t=t.substring(r[0].length),this.tokens.push({type:"paragraph",text:"\n"===r[1].charAt(r[1].length-1)?r[1].slice(0,-1):r[1]});else if(r=this.rules.text.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"text",text:r[0]});else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0));return this.tokens};var f={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:h,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:h,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};f._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,f._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,f.link=u(f.link)("inside",f._inside)("href",f._href)(),f.reflink=u(f.reflink)("inside",f._inside)(),f.normal=c({},f),f.pedantic=c({},f.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),f.gfm=c({},f.normal,{escape:u(f.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:u(f.text)("]|","~]|")("|","|https?://|")()}),f.breaks=c({},f.gfm,{br:u(f.br)("{2,}","*")(),text:u(f.gfm.text)("{2,}","*")()}),s.rules=f,s.output=function(t,e,n){var i=new s(e,n);return i.output(t)},s.prototype.output=function(t){for(var e,n,i,s,r="";t;)if(s=this.rules.escape.exec(t))t=t.substring(s[0].length),r+=s[1];else if(s=this.rules.autolink.exec(t))t=t.substring(s[0].length),"@"===s[2]?(n=":"===s[1].charAt(6)?this.mangle(s[1].substring(7)):this.mangle(s[1]),i=this.mangle("mailto:")+n):(n=a(s[1]),i=n),r+=this.renderer.link(i,null,n);else if(this.inLink||!(s=this.rules.url.exec(t))){if(s=this.rules.tag.exec(t))!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(s[0])&&(this.inLink=!1),t=t.substring(s[0].length),r+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):a(s[0]):s[0];else if(s=this.rules.link.exec(t))t=t.substring(s[0].length),this.inLink=!0,r+=this.outputLink(s,{href:s[2],title:s[3]}),this.inLink=!1;else if((s=this.rules.reflink.exec(t))||(s=this.rules.nolink.exec(t))){if(t=t.substring(s[0].length),e=(s[2]||s[1]).replace(/\s+/g," "),e=this.links[e.toLowerCase()],!e||!e.href){r+=s[0].charAt(0),t=s[0].substring(1)+t;continue}this.inLink=!0,r+=this.outputLink(s,e),this.inLink=!1}else if(s=this.rules.strong.exec(t))t=t.substring(s[0].length),r+=this.renderer.strong(this.output(s[2]||s[1]));else if(s=this.rules.em.exec(t))t=t.substring(s[0].length),r+=this.renderer.em(this.output(s[2]||s[1]));else if(s=this.rules.code.exec(t))t=t.substring(s[0].length),r+=this.renderer.codespan(a(s[2],!0));else if(s=this.rules.br.exec(t))t=t.substring(s[0].length),r+=this.renderer.br();else if(s=this.rules.del.exec(t))t=t.substring(s[0].length),r+=this.renderer.del(this.output(s[1]));else if(s=this.rules.text.exec(t))t=t.substring(s[0].length),r+=this.renderer.text(a(this.smartypants(s[0])));else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}else t=t.substring(s[0].length),n=a(s[1]),i=n,r+=this.renderer.link(i,null,n);return r},s.prototype.outputLink=function(t,e){var n=a(e.href),i=e.title?a(e.title):null;return"!"!==t[0].charAt(0)?this.renderer.link(n,i,this.output(t[1])):this.renderer.image(n,i,a(t[1]))},s.prototype.smartypants=function(t){return this.options.smartypants?t.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):t},s.prototype.mangle=function(t){if(!this.options.mangle)return t;for(var e,n="",i=t.length,s=0;i>s;s++)e=t.charCodeAt(s),Math.random()>.5&&(e="x"+e.toString(16)),n+="&#"+e+";";return n},r.prototype.code=function(t,e,n){if(this.options.highlight){var i=this.options.highlight(t,e);null!=i&&i!==t&&(n=!0,t=i)}return e?'<pre><code class="'+this.options.langPrefix+a(e,!0)+'">'+(n?t:a(t,!0))+"\n</code></pre>\n":"<pre><code>"+(n?t:a(t,!0))+"\n</code></pre>"},r.prototype.blockquote=function(t){return"<blockquote>\n"+t+"</blockquote>\n"},r.prototype.html=function(t){return t},r.prototype.heading=function(t,e,n){return"<h"+e+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+t+"</h"+e+">\n"},r.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},r.prototype.list=function(t,e){var n=e?"ol":"ul";return"<"+n+">\n"+t+"</"+n+">\n"},r.prototype.listitem=function(t){return"<li>"+t+"</li>\n"},r.prototype.paragraph=function(t){return"<p>"+t+"</p>\n"},r.prototype.table=function(t,e){return"<table>\n<thead>\n"+t+"</thead>\n<tbody>\n"+e+"</tbody>\n</table>\n"},r.prototype.tablerow=function(t){return"<tr>\n"+t+"</tr>\n"},r.prototype.tablecell=function(t,e){var n=e.header?"th":"td",i=e.align?"<"+n+' style="text-align:'+e.align+'">':"<"+n+">";return i+t+"</"+n+">\n"},r.prototype.strong=function(t){return"<strong>"+t+"</strong>"},r.prototype.em=function(t){return"<em>"+t+"</em>"},r.prototype.codespan=function(t){return"<code>"+t+"</code>"},r.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},r.prototype.del=function(t){return"<del>"+t+"</del>"},r.prototype.link=function(t,e,n){if(this.options.sanitize){try{var i=decodeURIComponent(l(t)).replace(/[^\w:]/g,"").toLowerCase()}catch(s){return""}if(0===i.indexOf("javascript:")||0===i.indexOf("vbscript:"))return""}var r='<a href="'+t+'"';return e&&(r+=' title="'+e+'"'),r+=">"+n+"</a>"},r.prototype.image=function(t,e,n){var i='<img src="'+t+'" alt="'+n+'"';return e&&(i+=' title="'+e+'"'),i+=this.options.xhtml?"/>":">"},r.prototype.text=function(t){return t},o.parse=function(t,e,n){var i=new o(e,n);return i.parse(t)},o.prototype.parse=function(t){this.inline=new s(t.links,this.options,this.renderer),this.tokens=t.reverse();for(var e="";this.next();)e+=this.tok();return e},o.prototype.next=function(){return this.token=this.tokens.pop()},o.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},o.prototype.parseText=function(){for(var t=this.token.text;"text"===this.peek().type;)t+="\n"+this.next().text;return this.inline.output(t)},o.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var t,e,n,i,s,r="",o="";for(n="",t=0;t<this.token.header.length;t++)i={header:!0,align:this.token.align[t]},n+=this.renderer.tablecell(this.inline.output(this.token.header[t]),{header:!0,align:this.token.align[t]});for(r+=this.renderer.tablerow(n),t=0;t<this.token.cells.length;t++){for(e=this.token.cells[t],n="",s=0;s<e.length;s++)n+=this.renderer.tablecell(this.inline.output(e[s]),{header:!1,align:this.token.align[s]});o+=this.renderer.tablerow(n)}return this.renderer.table(r,o);case"blockquote_start":for(var o="";"blockquote_end"!==this.next().type;)o+=this.tok();return this.renderer.blockquote(o);case"list_start":for(var o="",a=this.token.ordered;"list_end"!==this.next().type;)o+=this.tok();return this.renderer.list(o,a);case"list_item_start":for(var o="";"list_item_end"!==this.next().type;)o+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(o);case"loose_item_start":for(var o="";"list_item_end"!==this.next().type;)o+=this.tok();return this.renderer.listitem(o);case"html":var l=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(l);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},h.exec=h,d.options=d.setOptions=function(t){return c(d.defaults,t),d},d.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new r,xhtml:!1},d.Parser=o,d.parser=o.parse,d.Renderer=r,d.Lexer=e,d.lexer=e.lex,d.InlineLexer=s,d.inlineLexer=s.output,d.parse=d,"undefined"!=typeof n&&"object"==typeof i?n.exports=d:"function"==typeof t&&t.amd?t(function(){return d}):this.marked=d}).call(function(){return this||("undefined"!=typeof window?window:e)}())}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(t,e,n){var i=t("v-utils/ajax");e.exports={fetch:function(t,e,n,s){var r=t.options;i.get([r.baseurl,r.get,e]).success(function(e,i){var r=isNaN(n),o=t.create(t.parse(i),n);r||(s&&s(n),t.emit("get",o))}).send()},insert:function(t,e,n){var s=t.options;i.post([s.baseurl,s.insert],e.all()).success(function(i,s){e.id=s.id,s.data&&e.merge(s.data),n&&n(e),t.emit("add",e)}).send()},update:function(t,e,n){var s=t.options;i.post([s.baseurl,s.update,e.id],e.all()).success(function(i,s){s.data&&e.merge(s.data),n&&n(e),t.emit("update",e)}).send()},remove:function(t,e,n){var s=t.options;i.post([s.baseurl,s.remove,e.id]).success(function(){e.destroy(),n&&n(e),t.emit("remove",e)}).send()}}},{"v-utils/ajax":21}],16:[function(t,e,n){var i=t("v-utils/utils"),s=t("v-utils/events"),r=t("v-utils/extend"),o=t("./model"),a=function(t){this.models=t||{}};s(a.prototype),a.prototype.get=function(t){return this.models[t]},a.prototype.add=function(t){this.models[t.id]=t,this.emit("add",t)},a.prototype.remove=function(t){var e=this.models[t];delete this.models[t],this.emit("remove",e)},a.prototype.bootstrap=function(t){var e=this,n=function(t,n){t.id=t.id||n;var i=new o(t);e.models[i.id]=i};Array.isArray(t)?t.forEach(n):i.each(t,n)},a.prototype.forEach=function(t){i.each(this.models,t)},a.prototype.bindTo=function(t){var e=this.add.bind(this);t.on("get",e),t.on("add",e),t.on("remove",this.remove.bind(this))},a.extend=r(a),e.exports=a},{"./model":19,"v-utils/events":24,"v-utils/extend":25,"v-utils/utils":27}],17:[function(t,e,n){e.exports={collection:t("./collection"),mapper:t("./mapper"),model:t("./model"),view:t("./view")}},{"./collection":16,"./mapper":18,"./model":19,"./view":20}],18:[function(t,e,n){var i=t("v-utils/events"),s=t("v-utils/extend"),r=t("v-utils/utils"),o=t("./model"),a={baseurl:"/",adapter:t("./adapters/ajax"),model:o,get:"get",insert:"add",update:"edit",remove:"remove"},l=function(t){this.options=r.merge(a,t),this.adapter=this.options.adapter};i(l.prototype),l.prototype.parse=function(t){return t},l.prototype.create=function(t,e){return e&&e instanceof o?(e.merge(t),e):new this.options.model(t)},l.prototype.fetch=function(t,e,n){this.adapter.fetch(this,t,e,n)},l.prototype.insert=function(t,e){this.adapter.insert(this,t,e)},l.prototype.update=function(t,e){this.adapter.update(this,t,e)},l.prototype.save=function(t,e){t.isNew()?this.insert(t,e):this.update(t,e)},l.prototype.remove=function(t,e){this.adapter.remove(this,t,e)},l.prototype.sync=function(t){t.forEach(function(e){e.isNew()?self.insert(e):e.isEmpty()?(self.remove(e),t.remove(e.id)):e.isDirty()&&self.update(e)})},l.extend=s(l),e.exports=l},{"./adapters/ajax":15,"./model":19,"v-utils/events":24,"v-utils/extend":25,"v-utils/utils":27}],19:[function(t,e,n){var i=t("v-utils/events"),s=t("v-utils/utils"),r=t("v-utils/unique")(),o=t("v-utils/extend"),a=function(t){var e=t&&t.id?t.id:-r();t=t||{},t.id=e,this.assign(t),this.previous=s.merge({},this.data)};i(a.prototype),a.prototype.get=function(t){return this.data[t]?this.data[t]:!1},a.prototype.set=function(t,e){this.data[t]=e,this.emit("change")},a.prototype.merge=function(t){this.assign(t),this.emit("change")},a.prototype.assign=function(t){t.id&&(this.id=t.id,delete t.id),this.data=s.merge(this.data,t)},a.prototype.apply=function(){this.previous=s.merge({},this.data)},a.prototype.revert=function(){this.data=s.merge({},this.previous),this.emit("change")},a.prototype.all=function(){return s.merge(this.data,{})},a.prototype.diff=function(){return s.diff(this.previous,this.data)},a.prototype.destroy=function(){this.data={},this.id=-r(),this.emit("destroy")},a.prototype.reset=function(t){this.data=s.merge({},t),this.emit("change")},a.prototype.isNew=function(){return this.id<0},a.prototype.isDirty=function(){return Object.keys(this.diff()).length>0},a.prototype.isEmpty=function(){return 0===Object.keys(this.data).length},a.extend=o(a),e.exports=a},{"v-utils/events":24,"v-utils/extend":25,"v-utils/unique":26,"v-utils/utils":27}],20:[function(t,e,n){var i=t("v-utils/extend"),s=t("v-utils/dom"),r=function(t,e){this.node=t,this.data=e,this.initialize()};r.prototype.initialize=function(){},r.prototype.find=function(t){var e=s.find(t,this.node);return e||console.warn('Could not find node by selector "'+t+'"'),e},r.prototype.bind=function(t,e,n){var i=t instanceof Node?t:this.find(t);return i?void s.on(i,e,n.bind(this)):console.warn("Node is not suitable for attaching events!")},r.extend=i(r),e.exports=r},{"v-utils/dom":23,"v-utils/extend":25}],21:[function(t,e,n){var i=t("./request"),s={};s.request=function(t,e,n){var s=new i(this.url(t),e,n);return s.on("data",function(t,e){"ok"===e.status?s.emit("success",t,e):s.emit("error",t,e.message)}),s.on("error",function(t,e){console.error(e)}),s},["get","post","put","delete"].forEach(function(t){var e=t.toUpperCase();s[t]=function(t,n){return this.request(t,e,n)}}),s.url=function(t){return t=Array.isArray(t)?["",s.base_url].concat(t):["",s.base_url,t],t.join("/").replace(/\/+/,"/")},s.base_url="",e.exports=s},{"./request":22}],22:[function(t,e,n){var i=t("../utils"),s=t("../events"),r=function(t,e,n){this.method=e||"GET",this.data=n||{},this.url=t,this.headers={"Content-type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}};r.prototype={send:function(){var t=new XMLHttpRequest,e=this.method.toUpperCase(),n=this.query(this.data),s=this.url,r=this;"GET"===e&&n&&(s+=(-1===s.indexOf("?")?"?":"&")+n),t.open(e,s),t.onreadystatechange=function(){var e=this.readyState,n=this.status;if(4===e&&200===n){var i;try{i=JSON.parse(this.responseText)}catch(s){r.emit("error",t,"Invalid JSON")}i&&r.emit("data",this,i)}},t.onerror=function(){r.emit("error",t,"Connection error")},i.each(this.headers,function(e,n){t.setRequestHeader(n,e)}),t.send(n)},success:function(t){return this.on("success",t),this},error:function(t){return this.on("error",t),this},header:function(t,e){return this.headers[t]=e,this},query:function(t){var e="",n=Object.keys(t);return n.forEach(function(n,i){e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&"}),e.substr(0,e.length-1)}},s(r.prototype),e.exports=r},{"../events":24,"../utils":27}],23:[function(t,e,n){var i={},s=document.createElement("div");i.on=function(t,e,n){t=t||document,t.addEventListener(e,n)},i.find=function(t,e){return(e||document).querySelector(t)},i.findAll=function(t,e){return(e||document).querySelectorAll(t)},i.node=function(t){return t=t.trim(),"<"!==t[0]&&">"!==t[t.length-1]?document.createElement(t):(s.innerHTML=t,s.children[0])},i.insertAfter=function(t,e){t.parentNode.insertBefore(e,t.nextSibling)},e.exports=i},{}],24:[function(t,e,n){e.exports=function(t){t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=Array.prototype.slice.call(arguments,1);this._events[t].forEach(function(t){t&&t.apply(t,e)})}}}},{}],25:[function(t,e,n){var i=t("./utils"),s=function(t){return function(e){var n=e.constructor,r=function(){t.apply(this,arguments),n&&n.apply(this,arguments)};return r.prototype=Object.create(t.prototype),i.each(e,function(t,e){"constructor"!==e&&(r.prototype[e]=t)}),r.extend=s(r),r}};e.exports=s},{"./utils":27}],26:[function(t,e,n){e.exports=function(t){return t=t||(t=0),function(){return++t}}},{}],27:[function(t,e,n){var i={};i.each=function(t,e){for(var n in t)t.hasOwnProperty(n)&&e(t[n],n)},i.diff=function(t,e){var n={};for(var i in e)("undefined"==typeof t[i]||e[i]!==t[i])&&(n[i]=e[i]);return n},i.merge=function(t,e){var n,i={};for(n in t)i[n]=t[n];for(n in e)i[n]=e[n];return i},i.extend=function(t,e){for(var n in e)t[n]=e[n]},i.toArray=function(t){return Array.prototype.slice.call(t);
},i.pick=function(t,e){var n={};return e.forEach(function(e){t[e]&&(n[e]=t[e])}),n},e.exports=i},{}]},{},[13])(13)});