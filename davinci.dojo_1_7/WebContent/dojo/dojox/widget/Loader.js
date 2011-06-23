/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/widget/Loader",["dojo","dijit","dojox","dijit/_Widget","dijit/_Templated"],function(_1,_2,_3){
_1.getObject("dojox.widget.Loader",1);
_1.deprecated("dojox.widget.Loader","","2.0");
_1.declare("dojox.widget.Loader",[_2._Widget,_2._Templated],{loadIcon:_1.moduleUrl("dojox.widget.Loader","icons/loading.gif"),loadMessage:"Loading ...",hasVisuals:true,attachToPointer:true,duration:125,_offset:16,_pointerConnect:null,_xhrStart:null,_xhrEnd:null,templateString:"<div dojoAttachPoint=\"loadNode\" class=\"dojoxLoader\">"+"<img src=\"${loadIcon}\" class=\"dojoxLoaderIcon\"> <span dojoAttachPoint=\"loadMessageNode\" class=\"dojoxLoaderMessage\"></span>"+"</div>",postCreate:function(){
if(!this.hasVisuals){
this.loadNode.style.display="none";
}else{
if(this.attachToPointer){
_1.removeClass(this.loadNode,"dojoxLoader");
_1.addClass(this.loadNode,"dojoxLoaderPointer");
}
this._hide();
}
this._setMessage(this.loadMessage);
this._xhrStart=this.connect(_1,"_ioSetArgs","_show");
this._xhrEnd=this.connect(_1.Deferred.prototype,"_fire","_hide");
},_setMessage:function(_4){
this.loadMessageNode.innerHTML=_4;
},_putLoader:function(e){
_2.placeOnScreen(this.loadNode,{x:e.clientX+this._offset,y:e.clientY+this._offset},["TL","BR"]);
},_show:function(){
_1.publish("Loader",[{message:"started"}]);
if(this.hasVisuals){
if(this.attachToPointer){
this._pointerConnect=this.connect(document,"onmousemove","_putLoader");
}
_1.style(this.loadNode,{opacity:0,display:""});
_1.fadeIn({node:this.loadNode,duration:this.duration}).play();
}
},_hide:function(){
_1.publish("Loader",[{message:"ended"}]);
if(this.hasVisuals){
if(this.attachToPointer){
this.disconnect(this._pointerConnect);
}
_1.fadeOut({node:this.loadNode,duration:this.duration,onEnd:_1.partial(_1.style,this.loadNode,"display","none")}).play();
}
}});
return _1.getObject("dojox.widget.Loader");
});
require(["dojox/widget/Loader"]);
