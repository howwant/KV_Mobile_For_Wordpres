
// Backbone.js 0.9.9

// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(){var k=this,y=k.Backbone,h=[],z=h.push,r=h.slice,A=h.splice,g;g="undefined"!==typeof exports?exports:k.Backbone={};g.VERSION="0.9.9";var e=k._;!e&&"undefined"!==typeof require&&(e=require("underscore"));g.$=k.jQuery||k.Zepto||k.ender;g.noConflict=function(){k.Backbone=y;return this};g.emulateHTTP=!1;g.emulateJSON=!1;var s=/\s+/,n=function(a,b,c,d){if(!c)return!0;if("object"===typeof c)for(var f in c)a[b].apply(a,[f,c[f]].concat(d));else if(s.test(c)){c=c.split(s);f=0;for(var e=c.length;f<
e;f++)a[b].apply(a,[c[f]].concat(d))}else return!0},t=function(a,b,c){var d,a=-1,f=b.length;switch(c.length){case 0:for(;++a<f;)(d=b[a]).callback.call(d.ctx);break;case 1:for(;++a<f;)(d=b[a]).callback.call(d.ctx,c[0]);break;case 2:for(;++a<f;)(d=b[a]).callback.call(d.ctx,c[0],c[1]);break;case 3:for(;++a<f;)(d=b[a]).callback.call(d.ctx,c[0],c[1],c[2]);break;default:for(;++a<f;)(d=b[a]).callback.apply(d.ctx,c)}},h=g.Events={on:function(a,b,c){if(!n(this,"on",a,[b,c])||!b)return this;this._events||(this._events=
{});(this._events[a]||(this._events[a]=[])).push({callback:b,context:c,ctx:c||this});return this},once:function(a,b,c){if(!n(this,"once",a,[b,c])||!b)return this;var d=this,f=e.once(function(){d.off(a,f);b.apply(this,arguments)});f._callback=b;this.on(a,f,c);return this},off:function(a,b,c){var d,f,l,g,i,m,h,j;if(!this._events||!n(this,"off",a,[b,c]))return this;if(!a&&!b&&!c)return this._events={},this;g=a?[a]:e.keys(this._events);i=0;for(m=g.length;i<m;i++)if(a=g[i],d=this._events[a]){l=[];if(b||
c){h=0;for(j=d.length;h<j;h++)f=d[h],(b&&b!==(f.callback._callback||f.callback)||c&&c!==f.context)&&l.push(f)}this._events[a]=l}return this},trigger:function(a){if(!this._events)return this;var b=r.call(arguments,1);if(!n(this,"trigger",a,b))return this;var c=this._events[a],d=this._events.all;c&&t(this,c,b);d&&t(this,d,arguments);return this},listenTo:function(a,b,c){var d=this._listeners||(this._listeners={}),f=a._listenerId||(a._listenerId=e.uniqueId("l"));d[f]=a;a.on(b,c||this,this);return this},
stopListening:function(a,b,c){var d=this._listeners;if(d){if(a)a.off(b,c,this),!b&&!c&&delete d[a._listenerId];else{for(var f in d)d[f].off(null,null,this);this._listeners={}}return this}}};h.bind=h.on;h.unbind=h.off;e.extend(g,h);var o=g.Model=function(a,b){var c,d=a||{};this.cid=e.uniqueId("c");this.changed={};this.attributes={};this._changes=[];b&&b.collection&&(this.collection=b.collection);b&&b.parse&&(d=this.parse(d));(c=e.result(this,"defaults"))&&e.defaults(d,c);this.set(d,{silent:!0});this._currentAttributes=
e.clone(this.attributes);this._previousAttributes=e.clone(this.attributes);this.initialize.apply(this,arguments)};e.extend(o.prototype,h,{changed:null,idAttribute:"id",initialize:function(){},toJSON:function(){return e.clone(this.attributes)},sync:function(){return g.sync.apply(this,arguments)},get:function(a){return this.attributes[a]},escape:function(a){return e.escape(this.get(a))},has:function(a){return null!=this.get(a)},set:function(a,b,c){var d,f;if(null==a)return this;e.isObject(a)?(f=a,c=
b):(f={})[a]=b;var a=c&&c.silent,l=c&&c.unset;if(!this._validate(f,c))return!1;this.idAttribute in f&&(this.id=f[this.idAttribute]);var g=this.attributes;for(d in f)b=f[d],l?delete g[d]:g[d]=b,this._changes.push(d,b);this._hasComputed=!1;a||this.change(c);return this},unset:function(a,b){return this.set(a,void 0,e.extend({},b,{unset:!0}))},clear:function(a){var b={},c;for(c in this.attributes)b[c]=void 0;return this.set(b,e.extend({},a,{unset:!0}))},fetch:function(a){a=a?e.clone(a):{};void 0===a.parse&&
(a.parse=!0);var b=this,c=a.success;a.success=function(d){if(!b.set(b.parse(d),a))return false;c&&c(b,d,a)};return this.sync("read",this,a)},save:function(a,b,c){var d,f,g;null==a||e.isObject(a)?(d=a,c=b):null!=a&&((d={})[a]=b);c=c?e.clone(c):{};if(c.wait){if(d&&!this._validate(d,c))return!1;f=e.clone(this.attributes)}a=e.extend({},c,{silent:!0});if(d&&!this.set(d,c.wait?a:c)||!d&&!this._validate(null,c))return!1;var q=this,i=c.success;c.success=function(a){g=true;var b=q.parse(a);c.wait&&(b=e.extend(d||
{},b));if(!q.set(b,c))return false;i&&i(q,a,c)};b=this.isNew()?"create":c.patch?"patch":"update";"patch"==b&&(c.attrs=d);b=this.sync(b,this,c);!g&&c.wait&&(this.clear(a),this.set(f,a));return b},destroy:function(a){var a=a?e.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};a.success=function(f){(a.wait||b.isNew())&&d();c&&c(b,f,a)};if(this.isNew())return a.success(),!1;var f=this.sync("delete",this,a);a.wait||d();return f},url:function(){var a=e.result(this,"urlRoot")||
e.result(this.collection,"url")||u();return this.isNew()?a:a+("/"===a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(a){var b=this._changing;this._changing=!0;var c=this._computeChanges(!0);this._pending=!!c.length;for(var d=c.length-2;0<=d;d-=2)this.trigger("change:"+c[d],this,c[d+1],a);if(b)return this;for(;this._pending;)this._pending=!1,this.trigger("change",
this,a),this._previousAttributes=e.clone(this.attributes);this._changing=!1;return this},hasChanged:function(a){this._hasComputed||this._computeChanges();return null==a?!e.isEmpty(this.changed):e.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?e.clone(this.changed):!1;var b,c=!1,d=this._previousAttributes,f;for(f in a)if(!e.isEqual(d[f],b=a[f]))(c||(c={}))[f]=b;return c},_computeChanges:function(a){this.changed={};for(var b={},c=[],d=this._currentAttributes,f=this._changes,
e=f.length-2;0<=e;e-=2){var g=f[e],i=f[e+1];b[g]||(b[g]=!0,d[g]!==i&&(this.changed[g]=i,a&&(c.push(g,i),d[g]=i)))}a&&(this._changes=[]);this._hasComputed=!0;return c},previous:function(a){return null==a||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return e.clone(this._previousAttributes)},_validate:function(a,b){if(!this.validate)return!0;var a=e.extend({},this.attributes,a),c=this.validate(a,b);if(!c)return!0;b&&b.error&&b.error(this,c,b);this.trigger("error",
this,c,b);return!1}});var p=g.Collection=function(a,b){b||(b={});b.model&&(this.model=b.model);void 0!==b.comparator&&(this.comparator=b.comparator);this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,e.extend({silent:!0},b))};e.extend(p.prototype,h,{model:o,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},sync:function(){return g.sync.apply(this,arguments)},add:function(a,b){var c,d,f,g,h=b&&b.at,i=null==(b&&b.sort)?!0:b.sort,a=e.isArray(a)?
a.slice():[a];for(c=a.length-1;0<=c;c--)(d=this._prepareModel(a[c],b))?(a[c]=d,(f=null!=d.id&&this._byId[d.id])||this._byCid[d.cid]?(b&&(b.merge&&f)&&(f.set(d.attributes,b),g=i),a.splice(c,1)):(d.on("all",this._onModelEvent,this),this._byCid[d.cid]=d,null!=d.id&&(this._byId[d.id]=d))):(this.trigger("error",this,a[c],b),a.splice(c,1));a.length&&(g=i);this.length+=a.length;c=[null!=h?h:this.models.length,0];z.apply(c,a);A.apply(this.models,c);g&&(this.comparator&&null==h)&&this.sort({silent:!0});if(b&&
b.silent)return this;for(;d=a.shift();)d.trigger("add",d,this,b);return this},remove:function(a,b){var c,d,f,g;b||(b={});a=e.isArray(a)?a.slice():[a];c=0;for(d=a.length;c<d;c++)if(g=this.get(a[c]))delete this._byId[g.id],delete this._byCid[g.cid],f=this.indexOf(g),this.models.splice(f,1),this.length--,b.silent||(b.index=f,g.trigger("remove",g,this,b)),this._removeReference(g);return this},push:function(a,b){a=this._prepareModel(a,b);this.add(a,e.extend({at:this.length},b));return a},pop:function(a){var b=
this.at(this.length-1);this.remove(b,a);return b},unshift:function(a,b){a=this._prepareModel(a,b);this.add(a,e.extend({at:0},b));return a},shift:function(a){var b=this.at(0);this.remove(b,a);return b},slice:function(a,b){return this.models.slice(a,b)},get:function(a){return null==a?void 0:this._byId[null!=a.id?a.id:a]||this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return e.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},
sort:function(a){if(!this.comparator)throw Error("Cannot sort a set without a comparator");e.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(e.bind(this.comparator,this));(!a||!a.silent)&&this.trigger("sort",this,a);return this},pluck:function(a){return e.invoke(this.models,"get",a)},update:function(a,b){var c,d,f,g,h=[],i=[],m={},j=this.model.prototype.idAttribute,b=e.extend({add:!0,merge:!0,remove:!0},b);b.parse&&(a=this.parse(a));
e.isArray(a)||(a=a?[a]:[]);if(b.add&&!b.remove)return this.add(a,b);d=0;for(f=a.length;d<f;d++)c=a[d],g=this.get(c.id||c.cid||c[j]),b.remove&&g&&(m[g.cid]=!0),(b.add&&!g||b.merge&&g)&&h.push(c);if(b.remove){d=0;for(f=this.models.length;d<f;d++)c=this.models[d],m[c.cid]||i.push(c)}i.length&&this.remove(i,b);h.length&&this.add(h,b);return this},reset:function(a,b){b||(b={});b.parse&&(a=this.parse(a));for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);b.previousModels=this.models;
this._reset();a&&this.add(a,e.extend({silent:!0},b));b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=a?e.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=this,c=a.success;a.success=function(d){b[a.update?"update":"reset"](d,a);c&&c(b,d,a)};return this.sync("read",this,a)},create:function(a,b){var c=this,b=b?e.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||c.add(a,b);var d=b.success;b.success=function(a,b,e){e.wait&&c.add(a,e);d&&d(a,b,e)};a.save(null,b);return a},
parse:function(a){return a},clone:function(){return new this.constructor(this.models)},chain:function(){return e(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId={};this._byCid={}},_prepareModel:function(a,b){if(a instanceof o)return a.collection||(a.collection=this),a;b||(b={});b.collection=this;var c=new this.model(a,b);return!c._validate(a,b)?!1:c},_removeReference:function(a){this===a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,
b,c,d){("add"===a||"remove"===a)&&c!==this||("destroy"===a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],null!=b.id&&(this._byId[b.id]=b)),this.trigger.apply(this,arguments))}});e.each("forEach each map collect reduce foldl inject reduceRight foldr find detect filter select reject every all some any include contains invoke max min sortedIndex toArray size first head take initial rest tail last without indexOf shuffle lastIndexOf isEmpty".split(" "),
function(a){p.prototype[a]=function(){var b=r.call(arguments);b.unshift(this.models);return e[a].apply(e,b)}});e.each(["groupBy","countBy","sortBy"],function(a){p.prototype[a]=function(b,c){var d=e.isFunction(b)?b:function(a){return a.get(b)};return e[a](this.models,d,c)}});var v=g.Router=function(a){a||(a={});a.routes&&(this.routes=a.routes);this._bindRoutes();this.initialize.apply(this,arguments)},B=/\((.*?)\)/g,C=/:\w+/g,D=/\*\w+/g,E=/[\-{}\[\]+?.,\\\^$|#\s]/g;e.extend(v.prototype,h,{initialize:function(){},
route:function(a,b,c){e.isRegExp(a)||(a=this._routeToRegExp(a));c||(c=this[b]);g.history.route(a,e.bind(function(d){d=this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));g.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){g.history.navigate(a,b);return this},_bindRoutes:function(){if(this.routes)for(var a,b=e.keys(this.routes);null!=(a=b.pop());)this.route(a,this.routes[a])},_routeToRegExp:function(a){a=a.replace(E,"\\$&").replace(B,
"(?:$1)?").replace(C,"([^/]+)").replace(D,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var j=g.History=function(){this.handlers=[];e.bindAll(this,"checkUrl");"undefined"!==typeof window&&(this.location=window.location,this.history=window.history)},w=/^[#\/]|\s+$/g,F=/^\/+|\/+$/g,G=/msie [\w.]+/,H=/\/$/;j.started=!1;e.extend(j.prototype,h,{interval:50,getHash:function(a){return(a=(a||this).location.href.match(/#(.*)$/))?a[1]:""},getFragment:function(a,
b){if(null==a)if(this._hasPushState||!this._wantsHashChange||b){var a=this.location.pathname,c=this.root.replace(H,"");a.indexOf(c)||(a=a.substr(c.length))}else a=this.getHash();return a.replace(w,"")},start:function(a){if(j.started)throw Error("Backbone.history has already been started");j.started=!0;this.options=e.extend({},{root:"/"},this.options,a);this.root=this.options.root;this._wantsHashChange=!1!==this.options.hashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||
!this.history||!this.history.pushState);var a=this.getFragment(),b=document.documentMode,b=G.exec(navigator.userAgent.toLowerCase())&&(!b||7>=b);this.root=("/"+this.root+"/").replace(F,"/");b&&this._wantsHashChange&&(this.iframe=g.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a));this._hasPushState?g.$(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!b?g.$(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&
(this._checkUrlInterval=setInterval(this.checkUrl,this.interval));this.fragment=a;a=this.location;b=a.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0;this._wantsPushState&&(this._hasPushState&&b&&a.hash)&&(this.fragment=this.getHash().replace(w,""),this.history.replaceState({},document.title,this.root+this.fragment+
a.search));if(!this.options.silent)return this.loadUrl()},stop:function(){g.$(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);j.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a===this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe)));if(a===this.fragment)return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(this.getHash())},
loadUrl:function(a){var b=this.fragment=this.getFragment(a);return e.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){if(!j.started)return!1;if(!b||!0===b)b={trigger:b};a=this.getFragment(a||"");if(this.fragment!==a){this.fragment=a;var c=this.root+a;if(this._hasPushState)this.history[b.replace?"replaceState":"pushState"]({},document.title,c);else if(this._wantsHashChange)this._updateHash(this.location,a,b.replace),this.iframe&&a!==this.getFragment(this.getHash(this.iframe))&&
(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,a,b.replace));else return this.location.assign(c);b.trigger&&this.loadUrl(a)}},_updateHash:function(a,b,c){c?(c=a.href.replace(/(javascript:|#).*$/,""),a.replace(c+"#"+b)):a.hash="#"+b}});g.history=new j;var x=g.View=function(a){this.cid=e.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()},I=/^(\S+)\s*(.*)$/,J="model collection el id attributes className tagName events".split(" ");
e.extend(x.prototype,h,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},make:function(a,b,c){a=document.createElement(a);b&&g.$(a).attr(b);null!=c&&g.$(a).html(c);return a},setElement:function(a,b){this.$el&&this.undelegateEvents();this.$el=a instanceof g.$?a:g.$(a);this.el=this.$el[0];!1!==b&&this.delegateEvents();return this},delegateEvents:function(a){if(a||(a=e.result(this,
"events"))){this.undelegateEvents();for(var b in a){var c=a[b];e.isFunction(c)||(c=this[a[b]]);if(!c)throw Error('Method "'+a[b]+'" does not exist');var d=b.match(I),f=d[1],d=d[2],c=e.bind(c,this),f=f+(".delegateEvents"+this.cid);""===d?this.$el.bind(f,c):this.$el.delegate(d,f,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=e.extend({},e.result(this,"options"),a));e.extend(this,e.pick(a,J));this.options=a},_ensureElement:function(){if(this.el)this.setElement(e.result(this,
"el"),!1);else{var a=e.extend({},e.result(this,"attributes"));this.id&&(a.id=e.result(this,"id"));this.className&&(a["class"]=e.result(this,"className"));this.setElement(this.make(e.result(this,"tagName"),a),!1)}}});var K={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};g.sync=function(a,b,c){var d=K[a];e.defaults(c||(c={}),{emulateHTTP:g.emulateHTTP,emulateJSON:g.emulateJSON});var f={type:d,dataType:"json"};c.url||(f.url=e.result(b,"url")||u());if(null==c.data&&b&&("create"===
a||"update"===a||"patch"===a))f.contentType="application/json",f.data=JSON.stringify(c.attrs||b.toJSON(c));c.emulateJSON&&(f.contentType="application/x-www-form-urlencoded",f.data=f.data?{model:f.data}:{});if(c.emulateHTTP&&("PUT"===d||"DELETE"===d||"PATCH"===d)){f.type="POST";c.emulateJSON&&(f.data._method=d);var h=c.beforeSend;c.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d);if(h)return h.apply(this,arguments)}}"GET"!==f.type&&!c.emulateJSON&&(f.processData=!1);var j=c.success;
c.success=function(a,d,e){j&&j(a,d,e);b.trigger("sync",b,a,c)};var i=c.error;c.error=function(a){i&&i(b,a,c);b.trigger("error",b,a,c)};a=g.ajax(e.extend(f,c));b.trigger("request",b,a,c);return a};g.ajax=function(){return g.$.ajax.apply(g.$,arguments)};o.extend=p.extend=v.extend=x.extend=j.extend=function(a,b){var c=this,d;d=a&&e.has(a,"constructor")?a.constructor:function(){c.apply(this,arguments)};e.extend(d,c,b);var f=function(){this.constructor=d};f.prototype=c.prototype;d.prototype=new f;a&&e.extend(d.prototype,
a);d.__super__=c.prototype;return d};var u=function(){throw Error('A "url" property or function must be specified');}}).call(this);

