Close Window

1var ___log = ""; 
var ___debug = "console"; 
var ___error = ""; 
function __log(_1) {
	if((typeof(environnement) == "undefined") || (environnement != "prod")) {
		if(___log) {
			if((___log == "console") && console && console.log) {
				console.log("L: " + _1); 
			}
			else {
				alert(_1); 
			}
		}
	}
}
function __debug(_2) {
	if((typeof(environnement) == "undefined") || (environnement != "prod")) {
		if(___debug) {
			if((___debug == "console") && console && console.debug) {
				console.debug("D: " + _2); 
			}
			else {
				alert(_2); 
			}
		}
	}
}
function __error(_3) {
	if(___error) {
		if((___error == "console") && console && console.warn) {
			console.warn(_3); 
		}
		else {
			alert(_3); 
		}
	}
}
function ___purge(d) {
	if(!d) {
		return; 
	}
	var a = d.attributes, i, l, n; 
	if(a) {
		l = a.length; 
		for(i = 0; i < l; i += 1) {
			n = a[i].name; 
			if(typeof d[n] === "function") {
				d[n] = null; 
			}
		}
	}
	a = d.childNodes; 
	if(a) {
		l = a.length; 
		for(i = 0; i < l; i += 1) {
			___purge(d.childNodes[i]); 
		}
	}
}
function __modifImage(id, _a) {
	var _b = document.getElementById(id); 
	if(_b) {
		_b.src = _a; 
	}
}
function __foldUnfoldDiv(_c, _d, _e) {
	var _f = $(_c); 
	var img = $(_d); 
	if(_f && img) {
		if(_f.style.display == "none") {
			_f.style.display = "block"; 
			img.src = adressConf.imgPrefix + "/imgs/visu/" + dimension + "/" + currentPortal + "/ico_win_moins.gif"; 
		}
		else {
			_f.style.display = "none"; 
			img.src = adressConf.imgPrefix + "/imgs/visu/" + dimension + "/" + currentPortal + "/ico_win_plus.gif"; 
		}
	}
}
function __displayDialog(_11, msg, _13, _14, _15) {
	var _16 = document.getElementById("winDialog"); 
	if(!_16) {
		return; 
	}
	if(_15) {
		_16.style.width = _15; 
	}
	else {
		_16.style.width = null; 
	}
	var _17 = document.getElementById("spanDialogTitle"); 
	var _18 = document.getElementById("displDialog"); 
	if(_17 && _18) {
		_17.innerHTML = _11; 
		_18.innerHTML = msg; 
		window.UnObtrusive.removeClassNames(_16, "invisible"); 
		if(typeof(Shield) != "undefined") {
			$("winDialog").updateSizeOfShield(); 
		}
		if(_13) {
			var _19 = document.getElementById("winDialogClose"); 
			if(_19) {
				var _1a = function() {
					_13(); 
					Event.stopObserving(_19, "click", _1a, false); 
				}; 
				Event.observe(_19, "click", _1a, false); 
			}
		}
		if(_14) {
			setTimeout("__forceCloseDialog('winDialog','" + _11 + "','" + msg + "')", _14); 
		}
		return true; 
	}
	return false; 
}
function __forceCloseDialog(_1b, _1c, msg) {
	var _1e = document.getElementById((_1b) ? _1b : "winDialog"); 
	if(!_1e) {
		return; 
	}
	if(_1c || msg) {
		var _1f = document.getElementById("spanDialogTitle"); 
		var _20 = document.getElementById("displDialog"); 
		if(_1f && _20) {
			if((_1f.innerHTML != _1c) || (_20.innerHTML != msg)) {
				return; 
			}
		}
	}
	window.UnObtrusive.addClassNames(_1e, "invisible"); 
}
function MM_swapImgRestore() {
	var i, x, a = document.MM_sr; 
	for(i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) {
		x.src = x.oSrc; 
	}
}
function MM_findObj(n, d) {
	var p, i, x; 
	if(!d) {
		d = document; 
	}
	if((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p + 1)].document; 
		n = n.substring(0, p); 
	}
	if(!(x = d[n]) && d.all) {
		x = d.all[n]; 
	}
	for(i = 0; !x && i < d.forms.length; i++) {
		x = d.forms[i][n]; 
	}
	for(i = 0; !x && d.layers && i < d.layers.length; i++) {
		x = MM_findObj(n, d.layers[i].document); 
	}
	if(!x && d.getElementById) {
		x = d.getElementById(n); 
	}
	return x; 
}
function MM_swapImage() {
	var i, j = 0, x, a = MM_swapImage.arguments; 
	document.MM_sr = new Array; 
	for(i = 0; i < (a.length - 2); i += 3) {
		if((x = MM_findObj(a[i])) != null) {
			document.MM_sr[j++] = x; 
			if(!x.oSrc) {
				x.oSrc = x.src; 
			}
			x.src = a[i + 2]; 
		}
	}
}
function __creationSelect(_2d, tab, _2f) {
	Element.descendants(_2d).each(function(o) {
		Element.remove(o); }
	); 
	var i = 0; 
	for(var _32 in tab) {
		if(typeof(tab[_32]) != "function") {
			if(_2f != null && _2f != "undefined" && _32 == _2f) {
				_2d.options[i] = new Option(tab[_32], _32, false); 
				_2d.options.selectedIndex = i; 
			}
			else {
				_2d.options[i] = new Option(tab[_32], _32, false, false); 
			}
			i++; 
		}
	}
}
function __creationTabNom(tab) {
	var _34 = new Array(); 
	for(var _35 in tab) {
		if(typeof(tab[_35]) != "function") {
			if(typeof(tab[_35]) == "string") {
				_34[_35] = tab[_35]; 
			}
			else {
				_34[_35] = tab[_35].nom; 
			}
		}
	}
	return _34; 
}
function __creationTabTitle(tab) {
	var _37 = new Array(); 
	for(var _38 in tab) {
		if(typeof(tab[_38]) != "function") {
			_37[_38] = tab[_38].title; 
		}
	}
	return _37; 
}
function __positionSelect(_39, _3a) {
	var _3b = document.getElementById(_39); 
	if(_3b) {
		for(var i = 0; i < _3b.options.length; i++) {
			if(_3b.options[i].value == _3a) {
				_3b.options[i].selected = true; 
				break; 
			}
		}
	}
}
function __supprEspaces(_3d) {
	newChaine = ""; 
	for(i = 0; i <= _3d.length; i++) {
		caract = _3d.substring(i, i + 1); 
		if(caract != " ") {
			newChaine = newChaine + caract; 
		}
	}
	return newChaine; 
}
function __winClose() {
	var win = this.parentNode.parentNode.parentNode; 
	if(typeof(gpp) != "undefined") {
		gpp.MAC_hidepopup(); 
	}
	$(win).addClassName("invisible"); 
}
function __defineClosingControllers() {
	var icc; 
	var _40 = document.getElementsByTagName("img"); 
	for(icc = 0; icc < _40.length; icc++) {
		if(_40[icc].className.search(/(^| )winClose( |$)/)!=-1){if(_40[icc].addEventListener){_40[icc].addEventListener("click",__winClose,false);
		}
		else {
			_40[icc].onclick = __winClose; 
		}
		}
	}
}
function __deleteClosingControllers() {
	var icc; 
	var _42 = document.getElementsByTagName("img"); 
	for(icc = 0; icc < _42.length; icc++) {
		if(_42[icc].className.search(/(^| )winClose( |$)/)!=-1){if(_42[icc].removeEventListener){_42[icc].removeEventListener("click",__winClose,false);
		}
		else {
			_42[icc].onclick = null; 
		}
		}
	}
}
function __unImplementedAnchors() {
	var i; 
	var _44 = document.getElementsByTagName("span"); 
	for(i = 0; i < _44.length; i++) {
		if(_44[i].className.search(/(^| )futur( |$)/)!=-1){_44[i].onclick=function(){window.alert(__i18n_tools["nonImplemente"]);
		}; 
		}
	}
}
function __stringToBool(_45) {
	var _46; 
	if(_45 == "true") {
		_46 = true; 
	}
	else {
		if(_45 == "false") {
			_46 = false; 
		}
		else {
			if(typeof(_45) == "undefined") {
				_46 = false; 
			}
			else {
				_46 = _45; 
			}
		}
	}
	return _46; 
}
function DynMapCreate(_1, _2, _3, _4, _5, x, y, _8, _9, _a, _b, _c, _d, _e, _f, _10) {
	return new GCISDynamicMap(_1, _2, _3, _4, _5, x, y, _8, _9, _a, _b, _c, _d, _e, _f, _10); 
}
function DynMapIsRefreshing(map) {
	return map.isRefreshing(); 
}
function DynMapRefresh(map, _13) {
	map.refresh(_13); 
}
function DynMapSetCallBackAfterRefresh(map, _15) {
	map.setCallBackAfterRefresh(_15); 
}
function DynMapLayerRefresh(_16, _17) {
	return _16.refresh(_17); 
}
function DynMapSetObjects(map, _19, _1a) {
	map.setObjects(_19, _1a); 
}
function DynMapMoveObjects(map, _1c, _1d) {
	return map.moveObjects(_1c, _1d); 
}
function DynMapAddObject(map, obj, _20) {
	map.addObject(obj, _20); 
}
function DynMapRemoveObject(map, _22) {
	map.removeObject(_22); 
}
function DynMapRefreshObject(map) {
	map.refreshObject(); 
}
function DynMapGetPixelXY(map, x, y) {
	map.getpixelXY(x, y); 
}
function DynMapHideObjectSheet(map) {
	map.hideObjectSheet(); 
}
function DynMapShowObjectSheet(map, obj) {
	map.showObjectSheet(obj); 
}
function DynMapFindLayersObjects(map, obj) {
	map.getFindLayersObjects(obj); 
}
function DynMapSheetLayerWinElement(map) {
	map.getSheetLayerWinElement(); 
}
function DynMapSetMinimumScale(map, _2e) {
	map.setMinimumScale(_2e); 
}
function DynMapSetMaximumScale(map, _30) {
	map.setMaximumScale(_30); 
}
function DynMapCenterOnRect(map, x1, y1, x2, y2, _36) {
	map.centerOnRect(x1, y1, x2, y2, _36); 
}
function DynMapCenterOnObjects(map) {
	map.centerOnObjects(); 
}
function DynMapCenterOnObject(map, _39, _3a) {
	map.centerOnObject(_39, _3a); 
}
function DynMapCenter(map, x, y, _3e) {
	map.center(x, y, _3e); 
}
function DynMapCenterClick(_3f) {
	this.map.centerClick(_3f); 
}
function DynMapSetScale(map, s) {
	map.setScale(s); 
}
function DynMapSetSize(map, w, h) {
	map.setSize(w, h); 
}
function DynMapGetWidth(map) {
	return map.width; 
}
function DynMapGetHeight(map) {
	return map.height; 
}
function DynMapResize(map) {
	map.recomputeSize(); 
}
function DynMapMaximize(map, w, h) {
	map.maximize(w, h); 
}
function DynMapGetMap(doc, _4c) {
	if(!doc.maps) {
		return null; 
	}
	else {
		return doc.maps[_4c]; 
	}
}
function getMap(doc, _4e) {
	return doc.maps[_4e]; 
}
function DynMapAnimate(_4f, _50) {
	var map = getMap(document, _4f); 
	map.animate(_50); 
}
function DynMapBackground(_52) {
	getMap(document, _52).doBackground(); 
}
function DynMapShowPoint(m, x, y, _56, img) {
	m.showPoint(x, y, _56, img); 
}
function DynMapEnsureVisible(map, _59, _5a, _5b, _5c, _5d, _5e) {
	map.ensureVisible(_59, _5a, _5b, _5c, _5d, _5e); 
}
function DynMapAddDynamicLayer(map, _60, _61, _62, _63, _64, _65, _66) {
	map.addDynamicLayer(_60, _61, _62, _63, _64, _65, _66); 
}
function DynMapAddWMSLayer(map, _68, _69, _6a, _6b, _6c, _6d, _6e, _6f) {
	map.addWMSLayer(_68, _69, _6a, _6b, _6c, _6d, _6e, _6f); 
}
function DynMapGetDistanceX(map, _71) {
	return map.calcMapDeltaX(0, _71) * map.precision; 
}
function DynMapGetDistanceY(map, _73) {
	return - map.calcMapDeltaY(0, _73) * map.precision; 
}
function DynMapGetSelection(map) {
	return map.getSelection(); 
}
function DynMapResetSelection(map) {
	map.resetSelection(); 
}
function DynMapSetUserId(map, _77) {
	map.setUserId(_77); 
}
function DynMapGetUserId(map) {
	return map.getUserId(); 
}
function DynMapGetScale(map) {
	return map.getScale(); 
}
function DynMapAddScaleEventListener(map, _7b, _7c) {
	map.addScaleEventListener(_7b, _7c); 
}
function DynMapAddMoveEventListener(map, _7e, _7f) {
	map.addMoveEventListener(_7e, _7f); 
}
function DynMapAddDrawingListener(map, _81, _82) {
	map.addDrawingListener(_81, _82); 
}
function DynMapClear(map, _84, _85) {
	return map.clear(_84, _85); 
}
function DynMapSetModifyMap(map, x, y, _89, _8a, _8b, _8c) {
	map.modifyMap(x, y, _89, _8a, _8b, _8c); 
}
function DynMapGetPrecision(map) {
	return map.precision; 
}
function DynMapAddRasterLayer(map, _8f, _90, _91, _92, _93, _94, _95, _96, _97, _98) {
	map.addRasterLayer(_8f, _90, _91, _92, _93, _94, _95, _96, _97, _98); 
}
function DynMapRemoveRasterLayer(map, _9a) {
	map.removeRasterLayer(_9a); 
}
function DynMapSetRasterVisibilityRange(map, _9c, _9d, _9e) {
	map.setRasterVisibilityRange(_9c, _9d, _9e); 
}
function DynMapGetRasterLayerNames(map) {
	return map.getRasterLayerNames(); 
}
function DynMapSetLayerNumber(map, _a1, _a2) {
	map.setLayerNumber(_a1, _a2); 
}
function DynMapGetLayerNumber(map, _a4) {
	var _a5 = map.getRasterLayerNames(); 
	var i; 
	for(i = 0; i < _a5.length; i++) {
		if(_a5[i] == _a4) {
			return i; 
		}
	}
}
function DynMapSetLayerOpacity(_a7, _a8) {
	if(!_a7) {
		return; 
	}
	_a7.setOpacity(_a8); 
}
function DynMapGetLayerOpacity(_a9) {
	return _a9.getOpacity(); 
}
function DynMapGetLayer(map, _ab) {
	return map.getLayer(_ab); 
}
function DynMapReInitLayers(map) {
	return map.resetLayers(); 
}
function DynMapSetLayerVisibility(map, _ae, vis) {
	map.setLayerVisibility(_ae, vis); 
}
function DynMapGetLayerVisibility(_b0) {
	return _b0.isVisible(); 
}
function DynMapAddRasterDynamicLayer(map, _b2, _b3, _b4, _b5) {
	return map.addRasterDynamicLayer(_b2, _b3, _b4, _b5); 
}
function DynMapBrowserGetXposition(map, _b7) {
	return map.browser.getXposition(_b7); 
}
function DynMapBrowserGetYposition(map, _b9) {
	return map.browser.getYposition(_b9); 
}
function DynMapGetCenterX(map) {
	return map.currentX * map.precision; 
}
function DynMapGetCenterY(map) {
	return map.currentY * map.precision; 
}
function DynMapGetLongLat(map, _bd, _be) {
	return map.getLongLat(_bd, _be); 
}
function DynMapFormatDegrees(_bf, _c0, _c1) {
	var _c2 = Math.floor(Math.abs(_bf)); 
	var _c3 = Math.floor(60 * (Math.abs(_bf) - _c2)); 
	var _c4; 
	var _c5 = null; 
	if(typeof(_c1) != undefined && _c1 != null) {
		_c4 = Math.floor(60 * (60 * (Math.abs(_bf) - _c2) - _c3)); 
		_c5 = Math.round(Math.pow(10, _c1) * (60 * (60 * (Math.abs(_bf) - _c2) - _c3) - _c4)); 
		if(_c5 == Math.pow(10, _c1)) {
			_c4 = _c4 + 1; 
			_c5 = 0; 
		}
	}
	else {
		_c4 = Math.round(60 * (60 * (Math.abs(_bf) - _c2) - _c3)); 
	}
	if(_c4 == 60) {
		_c3 = _c3 + 1; 
		_c4 = 0; 
	}
	if(_c3 == 60) {
		_c2 = _c2 + 1; 
		_c3 = 0; 
	}
	var dir = (_bf > 0 ? _c0[0] : _c0[1]); 
	if(_c5 == null) {
		return(_c2 < 10 ? "0" + _c2 : _c2) + "&deg; " + (_c3 < 10 ? "0" + _c3 : _c3) + "' " + (_c4 < 10 ? "0" + _c4 : _c4) + "'' " + dir; 
	}
	else {
		return(_c2 < 10 ? "0" + _c2 : _c2) + "&deg; " + (_c3 < 10 ? "0" + _c3 : _c3) + "' " + (_c4 < 10 ? "0" + _c4 : _c4) + "." + _c5 + "'' " + dir; 
	}
}
function DynMapDMStoDegrees(_c7, _c8, _c9, _ca) {
	var deg = _c7 + _c8 / 60 + _c9 / 3600; 
	if(_ca == "S" || _ca == "O") {
		deg =- deg; 
	}
	return deg; 
}
function DynMapGetBoundingBox(map) {
	return[map.calcMapX(0), map.calcMapY(0), map.calcMapX(map.width), map.calcMapY(map.height)]; 
}
function DynMapProject(map, _ce, phi, _d0) {
	return map.project(_ce, phi, _d0); 
}
function DynMapHTCtoRadian(map, x, y) {
	var XY = map.getHTCtoRadian(x, y); 
	return XY; 
}
function DynMapRadiantoHTC(map, x, y, _d8) {
	var XY = map.getRadiantoHTC(x, y, _d8); 
	return XY; 
}
function DynMapDegreeToRadian(val) {
	return decimalDegreeToRad(val); 
}
function DynMapRadianToDegree(val) {
	return radianToDecimalDegree(val); 
}
function DynMapAddGlobalView(map, _dd, _de, _df, _e0, _e1, _e2, _e3, div, _e5, _e6, _e7) {
	map.addGlobalView(_dd, _de, _df, _e0, _e1, _e2, _e3, div, _e5, _e6, _e7); 
}
function DynMapGetGlobalView(map) {
	return map.getGlobalView(); 
}
function DynMapSetGlobalViewRectSize(_e9, _ea, _eb) {
	_e9.setRectSize(_ea, _eb); 
}
function DynMapSetAutoZoomReduction(_ec, _ed) {
	_ec.setAutoZoomReduction(_ed); 
}
function DynMapSetMouseCursor(map, _ef) {
	map.setMouseCursor(_ef); 
}
function DynMapCreateMode(_f0, _f1, _f2, _f3, _f4) {
	return new GCISCreateMode(_f0, _f1, _f2, _f3, _f4); 
}
function DynMapSetMouseMode(map, _f6) {
	map.setMouseMode(_f6); 
}
function DynMapGetMouseMode(map) {
	return map.getMouseMode(); 
}
function DynMapCreateProjection(map, _f9, _fa) {
	return map.createProjection(_f9, _fa); 
}
function DynMapSetProjection(map, _fc, _fd) {
	map.setProjection(_fc, _fd); 
}
function DynMapGetProjection(map) {
	return map.getProjection(); 
}
function DynMapAddScaleLayer(map, posx, posy, div) {
	map.addScaleLayer(posx, posy, div); 
}
function DynMapWorldScaleListenerCreate(map, name) {
	return new GCISWorldScaleListener(name, map); 
}
function DynMapAddTerritory(map, _106, _107, _108, Ttab, _10a, _10b, _10c, _10d, _10e, _10f) {
	map.addTerritory(_106, _107, _108, Ttab, _10a, _10b, _10c, _10d, _10e, _10f); 
}
function DynMapAddVectorLayer(map, name) {
	map.addVectorLayer(name); 
}
function DynMapLayerGetElement(_112, _113) {
	return _112.getElement(_113); 
}
function DynMapLayerDeleteAllElements(_114) {
	return _114.deleteAllElements(); 
}
function DynMapLayerCreateLine(_115, _116, _117, w, col, opac) {
	return _115.createLine(_116, _117, w, col, opac); 
}
function DynMapLayerCreatePoint(_11b, x, y, _11e, w, col, opac) {
	return _11b.createPoint(x, y, _11e, w, col, opac); 
}
function DynMapLayerCreatePolygon(_122, _123, _124, _125, w, col, opac) {
	return _122.createPolygon(_123, _124, _125, w, col, opac); 
}
function DynMapLayerAddElement(_129, el) {
	return _129.addElement(el); 
}
function DynMapElementGetPointsX(obj) {
	return obj.getPointsX(); 
}
function DynMapElementGetPointsY(obj) {
	return obj.getPointsY(); 
}
function DynMapElementGetWkt(obj) {
	return obj.getWkt(); 
}
function DynMapElementSetWkt(obj, txt) {
	return obj.setWkt(txt); 
}
function DynMapElementDeleteLastPoint(obj) {
	obj.deleteLastPoint(); 
}
function DynMapElementGetRadius(obj) {
	return obj.getRadius(); 
}
function DynMapLayerZoomOnElement(_132, obj) {
	_132.zoomOnElement(obj); 
}
function DynMapHistorySimulate() {
	var h = document.currentSimulation; 
	h.simulating = true; 
	if(h === null) {
		return; 
	}
	if(h.direction !== 0) {
		h.showCurrentPosition(); 
	}
	h.next(); 
	h.win.setTimeout("DynMapHistorySimulate()", h.intervall); 
}
function DynMapHistoryCreate(win, _136, _137, _138) {
	return new PositionHistory(win, _136, _137, _138); 
}
function DynMapHistoryAddPos(his, x, y, s, t) {
	his.addPos(x, y, s, t); 
}
function DynMapHistoryAddTrip(his, time, _140, _141, _142, minX, maxX, minY, maxY, _147, _148, _149, _14a, _14b) {
	his.addTrip(time, _140, _141, _142, minX, maxX, minY, maxY, _147, _148, _149, _14a, _14b); 
}
function DynMapHistoryCenterMap(h, m) {
	h.centerMap(m); 
}
function DynMapHistoryGoNext(h) {
	h.goNextPosition(); 
}
function DynMapHistoryGoPrevious(h) {
	h.goPreviousPosition(); 
}
function DynMapHistoryPause(h) {
	h.pause(); 
}
function DynMapHistoryPlay(h) {
	h.play(); 
}
function DynMapHistoryFaster(h, mul) {
	h.faster(mul); 
}
function DynMapHistorySlower(h, div) {
	h.slower(div); 
}
function DynMapHistoryGoToTime(h, t) {
	h.gotoTime(t); 
}
function DynMapHistoryShowAllTripsOnMap(h, map) {
	h.showAllTripsOnMap(map); 
}
function DynMapHistorySimulateTrip(h, num, map) {
	h.simulateTrip(num, map); 
}
function DynMapHistoryShowTripOnMap(h, map, num) {
	h.showTripOnMap(map, num); 
}
function DynMapHistoryGetTrip(h, ind) {
	return h.trips[ind]; 
}
function DynMapTripGetStart(t) {
	return t.startIndex; 
}
function DynMapTripGetEnd(t) {
	return t.endIndex; 
}
function DynMapTripGetStartTime(t) {
	return t.startPosTime; 
}
function DynMapTripGetEndTime(t) {
	return t.endPosTime; 
}
function DynMapTripGetDistance(t) {
	return t.distKm; 
}
function DynMapTripGetMeanSpeed(t) {
	return t.meanSpeed; 
}
function DynMapTripGetMaxSpeed(t) {
	return t.maxSpeed; 
}
function DynMapTripGetDuration(t) {
	return t.duration; 
}
function DynMapTrackingShowXml(_16a, map, _16c, _16d, _16e, _16f, _170, _171, _172, _173, _174, _175, _176) {
	var _177 = _16a.responseXML; 
	if(!_177 ||!_177.documentElement) {
		return; 
	}
	var root = _177.documentElement; 
	var _179 = root.getElementsByTagName("position"); 
	var _17a = []; 
	for(var i = 0; i != _179.length; i++) {
		var item = _179[i]; 
		var name = elementByTag(item, "name"); 
		var id = elementByTag(item, "id"); 
		var x = elementByTag(item, "x"); 
		var y = elementByTag(item, "y"); 
		var _181 = elementByTag(item, "speed"); 
		var _182 = elementByTag(item, "time"); 
		var _183 = elementByTag(item, "bearing"); 
		var _184 = elementByTag(item, "image"); 
		var _185 = elementByTag(item, "method"); 
		var _186 = elementByTag(item, "status"); 
		var _187 = elementByTag(item, "imageid"); 
		var _188 = 14; 
		var _189 = 12; 
		var text = ""; 
		if(name) {
			text += name; 
		}
		if(_173 && _181) {
			text += "<br>" + _173 + " : " + _181 + " km/h"; 
		}
		if(_174 && _182) {
			text += "<br>" + _174 + " : " + _182 + " (" + _186 + ")"; 
		}
		if(_175 && _183) {
			text += "<br>" + _175 + " : " + (_183 == "1000" ? " " : _183) + "&#176"; 
		}
		if(_176 && _185) {
			text += "<br>" + _176 + " : " + _185; 
		}
		var _18b = "<div class='mapmobile'>"; 
		_18b += "<div class='mapmobile_" + _186 + "' >"; 
		_18b += "<img style='position:absolute' src='"; 
		if(_184 && _16e) {
			_18b += _16e + "id=" + _184; 
		}
		else {
			_18b += _16c; 
		}
		_18b += "'>"; 
		_18b += "</div>"; 
		if(_183 != "1000" && _16f !== null) {
			_18b += "<img style='position:absolute;left:20px;' "; 
			_18b += "width='40' height='40' "; 
			_18b += "src='" + _16f + "&d=" + _183 + "'>"; 
		}
		_18b += "</div>"; 
		var pos = DynMapCreateObject(x, y, id ? id : name, _170 ? name : null, text, _188, _189, null, _18b); 
		_17a.push(pos); 
	}
	if(_171) {
		map.addObjects(_17a, _172); 
		map.centerOnObjects(); 
	}
	else {
		if(!map.moveObjects(_17a, _172)) {
			map.addObjects(_17a, _172); 
		}
	}
}
function DynMapGeocodeXml(_18d) {
	var _18e = xmlrequest.responseXML; 
	if(!_18e ||!_18e.documentElement) {
		return; 
	}
	var root = _18e.documentElement; 
	var _190 = root.getElementsByTagName("geocodeResult"); 
	var _191 = []; 
	for(var i = 0; i != _190.length; i++) {
		var item = _190[i]; 
		var name = elementByTag(item, "name"); 
		var city = elementByTag(item, "city"); 
		var x = elementByTag(item, "x"); 
		var y = elementByTag(item, "y"); 
		var _198 = elementByTag(item, "zipCode"); 
		var type = elementByTag(item, "type"); 
		var _19a = elementByTag(item, "address"); 
	}
}
function DynMapCreateObject(x, y, id, name, text, _1a0, _1a1, img, _1a3) {
	var pos = {
	}; 
	pos.id = id; 
	pos.mapx = x; 
	pos.mapy = y; 
	pos.name = name; 
	pos.text = text; 
	pos.deltaX =- _1a0; 
	pos.deltaY =- _1a1; 
	pos.imgsrc = img; 
	pos.innerHTML = _1a3; 
	return pos; 
}
function DynMapAddCopyrightLayer(map, posx, posy) {
	map.addCopyrightLayer(posx, posy); 
}
function DynMapSetLayerCopyright(_1a8, text, _1aa) {
	_1a8.setCopyright(text, _1aa); 
}
function GCISAbstractLayer() {
}
GCISAbstractLayer.prototype.init = function(_1) {
}; 
GCISAbstractLayer.prototype.toString = function() {
	return"layer " + this.name; 
}; 
GCISAbstractLayer.prototype.move = function(dx, dy, _4) {
}; 
GCISAbstractLayer.prototype.endMove = function() {
}; 
GCISAbstractLayer.prototype.refresh = function(_5) {
}; 
GCISAbstractLayer.prototype.remove = function() {
}; 
GCISAbstractLayer.prototype.isPrintable = function(_6) {
	return true; 
}; 
GCISAbstractLayer.prototype.setUserId = function(_7) {
}; 
GCISAbstractLayer.prototype.setCopyright = function(_8, _9) {
}; 
GCISAbstractLayer.prototype.setOpacity = function(_a) {
}; 
GCISAbstractLayer.prototype.setVisible = function(_b) {
}; 
GCISAbstractLayer.prototype.setScale = function(_c) {
}; 
function GCISAbstractAnimator() {
}
GCISAbstractAnimator.prototype.start = function(_d) {
}; 
GCISAbstractAnimator.prototype.animate = function() {
}; 
GCISAbstractAnimator.prototype.stop = function() {
}; 
GCISAbstractAnimator.prototype.isFinished = function() {
	return true; 
}; 
function GCISAbstractScaleListener() {
}
GCISAbstractScaleListener.prototype.onScaleChange = function(_e) {
}; 
GCISAbstractScaleListener.prototype.onMinimumScaleChange = function(_f) {
}; 
GCISAbstractScaleListener.prototype.onMaximumScaleChange = function(_10) {
}; 
GCISAbstractScaleListener.prototype.toString = function() {
	return"scale listener " + this.name; 
}; 
function GCISAbstractProjection() {
}
GCISAbstractProjection.prototype.project = function(_11, phi, _13) {
}; 
GCISAbstractProjection.prototype.inverseProject = function(x, y, z) {
}; 
function ImagePreloadBgAnimator(_17) {
	this.layer = _17; 
}
ImagePreloadBgAnimator.prototype = new GCISAbstractAnimator(); 
ImagePreloadBgAnimator.prototype.animate = function() {
	var _18 = this.layer; 
	if(!_18.created ||!_18.visible ||!_18.preloadImages || _18.zooming) {
		return; 
	}
	var _19, _1a; 
	for(_19 = 0; _19 < _18.nbTileX; _19++) {
		for(_1a = 0; _1a < _18.nbTileY; _1a++) {
			var _1b = _18.images[_19][_1a]; 
			if(!_1b.visible) {
				var src = _18.calcTileSrc(_1b); 
				if(!_1b.loadImage) {
					_1b.loadImage = new Image(); 
				}
				if(_1b.loadImage.src != src) {
					_1b.loadImage.src = src; 
					return; 
				}
			}
		}
	}
}; 
function rectIntersectRect(x1, x2, y1, y2, X1, X2, Y1, Y2) {
	if(x1 > X2) {
		return false; 
	}
	if(x2 < X1) {
		return false; 
	}
	if(y1 > Y2) {
		return false; 
	}
	if(y2 < Y1) {
		return false; 
	}
	return true; 
}
function min(a, b) {
	if(a < b) {
		return a; 
	}
	else {
		return b; 
	}
}
function max(a, b) {
	if(a > b) {
		return a; 
	}
	else {
		return b; 
	}
}
function Browser(_1, _2) {
	this.doc = _1; 
	this.win = _2; 
	return this; 
}
Browser.prototype.getEventTarget = function(_3) {
	if(this.win.event) {
		return this.win.event.srcElement; 
	}
	else {
		return _3.target; 
	}
}; 
Browser.prototype.getXposition = function(_4) {
	if(this.win.event) {
		return this.win.event.clientX + this.doc.documentElement.scrollLeft + this.doc.body.scrollLeft; 
	}
	else {
		return _4.clientX + this.win.scrollX; 
	}
}; 
Browser.prototype.getYposition = function(_5) {
	if(this.win.event) {
		return this.win.event.clientY + this.doc.documentElement.scrollTop + this.doc.body.scrollTop; 
	}
	else {
		return _5.clientY + this.win.scrollY; 
	}
}; 
Browser.prototype.getElementLeft = function(_6) {
	var _7 = _6.offsetLeft; 
	var _8 = _6.offsetParent; 
	while(_8) {
		_7 += _8.offsetLeft; 
		_8 = _8.offsetParent; 
	}
	return _7; 
}; 
Browser.prototype.getElementTop = function(_9) {
	var _a = _9.offsetTop; 
	var _b = _9.offsetParent; 
	while(_b) {
		_a += _b.offsetTop; 
		_b = _b.offsetParent; 
	}
	return _a; 
}; 
Browser.prototype.attachListener = function(_c, _d, _e, _f) {
	if(_c.attachEvent) {
		if(_f) {
			_c.setCapture(); 
		}
		_c.attachEvent("on" + _d, _e); 
	}
	else {
		_c.addEventListener(_d, _e, _f); 
	}
}; 
Browser.prototype.detachListener = function(obj, _11, _12, _13) {
	if(obj.detachEven) {
		obj.detachEvent("on" + _11, _12); 
		if(_13) {
			obj.releaseCapture(); 
		}
	}
	else {
		obj.removeEventListener(_11, _12, _13); 
	}
}; 
Browser.prototype.cancelEvent = function(_14) {
	if(this.win.event) {
		this.win.event.cancelBubble = true; 
		this.win.event.returnValue = false; 
	}
	else {
		_14.preventDefault(); 
	}
}; 
var _debug = false; 
var _round = Math.round; 
function GCISRasterLayer() {
}
GCISRasterLayer.prototype = new GCISAbstractLayer(); 
GCISRasterLayer.prototype.initParameters = function(_1, _2, _3, _4, _5, _6, _7, _8, _9, _a) {
	this.preloadImages = false; 
	this.name = _1; 
	this.dynMap = _2; 
	this.transparentColor = 0; 
	this.server = _3; 
	this.mapName = _4; 
	this.tabName = _5; 
	this.visible = true; 
	this.created = false; 
	this.minscale = _7 ? _7 : _2.minScale; 
	this.maxscale = _8 ? _8 : _2.nbScales; 
	this.tileWidth = _9 ? _9 : this.dynMap.tileWidth; 
	this.tileHeight = _a ? _a : this.dynMap.tileHeight; 
	this.imgTileWidth = this.tileWidth; 
	this.imgTileHeight = this.tileHeight; 
	this.format = (_6 ? _6 : "png"); 
	this.protocol = "geoportal"; 
	if(_6 != "png" && _6 != "jpg") {
		this.format = "png"; 
	}
	if(this.preloadImages) {
		this.preloadAnimator = new ImagePreloadBgAnimator(this); 
		this.dynMap.addBackgroundTask(this.name + "_load", this.preloadAnimator, 300); 
	}
	this.userId = new DynMapGetUserId(this.dynMap); 
	this.div = null; 
	this.opacity = 100; 
	this.ratioZoom = 1; 
}; 
GCISRasterLayer.prototype.setCopyright = function(_b, _c) {
	this.textCopyright = _b; 
	this.imageCopyright = _c; 
}; 
GCISRasterLayer.prototype.setOpacity = function(_d) {
	if(_d < 0) {
		_d = 0; 
	}
	if(_d > 100) {
		_d = 100; 
	}
	var _e = this.opacity; 
	this.opacity = _d; 
	if(this.div.style.opacity !== undefined) {
		this.div.style.opacity = _d / 100; 
	}
	if(this.div.style.MozOpacity !== undefined) {
		this.div.style.MozOpacity = _d / 100; 
	}
	if(this.div.style.filter !== undefined) {
		this.div.style.filter = "alpha(opacity=" + _d + ")"; 
	}
	if(_e === 0 && this.opacity !== 0) {
		this.setVisible(true); 
		this.refresh(); 
	}
	if(this.opacity === 0) {
		this.setVisible(false); 
	}
}; 
GCISRasterLayer.prototype.getOpacity = function() {
	if(!this.opacity) {
		this.opacity = 100; 
	}
	return this.opacity; 
}; 
GCISRasterLayer.prototype.setUserId = function(_f) {
	this.userId = _f; 
}; 
GCISRasterLayer.prototype.setScale = function(_10) {
	if(this.zooming) {
		return; 
	}
	if(this.animationVisible) {
		this.hideAnimation(); 
	}
	if(this.isInterpolated(_10)) {
		var _11 = this.dynMap.xRatios[_10]/this.dynMap.xRatios[this.minscale];
		var _12 = this.dynMap.yRatios[_10]/this.dynMap.yRatios[this.minscale];
		if(this.dynMap.scale > this.maxscale) {
			_11 = this.dynMap.xRatios[_10]/this.dynMap.xRatios[this.maxscale];
			_12 = this.dynMap.yRatios[_10]/this.dynMap.yRatios[this.maxscale];
		}
		this.imgTileWidth = Math.round(this.tileWidth * _11); 
		this.imgTileHeight = Math.round(this.tileHeight * _12); 
	}
	else {
		this.imgTileWidth = parseInt(this.tileWidth); 
		this.imgTileHeight = parseInt(this.tileHeight); 
	}
}; 
GCISRasterLayer.prototype.calcMapTileWidth = function() {
	return this.tileWidth / this.dynMap.xRatios[this.dynMap.scale]; 
}; 
GCISRasterLayer.prototype.calcMapTileHeight = function() {
	return - this.tileHeight / this.dynMap.yRatios[this.dynMap.scale]; 
}; 
GCISRasterLayer.prototype.calcNumTileX = function(_13) {
	return Math.floor(_13 / this.calcMapTileWidth()); 
}; 
GCISRasterLayer.prototype.calcNumTileY = function(_14) {
	return Math.floor(_14 / this.calcMapTileHeight()); 
}; 
GCISRasterLayer.prototype.calcTileX0 = function(_15) {
	return Math.round(_15 * this.calcMapTileWidth()); 
}; 
GCISRasterLayer.prototype.calcTileY0 = function(_16) {
	return Math.round(_16 * this.calcMapTileHeight()); 
}; 
GCISRasterLayer.prototype.init = function(_17) {
	this.dynMap = _17; 
	var div = _17.createElt("div"); 
	div.id = _17.id + "_" + this.name; 
	div.style.width = "100%"; 
	div.style.height = "100%"; 
	div.style.position = "absolute"; 
	div.style.left = "0px"; 
	div.style.top = "0px"; 
	div.style.zIndex = 1; 
	_17.getMapDiv().appendChild(div); 
	this.div = div; 
	div = _17.createElt("div"); 
	div.id = _17.id + "_" + this.name + "_"; 
	div.style.width = "100%"; 
	div.style.height = "100%"; 
	div.style.zIndex =- 1; 
	_17.getMapDiv().appendChild(div); 
	this.created = false; 
}; 
GCISRasterLayer.prototype.remove = function(_19) {
	this.div.parentNode.removeChild(this.div); 
}; 
GCISRasterLayer.prototype.create = function() {
	this.div.innerHTML = ""; 
	this.marginX = 200; 
	this.marginY = 200; 
	var _1a = this.dynMap.width + 2 * this.marginX; 
	var _1b = this.dynMap.height + 2 * this.marginY; 
	var _1c = Math.floor((_1a / this.tileWidth) / this.ratioZoom) + 2; 
	var _1d = Math.floor((_1b / this.tileHeight) / this.ratioZoom) + 2; 
	var _1e; 
	var _1f; 
	this.images = []; 
	this.animImages = []; 
	this.nbTileX = _1c; 
	this.nbTileY = _1d; 
	for(_1e = 0; _1e < this.nbTileX; _1e++) {
		this.images[_1e] = []; 
		this.animImages[_1e] = []; 
		for(_1f = 0; _1f < this.nbTileY; _1f++) {
			this.images[_1e][_1f] = this.createImage(this.div, 1); 
			this.animImages[_1e][_1f] = this.createImage(this.div, 0); 
			if(_debug) {
				this.images[_1e][_1f].image.className = "tile"; 
				this.animImages[_1e][_1f].image.className = "anim"; 
			}
		}
	}
	this.created = true; 
}; 
GCISRasterLayer.prototype.createImage = function(div, z) {
	var _22 = this.dynMap.createElt("img"); 
	_22.style.width = this.tileWidth + "px"; 
	_22.style.height = this.tileHeight + "px"; 
	_22.style.visibility = "hidden"; 
	_22.style.position = "absolute"; 
	_22.style.left = "-500px"; 
	_22.style.zIndex = z; 
	_22.style.border = "0"; 
	_22.galleryImg = false; 
	_22.src = this.dynMap.defaultImg; 
	div.appendChild(_22); 
	var _23 = {
			nosrc : true, image : _22, visible : false}; 
	return _23; 
}; 
GCISRasterLayer.prototype.setTransparentColor = function(_24) {
	this.transparentColor = _24; 
}; 
GCISRasterLayer.prototype.setVisible = function(vis) {
	this.visible = vis; 
}; 
GCISRasterLayer.prototype.setVisibilityRange = function(_26, _27) {
	this.minscaleZoomed = _26; 
	this.maxscaleZoomed = _27; 
}; 
GCISRasterLayer.prototype.isInterpolated = function(_28) {
	if(!this.maxscaleZoomed ||!this.minscaleZoomed) {
		return false; 
	}
	if(_28) {
		return((_28 <= this.maxscaleZoomed) && (_28 >= this.minscaleZoomed)); 
	}
	return((this.dynMap.scale <= this.maxscaleZoomed) && (this.dynMap.scale >= this.minscaleZoomed)); 
}; 
GCISRasterLayer.prototype.calcLimits = function() {
	var _29 = this.dynMap.limits; 
	var X1 = this.calcNumTileX(_29[0]); 
	var X2 = this.calcNumTileX(_29[1]); 
	var Y1 = this.calcNumTileY(_29[2]); 
	var Y2 = this.calcNumTileY(_29[3]); 
	this.tileLimits = [X1, X2 + 1, Y1, Y2 + 1]; 
}; 
GCISRasterLayer.prototype.isVisible = function() {
	return this.visible; 
}; 
_encryptBase = function(_2e, _2f) {
	if(!isNaN(_2e)) {
		var r = _2e % _2f; 
		var _31; 
		if(_2e - r == 0) {
			_31 = __tabencryptxy[r]; 
		}
		else {
			_31 = _encryptBase(Math.floor((_2e - r) / _2f), _2f) + __tabencryptxy[r]; 
		}
	}
	else {
		_31 = 0; 
	}
	return _31; 
}; 
_calcTileSrcEncrypt = function(_32, _33, _34, _35, _36, _37) {
	var _38 = _32; 
	var _39 = _33; 
	var _3a = _34; 
	var _3b = _35; 
	var _3c = _36; 
	var _3d = _37; 
	var _3e; 
	if(__tabencryptcste[_38]) {
		_3e = __tabencryptcste[_38][_39]; 
		if(__tabencryptsignes) {
			if(_3a == _3c) {
				if(_3a == "-") {
					_3e += __tabencryptsignes[3]; 
				}
				else {
					_3e += __tabencryptsignes[0]; 
				}
			}
			else {
				if(_3a == "-") {
					_3e += __tabencryptsignes[2]; 
				}
				else {
					_3e += __tabencryptsignes[1]; 
				}
			}
		}
		else {
			if(_3a == "") {
				_3e += "/" + _3b; 
			}
			else {
				_3e += "/" + _3a + _3b; 
			}
			if(_3c == "") {
				_3e += "/" + _3d; 
			}
			else {
				_3e += "/" + _3c + _3d; 
			}
		}
		_3b = Number(_3b); 
		_3d = Number(_3d); 
		var _3f = _encryptBase(_3b, __baseutilise); 
		var _40 = _encryptBase(_3d, __baseutilise); 
		_3e += __tabencryptnbr62x[_3f.length]; 
		_3e += _3f + _40; 
	}
	else {
		if(_3a == _3c) {
			if(_3a == "") {
				_3e = _38 + _39 + "/" + _3b + "/" + _3d; 
			}
			else {
				_3e = _38 + _39 + "/" + _3a + _3b + "/" + _3c + _3d; 
			}
		}
		else {
			if(_3a == "") {
				_3e = _38 + _39 + "/" + _3b + "/" + _3c + _3d; 
			}
			else {
				_3e = _38 + _39 + "/" + _3a + _3b + "/" + _3d; 
			}
		}
	}
	return _3e; 
}; 
GCISRasterLayer.prototype.calcTileSrc = function(_41, _42, _43) {
	var _44 = (_43) ? false : true; 
	var src = this.server; 
	var _46; 
	var _47; 
	var _48; 
	var _49; 
	var _4a; 
	var _4b; 
	var _4c; 
	var _4d; 
	var _4e = this.format; 
	var _4f = _42 ? _42 : this.dynMap.scale; 
	if(this.protocol == "gcis") {
		src += "?XgoAnswer=MapImage&XgoBitmapFormat=PNG&XgoNbBits=24"; 
		src += "&XgoMapFile=" + this.mapName + "&XgoSetLogicalScale="; 
		src += _4f + "&sizex=" + this.dynMap.tileWidth; 
		src += "&sizey=" + this.dynMap.tileHeight; 
		src += "&XgoPointX=" + _41.mapx; 
		src += "&XgoPointY=" + _41.mapy; 
		if(this.tabName) {
			src += "&XgoTabs=" + this.tabName; 
		}
		if(this.transparentColor) {
			src += "&tr=" + this.transparentColor; 
		}
	}
	else {
		if(this.protocol == "geoportal") {
			if(!_4e) {
				_4e = "png8"; 
			}
			_47 = "/" + this.mapName; 
			_47 += "_"; 
			_47 += "_" + this.tabName; 
			_47 += "_" + _4e; 
			if(this.transparentColor) {
				_47 += "t"; 
			}
			_47 += "/" + this.dynMap.tileWidth; 
			_47 += "_" + this.dynMap.tileHeight; 
			_47 += "_"; 
			_46 = _47; 
			_48 = _4f; 
			_46 += _48; 
			var _50 = String(Math.abs(_41.mapTileX)); 
			for(i = 7 - _50.length; i > 0; i--) {
				_50 = "0" + _50; 
			}
			if(_41.mapTileX < 0) {
				_46 += "/" + "-" + _50; 
				_49 = "-"; 
				_4a = _50; 
			}
			else {
				_46 += "/" + _50; 
				_49 = ""; 
				_4a = _50; 
			}
			var _51 = String(Math.abs(_41.mapTileY)); 
			for(i = 7 - _51.length; i > 0; i--) {
				_51 = "0" + _51; 
			}
			if(_41.mapTileY < 0) {
				_46 += "/" + "-" + _51; 
				_4b = "-"; 
				_4c = _51; 
			}
			else {
				_46 += "/" + _51; 
				_4b = ""; 
				_4c = _51; 
			}
			_4d = "." + _4e.substring(0, 3); 
			if(__encryptage && _44) {
				src += _calcTileSrcEncrypt(_47, _48, _49, _4a, _4b, _4c) + _4d; 
			}
			else {
				src += _46 + _4d; 
			}
		}
		else {
			if(!_4e) {
				_4e = "png"; 
			}
			_47 = "/" + this.mapName; 
			_47 += "/" + this.tabName; 
			_47 += "/" + _4e + "_"; 
			if(this.transparentColor) {
				_47 += "1"; 
			}
			_47 += "/" + this.dynMap.tileWidth; 
			_47 += "_" + this.dynMap.tileHeight; 
			_47 += "/"; 
			_46 = _47; 
			_48 = _4f; 
			_46 += _48; 
			var _50 = String(Math.abs(_41.mapTileX)); 
			for(i = 7 - _50.length; i > 0; i--) {
				_50 = "0" + _50; 
			}
			if(_41.mapTileX < 0) {
				_46 += "/" + "-" + _50; 
				_49 = "-"; 
				_4a = _50; 
			}
			else {
				_46 += "/" + _50; 
				_49 = ""; 
				_4a = _50; 
			}
			var _51 = String(Math.abs(_41.mapTileY)); 
			for(i = 7 - _51.length; i > 0; i--) {
				_51 = "0" + _51; 
			}
			if(_41.mapTileY < 0) {
				_46 += "/" + "-" + _51; 
				_4b = "-"; 
				_4c = _51; 
			}
			else {
				_46 += "/" + _51; 
				_4b = ""; 
				_4c = _51; 
			}
			_4d = "_." + _4e.substring(0, 3); 
			if(__encryptage && _44) {
				src += _calcTileSrcEncrypt(_47, _48, _49, _4a, _4b, _4c) + _4d; 
			}
			else {
				src += _46 + _4d; 
			}
		}
	}
	return src; 
}; 
GCISRasterLayer.prototype.calcLimitsRatios = function(_52, _53) {
	var _54 = this.dynMap.limits; 
	var X1 = this.calcNumTileXRatio(_54[0], _52); 
	var X2 = this.calcNumTileXRatio(_54[1], _52); 
	var Y1 = this.calcNumTileYRatio(_54[2], _53); 
	var Y2 = this.calcNumTileYRatio(_54[3], _53); 
	this.tileLimits = [X1, X2 + 1, Y1, Y2 + 1]; 
}; 
GCISRasterLayer.prototype.calcMapTileWidthRatio = function(_59) {
	return this.tileWidth / _59; 
}; 
GCISRasterLayer.prototype.calcMapTileHeightRatio = function(_5a) {
	return - this.tileHeight / _5a; 
}; 
GCISRasterLayer.prototype.calcNumTileXRatio = function(_5b, _5c) {
	return Math.floor(_5b / this.calcMapTileWidthRatio(_5c)); 
}; 
GCISRasterLayer.prototype.calcNumTileYRatio = function(_5d, _5e) {
	return Math.floor(_5d / this.calcMapTileHeightRatio(_5e)); 
}; 
GCISRasterLayer.prototype.fillImageZoomed = function(_5f, _60, _61) {
	_5f.mapTileX = _60; 
	_5f.mapTileY = _61; 
	var tw = this.calcMapTileWidthRatio(this.dynMap.xRatios[this.minscale]); 
	var th = this.calcMapTileHeightRatio(this.dynMap.yRatios[this.minscale]); 
	if(this.dynMap.scale > this.maxscale) {
		tw = this.calcMapTileWidthRatio(this.dynMap.xRatios[this.maxscale]); 
		th = this.calcMapTileHeightRatio(this.dynMap.yRatios[this.maxscale]); 
	}
	_5f.mapx = Math.round(tw * _60 + tw / 2); 
	_5f.mapy = Math.round(th * _61 + th / 2); 
	this.positionImageZoomed(_5f); 
	_5f.nosrc = true; 
	_5f.visible = false; 
}; 
GCISRasterLayer.prototype.positionImageZoomed = function(_64) {
	_64.posx = this.dynMap.calcDoublePixelX(0, this.dynMap.xRatios[this.minscale]) + this.tileWidth * _64.mapTileX; 
	_64.posy = this.dynMap.calcDoublePixelY(0, this.dynMap.yRatios[this.minscale]) - this.tileHeight * _64.mapTileY - this.tileHeight; 
	if(this.dynMap.scale > this.maxscale) {
		_64.posx = this.dynMap.calcDoublePixelX(0, this.dynMap.xRatios[this.maxscale]) + this.tileWidth * _64.mapTileX; 
		_64.posy = this.dynMap.calcDoublePixelY(0, this.dynMap.yRatios[this.maxscale]) - this.tileHeight * _64.mapTileY - this.tileHeight; 
	}
}; 
GCISRasterLayer.prototype.zoomImageRatios = function(_65, _66, _67) {
	var _68 = this; 
	var cx = this.dynMap.centerX; 
	var cy = this.dynMap.centerY; 
	var x = Math.round(cx + (_65.posx - cx) * _66); 
	var y = Math.round(cy + (_65.posy - cy) * _67); 
	var _6d = Math.round(cx + (_65.posx - cx) * _66 + _68.tileWidth * _66); 
	var _6e = Math.round(cy + (_65.posy - cy) * _67 + _68.tileHeight * _67); 
	var i = _65.image; 
	i.style.left = x + "px"; 
	i.style.top = y + "px"; 
	_65.posx = x; 
	_65.posy = y; 
	i.style.width = (_6d - x) + "px"; 
	i.style.height = (_6e - y) + "px"; 
}; 
GCISRasterLayer.prototype.clearImage = function(_70) {
	if(__poi) {
		__poi.getObjectManager().unloadJS(_70); 
	}
	_70.image.src = this.dynMap.defaultImg; 
	_70.image.style.visibility = "hidden"; 
	_70.image.style.width = this.tileWidth + "px"; 
	_70.image.style.height = this.tileHeight + "px"; 
	_70.nosrc = true; 
	_70.visible = false; 
	_70.image.galleryImg = false; 
}; 
GCISRasterLayer.prototype.clearAll = function(_71) {
	if(!_71) {
		return; 
	}
	var _72, _73; 
	for(_72 = 0; _72 < this.nbTileX; _72++) {
		for(_73 = 0; _73 < this.nbTileY; _73++) {
			var _74 = _71[_72][_73]; 
			this.clearImage(_74); 
		}
	}
}; 
GCISRasterLayer.prototype.refreshRatios = function() {
	this.clearAll(this.images); 
	if(this.dynMap.scale < this.minscale) {
		this.calcLimitsRatios(this.dynMap.xRatios[this.minscale], this.dynMap.yRatios[this.minscale]); 
	}
	if(this.dynMap.scale > this.maxscale) {
		this.calcLimitsRatios(this.dynMap.xRatios[this.maxscale], this.dynMap.yRatios[this.maxscale]); 
	}
	var _75 = Math.floor(this.nbTileX / 2); 
	var _76 = Math.floor(this.nbTileY / 2); 
	this.centerX = Math.floor(this.dynMap.width / 2); 
	this.centerY = Math.floor(this.dynMap.height / 2); 
	var _77 = this.calcNumTileXRatio(this.dynMap.currentX, this.dynMap.xRatios[this.minscale]); 
	var _78 = this.calcNumTileYRatio(this.dynMap.currentY, this.dynMap.yRatios[this.minscale]); 
	if(this.dynMap.scale > this.maxscale) {
		_77 = this.calcNumTileXRatio(this.dynMap.currentX, this.dynMap.xRatios[this.maxscale]); 
		_78 = this.calcNumTileYRatio(this.dynMap.currentY, this.dynMap.yRatios[this.maxscale]); 
	}
	var _79, _7a; 
	for(_79 = 0; _79 < (this.nbTileX); _79++) {
		for(_7a = 0; _7a < (this.nbTileY); _7a++) {
			var _7b = this.images[_79][_7a]; 
			var _7c = _77 + _79 - _75; 
			var _7d = _78 + _7a - _76; 
			this.fillImageZoomed(_7b, _7c, _7d); 
			this.updateMapImage(_7b); 
		}
	}
}; 
GCISRasterLayer.prototype.refresh = function(_7e) {
	if(this.preloadAnimator) {
		this.preloadAnimator.lastTime = new Date().getTime(); 
	}
	var _7f = (this.width != this.dynMap.width); 
	var _80 = 1; 
	if(this.dynMap.scale < this.minscale && this.dynMap.scale >= this.minscaleZoomed) {
		_80 = this.dynMap.xRatios[this.dynMap.scale]/this.dynMap.xRatios[this.minscale];
	}
	if(this.dynMap.scale > this.maxscale && this.dynMap.scale <= this.maxscaleZoomed) {
		_80 = this.dynMap.xRatios[this.dynMap.scale]/this.dynMap.xRatios[this.maxscale];
	}
	if(_80 != this.ratioZoom) {
		this.ratioZoom = _80; 
		_7f = true; 
	}
	if(!this.created) {
		_7f = true; 
	}
	if(this.visible && _7f) {
		this.create(); 
	}
	if(!this.visible && this.created) {
		this.div.innerHTML = ""; 
		this.created = false; 
	}
	this.width = this.dynMap.width; 
	this.height = this.dynMap.height; 
	if(!this.visible) {
		return; 
	}
	if(!(this.dynMap.scale > this.minscale && this.dynMap.scale < this.maxscale)) {
		if(this.isInterpolated()) {
			this.refreshRatios(); 
			return; 
		}
	}
	this.clearAll(this.images); 
	this.calcLimits(); 
	var _81 = Math.floor(this.nbTileX / 2); 
	var _82 = Math.floor(this.nbTileY / 2); 
	this.centerX = Math.floor(this.dynMap.width / 2); 
	this.centerY = Math.floor(this.dynMap.height / 2); 
	var _83 = this.calcNumTileX(this.dynMap.currentX); 
	var _84 = this.calcNumTileY(this.dynMap.currentY); 
	var _85, _86; 
	for(_85 = 0; _85 < this.nbTileX; _85++) {
		for(_86 = 0; _86 < this.nbTileY; _86++) {
			var _87 = this.images[_85][_86]; 
			var _88 = _83 + _85 - _81; 
			var _89 = _84 + _86 - _82; 
			this.fillImage(_87, _88, _89); 
			this.updateMapImage(_87); 
		}
	}
}; 
GCISRasterLayer.prototype.fillImage = function(_8a, _8b, _8c) {
	_8a.mapTileX = _8b; 
	_8a.mapTileY = _8c; 
	var tw = this.calcMapTileWidth(); 
	var th = this.calcMapTileHeight(); 
	_8a.mapx = Math.round(tw * _8b + tw / 2); 
	_8a.mapy = Math.round(th * _8c + th / 2); 
	this.positionImage(_8a); 
	_8a.nosrc = true; 
	_8a.visible = false; 
}; 
GCISRasterLayer.prototype.positionImage = function(_8f) {
	_8f.posx = this.dynMap.calcPixelX(0) + this.tileWidth * _8f.mapTileX; 
	_8f.posy = this.dynMap.calcPixelY(0) - this.tileHeight * _8f.mapTileY - this.tileHeight; 
}; 
GCISRasterLayer.prototype.updateMapImage = function(_90) {
	var vis = true; 
	var _92 = 2; 
	var _93 = 2; 
	var x1, x2, y1, y2, _98, _99; 
	if(this.ratioZoom == 1) {
		x1 = _90.posx; 
		x2 = _90.posx + this.tileWidth; 
		y1 = _90.posy; 
		y2 = _90.posy + this.tileHeight; 
		_98 = this.tileWidth; 
		_99 = this.tileHeight; 
	}
	else {
		if(this.ratioZoom > 1) {
			x1 = _90.posx / this.ratioZoom; 
			x2 = (_90.posx / this.ratioZoom + this.tileWidth * this.ratioZoom); 
			y1 = _90.posy / this.ratioZoom; 
			y2 = (_90.posy / this.ratioZoom + this.tileHeight * this.ratioZoom); 
			_98 = this.tileWidth * this.ratioZoom; 
			_99 = this.tileHeight * this.ratioZoom; 
		}
		else {
			x1 = _90.posx * this.ratioZoom; 
			x2 = (_90.posx * this.ratioZoom + this.tileWidth / this.ratioZoom); 
			y1 = _90.posy * this.ratioZoom; 
			y2 = (_90.posy * this.ratioZoom + this.tileHeight / this.ratioZoom); 
			_98 = this.tileWidth / this.ratioZoom; 
			_99 = this.tileHeight / this.ratioZoom; 
		}
	}
	if(!rectIntersectRect(x1, x2, y1, y2, - _92 - _98, this.dynMap.width + _92 + _98, - _93 - _99, this.dynMap.height + _93 + _99)) {
		vis = false; 
	}
	if(!vis) {
		if(_90.visible) {
			this.clearImage(_90); 
		}
	}
	else {
		if(_90.nosrc) {
			if(!this.isVisible() || this.dynMap.scale > this.maxscale || this.dynMap.scale < this.minscale ||!rectIntersectRect(_90.mapTileX, _90.mapTileX, _90.mapTileY, _90.mapTileY, this.tileLimits[0], this.tileLimits[1], this.tileLimits[2], this.tileLimits[3])) {
				if(this.dynMap.scale > this.minscale && this.dynMap.scale < this.maxscale) {
					_90.image.src = this.dynMap.defaultImg; 
					_90.loadImage = null; 
					this.displayCopyright = false; 
				}
				else {
					if(this.dynMap.scale > this.maxscale) {
						if(this.isInterpolated()) {
							var _9a = this.dynMap.xRatios[this.dynMap.scale]/this.dynMap.xRatios[this.maxscale];
							var _9b = this.dynMap.yRatios[this.dynMap.scale]/this.dynMap.yRatios[this.maxscale];
							this.displayCopyright = true; 
							var _9c = this.calcTileSrc(_90, this.maxscale); 
							_90.image.src = _9c; 
							this.zoomImageRatios(_90, _9a, _9b); 
						}
					}
					else {
						if(this.isInterpolated()) {
							var _9a = this.dynMap.xRatios[this.dynMap.scale]/this.dynMap.xRatios[this.minscale];
							var _9b = this.dynMap.yRatios[this.dynMap.scale]/this.dynMap.yRatios[this.minscale];
							this.displayCopyright = true; 
							var _9c = this.calcTileSrc(_90, this.minscale); 
							_90.image.src = _9c; 
							this.zoomImageRatios(_90, _9a, _9b); 
						}
					}
				}
			}
			else {
				this.displayCopyright = true; 
				var _9d = this.calcTileSrc(_90, false, true); 
				_90.image.srcdecrypt = _9d; 
				var src = this.calcTileSrc(_90); 
				_90.image.src = src; 
				if(__poi) {
					__poi.getObjectManager().loadJS(_90, this); 
				}
			}
			_90.nosrc = false; 
		}
		if(!_90.visible) {
			_90.image.style.visibility = "visible"; 
			_90.visible = true; 
		}
		_90.image.style.left = _round(_90.posx) + "px"; 
		_90.image.style.top = _round(_90.posy) + "px"; 
		_90.image.style.width = (_round(_90.posx + this.tileWidth) - _round(_90.posx)) * this.ratioZoom + "px"; 
		_90.image.style.height = (_round(_90.posy + this.tileHeight) - _round(_90.posy)) * this.ratioZoom + "px"; 
	}
}; 
GCISRasterLayer.prototype.correctMapImage = function(_9f) {
	var _a0 = 0; 
	var _a1 = 0; 
	var m = 0; 
	if(_9f.posx > this.dynMap.width + this.marginX + m) {
		_a0 =- this.nbTileX; 
	}
	else {
		if(_9f.posx <- this.marginX - this.tileWidth - m) {
			_a0 = this.nbTileX; 
		}
	}
	if(_9f.posy > this.dynMap.height + this.marginY + m) {
		_a1 =- this.nbTileY; 
	}
	else {
		if(_9f.posy <- this.marginY - this.tileHeight - m) {
			_a1 = this.nbTileY; 
		}
	}
	if(_a0 !== 0 || _a1 !== 0) {
		this.fillImage(_9f, _9f.mapTileX + _a0, _9f.mapTileY - _a1); 
		this.clearImage(_9f); 
	}
	this.updateMapImage(_9f); 
}; 
GCISRasterLayer.prototype.move = function(dx, dy, _a5) {
	if(this.animationVisible) {
		this.hideAnimation(); 
	}
	if(!this.isVisible()) {
		return; 
	}
	if(!(this.dynMap.scale > this.minscale && this.dynMap.scale < this.maxscale)) {
		if(this.isInterpolated()) {
			this.refreshRatios(); 
			return; 
		}
	}
	var _a6; 
	var _a7; 
	for(_a6 = 0; _a6 < this.nbTileX; _a6++) {
		for(_a7 = 0; _a7 < this.nbTileY; _a7++) {
			var _a8 = this.images[_a6][_a7]; 
			this.positionImage(_a8); 
			this.correctMapImage(_a8); 
		}
	}
}; 
if(GCISRasterLayer) {
	GCISRasterLayer.prototype.animateZoom = function(_a9, _aa, _ab) {
		var _ac = new GCISZoomAnimator(this, _a9, _aa, this.dynMap.animationTime, _ab); 
		this.dynMap.startAnimation(_ac); 
	}; 
}
if(GCISRasterLayer) {
	GCISRasterLayer.prototype.hideAnimation = function() {
		this.clearAll(this.animImages); 
		this.animationVisible = false; 
	}; 
}
function GCISZoomAnimator(_1, _2, _3, _4, _5) {
	this.layer = _1; 
	this.finished = false; 
	this.totalTime = _4; 
	this.startTime = (new Date()).getTime(); 
	this.endTime = this.startTime + _4; 
	this.beginScale = _1.dynMap.scale; 
	this.ratiox = _2; 
	this.ratioy = _3; 
	this.newscale = _5; 
	return this; 
}
GCISZoomAnimator.prototype = new GCISAbstractAnimator(); 
GCISZoomAnimator.prototype.start = function(_6) {
	this.dynMap = _6; 
	this.layer.zooming = true; 
	this.interpolationMinZoomed = false; 
	this.prepareAnimation(); 
}; 
GCISZoomAnimator.prototype.animate = function() {
	if(this.finished) {
		this.layer.zooming = false; 
		return; 
	}
	var _7 = (new Date()).getTime(); 
	if(_7 > this.endTime) {
		this.stop(); 
		return; 
	}
	var _8 = (_7 - this.startTime) / this.totalTime; 
	if(_8 > 1) {
		_8 = 1; 
	}
	var rx = 1 + (this.ratiox - 1) * _8; 
	var ry = 1 + (this.ratioy - 1) * _8; 
	this.zoomAnimation(rx, ry); 
}; 
GCISZoomAnimator.prototype.stop = function(_b) {
	this.finished = true; 
	this.endAnimation(); 
	this.layer.zooming = false; 
	if(this.layer.animationVisible) {
		if((this.layer.minscaleZoomed && this.layer.dynMap.scale < this.layer.minscaleZoomed) || (!this.layer.minscaleZoomed && this.layer.dynMap.scale < this.layer.minscale) || (this.layer.dynMap.scale > this.layer.maxscale)) {
			this.layer.hideAnimation(); 
		}
	}
	this.interpolationZoomAnimed = false; 
}; 
GCISZoomAnimator.prototype.isFinished = function() {
	return this.finished; 
}; 
GCISZoomAnimator.prototype.prepareAnimation = function() {
	var _c = this.layer; 
	if(!_c.animImages) {
		return; 
	}
	var _d = _c.images; 
	_c.images = _c.animImages; 
	_c.animImages = _d; 
	this.saveIndex = _c.div.style.zIndex; 
	_c.div.style.zIndex = 98; 
	var _e, _f; 
	for(_e = 0; _e < _c.nbTileX; _e++) {
		for(_f = 0; _f < _c.nbTileY; _f++) {
			var _10 = _c.images[_e][_f]; 
			var _11 = _c.animImages[_e][_f]; 
			_11.image.style.zIndex = 99; 
			_11.image.style.backgroundColor = "#FFFFFF"; 
			_10.image.style.zIndex = 1; 
			_10.image.style.backgroundColor = "transparent"; 
			_c.clearImage(_10); 
		}
	}
}; 
GCISZoomAnimator.prototype.endAnimation = function() {
	this.zoomAnimation(this.ratiox, this.ratioy); 
	this.setAnimationIndex(0); 
	var _12 = this.layer; 
	_12.div.style.zIndex = this.saveIndex; 
	if(this.interpolationZoomAnimed) {
		var _13 = _12.dynMap.xRatios[_12.dynMap.scale]/_12.dynMap.xRatios[_12.minscale];
		var _14 = _12.dynMap.yRatios[_12.dynMap.scale]/_12.dynMap.yRatios[_12.minscale];
		_12.imgTileWidth = Math.round(_12.tileWidth * _13); 
		_12.imgTileHeight = Math.round(_12.tileHeight * _14); 
		if(_12.imgTileWidth < _12.tileWidth) {
			_12.imgTileWidth = _12.tileWidth; 
		}
		if(_12.imgTileHeight < _12.tileHeight) {
			_12.imgTileHeight = _12.tileHeight; 
		}
	}
}; 
GCISZoomAnimator.prototype.zoomAnimation = function(_15, _16) {
	var _17 = this.layer; 
	if(!_17.images) {
		return; 
	}
	var _18 = _17.tileWidth; 
	var _19 = _17.tileHeight; 
	if(_17.minscaleZoomed && ((_17.dynMap.scale < _17.minscaleZoomed) || (this.newscale < _17.minscaleZoomed))) {
		var _1a = _17.dynMap.xRatios[this.newscale]/_17.dynMap.xRatios[_17.minscale];
		var _1b = _17.dynMap.yRatios[this.newscale]/_17.dynMap.yRatios[_17.minscale];
		_17.imgTileWidth = Math.round(_17.tileWidth * _1a); 
		_17.imgTileHeight = Math.round(_17.tileHeight * _1b); 
		this.interpolationMinZoomed = true; 
		this.interpolationZoomAnimed = false; 
		_17.animationVisible = true; 
		return; 
	}
	if(this.interpolationMinZoomed) {
		return; 
	}
	if((_17.isInterpolated(this.newscale)) || (_17.isInterpolated(_17.dynMap.scale)) || this.interpolationZoomAnimed) {
		this.interpolationZoomAnimed = true; 
		_18 = _17.imgTileWidth; 
		_19 = _17.imgTileHeight; 
	}
	var _1c, _1d; 
	for(_1c = 0; _1c < _17.nbTileX; _1c++) {
		for(_1d = 0; _1d < _17.nbTileY; _1d++) {
			var _1e = _17.animImages[_1c][_1d]; 
			this.zoomImage(_1e, _15, _16, _18, _19); 
		}
	}
	_17.animationVisible = true; 
}; 
GCISZoomAnimator.prototype.zoomImage = function(_1f, _20, _21, _22, _23) {
	var _24 = this.layer; 
	var cx = this.dynMap.centerX; 
	var cy = this.dynMap.centerY; 
	var x = Math.round(cx + (_1f.posx - cx) * _20); 
	var y = Math.round(cy + (_1f.posy - cy) * _21); 
	var i = _1f.image; 
	i.style.left = x + "px"; 
	i.style.top = y + "px"; 
	i.style.width = Math.round(_22 * _20 + 0.5) + "px"; 
	i.style.height = Math.round(_23 * _21 + 0.5) + "px"; 
}; 
GCISZoomAnimator.prototype.setAnimationIndex = function(_2a) {
	var _2b = this.layer; 
	var _2c, _2d; 
	for(_2c = 0; _2c < _2b.nbTileX; _2c++) {
		for(_2d = 0; _2d < _2b.nbTileY; _2d++) {
			var _2e = _2b.animImages[_2c][_2d]; 
			_2e.image.style.zIndex = _2a; 
		}
	}
}; 
function GCISZoomSelection(_2f, _30, _31) {
	this.dynMap = _2f; 
	this.initialx = _30; 
	this.initialy = _31; 
	this.posx = _30; 
	this.posy = _31; 
	this.init(this.dynMap); 
	return this; 
}
GCISZoomSelection.prototype = new GCISAbstractLayer(); 
GCISZoomSelection.prototype.init = function(_32) {
	this.dynMap = _32; 
	var div = _32.createElt("div"); 
	div.className = "zoomSelector"; 
	_32.getDiv().appendChild(div); 
	this.div = div; 
	this.div.style.left = this.posx + "px"; 
	this.div.style.top = this.posy + "px"; 
	this.div.style.height = 0 + "px"; 
	this.div.style.width = 0 + "px"; 
	this.div.zoomsel = this; 
	this.height = 0; 
	this.width = 0; 
}; 
GCISZoomSelection.prototype.remove = function(_34) {
	this.div.parentNode.removeChild(this.div); 
}; 
GCISZoomSelection.prototype.setDelta = function(dx, dy) {
	if(dx < 0) {
		this.div.style.left = (this.posx + dx) + "px"; 
	}
	else {
		this.div.style.left = this.posx + "px"; 
	}
	if(dy < 0) {
		this.div.style.top = (this.posy + dy) + "px"; 
	}
	else {
		this.div.style.top = this.posy + "px"; 
	}
	this.div.style.width = (this.width + Math.abs(dx)) + "px"; 
	this.div.style.height = (this.height + Math.abs(dy)) + "px"; 
}; 
GCISZoomSelection.prototype.getXmin = function() {
	return parseInt(this.div.style.left); 
}; 
GCISZoomSelection.prototype.getXmax = function() {
	return(parseInt(this.div.style.left) + parseInt(this.div.style.width)); 
}; 
GCISZoomSelection.prototype.getYmin = function() {
	return parseInt(this.div.style.top); 
}; 
GCISZoomSelection.prototype.getYmax = function() {
	return(parseInt(this.div.style.top) + parseInt(this.div.style.height)); 
}; 
GCISZoomSelection.prototype.refresh = function(_37) {
}; 
var _debug = false; 
function GCISGlobalView(_1, _2, _3, _4, _5, _6, _7, _8, _9, _a, _b, _c) {
	this.preloadImages = false; 
	this.dynMap = _1; 
	this.initialx = _2; 
	this.initialy = _3; 
	this.posx = _2; 
	this.posy = _3; 
	this.initialw = _4; 
	this.initialh = _5; 
	this.width = _4; 
	this.height = _5; 
	this.mapName = _6; 
	this.tabName = _7; 
	this.format = _8; 
	this.visible = true; 
	this.protocol = "geoportal"; 
	this.server = this.dynMap.server; 
	this.minscale = _1.minScale; 
	this.maxscale = _1.nbScales; 
	this.isOnTheMap = true; 
	if(_9) {
		this.div = _9; 
		this.div.style.width = this.width + "px"; 
		this.div.style.height = this.height + "px"; 
		this.isOnTheMap = false; 
	}
	this.zooms = []; 
	this.scales = []; 
	var i; 
	for(i = 0; i < this.dynMap.nbScales - 1; i++) {
		this.zooms[i] = 1; 
		this.scales[i] = this.dynMap.nbScales - 1; 
	}
	if(this.preloadImages) {
		this.preloadAnimator = new ImagePreloadBgAnimator(this); 
		this.dynMap.addBackgroundTask("globalview_load", this.preloadAnimator, 300); 
	}
	if(_a) {
		this.zooms = _a; 
		this.zoomsFixed = true; 
	}
	if(_b) {
		this.scales = _b; 
	}
	this.isFixed = _c; 
	this.autoZoomReduction = false; 
	this.margins = [8, - 2, - 1, 7]; 
	if(this.isFixed) {
		if(__territoire === "metropole") {
			this.initCenterX = 17697800; 
			this.initCenterY = 513803300; 
		}
		else {
			if(__territoire === "reunion") {
				this.initCenterX = 577044300; 
				this.initCenterY =- 235172750; 
			}
			else {
				if(__territoire === "guyane") {
					this.initCenterX =- 588079150; 
					this.initCenterY = 43129950; 
				}
				else {
					if(__territoire === "guadeloupe") {
						this.initCenterX =- 667336400; 
						this.initCenterY = 188885300; 
					}
					else {
						if(__territoire === "martinique") {
							this.initCenterX =- 656118900; 
							this.initCenterY = 162844250; 
						}
						else {
							if(__territoire === "monde") {
								this.initCenterX = 282027; 
								this.initCenterY = 5833606; 
							}
							else {
								this.initCenterX = this.dynMap.limits[0] + (this.dynMap.limits[1] - this.dynMap.limits[0]) / 2; 
								this.initCenterY = this.dynMap.limits[2] + (this.dynMap.limits[3] - this.dynMap.limits[2]) / 2; 
							}
						}
					}
				}
			}
		}
	}
}
GCISGlobalView.prototype = new GCISAbstractLayer(); 
GCISGlobalView.prototype.calcMapTileWidth = function() {
	return this.tileWidth / (this.dynMap.xRatios[(this.scales[this.dynMap.scale - 1])]); 
}; 
GCISGlobalView.prototype.calcMapTileHeight = function() {
	return - this.tileHeight / (this.dynMap.yRatios[(this.scales[this.dynMap.scale - 1])]); 
}; 
GCISGlobalView.prototype.calcNumTileX = function(_e) {
	return Math.floor(_e / this.calcMapTileWidth()); 
}; 
GCISGlobalView.prototype.calcNumTileY = function(_f) {
	return Math.floor(_f / this.calcMapTileHeight()); 
}; 
GCISGlobalView.prototype.calcMapDeltaX = function(_10, _11) {
	return _10 + _11 / this.dynMap.xRatios[(this.scales[this.dynMap.scale - 1])]; 
}; 
GCISGlobalView.prototype.calcMapDeltaY = function(_12, _13) {
	return _12 + _13 / this.dynMap.yRatios[(this.scales[this.dynMap.scale - 1])]; 
}; 
GCISGlobalView.prototype.calcMapX = function(_14) {
	return(_14 - this.dynMap.centerX) / this.dynMap.xRatios[(this.scales[this.dynMap.scale - 1])] + this.dynMap.currentX; 
}; 
GCISGlobalView.prototype.calcMapY = function(_15) {
	return(_15 - this.dynMap.centerY) / this.dynMap.yRatios[(this.scales[this.dynMap.scale - 1])] + this.dynMap.urrentY; 
}; 
GCISGlobalView.prototype.pan = function(_16) {
	var _17 = this.globalview.pandiv; 
	_17.beginDragCursorX = this.globalview.dynMap.browser.getXposition(_16); 
	_17.beginDragCursorY = this.globalview.dynMap.browser.getYposition(_16); 
	_17.beginDragX = this.globalview.dynMap.currentX; 
	_17.beginDragY = this.globalview.dynMap.currentY; 
	_17.tmpX = _17.beginDragCursorX; 
	_17.tmpY = _17.beginDragCursorY; 
	_17.diffX = 0; 
	_17.diffY = 0; 
	this.globalview.dynMap.currentDoc.globalview = this.globalview; 
	if(this.globalview.dynMap.currentDoc.onmousemove) {
		this.globalview.documentOnMouseMove = this.globalview.dynMap.currentDoc.onmousemove; 
	}
	if(this.globalview.dynMap.currentDoc.onmouseup) {
		this.globalview.documentOnMouseUp = this.globalview.dynMap.currentDoc.onmouseup; 
	}
	this.globalview.dynMap.currentDoc.onmousemove = function(_18) {
		this.globalview.panning = true; 
		var _19 = this.globalview.dynMap.browser; 
		var _1a = _19.getXposition(_18); 
		var _1b = _19.getYposition(_18); 
		var dx = _1a - _17.tmpX; 
		var dy = _1b - _17.tmpY; 
		var _1e = _19.getElementLeft(this.globalview.div); 
		var _1f = _19.getElementTop(this.globalview.div); 
		_17.style.top = (parseInt(_17.style.top) + dy) + "px"; 
		_17.style.left = (parseInt(_17.style.left) + dx) + "px"; 
		_17.tmpX = _19.getXposition(_18); 
		_17.tmpY = _19.getYposition(_18); 
		var _20 = _1e + parseInt(this.globalview.width) - _19.getElementLeft(_17) + dx - parseInt(_17.style.width); 
		var _21 = _19.getElementLeft(_17) + parseInt(_17.style.left) + dx - _1e + parseInt(this.globalview.minidiv.style.left); 
		var _22 = _1f + parseInt(this.globalview.height) - _19.getElementTop(_17) - parseInt(_17.style.height); 
		var _23 = _19.getElementTop(_17) + parseInt(_17.style.top) - _1f + parseInt(this.globalview.minidiv.style.top); 
		var _24 = this.globalview.margins[0]; 
		var _25 = this.globalview.margins[1]; 
		var _26 = this.globalview.margins[2]; 
		var _27 = this.globalview.margins[3]; 
		if(!this.globalview.isFixed) {
			if(_20 < _24) {
				_17.style.left = (parseInt(_17.style.left) - dx - 1) + "px"; 
				_17.diffX = _17.diffX - dx - 1; 
			}
			if(_21 < _25) {
				_17.style.left = (parseInt(_17.style.left) - dx + 1) + "px"; 
				_17.diffX = _17.diffX - dx + 1; 
			}
			if(_23 < _26) {
				_17.style.top = (parseInt(_17.style.top) - dy + 1) + "px"; 
				_17.diffY = _17.diffY - dy + 1; 
			}
			if(_22 < _27) {
				_17.style.top = (parseInt(_17.style.top) - dy - 1) + "px"; 
				_17.diffY = _17.diffY - dy - 1; 
			}
		}
		if((_20 < _24) || (_21 < _25) || (_22 < _27) || (_23 < _26)) {
			if(!this.miniscrolling &&!this.globalview.isFixed) {
				this.miniscrolling = true; 
				this.globalview.dynMap.currentX = this.globalview.calcMapDeltaX(_17.beginDragX, - dx / this.globalview.zooms[this.globalview.dynMap.scale - 1]); 
				this.globalview.dynMap.currentY = this.globalview.calcMapDeltaY(_17.beginDragY, - dy / this.globalview.zooms[this.globalview.dynMap.scale - 1]); 
				this.globalview.animateScroll( - dx, - dy); 
			}
		}
		else {
			this.miniscrolling = false; 
			_17.beginDragX = this.globalview.dynMap.currentX; 
			_17.beginDragY = this.globalview.dynMap.currentY; 
		}
		if(!this.miniscrolling) {
			this.globalview.dynMap.stopAnimation(); 
		}
		_19.cancelEvent(_18); 
	}; 
	this.globalview.dynMap.currentDoc.onmouseup = function(_28) {
		var dx = _17.tmpX - _17.beginDragCursorX + _17.diffX; 
		var dy = _17.tmpY - _17.beginDragCursorY + _17.diffY; 
		_17.beginDragX = this.globalview.dynMap.currentX; 
		_17.beginDragY = this.globalview.dynMap.currentY; 
		this.globalview.panning = false; 
		var _2b = this.globalview.dynMap.browser.getElementLeft(this.globalview.div); 
		var _2c = this.globalview.dynMap.browser.getElementTop(this.globalview.div); 
		if((_17.tmpX >= _2b) && (_17.tmpX <= (_2b + parseInt(this.globalview.div.style.width))) && (_17.tmpY >= _2c) && (_17.tmpY <= (_2c + parseInt(this.globalview.div.style.height)))) {
			this.globalview.cancelclick = true; 
		}
		else {
			this.globalview.cancelclick = false; 
		}
		this.globalview.dynMap.stopAnimation(); 
		DynMapCenter(this.globalview.dynMap, this.globalview.calcMapDeltaX(this.globalview.pandiv.beginDragX, dx / this.globalview.zooms[this.globalview.dynMap.scale - 1]), this.globalview.calcMapDeltaY(this.globalview.pandiv.beginDragY, dy / this.globalview.zooms[this.globalview.dynMap.scale - 1])); 
		this.onmousemove = null; 
		this.onmouseup = null; 
		this.globalview.dynMap.browser.cancelEvent(_28); 
		if(this.globalview.documentOnMouseMove) {
			this.onmousemove = this.globalview.documentOnMouseMove; 
			this.globalview.documentOnMouseMove = null; 
		}
		if(this.globalview.documentOnMouseUp) {
			this.onmouseup = this.globalview.documentOnMouseUp; 
			this.globalview.documentOnMouseUp = null; 
		}
		this.globalview = null; 
	}; 
}; 
GCISGlobalView.prototype.init = function(_2d) {
	this.dynMap = _2d; 
	if(this.isOnTheMap) {
		var div = this.dynMap.createElt("div"); 
		div.className = "mapglobalview"; 
		div.style.width = this.width + "px"; 
		div.style.height = this.height + "px"; 
		this.dynMap.getDiv().appendChild(div); 
		this.div = div; 
		this.calcGlobalViewPositions(); 
	}
	this.visible = true; 
	this.create(); 
	this.minidiv.className = "minidiv"; 
	this.minidiv.style.position = "absolute"; 
	this.minidiv.style.width = this.width + "px"; 
	this.minidiv.style.height = this.height + "px"; 
	this.minidiv.globalview = this; 
	this.minidiv.onclick = function(_2f) {
		if(this.globalview.cancelclick) {
			this.globalview.cancelclick = false; 
			return; 
		}
		this.beginDragX = this.globalview.initCenterX ? this.globalview.initCenterX : this.globalview.dynMap.currentX; 
		this.beginDragY = this.globalview.initCenterY ? this.globalview.initCenterY : this.globalview.dynMap.currentY; 
		var _30 = this.globalview.dynMap.browser.getXposition(_2f); 
		var _31 = this.globalview.dynMap.browser.getYposition(_2f); 
		var _32 = this.globalview.dynMap.browser.getElementLeft(this.globalview.div); 
		var _33 = this.globalview.dynMap.browser.getElementTop(this.globalview.div); 
		var _34 = _32 + this.globalview.width / 2; 
		var _35 = _33 + this.globalview.height / 2; 
		var _36 = Math.floor(this.globalview.rectWidth / 2); 
		var _37 = Math.floor(this.globalview.rectHeight / 2); 
		if(!/MSIE/.test(navigator.userAgent)){_36--;
		_37--; 
		}
		var dx = _30 - _34 - _36; 
		var dy = _31 - _35 - _37; 
		DynMapCenter(this.globalview.dynMap, this.globalview.calcMapDeltaX(this.beginDragX, dx / this.globalview.zooms[this.globalview.dynMap.scale - 1]), this.globalview.calcMapDeltaY(this.beginDragY, dy / this.globalview.zooms[this.globalview.dynMap.scale - 1])); 
		this.globalview.dynMap.browser.cancelEvent(_2f); 
	}; 
	this.div.appendChild(this.minidiv); 
	this.pandiv = this.dynMap.createElt("div"); 
	this.pandiv.className = "pandiv"; 
	this.pandiv.style.position = "absolute"; 
	this.pandiv2 = this.dynMap.createElt("div"); 
	this.pandiv2.style.position = "absolute"; 
	this.pandiv2.className = "pandiv"; 
	this.pandiv.appendChild(this.pandiv2); 
	this.resizeRect(); 
	this.pandiv.globalview = this; 
	this.pandiv.onmousedown = this.pan; 
	this.minidiv.appendChild(this.pandiv); 
}; 
GCISGlobalView.prototype.remove = function(_3a) {
	if(this.isOnTheMap) {
		this.div.parentNode.removeChild(this.div); 
	}
	else {
		this.clear(); 
	}
}; 
GCISGlobalView.prototype.clear = function() {
	this.div.removeChild(this.minidiv); 
}; 
GCISGlobalView.prototype.animateView = function() {
	var _3b = new GCISGlobalViewAnimator(this.globalView, 800); 
	this.dynMap.startAnimation(_3b); 
}; 
GCISGlobalView.prototype.animateScroll = function(dx, dy) {
	var _3e = 10; 
	var _3f = new GCISGlobalViewScrollAnimator(this, _3e * dx, _3e * dy); 
	this.dynMap.startAnimation(_3f, 1000); 
}; 
GCISGlobalView.prototype.calcGlobalViewPositions = function() {
	var h = (this.dynMap.window.innerHeight ? this.dynMap.window.innerHeight : this.dynMap.currentDoc.body.clientHeight); 
	var t = this.dynMap.browser.getElementTop(this.dynMap.mainDiv); 
	var w = (this.dynMap.window.innerWidth ? this.dynMap.window.innerWidth : this.dynMap.currentDoc.body.clientWidth); 
	var l = this.dynMap.browser.getElementLeft(this.dynMap.mainDiv); 
	if(this.initialx < 0) {
		this.posx = w - l + this.initialx - this.width - this.dynMap.marginright + 1; 
	}
	if(this.initialy < 0) {
		this.posy = h - t + this.initialy - this.height - this.dynMap.marginbottom + 1; 
	}
	this.div.style.left = this.posx + "px"; 
	this.div.style.top = this.posy + "px"; 
}; 
GCISGlobalView.prototype.move = function(dx, dy, _46) {
	if(this.isFixed) {
		this.positionRect(); 
	}
	else {
		this.refresh(); 
	}
}; 
GCISGlobalView.prototype.create = function() {
	this.minidiv = this.dynMap.createElt("div"); 
	this.minidiv.innerHTML = ""; 
	this.tileWidth = this.dynMap.tileWidth; 
	this.tileHeight = this.dynMap.tileHeight; 
	this.marginX = 200; 
	this.marginY = 200; 
	var _47 = this.dynMap.width + 2 * this.marginX; 
	var _48 = this.dynMap.height + 2 * this.marginY; 
	var _49 = Math.floor(_47 / this.tileWidth) + 2; 
	var _4a = Math.floor(_48 / this.tileHeight) + 2; 
	var _4b; 
	var _4c; 
	this.images = []; 
	this.animImages = []; 
	this.nbTileX = _49; 
	this.nbTileY = _4a; 
	for(_4b = 0; _4b < this.nbTileX; _4b++) {
		this.images[_4b] = []; 
		this.animImages[_4b] = []; 
		for(_4c = 0; _4c < this.nbTileY; _4c++) {
			this.images[_4b][_4c] = this.createImage(this.minidiv, 0); 
			if(_debug) {
				this.images[_4b][_4c].image.className = "tile"; 
			}
		}
	}
	this.created = true; 
}; 
GCISGlobalView.prototype.createImage = function(div, z) {
	var _4f = this.dynMap.createElt("img"); 
	_4f.style.width = Math.round(this.tileWidth * this.zooms[this.dynMap.scale - 1] + 0.5) + "px"; 
	_4f.style.height = Math.round(this.tileHeight * this.zooms[this.dynMap.scale - 1] + 0.5) + "px"; 
	_4f.style.visibility = "hidden"; 
	_4f.style.position = "absolute"; 
	_4f.style.left = "-500px"; 
	_4f.style.zIndex = z; 
	_4f.style.border = "0"; 
	_4f.galleryImg = false; 
	_4f.src = this.dynMap.defaultImg; 
	div.appendChild(_4f); 
	var _50 = {
			nosrc : true, image : _4f, visible : false}; 
	return _50; 
}; 
GCISGlobalView.prototype.calcLimits = function() {
	var _51 = this.dynMap.limits; 
	var X1 = this.calcNumTileX(_51[0]); 
	var X2 = this.calcNumTileX(_51[1]); 
	var Y1 = this.calcNumTileY(_51[2]); 
	var Y2 = this.calcNumTileY(_51[3]); 
	this.tileLimits = [X1, X2 + 1, Y1, Y2 + 1]; 
}; 
GCISGlobalView.prototype.isVisible = function() {
	return this.visible; 
}; 
GCISGlobalView.prototype.calcTileSrc = function(_56) {
	var src = this.server; 
	var _58; 
	var _59; 
	var _5a; 
	var _5b; 
	var _5c; 
	var _5d; 
	var _5e; 
	var _5f; 
	var _60 = this.format; 
	if(this.protocol == "gcis") {
		src += "?XgoAnswer=MapImage&XgoBitmapFormat=PNG&XgoNbBits=24"; 
		src += "&XgoMapFile=" + this.mapName + "&XgoSetLogicalScale="; 
		src += this.dynMap.scale + "&sizex=" + this.dynMap.tileWidth; 
		src += "&sizey=" + this.dynMap.tileHeight; 
		src += "&XgoPointX=" + _56.mapx; 
		src += "&XgoPointY=" + _56.mapy; 
		if(this.tabName) {
			src += "&XgoTabs=" + this.tabName; 
		}
		if(this.transparentColor) {
			src += "&tr=" + this.transparentColor; 
		}
	}
	else {
		if(this.protocol == "geoportal") {
			if(!_60) {
				_60 = "png8"; 
			}
			_59 = "/" + this.mapName; 
			_59 += "_"; 
			_59 += "_" + this.tabName; 
			_59 += "_" + _60; 
			if(this.transparentColor) {
				_59 += "t"; 
			}
			_59 += "/" + this.dynMap.tileWidth; 
			_59 += "_" + this.dynMap.tileHeight; 
			_59 += "_"; 
			_58 = _59; 
			_5a = this.scales[this.dynMap.scale - 1]; 
			_58 += _5a; 
			var _61 = String(Math.abs(_56.mapTileX)); 
			for(i = 7 - _61.length; i > 0; i--) {
				_61 = "0" + _61; 
			}
			if(_56.mapTileX < 0) {
				_58 += "/" + "-" + _61; 
				_5b = "-"; 
				_5c = _61; 
			}
			else {
				_58 += "/" + _61; 
				_5b = ""; 
				_5c = _61; 
			}
			var _62 = String(Math.abs(_56.mapTileY)); 
			for(i = 7 - _62.length; i > 0; i--) {
				_62 = "0" + _62; 
			}
			if(_56.mapTileY < 0) {
				_58 += "/" + "-" + _62; 
				_5d = "-"; 
				_5e = _62; 
			}
			else {
				_58 += "/" + _62; 
				_5d = ""; 
				_5e = _62; 
			}
			_5f = "." + _60.substring(0, 3); 
			if(__encryptage) {
				src += _calcTileSrcEncrypt(_59, _5a, _5b, _5c, _5d, _5e, _5f) + _5f; 
			}
			else {
				src += _58 + _5f; 
			}
		}
		else {
			if(!_60) {
				_60 = "png"; 
			}
			src += "/" + this.mapName; 
			src += "/" + this.tabName; 
			src += "/" + _60 + "_"; 
			if(this.transparentColor) {
				src += "1"; 
			}
			src += "/" + this.dynMap.tileWidth; 
			src += "_" + this.dynMap.tileHeight; 
			src += "/" + this.dynMap.scale; 
			src += "/" + _56.mapx; 
			src += "_" + _56.mapy; 
			src += "_." + _60.substring(0, 3); 
		}
	}
	return src; 
}; 
GCISGlobalView.prototype.clearImage = function(_63) {
	_63.image.src = this.dynMap.defaultImg; 
	_63.image.style.visibility = "hidden"; 
	_63.image.style.width = Math.round(this.tileWidth * this.zooms[this.dynMap.scale - 1] + 0.5) + "px"; 
	_63.image.style.height = Math.round(this.tileHeight * this.zooms[this.dynMap.scale - 1] + 0.5) + "px"; 
	_63.nosrc = true; 
	_63.visible = false; 
	_63.image.galleryImg = false; 
}; 
GCISGlobalView.prototype.clearAll = function(_64) {
	if(!_64) {
		return; 
	}
	var _65, _66; 
	for(_65 = 0; _65 < this.nbTileX; _65++) {
		for(_66 = 0; _66 < this.nbTileY; _66++) {
			var _67 = _64[_65][_66]; 
			this.clearImage(_67); 
		}
	}
}; 
GCISGlobalView.prototype.refresh = function(_68) {
	if(!this.visible) {
		return; 
	}
	if(!this.isFixed ||!this.firstRefreshDone) {
		this.clearAll(this.images); 
		this.calcLimits(); 
		var _69 = Math.floor(this.nbTileX / 2); 
		var _6a = Math.floor(this.nbTileY / 2); 
		this.centerX = Math.floor(this.dynMap.width / 2); 
		this.centerY = Math.floor(this.dynMap.height / 2); 
		var _6b = this.initCenterX ? this.initCenterX : this.dynMap.currentX; 
		var _6c = this.initCenterY ? this.initCenterY : this.dynMap.currentY; 
		var _6d = this.calcNumTileX(_6b); 
		var _6e = this.calcNumTileY(_6c); 
		var _6f, _70; 
		for(_6f = 0; _6f < this.nbTileX; _6f++) {
			for(_70 = 0; _70 < this.nbTileY; _70++) {
				var _71 = this.images[_6f][_70]; 
				var _72 = _6d + _6f - _69; 
				var _73 = _6e + _70 - _6a; 
				this.fillImage(_71, _72, _73); 
				this.updateMapImage(_71); 
			}
		}
		this.minidiv.style.width = Math.round(this.zooms[this.dynMap.scale - 1] * this.dynMap.width) + "px"; 
		this.minidiv.style.height = Math.round(this.zooms[this.dynMap.scale - 1] * this.dynMap.height) + "px"; 
	}
	this.resizeRect(); 
	if(!this.panning) {
		if(!this.isFixed ||!this.firstRefreshDone) {
			this.minidiv.style.top = Math.round((this.height - parseInt(this.minidiv.style.height)) / 2) + "px"; 
			this.minidiv.style.left = Math.round((this.width - parseInt(this.minidiv.style.width)) / 2) + "px"; 
			var _74 = Math.round(((this.height - parseInt(this.pandiv.style.height)) / 2 - parseInt(this.minidiv.style.top))); 
			var _75 = Math.round(((this.width - parseInt(this.pandiv.style.width)) / 2 - parseInt(this.minidiv.style.left))); 
			this.pandiv.style.top = _74 + "px"; 
			this.pandiv.style.left = _75 + "px"; 
			this.pandiv2.style.top = ( - (parseInt(this.pandiv.style.width) / 2) - 1) + "px"; 
			this.pandiv2.style.left = ( + (parseInt(this.pandiv.style.width) / 2) - 1) + "px"; 
		}
		else {
			this.positionRect(); 
		}
	}
	this.firstRefreshDone = true; 
}; 
GCISGlobalView.prototype.setAutoZoomReduction = function(_76) {
	this.autoZoomReduction = _76; 
}; 
GCISGlobalView.prototype.setRectSize = function(_77, _78) {
	this.rectSizeFixed = true; 
	this.rectWidth = _77; 
	this.rectHeight = _78; 
}; 
GCISGlobalView.prototype.resizeRect = function() {
	this.panzoomx = this.dynMap.calcMapDeltaX(0, 1) / (this.calcMapDeltaX(0, 1 / this.zooms[this.dynMap.scale - 1])); 
	if(this.autoZoomReduction) {
		while(Math.round(this.panzoomx * this.dynMap.width) + 10 > this.width) {
			this.zooms[this.dynMap.scale - 1] = Math.round(this.zooms[this.dynMap.scale - 1] * 80) / 100; 
			this.panzoomx = this.dynMap.calcMapDeltaX(0, 1) / (this.calcMapDeltaX(0, 1 / this.zooms[this.dynMap.scale - 1])); 
			this.refresh(); 
		}
	}
	if(!this.rectSizeFixed) {
		if(Math.round(this.panzoomx * this.dynMap.width) < 1) {
			this.pandiv.style.width = "1px"; 
		}
		else {
			this.pandiv.style.width = Math.round(this.panzoomx * this.dynMap.width) + "px"; 
		}
		var _79 = this.dynMap.calcMapDeltaY(0, 1) / (this.calcMapDeltaY(0, 1 / this.zooms[this.dynMap.scale - 1])); 
		if(Math.round(_79 * this.dynMap.height) < 1) {
			this.pandiv.style.height = "1px"; 
		}
		else {
			this.pandiv.style.height = Math.round(_79 * this.dynMap.height) + "px"; 
		}
	}
	else {
		this.pandiv.style.width = this.rectWidth + "px"; 
		this.pandiv.style.height = "0px"; 
		this.pandiv2.style.width = "0px"; 
		this.pandiv2.style.height = this.rectHeight + "px"; 
	}
}; 
GCISGlobalView.prototype.positionRect = function() {
	if(!this.panning) {
		var _7a = ""; 
		for(var i = 0; i < this.zooms.length; i++) {
			_7a += "[" + (i + 1) + "=" + this.zooms[i] + "]"; 
		}
		var _7c = Math.round((this.zooms[this.dynMap.scale - 1] * this.dynMap.xRatios[(this.scales[this.dynMap.scale - 1])] * (this.initCenterY - this.dynMap.currentY) + (this.height - parseInt(this.pandiv.style.height)) / 2 - parseInt(this.minidiv.style.top))); 
		var _7d = Math.round((this.zooms[this.dynMap.scale - 1] * this.dynMap.yRatios[(this.scales[this.dynMap.scale - 1])] * (this.initCenterX - this.dynMap.currentX) + (this.width - parseInt(this.pandiv.style.width)) / 2 - parseInt(this.minidiv.style.left))); 
		this.pandiv.style.top = _7c + "px"; 
		this.pandiv.style.left = _7d + "px"; 
		this.pandiv2.style.top = ( - (parseInt(this.pandiv.style.width) / 2) - 1) + "px"; 
		this.pandiv2.style.left = ( + (parseInt(this.pandiv.style.width) / 2) - 1) + "px"; 
	}
}; 
GCISGlobalView.prototype.fillImage = function(_7e, _7f, _80) {
	_7e.mapTileX = _7f; 
	_7e.mapTileY = _80; 
	var tw = this.calcMapTileWidth(); 
	var th = this.calcMapTileHeight(); 
	_7e.mapx = Math.round(tw * _7f + tw / 2); 
	_7e.mapy = Math.round(th * _80 + th / 2); 
	this.positionImage(_7e); 
	_7e.nosrc = true; 
	_7e.visible = false; 
}; 
GCISGlobalView.prototype.calcPixelX = function(_83) {
	var _84 = this.initCenterX ? this.initCenterX : this.dynMap.currentX; 
	return Math.round(this.dynMap.centerX + (_83 - _84) * this.dynMap.xRatios[(this.scales[this.dynMap.scale - 1])]); 
}; 
GCISGlobalView.prototype.calcPixelY = function(_85) {
	var _86 = this.initCenterY ? this.initCenterY : this.dynMap.currentY; 
	return Math.round(this.dynMap.centerY + (_85 - _86) * this.dynMap.yRatios[(this.scales[this.dynMap.scale - 1])]); 
}; 
GCISGlobalView.prototype.positionImage = function(_87) {
	_87.posx = this.zooms[this.dynMap.scale - 1] * (this.calcPixelX(0) + this.tileWidth * _87.mapTileX); 
	_87.posy = this.zooms[this.dynMap.scale - 1] * (this.calcPixelY(0) - this.tileHeight * _87.mapTileY - this.tileHeight); 
}; 
GCISGlobalView.prototype.updateMapImage = function(_88) {
	var vis = true; 
	var _8a = 2; 
	var _8b = 2; 
	if(!rectIntersectRect(_88.posx, _88.posx + this.tileWidth, _88.posy, _88.posy + this.tileHeight, - _8a, this.dynMap.width + _8a, - _8b, this.dynMap.height + _8b)) {
		vis = false; 
	}
	if(!vis) {
		if(_88.visible) {
			this.clearImage(_88); 
		}
	}
	else {
		if(_88.nosrc) {
			if(!this.isVisible() || this.dynMap.scale > this.maxscale || this.dynMap.scale < this.minscale ||!rectIntersectRect(_88.mapTileX, _88.mapTileX, _88.mapTileY, _88.mapTileY, this.tileLimits[0], this.tileLimits[1], this.tileLimits[2], this.tileLimits[3])) {
				_88.image.src = this.dynMap.defaultImg; 
				_88.loadImage = null; 
				this.displayCopyright = false; 
			}
			else {
				this.displayCopyright = true; 
				var src = this.calcTileSrc(_88); 
				_88.image.src = src; 
			}
			_88.nosrc = false; 
		}
		if(!_88.visible) {
			_88.image.style.visibility = "visible"; 
			_88.visible = true; 
		}
		_88.image.style.left = _88.posx + "px"; 
		_88.image.style.top = _88.posy + "px"; 
	}
}; 
GCISGlobalView.prototype.correctMapImage = function(_8d) {
	var _8e = 0; 
	var _8f = 0; 
	var m = 0; 
	if(_8d.posx > this.dynMap.width + this.marginX + m) {
		_8e =- this.nbTileX; 
	}
	else {
		if(_8d.posx <- this.marginX - this.tileWidth - m) {
			_8e = this.nbTileX; 
		}
	}
	if(_8d.posy > this.dynMap.height + this.marginY + m) {
		_8f =- this.nbTileY; 
	}
	else {
		if(_8d.posy <- this.marginY - this.tileHeight - m) {
			_8f = this.nbTileY; 
		}
	}
	if(_8e !== 0 || _8f !== 0) {
		this.fillImage(_8d, _8d.mapTileX + _8e, _8d.mapTileY - _8f); 
		this.clearImage(_8d); 
	}
	this.updateMapImage(_8d); 
}; 
function GCISGlobalViewAnimator(_91, _92) {
	this.globalView = _91; 
	this.curW = this.globalView.width; 
	this.curH = this.globalView.height; 
	this.totalTime = _92; 
	this.startTime = (new Date()).getTime(); 
	this.endTime = this.startTime + _92; 
	return this; 
}
GCISGlobalViewAnimator.prototype = new GCISAbstractAnimator(); 
GCISGlobalViewAnimator.prototype.start = function(_93) {
	this.dynMap = _93; 
}; 
GCISGlobalViewAnimator.prototype.animate = function() {
	if(this.finished) {
		return; 
	}
	var _94 = (new Date()).getTime(); 
	if(_94 > this.endTime || this.globalView.width < 0 || this.globalView.width > this.globalView.initialw || this.globalView.height < 0 || this.globalView.height > this.globalView.initialh) {
		this.stop(); 
		return; 
	}
	var _95 = (_94 - this.startTime) / this.totalTime; 
	if(_95 > 1) {
		_95 = 1; 
	}
	var dw1 = this.globalView.initialw * _95; 
	var dh1 = this.globalView.initialh * _95; 
	if(this.globalView.visible) {
		this.globalView.width = (this.globalView.width - dw1); 
		this.globalView.height = (this.globalView.height - dh1); 
		if(this.globalView.isOnTheMap) {
			this.globalView.calcGlobalViewPositions(); 
		}
		if(this.globalView.width > 0 && this.globalView.height > 0) {
			this.globalView.div.style.width = this.globalView.width + "px"; 
			this.globalView.div.style.height = this.globalView.height + "px"; 
		}
	}
	else {
		this.globalView.width = (this.globalView.width + dw1); 
		this.globalView.height = (this.globalView.height + dh1); 
		if(this.globalView.isOnTheMap) {
			this.globalView.calcGlobalViewPositions(); 
		}
		if(this.globalView.width < this.globalView.initialw && this.globalView.height < this.globalView.initialh) {
			this.globalView.div.style.width = this.globalView.width + "px"; 
			this.globalView.div.style.height = this.globalView.height + "px"; 
		}
	}
}; 
GCISGlobalViewAnimator.prototype.stop = function(_98) {
	this.finished = true; 
	if(this.globalView.visible) {
		this.globalView.visible = false; 
		this.globalView.width = parseInt(this.globalView.divIco.clientWidth); 
		this.globalView.height = parseInt(this.globalView.divIco.clientHeight); 
		this.globalView.div.style.width = this.globalView.divIco.clientWidth + "px"; 
		this.globalView.div.style.height = this.globalView.divIco.clientHeight + "px"; 
		this.globalView.divIco.className = "mapglobalviewico2"; 
	}
	else {
		this.globalView.visible = true; 
		this.globalView.width = parseInt(this.globalView.initialw); 
		this.globalView.height = parseInt(this.globalView.initialh); 
		this.globalView.div.style.width = this.globalView.initialw + "px"; 
		this.globalView.div.style.height = this.globalView.initialh + "px"; 
		this.globalView.divIco.className = "mapglobalviewico"; 
		this.globalView.refresh(); 
	}
	if(this.globalView.isOnTheMap) {
		this.globalView.calcGlobalViewPositions(); 
	}
}; 
GCISGlobalViewAnimator.prototype.isFinished = function(_99) {
	return this.finished; 
}; 
function GCISGlobalViewScrollAnimator(_9a, dx, dy) {
	this.globalView = _9a; 
	this.dx = dx; 
	this.dy = dy; 
	this.cpt = 0; 
	return this; 
}
GCISGlobalViewScrollAnimator.prototype = new GCISAbstractAnimator(); 
GCISGlobalViewScrollAnimator.prototype.start = function(_9d) {
	this.dynMap = _9d; 
}; 
GCISGlobalViewScrollAnimator.prototype.animate = function() {
	if(this.finished) {
		return; 
	}
	this.beginDragX = this.globalView.dynMap.currentX; 
	this.beginDragY = this.globalView.dynMap.currentY; 
	this.globalView.dynMap.currentX = this.globalView.calcMapDeltaX(this.beginDragX, - this.dx / this.globalView.zooms[this.globalView.dynMap.scale - 1]); 
	this.globalView.dynMap.currentY = this.globalView.calcMapDeltaY(this.beginDragY, - this.dy / this.globalView.zooms[this.globalView.dynMap.scale - 1]); 
	this.globalView.move(this.dx, this.dy, false); 
}; 
GCISGlobalViewScrollAnimator.prototype.stop = function(_9e) {
	this.finished = true; 
	this.globalView.move(this.dx, this.dy, true); 
}; 
GCISGlobalViewScrollAnimator.prototype.isFinished = function(_9f) {
	return this.finished; 
}; 
function GCISDynamicMap(_1, _2, _3, _4, _5, x, y, _8, _9, _a, _b, _c, _d, _e, _f, _10) {
	if(!_2.maps) {
		_2.maps = []; 
	}
	_2.maps[_3.id] = this; 
	this.limits = _c; 
	this.id = _3.id; 
	this.server = _4; 
	this.window = _1; 
	this.currentDoc = _2; 
	this.mapName = _5; 
	this.images = []; 
	this.mainDiv = _3; 
	this.width = _3.clientWidth; 
	this.height = _3.clientHeight; 
	this.tileWidth = (_f ? _f : 300); 
	this.tileHeight = (_10 ? _10 : 300); 
	this.precision = (_b ? _b : 0.01); 
	this.currentX = x / this.precision; 
	this.currentY = y / this.precision; 
	this.initialX = x; 
	this.initialY = y; 
	this.initialScale = _8; 
	this.scale = _8; 
	this.ratios = _a; 
	this.browser = new Browser(this.currentDoc, _1); 
	this.defaultImg = this.server.substring(0, this.server.length - 4) + "/images/empty.gif"; 
	this.initRatios(); 
	this.minScale = 1; 
	this.nbScales = this.xRatios.length; 
	this.maxScale = this.nbScales; 
	if(this.scale > this.maxScale) {
		this.scale = this.maxScale; 
	}
	this.displayMargin = 200; 
	this.dragging = false; 
	this.animator = null; 
	this.layers = []; 
	this.rasterLayers = []; 
	this.territories = []; 
	if(this.mapName !== null) {
		this.addRasterLayer("main", this.server, this.mapName, _9, _d); 
	}
	this.objectLayer = new GCISObjectLayer(this); 
	this.addLayer("objects", this.objectLayer); 
	this.sheetLayer = new GCISSheetLayer(this); 
	this.addLayer("sheet", this.sheetLayer); 
	this.poiWindowLayer = new POIWindowLayer(); 
	this.addLayer("poiwindow", this.poiWindowLayer); 
	this.animationTime = 600; 
	this.scaleEventListeners = []; 
	this.moveEventListeners = []; 
	this.drawingListeners = []; 
	this.addScaleEventListener("main", this); 
	this.userId = null; 
	this.init(); 
}
GCISDynamicMap.prototype.getDiv = function() {
	return this.mainDiv; 
}; 
GCISDynamicMap.prototype.getMapDiv = function() {
	return this.mapDiv; 
}; 
GCISDynamicMap.prototype.init = function() {
	this.mainDiv.map = this; 
	var div = this.createElt("div"); 
	div.style.width = "100%"; 
	div.style.height = "100%"; 
	div.style.zIndex = 1; 
	div.id = this.id + "_map"; 
	this.mapDiv = div; 
	this.mapDiv.map = this; 
	this.mainDiv.appendChild(div); 
	this.setMouseMode(1); 
	this.initMouseMode(); 
}; 
GCISDynamicMap.prototype.createMap = function() {
	this.mapDiv.innerHTML = ""; 
	this.mapDiv.style.visibility = "hidden"; 
	this.centerX = Math.floor(this.width / 2); 
	this.centerY = Math.floor(this.height / 2); 
	var _12; 
	var i; 
	for(i = 0; i < this.layers.length; i++) {
		_12 = this.layers[i]; 
		_12.init(this); 
	}
	this.mapDiv.style.visibility = "visible"; 
	this.mapCreated = true; 
	this.startBackgroundTasks(); 
}; 
GCISDynamicMap.prototype.isRefreshing = function() {
	return this.refreshing; 
}; 
GCISDynamicMap.prototype.refresh = function(_14) {
	if(this.refreshing) {
		return; 
	}
	this.refreshing = true; 
	this.centerX = Math.floor(this.width / 2); 
	this.centerY = Math.floor(this.height / 2); 
	__poi.refreshKml(this.scale); 
	if(!this.mapCreated) {
		this.createMap(); 
		_14 = true; 
	}
	var i; 
	for(i = 0; i < this.layers.length; i++) {
		var _16 = this.layers[i]; 
		_16.refresh(_14); 
	}
	if(this.callbackAfterRefresh) {
		this.callbackAfterRefresh(); 
	}
	this.refreshing = false; 
}; 
GCISDynamicMap.prototype.setCallBackAfterRefresh = function(_17) {
	this.callbackAfterRefresh = _17; 
}; 
GCISDynamicMap.prototype.clear = function(_18, _19) {
	var i; 
	var tmp = this.layers; 
	for(i = 0; i < tmp.length; i++) {
		layer = tmp[i]; 
		this.removeLayer(layer.name, layer); 
	}
	this.layers = []; 
	this.rasterLayers = []; 
	if(_18) {
		this.objectLayer = new GCISObjectLayer(this); 
		this.addLayer("objects", this.objectLayer); 
		this.sheetLayer = new GCISSheetLayer(this); 
		this.addLayer("sheet", this.sheetLayer); 
		this.poiWindowLayer = new POIWindowLayer(); 
		this.addLayer("poiwindow", this.poiWindowLayer); 
	}
	if(_19) {
		this.sliderLayer = new GCISSlider(this); 
		this.addLayer("slider", this.sliderLayer); 
		this.sliderLayer.setMinimumScale(this.minScale); 
		this.sliderLayer.setMaximumScale(this.maxScale); 
	}
}; 
GCISDynamicMap.prototype.setSize = function(_1c, _1d) {
	this.width = _1c; 
	this.height = _1d; 
	this.mainDiv.style.width = _1c + "px"; 
	this.mainDiv.style.height = _1d + "px"; 
	this.refresh(true); 
}; 
GCISDynamicMap.prototype.recomputeSize = function() {
	this.width = this.mainDiv.offsetWidth; 
	this.height = this.mainDiv.offsetHeight; 
	this.refresh(true); 
}; 
GCISDynamicMap.prototype.maximize = function(_1e, _1f) {
	var h = (window.innerHeight ? window.innerHeight : this.currentDoc.body.clientHeight); 
	var w = (window.innerWidth ? window.innerWidth : this.currentDoc.body.clientWidth); 
	var t = this.browser.getElementTop(this.mainDiv); 
	var l = this.browser.getElementLeft(this.mainDiv); 
	this.marginright = _1e; 
	this.marginbottom = _1f; 
	this.setSize(w - l - _1e, h - t - _1f); 
}; 
GCISDynamicMap.prototype.modifyMap = function(x, y, _26, _27, _28, _29) {
	this.limits = _29; 
	this.precision = (_28 ? _28 : 0.01); 
	this.currentX = x / this.precision; 
	this.initialX = x; 
	this.currentY = y / this.precision; 
	this.initialY = y; 
	this.initialScale = _26; 
	this.scale = _26; 
	this.ratios = _27; 
	this.initRatios(); 
	this.minScale = 1; 
	this.nbScales = this.xRatios.length; 
	this.maxScale = this.nbScales; 
	if(this.scale > this.maxScale) {
		this.scale = this.maxScale; 
	}
}; 
GCISDynamicMap.prototype.ensureVisible = function(_2a, _2b, _2c, _2d, _2e, _2f) {
	var x = this.calcPixelX(_2a); 
	var y = this.calcPixelY(_2b); 
	var dx = 0, dy = 0; 
	if(!_2e) {
		_2e = 50; 
	}
	if(x < 0) {
		dx =- x + _2e; 
	}
	if((x + _2c) > this.width) {
		dx = this.width - x - _2c - _2e; 
	}
	if(y < 0) {
		dy =- y + _2e; 
	}
	if(y > this.height) {
		dy = this.height - y - _2d - _2e; 
	}
	var d = Math.sqrt(dx * dx + dy * dy); 
	if(d === 0) {
		return; 
	}
	if(d < 2 * this.width &&!_2f) {
		this.scroll(dx, dy); 
	}
	else {
		this.center(_2a, _2b); 
	}
}; 
GCISDynamicMap.prototype.initMouseMode = function() {
	if(this.mouseMode) {
		this.mouseMode.setMap(this); 
		this.mapDiv.onmousedown = function(_35) {
			this.map.mouseMode.mouseDown(_35); 
		}; 
		this.mapDiv.ondblclick = function(_36) {
			this.map.mouseMode.mouseDblClick(_36); 
		}; 
		this.mainDiv.onmousewheel = function(_37) {
			this.map.mouseMode.mouseWheel(_37); 
		}; 
		if(this.mainDiv.addEventListener) {
			this.mainDiv.addEventListener("DOMMouseScroll", this.mainDiv.onmousewheel, false); 
		}
	}
}; 
GCISDynamicMap.prototype.setMouseCursor = function(_38) {
	if(this.objectLayer.div) {
		this.objectLayer.div.style.cursor = _38; 
		this.mainDiv.style.cursor = _38; 
		this.mapDiv.style.cursor = _38; 
	}
}; 
GCISDynamicMap.prototype.setMouseMode = function(_39) {
	this.setMouseCursor("default"); 
	if(!_39) {
		this.mouseMode = new GCISMouseMode(); 
	}
	else {
		if(_39 == 1) {
			this.mouseMode = new GCISMoveMode(); 
		}
		else {
			if(_39 == 2) {
				this.mouseMode = new GCISSelectMode(); 
			}
			else {
				if(_39 == 3) {
					this.mouseMode = new GCISGeoportailMode(); 
				}
				else {
					if(_39 == 4) {
						this.setMouseCursor("crosshair"); 
						this.mouseMode = new GCISZoomSelectionMode(); 
					}
					else {
						this.mouseMode = _39; 
					}
				}
			}
		}
	}
	if(this.mouseMode) {
		this.mouseMode.setMap(this); 
	}
	return; 
}; 
GCISDynamicMap.prototype.getMouseMode = function() {
	return this.mouseMode; 
}; 
GCISDynamicMap.prototype.addMoveEventListener = function(_3a, _3b) {
	this.moveEventListeners.push(_3b); 
	this.moveEventListeners[_3a] = _3b; 
}; 
GCISDynamicMap.prototype.calcPixelX = function(_3c) {
	return Math.round(this.centerX + (_3c - this.currentX) * this.xRatios[this.scale]); 
}; 
GCISDynamicMap.prototype.calcDoublePixelX = function(_3d, _3e) {
	return(this.centerX + (_3d - this.currentX) * _3e); 
}; 
GCISDynamicMap.prototype.calcPixelY = function(_3f) {
	return Math.round(this.centerY + (_3f - this.currentY) * this.yRatios[this.scale]); 
}; 
GCISDynamicMap.prototype.calcDoublePixelY = function(_40, _41) {
	return(this.centerY + (_40 - this.currentY) * _41); 
}; 
GCISDynamicMap.prototype.calcMapX = function(_42) {
	return(_42 - this.centerX) / this.xRatios[this.scale] + this.currentX; 
}; 
GCISDynamicMap.prototype.calcMapY = function(_43) {
	return(_43 - this.centerY) / this.yRatios[this.scale] + this.currentY; 
}; 
GCISDynamicMap.prototype.calcMapDeltaX = function(_44, _45) {
	return _44 + _45 / this.xRatios[this.scale]; 
}; 
GCISDynamicMap.prototype.calcMapDeltaY = function(_46, _47) {
	return _46 + _47 / this.yRatios[this.scale]; 
}; 
GCISDynamicMap.prototype.createElt = function(_48) {
	return document.createElement(_48); 
}; 
GCISDynamicMap.prototype.getCenterX = function() {
	return this.currentX * this.precision; 
}; 
GCISDynamicMap.prototype.getCenterY = function() {
	return this.currentY * this.precision; 
}; 
GCISDynamicMap.prototype.getLongLat = function(_49, _4a) {
	if(!this.projection) {
		return null; 
	}
	var _4b = this.browser.getElementLeft(this.mainDiv); 
	var _4c = this.browser.getElementTop(this.mainDiv); 
	var xpx = _49 - _4b; 
	var ypx = _4a - _4c; 
	var _4f = this.calcMapX(xpx) * this.precision; 
	var _50 = this.calcMapY(ypx) * this.precision; 
	var _51 = this.getHTCtoRadian(_4f, _50, 0); 
	var _52 = radianToDecimalDegree(_51[0]); 
	var _53 = radianToDecimalDegree(_51[1]); 
	return[_52, _53]; 
}; 
GCISDynamicMap.prototype.getHTCtoRadian = function(_54, _55) {
	return this.projection.inverseProject(_54, _55, 0); 
}; 
GCISDynamicMap.prototype.getRadiantoHTC = function(_56, phi, _58) {
	return this.projection.project(_56, phi, _58); 
}; 
GCISDynamicMap.prototype.addRasterLayer = function(_59, _5a, _5b, _5c, _5d, _5e, _5f, _60, _61, _62) {
	if(!_5a) {
		_5a = this.server; 
	}
	if(!_5b) {
		_5b = this.mapName; 
	}
	var _63 = new GCISRasterLayer(); 
	_63.initParameters(_59, this, _5a, _5b, _5c, _5d, _5f, _60, _61, _62); 
	if(_5e) {
		_63.setTransparentColor(_5e); 
	}
	this.addLayer(_59, _63); 
	this.rasterLayers.push(_63); 
	this.rasterLayers[_59] = _63; 
}; 
GCISDynamicMap.prototype.removeRasterLayer = function(_64) {
	var lay = this.getLayer(_64); 
	this.removeLayer(_64, lay); 
	var _66 = []; 
	var i; 
	for(i = 0; i < this.rasterLayers.length; i++) {
		var _68 = this.rasterLayers[i]; 
		if(_68.name != _64) {
			_66.push(_68); 
			_66[_68.name] = _68; 
		}
	}
	this.rasterLayers = _66; 
}; 
GCISDynamicMap.prototype.setRasterVisibilityRange = function(_69, _6a, _6b) {
	var lay = this.getLayer(_69); 
	if(!lay) {
		return; 
	}
	lay.setVisibilityRange(_6a, _6b); 
}; 
GCISDynamicMap.prototype.setLayerNumber = function(_6d, _6e) {
	if((_6e < 0) || (_6e > this.rasterLayers.length - 1)) {
		return; 
	}
	var _6f = this.getLayer(_6d); 
	var tmp = []; 
	var i; 
	for(i = 0; i < this.rasterLayers.length; i++) {
		var _72 = this.rasterLayers[i]; 
		if(_72.name != _6d) {
			tmp.push(_72); 
			tmp[_72.name] = _72; 
		}
	}
	var _73 = []; 
	var k; 
	for(k = 0; k < tmp.length; k++) {
		var _75 = tmp[k]; 
		if(k == _6e) {
			_73.push(_6f); 
			_73[_6d] = _6f; 
		}
		_73.push(_75); 
		_73[_75.name] = _75; 
	}
	if(_6e == tmp.length) {
		_73.push(_6f); 
		_73[_6d] = _6f; 
	}
	this.rasterLayers = _73; 
	var j; 
	for(j = 0; j < this.rasterLayers.length; j++) {
		var _77 = this.rasterLayers[j]; 
		var _78 = _77.isVisible(); 
		var _79 = _77.getOpacity(); 
		this.removeLayer(_77.name, _77); 
		this.layers.push(_77); 
		this.layers[_77.name] = _77; 
		_77.setVisible(_78); 
		_77.init(this); 
		_77.setOpacity(_79); 
	}
}; 
GCISDynamicMap.prototype.addLayer = function(_7a, _7b) {
	_7b.name = _7a; 
	_7b.visible = true; 
	this.layers.push(_7b); 
	this.layers[_7a] = _7b; 
}; 
GCISDynamicMap.prototype.removeLayer = function(_7c, _7d) {
	if(!_7d) {
		return; 
	}
	var _7e = []; 
	var i; 
	for(i = 0; i < this.layers.length; i++) {
		var lay = this.layers[i]; 
		if(lay.name != _7c) {
			_7e.push(lay); 
			_7e[lay.name] = lay; 
		}
	}
	_7d.setVisible(false); 
	_7d.remove(this); 
	this.layers = _7e; 
}; 
GCISDynamicMap.prototype.getLayer = function(_81) {
	return this.layers[_81]; 
}; 
GCISDynamicMap.prototype.resetLayers = function() {
	var _82; 
	var i; 
	for(i = 0; i < this.layers.length; i++) {
		_82 = this.layers[i]; 
		_82.init(this); 
	}
}; 
GCISDynamicMap.prototype.getRasterLayerNames = function() {
	var res = []; 
	var i; 
	for(i = 0; i < this.rasterLayers.length; i++) {
		var lay = this.rasterLayers[i]; 
		res.push(lay.name); 
	}
	return res; 
}; 
GCISDynamicMap.prototype.setLayerVisibility = function(_87, _88) {
	var _89 = this.layers[_87]; 
	if(!_89) {
		return; 
	}
	_89.visible = _88; 
}; 
GCISDynamicMap.prototype.setMinimumScale = function(_8a) {
	this.minScale = _8a; 
	if(this.sliderLayer) {
		this.sliderLayer.setMinimumScale(_8a); 
	}
}; 
GCISDynamicMap.prototype.setMaximumScale = function(_8b) {
	if(_8b > this.nbScales) {
		_8b = this.nbScales; 
	}
	this.maxScale = _8b; 
	if(this.sliderLayer) {
		this.sliderLayer.setMaximumScale(_8b); 
	}
}; 
GCISDynamicMap.prototype.setScale = function(_8c) {
	if(!_8c) {
		return; 
	}
	var _8d; 
	var i; 
	if(!___geoecom) {
		if(_8c < this.minScale && __territoire == "monde") {
			for(i = 0; i < this.scaleEventListeners.length; i++) {
				_8d = this.scaleEventListeners[i]; 
				if(_8d.onMinimumScaleChange) {
					_8d.onMinimumScaleChange(_8c); 
				}
			}
		}
		if(_8c > this.maxScale && __territoire != "monde") {
			for(i = 0; i < this.scaleEventListeners.length; i++) {
				_8d = this.scaleEventListeners[i]; 
				if(_8d.onMaximumScaleChange) {
					_8d.onMaximumScaleChange(_8c); 
				}
			}
		}
	}
	if(_8c < this.minScale) {
		_8c = this.minScale; 
	}
	if(_8c > this.maxScale) {
		_8c = this.maxScale; 
	}
	for(i = 0; i < this.scaleEventListeners.length; i++) {
		_8d = this.scaleEventListeners[i]; 
		if(_8d.onScaleChange) {
			_8d.onScaleChange(_8c); 
		}
	}
	if(_8c != this.scale) {
		for(i = 0; i < this.layers.length; i++) {
			this.layers[i].setScale(_8c); 
		}
	}
	__forceCloseDialog(); 
	this.scale = _8c; 
}; 
GCISDynamicMap.prototype.getScale = function() {
	return this.scale; 
}; 
GCISDynamicMap.prototype.addScaleEventListener = function(_8f, _90) {
	this.scaleEventListeners.push(_90); 
	this.scaleEventListeners[_8f] = _90; 
}; 
GCISDynamicMap.prototype.addScaleLayer = function(_91, _92, div) {
	var _94 = new GCISGraphicScale(this, _91, _92, div); 
	this.addLayer("graphicScale", _94); 
}; 
GCISDynamicMap.prototype.addDrawingListener = function(_95, _96) {
	this.drawingListeners.push(_96); 
	this.drawingListeners[_95] = _96; 
}; 
GCISDynamicMap.prototype.addGlobalView = function(_97, _98, _99, _9a, _9b, _9c, _9d, div, _9f, _a0, _a1) {
	this.globalView = new GCISGlobalView(this, _97, _98, _99, _9a, _9b, _9c, _9d, div, _9f, _a0, _a1); 
	this.addLayer("globalView", this.globalView); 
}; 
GCISDynamicMap.prototype.getGlobalView = function() {
	if(!this.globalView) {
		return null; 
	}
	return this.globalView; 
}; 
GCISDynamicMap.prototype.initRatios = function() {
	if(!this.ratios) {
		return; 
	}
	var ar = this.ratios.split("~"); 
	var i = 0; 
	var _a4 = 1; 
	this.xRatios = []; 
	this.yRatios = []; 
	for(i = 0; i < ar.length; i++) {
		this.xRatios[_a4] = parseFloat(ar[i++]); 
		this.yRatios[_a4++] = parseFloat(ar[i]); 
	}
}; 
GCISDynamicMap.prototype.animateZoom = function(_a5) {
	var _a6; 
	var i; 
	if(!___geoecom) {
		if((_a5 < this.minScale) && (__territoire == "monde")) {
			for(i = 0; i < this.scaleEventListeners.length; i++) {
				_a6 = this.scaleEventListeners[i]; 
				if(_a6.onMinimumScaleChange) {
					_a6.onMinimumScaleChange(_a5); 
				}
			}
			return; 
		}
		if(_a5 > this.maxScale && (__territoire != "monde")) {
			for(i = 0; i < this.scaleEventListeners.length; i++) {
				_a6 = this.scaleEventListeners[i]; 
				if(_a6.onMaximumScaleChange) {
					_a6.onMaximumScaleChange(_a5); 
				}
			}
			return; 
		}
	}
	if(_a5 < this.minScale) {
		_a5 = this.minScale; 
	}
	if(_a5 > this.maxScale) {
		_a5 = this.maxScale; 
	}
	if(_a5 == this.scale) {
		return; 
	}
	var _a8 = this.xRatios[_a5]/this.xRatios[this.scale];
	var _a9 = this.yRatios[_a5]/this.yRatios[this.scale];
	if(_a8 < 10 && _a8 > 0.1) {
		var _aa = null; 
		for(i = 0; i < this.layers.length; i++) {
			if(this.layers[i].visible && this.layers[i].animateZoom) {
				_aa = this.layers[i]; 
				break; 
			}
		}
		if(_aa) {
			_aa.animateZoom(_a8, _a9, _a5); 
		}
	}
	this.setScale(_a5); 
	this.refresh(true); 
}; 
GCISDynamicMap.prototype.zoom = function(_ab) {
	if(!_ab) {
		_ab = 1; 
	}
	var _ac = this.scale - _ab; 
	if(_ac < this.minScale) {
		_ac = this.minScale; 
	}
	if(_ac > this.maxScale) {
		_ac = this.maxScale; 
	}
	this.setScale(_ac); 
}; 
GCISDynamicMap.prototype.moveMap = function(dx, dy, _af) {
	var i; 
	for(i = 0; i < this.layers.length; i++) {
		if(this.layers[i].visible) {
			this.layers[i].move(dx, dy, _af); 
		}
	}
	var _b1; 
	for(i = 0; i < this.moveEventListeners.length; i++) {
		_b1 = this.moveEventListeners[i]; 
		if(_b1.onMoveChange) {
			_b1.onMoveChange(dx, dy); 
		}
	}
}; 
GCISDynamicMap.prototype.endMoveMap = function() {
	var i; 
	for(i = 0; i < this.layers.length; i++) {
		if(this.layers[i].visible) {
			this.layers[i].endMove(); 
		}
	}
}; 
GCISDynamicMap.prototype.centerClick = function(_b3) {
	var _b4 = this.browser.getXposition(_b3); 
	var _b5 = this.browser.getYposition(_b3); 
	_b4 -= this.browser.getElementLeft(this.mainDiv); 
	_b5 -= this.browser.getElementTop(this.mainDiv); 
	this.centerPixel(_b4, _b5); 
}; 
GCISDynamicMap.prototype.scroll = function(dx, dy, _b8) {
	this.centerPixel(this.centerX - dx, this.centerY - dy, _b8); 
}; 
GCISDynamicMap.prototype.centerPixel = function(x, y, _bb) {
	if(!_bb) {
		_bb = 10; 
	}
	var dx = this.centerX - x; 
	var dy = this.centerY - y; 
	var _be = new GCISScrollAnimator(dx, dy, this.animationTime); 
	this.startAnimation(_be); 
}; 
GCISDynamicMap.prototype.center = function(_bf, _c0, _c1) {
	if(_c1) {
		this.currentX = _bf / this.precision; 
		this.currentY = _c0 / this.precision; 
	}
	else {
		this.currentX = _bf; 
		this.currentY = _c0; 
	}
	this.refresh(); 
}; 
GCISDynamicMap.prototype.centerAnimated = function(_c2, _c3) {
	var x = this.calcPixelX(_c2); 
	var y = this.calcPixelY(_c3); 
	var dx = x - (this.width / 2); 
	var dy = y - (this.height / 2); 
	var d = Math.sqrt(dx * dx + dy * dy); 
	if(d === 0) {
		return; 
	}
	if(d < 2 * this.width) {
		this.scroll( - dx, - dy); 
	}
	else {
		this.center(_c2, _c3); 
	}
}; 
GCISDynamicMap.prototype.centerOnRect = function(_c9, _ca, _cb, _cc, _cd) {
	if(_cd) {
		_c9 /= this.precision; 
		_cb /= this.precision; 
		_ca /= this.precision; 
		_cc /= this.precision; 
	}
	this.currentX = (_c9 + _cb) / 2; 
	this.currentY = (_ca + _cc) / 2; 
	var _ce = 1000000; 
	var _cf = 1000000; 
	if(_c9 != _cb) {
		_ce = (this.width - 20) / (_cb - _c9); 
	}
	if(_ca != _cc) {
		_cf = (this.height - 20) / (_cc - _ca); 
	}
	if(_ce < 0) {
		_ce =- _ce; 
	}
	if(_cf < 0) {
		_cf =- _cf; 
	}
	var _d0; 
	for(_d0 = this.minScale; _d0 <= this.maxScale; _d0++) {
		if(this.xRatios[_d0] <= _ce && ( - this.yRatios[_d0]) <= _cf) {
			break; 
		}
	}
	if(this.scale != _d0) {
		this.setScale(_d0); 
		this.refresh(true); 
	}
	else {
		this.refresh(false); 
	}
}; 
GCISDynamicMap.prototype.centerOnObjects = function() {
	var _d1, _d2, _d3, _d4; 
	var _d5 = this.objectLayer.objects; 
	var i = 0; 
	for(i = 0; i < _d5.length; i++) {
		var obj = _d5[i]; 
		if(i === 0) {
			_d2 = obj.mapx; 
			_d1 = _d2; 
			_d3 = obj.mapy; 
			_d4 = _d3; 
		}
		else {
			if(obj.mapx < _d2) {
				_d2 = obj.mapx; 
			}
			if(obj.mapx > _d1) {
				_d1 = obj.mapx; 
			}
			if(obj.mapy < _d3) {
				_d3 = obj.mapy; 
			}
			if(obj.mapy > _d4) {
				_d4 = obj.mapy; 
			}
		}
	}
	if(i === 0) {
		return; 
	}
	this.centerOnRect(_d2, _d3, _d1, _d4, false); 
}; 
GCISDynamicMap.prototype.centerOnObject = function(_d8, _d9) {
	var obj = this.objectLayer.findObject(_d8); 
	if(!obj) {
		return; 
	}
	if(_d9) {
		this.centerAnimated(obj.mapx, obj.mapy); 
	}
	else {
		this.center(obj.mapx, obj.mapy); 
	}
}; 
GCISDynamicMap.prototype.startAnimation = function(_db, _dc) {
	this.stopAnimation(); 
	this.animator = _db; 
	_db.start(this); 
	this.animate(_dc); 
}; 
GCISDynamicMap.prototype.animate = function(_dd) {
	if(!this.animator) {
		return; 
	}
	if(!_dd) {
		_dd = 1; 
	}
	var db = document.getElementById("debug"); 
	if(db) {
		db.innerHTML = ""; 
	}
	if(this.animator.isFinished()) {
		this.animator = null; 
		this.endMoveMap(); 
	}
	else {
		this.animator.animate(); 
		this.window.setTimeout("DynMapAnimate('" + this.id + "','" + _dd + "');", _dd); 
	}
}; 
GCISDynamicMap.prototype.stopAnimation = function(_df) {
	if(!this.animator) {
		this.endMoveMap(); 
		return; 
	}
	this.animator.stop(); 
	this.animator = null; 
	this.endMoveMap(); 
}; 
GCISDynamicMap.prototype.addObject = function(obj, _e1) {
	this.objectLayer.addObject(obj, _e1); 
}; 
GCISDynamicMap.prototype.addObjects = function(_e2, _e3) {
	this.objectLayer.addObjects(_e2, _e3); 
}; 
GCISDynamicMap.prototype.clearObjects = function() {
	this.objectLayer.clearObjects(); 
}; 
GCISDynamicMap.prototype.showPoint = function(x, y, _e6, _e7) {
	this.currentX = x / this.precision; 
	this.currentY = y / this.precision; 
	var _e8 = (_e6 != this.scale); 
	this.setScale(_e6); 
	var obj = {
	}; 
	obj.mapx = this.currentX; 
	obj.mapy = this.currentY; 
	obj.imgsrc = _e7; 
	this.clearObjects(); 
	this.addObject(obj); 
	this.refresh(_e8); 
}; 
GCISDynamicMap.prototype.setObjects = function(_ea, _eb) {
	this.objectLayer.clearObjects(); 
	this.objectLayer.addObjects(_ea, _eb); 
	this.refresh(); 
}; 
GCISDynamicMap.prototype.moveObjects = function(_ec, _ed) {
	var res = this.objectLayer.moveObjects(_ec, _ed); 
	this.sheetLayer.refresh(true); 
	return res; 
}; 
GCISDynamicMap.prototype.removeObject = function(_ef) {
	this.objectLayer.removeObject(_ef); 
}; 
GCISDynamicMap.prototype.unloadSelectedObject = function() {
	for(var i = 0; i < this.objectLayer.objects.length; i++) {
		if(this.objectLayer.objects[i].selected) {
			this.objectLayer.objects[i].selected = 0; 
			this.objectLayer.objects[i].img.className = "mapobject"; 
		}
	}
}; 
GCISDynamicMap.prototype.showObjectSheet = function(_f1) {
	if(!_f1) {
		this.hideObjectSheet(); 
		return; 
	}
	var obj = this.objectLayer.findObject(_f1); 
	if(!obj) {
		return; 
	}
	if(!this.mouseMode.selectMode) {
		this.sheetLayer.showObject(obj); 
	}
	else {
		if(!obj.selected) {
			this.unloadSelectedObject(); 
			obj.selected = 1; 
			obj.img.className = "mapobjectselected"; 
			this.sheetLayer.showObject(obj); 
		}
		else {
			obj.selected = 0; 
			obj.img.className = "mapobject"; 
			this.hideObjectSheet(); 
		}
	}
}; 
GCISDynamicMap.prototype.hideObjectSheet = function() {
	this.unloadSelectedObject(); 
	this.sheetLayer.hide(); 
}; 
GCISDynamicMap.prototype.getSelection = function() {
	var res = []; 
	var i; 
	for(i = 0; i < this.objectLayer.objects.length; i++) {
		var obj = this.objectLayer.objects[i]; 
		if(obj.selected) {
			res.push(obj.id); 
		}
	}
	return res; 
}; 
GCISDynamicMap.prototype.resetSelection = function() {
	var i; 
	for(i = 0; i < this.objectLayer.objects.length; i++) {
		var obj = this.objectLayer.objects[i]; 
		if(obj.selected) {
			obj.selected = 0; 
			obj.img.className = "mapobject"; 
		}
	}
	this.hideObjectSheet(); 
}; 
GCISDynamicMap.prototype.createProjection = function(_f8, _f9) {
	var _fa = new GCISProjectionsManager(); 
	return _fa.createProjection(_f8, _f9); 
}; 
GCISDynamicMap.prototype.setProjection = function(_fb, _fc) {
	this.projection = this.createProjection(_fb, _fc); 
}; 
GCISDynamicMap.prototype.getProjection = function() {
	return this.projection; 
}; 
GCISDynamicMap.prototype.project = function(_fd, phi, _ff) {
	if(!this.projection) {
		return null; 
	}
	return this.projection.project(decimalDegreeToRad(_fd), decimalDegreeToRad(phi), _ff); 
}; 
GCISDynamicMap.prototype.addBackgroundTask = function(_100, _101, time) {
	_101.taskId = _100; 
	_101.delay = time; 
	if(!this.backgroundTasks) {
		this.backgroundTasks = []; 
	}
	this.backgroundTasks.push(_101); 
}; 
GCISDynamicMap.prototype.doBackground = function() {
	if(this.backgroundTasks) {
		var i; 
		for(i = 0; i < this.backgroundTasks.length; i++) {
			var bg = this.backgroundTasks[i]; 
			if(!bg) {
				continue; 
			}
			var time = new Date().getTime(); 
			if(!bg.lastTime) {
				bg.start(this); 
				bg.lastTime = time; 
			}
			if((time - bg.lastTime) > bg.delay) {
				bg.animate(); 
				bg.lastTime = time; 
			}
		}
	}
	this.window.setTimeout("DynMapBackground('" + this.id + "');", 100); 
}; 
GCISDynamicMap.prototype.startBackgroundTasks = function() {
	if(!this.backgroundTasksStarted) {
		this.doBackground(); 
	}
	this.backgroundTasksStarted = true; 
}; 
GCISDynamicMap.prototype.removeBackGroundTask = function(_106) {
	var i; 
	for(i = 0; i < this.backgroundTasks.length; i++) {
		var bg = this.backgroundTasks[i]; 
		if(bg.taskId == _106) {
			bg.stop(); 
			this.backgroundTasks[i] = null; 
		}
	}
}; 
GCISDynamicMap.prototype.setUserId = function(_109) {
	this.userId = _109; 
	var i; 
	for(i = 0; i < this.layers.length; i++) {
		this.layers[i].setUserId(_109); 
	}
}; 
GCISDynamicMap.prototype.getUserId = function() {
	return this.userId; 
}; 
GCISDynamicMap.prototype.addListener = function(_10b, func) {
	if(!this.listeners) {
		this.listeners = {
		}; 
	}
	this.listeners[_10b] = func; 
}; 
GCISDynamicMap.prototype.addControl = function(_10d) {
	if(!this.controls) {
		this.controls = []; 
	}
	this.controls.push(_10d); 
}; 
GCISDynamicMap.prototype.addVectorLayer = function(name) {
	if(typeof GCISVectorLayer == "undefined") {
		return; 
	}
	var _10f = new GCISVectorLayer(this); 
	this.addLayer(name, _10f); 
}; 
GCISDynamicMap.prototype.addRasterDynamicLayer = function(name, _111, _112, _113) {
	if(!_111) {
		_111 = this.mapName; 
	}
	var _114 = new GCISDynamicLayer(name, this, _111, _112, _113); 
	this.addLayer(name, _114); 
	return _114; 
}; 
GCISDynamicMap.prototype.addTerritory = function(name, _116, _117, _118, _119, _11a, _11b, _11c, _11d, _11e) {
	var _11f = new GCISTerritory(this, name, _116, _117, _118, _119, _11a, _11b, _11c, _11d, _11e); 
	this.territories.push(_11f); 
	this.territories[name] = _11f; 
}; 
GCISDynamicMap.prototype.addDynamicLayer = function(name, _121, _122, _123, _124, _125, _126) {
	if(!_121) {
		_121 = this.server; 
	}
	if(!_122) {
		_122 = this.mapName; 
	}
	var _127 = new GCISRasterDynLayer(name, this, _121, _122, _123, _126); 
	if(_124) {
		_127.reducePng = true; 
	}
	if(_125) {
		_127.setTransparentColor(_125); 
	}
	this.addLayer(name, _127); 
}; 
GCISDynamicMap.prototype.addWMSLayer = function(name, _129, _12a, _12b, _12c, _12d, _12e, _12f) {
	var _130 = new GCISWMSLayer(name, this, _129, _12a, _12b, _12c, _12d, _12e, _12f); 
	this.addLayer(name, _130); 
}; 
GCISDynamicMap.prototype.addCopyrightLayer = function(posx, posy) {
	this.copyrightLayer = new GCISCopyrightLayer(this, posx, posy); 
	this.addLayer("copyright", this.copyrightLayer); 
}; 
function GCISObjectLayer(_1) {
	this.currentDoc = _1.currentDoc; 
	this.objects = []; 
	this.dynMap = _1; 
	return this; 
}
GCISObjectLayer.prototype = new GCISAbstractLayer(); 
GCISObjectLayer.prototype.init = function(_2) {
	this.dynMap = _2; 
	var id = _2.id + "_objs"; 
	var _4 = _2.createElt("div"); 
	this.div = _4; 
	_4.className = "mapobjects"; 
	_4.style.width = this.dynMap.width + "px"; 
	_4.style.height = this.dynMap.height + "px"; 
	_2.getMapDiv().appendChild(_4); 
	this.dirty = false; 
}; 
GCISObjectLayer.prototype.remove = function(_5) {
	this.div.parentNode.removeChild(this.div); 
}; 
GCISObjectLayer.prototype.create = function(_6) {
	var _7 = __poi.getObjectManager(); 
	var _8 = _7.htmlPoi.bind(_7); 
	var _9 = _7.getObjectImgId.bind(_7); 
	var _a = this.dynMap.currentDoc; 
	var _b = this.objects.length; 
	var _c = 0; 
	var _d = ""; 
	var _e = null; 
	for(_c = 0; _c < _b; _c++) {
		_e = this.objects[_c]; 
		if(__poi) {
			_d += _8(_e, _c); 
		}
		else {
			if(_e.innerHTML) {
				_d += "<div id=\"" + _9(_e, _c); 
				_d += "\" onclick=\"DynMapShowObjectSheet(DynMapGetMap(document,'"; 
				_d += this.dynMap.id + "'), '" + _e.id + "')\""; 
				_d += " style=\"position:absolute;\" class=\"mapobject\" >"; 
				_d += _e.innerHTML; 
				_d += "</div>"; 
			}
			else {
				_d += "<img src=\"" + _e.imgsrc + "\" id=\"" + _9(_e, _c); 
				_d += "\" class=\"mapobject\" "; 
				if(_e.text) {
					_d += " onclick=\"DynMapShowObjectSheet(DynMapGetMap(document,'" + this.dynMap.id + "'), '" + _e.id + "')\""; 
				}
				_d += " />"; 
			}
			if(_e.name) {
				_d += "<div class=\"mapobjectname\" id=\"" + (this.dynMap.id + "_objname_" + _c); 
				_d += "\" onclick=\"DynMapShowObjectSheet(DynMapGetMap(document,'" + this.dynMap.id + "'), '" + _e.name + "')\""; 
				_d += " >" + _e.id + "</div>"; 
			}
		}
	}
	_6.innerHTML = _d; 
	for(_c = 0; _c < _b; _c++) {
		_e = this.objects[_c]; 
		var _f = _9(_e, _c); 
		_e.img = _a.getElementById(_f); 
		_e.div = _a.getElementById(this.dynMap.id + "_objname_" + _c); 
		_e.img.map = this.dynMap; 
	}
	_7.eventPoi(_e, _c); 
	this.dirty = false; 
}; 
GCISObjectLayer.prototype.moveObject = function(obj, _11) {
	var _12 = this.findObject(obj.id); 
	if(!_12) {
		return false; 
	}
	_12.text = obj.text; 
	_12.mapx = parseFloat(obj.mapx); 
	_12.mapy = parseFloat(obj.mapy); 
	var _13 = (_12.innerHTML !== null && _12.innerHTML != obj.innerHTML); 
	if(_13) {
		_12.innerHTML = obj.innerHTML; 
	}
	if(_11) {
		_12.mapx /= this.dynMap.precision; 
		_12.mapy /= this.dynMap.precision; 
	}
	if(!this.dynMap.dragging &&!this.dynMap.scrolling) {
		if(_12.img) {
			this.updateObject(_12, _13); 
		}
	}
	return true; 
}; 
GCISObjectLayer.prototype.moveObjects = function(_14, _15) {
	var i; 
	var res = true; 
	for(i = 0; i < _14.length; i++) {
		res = res && this.moveObject(_14[i], _15); 
	}
	return res; 
}; 
GCISObjectLayer.prototype.addObject = function(obj, _19) {
	var _1a = {
	}; 
	if(obj.id !== null) {
		_1a.id = obj.id; 
	}
	else {
		obj.id = obj.name; 
	}
	_1a.mapx = parseFloat(obj.mapx); 
	_1a.mapy = parseFloat(obj.mapy); 
	_1a.name = obj.name; 
	_1a.text = obj.text; 
	_1a.deltaX = obj.deltaX; 
	_1a.deltaY = obj.deltaY; 
	_1a.imgsrc = obj.imgsrc; 
	_1a.width = obj.width; 
	_1a.height = obj.height; 
	_1a.label = obj.label; 
	_1a.innerHTML = obj.innerHTML; 
	if(_19) {
		_1a.mapx /= this.dynMap.precision; 
		_1a.mapy /= this.dynMap.precision; 
	}
	_1a.maxWidth = obj.maxWidth; 
	_1a.maxHeight = obj.maxHeight; 
	_1a.winWidth = obj.winWidth; 
	_1a.winHeight = obj.winHeight; 
	_1a.fichierCSS = obj.fichierCSS; 
	_1a.POIversion2 = obj.POIversion2; 
	_1a.prefixeBulle = obj.prefixeBulle; 
	_1a.pointsEmprise = obj.pointsEmprise; 
	this.objects.push(_1a); 
	this.dirty = true; 
	return _1a; 
}; 
GCISObjectLayer.prototype.removeObject = function(_1b) {
	var res = []; 
	var _1d = this.objects; 
	var i; 
	for(i = 0; i < _1d.length; i++) {
		if(_1d[i].id !== _1b) {
			res.push(_1d[i]); 
		}
	}
	this.objects = res; 
	this.dirty = true; 
}; 
GCISObjectLayer.prototype.addObjects = function(_1f, _20) {
	var i; 
	for(i = 0; i < _1f.length; i++) {
		this.addObject(_1f[i], _20); 
	}
}; 
GCISObjectLayer.prototype.clearObjects = function() {
	this.objects.length = 0; 
	this.dirty = true; 
}; 
GCISObjectLayer.prototype.findObject = function(_22) {
	var obj = null; 
	if(_22) {
		var _24 = this.objects; 
		var i = 0; 
		for(i = 0; i < _24.length; i++) {
			if(_24[i].id === _22) {
				obj = _24[i]; 
				break; 
			}
		}
	}
	return obj; 
}; 
GCISObjectLayer.prototype.move = function(dx, dy, _28) {
	this.refresh(); 
}; 
GCISObjectLayer.prototype.refresh = function(_29) {
	if(this.updating) {
		return; 
	}
	this.updating = true; 
	if(this.dirty) {
		this.create(this.div); 
	}
	var i = 0; 
	var _2b = this.objects.length; 
	for(i = 0; i < _2b; i++) {
		this.updateObject(this.objects[i]); 
	}
	this.updating = false; 
}; 
GCISObjectLayer.prototype.updateObject = function(obj, _2d) {
	if(!obj.img) {
		return; 
	}
	obj.posx = this.dynMap.calcPixelX(obj.mapx); 
	obj.posy = this.dynMap.calcPixelY(obj.mapy); 
	var vis = true; 
	var _2f = this.dynMap.displayMargin; 
	if((obj.posx > this.dynMap.width + _2f) || (obj.posx <=- _2f) || (obj.posy > this.dynMap.height + _2f) || (obj.posy <=- _2f)) {
		vis = false; 
	}
	if(vis) {
		if(!obj.visible && obj.img) {
			obj.img.style.visibility = "visible"; 
			if(obj.div) {
				obj.div.style.visibility = "visible"; 
			}
			obj.visible = true; 
		}
		if(_2d) {
			obj.img.innerHTML = obj.innerHTML; 
		}
		if(!obj.deltaX) {
			obj.deltaX = (obj.img && obj.img.width) ?- obj.img.width / 2 : 0; 
		}
		if(!obj.deltaY) {
			obj.deltaY = (obj.img && obj.img.height) ?- obj.img.height / 2 : 0; 
		}
		obj.img.style.left = (obj.posx + obj.deltaX) + "px"; 
		obj.img.style.top = (obj.posy + obj.deltaY) + "px"; 
		if(obj.div) {
			obj.div.style.left = (obj.posx + 8) + "px"; 
			obj.div.style.top = (obj.posy - 32) + "px"; 
		}
	}
	else {
		if(obj.visible) {
			obj.img.style.visibility = "hidden"; 
			if(obj.div) {
				obj.div.style.visibility = "hidden"; 
			}
			obj.visible = false; 
		}
	}
}; 
function GCISSheetLayer(_1) {
	this.dynMap = _1; 
	this.object = null; 
	this.visible = false; 
}
GCISSheetLayer.prototype = new GCISAbstractLayer(); 
GCISSheetLayer.prototype.init = function(_2) {
	this.dynMap = _2; 
	var id = _2.id + "_sheet"; 
	var _4 = _2.createElt("div"); 
	_4.className = "mapsheet"; 
	_4.mapId = _2.id; 
	_4.onclick = function() {
		DynMapShowObjectSheet(DynMapGetMap(document, this.mapId), null); 
	}; 
	_2.getMapDiv().appendChild(_4); 
	this.div = _4; 
}; 
GCISSheetLayer.prototype.remove = function(_5) {
	this.div.parentNode.removeChild(this.div); 
}; 
GCISSheetLayer.prototype.move = function(dx, dy, _8) {
	this.refresh(); 
}; 
GCISSheetLayer.prototype.refresh = function(_9) {
	if(!this.div) {
		return; 
	}
	var _a = this.object; 
	if(!_a) {
		this.visible = false; 
		this.div.style.visibility = "hidden"; 
		this.visible = false; 
		this.div.style.left = "-1000px"; 
		this.div.style.top = "-1000px"; 
		return; 
	}
	if(_9) {
		this.fillText(); 
	}
	this.posx = this.dynMap.calcPixelX(_a.mapx) + 2 + (_a.width ? _a.width : 0); 
	this.posy = this.dynMap.calcPixelY(_a.mapy) + 2; 
	var _b = true; 
	var _c = this.dynMap.displayMargin; 
	if((_a.posx > this.dynMap.width + _c) || (_a.posx <=- _c) || (_a.posy > this.dynMap.height + _c) || (_a.posy <=- _c)) {
		_b = false; 
	}
	if(_b) {
		this.div.style.textAlign = "center"; 
		this.div.style.visibility = "visible"; 
		this.visible = true; 
		this.div.style.left = this.posx + "px"; 
		this.div.style.top = this.posy + "px"; 
	}
	else {
		if(this.visible) {
			this.div.style.visibility = "hidden"; 
			this.visible = false; 
		}
	}
	if(__poi) {
		if(!this.eventActive) {
			this.eventActive = 1; 
			__poi.getObjectManager().eventSheet(this.div); 
		}
	}
}; 
GCISSheetLayer.prototype.fillText = function() {
	this.div.innerHTML = (this.object.text ? "<div>" + this.object.text + "</div>" : "<div> </div>"); 
}; 
GCISSheetLayer.prototype.showObject = function(_d) {
	this.object = _d; 
	if(_d) {
		this.fillText(); 
	}
	this.refresh(); 
}; 
GCISSheetLayer.prototype.hide = function() {
	this.object = null; 
	this.refresh(); 
}; 
function POIWindowLayer() {
	this.object = null; 
	__poiWindow = this; 
	this.isLoadingScript = false; 
}
POIWindowLayer.prototype = new GCISAbstractLayer(); 
POIWindowLayer.prototype.init = function(_1) {
	this.dynMap = _1; 
	var _2 = document.createElement("div"); 
	_2.id = _1.id + "_poiWindow"; 
	_2.style.zIndex = "1001"; 
	_2.style.position = "absolute"; 
	_2.style.cursor = "auto"; 
	_2.style.textAlign = "left"; 
	this.div = _2; 
	this.setLocation(300, 100); 
	if(typeof(this.dynMap.mapDiv) != "undefined") {
		this.dynMap.mapDiv.appendChild(this.div); 
	}
	var _3 = document.createElement("div"); 
	_3.id = this.div.id + "_loading"; 
	_3.style.position = "absolute"; 
	_3.className = "geoportail_bull_loading"; 
	_3.innerHTML = "Chargement"; 
	this.divLoading = _3; 
	this.div.appendChild(this.divLoading); 
	var _4 = document.createElement("div"); 
	_4.id = this.div.id + "_content"; 
	_4.innerHTML = "bla bla"; 
	this.divContent = _4; 
	this.div.appendChild(this.divContent); 
	var _5 = document.createElement("img"); 
	_5.src = adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/ico_win_close.gif"; 
	_5.className = "geoportail_bull_close_img"; 
	this.imgClose = _5; 
	this.div.appendChild(_5); 
	this.hide(); 
	Event.observe(this.div, "mousedown", this.mouseDownCatch); 
	Event.observe(this.div, "mouseup", this.mouseUpCatch); 
	this.mouseDownOnWin = false; 
	if(document.getElementById(this.div.id).attachEvent) {
		document.getElementById(this.div.id).attachEvent("onmousewheel", this.mouseEventCatch.bindAsEventListener(this)); 
	}
	else {
		Event.observe(document.getElementById(this.div.id), "DOMMouseScroll", this.mouseEventCatch.bindAsEventListener(this)); 
	}
}; 
POIWindowLayer.prototype.refresh = function(_6) {
	if(!this.div) {
		return; 
	}
	var _7 = this.object; 
	if(!_7) {
		if(this.isVisible()) {
			this.hide(); 
		}
		return; 
	}
	this.posx = this.dynMap.calcPixelX(_7.mapx) + (_7.width ? _7.width : 0); 
	this.posy = this.dynMap.calcPixelY(_7.mapy) + (_7.height ? _7.height : 0); 
	var _8 = 0; 
	var _9 = true; 
	var _a = this.dynMap.calcPixelX(_7.mapx) - _8; 
	var _b = this.dynMap.calcPixelY(_7.mapy) + _8; 
	var _c = this.getSize(); 
	var _d = this.getLocation(); 
	var _e; 
	var _f; 
	if(this.divLoading && (this.divLoading.style.visibility != "hidden")) {
		_c.width = max(_c.width, this.divLoading.offsetWidth); 
		_c.height = max(_c.height, this.divLoading.offsetHeight); 
	}
	if((_a < 0) || (_a > this.dynMap.width)) {
		_9 = false; 
	}
	else {
		var _10 = this.dynMap.width; 
		var _11 = document.getElementById("winTools"); 
		if(_11 && (_11.style.display != "none")) {
			_10 = _11.offsetLeft; 
		}
		var _12 = 0; 
		var _13 = document.getElementById("winLayers"); 
		if(_13 && (_13.style.display != "none")) {
			_12 = _13.offsetLeft + _13.offsetWidth; 
		}
		if((this.dynMap.width - _a) < _c.width) {
			if((2 * (_c.width)) > this.dynMap.width) {
				if(_a > _c.width) {
					_e = _a - _c.width; 
				}
				else {
					_e = this.dynMap.width - _c.width; 
				}
			}
			else {
				_e = _a - _c.width; 
			}
		}
		else {
			_e = _a; 
		}
	}
	if(_9) {
		if((_b < 0) || (_b > this.dynMap.height)) {
			_9 = false; 
		}
		else {
			if((this.dynMap.height - _b) < _c.height) {
				if((2 * (_c.height)) > this.dynMap.height) {
					if(_b > _c.height) {
						_f = _b - _c.height; 
					}
					else {
						_f = this.dynMap.height - _c.height; 
					}
				}
				else {
					_f = _b - _c.height; 
				}
			}
			else {
				_f = _b; 
			}
		}
	}
	var _13 = document.getElementById("winLayers"); 
	if(_13 && _13.visible) {
		if((_e + _c.width) < (_13.offsetLeft + _13.offsetWidth + 30)) {
			_e = _13.offsetLeft + _13.offsetWidth + 30 - _c.width; 
		}
	}
	if(_9) {
		this.setLocation(_e, _f); 
	}
	else {
		this.hide(true); 
	}
}; 
POIWindowLayer.prototype.move = function(dx, dy, _16) {
	this.refresh(); 
}; 
POIWindowLayer.prototype.showObject = function(obj) {
	this.object = obj; 
	if(obj) {
		if(this.script) {
			this.unloadJS(); 
		}
		if(!this.isVisible()) {
			this.setVisible(true); 
		}
		this.setContentVisible(false); 
		this.setLoadingVisible(true); 
		this.refresh(); 
		if(this.isLoadingScript) {
			this.unloadJS(); 
		}
		if(obj.text.substr(0, 4) == "http") {
			var _18 = ""; 
			if(typeof(obj.maxHeight) != "undefined" && obj.maxHeight != "" && typeof(obj.maxWidth) != "undefined" && obj.maxWidth != "") {
				_18 = _18 + " width=\"" + obj.maxWidth + "px\" height=\"" + obj.maxHeight + "px\""; 
			}
			__poiWindow.fillText("<iframe name=\"POI\"" + _18 + " src=\"" + obj.text + "\"></iframe>"); 
		}
		else {
			this.loadJS(SERVEURBASE + "/" + obj.prefixeBulle + "-" + obj.name + "__" + obj.name + "_html/" + obj.text + ".js"); 
		}
	}
}; 
POIWindowLayer.prototype.loadJS = function(src) {
	var _1a = document.createElement("script"); 
	_1a.type = "text/javascript"; 
	_1a.src = src; 
	this.script = _1a; 
	var _1b = document.getElementsByTagName("head")[0]; 
	_1b.appendChild(this.script); 
	this.isLoadingScript = true; 
}; 
POIWindowLayer.prototype.unloadJS = function(src) {
	if(this.script) {
		var _1d = document.getElementsByTagName("head")[0]; 
		_1d.removeChild(this.script); 
		delete this.script; 
		this.isLoadingScript = false; 
	}
}; 
POIWindowLayer.prototype.fillText = function(_1e) {
	if(this.divContent) {
		this.divContent.innerHTML = _1e; 
		window.setTimeout("__poiWindow.show();", 100); 
	}
}; 
POIWindowLayer.prototype.show = function() {
	if(this.div) {
		this.refresh(); 
		if(this.isVisible()) {
			this.setContentVisible(true); 
		}
		this.setLoadingVisible(false); 
	}
}; 
POIWindowLayer.prototype.hide = function(_1f) {
	if(_1f && _1f == true) {
		this.object = null; 
	}
	if(this.div) {
		this.setVisible(false); 
	}
	if(this.divLoading) {
		this.setLoadingVisible(false); 
	}
	if(this.divContent) {
		this.setContentVisible(false); 
	}
	if(this.script) {
		this.unloadJS(); 
	}
}; 
POIWindowLayer.prototype.remove = function(_20) {
	if(this.dynMap && this.div) {
		this.dynMap.mapDiv.removeChild(this.div); 
	}
}; 
POIWindowLayer.prototype.mouseDownCatch = function(_21) {
	Event.observe(__poiWindow.div, "mousemove", __poiWindow.mouseEventCatch); 
	Event.stop(_21); 
	return false; 
}; 
POIWindowLayer.prototype.mouseUpCatch = function(_22) {
	Event.stopObserving(__poiWindow.div, "mousemove", __poiWindow.mouseEventCatch); 
	Event.stop(_22); 
	return false; 
}; 
POIWindowLayer.prototype.mouseEventCatch = function(_23) {
	Event.stop(_23); 
	return false; 
}; 
POIWindowLayer.prototype.mouseCloseClick = function(_24) {
	if(__poiWindow) {
		__poiWindow.hide(true); 
	}
	Event.stop(_24); 
	return false; 
}; 
POIWindowLayer.prototype.setLocation = function(_25, top) {
	if(this.div) {
		this.div.style.left = _25 + "px"; 
		this.div.style.top = top + "px"; 
	}
}; 
POIWindowLayer.prototype.getLocation = function() {
	if(this.div) {
		return {
			top : this.div.offsetTop, left : this.div.offsetLeft}; 
	}
}; 
POIWindowLayer.prototype.isVisible = function() {
	if(!this.div) {
		return false; 
	}
	return(this.div.style.visibility == "visible") ? true : false; 
}; 
POIWindowLayer.prototype.setVisible = function(vis) {
	if(this.div) {
		if(vis) {
			this.div.style.visibility = "visible"; 
		}
		else {
			this.div.style.visibility = "hidden"; 
		}
	}
}; 
POIWindowLayer.prototype.setLoadingVisible = function(vis) {
	if(this.divLoading) {
		if(vis) {
			this.divLoading.style.visibility = "visible"; 
		}
		else {
			this.divLoading.style.visibility = "hidden"; 
		}
	}
}; 
POIWindowLayer.prototype.setContentVisible = function(vis) {
	if(this.divContent) {
		if(vis) {
			this.imgClose.style.visibility = "visible"; 
			this.divContent.style.visibility = "visible"; 
			Event.observe(this.imgClose, "mousedown", this.mouseCloseClick); 
		}
		else {
			this.imgClose.style.visibility = "hidden"; 
			this.divContent.style.visibility = "hidden"; 
			this.divContent.innerHTML = ""; 
			Event.stopObserving(this.imgClose, "mousedown", this.mouseCloseClick); 
		}
	}
}; 
POIWindowLayer.prototype.getSize = function() {
	if(this.div) {
		return {
			width : this.div.offsetWidth, height : this.div.offsetHeight}; 
	}
}; 
function GCISMouseMode() {
	this.dynMap = null; 
}
GCISMouseMode.prototype.getName = function() {
	return this.name; 
}; 
GCISMouseMode.prototype.setMap = function(_1) {
	this.dynMap = _1; 
}; 
GCISMouseMode.prototype.mouseDown = function(_2) {
}; 
GCISMouseMode.prototype.mouseDrag = function(_3) {
}; 
GCISMouseMode.prototype.endDrag = function(_4) {
}; 
GCISMouseMode.prototype.mouseDblClick = function(_5) {
}; 
GCISMouseMode.prototype.mouseWheel = function(_6) {
}; 
function GCISMoveMode() {
	this.selectMode = 0; 
	this.name = "move"; 
}
GCISMoveMode.prototype = new GCISMouseMode(); 
var b_deselect = 0; 
var b_pan = 0; 
var currentMap = null; 
GCISMoveMode.prototype.mouseDown = function(_7) {
	if(this.selectMode) {
		var _8 = new Date(); 
		b_deselect = 1; 
		b_pan = 0; 
	}
	if(this.dynMap.animator) {
		this.dynMap.stopAnimation(); 
	}
	this.dynMap.dragging = true; 
	this.beginDragCursorX = this.dynMap.browser.getXposition(_7); 
	this.beginDragCursorY = this.dynMap.browser.getYposition(_7); 
	this.beginDragX = this.dynMap.currentX; 
	this.beginDragY = this.dynMap.currentY; 
	currentMap = this.dynMap; 
	this.dynMap.currentDoc.onmousemove = function(_9) {
		if(currentMap && currentMap.mouseMode) {
			if(this.selectMode) {
				b_deselect = 0; 
			}
			if(currentMap.mouseMode.zoomMode) {
				b_pan = 1; 
			}
			currentMap.mouseMode.mouseDrag(_9); 
		}
	}; 
	this.dynMap.currentDoc.onmouseup = function(_a) {
		if(currentMap && currentMap.mouseMode) {
			if(currentMap.mouseMode.selectMode) {
				var _b = new Date(); 
				var _c = _b - _8; 
				if((_c > 300) && (_c < 1100)) {
					if(b_deselect) {
						currentMap.resetSelection(currentMap); 
						b_deselect = 0; 
					}
				}
				if(currentMap.mouseMode.zoomMode &&!b_pan) {
					if(!_a) {
						_a = window.event; 
					}
					var _d; 
					if(_a.which) {
						_d = (_a.which === 3); 
					}
					else {
						if(_a.button) {
							_d = (_a.button === 2); 
						}
					}
					if(_d) {
						currentMap.animateZoom(currentMap.scale + 1); 
					}
					else {
						currentMap.animateZoom(currentMap.scale - 1); 
					}
				}
			}
			currentMap.mouseMode.endDrag(_a); 
		}
	}; 
	this.dynMap.window.onmouseout = function(_e) {
		if(currentMap && currentMap.mouseMode) {
			currentMap.mouseMode.endDrag(_e); 
		}
	}; 
	this.dynMap.browser.cancelEvent(_7); 
}; 
GCISMoveMode.prototype.mouseDrag = function(_f, end) {
	var db = document.getElementById("debug"); 
	if(db) {
		db.innerHTML = ""; 
	}
	var _12 = this.dynMap.browser.getXposition(_f); 
	var _13 = this.dynMap.browser.getYposition(_f); 
	var dx = _12 - this.beginDragCursorX; 
	var dy = _13 - this.beginDragCursorY; 
	this.dynMap.currentX = this.dynMap.calcMapDeltaX(this.beginDragX, - dx); 
	this.dynMap.currentY = this.dynMap.calcMapDeltaY(this.beginDragY, - dy); 
	this.dynMap.moveMap(dx, dy, end); 
	this.dynMap.browser.cancelEvent(_f); 
}; 
GCISMoveMode.prototype.endDrag = function(_16) {
	this.mouseDrag(_16, true); 
	this.dynMap.currentDoc.onmouseup = null; 
	this.dynMap.currentDoc.onmousemove = null; 
	this.dynMap.window.onmouseout = null; 
	currentMap = null; 
	this.dynMap.dragging = false; 
	this.endMoveMap(); 
}; 
GCISMoveMode.prototype.endMoveMap = function() {
	var i; 
	for(i = 0; i < this.dynMap.layers.length; i++) {
		if(this.dynMap.layers[i].visible) {
			this.dynMap.layers[i].endMove(); 
		}
	}
}; 
GCISMoveMode.prototype.mouseWheel = function(e) {
	if(this.dynMap.animator) {
		return; 
	}
	if(!e) {
		e = window.event; 
	}
	var _19 = e.wheelDelta; 
	if(!_19) {
		if(e.detail < 0) {
			_19 = 1; 
		}
		else {
			_19 =- 1; 
		}
	}
	else {
		_19 /= 120; 
	}
	this.dynMap.animateZoom(this.dynMap.getScale() + _19); 
}; 
GCISMoveMode.prototype.mouseDblClick = function(_1a) {
	this.dynMap.centerClick(_1a); 
}; 
function GCISSelectMode() {
	this.selectMode = 1; 
	this.name = "select"; 
}
GCISSelectMode.prototype = new GCISMoveMode(); 
function GCISCreateMode(_1b, _1c, _1d, _1e, _1f) {
	this.kind = _1b; 
	this.layerName = _1c; 
	this.size = _1d; 
	this.color = _1e; 
	this.opacity = _1f; 
	this.name = "create"; 
}
GCISCreateMode.prototype = new GCISMoveMode(); 
GCISCreateMode.prototype.setMap = function(map) {
	this.dynMap = map; 
	this.layer = map.getLayer(this.layerName); 
	if(!this.layer) {
		alert("No such layer : " + this.layerName + " in " + map.layers); 
	}
}; 
GCISCreateMode.prototype.mouseWheel = function(e) {
	if(this.dynMap.animator) {
		return; 
	}
	if(!e) {
		e = window.event; 
	}
	var _22 = e.wheelDelta; 
	if(!_22) {
		if(e.detail > 0) {
			_22 = 1; 
		}
		else {
			_22 =- 1; 
		}
	}
	else {
		_22 /=- 120; 
	}
	this.dynMap.animateZoom(this.dynMap.getScale() + _22); 
}; 
GCISCreateMode.prototype.mouseDown = function(_23) {
	this.dynMap.dragging = true; 
	this.beginDragCursorX = this.dynMap.browser.getXposition(_23); 
	this.beginDragCursorY = this.dynMap.browser.getYposition(_23); 
	this.beginDragX = this.dynMap.currentX; 
	this.beginDragY = this.dynMap.currentY; 
	currentMap = this.dynMap; 
	this.dynMap.currentDoc.onmousemove = function(_24) {
		if(currentMap && currentMap.mouseMode) {
			currentMap.mouseMode.isdragging = 1; 
			currentMap.mouseMode.mouseDrag(_24); 
		}
	}; 
	this.dynMap.currentDoc.onmouseup = function(_25) {
		var _26, _27, x, y; 
		if(currentMap && currentMap.mouseMode) {
			if(!currentMap.mouseMode.isdragging) {
				_26 = currentMap.browser.getXposition(_25); 
				_27 = currentMap.browser.getYposition(_25); 
				_26 -= currentMap.browser.getElementLeft(currentMap.mainDiv); 
				_27 -= currentMap.browser.getElementTop(currentMap.mainDiv); 
				x = currentMap.calcMapX(_26); 
				y = currentMap.calcMapY(_27); 
				if(!currentMap.mouseMode.currentObject) {
					if(currentMap.mouseMode.kind == "line") {
						currentMap.mouseMode.currentObject = new GCISLine([x], [y], currentMap.mouseMode.size, currentMap.mouseMode.color, currentMap.mouseMode.opacity); 
						currentMap.mouseMode.layer.addElement(currentMap.mouseMode.currentObject); 
					}
					else {
						if(currentMap.mouseMode.kind == "poly") {
							currentMap.mouseMode.currentObject = new GCISPolygon([x], [y], currentMap.mouseMode.color, currentMap.mouseMode.size, "#000000", currentMap.mouseMode.opacity); 
							currentMap.mouseMode.isDrawingPoly = true; 
							currentMap.mouseMode.deleteLastPointPoly = false; 
							currentMap.mouseMode.layer.addElement(currentMap.mouseMode.currentObject); 
						}
						else {
							if(currentMap.mouseMode.kind == "point") {
								currentMap.mouseMode.currentObject = new GCISPoint(x, y, currentMap.mouseMode.color, currentMap.mouseMode.size, "#000000", currentMap.mouseMode.opacity); 
							}
						}
					}
				}
				else {
					if(currentMap.mouseMode.kind == "line" || currentMap.mouseMode.kind == "poly") {
						if(currentMap.mouseMode.deleteLastPointPoly) {
							currentMap.mouseMode.currentObject.deleteLastPoint(); 
						}
						currentMap.mouseMode.currentObject.addPoint(x, y); 
						currentMap.mouseMode.deleteLastPointPoly = false; 
					}
				}
				currentMap.mouseMode.layer.refresh(); 
			}
			if(currentMap.mouseMode.currentObject) {
				if(currentMap.mouseMode.kind == "circle" || currentMap.mouseMode.kind == "rect" || currentMap.mouseMode.kind == "point") {
					currentMap.mouseMode.notifyDrawingFinish(); 
				}
			}
			currentMap.mouseMode.isdragging = 0; 
			currentMap.mouseMode.endDrag(_25); 
		}
	}; 
	this.dynMap.window.onmouseout = function(_2a) {
		if(currentMap && currentMap.mouseMode) {
			currentMap.mouseMode.endDrag(_2a); 
		}
	}; 
	this.dynMap.browser.cancelEvent(_23); 
}; 
GCISCreateMode.prototype.mouseDrag = function(_2b, end) {
	var db = document.getElementById("debug"); 
	if(db) {
		db.innerHTML = ""; 
	}
	var _2e = this.dynMap.browser.getXposition(_2b); 
	var _2f = this.dynMap.browser.getYposition(_2b); 
	var dx = _2e - this.beginDragCursorX; 
	var dy = _2f - this.beginDragCursorY; 
	var x, y, _34; 
	if(this.kind == "line" || this.kind == "poly") {
		if(!this.isDrawingPoly) {
			this.dynMap.currentX = this.dynMap.calcMapDeltaX(this.beginDragX, - dx); 
			this.dynMap.currentY = this.dynMap.calcMapDeltaY(this.beginDragY, - dy); 
			this.dynMap.moveMap(dx, dy, end); 
		}
		else {
			this.isdragging = false; 
			_2e -= currentMap.browser.getElementLeft(currentMap.mainDiv); 
			_2f -= currentMap.browser.getElementTop(currentMap.mainDiv); 
			x = currentMap.calcMapX(_2e); 
			y = currentMap.calcMapY(_2f); 
			if(this.deleteLastPointPoly) {
				this.currentObject.deleteLastPoint(); 
			}
			this.currentObject.addPoint(x, y); 
			this.deleteLastPointPoly = true; 
			this.layer.refresh(); 
		}
	}
	else {
		if(!end) {
			_2e -= this.dynMap.browser.getElementLeft(this.dynMap.mainDiv); 
			_2f -= this.dynMap.browser.getElementTop(this.dynMap.mainDiv); 
			x = currentMap.calcMapX(_2e); 
			y = currentMap.calcMapY(_2f); 
			if(!this.currentObject) {
				if(this.kind == "circle") {
					this.circleX = _2e; 
					this.circleY = _2f; 
					this.currentObject = new GCISCircle(x, y, this.dynMap.calcMapDeltaX(0, 1), 0, 2 * Math.PI, false, this.color, this.size, "#000000", this.opacity, true); 
				}
				if(this.kind == "rect") {
					this.currentObject = new GCISRect(x, x + this.dynMap.calcMapDeltaX(0, 1), y, y + this.dynMap.calcMapDeltaY(0, 1), this.color, this.size, "#000000", this.opacity, true); 
				}
				if(this.kind == "point") {
					this.currentObject = new GCISPoint(x, y, currentMap.mouseMode.color, currentMap.mouseMode.size, "#000000", currentMap.mouseMode.opacity); 
				}
				this.layer.addElement(this.currentObject); 
			}
			else {
				if(this.kind == "circle") {
					_34 = Math.sqrt(Math.pow(this.circleX - _2e, 2) + Math.pow(this.circleY - _2f, 2)); 
					this.currentObject.radius = this.dynMap.calcMapDeltaX(0, _34); 
				}
				if(this.kind == "rect") {
					this.currentObject.mapx2 = x; 
					this.currentObject.mapy2 = y; 
					this.currentObject.xPoints[1] = x; 
					this.currentObject.yPoints[1] = y; 
				}
				if(this.kind == "point") {
					this.currentObject.mapx = x; 
					this.currentObject.mapy = y; 
				}
				this.layer.refresh(); 
			}
		}
	}
	this.dynMap.browser.cancelEvent(_2b); 
}; 
GCISCreateMode.prototype.endDrag = function(_35) {
	this.mouseDrag(_35, true); 
	if(!this.isDrawingPoly) {
		this.dynMap.currentDoc.onmouseup = null; 
		this.dynMap.currentDoc.onmousemove = null; 
		currentMap = null; 
	}
	this.dynMap.window.onmouseout = null; 
	this.dynMap.dragging = false; 
	this.endMoveMap(); 
}; 
GCISCreateMode.prototype.mouseDblClick = function(_36) {
	if(this.isDrawingPoly) {
		this.isDrawingPoly = false; 
		this.currentObject.deleteLastPoint(); 
		this.currentObject.deleteLastPoint(); 
		this.dynMap.currentDoc.onmouseup = null; 
		this.dynMap.currentDoc.onmousemove = null; 
		currentMap = null; 
		this.notifyDrawingFinish(); 
	}
}; 
GCISCreateMode.prototype.notifyDrawingFinish = function() {
	var i, _38; 
	for(i = 0; i < this.dynMap.drawingListeners.length; i++) {
		_38 = this.dynMap.drawingListeners[i]; 
		if(_38.onDrawFinish) {
			_38.onDrawFinish(this.currentObject, this.kind); 
		}
	}
	this.layer.deleteAllElements(); 
	this.layer.graphics.clear(); 
	this.currentObject = null; 
}; 
function GCISGeoportailMode() {
	this.selectMode = 1; 
	this.name = "gpp"; 
	this.zoomMode =- 1; 
}
GCISGeoportailMode.prototype = new GCISMoveMode(); 
GCISGeoportailMode.prototype.mouseWheel = function(e) {
	if(this.dynMap.animator) {
		return; 
	}
	if(!e) {
		e = window.event; 
	}
	var _3a = e.wheelDelta; 
	if(!_3a) {
		if(e.detail > 0) {
			_3a = 1; 
		}
		else {
			_3a =- 1; 
		}
	}
	else {
		if(_3a > 0) {
			_3a =- 1; 
		}
		else {
			_3a = 1; 
		}
	}
	var _3b = parseInt(this.dynMap.getScale()); 
	_3b = _3b + _3a; 
	this.dynMap.animateZoom(_3b); 
}; 
GCISGeoportailMode.prototype.mouseDrag = function(_3c, end) {
	var db = document.getElementById("debug"); 
	if(db) {
		db.innerHTML = ""; 
	}
	var _3f = this.dynMap.browser.getXposition(_3c); 
	var _40 = this.dynMap.browser.getYposition(_3c); 
	var dx = _3f - this.beginDragCursorX; 
	var dy = _40 - this.beginDragCursorY; 
	if(b_pan) {
		this.dynMap.currentX = this.dynMap.calcMapDeltaX(this.beginDragX, - dx); 
		this.dynMap.currentY = this.dynMap.calcMapDeltaY(this.beginDragY, - dy); 
	}
	this.dynMap.moveMap(dx, dy, end); 
	this.dynMap.browser.cancelEvent(_3c); 
}; 
GCISGeoportailMode.prototype.endDrag = function(_43) {
	if(!this.dynMap.animator) {
		this.mouseDrag(_43, true); 
	}
	this.dynMap.currentDoc.onmouseup = null; 
	this.dynMap.currentDoc.onmousemove = null; 
	this.dynMap.window.onmouseout = null; 
	currentMap = null; 
	this.dynMap.dragging = false; 
	this.endMoveMap(); 
}; 
GCISGeoportailMode.prototype.mouseDblClick = function(_44) {
}; 
function GCISZoomSelectionMode() {
	this.name = "zoomSelection"; 
}
GCISZoomSelectionMode.prototype = new GCISGeoportailMode(); 
GCISZoomSelectionMode.prototype.mouseDown = function(_45) {
	if(this.dynMap.animator) {
		this.dynMap.stopAnimation(); 
	}
	this.dynMap.dragging = true; 
	this.beginDragCursorX = this.dynMap.browser.getXposition(_45); 
	this.beginDragCursorY = this.dynMap.browser.getYposition(_45); 
	this.beginDragX = this.dynMap.currentX; 
	this.beginDragY = this.dynMap.currentY; 
	currentMap = this.dynMap; 
	var _46 = this.beginDragCursorX - this.dynMap.browser.getElementLeft(this.dynMap.mainDiv); 
	var _47 = this.beginDragCursorY - this.dynMap.browser.getElementTop(this.dynMap.mainDiv); 
	var _48 = new GCISZoomSelection(this.dynMap, _46, _47); 
	this.dynMap.addLayer("zoomsel", _48); 
	this.dynMap.currentDoc.onmousemove = function(_49) {
		if(currentMap && currentMap.mouseMode) {
			currentMap.mouseMode.mouseDrag(_49); 
		}
	}; 
	this.dynMap.currentDoc.onmouseup = function(_4a) {
		if(currentMap && currentMap.mouseMode) {
			currentMap.mouseMode.endDrag(_4a); 
		}
	}; 
	this.dynMap.browser.cancelEvent(_45); 
}; 
GCISZoomSelectionMode.prototype.mouseDrag = function(_4b, end) {
	if(!this.dynMap.dragging) {
		return; 
	}
	var db = document.getElementById("debug"); 
	if(db) {
		db.innerHTML = ""; 
	}
	var _4e = this.dynMap.browser.getXposition(_4b); 
	var _4f = this.dynMap.browser.getYposition(_4b); 
	var dx = _4e - this.beginDragCursorX; 
	var dy = _4f - this.beginDragCursorY; 
	this.dynMap.getLayer("zoomsel").setDelta(dx, dy); 
	if(end) {
		this.dynMap.dragging = false; 
		var _52 = this.dynMap.getLayer("zoomsel"); 
		var _53 = this.dynMap.calcMapX(_52.getXmin()) * this.dynMap.precision; 
		var _54 = this.dynMap.calcMapX(_52.getXmax()) * this.dynMap.precision; 
		var _55 = this.dynMap.calcMapY(_52.getYmin()) * this.dynMap.precision; 
		var _56 = this.dynMap.calcMapY(_52.getYmax()) * this.dynMap.precision; 
		var _57 = min(_53, _54); 
		var _58 = max(_53, _54); 
		var _59 = min(_55, _56); 
		var _5a = max(_55, _56); 
		this.dynMap.centerOnRect(_57, _59, _58, _5a, true); 
		this.dynMap.removeLayer("zoomsel", _52); 
	}
	this.dynMap.browser.cancelEvent(_4b); 
}; 
GCISZoomSelectionMode.prototype.endDrag = function(_5b) {
	this.mouseDrag(_5b, true); 
	this.dynMap.currentDoc.onmouseup = null; 
	this.dynMap.currentDoc.onmousemove = null; 
	this.dynMap.window.onmouseout = null; 
	currentMap = null; 
	this.dynMap.dragging = false; 
}; 
__log(" loading htc-graphics-070215..."); 
var _graphic; 
function createGCISGraphic(_1, _2) {
	var ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
	var _4 = (navigator.userAgent.toLowerCase().indexOf("opera") !=- 1); 
	var _5, _6; 
	if((!ie) || (ie[1] < 5) || (_4)) {
		_graphic = new GCISCanvasGraphic(); 
		_graphic.initParameters(_1, _2); 
	}
	else {
		_1.namespaces.add("v"); 
		_5 = document.createElement("object"); 
		_5.id = "VMLRender"; 
		_5.codebase = "vgx.dll"; 
		_5.classid = "CLSID:10072CEC-8CC1-11D1-986E-00A0C955B42E"; 
		_1.body.appendChild(_5); 
		_6 = document.createStyleSheet(); 
		_6.addRule("v\\:*", "behavior: url(#VMLRender);"); 
		_graphic = new VMLGraphic(_1, _2); 
	}
	return _graphic; 
}
function GCISCanvasGraphic() {
}
GCISCanvasGraphic.prototype.initParameters = function(_7, _8) {
	var c = _7.createElement("canvas"); 
	this.canvas = c; 
	this.div = _8; 
	c.style.position = "absolute"; 
	c.style.left = 0; 
	c.style.top = 0; 
	this.width = _8.clientWidth; 
	this.height = _8.clientHeight; 
	c.width = _8.clientWidth; 
	c.height = _8.clientHeight; 
	_8.appendChild(c); 
	this.ctx = c.getContext("2d"); 
	this.ctx.lineJoin = "round"; 
	this.clipper = new GCISClipper(0, this.width, 0, this.height); 
}; 
GCISCanvasGraphic.prototype.setSize = function(w, h) {
	var c = this.canvas; 
	var _d = this.div; 
	this.ctx.save(); 
	_d.style.width = w + "px"; 
	_d.style.height = h + "px"; 
	this.ctx.restore(); 
}; 
GCISCanvasGraphic.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.width, this.height); 
}; 
GCISCanvasGraphic.prototype.translate = function(x, y) {
	this.ctx.translate(x, y); 
}; 
GCISCanvasGraphic.prototype.scale = function(sx, sy) {
	this.ctx.scale(sx, sy); 
}; 
GCISCanvasGraphic.prototype.setFillColor = function(_12) {
	this.ctx.fillStyle = _12; 
}; 
GCISCanvasGraphic.prototype.setLineColor = function(_13) {
	this.ctx.strokeStyle = _13; 
}; 
GCISCanvasGraphic.prototype.setLineWidth = function(w) {
	this.ctx.lineWidth = w; 
}; 
GCISCanvasGraphic.prototype.setOpacity = function(o) {
	this.ctx.globalAlpha = o; 
}; 
GCISCanvasGraphic.prototype.fillRect = function(x1, y1, x2, y2) {
	this.ctx.fillRect(x1, y1, x2 - x1, y2 - y1); 
}; 
GCISCanvasGraphic.prototype.fillEllipse = function(x1, y1, x2, y2) {
	this.ctx.fillEllipse(x1, y1, x2 - x1, y2 - y1); 
}; 
GCISCanvasGraphic.prototype.intersectLine = function(x1, y1, x2, y2) {
	return true; 
}; 
GCISCanvasGraphic.prototype.intersectPoint = function(x, y) {
	return true; 
}; 
GCISCanvasGraphic.prototype.drawPolyline = function(_24, _25) {
	var ctx = this.ctx; 
	ctx.beginPath(); 
	var i; 
	ctx.moveTo(_24[0], _25[0]); 
	for(i = 1; i < _24.length; i++) {
		ctx.lineTo(_24[i], _25[i]); 
	}
	ctx.stroke(); 
}; 
GCISCanvasGraphic.prototype.drawPolygon = function(_28, _29, _2a) {
	var ctx = this.ctx; 
	ctx.beginPath(); 
	var i; 
	ctx.moveTo(_28[0], _29[0]); 
	for(i = 1; i < _28.length; i++) {
		ctx.lineTo(_28[i], _29[i]); 
	}
	if(_2a) {
		ctx.lineTo(_28[0], _29[0]); 
	}
	if(_2a) {
		ctx.fill(); 
	}
	ctx.stroke(); 
}; 
GCISCanvasGraphic.prototype.drawCircle = function(x, y, rad, _30, _31, _32, _33) {
	var ctx = this.ctx; 
	ctx.beginPath(); 
	ctx.arc(x, y, rad, _30, _31, _32); 
	if(_33) {
		ctx.fill(); 
	}
	ctx.stroke(); 
	ctx.stroke(); 
}; 
GCISCanvasGraphic.prototype.drawRect = function(x, y, _37, _38, _39) {
	var ctx = this.ctx; 
	ctx.beginPath(); 
	ctx.rect(x, y, _37, _38); 
	if(_39) {
		ctx.fill(); 
	}
	ctx.stroke(); 
	ctx.stroke(); 
}; 
function VMLContext(_3b) {
	this.vmlgraphic = _3b; 
	this.fillStyle = "black"; 
	this.globalAlpha = 1; 
	this.lineJoin = ""; 
	this.lineWidth = "0"; 
	this.strokeStyle = "black"; 
	this.path = ""; 
	this.offsetX = 0; 
	this.offsetY = 0; 
}
VMLContext.prototype.beginPath = function() {
	this.path = ""; 
}; 
VMLContext.prototype.moveTo = function(aX, aY) {
	this.path += "m" + parseInt(aX, 10) + "," + parseInt(aY, 10); 
}; 
VMLContext.prototype.lineTo = function(aX, aY) {
	this.path += "l" + parseInt(aX, 10) + "," + parseInt(aY, 10); 
}; 
VMLContext.prototype.arc = function(x, y, _42, _43, _44, _45) {
	var xi, yi, x1, y1, x2, y2, x3, y3, x4, y4; 
	if(this.path) {
		this.path += " "; 
	}
	xi = parseFloat(x); 
	yi = parseFloat(y); 
	x1 = xi - _42; 
	y1 = yi - _42; 
	x2 = xi + _42; 
	y2 = yi + _42; 
	x3 = xi + (Math.cos(_43) * _42); 
	y3 = yi + (Math.sin(_43) * _42); 
	x4 = xi + (Math.cos(_44) * _42); 
	y4 = yi + (Math.sin(_44) * _42); 
	x3 = Math.round(x3); 
	y3 = Math.round(y3); 
	x4 = Math.round(x4); 
	y4 = Math.round(y4); 
	this.path += "ar" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + x3 + "," + y3 + "," + x4 + "," + y4; 
}; 
VMLContext.prototype.rect = function(x, y, _52, _53) {
	this.moveTo(x, y); 
	this.lineTo(x + _52, y); 
	this.lineTo(x + _52, y + _53); 
	this.lineTo(x, y + _53); 
	this.closePath(); 
}; 
VMLContext.prototype.closePath = function() {
	if(this.path) {
		this.path += " "; 
	}
	this.path += "x"; 
}; 
VMLContext.prototype.stroke = function(_54) {
	if(!this.path) {
		return; 
	}
	this.path += " e"; 
	var o = document.createElement("v:shape"); 
	if(_54) {
		o.filled = true; 
		o.fillColor = this.fillStyle; 
		o.stroked = false; 
	}
	else {
		o.filled = false; 
		o.fillColor = "none"; 
		o.stroked = true; 
		o.strokeweight = this.lineWidth - 1; 
	}
	o.strokeColor = this.strokeStyle; 
	var w = parseInt(this.vmlgraphic.div.style.width, 10); 
	var h = parseInt(this.vmlgraphic.div.style.height, 10); 
	o.coordsize = w + "," + h; 
	o.style.position = "absolute"; 
	o.style.left = this.offsetX; 
	o.style.top = this.offsetY; 
	o.style.width = this.vmlgraphic.div.style.width; 
	o.style.height = this.vmlgraphic.div.style.height; 
	o.path = this.path; 
	var f, s; 
	if(_54) {
		f = document.createElement("v:fill"); 
		f.opacity = this.globalAlpha; 
		o.appendChild(f); 
	}
	else {
		s = document.createElement("v:stroke"); 
		s.opacity = this.globalAlpha; 
		o.appendChild(s); 
	}
	this.vmlgraphic.div.appendChild(o); 
}; 
VMLContext.prototype.fill = function() {
	this.stroke(true); 
}; 
function VMLGraphic(doc, div) {
	this.div = div; 
	this.ctx = new VMLContext(this); 
	this.ctx.lineJoin = "round"; 
	this.clipper = new GCISClipper(0, div.clientWidth, 0, div.clientHeight); 
}
VMLGraphic.prototype = new GCISCanvasGraphic(); 
VMLGraphic.prototype.setSize = function(w, h) {
	var div = this.div; 
	div.style.width = w + "px"; 
	div.style.height = h + "px"; 
}; 
VMLGraphic.prototype.clear = function() {
	this.div.innerHTML = ""; 
	this.ctx.path = ""; 
}; 
function GCISClipper(x1, x2, y1, y2) {
	this.xmin = x1; 
	this.xmax = x2; 
	this.ymin = y1; 
	this.ymax = y2; 
	this.TOP = 1; 
	this.BOTTOM = 2; 
	this.RIGHT = 4; 
	this.LEFT = 8; 
}
GCISClipper.prototype.compOutCode = function(x, y) {
	var _65 = 0; 
	if(y < this.ymin) {
		_65 = this.TOP; 
	}
	else {
		if(y > this.ymax) {
			_65 = this.BOTTOM; 
		}
	}
	if(x > this.xmax) {
		_65 = _65 + this.RIGHT; 
	}
	else {
		if(x < this.xmin) {
			_65 = _65 + this.LEFT; 
		}
	}
	return _65; 
}; 
GCISClipper.prototype.clipLine = function(x0, y0, x1, y1) {
	var _6a = false, _6b = false; 
	var _6c = this.compOutCode(x0, y0); 
	var _6d = this.compOutCode(x1, y1); 
	var _6e; 
	var x, y; 
	while(!_6b) {
		if(!_6c &&!_6d) {
			_6a = true; 
			_6b = true; 
		}
		else {
			if(_6c & _6d) {
				_6b = true; 
			}
			else {
				if(_6c) {
					_6e = _6c; 
				}
				else {
					_6e = _6d; 
				}
				if(this.TOP & _6e) {
					x = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0); 
					y = this.ymin; 
				}
				if(this.BOTTOM & _6e) {
					x = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0); 
					y = this.ymax; 
				}
				else {
					if(this.RIGHT & _6e) {
						y = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0); 
						x = this.xmax; 
					}
					else {
						if(this.LEFT & _6e) {
							y = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0); 
							x = this.xmin; 
						}
					}
				}
				if(_6e == _6c) {
					x0 = x; 
					y0 = y; 
					_6c = this.compOutCode(x0, y0); 
				}
				else {
					x1 = x; 
					y1 = y; 
					_6d = this.compOutCode(x1, y1); 
				}
			}
		}
	}
	if(_6a) {
		return[x0, y0, x1, y1]; 
	}
	else {
		return null; 
	}
}; 
function GCISEquirectangularProjection(_1) {
	this.code = "equirectangular"; 
	this.parameters = _1; 
	this.R = _1[0]; 
	this.fi0 = decimalDegreeToRad(_1[1]); 
	this.lam0 = decimalDegreeToRad(_1[2]); 
	this.x0 = _1[3]; 
	this.y0 = _1[4]; 
}
GCISEquirectangularProjection.prototype = new GCISAbstractProjection(); 
GCISEquirectangularProjection.prototype.project = function(_2, _3, _4) {
	var _5 = []; 
	var x = this.R * _2 * Math.cos(this.fi0); 
	var y = this.R * _3; 
	var z = _4; 
	_5.push(x); 
	_5["x"] = x; 
	_5.push(y); 
	_5["y"] = y; 
	_5.push(z); 
	_5["z"] = z; 
	return _5; 
}; 
GCISEquirectangularProjection.prototype.inverseProject = function(x, y, z) {
	var _c = []; 
	var _d = x / (this.R * Math.cos(this.fi0)); 
	var _e = y / this.R; 
	var _f = z; 
	_c.push(_d); 
	_c["long"] = _d; 
	_c.push(_e); 
	_c["lat"] = _e; 
	_c.push(_f); 
	_c["alti"] = _f; 
	return _c; 
}; 
function GCISMercatorProjection(_10) {
	this.code = "mercator"; 
	this.parameters = _10; 
	this.R = _10[0]; 
}
GCISMercatorProjection.prototype = new GCISAbstractProjection(); 
GCISMercatorProjection.prototype.project = function(_11, phi, _13) {
	var _14 = []; 
	var x = Math.round(_11 * this.R); 
	var y = Math.round(this.R * Math.log(Math.tan((Math.PI / 4) + (phi / 2)))); 
	var z = _13; 
	_14.push(x); 
	_14["x"] = x; 
	_14.push(y); 
	_14["y"] = y; 
	_14.push(z); 
	_14["z"] = z; 
	return _14; 
}; 
GCISMercatorProjection.prototype.inverseProject = function(x, y, z) {
	var _1b = []; 
	var _1c = x / this.R; 
	var phi = 2 * Math.atan(Math.exp(y / this.R)) - Math.PI / 2; 
	var _1e = z; 
	_1b.push(_1c); 
	_1b["long"] = _1c; 
	_1b.push(phi); 
	_1b["lat"] = phi; 
	_1b.push(_1e); 
	_1b["alti"] = _1e; 
	return _1b; 
}; 
function GCISMillerProjection(_1f) {
	this.code = "miller"; 
	this.parameters = _1f; 
	this.R = _1f[0]; 
}
GCISMillerProjection.prototype = new GCISAbstractProjection(); 
GCISMillerProjection.prototype.project = function(_20, phi, _22) {
	var _23 = []; 
	var x = Math.round(_20 * this.R); 
	var y = Math.round(this.R * 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.8 * phi / 2))); 
	var z = _22; 
	_23.push(x); 
	_23["x"] = x; 
	_23.push(y); 
	_23["y"] = y; 
	_23.push(z); 
	_23["z"] = z; 
	return _23; 
}; 
GCISMillerProjection.prototype.inverseProject = function(x, y, z) {
	var _2a = []; 
	var _2b = x / this.R; 
	var phi = (2 * Math.atan(Math.exp(y / (this.R * 1.25))) - Math.PI / 2) / 0.8; 
	var _2d = z; 
	_2a.push(_2b); 
	_2a["long"] = _2b; 
	_2a.push(phi); 
	_2a["lat"] = phi; 
	_2a.push(_2d); 
	_2a["alti"] = _2d; 
	return _2a; 
}; 
function GCISProjectionsManager() {
}
GCISProjectionsManager.prototype.createProjection = function(_2e, _2f) {
	if(!_2e) {
		return new GCISMercatorProjection(_2f); 
	}
	else {
		if(_2e == "mercator") {
			return new GCISMercatorProjection(_2f); 
		}
		else {
			if(_2e == "equirectangular") {
				return new GCISEquirectangularProjection(_2f); 
			}
			else {
				if(_2e == "miller") {
					return new GCISMillerProjection(_2f); 
				}
				else {
					return new GCISMercatorProjection(_2f); 
				}
			}
		}
	}
}; 
function decimalDegreeToRad(_1) {
	return Math.PI * _1 / 180; 
}
function radianToDecimalDegree(_2) {
	return _2 * 180 / Math.PI; 
}
GCISDynamicMap.prototype.getHTCtoRadian = function(_3, _4) {
	return this.projection.inverseProject(_3, _4, 0); 
}; 
GCISDynamicMap.prototype.getRadiantoHTC = function(_5, _6, _7) {
	return this.projection.project(_5, _6, _7); 
}; 
function GCISGraphicScale(_1, _2, _3, _4) {
	this.dynMap = _1; 
	this.initialx = _2; 
	this.initialy = _3; 
	this.posx = _2; 
	this.posy = _3; 
	this.metricsUiMeter = [1000, 1, 0.01, 0.001]; 
	this.metricsUiSymbol = ["km", "m", "cm", "mm"]; 
	this.isOnTheMap = true; 
	if(_4) {
		this.div = _4; 
		this.isOnTheMap = false; 
	}
	return this; 
}
GCISGraphicScale.prototype = new GCISAbstractLayer(); 
GCISGraphicScale.prototype.calcBarPositions = function(_5) {
	var h = (this.dynMap.window.innerHeight ? this.dynMap.window.innerHeight : this.dynMap.currentDoc.body.clientHeight); 
	var t = this.dynMap.browser.getElementTop(this.dynMap.mainDiv); 
	var w = (this.dynMap.window.innerWidth ? this.dynMap.window.innerWidth : this.dynMap.currentDoc.body.clientWidth); 
	var l = this.dynMap.browser.getElementLeft(this.dynMap.mainDiv); 
	if(this.initialx < 0) {
		var _a = this.dynMap.marginright ? this.dynMap.marginright : 0; 
		this.posx = w - l + this.initialx - parseInt(this.div.style.width) - _a + 1; 
	}
	if(this.initialy < 0) {
		var _b = this.dynMap.marginbottom ? this.dynMap.marginbottom : 0; 
		this.posy = h - t + this.initialy - parseInt(this.div.clientHeight) - _b + 1; 
	}
}; 
GCISGraphicScale.prototype.init = function(_c) {
	this.dynMap = _c; 
	if(this.isOnTheMap) {
		var _d = _c.createElt("div"); 
		_d.className = "mapScale"; 
		_c.getDiv().appendChild(_d); 
		this.div = _d; 
	}
	this.divLegend = _c.createElt("div"); 
	this.divLegend.className = "mapScaleLegend"; 
	this.div.appendChild(this.divLegend); 
	this.divText1 = _c.createElt("div"); 
	this.divText1.className = "mapScaleText1"; 
	this.div.appendChild(this.divText1); 
	this.divText2 = _c.createElt("div"); 
	this.divText2.className = "mapScaleText2"; 
	this.div.appendChild(this.divText2); 
	this.text1 = document.createTextNode("0"); 
	this.divText1.appendChild(this.text1); 
	this.text2 = document.createTextNode("0"); 
	this.divText2.appendChild(this.text2); 
}; 
GCISGraphicScale.prototype.remove = function(_e) {
	if(this.isOnTheMap) {
		this.div.parentNode.removeChild(this.div); 
	}
	else {
		this.clear(); 
	}
}; 
GCISGraphicScale.prototype.clear = function() {
	while(this.div.childNodes.length > 0) {
		this.div.removeChild(this.div.firstChild); 
	}
	this.divLegend = null; 
}; 
GCISGraphicScale.prototype.refresh = function(_f) {
	var _10 = 150; 
	var _11 = this.dynMap.calcMapX(0); 
	var _12 = this.dynMap.calcMapX(_10); 
	var _13 = Math.round((_12 - _11) * this.dynMap.precision); 
	this.computeBarMetrics(_10, _13); 
	if(this.divLegend) {
		if(this.divLegend.childNodes.length > 0) {
			for(var i = 0; i <= this.divLegend.childNodes.length; i++) {
				this.divLegend.removeChild(this.divLegend.childNodes[0]); 
			}
		}
	}
	this.drawBar(); 
}; 
GCISGraphicScale.prototype.computeBarMetrics = function(_15, _16) {
	var _17 = false; 
	for(var i = 0; i < 4 &&!_17; i++) {
		var _19 = 100000; 
		var _1a = this.metricsUiMeter[i]; 
		while((Math.round(_19) > 0) &&!_17) {
			var _1b = this.dynMap.calcPixelX(0); 
			var _1c = this.dynMap.calcPixelX(_19 * _1a / this.dynMap.precision); 
			var _1d = _1c - _1b; 
			if(_1d < _15) {
				_17 = true; 
				this.unitInfo = this.metricsUiMeter[i]; 
				this.uiSymbol = this.metricsUiSymbol[i]; 
				this.width = _1d; 
				this.distance = _19; 
			}
			else {
				_19 /= 10; 
			}
		}
	}
	var _1e = 1; 
	while(_1e < 5) {
		if((this.width * (_1e + 1)) < _15) {
			_1e++; 
		}
		else {
			break; 
		}
	}
	this.divisionCount = _1e; 
	this.width *= _1e; 
	this.distance *= _1e; 
	this.text2.nodeValue = this.distance + " " + this.uiSymbol; 
	this.divText2.style.left = this.width + "px"; 
}; 
GCISGraphicScale.prototype.drawBar = function() {
	if(this.divLegend) {
		this.div.removeChild(this.divLegend); 
	}
	this.divLegend = this.dynMap.createElt("div"); 
	this.divLegend.className = "mapScaleLegend"; 
	this.divLegend.style.width = this.width + "px"; 
	this.div.style.width = (this.width + this.divText2.clientWidth) + "px"; 
	if(this.isOnTheMap) {
		this.calcBarPositions(this.dynMap); 
		this.div.style.left = this.posx + "px"; 
		this.div.style.top = this.posy + "px"; 
	}
	this.div.appendChild(this.divLegend); 
	if(this.divisionCount == 1) {
		this.divisionCount = 5; 
	}
	for(var i = 0; i < this.divisionCount; i++) {
		var _20 = this.dynMap.createElt("div"); 
		_20.style.width = this.width / this.divisionCount + "px"; 
		_20.style.left = i * (this.width / this.divisionCount) + "px"; 
		if((i % 2) === 0) {
			_20.className = "mapScaleFullBlock"; 
		}
		else {
			_20.className = "mapScaleEmptyBlock"; 
		}
		this.divLegend.appendChild(_20); 
	}
}; 
function GCISScrollAnimator(dx, dy, _3) {
	this.dx = dx; 
	this.dy = dy; 
	this.curDx = 0; 
	this.curDy = 0; 
	this.totalTime = _3; 
	this.startTime = (new Date()).getTime(); 
	this.endTime = this.startTime + _3; 
	return this; 
}
GCISScrollAnimator.prototype = new GCISAbstractAnimator(); 
GCISScrollAnimator.prototype.start = function(_4) {
	this.dynMap = _4; 
	this.beginScrollX = _4.currentX; 
	this.beginScrollY = _4.currentY; 
}; 
GCISScrollAnimator.prototype.animate = function() {
	if(this.finished) {
		return; 
	}
	var _5 = (new Date()).getTime(); 
	if(_5 > this.endTime) {
		this.curDx = this.dx; 
		this.curDy = this.dy; 
		this.stop(); 
		return; 
	}
	var _6 = (_5 - this.startTime) / this.totalTime; 
	if(_6 > 1) {
		_6 = 1; 
	}
	var _7 = this.dx * _6; 
	var _8 = this.dy * _6; 
	this.dynMap.currentX = this.dynMap.calcMapDeltaX(this.beginScrollX, - _7); 
	this.dynMap.currentY = this.dynMap.calcMapDeltaY(this.beginScrollY, - _8); 
	this.dynMap.moveMap(_7, _8, false); 
	this.curDx = _7; 
	this.curDy = _8; 
}; 
GCISScrollAnimator.prototype.stop = function(_9) {
	this.finished = true; 
	this.dynMap.moveMap(this.curDx, this.curDy, true); 
	this.dynMap.currentX = this.dynMap.calcMapDeltaX(this.beginScrollX, - this.curDx); 
	this.dynMap.currentY = this.dynMap.calcMapDeltaY(this.beginScrollY, - this.curDy); 
}; 
GCISScrollAnimator.prototype.isFinished = function(_a) {
	return this.finished; 
}; 
GCISMoveMode.prototype.mouseDown = function(_1) {
	if(this.selectMode) {
		var _2 = new Date(); 
		b_deselect = 1; 
		b_pan = 0; 
	}
	if(this.dynMap.animator) {
		this.dynMap.stopAnimation(); 
	}
	this.resetOnTime = false; 
	this.dynMap.dragging = true; 
	this.beginDragCursorX = this.dynMap.browser.getXposition(_1); 
	this.beginDragCursorY = this.dynMap.browser.getYposition(_1); 
	this.beginDragX = this.dynMap.currentX; 
	this.beginDragY = this.dynMap.currentY; 
	currentMap = this.dynMap; 
	this.dynMap.currentDoc.onmousemove = function(_3) {
		if(currentMap && currentMap.mouseMode) {
			if(this.selectMode) {
				b_deselect = 0; 
			}
			if(currentMap.mouseMode.zoomMode != 0) {
				b_pan = 1; 
			}
			currentMap.mouseMode.mouseDrag(_3); 
		}
	}; 
	this.dynMap.currentDoc.onmouseup = function(_4) {
		if(currentMap.callbackAfterRefresh) {
			currentMap.callbackAfterRefresh(); 
		}
		if(currentMap && currentMap.mouseMode) {
			if(currentMap.mouseMode.selectMode) {
				if(this.resetOnTime) {
					var _5 = new Date(); 
					var _6 = _5 - _2; 
					if((_6 > 300) && (_6 < 1100)) {
						if(b_deselect) {
							currentMap.resetSelection(currentMap); 
							b_deselect = 0; 
						}
					}
				}
				if((currentMap.mouseMode.zoomMode > 0) &&!b_pan) {
					if(!_4) {
						_4 = window.event; 
					}
					var _7; 
					if(_4.which) {
						_7 = (_4.which === 3); 
					}
					else {
						if(_4.button) {
							_7 = (_4.button === 2); 
						}
					}
					if(_7) {
						currentMap.animateZoom(currentMap.scale + 1); 
					}
					else {
						currentMap.animateZoom(currentMap.scale - 1); 
					}
				}
			}
			currentMap.mouseMode.endDrag(_4); 
		}
	}; 
	this.dynMap.window.onmouseout = function(_8) {
		if(currentMap && currentMap.mouseMode) {
			currentMap.mouseMode.endDrag(_8); 
		}
	}; 
	this.dynMap.browser.cancelEvent(_1); 
}; 
GCISRasterLayer.prototype.setOpacity = function(_9) {
	if(_9 < 0) {
		_9 = 0; 
	}
	if(_9 > 100) {
		_9 = 100; 
	}
	var _a = this.opacity; 
	this.opacity = _9; 
	if(typeof(this.div.style.opacity) !== "undefined") {
		this.div.style.opacity = (_9 == 100) ? null : _9 / 100; 
	}
	else {
		if(typeof(this.div.style.MozOpacity) !== "undefined") {
			this.div.style.MozOpacity = (_9 == 100) ? null : _9 / 100; 
		}
		else {
			if(typeof(this.div.style.filter) !== "undefined") {
				this.div.style.filter = (_9 == 100) ? null : "alpha(opacity=" + _9 + ")"; 
			}
		}
	}
	if(_a === 0 && this.opacity !== 0) {
		this.setVisible(true); 
		this.refresh(); 
	}
	if(this.opacity === 0) {
		this.setVisible(false); 
	}
}; 
function GCISSheetLayer(_b) {
	this.dynMap = _b; 
	this.object = null; 
}
GCISSheetLayer.prototype = new GCISAbstractLayer(); 
GCISSheetLayer.prototype.init = function(_c) {
	var id = _c.id + "_sheet"; 
	this.dynMap = _c; 
	var _e = new Window(id, {
		className : "geoportail_bull", title : "", width : 350, height : 150, parent : _c.getMapDiv(), resizable : false, minimizable : false, maximizable : false, draggable : false, showEffect : Element.show, hideEffect : Element.hide}
	); 
	_e.setZIndex(1000); 
	Element.setStyle(_e.element, {
		textAlign : "center"}
	); 
	this.win = _e; 
	Windows.addObserver( {
		onHide : this.hide.bind(this)}
	); 
}; 
GCISSheetLayer.prototype.flush = function() {
	Event.stopObserving(this.win.element, "click", this.mousedown); 
	Windows.removeObserver( {
		onHide : this.hide.bind(this)}
	); 
	this.win.destroy(); 
	this.win = null; 
}; 
GCISSheetLayer.prototype.mousedown = function(_f) {
	Event.stop(_f); 
	return false; 
}; 
GCISSheetLayer.prototype.move = function(dx, dy, _12) {
	this.refresh(); 
}; 
GCISSheetLayer.prototype.refresh = function(_13) {
	var obj = this.object; 
	if(!obj) {
		if(this.win) {
			if(this.win.visible) {
				this.win.hide(); 
			}
		}
		this.hideEmprise(); 
		return; 
	}
	if(_13) {
		this.fillText(); 
	}
	this.posx = this.dynMap.calcPixelX(obj.mapx) + 2 + (obj.width ? obj.width : 0); 
	this.posy = this.dynMap.calcPixelY(obj.mapy) + 2; 
	var _15 = 0; 
	var vis = true; 
	if((obj.posx > this.dynMap.width + _15) || (obj.posx <=- _15) || (obj.posy > this.dynMap.height + _15) || (obj.posy <=- _15)) {
		vis = false; 
	}
	var _17 = this.dynMap.calcPixelX(obj.mapx) - _15; 
	var _18 = this.dynMap.calcPixelY(obj.mapy) + _15; 
	var _19 = this.win.getSize(); 
	_19.width += this.win.widthE + this.win.widthW; 
	_19.height += this.win.heightN + this.win.heightS; 
	var _1a = _17 + _19.width - this.dynMap.width + 3; 
	var _1b = _18 + _19.height - this.dynMap.height + 3; 
	if(_1a > 0) {
		this.posx -= _1a; 
	}
	if(_1b > 0) {
		this.posy -= _1b; 
	}
	if(vis) {
		this.win.setLocation(this.posy + _15, this.posx - _15); 
		if(!this.win.visible) {
			this.win.show(); 
		}
	}
	else {
		if(this.win.visible) {
			this.win.hide(); 
		}
		this.hideEmprise(); 
	}
}; 
GCISSheetLayer.prototype.fillText = function() {
	if(typeof(this.object.winHeight) != "undefined" && this.object.winHeight != "" && typeof(this.object.winWidth) != "undefined" && this.object.winWidth != "") {
		this.win.setSize(this.object.winWidth, this.object.winHeight); 
	}
	this.win.setHTMLContent(this.object.text); 
	if(this.object.POIversion2 != true) {
		var _1c = document.getElementsByTagName("link"); 
		var _1d = 0; 
		for(var i = 0; i < _1c.length; i++) {
			if(_1c[i].getAttribute("href") == this.object.fichierCSS) {
				_1d = i; 
			}
		}
		if(_1c.length - 1 != _1d) {
			var _1f = document.getElementsByTagName("head").item(0); 
			var _20 = _1c[_1d].cloneNode(false); 
			_1f.appendChild(_20); 
			_1f.removeChild(_1c[_1d]); 
		}
	}
	if(this.object.maxWidth != null && this.object.maxHeight != null) {
		this.win.heightN = 0; 
		this.win.heightS = 0; 
		this.win.setSize(this.object.maxWidth, this.object.maxHeight); 
	}
}; 
GCISSheetLayer.prototype.showObject = function(obj) {
	this.object = obj; 
	if(obj) {
		this.fillText(); 
	}
	this.refresh(); 
}; 
GCISSheetLayer.prototype.hide = function() {
	if(this.win) {
		this.win.setHTMLContent(""); 
	}
	this.object = null; 
	this.refresh(); 
}; 
GCISObjectLayer.prototype.create = function(div) {
	var _23 = this.objects.clone(); 
	var _24 = 0; 
	var _25 = ""; 
	var obj = null; 
	var _27 = _23.length; 
	var _28 = __poi.getObjectManager(); 
	var _29 = _28.htmlPoi.bind(_28); 
	var _2a = _28.getObjectImgId.bind(_28); 
	var _2b = this.dynMap.currentDoc; 
	div.update(); 
	for(_24 = 0; _24 < _27; _24++) {
		obj = _23[_24]; 
		var _2c = _2a(obj, _24); 
		new Insertion.Bottom(div, _29(obj, _24)); 
		obj.img = _2b.getElementById(_2c); 
		obj.div = _2b.getElementById(this.dynMap.id + "_objname_" + _24); 
		obj.img.map = this.dynMap; 
	}
	_28.eventPoi(obj, _24); 
	this.dirty = false; 
}; 
GCISDynamicMap.prototype.unloadSelectedObject = function() {
	var _2d = this.objectLayer.objects.length; 
	for(var i = 0; i < _2d; i++) {
		if(this.objectLayer.objects[i].selected) {
			this.objectLayer.objects[i].selected = 0; 
			this.objectLayer.objects[i].img.className = "mapobject"; 
		}
	}
}; 
GCISDynamicMap.prototype.showObjectSheet = function(_2f) {
	if(!_2f) {
		this.hideObjectSheet(); 
		return; 
	}
	var obj = this.objectLayer.findObject(_2f); 
	if(!obj) {
		return; 
	}
	if(!this.mouseMode.selectMode) {
		if(obj.POIversion2) {
			this.poiWindowLayer.showObject(obj); 
		}
		else {
			this.sheetLayer.showObject(obj); 
		}
	}
	else {
		if(!obj.selected ||!this.sheetLayer.win.visible) {
			this.hideObjectSheet(); 
			obj.selected = 1; 
			obj.img.className = "mapobjectselected"; 
			this.sheetLayer.showObject(obj); 
			this.hideObjectSheet(); 
			if(obj.POIversion2) {
				this.poiWindowLayer.showObject(obj); 
			}
			else {
				this.sheetLayer.showObject(obj); 
			}
		}
		else {
			obj.selected = 0; 
			obj.img.className = "mapobject"; 
			if(obj.POIversion2) {
			}
			else {
				this.hideObjectSheet(); 
			}
		}
	}
}; 
GCISDynamicMap.prototype.hideObjectSheet = function() {
	this.unloadSelectedObject(); 
	this.sheetLayer.hide(); 
	this.poiWindowLayer.hide(); 
}; 
GCISDynamicMap.prototype.clear = function(_31, _32) {
	var i; 
	var tmp = this.layers; 
	var _35 = tmp.length; 
	for(i = 0; i < _35; i++) {
		layer = tmp[i]; 
		this.removeLayer(layer.name, layer); 
	}
	this.layers = []; 
	this.rasterLayers = []; 
	if(_31) {
		this.objectLayer = new GCISObjectLayer(this); 
		this.addLayer("objects", this.objectLayer); 
		this.sheetLayer = new GCISSheetLayer(this); 
		this.addLayer("sheet", this.sheetLayer); 
		this.poiWindowLayer = new POIWindowLayer(); 
		this.addLayer("poiwindow", this.poiWindowLayer); 
	}
	if(_32) {
		this.sliderLayer = new GCISSlider(this); 
		this.addLayer("slider", this.sliderLayer); 
		this.sliderLayer.setMinimumScale(this.minScale); 
		this.sliderLayer.setMaximumScale(this.maxScale); 
	}
}; 
GCISDynamicMap.prototype.getFindLayersObjects = function(obj) {
	return this.layers.objects.findObject(obj); 
}; 
GCISDynamicMap.prototype.refreshObject = function() {
	this.objectLayer.refresh(); 
}; 
GCISDynamicMap.prototype.getSheetLayerWinElement = function() {
	return this.sheetLayer.win.element; 
}; 
GCISDynamicMap.prototype.getpixelXY = function(_37, _38) {
	if(!this.projection) {
		return null; 
	}
	var xpx = this.calcPixelX(_37); 
	var ypx = this.calcPixelY(_38); 
	var _3b = xpx; 
	var _3c = ypx; 
	return[_3b, _3c]; 
}; 
GCISSheetLayer.prototype.hideEmprise = function() {
	var _3d = document.getElementById("empriseEst"); 
	var _3e = document.getElementById("empriseSud"); 
	var _3f = document.getElementById("empriseOuest"); 
	var _40 = document.getElementById("empriseNord"); 
	if(_3d) {
		window.UnObtrusive.addClassNames(_3d, "invisible"); 
	}
	if(_3e) {
		window.UnObtrusive.addClassNames(_3e, "invisible"); 
	}
	if(_3f) {
		window.UnObtrusive.addClassNames(_3f, "invisible"); 
	}
	if(_40) {
		window.UnObtrusive.addClassNames(_40, "invisible"); 
	}
}; 
GCISObjectLayer.prototype.updateObject = function(obj, _42) {
	if(!obj.img) {
		return; 
	}
	obj.posx = this.dynMap.calcPixelX(obj.mapx); 
	obj.posy = this.dynMap.calcPixelY(obj.mapy); 
	var vis = true; 
	var _44 = this.dynMap.displayMargin; 
	if((obj.posx > this.dynMap.width + _44) || (obj.posx <=- _44) || (obj.posy > this.dynMap.height + _44) || (obj.posy <=- _44)) {
		vis = false; 
	}
	if(vis) {
		if(!obj.visible && obj.img) {
			obj.img.style.visibility = "visible"; 
			if(obj.div) {
				obj.div.style.visibility = "visible"; 
			}
			obj.visible = true; 
		}
		if(_42) {
			obj.img.innerHTML = obj.innerHTML; 
		}
		obj.img.style.left = (obj.posx + obj.deltaX) + "px"; 
		obj.img.style.top = (obj.posy + obj.deltaY) + "px"; 
		if(obj.div) {
			obj.div.style.left = (obj.posx + 8) + "px"; 
			obj.div.style.top = (obj.posy - 32) + "px"; 
		}
	}
	else {
		if(obj.visible) {
			obj.img.style.visibility = "hidden"; 
			if(obj.div) {
				obj.div.style.visibility = "hidden"; 
			}
			obj.visible = false; 
		}
	}
}; 
function GCISVectorLayer() {
	this.name = name; 
	this.visible = true; 
	this.elements = []; 
	this.posx = 0; 
	this.posy = 0; 
	this.mapx = 0; 
	this.mapy = 0; 
	this.width = 0; 
	this.height = 0; 
}
GCISVectorLayer.prototype = new GCISAbstractLayer(); 
GCISVectorLayer.prototype.init = function(_1) {
	this.dynMap = _1; 
	this.div = _1.createElt("div"); 
	this.div.id = this.name; 
	this.div.style.position = "absolute"; 
	this.div.style.left = "0px"; 
	this.div.style.top = "0px"; 
	this.div.style.zIndex = 1; 
	this.div.style.width = this.dynMap.width + "px"; 
	this.div.style.height = this.dynMap.height + "px"; 
	this.dynMap.getMapDiv().appendChild(this.div); 
	this.graphics = new createGCISGraphic(_1.currentDoc, this.div); 
}; 
GCISVectorLayer.prototype.move = function(dx, dy, _4) {
	this.refresh(); 
}; 
GCISVectorLayer.prototype.refresh = function(_5) {
	if(this.graphics) {
		this.graphics.setSize(this.dynMap.width, this.dynMap.height); 
		this.graphics.clear(); 
		var i; 
		for(i = 0; i < this.elements.length; i++) {
			this.elements[i].draw(this.graphics, this.dynMap); 
		}
	}
}; 
GCISVectorLayer.prototype.remove = function() {
	if(this.div) {
		this.div.parentNode.removeChild(this.div); 
	}
}; 
GCISVectorLayer.prototype.calcBounds = function() {
	if(this.elements.length > 0) {
		var _7 = this.elements[0].mapx1; 
		var _8 = this.elements[0].mapx2; 
		var _9 = this.elements[0].mapy1; 
		var _a = this.elements[0].mapy2; 
		var i; 
		for(i = 1; i < this.elements.length; i++) {
			var p = this.elements[i]; 
			if(p.mapx < _7) {
				_7 = p.mapx; 
			}
			if(p.mapx > _8) {
				_8 = p.mapx; 
			}
			if(p.mapy < _9) {
				_9 = p.mapy; 
			}
			if(p.mapy > _a) {
				_a = p.mapy; 
			}
		}
		this.mapx1 = _7; 
		this.mapx2 = _8; 
		this.mapy1 = _9; 
		this.mapy2 = _a; 
	}
	else {
		this.mapx1 = 0; 
		this.mapx2 = 0; 
		this.mapy1 = 0; 
		this.mapy2 = 0; 
	}
}; 
GCISVectorLayer.prototype.update = function() {
	this.refresh(); 
}; 
GCISVectorLayer.prototype.move = function(dx, dy, _f) {
	this.update(); 
}; 
GCISVectorLayer.prototype.addElement = function(_10) {
	this.elements.push(_10); 
	this.dirty = true; 
}; 
GCISVectorLayer.prototype.deleteAllElements = function() {
	this.elements = []; 
	this.dirty = true; 
}; 
GCISVectorLayer.prototype.getElement = function(ind) {
	return this.elements[ind]; 
}; 
GCISVectorLayer.prototype.getNbElements = function() {
	return this.elements.length; 
}; 
GCISVectorLayer.prototype.createLine = function(_12, _13, w, col, _16) {
	return new GCISLine(_12, _13, w, col, _16); 
}; 
GCISVectorLayer.prototype.createPolygon = function(_17, _18, _19, w, col, _1c) {
	return new GCISPolygon(_17, _18, _19, w, col, _1c); 
}; 
GCISVectorLayer.prototype.zoomOnElement = function(obj) {
	if(!obj) {
		return; 
	}
	var _1e; 
	if(this.dynMap) {
		_1e = new GCISRect(0, 0, 0, 0); 
		obj.getBounds(_1e); 
		this.dynMap.centerOnRect(_1e.mapx1, _1e.mapy1, _1e.mapx2, _1e.mapy2, false); 
	}
}; 
function GCISStyle() {
}
GCISStyle.prototype.setFillColor = function(red, _20, _21) {
	this.fillRed = red; 
	this.fillGreen = _20; 
	this.fillBlue = _21; 
}; 
GCISStyle.prototype.setOpacity = function(op) {
	this.opacity = op; 
}; 
GCISStyle.prototype.setStrokeColor = function(red, _24, _25) {
	this.strokeRed = red; 
	this.strokeGreen = _24; 
	this.strokeBlue = _25; 
}; 
GCISStyle.prototype.setStrokeWidth = function(w) {
	this.strokeWidth = w; 
}; 
function GCISGraphicElement() {
}
GCISGraphicElement.prototype.draw = function(_27, map) {
}; 
GCISGraphicElement.prototype.getWkt = function() {
}; 
GCISGraphicElement.prototype.setWkt = function(txt) {
}; 
GCISGraphicElement.prototype.getBounds = function(_2a) {
	_2a.mapx1 = _2a.mapx2 = _2a.mapy1 = _2a.mapy2 = 0; 
}; 
function GCISPoint(_2b, _2c, _2d, _2e, col, _30) {
	this.mapx = _2b; 
	this.mapy = _2c; 
	this.symbol = _2d; 
	this.size = _2e; 
	this.col = col; 
	this.opacity = _30; 
}
GCISPoint.prototype = new GCISGraphicElement(); 
GCISPoint.prototype.draw = function(_31, map) {
}; 
GCISPoint.prototype.getWkt = function() {
}; 
GCISPoint.prototype.setWkt = function(txt) {
}; 
GCISPoint.prototype.getPointsX = function() {
	return this.mapx; 
}; 
GCISPoint.prototype.getPointsY = function() {
	return this.mapy; 
}; 
GCISPoint.prototype.getBounds = function(_34) {
	_34.mapx1 = _34.mapx2 = this.mapx; 
	_34.mapx1 = _34.mapx2 = this.mapy; 
}; 
function GCISLine(_35, _36, _37, col, _39) {
	this.graphicType = 2; 
	this.xPoints = _35; 
	this.yPoints = _36; 
	this.lineWidth = _37; 
	this.lineColor = col; 
	this.lineOpacity = _39; 
}
GCISLine.prototype = new GCISGraphicElement(); 
GCISLine.prototype.getBounds = function(_3a) {
	if(!this.xPoints.length) {
		_3a.mapx1 = _3a.mapx2 = _3a.mapy1 = _3a.mapy2 = 0; 
		return; 
	}
	var _3b = this.xPoints[0]; 
	var _3c = _3b; 
	var _3d = this.yPoints[0]; 
	var _3e = _3d; 
	var i, x, y; 
	for(i = 1; i < this.xPoints.length; i++) {
		x = this.xPoints[i]; 
		y = this.yPoints[i]; 
		if(x < _3b) {
			_3b = x; 
		}
		if(x > _3c) {
			_3c = x; 
		}
		if(y < _3d) {
			_3d = y; 
		}
		if(y > _3e) {
			_3e = y; 
		}
	}
	_3a.mapx1 = _3b; 
	_3a.mapx2 = _3c; 
	_3a.mapy1 = _3d; 
	_3a.mapy2 = _3e; 
}; 
GCISLine.prototype.draw = function(_42, map) {
	_42.setLineColor(this.lineColor); 
	_42.setLineWidth(this.lineWidth); 
	_42.setOpacity(this.lineOpacity); 
	var _44 = []; 
	var _45 = []; 
	var x1 = map.calcPixelX(this.xPoints[0]); 
	var y1 = map.calcPixelY(this.yPoints[0]); 
	if(this.xPoints.length == 1) {
		if(_42.intersectPoint(x1, y1)) {
			_44.push(x1, x1 + this.lineWidth); 
			_45.push(y1, y1); 
			_42.drawPolyline(_44, _45); 
		}
		return; 
	}
	var i, x2, y2, _4b, _4c, _4d, _4e, _4f; 
	for(i = 1; i < this.xPoints.length; i++) {
		x2 = map.calcPixelX(this.xPoints[i]); 
		y2 = map.calcPixelY(this.yPoints[i]); 
		if(_42.intersectLine(x1, y1, x2, y2)) {
			_4b = _42.clipper.clipLine(x1, y1, x2, y2); 
			if(_4b) {
				_4c = _4b[0]; 
				_4d = _4b[1]; 
				_4e = _4b[2]; 
				_4f = _4b[3]; 
				if((_4c !== x1) || (_4d !== y1) || (_4e !== x2) || (_4f !== y2)) {
					if(!_44.length) {
						_44.push(_4c); 
						_45.push(_4d); 
					}
					_44.push(_4e); 
					_45.push(_4f); 
					_42.drawPolyline(_44, _45); 
					_44 = []; 
					_45 = []; 
				}
				else {
					if(!_44.length) {
						_44.push(x1); 
						_45.push(y1); 
					}
					_44.push(x2); 
					_45.push(y2); 
				}
			}
		}
		else {
			if(_44.length > 0) {
				_42.drawPolyline(_44, _45); 
			}
			_44 = []; 
			_45 = []; 
		}
		x1 = x2; 
		y1 = y2; 
	}
	if(_44.length) {
		_42.drawPolyline(_44, _45); 
	}
}; 
GCISLine.prototype.toString = function(x, y) {
	return"Line \nx=" + this.xPoints + "\ny=" + this.yPoints + "\nwidth=" + this.lineWidth + "\ncolor=" + this.lineColor; 
}; 
GCISLine.prototype.getPointsY = function() {
	return this.yPoints; 
}; 
GCISLine.prototype.getPointsX = function() {
	return this.xPoints; 
}; 
GCISLine.prototype.getWktBegin = function() {
	return"LINESTRING("; 
}; 
GCISLine.prototype.getWktEnd = function() {
	return")"; 
}; 
GCISLine.prototype.getWkt = function() {
	var res = this.getWktBegin(); 
	res += this.getWktPoints(this.xPoints, this.yPoints, false); 
	res += this.getWktEnd(); 
	return res; 
}; 
GCISLine.prototype.getWktPoints = function(_53, _54, _55) {
	var res = ""; 
	var i, x, y; 
	for(i = 0; i < this.xPoints.length; i++) {
		if(i > 0) {
			res += ","; 
		}
		x = this.xPoints[i]; 
		y = this.yPoints[i]; 
		res += x + " " + y; 
	}
	if(_55 && (_53[0] != x || _54[0] != y)) {
		res += "," + _53[0] + " " + _54[0]; 
	}
	return res; 
}; 
GCISLine.prototype.setWkt = function(txt) {
	var _5b = this.getWktBegin(); 
	var end = ")"; 
	var ind = txt.indexOf(_5b, 0); 
	if(ind < 0) {
		alert("Not valid wkt"); 
		return; 
	}
	ind += _5b.length; 
	this.xPoints = []; 
	this.yPoints = []; 
	var _5e, _5f; 
	while(ind > 0 && ind < txt.length - 1) {
		_5e = txt.indexOf(",", ind); 
		if(_5e < 0) {
			_5e = txt.indexOf(")", ind); 
		}
		if(_5e < 0) {
			alert("Not valid wkt"); 
			return; 
		}
		_5f = txt.indexOf(" ", ind); 
		this.xPoints.push(parseFloat(txt.substring(ind, _5f))); 
		this.yPoints.push(parseFloat(txt.substring(_5f + 1, _5e))); 
		ind = _5e + 1; 
	}
	return true; 
}; 
GCISLine.prototype.addPoint = function(x, y) {
	this.xPoints.push(x); 
	this.yPoints.push(y); 
}; 
GCISLine.prototype.deleteLastPoint = function() {
	this.xPoints.pop(); 
	this.yPoints.pop(); 
}; 
function GCISRect(_62, _63, _64, _65, _66, _67, _68, _69, _6a) {
	this.mapx1 = _62; 
	this.mapx2 = _63; 
	this.mapy1 = _64; 
	this.mapy2 = _65; 
	this.xPoints = []; 
	this.yPoints = []; 
	this.xPoints.push(_62); 
	this.xPoints.push(_63); 
	this.yPoints.push(_64); 
	this.yPoints.push(_65); 
	this.fillColor = _66; 
	this.lineWidth = _67; 
	this.lineColor = _68; 
	this.opacity = _69; 
	this.filled = _6a; 
}
GCISRect.prototype = new GCISLine(); 
GCISRect.prototype.draw = function(_6b, map) {
	_6b.setLineColor(this.lineColor); 
	_6b.setLineWidth(this.lineWidth); 
	_6b.setOpacity(this.opacity); 
	_6b.setFillColor(this.fillColor); 
	var x1 = map.calcPixelX(this.mapx1); 
	var y1 = map.calcPixelY(this.mapy1); 
	var w1 = map.calcPixelX(this.mapx2) - x1; 
	var h1 = map.calcPixelY(this.mapy2) - y1; 
	_6b.drawRect(x1, y1, w1, h1, this.filled); 
}; 
function GCISPolygon(_71, _72, _73, _74, _75, _76) {
	this.graphicType = 2; 
	this.xPoints = _71; 
	this.yPoints = _72; 
	this.fillColor = _73; 
	this.lineWidth = _74; 
	this.lineColor = _75; 
	this.opacity = _76; 
	var _77 = _71[0]; 
	var _78 = _77; 
	var _79 = _72[0]; 
	var _7a = _79; 
	var i, x, y; 
	for(i = 1; i < _71.length; i++) {
		x = _71[i]; 
		y = _72[i]; 
		if(x < _77) {
			_77 = x; 
		}
		if(x > _78) {
			_78 = x; 
		}
		if(y < _79) {
			_79 = y; 
		}
		if(y > _7a) {
			_7a = y; 
		}
	}
	this.mapx1 = _77; 
	this.mapx2 = _78; 
	this.mapy1 = _79; 
	this.mapy2 = _7a; 
}
GCISPolygon.prototype = new GCISLine(); 
GCISPolygon.prototype.getWktBegin = function() {
	return"POLYGON(("; 
}; 
GCISPolygon.prototype.getWktEnd = function() {
	return"))"; 
}; 
GCISPolygon.prototype.getWkt = function() {
	var res = this.getWktBegin(); 
	res += this.getWktPoints(this.xPoints, this.yPoints, true); 
	res += this.getWktEnd(); 
	return res; 
}; 
GCISPolygon.prototype.draw = function(_7f, map) {
	_7f.setLineColor(this.lineColor); 
	_7f.setLineWidth(this.lineWidth); 
	_7f.setOpacity(this.opacity); 
	_7f.setFillColor(this.fillColor); 
	var _81 = []; 
	var _82 = []; 
	var x1 = map.calcPixelX(this.xPoints[0]); 
	var y1 = map.calcPixelY(this.yPoints[0]); 
	if(this.xPoints.length == 1) {
		if(_7f.intersectPoint(x1, y1)) {
			_81.push(x1, x1 + this.lineWidth); 
			_82.push(y1, y1); 
			_7f.drawPolyline(_81, _82); 
		}
		return; 
	}
	var i, x2, y2; 
	for(i = 1; i < this.xPoints.length; i++) {
		x2 = map.calcPixelX(this.xPoints[i]); 
		y2 = map.calcPixelY(this.yPoints[i]); 
		if(_7f.intersectLine(x1, y1, x2, y2)) {
			if(!_81.length) {
				_81.push(x1); 
				_82.push(y1); 
			}
			_81.push(x2); 
			_82.push(y2); 
		}
		else {
			if(_81.length > 0) {
				_7f.drawPolyline(_81, _82); 
			}
			_81 = []; 
			_82 = []; 
		}
		x1 = x2; 
		y1 = y2; 
	}
	if(_81.length) {
		_7f.drawPolygon(_81, _82, true); 
	}
}; 
function GCISCircle(x, y, _8a, _8b, _8c, _8d, _8e, _8f, _90, _91, _92) {
	this.graphicType = 2; 
	this.xPoints = []; 
	this.yPoints = []; 
	this.xPoints.push(x); 
	this.yPoints.push(y); 
	this.radius = _8a; 
	this.startAngle = _8b; 
	this.endAngle = _8c; 
	this.anticlockwise = _8d; 
	this.fillColor = _8e; 
	this.lineWidth = _8f; 
	this.lineColor = _90; 
	this.opacity = _91; 
	this.filled = _92; 
	this.kind = "circle"; 
}
GCISCircle.prototype = new GCISLine(); 
GCISCircle.prototype.draw = function(_93, map) {
	_93.setLineColor(this.lineColor); 
	_93.setLineWidth(this.lineWidth); 
	_93.setOpacity(this.opacity); 
	_93.setFillColor(this.fillColor); 
	var x1 = map.calcPixelX(this.xPoints[0]); 
	var y1 = map.calcPixelY(this.yPoints[0]); 
	var rad = map.calcPixelX(this.radius) - map.calcPixelX(0); 
	_93.drawCircle(x1, y1, rad, this.startAngle, this.endAngle, this.anticlockwise, this.filled); 
}; 
GCISCircle.prototype.getWkt = function() {
}; 
GCISCircle.prototype.getRadius = function() {
	return this.radius; 
}; 
var initEventSelection = false; 
function GCISDynamicLayer(_1, _2, _3, _4, _5) {
	this.name = _1; 
	this.dynMap = _2; 
	this.mapName = _3; 
	this.tabName = _4; 
	this.layerImage = null; 
	this.div = null; 
	this.zindex = _5; 
	this.recenterCallBack = Prototype.emptyFunction; 
	this.layerImageLoadHandler = function(_6) {
		if(this.layer.allowLoadingImages) {
			this.layer.layerImage.src = this.src; 
			this.layer.layerImage.layer = this.layer; 
			$(this.layer.layerImage).observe("load", function(_7) {
				if(this.layer.allowLoadingImages) {
					this.layer.div.style.visibility = "visible"; this.layer.divMovable.style.visibility = "hidden"; this.layer.divMovableImage.src = this.src; this.layer.divMovable.style.left = "0px"; this.layer.divMovable.style.top = "0px"; this.layer.loadIsComplete = true; this.layer.isRecuperationSelectionDone = true; }
				else {
					Event.stop(_7); }
			}
			.bindAsEventListener(this)); 
		}
		else {
			Event.stop(_6); 
		}
	}; 
}
GCISDynamicLayer.prototype = new GCISAbstractLayer(); 
GCISDynamicLayer.prototype.move = function(dx, dy, _a) {
	this.allowLoadingImages = _a; 
	if((!this.loadIsComplete |!this.isRecuperationSelectionDone) && this.lastMovableLeft && this.lastMovableTop) {
		this.tempImage.onload = null; 
		this.divMovable.style.left = (this.lastMovableLeft + dx) + "px"; 
		this.divMovable.style.top = (this.lastMovableTop + dy) + "px"; 
	}
	else {
		this.divMovable.style.visibility = "visible"; 
		this.divMovable.style.left = dx + "px"; 
		this.divMovable.style.top = dy + "px"; 
		this.div.style.visibility = "hidden"; 
	}
	if(_a) {
		this.lastMovableLeft = parseInt(this.divMovable.style.left); 
		this.lastMovableTop = parseInt(this.divMovable.style.top); 
	}
}; 
GCISDynamicLayer.prototype.correctLayerImageIEStyle = function() {
	var _b = navigator.userAgent; 
	if(_b.indexOf("MSIE 6") ==- 1) {
		this.layerImage.src = this.dynMap.defaultImg; 
		this.layerImage.style.border = "none"; 
		this.layerImage.width = this.dynMap.width; 
		this.layerImage.height = this.dynMap.height; 
	}
}; 
GCISDynamicLayer.prototype.init = function(_c) {
	this.dynMap = _c; 
	if($("dynLayer")) {
		var _d = document.getElementById("dynLayer"); 
	}
	else {
		var _d = _c.createElt("div"); 
		_d.id = "dynLayer"; 
	}
	_d.style.width = "100%"; 
	_d.style.height = "100%"; 
	_d.style.position = "absolute"; 
	_d.style.left = "0px"; 
	_d.style.top = "0px"; 
	_d.style.zIndex = this.zindex; 
	_c.getMapDiv().appendChild(_d); 
	if($("dynLayerImage")) {
		this.layerImage = $("dynLayerImage"); 
	}
	else {
		this.layerImage = this.dynMap.createElt("img"); 
		this.layerImage.id = "dynLayerImage"; 
		_d.appendChild(this.layerImage); 
		this.correctLayerImageIEStyle(); 
	}
	this.correctLayerImageIEStyle(); 
	this.lastX = this.dynMap.currentX; 
	this.lastY = this.dynMap.currentY; 
	this.lastScale = this.dynMap.scale; 
	this.div = _d; 
	this.div.dynMap = this.dynMap; 
	this.divMovable = _c.createElt("div"); 
	this.divMovable.id = "dynLayerMovable"; 
	this.divMovable.style.width = "100%"; 
	this.divMovable.style.height = "100%"; 
	this.divMovable.style.position = "absolute"; 
	this.divMovable.style.left = "0px"; 
	this.divMovable.style.top = "0px"; 
	this.divMovable.style.zIndex = this.zindex; 
	_c.getMapDiv().appendChild(this.divMovable); 
	this.divMovable.style.visibility = "hidden"; 
	this.divMovableImage = this.dynMap.createElt("img"); 
	this.divMovableImage.src = this.dynMap.defaultImg; 
	this.divMovableImage.style.border = "none"; 
	this.divMovableImage.width = this.dynMap.width; 
	this.divMovableImage.height = this.dynMap.height; 
	this.divMovable.appendChild(this.divMovableImage); 
	this.allowLoadingImages = true; 
	this.loadIsComplete = true; 
	this.isRecuperationSelectionDone = true; 
}; 
GCISDynamicLayer.prototype.correctAlphaIE = function(_e) {
	var _f = $("dynLayerImage"); 
	imgID = (_f.id) ? "id='" + _f.id + "' " : ""; 
	imgClass = (_f.className) ? "class='" + _f.className + "' " : ""; 
	imgTitle = (_f.title) ? "title='" + _f.title + "' " : "title='" + _f.alt + "' "; 
	if(this.layerImage.align == "left") {
		imgStyle["float"] = "left"; 
	}
	else {
		if(this.layerImage.align == "right") {
			imgStyle["float"] = "right"; 
		}
	}
	$(this.layerImage).setStyle(imgStyle); 
	strNewHTML = "<img " + imgID + imgClass + imgTitle + "style=\"width:" + _f.width + "px;height:" + _f.height + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + _f.src + "', sizingMethod='scale');\"></img>"; 
	_f.outerHTML = strNewHTML; 
	this.layerImage = _f; 
}; 
GCISDynamicLayer.prototype.refresh = function(_10) {
	var _11 = this.dynMap.currentX; 
	var _12 = this.dynMap.currentY; 
	if((!_10) && (this.lastX == _11) && (this.lastY == _12) && (this.lastScale == this.dynMap.scale)) {
		return; 
	}
	this.recenter(); 
}; 
GCISDynamicLayer.prototype.onRecenter = function(_13) {
	this.recenterCallBack = _13; 
}; 
GCISDynamicLayer.prototype.recenter = function() {
	var _14 = this.dynMap.currentX; 
	var _15 = this.dynMap.currentY; 
	this.lastX = _14; 
	this.lastY = _15; 
	this.lastScale = this.dynMap.scale; 
	this.tempImage = this.dynMap.createElt("img"); 
	this.tempImage.onload = function() {
		if(this.layer.allowLoadingImages) {
			this.layer.layerImage.layer = this.layer; 
			this.layer.layerImage.onload = function() {
				if(this.layer.allowLoadingImages) {
					this.layer.div.style.visibility = "visible"; 
					this.layer.divMovable.style.visibility = "hidden"; 
					this.layer.divMovableImage.src = this.src; 
					this.layer.divMovable.style.left = "0px"; 
					this.layer.divMovable.style.top = "0px"; 
					this.layer.loadIsComplete = true; 
					this.layer.isRecuperationSelectionDone = true; 
				}
			}; 
			this.layer.layerImage.src = this.src; 
		}
	}; 
	this.tempImage.layer = this; 
	this.recenterCallBack(this.tempImage, _14, _15); 
	this.loadIsComplete = false; 
}; 
GCISDynamicLayer.prototype.endMove = function() {
	this.refresh(true); 
}; 
GCISDynamicLayer.prototype.setScale = function(_16) {
	this.div.style.visibility = "hidden"; 
}; 
__liste = new Array; 
function GCISWorldVisibility(_1, _2, _3) {
	this.name = _1; 
	this.carte = _2; 
	this.dynMap = _2.dynMap; 
	this.XY = []; 
	this.couches = []; 
	this.projection = _3; 
}
GCISWorldVisibility.prototype = new GCISAbstractScaleListener(); 
GCISWorldVisibility.prototype.onMinimumScaleChange = function(_4) {
	var _5 = this.carte.gestionnaire.themesUtilises; 
	for(var _6 in _5) {
		if(typeof(_5[_6]) !== "function") {
			theme = _5[_6]; 
			for(var i = 0; i < theme["couches"].length; i++) {
				if(__gestionnaire.getVisibilite(theme["couches"][i])) {
					__liste[theme["couches"][i]] = "true"; 
				}
				else {
					__liste[theme["couches"][i]] = "false"; 
				}
			}
		}
	}
	var XY = this.dynMap.getProjection().inverseProject(this.dynMap.currentX, this.dynMap.currentY, 0); 
	var _9 = __searchTerritoryByCoord(XY[0], XY[1], __idCarte, this.dynMap); 
	var _a = __getTerritoireById(_9[0]); 
	__getCarteById(__idCarte).client.mapSetProjection(_a.projection[0], _a.projection[1]); 
	this.XY = this.dynMap.getProjection().project(XY[0], XY[1], 0); 
	terCourant = __getTerritoireById(__territoire); 
	__getCarteById(__idCarte).client.mapSetProjection(terCourant.projection[0], terCourant.projection[1]); 
	var _b = __carte.client.mapClientToDegree(this.XY[0], this.XY[1]); 
	if(__getTerritoireById(_9[0]).coordInTerritory(_b[0], _b[1])) {
		this.chgtTerritoire(_9[0], _4); 
	}
	else {
		__carte.client.popupredirectTerritory(this, _9, _4); 
	}
}; 
GCISWorldVisibility.prototype.chgtTerritoire = function(_c, _d) {
	this.dynMap.minScale = __getTerritoireById("monde").minscale; 
	this.carte.outil.changeTerritoire("wc2D", _c, false, function(_e) {
		var _f = _e[0].split(","); _f[0] = parseInt(_f[0]); _f[1] = parseInt(_f[1]); __carte.client.getMap().center(_f[0], _f[1], true); var _10 = __liste; var _11 = __gestionnaire.getThemesObjects(); for(var it = 0; it < _11.length; it++) {
			var _13 = false; var _14 = _11[it].id; for(var _15 in this.themesUtilises) {
				if(typeof(this.themesUtilises[_15]) !== "function") {
					theme = this.themesUtilises[_15]; for(var i = 0; i < theme["couches"].length; i++) {
						if(_10[theme["couches"][i]] == "true" &&!__gestionnaire.getVisibilite(theme["couches"][i])) {
							var _17 = document.getElementById(_14 + "Couche" + theme["couches"][i] + "ImageCheck"); if(_17) {
								__gestionnaire.changeSelectionCoucheOpacifiable("Theme" + theme["id"], theme["couches"][i]); _17.alt = "checked"; _17.src = __gestionnaire.imagesPath + "checkOne.gif"; if(_11[it].style.display != "block") {
									_13 = true; }
							}
						}
					}
				}
			}
			if(_13) {
				__gestionnaire.changeDeveloppementTheme(_14.substr(__gestionnaire.idGestionnaire.length + 1), "niv1"); }
		}
		var _18 = 0; for(var ic = __gestionnaire.profondeurMin; ic < __gestionnaire.idCouchesDisponibles.length; ic++) {
			var _1a = __gestionnaire.idCouchesDisponibles[ic].idCouche; var _1b = __gestionnaire.client.mapGetLayer(_1a); var _1c = __gestionnaire.client.mapGetLayerVisibility(_1b); if(_1c && _1b.maxscale > _18) {
				_18 = _1b.maxscale; }
		}
		_18 = Math.min(_18, _d); __carte.client.mapSetScale(_18, true); }
	, this.XY, this.couches); 
}; 
GCISWorldVisibility.prototype.onMaximumScaleChange = function(_1d) {
	var _1e = 0; 
	for(var ic = __gestionnaire.profondeurMin; ic < __gestionnaire.idCouchesDisponibles.length; ic++) {
		var _20 = __gestionnaire.idCouchesDisponibles[ic].idCouche; 
		var _21 = __gestionnaire.client.mapGetLayer(_20); 
		if(typeof(_21) != "undefined" && _21 != null) {
			if(_21.maxscale > _1e) {
				_1e = _21.maxscale; 
			}
		}
	}
	if(_1d <= _1e) {
		return; 
	}
	this.dynMap.maxScale = __getTerritoireById("monde").maxscale; 
	var _22 = this.carte.gestionnaire.themesUtilises; 
	for(var _23 in _22) {
		if(typeof(_22[_23]) !== "function") {
			theme = _22[_23]; 
			for(var i = 0; i < theme["couches"].length; i++) {
				if(__gestionnaire.getVisibilite(theme["couches"][i])) {
					__liste[theme["couches"][i]] = "true"; 
				}
				else {
					__liste[theme["couches"][i]] = "false"; 
				}
			}
		}
	}
	this.recenterMap(this.carte.dynMap.getProjection(), this.projection); 
	var _25 = Math.max(__getTerritoireById("monde").minScale, _1d); 
	this.carte.outil.changeTerritoire("wc2D", "monde", false, function(_26) {
		var _27 = _26[0].split(","); _27[0] = parseInt(_27[0]); _27[1] = parseInt(_27[1]); __carte.client.getMap().center(_27[0], _27[1], true); __carte.client.mapSetScale(_25, true); var _28 = __liste; var _29 = __gestionnaire.getThemesObjects(); for(var it = 0; it < _29.length; it++) {
			var _2b = false; var _2c = _29[it].id; for(var _2d in this.themesUtilises) {
				if(typeof(this.themesUtilises[_2d]) !== "function") {
					theme = this.themesUtilises[_2d]; for(var i = 0; i < theme["couches"].length; i++) {
						if(_28[theme["couches"][i]] == "true" &&!__gestionnaire.getVisibilite(theme["couches"][i])) {
							var _2f = document.getElementById(_2c + "Couche" + theme["couches"][i] + "ImageCheck"); if(_2f) {
								__gestionnaire.changeSelectionCoucheOpacifiable("Theme" + theme["id"], theme["couches"][i]); _2f.alt = "checked"; _2f.src = __gestionnaire.imagesPath + "checkOne.gif"; if(_29[it].style.display != "block") {
									_2b = true; }
							}
						}
					}
				}
			}
			if(_2b) {
				__gestionnaire.changeDeveloppementTheme(_2c.substr(__gestionnaire.idGestionnaire.length + 1), "niv1"); }
		}
	}
	, this.XY, this.couches); 
}; 
GCISWorldVisibility.prototype.recenterMap = function(_30, _31) {
	var x = this.carte.dynMap.currentX * this.carte.dynMap.precision; 
	var y = this.carte.dynMap.currentY * this.carte.dynMap.precision; 
	var _34 = _30.inverseProject(x, y, 0); 
	var _35 = _34[0]; 
	var _36 = _34[1]; 
	var _37 = _31.project(_35, _36, 0); 
	this.XY[0] = _37[0]; 
	this.XY[1] = _37[1]; 
}; 
GCISWorldVisibility.prototype.removeAllRasterLayers = function() {
	var i, _39; 
	var _3a = this.dynMap.rasterLayers; 
	for(i = 0; i < _3a.length; i++) {
		_39 = _3a[i]; 
		this.dynMap.removeRasterLayer(_39.name); 
	}
	_3a = null; 
	this.dynMap.rasterLayers = []; 
}; 
GCISWorldVisibility.prototype.setMapParameters = function(_3b, _3c, _3d, _3e) {
	this.dynMap.mapName = _3b; 
	this.dynMap.precision = _3c; 
	this.dynMap.limits = _3d; 
	this.dynMap.ratios = _3e; 
	this.dynMap.initRatios(); 
}; 
GCISWorldVisibility.prototype.setGlobalViewParameters = function(_3f, tab, _41, _42, _43) {
	var _44 = this.dynMap.getLayer("globalView"); 
	if(_44) {
		_44.mapName = _3f; 
		_44.tabName = tab; 
		_44.format = _41; 
		_44.zooms = _42; 
		_44.scales = _43; 
		_44.firstRefreshDone = false; 
	}
}; 
GCISWorldVisibility.prototype.setScaleValues = function(min, max, _47) {
	this.dynMap.setMinimumScale(min); 
	this.dynMap.setMaximumScale(max); 
	this.dynMap.setScale(_47); 
	this.dynMap.refresh(); 
	var _48 = this.dynMap.getLayer("globalView"); 
	if(_48) {
		_48.positionRect(); 
	}
}; 
function DynMapCreateWorldVisibility(map, _4a, _4b, _4c, _4d, _4e, lim, _50, _51, _52, _53, tw, th, _56, _57, _58) {
	return new GCISWorldVisibility(_4a, map, _4b, _4c, _4d, _4e, lim, _50, _51, _52, _53, tw, th, _56, _57, _58); 
}
function ObjectManager(_1) {
	this.carte = _1; 
	this.scriptMap = new Array(); 
	this.scriptMapMaxSize = 400; 
	this.scriptMapCurrentIndex = 0; 
	this.debugLevel = 0; 
	this.poiServer = SERVEURPOI; 
	this.layerReference = null; 
	this.selectedPoiLayers = new Array(); 
	this.selectedPoiLayersDimensions = new Array(); 
	this.selectedPoiLayersFichierCSS = new Array(); 
	this.selectedPoiLayersPOIversion2 = new Array(); 
	this.selectedPoiLayersPrefixeBulle = new Array(); 
	this.selectedPoiLayersKml = new Array(); 
	this.selectedPoiLayersKmlAttr = new Array(); 
	this.imgPath = "/"; 
	this.currentScale = this.carte.dynMap.scale; 
	this.mutex = false; 
	this.currentPOI = null; 
	this.visibiliteLayersPonctuelles = new Array(); 
	this.visibiliteLayersPonctuellesKml = new Array(); 
	this.identifiantsCouchesPonctuellesVisibles = new Array(); 
	this.dernierScript = 0; 
	this.nomContText = "text"; 
}
ObjectManager.prototype.addDebug = function(_2, _3) {
	if(_3 < this.debugLevel) {
		__log(_2); 
	}
}; 
ObjectManager.prototype.clear = function() {
	this.refresh(true); 
	this.scriptMap = new Array(); 
	this.scriptMapCurrentIndex = 0; 
	this.layerReference = null; 
	this.selectedPoiLayers = new Array(); 
	this.selectedPoiLayersDimensions = new Array(); 
	this.selectedPoiLayersFichierCSS = new Array(); 
	this.selectedPoiLayersPOIversion2 = new Array(); 
	this.selectedPoiLayersPrefixeBulle = new Array(); 
	this.visibiliteLayersPonctuelles = new Array(); 
	this.identifiantsCouchesPonctuellesVisibles = new Array(); 
}; 
ObjectManager.prototype.getLayerReference = function() {
	return(this.layerReference) ? this.layerReference : null; 
}; 
ObjectManager.prototype.setLayerReference = function(_4) {
	this.layerReference = _4; 
}; 
ObjectManager.prototype.isVisibleLayer = function(_5) {
	return(this.visibiliteLayersPonctuelles && this.visibiliteLayersPonctuelles[_5] && this.visibiliteLayersPonctuelles[_5] > 0); 
}; 
ObjectManager.prototype.addLayer = function(_6, _7, _8, _9, _a, _b, _c) {
	var _d = true; 
	if(this.visibiliteLayersPonctuelles.length > 0) {
		_d = false; 
	}
	if(this.visibiliteLayersPonctuelles[_7]) {
		this.visibiliteLayersPonctuelles[_7]++; 
	}
	else {
		this.visibiliteLayersPonctuelles[_7] = 1; 
		this.selectedPoiLayers.push(_7); 
		this.selectedPoiLayersDimensions[_7] = new Array(); 
		this.selectedPoiLayersDimensions[_7]["maxWidth"] = _8; 
		this.selectedPoiLayersDimensions[_7]["maxHeight"] = _9; 
		if(typeof(_a) != "undefined") {
			this.selectedPoiLayersFichierCSS[_7] = _a; 
		}
		else {
			this.selectedPoiLayersFichierCSS[_7] = "/styles/window/geoportail_bull.css"; 
		}
		this.selectedPoiLayersPOIversion2[_7] = _b; 
		this.selectedPoiLayersPrefixeBulle[_7] = _c; 
	}
	this.identifiantsCouchesPonctuellesVisibles.push(_6); 
	if(_d) {
		this.carte.gestionnaire.client.mapRefresh(true); 
	}
}; 
ObjectManager.prototype.addLayerKml = function(_e, _f, _10, _11, _12, _13) {
	if(this.visibiliteLayersPonctuellesKml[_e]) {
		this.visibiliteLayersPonctuellesKml[_e]++; 
	}
	else {
		this.visibiliteLayersPonctuellesKml[_e] = 1; 
		this.selectedPoiLayersKml.push(_e); 
		this.selectedPoiLayersKmlAttr[_e] = new Array(); 
		this.selectedPoiLayersKmlAttr[_e]["fichierKML"] = _f; 
		this.selectedPoiLayersKmlAttr[_e]["minScale"] = _10; 
		this.selectedPoiLayersKmlAttr[_e]["maxScale"] = _11; 
		this.selectedPoiLayersKmlAttr[_e]["winWidth"] = _12; 
		this.selectedPoiLayersKmlAttr[_e]["winHeight"] = _13; 
	}
	this.identifiantsCouchesPonctuellesVisibles.push(_e); 
	if(this.carte.dynMap.scale >= this.selectedPoiLayersKmlAttr[_e]["minScale"] && this.carte.dynMap.scale <= this.selectedPoiLayersKmlAttr[_e]["maxScale"]) {
		this.selectedPoiLayersKmlAttr[_e]["display"] = "true"; 
		this.loadKml(_e, _f); 
	}
	else {
		this.selectedPoiLayersKmlAttr[_e]["display"] = "false"; 
	}
	this.carte.gestionnaire.client.mapRefresh(true); 
}; 
ObjectManager.prototype.addLayerEnd = function() {
	if(__poi) {
		if(__poi.POIScriptLoading == null && this.lastPOIScriptLoaded != null) {
			this.carte.client.mapRefreshObject(); 
		}
		else {
			setTimeout(function() {
				this.addLayerEnd(); }
			.bind(this), 10); 
		}
	}
}; 
ObjectManager.prototype.removeLayer = function(_14, _15) {
	if(!this.visibiliteLayersPonctuelles[_15]) {
		return; 
	}
	this.visibiliteLayersPonctuelles[_15]--; 
	if(this.visibiliteLayersPonctuelles[_15] <= 0) {
		this.selectedPoiLayers = this.selectedPoiLayers.without(_15); 
		delete this.selectedPoiLayersDimensions[_15]; 
		for(var i2 = 0; i2 < this.scriptMapMaxSize; i2++) {
			if(this.scriptMap[i2] != null) {
				if(this.scriptMap[i2].layerName == _15) {
					this.markScriptUsed(this.scriptMap[i2].scriptUid, false); 
				}
			}
		}
		this.carte.client.mapHideObjectSheet(); 
	}
	this.identifiantsCouchesPonctuellesVisibles = this.identifiantsCouchesPonctuellesVisibles.without(_14); 
	if(this.identifiantsCouchesPonctuellesVisibles.length == 0) {
		this.carte.gestionnaire.client.mapRefresh(true); 
	}
}; 
ObjectManager.prototype.removeLayerKml = function(_17) {
	if(!this.visibiliteLayersPonctuellesKml[_17]) {
		return; 
	}
	this.visibiliteLayersPonctuellesKml[_17]--; 
	if(this.visibiliteLayersPonctuellesKml[_17] <= 0) {
		this.unloadKml(_17); 
		this.selectedPoiLayersKml = this.selectedPoiLayersKml.without(_17); 
		delete this.selectedPoiLayersKmlAttr[_17]; 
		this.carte.client.mapHideObjectSheet(); 
	}
	this.identifiantsCouchesPonctuellesVisibles = this.identifiantsCouchesPonctuellesVisibles.without(_17); 
	if(this.identifiantsCouchesPonctuellesVisibles.length == 0) {
		this.carte.gestionnaire.client.mapRefresh(true); 
	}
}; 
ObjectManager.prototype.loadJS = function(_18, _19) {
	var _1a; 
	if(__encryptage) {
		_1a = _18.image.srcdecrypt; 
	}
	else {
		_1a = _18.image.src; 
	}
	if((this.layerReference != null) && (_1a.indexOf(this.layerReference) !=- 1)) {
		for(var i = 0; i < this.selectedPoiLayers.length; i++) {
			this.dernierScript++; 
			var id = this.buildId(_1a, i); 
			if(__encryptage) {
				var _1d = ".*?/([a-zA-Z0-9-_]*)/([0-9_]*)_([0-9]*)/([-]{0,1})([0-9]*)/([-]{0,1})([0-9]*).js"; 
				var _1e = id.match(_1d); 
				var _1f = "/" + _1e[1] + "/" + _1e[2] + "_"; 
				var _20 = _1e[3]; 
				var _21 = _1e[4]; 
				var _22 = _1e[5]; 
				var _23 = _1e[6]; 
				var _24 = _1e[7]; 
				this.url_encrypte = _calcTileSrcEncrypt(_1f, _20, _21, _22, _23, _24); 
				if((_1e != null) && (this.selectedPoiLayersPOIversion2[this.selectedPoiLayers[i]] == true)) {
					id = this.url_encrypte; 
				}
				this.url_encrypte += ".js"; 
			}
			var _25 = this.markScriptUsed(id, true); 
			if(_25 == false) {
				this.registerNewScript(id, this.selectedPoiLayers[i]); 
			}
			this.addDebug("ObjectManager.loadJS(" + id + ")", 1); 
		}
	}
}; 
ObjectManager.prototype.loadKml = function(_26, _27) {
	if(_27.substr(0, 4) == "http") {
		_27 = "/proxy/xmlproxy?url=" + _27; 
	}
	var _28 = new Ajax.Request(_27, {
		method : "get", onSuccess : (function(_29, _2a) {
			var _2b = __poi.getObjectManager(); var kml = _29.responseText; var _2a = _2a; var _2d; var _2e; if(window.DOMParser) {
				_2b.nomContText = "textContent"; _2e = new DOMParser(); _2d = _2e.parseFromString(kml, "text/xml"); }
			else {
				_2b.nomContText = "text"; _2d = new ActiveXObject("Microsoft.XMLDOM"); _2d.async = "false"; _2d.loadXML(kml); }
			var _2f = new Array(); _2f["styles"] = new Array(); _2f["placemarks"] = new Array(); _2f["kmlError"] = "false"; if(typeof(_2d.documentElement) != "undefined" && typeof(_2d.documentElement.childNodes) != "undefined") {
				if(_2d.documentElement.nodeName == "ExceptionReport") {
					var _30 = _2b.getUniqueNode(_2d.documentElement, "exception"); if(_30 != null && typeof(_30.documentElement.wholeText) != "undefined") {
						__debug("loadKml: Erreur lors de la r\xc3\xa9cup\xc3\xa9ration du fichier KML : " + _30.documentElement.wholeText); }
					else {
						__debug("loadKml: Erreur inconnue lors de la r\xc3\xa9cup\xc3\xa9ration du fichier KML"); }
					_2f["kmlError"] = "true"; }
				else {
					var _30 = _2b.getUniqueNode(_2d.documentElement, "Document"); if(_30 != null) {
						_2f = _2b.readKmlNode(_30, _2f); }
					else {
						__debug("loadKml: Erreur dans la structure XML du fichier KML"); _2f["kmlError"] = "true"; }
				}
			}
			else {
				__debug("loadKml: Erreur dans la structure XML du fichier KML"); _2f["kmlError"] = "true"; }
			if(_2f["kmlError"] != "true") {
				var _31 = new Array(); var _32 = _2f["placemarks"]; var _33 = _2f["styles"]; for(var i = 0; i < _32.length; i++) {
					if(typeof(_33[_32[i]["styleUrl"]]) != "undefined") {
						_31.push([_32[i]["coordinates"]["x"] * 100, _32[i]["coordinates"]["y"] * 100, 0, i, _33[_32[i]["styleUrl"]].href, _32[i]["description"], 5, "", _33[_32[i]["styleUrl"]].h, _33[_32[i]["styleUrl"]].w, _33[_32[i]["styleUrl"]].scale, _32[i]["name"], _2b.selectedPoiLayersKmlAttr[_2a]["winWidth"], _2b.selectedPoiLayersKmlAttr[_2a]["winHeight"]]); }
					else {
						__debug("loadKml: Impossible de trouver le style \"" + _32[i]["styleUrl"] + "\" d\xc3\xa9fini par le Placemark " + _32[i]["name"]); _2f["kmlError"] = "true"; }
				}
			}
			if(_2f["kmlError"] == "true") {
				var _35 = __i18n_messagesVisu["kmlParsingErreur_title"]; var msg = __i18n_messagesVisu["kmlParsingErreur_message"]; _2b.displayMessage(_35, msg); }
			else {
				__poi.poiAddv2(_2a, "", _31, _2a); }
		}
		).bindAsEventListener(this, _26)}
	); 
}; 
ObjectManager.prototype.readKmlNode = function(_37, _38) {
	if(typeof(_37.childNodes.length) == "undefined") {
		return null; 
	}
	for(var i = 0; i < _37.childNodes.length; i++) {
		switch(_37.childNodes[i].nodeName) {
		case"Style" : var _3a = this.readKmlStyle(_37.childNodes[i]); 
		if(_3a != null) {
			if(_3a != "notAnIcon") {
				if(typeof(_37.childNodes[i].getAttribute("id")) != undefined) {
					_38["styles"][_37.childNodes[i].getAttribute("id")] = _3a; 
				}
				else {
					__debug("loadKml: Attribut id absent dans une balise Style"); 
					_38["kmlError"] = "true"; 
				}
			}
		}
		else {
			_38["kmlError"] = "true"; 
			return _38; 
		}
		break; 
		case"Placemark" : var _3b = this.readKmlPlacemark(_37.childNodes[i]); 
		if(_3b != null) {
			_38["placemarks"].push(_3b); 
		}
		else {
			_38["kmlError"] = "true"; 
			return _38; 
		}
		break; 
		default : _38 = this.readKmlNode(_37.childNodes[i], _38); 
		break; 
		}
	}
	return _38; 
}; 
ObjectManager.prototype.readKmlStyle = function(_3c) {
	var _3d = new Array(); 
	var _3e; 
	if((_3e = this.getUniqueNode(_3c, "IconStyle")) == null) {
		return"notAnIcon"; 
	}
	var _3f; 
	if((_3f = this.getUniqueNode(_3e, "Icon")) == null) {
		__debug("loadKml: Balise \"Icon\" introuvable dans un \"IconStyle\""); 
		return null; 
	}
	var _40; 
	if((_40 = this.getUniqueNode(_3e, "scale")) == null) {
		_3d["scale"] = null; 
	}
	else {
		_3d["scale"] = parseFloat(_40[this.nomContText], 10); 
	}
	var _41; 
	if((_41 = this.getUniqueNode(_3f, "href")) == null) {
		__debug("loadKml: Balise \"href\" introuvable dans un \"Icon\""); 
		return null; 
	}
	_3d["href"] = _41[this.nomContText]; 
	var w; 
	if((w = this.getUniqueNode(_3f, "w")) != null) {
		_3d["w"] = parseInt(w[this.nomContText], 10); 
	}
	else {
		_3d["w"] = null; 
	}
	var h; 
	if((h = this.getUniqueNode(_3f, "h")) != null) {
		if(_3d["w"] != null) {
			_3d["h"] = parseInt(h[this.nomContText], 10); 
		}
		else {
			__debug("loadKml: Balise \"h\" sans balise \"w\" dans un \"Icon\""); 
			return null; 
		}
	}
	else {
		if(_3d["w"] != null) {
			__debug("loadKml: Balise \"w\" sans balise \"h\" dans un \"Icon\""); 
			return null; 
		}
		else {
			_3d["h"] = null; 
		}
	}
	return _3d; 
}; 
ObjectManager.prototype.readKmlPlacemark = function(_44) {
	var _45 = new Array(); 
	var _46; 
	if((_46 = this.getUniqueNode(_44, "name")) == null) {
		_45["name"] = null; 
	}
	else {
		_45["name"] = _46[this.nomContText]; 
	}
	var _47; 
	if((_47 = this.getUniqueNode(_44, "Snippet")) != null) {
		_45["name"] = _47[this.nomContText]; 
	}
	var _48; 
	if((_48 = this.getUniqueNode(_44, "description")) == null) {
		if(_45["name"] == null) {
			__debug("loadKml: Balises \"name\", \"snippet\" et \"description\" introuvables dans un \"Placemark\""); 
			return null; 
		}
		else {
			_45["description"] = _45["name"]; 
		}
	}
	else {
		_45["description"] = _48[this.nomContText]; 
	}
	var _49; 
	if((_49 = this.getUniqueNode(_44, "styleUrl")) == null) {
		__debug("loadKml: Balise \"styleUrl\" introuvable dans un \"Placemark\""); 
		return null; 
	}
	_45["styleUrl"] = _49[this.nomContText].substring(1); 
	var _4a; 
	if((_4a = this.getUniqueNode(_44, "Point")) == null) {
		__debug("loadKml: Balise \"Point\" introuvable dans un \"Placemark\""); 
		return null; 
	}
	var _4b; 
	if((_4b = this.getUniqueNode(_4a, "coordinates")) == null) {
		__debug("loadKml: Balise \"coordinates\" introuvable dans un \"Point\""); 
		return null; 
	}
	else {
		_45["coordinates"] = new Array(); 
		var _4c; 
		if((_4c = _4b[this.nomContText].indexOf(",")) > 0) {
			var _4d; 
			var _4e; 
			if((_4e = _4b[this.nomContText].indexOf(",", _4c + 1)) > 0) {
				_4d = this.carte.client.mapDegreeToClient(_4b[this.nomContText].substr(0, _4c), _4b[this.nomContText].substr(_4c + 1, _4e - _4c - 1)); 
			}
			else {
				_4d = this.carte.client.mapDegreeToClient(_4b[this.nomContText].substr(0, _4c), _4b[this.nomContText].substr(_4c + 1)); 
			}
			_45["coordinates"]["x"] = _4d[0]; 
			_45["coordinates"]["y"] = _4d[1]; 
		}
		else {
			__debug("loadKml: Erreur de conversion des coordonn\xc3\xa9es : \"" + _4b + "\""); 
			return null; 
		}
	}
	return _45; 
}; 
ObjectManager.prototype.getUniqueNode = function(_4f, _50) {
	if(typeof(_4f.childNodes.length) == "undefined") {
		return null; 
	}
	for(var i = 0; i < _4f.childNodes.length; i++) {
		if(_4f.childNodes[i].nodeName == _50) {
			return _4f.childNodes[i]; 
		}
	}
	return null; 
}; 
ObjectManager.prototype.displayMessage = function(_52, msg) {
	if(__displayDialog) {
		__displayDialog(_52, msg, null, 5000); 
	}
	else {
		this._log(_52 + " - " + msg); 
	}
	return true; 
}; 
ObjectManager.prototype.unloadKml = function(_54) {
	if(typeof(this.selectedPoiLayersKmlAttr[_54]["liste"]) != "undefined") {
		for(var i = 0; i < this.selectedPoiLayersKmlAttr[_54]["liste"].length; i++) {
			this.carte.client.mapRemoveObject(this.selectedPoiLayersKmlAttr[_54]["liste"][i]); 
		}
		this.selectedPoiLayersKmlAttr[_54]["liste"] = new Array(); 
	}
}; 
ObjectManager.prototype.unloadJS = function(_56) {
	var _57 = ""; 
	if(__encryptage && _56.image.srcdecrypt != null) {
		_57 = _56.image.srcdecrypt; 
	}
	else {
		_57 = _56.image.src; 
	}
	if((this.layerReference != null) && (_57.indexOf(this.layerReference) !=- 1)) {
		for(var i = 0; i < this.selectedPoiLayers.length; i++) {
			var id = this.buildId(_57, i); 
			if(__encryptage && (this.selectedPoiLayersPOIversion2[this.selectedPoiLayers[i]] == true)) {
				var _5a = ".*?/([a-zA-Z0-9-_]*)/([0-9_]*)_([0-9]*)/([-]{0,1})([0-9]*)/([-]{0,1})([0-9]*).js"; 
				var _5b = id.match(_5a); 
				var _5c = "/" + _5b[1] + "/" + _5b[2] + "_"; 
				var _5d = _5b[3]; 
				var _5e = _5b[4]; 
				var _5f = _5b[5]; 
				var _60 = _5b[6]; 
				var _61 = _5b[7]; 
				if(_5b != null) {
					id = _calcTileSrcEncrypt(_5c, _5d, _5e, _5f, _60, _61); 
				}
			}
			this.delayedStopUsing(id); 
			this.addDebug("ObjectManager.unloadJS(" + id + ")", 1); 
		}
	}
}; 
ObjectManager.prototype.htmlPoi = function(_62, i) {
	var _64 = "<img src=\"" + _62.imgsrc + "\" id=\"" + this.getObjectImgId(_62, i) + "\""; 
	if(typeof(_62.label) != "undefined" && _62.label != null && _62.label != "") {
		_64 = _64 + " title=\"" + _62.label + "\""; 
	}
	if(typeof(_62.width) != "undefined" && _62.width != null && typeof(_62.height) != "undefined" && _62.height != null) {
		_64 = _64 + " width=\"" + _62.width + "\" height=\"" + _62.height + "\" overflow=\"auto\""; 
	}
	_64 = _64 + " class=\"mapobject\"/>"; 
	return _64; 
}; 
ObjectManager.prototype.getObjectImgId = function(_65, i) {
	return(this.carte.client.mapGetId() + "_obj_" + i + "_" + _65.id); 
}; 
ObjectManager.prototype.eventPoi = function(_67, i) {
	$$(".mapobject").each(function(elt) {
		var _6a = elt.id.split("_"); var _6b = _6a[3]; if(_6b != "SearchPointer") {
			elt.observe("mousedown", this.objectEventListener.bindAsEventListener(this, _6b)); elt.observe("mouseover", this.objectEventListenerMouseOver.bindAsEventListener(this, _6b)); elt.observe("mouseout", this.objectEventListenerMouseOut.bindAsEventListener(this, _6b)); }
	}
	.bind(this)); 
}; 
ObjectManager.prototype.objectEventListener = function(_6c, _6d) {
	this.carte.client.mapShowObjectSheet(_6d); 
	var _6e = this.carte.client.mapFindLayersObjects(_6d); 
	this.setCurrentPOI(_6e); 
	var _6f = this.carte.idCarte; 
	Event.observe(document.getElementById(_6f + "_sheet_close"), "click", this.objectEventListenerClose.bindAsEventListener(this)); 
	Event.observe(document.getElementById(_6f + "_sheet"), "mousemove", this.catchMouseMove.bindAsEventListener(this)); 
	if(document.getElementById(_6f + "_sheet").attachEvent) {
		document.getElementById(_6f + "_sheet").attachEvent("onmousewheel", this.catchMouseScroll.bindAsEventListener(this)); 
	}
	else {
		Event.observe(document.getElementById(_6f + "_sheet"), "DOMMouseScroll", this.catchMouseScroll.bindAsEventListener(this)); 
	}
	Event.stop(_6c); 
	return false; 
}; 
ObjectManager.prototype.catchMouseMove = function(_70) {
	document.getElementById(this.carte.idCarte + "_sheet").style.cursor = "auto"; 
	Event.stop(_70); 
	return false; 
}; 
ObjectManager.prototype.catchMouseScroll = function(_71) {
	Event.stop(_71); 
	return false; 
}; 
ObjectManager.prototype.objectEventListenerClose = function(_72) {
	var _73 = this.carte.idCarte; 
	Event.stopObserving(document.getElementById(_73 + "_sheet"), "mousemove", this.catchMouseMove.bindAsEventListener(this)); 
	Windows.close(_73 + "_sheet", _72); 
	Event.stop(_72); 
	return false; 
}; 
ObjectManager.prototype.objectEventListenerMouseOver = function(_74, _75) {
	__poi.addEmprise(_74, _75); 
	Event.stop(_74); 
	return false; 
}; 
ObjectManager.prototype.objectEventListenerMouseOut = function(_76, _77) {
	var _78 = this.carte.client.mapGetLayer("coucheVecteur"); 
	if(_78) {
		_78.deleteAllElements(); 
		_78.refresh(true); 
	}
	Event.stop(_76); 
	return false; 
}; 
ObjectManager.prototype.clickEventListener = function(_79) {
	var x = Event.pointerX(_79); 
	var y = Event.pointerY(_79); 
	var div = this.carte.client.mapSheetLayerWinElement(); 
	this.carte.client.mapHideObjectSheet(); 
	if(Position.within(div, x, y)) {
		return true; 
	}
	else {
		return false; 
	}
}; 
ObjectManager.prototype.addObjectView = function(_7d) {
	if(_7d.scale != null && _7d.scale != this.currentScale) {
		this.changeScale(_7d.scale); 
	}
	_7d.processing = true; 
	for(var i = 0; i < _7d.objects.length; i++) {
		this.carte.client.mapAddObject(_7d.objects[i], false); 
	}
	this.delayedStopProcessing(_7d); 
}; 
ObjectManager.prototype.removeObjectView = function(_7f) {
	_7f.processing = true; 
	for(var i = 0; i < _7f.objects.length; i++) {
		this.carte.client.mapRemoveObject(_7f.objects[i].id); 
	}
	this.delayedStopProcessing(_7f); 
	setTimeout(function() {
		this.carte.client.mapRefreshObject(); }
	.bind(this), 45); 
}; 
ObjectManager.prototype.addObjects = function(_81, _82) {
	var _83 = this.getScript(_81); 
	if(_83 != null && _83.used) {
		_83.state = 2; 
		_83.objects = _82; 
		if(_82.length > 0) {
			_83.scale = _82[0].scale; 
		}
		this.addObjectView(_83); 
		_83.unload(); 
		this.dernierScript--; 
		if(this.dernierScript == 0) {
			setTimeout(function() {
				this.carte.client.mapRefreshObject(); }
			.bind(this), 45); 
		}
	}
}; 
ObjectManager.prototype.changeScale = function(_84) {
	this.currentScale = _84; 
	for(var i = 0; i < this.scriptMapCurrentIndex; i++) {
		if(this.scriptMap[i] != null) {
			if(this.scriptMap[i].scale != null) {
				if(this.scriptMap[i].scale != _84) {
					this.markScriptUsed(this.scriptMap[i].scriptUid, false); 
				}
			}
		}
	}
	setTimeout(function() {
		this.carte.client.mapRefresh(true); }
	.bind(this), 200); 
}; 
ObjectManager.prototype.delayedStopUsing = function(_86) {
	var _87 = this.getScript(_86); 
	if(_87 != null) {
		_87.delayedStop = true; 
	}
	window.setTimeout("__poi.getObjectManager().stopUsing('" + _86 + "')", 1); 
}; 
ObjectManager.prototype.stopUsing = function(_88) {
	var _89 = this.getScript(_88); 
	if(_89 != null) {
		if(_89.delayedStop) {
			this.markScriptUsed(_88, false); 
		}
	}
}; 
ObjectManager.prototype.delayedStopProcessing = function(_8a) {
	window.setTimeout("__poi.getObjectManager().stopProcessing('" + _8a.scriptUid + "')", 1); 
}; 
ObjectManager.prototype.stopProcessing = function(_8b) {
	var _8c = this.getScript(_8b); 
	if(_8c != null) {
		_8c.processing = false; 
		this.refresh(); 
	}
}; 
ObjectManager.prototype.refresh = function(_8d) {
	if(!_8d) {
		for(var i = 0; i < this.scriptMapMaxSize; i++) {
			if(this.scriptMap[i] != null) {
				if(this.scriptMap[i].processing) {
					return; 
				}
			}
		}
	}
	this.carte.client.mapRefreshObject(); 
}; 
ObjectManager.prototype.buildId = function(_8f, i) {
	var id = _8f.substring(SERVEUR.length, _8f.length); 
	var _92 = id.split("/"); 
	var _93 = _92[1].split("_"); 
	_93[_93.length - 1] = "js"; 
	_92[1] = _93.join("_"); 
	var _94 = _92[_92.length - 1].split("."); 
	_94[_94.length - 1] = "js"; 
	_92[_92.length - 1] = _94.join("."); 
	id = _92.join("/"); 
	return id.replace(new RegExp(this.layerReference, "g"), this.selectedPoiLayers[i]); 
}; 
ObjectManager.prototype.markScriptUsed = function(_95, _96) {
	this.addDebug("ObjectManager.markScriptUsed(z" + _95 + "," + _96 + ")", 2); 
	var _97 = this.getScript(_95); 
	if(_97 != null) {
		if(_96) {
			_97.delayedStop = false; 
		}
		if(_97.used &&!_96) {
			this.removeObjectView(_97); 
		}
		if(!_97.used && _96) {
			this.addObjectView(_97); 
		}
		_97.used = _96; 
	}
	return(_97 != null); 
}; 
ObjectManager.prototype.getScript = function(_98) {
	var _99 = null; 
	var i; 
	for(var i = 0; i < this.scriptMapMaxSize && _99 == null; i++) {
		if(this.scriptMap[i] != null && this.scriptMap[i].scriptUid == _98) {
			_99 = this.scriptMap[i]; 
		}
	}
	this.addDebug("ObjectManager.getScript(" + _98 + ")->result=" + _99, 2); 
	return _99; 
}; 
ObjectManager.prototype.registerNewScript = function(_9b, _9c) {
	this.addDebug("ObjectManager.registerNewScript(" + _9b + ")", 2); 
	var _9d = this.tryRegisterNewScript(_9b, this.scriptMapCurrentIndex, this.scriptMapMaxSize, _9c); 
	if(_9d == false) {
		_9d = this.tryRegisterNewScript(_9b, 0, this.scriptMapCurrentIndex, _9c); 
	}
	if(_9d == false) {
		__error("ObjectManager: pool overflow"); 
	}
}; 
ObjectManager.prototype.tryRegisterNewScript = function(_9e, _9f, _a0, _a1) {
	this.addDebug("ObjectManager.tryRegisterNewScript(" + _9e + "," + _9f + "," + _a0 + ")", 2); 
	var _a2 = false; 
	var i; 
	var _a4 = (__encryptage) ? this.url_encrypte : null; 
	for(i = _9f; i < _a0 && _a2 == false; i++) {
		if(this.scriptMap[i] == null) {
			_a2 = true; 
			this.scriptMapCurrentIndex = i; 
			this.scriptMap[i] = new ObjectScript(this, _9e, this.poiServer, _a1, _a4); 
			this.scriptMap[i].load(); 
		}
		else {
			if(this.scriptMap[i].used == false) {
				_a2 = true; 
				this.scriptMapCurrentIndex = i; 
				this.scriptMap[i].unload(); 
				this.scriptMap[i] = new ObjectScript(this, _9e, this.poiServer, _a1, _a4); 
				this.scriptMap[i].load(); 
			}
		}
	}
	return _a2; 
}; 
ObjectManager.prototype.getCurrentPOI = function() {
	return this.currentPOI; 
}; 
ObjectManager.prototype.setCurrentPOI = function(_a5) {
	this.currentPOI = _a5; 
}; 
function ObjectScript(_a6, _a7, _a8, _a9, _aa) {
	this.objectManager = _a6; 
	this.objectManager.addDebug("ObjectScript(" + _a7 + ")", 3); 
	this.scriptUid = _a7; 
	this.layerName = _a9; 
	this.state = 0; 
	this.used = true; 
	this.objects = new Array(); 
	this.poiServer = _a8; 
	this.processing = true; 
	if(__encryptage) {
		this.encscriptUid = _aa; 
	}
}
ObjectScript.prototype.toString = function() {
	return"[ObjectScript(" + this.scriptUid + ")]"; 
}; 
ObjectScript.prototype.getScript = function() {
	this.objectManager.addDebug("ObjectScript[" + this.scriptUid + "].getScript()", 3); 
	var _ab = document.createElement("script"); 
	_ab.id = this.scriptUid; 
	_ab.type = "text/javascript"; 
	_ab.src = this.poiServer; 
	if(__encryptage) {
		_ab.src += this.encscriptUid; 
	}
	else {
		_ab.src += this.scriptUid; 
	}
	return _ab; 
}; 
ObjectScript.prototype.load = function() {
	this.objectManager.addDebug("ObjectScript[" + this.scriptUid + "].load()", 3); 
	this.state = 1; 
	var _ac = document.getElementsByTagName("head")[0]; 
	_ac.appendChild(this.getScript()); 
}; 
ObjectScript.prototype.unload = function() {
	this.objectManager.addDebug("ObjectScript[" + this.scriptUid + "].unload()", 3); 
	this.state = 3; 
	var _ad = document.getElementById(this.scriptUid); 
}; 
function POIInterface(_ae) {
	this.carte = _ae; 
	this.objectManager = null; 
	this.image = new Object(); 
	this.margeEntreIconesMemePOI = 1; 
	this.refreshTimestamp = new Date().getTime(); 
	this.refreshDelay = 1000; 
	this.isRefreshing = false; 
	this.lastPOIs = null; 
	this.lastPOIsLength = 0; 
	this.totalPOIs = null; 
	this.lastPOILoaded = null; 
}
POIInterface.prototype.getObjectManager = function() {
	if(this.objectManager == null) {
		this.objectManager = new ObjectManager(this.carte); 
	}
	return this.objectManager; 
}; 
POIInterface.prototype.poiAdd = function(_af, _b0) {
	var _b1 = this.getObjectManager(); 
	_af = _af.replace("/visuponctuelle", ""); 
	var _b2 = _af; 
	var _b3 = new Array(_b0.length); 
	var _b4 = (((_af.split("\\"))[0]).split("_"))[2]; 
	if(_b1.selectedPoiLayersPOIversion2[_b4] == true) {
		var _b5 = ".*?/([a-zA-Z0-9-_]*)/([0-9_]*)_([0-9]*)/([-]{0,1})([0-9]*)/([-]{0,1})([0-9]*).js"; 
		var _b6 = _af.match(_b5); 
		var _b7 = "/" + _b6[1] + "/" + _b6[2] + "_"; 
		var _b8 = _b6[3]; 
		var _b9 = _b6[4]; 
		var _ba = _b6[5]; 
		var _bb = _b6[6]; 
		var _bc = _b6[7]; 
		_b2 = _calcTileSrcEncrypt(_b7, _b8, _b9, _ba, _bb, _bc); 
	}
	var _bd = _b0.length; 
	for(var i = 0; i < _bd; i++) {
		var _bf = this.carte.client.mapClientToDegree(_b0[i][0], _b0[i][1]); 
		var x = _bf[0]; 
		var y = _bf[1]; 
		var _c2 = _b0[i][2]; 
		var id = _b0[i][3]; 
		var _c4 = _b1.imgPath + _b0[i][4]; 
		var _c5 = _b0[i][5]; 
		var _c6 = "poi-" + id + "-" + _b4 + "-" + _c2; 
		var _c7 = this.carte.gestionnaire.client.mapCreateObject(x, y, _c6, _b4, _c5, 0, 0, _c4, _c6); 
		_c7.scale = _c2; 
		_c7.maxWidth = _b1.selectedPoiLayersDimensions[_b4]["maxWidth"]; 
		_c7.maxHeight = _b1.selectedPoiLayersDimensions[_b4]["maxHeight"]; 
		_c7.fichierCSS = _b1.selectedPoiLayersFichierCSS[_b4]; 
		_c7.POIversion2 = _b1.selectedPoiLayersPOIversion2[_b4]; 
		_c7.prefixeBulle = _b1.selectedPoiLayersPrefixeBulle[_b4]; 
		_b3[i] = _c7; 
	}
	_b1.addObjects(_b2, _b3); 
}; 
POIInterface.prototype.poiAddv2_boucle1 = function(_c8, _c9, _ca, i, kml) {
	var _cd = _ca[4]; 
	if(!this.image[_cd] || this.image[_cd] == null ||!this.image[_cd].src || this.image[_cd].src.substring(this.image[_cd].src.length - _cd.length) != _cd) {
		this.image[_cd] = document.createElement("img"); 
		this.image[_cd].setAttribute("src", _cd); 
	}
	if($(this.image[_cd]).complete == true) {
		this.poiAddv2_boucle2(_c8, _c9, _ca, i, _cd, kml); 
	}
	else {
		$(this.image[_cd]).observe("load", this.poiAddv2_boucle2.bind(this, _c8, _c9, _ca, i, _cd, kml)); 
	}
}; 
POIInterface.prototype.poiAddv2_boucle2 = function(_ce, _cf, _d0, i, _d2, kml) {
	var _d4 = this.getObjectManager(); 
	var _d5; 
	var _d6; 
	if(typeof(_d0[8]) != "undefined" && _d0[8] != null && typeof(_d0[9]) != "undefined" && _d0[9] != null) {
		_d5 = _d0[8]; 
		_d6 = _d0[9]; 
	}
	else {
		if(typeof(_d0[10]) != "undefined" && _d0[10] != null) {
			_d5 = Math.round(parseInt($(this.image[_d2]).width) * _d0[10]); 
			_d6 = Math.round(parseInt($(this.image[_d2]).height) * _d0[10]); 
		}
		else {
			_d5 = parseInt($(this.image[_d2]).width); 
			_d6 = parseInt($(this.image[_d2]).height); 
		}
	}
	var _d7 = this.carte.client.mapClientToDegree(_d0[0], _d0[1]); 
	var x = _d7[0]; 
	var y = _d7[1]; 
	var _da = _d0[2]; 
	var id = _d0[3]; 
	var _dc = _d0[5]; 
	var _dd = ""; 
	var _de; 
	var _df = "5"; 
	var _e0 = _d5 / 2; 
	var _e1 = _d6 / 2; 
	var _e2 = ""; 
	var _e3 = ""; 
	if(typeof(_d0[6]) != "undefined" || _d0[6] != null) {
		_df = _d0[6]; 
	}
	if(typeof(_d0[7]) != "undefined" || _d0[7] != null || _d0[7] != "") {
		_de = _d0[7]; 
		_d0.pointsEmprise = _de; 
	}
	if(typeof(_d0[11]) != "undefined" || _d0[11] != null || _d0[11] != "") {
		_dd = _d0[11]; 
	}
	if(typeof(_d0[12]) != "undefined" || _d0[12] != null || _d0[12] != "") {
		_e2 = _d0[12]; 
	}
	if(typeof(_d0[13]) != "undefined" || _d0[13] != null || _d0[13] != "") {
		_e3 = _d0[13]; 
	}
	if(_df < 4) {
		_e1 =- _d6 / 2; 
	}
	else {
		if(_df > 6) {
			_e1 = _d6 * 3 / 2; 
		}
	}
	if(_df % 3 == 0) {
		_e0 =- _d5 / 2; 
	}
	else {
		if(_df == 1 || _df == 4 || _df == 7) {
			_e0 = _d5 * 3 / 2; 
		}
	}
	var _e4 = "poi-" + id + "-" + _ce + "-" + _da; 
	var _d0 = this.carte.gestionnaire.client.mapCreateObject(x, y, _e4, _ce, _dc, _e0, _e1, _d2, _e4); 
	_d0.scale = _da; 
	if(_d4.selectedPoiLayersDimensions[_ce] != "undefined" && _d4.selectedPoiLayersDimensions[_ce] != null) {
		_d0.maxWidth = _d4.selectedPoiLayersDimensions[_ce]["maxWidth"]; 
		_d0.maxHeight = _d4.selectedPoiLayersDimensions[_ce]["maxHeight"]; 
	}
	_d0.fichierCSS = _d4.selectedPoiLayersFichierCSS[_ce]; 
	_d0.POIversion2 = _d4.selectedPoiLayersPOIversion2[_ce]; 
	_d0.prefixeBulle = _d4.selectedPoiLayersPrefixeBulle[_ce]; 
	_d0.height = _d6; 
	_d0.width = _d5; 
	_d0.label = _dd; 
	_d0.winWidth = _e2; 
	_d0.winHeight = _e3; 
	this.pois[_ce + "-" + _cf][i] = _d0; 
	this.loaded[_ce + "-" + _cf] = this.loaded[_ce + "-" + _cf] + 1; 
	if(this.loaded[_ce + "-" + _cf] >= this.toLoad[_ce + "-" + _cf]) {
		this.poiAddv2_fin(this.toLoad[_ce + "-" + _cf], _ce, _cf, kml); 
	}
}; 
POIInterface.prototype.poiAddv2_fin = function(_e5, _e6, _e7, kml) {
	var _e9 = this.getObjectManager(); 
	for(var i = 0; i < _e5; i++) {
		if(typeof(this.pois[_e6 + "-" + _e7]) == "undefined" || this.pois[_e6 + "-" + _e7] == null || typeof(this.pois[_e6 + "-" + _e7][i]) == "undefined" || this.pois[_e6 + "-" + _e7][i] == null) {
			setTimeout(function() {
				this.poiAddv2_fin(_e5, _e6, _e7, kml); }
			.bind(this), 60); 
			return; 
		}
	}
	if(typeof(kml) != "undefined" || kml != null) {
		_e9.selectedPoiLayersKmlAttr[_e6]["liste"] = new Array(); 
		for(var i = 0; i < this.pois[_e6 + "-" + _e7].length; i++) {
			_e9.selectedPoiLayersKmlAttr[_e6]["liste"].push(this.pois[_e6 + "-" + _e7][i]["id"]); 
			this.carte.client.mapAddObject(this.pois[_e6 + "-" + _e7][i], false); 
		}
	}
	_e9.addObjects(_e7, this.pois[_e6 + "-" + _e7]); 
	delete this.pois[_e6 + "-" + _e7]; 
	this.lastPOILoaded = new Date().getTime(); 
	if(this.isRefreshing == false) {
		this.isRefreshing = true; 
		this.refresh(); 
	}
}; 
POIInterface.prototype.poiAddv2 = function(_eb, _ec, _ed, kml) {
	var _ef = _ed.length; 
	var _f0 = this.getObjectManager(); 
	if(_ef < 1) {
		return; 
	}
	if(typeof(this.pois) == "undefined" || this.pois == null) {
		this.pois = new Array(); 
		this.toLoad = new Array(); 
		this.loaded = new Array(); 
	}
	if(typeof(this.pois[_eb + "-" + _ec]) == "undefined" || this.pois[_eb + "-" + _ec] == null) {
		this.pois[_eb + "-" + _ec] = new Array(_ed.length); 
	}
	this.loaded[_eb + "-" + _ec] = 0; 
	this.toLoad[_eb + "-" + _ec] = _ef; 
	for(var i = 0; i < _ef; i++) {
		this.poiAddv2_boucle1(_eb, _ec, _ed[i], i, kml); 
	}
}; 
POIInterface.prototype.refresh = function() {
	var _f2 = new Date().getTime(); 
	if(_f2 > (this.lastPOILoaded + this.refreshDelay)) {
		this.carte.client.mapRefreshObject(); 
		this.isRefreshing = false; 
		return; 
	}
	else {
		setTimeout(function() {
			this.refresh(); }
		.bind(this), 1); 
	}
}; 
POIInterface.prototype.addEmprise = function(_f3, _f4) {
	var _f5 = this.carte.dynMap.layers.objects.findObject(_f4); 
	if(_f5 && _f5.pointsEmprise) {
		var _f6 = this.carte.client.mapGetLayer("coucheVecteur"); 
		if(!_f6) {
			this.carte.client.mapAddVectorLayer("coucheVecteur"); 
			_f6 = this.carte.client.mapGetLayer("coucheVecteur"); 
			_f6.init(this.carte.dynMap); 
		}
		var _f7 = new Array(); 
		var _f8 = new Array(); 
		var _f9 = _f5.pointsEmprise; 
		if(_f9 != "undefined" && _f9 != null) {
			for(var ipe = 0; ipe < _f9.length; ipe++) {
				if(_f9[ipe] != "undefined" && _f9[ipe] != null) {
					_f7.push(_f9[ipe][0]); 
					_f8.push(_f9[ipe][1]); 
				}
			}
		}
		var _fb = new GCISPolygon(_f7, _f8, "#FFFFFF", 4, "#007F0E", 0.5); 
		_f6.addElement(_fb); 
		_f6.refresh(true); 
	}
}; 
POIInterface.prototype.refreshKml = function(_fc) {
	var _fd = this.getObjectManager(); 
	for(var i = 0; i < _fd.selectedPoiLayersKml.length; i++) {
		var _ff = _fd.selectedPoiLayersKml[i]; 
		var _100 = _fd.selectedPoiLayersKmlAttr[_ff]["minScale"]; 
		var _101 = _fd.selectedPoiLayersKmlAttr[_ff]["maxScale"]; 
		var _102 = _fd.selectedPoiLayersKmlAttr[_ff]["display"]; 
		if(_102 == "true") {
			if(_fc < _100 || _fc > _101) {
				_fd.unloadKml(_ff); 
				_fd.selectedPoiLayersKmlAttr[_ff]["display"] = "false"; 
			}
		}
		else {
			if(_fc >= _100 && _fc <= _101) {
				_fd.loadKml(_ff, _fd.selectedPoiLayersKmlAttr[_ff]["fichierKML"]); 
				_fd.selectedPoiLayersKmlAttr[_ff]["display"] = "true"; 
			}
		}
	}
}; 
var __poi = null; 
function Client(_1) {
	this.gestionnaire = _1; 
}
Client.prototype.getMap = function() {
	return this.gestionnaire.carte.dynMap; 
}; 
Client.prototype.mapGetId = function() {
	return this.getMap().id; 
}; 
Client.prototype.mapClear = function() {
	this.gestionnaire.carte.dynMap.sheetLayer.flush(); 
	return DynMapClear(this.getMap(), true, false); 
}; 
Client.prototype.mapIsRefreshing = function() {
	return DynMapIsRefreshing(this.getMap()); 
}; 
Client.prototype.mapRefresh = function(_2) {
	return DynMapRefresh(this.getMap(), _2); 
}; 
Client.prototype.mapSetCallBackAfterRefresh = function(_3) {
	return DynMapSetCallBackAfterRefresh(this.getMap(), _3); 
}; 
Client.prototype.mapInitProjection = function() {
	return __initProjection(this.getMap()); 
}; 
Client.prototype.mapGetRasterLayerNames = function() {
	var _4 = DynMapGetRasterLayerNames(this.getMap()); 
	return _4; 
}; 
Client.prototype.mapGetPonctualLayerNames = function() {
	var _5 = this.gestionnaire.poiInterface.getObjectManager().selectedPoiLayers; 
	return _5; 
}; 
Client.prototype.mapGetLayer = function(_6) {
	return DynMapGetLayer(this.getMap(), _6); 
}; 
Client.prototype.mapLayerRefresh = function(_7, _8) {
	return DynMapLayerRefresh(_7, _8); 
}; 
Client.prototype.mapGetLayerVisibility = function(_9) {
	return DynMapGetLayerVisibility(_9); 
}; 
Client.prototype.mapSetLayerVisibility = function(_a, _b) {
	DynMapSetLayerVisibility(this.getMap(), _a.name, _b); 
}; 
Client.prototype.mapSetLayerVisibilityById = function(_c, _d) {
	DynMapSetLayerVisibility(this.getMap(), _c, _d); 
}; 
Client.prototype.mapGetLayerOpacity = function(_e) {
	return DynMapGetLayerOpacity(_e); 
}; 
Client.prototype.mapSetLayerOpacity = function(_f, _10) {
	DynMapSetLayerOpacity(_f, _10); 
}; 
Client.prototype.mapGetLayerNumber = function(_11) {
	return DynMapGetLayerNumber(this.getMap(), _11.name); 
}; 
Client.prototype.mapSetLayerNumber = function(_12, _13) {
	DynMapSetLayerNumber(this.getMap(), _12.name, _13); 
}; 
Client.prototype.mapSetLayerNumberById = function(_14, _15) {
	DynMapSetLayerNumber(this.getMap(), _14, _15); 
}; 
Client.prototype.mapAddRasterLayer = function(id, _17, map, _19, _1a, _1b, _1c, _1d) {
	DynMapAddRasterLayer(this.getMap(), id, _17, map, _19, _1a, _1b, _1c, _1d); 
}; 
Client.prototype.mapAddRasterLayerWithTileSize = function(id, _1f, map, _21, _22, _23, _24, _25, _26, _27) {
	DynMapAddRasterLayer(this.getMap(), id, _1f, map, _21, _22, _23, _24, _25, _26, _27); 
}; 
Client.prototype.mapSetRasterVisibilityRange = function(id, min, max) {
	DynMapSetRasterVisibilityRange(this.getMap(), id, min, max); 
}; 
Client.prototype.mapReInitLayers = function() {
	DynMapReInitLayers(this.getMap()); 
}; 
Client.prototype.mapCreate = function(_2b) {
	return DynMapCreate(window, document, document.getElementById(_2b), SERVEUR, null, X, Y, ECHELLE, "", RATIO, PRECISION, [LIMITESX1, LIMITESX2, LIMITESY1, LIMITESY2], "jpg", false, LARGEURTUILE, HAUTEURTUILE); 
}; 
Client.prototype.mapModify = function() {
	DynMapSetModifyMap(this.getMap(), X, Y, ECHELLE, RATIO, PRECISION, [LIMITESX1, LIMITESX2, LIMITESY1, LIMITESY2]); 
}; 
Client.prototype.mapSetSize = function(_2c, _2d) {
	DynMapSetSize(this.getMap(), _2c, _2d); 
}; 
Client.prototype.mapSetProjection = function(nom, tab) {
	DynMapSetProjection(this.getMap(), nom, tab); 
}; 
Client.prototype.mapSetMouseMode = function(_30) {
	switch(_30) {
	case"drag" : DynMapSetMouseMode(this.getMap(), 3); 
	break; 
	case"zoomSel" : DynMapSetMouseMode(this.getMap(), 4); 
	break; 
	case"addLFav" : DynMapSetMouseMode(this.getMap()); 
	break; 
	default : DynMapSetMouseMode(this.getMap(), _30); 
	break; 
	}
}; 
Client.prototype.mapSetMouseCursor = function(_31) {
	DynMapSetMouseCursor(this.getMap(), _31); 
}; 
Client.prototype.mapFlush = function() {
}; 
Client.prototype.mapAddScaleLayer = function(x, y, div) {
	DynMapAddScaleLayer(this.getMap(), x, y, div); 
}; 
Client.prototype.mapAddGlobalView = function(x, y, _37, _38, _39, _3a, _3b, div, _3d, _3e, _3f) {
	DynMapAddGlobalView(this.getMap(), x, y, _37, _38, _39, _3a, _3b, div, _3d, _3e, _3f); 
}; 
Client.prototype.mapSetGlobalViewRectSize = function(_40, _41) {
	DynMapSetGlobalViewRectSize(DynMapGetGlobalView(this.getMap()), _40, _41); 
}; 
Client.prototype.mapAddScaleEventListener = function(nom, _43) {
	DynMapAddScaleEventListener(this.getMap(), nom, _43); 
}; 
Client.prototype.mapAddMoveEventListener = function(nom, _45) {
	DynMapAddMoveEventListener(this.getMap(), nom, _45); 
}; 
Client.prototype.mapSetScale = function(_46, _47) {
	DynMapSetScale(this.getMap(), _46); 
	if(_47) {
		this.mapRefresh(false); 
	}
}; 
Client.prototype.mapGetScale = function() {
	return DynMapGetScale(this.getMap()); 
}; 
Client.prototype.mapSetMinimumScale = function(_48) {
	DynMapSetMinimumScale(this.getMap(), _48); 
}; 
Client.prototype.mapSetMaximumScale = function(_49) {
	DynMapSetMaximumScale(this.getMap(), _49); 
}; 
Client.prototype.mapCenter = function(x, y, _4c) {
	var _4d = this.mapDegreeToClient(x, y); 
	DynMapCenter(this.getMap(), _4d[0], _4d[1], _4c); 
}; 
Client.prototype.mapGetCenterX = function() {
	var _4e = this.mapClientToDegree(DynMapGetCenterX(this.getMap()), null); 
	return _4e[0]; 
}; 
Client.prototype.mapGetCenterY = function() {
	var _4f = this.mapClientToDegree(null, DynMapGetCenterY(this.getMap())); 
	return _4f[1]; 
}; 
Client.prototype.mapGetDistanceX = function(_50) {
	var _51 = this.mapClientToDegree(DynMapGetDistanceX(this.getMap(), _50), null); 
	return _51[0]; 
}; 
Client.prototype.mapGetDistanceY = function(_52) {
	var _53 = this.mapClientToDegree(null, DynMapGetDistanceY(this.getMap(), _52)); 
	return _53[1]; 
}; 
Client.prototype.mapBrowserGetXposition = function(_54) {
	return DynMapBrowserGetXposition(this.getMap(), _54); 
}; 
Client.prototype.mapBrowserGetYposition = function(_55) {
	return DynMapBrowserGetYposition(this.getMap(), _55); 
}; 
Client.prototype.mapGetLongLat = function(x, y) {
	return DynMapGetLongLat(this.getMap(), x, y); 
}; 
Client.prototype.mapDMStoDegrees = function(_58, _59, _5a, _5b) {
	return DynMapDMStoDegrees(_58, _59, _5a, _5b); 
}; 
Client.prototype.mapDegreesToDMS = function(_5c, _5d) {
	return DynMapFormatDegrees(_5c, _5d); 
}; 
Client.prototype.mapDegreesToDMSD = function(_5e, _5f) {
	return DynMapFormatDegrees(_5e, _5f, 1); 
}; 
Client.prototype.mapClientToRadian = function(x, y) {
	var _62 = DynMapHTCtoRadian(this.getMap(), x, y); 
	return _62; 
}; 
Client.prototype.mapRadianToClient = function(x, y) {
	var _65 = DynMapRadiantoHTC(this.getMap(), x, y); 
	return _65; 
}; 
Client.prototype.mapClientToDegree = function(x, y) {
	var _68 = this.mapClientToRadian(x, y); 
	x = this.mapRadianToDegree(_68[0]); 
	y = this.mapRadianToDegree(_68[1]); 
	return[x, y]; 
}; 
Client.prototype.mapDegreeToClient = function(x, y) {
	x = this.mapDegreeToRadian(x); 
	y = this.mapDegreeToRadian(y); 
	var _6b = this.mapRadianToClient(x, y); 
	return _6b; 
}; 
Client.prototype.mapDegreeToRadian = function(val) {
	return DynMapDegreeToRadian(val); 
}; 
Client.prototype.mapRadianToDegree = function(val) {
	return DynMapRadianToDegree(val); 
}; 
Client.prototype.mapHTCtoDegree = function(x, y) {
	return this.mapClientToDegree(x, y); 
}; 
Client.prototype.mapProject = function(val) {
	return DynMapProject(val); 
}; 
Client.prototype.mapCreateObject = function(x, y, nom, id, _75, _76, _77, img) {
	var _79 = this.mapDegreeToClient(x, y); 
	x = _79[0]; 
	y = _79[1]; 
	return DynMapCreateObject(x, y, nom, id, _75, _76, _77, img); 
}; 
Client.prototype.mapAddObject = function(obj, _7b) {
	if(typeof(_7b) != "undefined") {
		DynMapAddObject(this.getMap(), obj, _7b); 
	}
	else {
		DynMapAddObject(this.getMap(), obj, true); 
	}
}; 
Client.prototype.mapRemoveObject = function(obj) {
	DynMapRemoveObject(this.getMap(), obj); 
}; 
Client.prototype.mapRefreshObject = function() {
	DynMapRefreshObject(this.getMap()); 
}; 
Client.prototype.mapGetpixelXY = function(x, y) {
	DynMapGetPixelXY(this.getMap(), x, y); 
}; 
Client.prototype.mapHideObjectSheet = function() {
	DynMapHideObjectSheet(this.getMap()); 
}; 
Client.prototype.mapShowObjectSheet = function(obj) {
	DynMapShowObjectSheet(this.getMap(), obj); 
}; 
Client.prototype.mapFindLayersObjects = function(obj) {
	DynMapFindLayersObjects(this.getMap(), obj); 
}; 
Client.prototype.mapSheetLayerWinElement = function() {
	DynMapSheetLayerWinElement(this.getMap()); 
}; 
Client.prototype.mapGetBoundingBox = function() {
	return DynMapGetBoundingBox(this.getMap()); 
}; 
Client.prototype.mapGoTo = function(x, y, t, _84, _85) {
	var _86 = this.gestionnaire.carte; 
	if(_86) {
		var z; 
		switch(t) {
		case 1 : z = 6; 
		break; 
		case 2 : z = 3; 
		break; 
		case 3 : z = 8; 
		break; 
		case 4 : z = 1; 
		break; 
		default : z = 6; 
		break; 
		}
		var _88 = __getTerritoireById(__territoire); 
		if(!_88.coordInTerritory(x, y)) {
			_88 = __rechercheTerritoireByCoord(x, y, _86.idCarte); 
			if(_88) {
				_86.outil.changeTerritoire(_86.idCarte, _88, false, _86.outil.centreCarte, _86.idCarte, x, y, z, _84, _85); 
			}
			else {
				alert(i18n["territoirePasGere"]); 
			}
		}
		else {
			_86.outil.centreCarte([_86.idCarte, x, y, z, _84, _85]); 
		}
	}
}; 
Client.prototype.mapGoToServicesIGN = function(x, y, t) {
	var _8c = this.gestionnaire.carte; 
	if(_8c) {
		var z; 
		switch(t) {
		case 1 : z = 6; 
		break; 
		case 2 : z = 3; 
		break; 
		case 3 : z = 8; 
		break; 
		case 4 : z = 1; 
		break; 
		default : z = 9; 
		break; 
		}
		if((document.location.href.indexOf("RechercheGC") >- 1) || (document.location.href.indexOf("visuRechCarto") >- 1)) {
			z = 13; 
		}
		var _8e = __getTerritoireById(__territoire); 
		if(!_8e.coordInTerritory(x, y)) {
			_8e = __rechercheTerritoireByCoordServicesIGN(x, y, _8c.idCarte); 
			if(_8e) {
				_8c.outil.changeTerritoire(_8c.idCarte, _8e, false, _8c.outil.centreCarte, _8c.idCarte, x, y, z); 
			}
			else {
				alert(i18n["territoirePasGere"]); 
			}
		}
		else {
			_8c.outil.centreCarte([_8c.idCarte, x, y, z]); 
		}
	}
}; 
Client.prototype.mapConvertSearchCoord = function(cx, cy, _91) {
	var _92 = _91.toLowerCase(); 
	var _93 = this.gestionnaire.carte; 
	if(_92 != __territoire) {
		_92 = __getTerritoireById(_92); 
		if(_92) {
			_93.client.mapSetProjection(_92.projection[0], _92.projection[1]); 
			var _94 = _93.client.mapRadianToClient(cx, cy); 
			cx = _94[0]; 
			cy = _94[1]; 
			__initProjection(_93.dynMap); 
		}
	}
	else {
		var _94 = _93.client.mapRadianToClient(cx, cy); 
		cx = _94[0]; 
		cy = _94[1]; 
	}
	return[cx, cy]; 
}; 
Client.prototype.mapRecupCoord = function(_95) {
	var _96 = this.gestionnaire.carte; 
	return _96.client.mapDegreeToRadian(_95); 
}; 
Client.prototype.mapCreateLine = function(_97, _98, w, col, _9b) {
	DynMapLayerCreateLine(this.getMap(), _97, _98, w, col, _9b); 
}; 
Client.prototype.mapCreatePolygon = function(_9c, _9d, _9e, _9f, w, col, _a2) {
	DynMapLayerCreatePolygon(_9c, _9d, _9e, _9f, w, col, _a2); 
}; 
Client.prototype.mapAddVectorLayer = function(_a3) {
	return DynMapAddVectorLayer(this.getMap(), _a3); 
}; 
Client.prototype.mapAddDrawingListener = function(_a4, _a5) {
	return DynMapAddDrawingListener(this.getMap(), _a4, _a5); 
}; 
Client.prototype.mapCreateMode = function(_a6, _a7, _a8, _a9, _aa) {
	return DynMapCreateMode(_a6, _a7, _a8, _a9, _aa); 
}; 
Client.prototype.mapAddRasterDynamicLayer = function(_ab, _ac, _ad, _ae) {
	return DynMapAddRasterDynamicLayer(this.getMap(), _ab, _ac, _ad, _ae); 
}; 
Client.prototype.mapElementGetPointsX = function(obj) {
	return DynMapElementGetPointsX(obj); 
}; 
Client.prototype.mapElementGetPointsY = function(obj) {
	return DynMapElementGetPointsY(obj); 
}; 
Client.prototype.mapGetPrecision = function() {
	return DynMapGetPrecision(this.getMap()); 
}; 
Client.prototype.mapElementGetRadius = function(obj) {
	return DynMapElementGetRadius(obj); 
}; 
Client.prototype.getObject = function(_b2) {
	return this.getMap().getFindLayersObjects(_b2); 
}; 
Client.prototype.popupredirectTerritory = function(_b3, _b4, _b5) {
	new Ajax.Updater($("displDialog"), "/aide.do?contextHelp=true&idDoc=" + __idArticles.chgtTerritoireMiller2D, {
		insertion : function(elt, _b7) {
		var tpl = "#{article}<div>"; for(var i = 0; i < 3; i++) {
			tpl += "<div style=\"width:33%;float:left;align:center; text-align: center;\"><div>'" + __getTerritoireById(_b4[i]).nom + "'</div>" + "<div><img alt=\"unchecked\" src=\"/imgs/visu/2D/administrations/minicarte/" + _b4[i] + ".png\"/></div>" + "<div><img id=\"validation" + i + "\" class=\"btOk\" alt=\"" + __i18n_messagesVisu["miller_submit"] + "\" src=\"/imgs/visu/2D/administrations/bt_jyvais.gif\"/></div></div>"; }
		tpl += "</div><p class=barrAction>" + "<img id=\"annulation\" class=\"btOk\" alt=\"" + __i18n_messagesVisu["miller_cancel"] + "\" src=\"/imgs/visu/2D/administrations/bt_jannule.gif\"/>" + "</p>"; $$("#winDialog .firstSubWinTitle .title #spanDialogTitle").first().update("Information"); var _ba = {
				article : _b7}; $(elt).update((new Template(tpl)).evaluate(_ba)); $("validation0").observe("click", function(evt) {
					_b3.XY[0] = __getTerritoireById(_b4[0]).X; _b3.XY[1] = __getTerritoireById(_b4[0]).Y; _b3.chgtTerritoire(_b4[0], _b5); }
				.bindAsEventListener(this)); $("validation1").observe("click", function(evt) {
					_b3.XY[0] = __getTerritoireById(_b4[1]).X; _b3.XY[1] = __getTerritoireById(_b4[1]).Y; _b3.chgtTerritoire(_b4[1], _b5); }
				.bindAsEventListener(this)); $("validation2").observe("click", function(evt) {
					_b3.XY[0] = __getTerritoireById(_b4[2]).X; _b3.XY[1] = __getTerritoireById(_b4[2]).Y; _b3.chgtTerritoire(_b4[2], _b5); }
				.bindAsEventListener(this)); $("annulation").observe("click", function(evt) {
					$("winDialog").addClassName("invisible"); }
				.bindAsEventListener(this)); $("winDialog").removeClassName("invisible"); }
	}
	); 
}; 
var __gc_gestionnaires = new Array(); 
function __getGestionnaireById(_1) {
	return __gc_gestionnaires[_1]; 
}
function GestionnaireCarte(_2, _3) {
	this._logStream = "console"; 
	this._errorStream = "console"; 
	this._debugStream = "console"; 
	this.imagesPath = adressConf.imgPrefix + "/imgs/visu/" + dimension + "/" + currentPortal + "/"; 
	this.logosPath = "/legendes/"; 
	this.legendPath = "/legendes/"; 
	this.s_Constructor(); 
	this.dureeJoursCookies = 365; 
	this._edition = false; 
	if(__getGestionnaireById(_2)) {
		this._error("GestionnaireCarte: un gestionnaire d'identifiant " + _2 + " existe d\xe9j\xe0 !"); 
		return; 
	}
	this.idGestionnaire = _2; 
	if(_3) {
		this.usePOI = _3; 
	}
	this.coucheFondDefaut = ""; 
	this.coucheFond = this.coucheFondDefaut; 
	this.profilDefaut = null; 
	this.thematiqueDefaut = null; 
	this.profilOuThematiqueParDefaut = "profil"; 
	this.profil = null; 
	this.profilCookie = null; 
	this.profilName = null; 
	this.profilsDisponibles = new Array(); 
	this.couchesDisponibles = new Array(); 
	this.idCouchesDisponibles = new Array(); 
	this.nombreModifications = 0; 
	this.nombreModificationsOld = 0; 
	this.maxCouchesAffichables = 0; 
	this.maxCouchesVisibles = 20; 
	this.nbCouchesVisibles = 0; 
	if(!this._valideEtInitXHTML()) {
		this._error("GestionnaireCarte: erreur du code XHTML associe au gestionnaire !"); 
	}
	this.client = new Client(this); 
	__gc_gestionnaires[this.idGestionnaire] = this; 
	this._changeProfilThematiqueObserver = this._changeProfilThematique.bindAsEventListener(this); 
	this.initEventGestionnaire(); 
	return this; 
}
GestionnaireCarte.prototype.flush = function() {
	if(this.client) {
		delete this.client; 
	}
	if(this.carte) {
		this.carte.gestionnaire = null; 
		this.carte = null; 
	}
	this._flushSliders(); 
	if(this.screenModeButtons) {
		for(var _4 in this.screenModeButtons) {
			if(typeof(this.screenModeButtons[_4]) !== "function") {
				this.setDataForScreenMode(_4, "", "", null); 
			}
		}
	}
}; 
GestionnaireCarte.prototype._flushSliders = function() {
	if(this.sliders) {
		for(var is = 0; is < this.sliders.length; is++) {
			this.sliders[is].dispose(); 
			delete this.sliders[is]; 
		}
		delete this.sliders; 
	}
}; 
GestionnaireCarte.prototype.initCouchesEtThemes = function() {
	if(!__gc_gestionnaires[this.idGestionnaire]) {
		this._error("GestionnaireCarte.initCouchesEtThemes: action impossible, ce gestionnaire n'a pas \xe9t\xe9 entierement d\xe9fini !"); 
		return; 
	}
	__initProfils.apply(this); 
	if(!this.profilsDisponibles[this.profil]) {
		this.profil = this.profilThematiqueDefaut(); 
		this.profilCookie = null; 
		this.profilName = null; 
	}
	profilACharger = this.profil; 
	this.s_InitCouchesEtThemes(); 
	this.initCouchesEtThemesEnd(); 
}; 
GestionnaireCarte.prototype.initCouchesEtThemesEnd = function() {
	if(!__propertiesLoaded) {
		setTimeout("__getGestionnaireById('" + this.idGestionnaire + "').initCouchesEtThemesEnd()", 100); 
	}
	else {
		var _6 = document.getElementById(this.idGestionnaire + "_thematiques"); 
		if(_6) {
			this.utiliserThematiques = false; 
			for(var _7 in this.profilsDisponibles) {
				if(this.profilsDisponibles[_7] && (this.profilsDisponibles[_7]["type"] == "thematique")) {
					this.utiliserThematiques = true; 
				}
			}
			var _8 =!window.UnObtrusive.hasClassName(_6, "invisible"); 
			if(_8 && (!this.utiliserThematiques)) {
				this._masqueThematiques(); 
			}
			if((!_8) && this.utiliserThematiques) {
				this._afficheThematiques(); 
			}
		}
		__initCouches.apply(this); 
		__initThemes.apply(this); 
	}
}; 
GestionnaireCarte.prototype.profilThematiqueDefaut = function(_9) {
	var _a = (_9) ? (this.profilOuThematiqueParDefaut == "thematique") : (!window.UnObtrusive.hasClassName(document.getElementById(this.idGestionnaire + "_thematiques"), "invisible")); 
	var _b = (_a) ? this.thematiqueDefaut : this.profilDefaut; 
	return(_b) ? _b : this.profilDefaut; 
}; 
GestionnaireCarte.prototype._valideEtInitXHTML = function() {
	var _c; 
	window.UnObtrusive.applyByClassAndTagName(function(_d) {
		_d.style.display = "block"; }
	, "onlyIfJavaScript", "div", this.idGestionnaire); 
	_c = $(this.idGestionnaire + "_fsProfil"); 
	if(_c) {
		_c.style.display = "none"; 
	}
	_c = $(this.idGestionnaire + "_fsRecherche"); 
	if(_c) {
		_c.style.display = "none"; 
	}
	var _e = this.idGestionnaire; 
	_c = $(this.idGestionnaire + "_Select_profil"); 
	if(_c) {
		var _f = function() {
			var _10 = $(_e + "_Select_profil"); 
			__getGestionnaireById(_e).changeProfil(_10.options[_10.selectedIndex].value); 
		}; 
		Event.observe(_c, "change", _f, false); 
	}
	_c = $(this.idGestionnaire + "_Select_thematique"); 
	if(_c) {
		var _11 = function() {
			var _12 = $(_e + "_Select_thematique"); 
			__getGestionnaireById(_e).changeProfil(_12.options[_12.selectedIndex].value); 
		}; 
		Event.observe(_c, "change", _11, false); 
	}
	return true; 
}; 
GestionnaireCarte.prototype.setDataForScreenMode = function(_13, _14, _15) {
	var _16 = ($$("div").reject(function(e) {
		return e.childOf($("wrapper")); }
	).without($("wrapper")).pluck("id")).toArray(); 
	var _18 = function(_19, _1a) {
		this._log("GestionnaireCarte.switchScreenMode(" + _1a + ") : " + this.screenModeButtons[_1a]["arrayOfDivIdsToHide"]); 
		var div; 
		for(var _1c in this.screenModeButtons[_1a]["arrayOfDivIdsToHide"]) {
			if(typeof(this.screenModeButtons[_1a]["arrayOfDivIdsToHide"][_1c]) !== "function") {
				div = document.getElementById(this.screenModeButtons[_1a]["arrayOfDivIdsToHide"][_1c]); 
				div.style.display = ((!div.style.display) || (div.style.display == "block")) ? "none" : "block"; 
			}
		}
		var _1d = document.getElementById(_1a); 
		if(div.style.display == "block") {
			_1d.alt = "fullScreen"; 
			_1d.src = this.screenModeButtons[_1a]["imgSrcFull"]; 
			_1d.title = __i18n_tools["fullScreenOn"]; 
		}
		else {
			_1d.alt = "normalScreen"; 
			_1d.src = this.screenModeButtons[_1a]["imgSrcNormal"]; 
			_1d.title = __i18n_tools["fullScreenOff"]; 
		}
		this.specialFullScreen(); 
		if(__maximizer) {
			__maximizer.recomputeSize(); 
		}
		Event.stop(_19); 
	}
	.bindAsEventListener(this, _13); 
	var _1e = document.getElementById(_13); 
	if(!_1e) {
		return; 
	}
	if(!this.screenModeButtons) {
		this.screenModeButtons = new Array(); 
	}
	if(this.screenModeButtons[_13]) {
		Event.stopObserving(_1e, "mouseover", function(_1f) {
			var _20 = window.UnObtrusive.eventCaller(_1f); _20.src = _20.src.replace("_off", "_on"); }
		, false); 
		Event.stopObserving(_1e, "mouseout", function(_21) {
			var _22 = window.UnObtrusive.eventCaller(_21); _22.src = _22.src.replace("_on", "_off"); }
		, false); 
		Event.stopObserving(_1e, "click", _18, false); 
	}
	if(!_16) {
		Event.stopObserving(_1e, "mouseover", function(_23) {
			var _24 = window.UnObtrusive.eventCaller(_23); _24.src = _24.src.replace("_off", "_on"); }
		, false); 
		Event.stopObserving(_1e, "mouseout", function(_25) {
			var _26 = window.UnObtrusive.eventCaller(_25); _26.src = _26.src.replace("_on", "_off"); }
		, false); 
		Event.stopObserving(_1e, "click", this.screenModeButtons[_13]["observer"], false); 
		delete this.screenModeButtons[_13]["arrayOfDivIdsToHide"]; 
	}
	else {
		this.screenModeButtons[_13] = new Array(); 
		this.screenModeButtons[_13]["imgSrcFull"] = _14; 
		this.screenModeButtons[_13]["imgSrcNormal"] = _15; 
		this.screenModeButtons[_13]["arrayOfDivIdsToHide"] = _16; 
		this.screenModeButtons[_13]["observer"] = _18; 
	}
	if(this.screenModeButtons[_13]) {
		Event.observe(_1e, "mouseover", function(_27) {
			var _28 = window.UnObtrusive.eventCaller(_27); _28.src = _28.src.replace("_off", "_on"); }
		, false); 
		Event.observe(_1e, "mouseout", function(_29) {
			var _2a = window.UnObtrusive.eventCaller(_29); _2a.src = _2a.src.replace("_on", "_off"); }
		, false); 
		Event.observe(_1e, "click", this.screenModeButtons[_13]["observer"], false); 
	}
}; 
GestionnaireCarte.prototype._log = function(msg) {
	if((typeof(environnement) == "undefined") || (environnement != "prod")) {
		if(this._logStream) {
			if(this._logStream == "console") {
				if((typeof(console) != "undefined") && console.log) {
					console.log("L: " + msg); 
				}
			}
			else {
				alert(msg); 
			}
		}
	}
}; 
GestionnaireCarte.prototype._debug = function(msg) {
	if(this._debugStream) {
		if(this._debugStream == "console") {
			if((typeof(console) != "undefined") && console.debug) {
				console.debug("D: " + msg); 
			}
		}
		else {
			alert(msg); 
		}
	}
}; 
GestionnaireCarte.prototype._error = function(msg) {
	if(this._errorStream) {
		if((this._errorStream == "console") && console && console.warn) {
			console.warn(msg); 
		}
		else {
			alert(msg); 
		}
	}
}; 
GestionnaireCarte.prototype._assertCarte = function(_2e) {
	if(!this.client.getMap()) {
		this._error("GestionnaireCarte : action impossible, aucune carte n'est associee au gestionnaire"); 
		return false; 
	}
	return true; 
}; 
GestionnaireCarte.prototype.setCarte = function(_2f) {
	this.carte = __getCarteById(_2f); 
	if(!this.carte) {
		this._error("GestionnaireCarte.setCarte: carte non definie !"); 
		return false; 
	}
	if(!this._assertCarte()) {
		if(this.carte.gestionnaire) {
			this.carte.gestionnaire = null; 
		}
		this.carte = null; 
		return false; 
	}
	this.poiInterface = (this.usePOI) ? new POIInterface(this.carte) : null; 
	__poi = this.poiInterface; 
	this.carte.gestionnaire = this; 
	return true; 
}; 
GestionnaireCarte.prototype.nouvelleProfondeur = function(_30) {
	if((!this.profondeurMin) && (this.profondeurMin !== 0)) {
		this.profondeurMin = _30; 
		this.profondeurMax = _30; 
		return; 
	}
	if(_30 < this.profondeurMin) {
		this.profondeurMin = _30; 
		return; 
	}
	if(_30 > this.profondeurMax) {
		this.profondeurMax = _30; 
		return; 
	}
}; 
GestionnaireCarte.prototype.getMaximumCouchesAffichables = function() {
	return this.maxCouchesAffichables; 
}; 
GestionnaireCarte.prototype.getMaximumCouchesVisibles = function() {
	return this.maxCouchesVisibles; 
}; 
GestionnaireCarte.prototype.incNombreCouchesVisibles = function() {
	this.nbCouchesVisibles++; 
}; 
GestionnaireCarte.prototype.decNombreCouchesVisibles = function() {
	this.nbCouchesVisibles--; 
}; 
GestionnaireCarte.prototype._depassementSeuilNombreCouchesVisibles = function() {
	var _31 = __i18n_messagesVisu["depassementSeuilNombreCouchesVisibles_title"]; 
	var msg = __i18n_messagesVisu["depassementSeuilNombreCouchesVisibles_message"]; 
	if(__displayDialog) {
		__displayDialog(_31, msg); 
	}
	else {
		this._log(_31 + " - " + msg); 
	}
	return true; 
}; 
GestionnaireCarte.prototype._affichageCouchePonctuelleSansRasterImpossible = function() {
	var _33 = __i18n_messagesVisu["affichagePonctuelsImpossible_title"]; 
	var msg = __i18n_messagesVisu["affichagePonctuelsImpossible_message"]; 
	if(__displayDialog) {
		__displayDialog(_33, msg, null, 5000); 
	}
	else {
		this._log(_33 + " - " + msg); 
	}
	return true; 
}; 
GestionnaireCarte.prototype.getNombreCouchesAffichables = function() {
	return this.client.mapGetRasterLayerNames().length; 
}; 
GestionnaireCarte.prototype.getNombreCouchesVisibles = function() {
	if(!this._assertCarte()) {
		return; 
	}
	var _35 = this.getCouchesVisibles(); 
	return(_35) ? _35.length : 0; 
}; 
GestionnaireCarte.prototype.masqueToutesCouchesAffichables = function() {
	if(!this._assertCarte()) {
		return; 
	}
	var _36 = this.client.mapGetLayerNames(); 
	for(var ica = 0; ica < _36.length; ica++) {
		this.client.mapSetLayerVisibility(this.client.mapGetLayer(_36[ica]), false); 
	}
}; 
GestionnaireCarte.prototype.getProfondeur = function(_38) {
	if(!this._assertCarte()) {
		return; 
	}
	var _39 = 10000; 
	var _3a =- 1; 
	var _3b =- 1; 
	var _3c =- 1; 
	if(this.couchesDisponibles[_38].type === "raster") {
		_39 = this.client.mapGetLayerNumber(this.client.mapGetLayer(_38)); 
		_3a = _39; 
		_3b = _39; 
		_3c = _39; 
	}
	else {
		if(this.couchesDisponibles[_38].type === "poly") {
			var _3d = this.couchesDisponibles[_38].souscouches; 
			for(var isc = 0; isc < _3d.length; isc++) {
				if(_3d[isc].type === "raster") {
					var _3f = this.client.mapGetLayer(_3d[isc].id); 
					var _40 = this.client.mapGetLayerNumber(_3f); 
					if(isc == 0) {
						_3c = _40; 
					}
					if(this.couchesDisponibles[_38].mainSousCouche == _3d[isc]) {
						_3b = _40; 
					}
					if(_40 < _39) {
						_39 = _40; 
					}
					if(_40 > _3a) {
						_3a = _40; 
					}
				}
				else {
					if(_3d[isc].type === "ponctual" || _3d[isc].type === "ponctualkml") {
					}
					else {
						this._error("GestionnaireCarte.getProfondeur : le type de la sous-couche d'identifiant " + _3d[isc].id + " est inconnu, elle est ignor\xe9e"); 
					}
				}
			}
		}
		else {
			this._error("GestionnaireCarte.getProfondeur : le type de la couche d'identifiant " + _38 + " n'est ni raster ni poly"); 
			return; 
		}
	}
	if(_39 == 10000) {
		_39 =- 1; 
	}
	return {
		"profMin" : _39, "profMax" : _3a, "profMain" : _3b, "profZero" : _3c}; 
}; 
GestionnaireCarte.prototype.incProfondeur = function(_41) {
	this.changeProfondeur(_41, 1); 
}; 
GestionnaireCarte.prototype.decProfondeur = function(_42) {
	this.changeProfondeur(_42, - 1); 
}; 
GestionnaireCarte.prototype.changeProfondeur = function(_43, _44) {
	if(!this._assertCarte()) {
		return; 
	}
	var _45 = this.getExistence(_43); 
	if(_45 === false) {
		this._error("GestionnaireCarte.changeSelectionCoucheOpacifiable : action impossible, aucune couche d'identifiant " + _43 + " n'est d\xe9finie"); 
		return; 
	}
	var _46 = this.getVisibilite(_43); 
	if(!_46) {
		this._error("GestionnaireCarte.changeProfondeur : action impossible, couche d'identifiant " + _43 + " non visible"); 
		return; 
	}
	var _47 = this.getProfondeur(_43); 
	var _48 = _47["profMin"]; 
	var _49 = _47["profMax"]; 
	if((_48 + _44 < this.profondeurMin) || (_49 + _44 > this.profondeurMax)) {
		return; 
	}
	var _4a = (_44 < 0) ? _48 : _49; 
	var _4b, _4c; 
	do {
		_4a += _44; 
		_4b = this.idCouchesDisponibles[_4a].idCouche; 
		if(this.idCouchesDisponibles[_4a].idCoucheMere) {
			var _4d = (_44 == 1) ? this.getCoucheMaxProfDansPoly(this.idCouchesDisponibles[_4a].idCoucheMere) : 0; 
			_4b = this.couchesDisponibles[this.idCouchesDisponibles[_4a].idCoucheMere].souscouches[_4d].id; 
		}
		_4c = this.client.mapGetLayer(_4b); 
	}
	while((_4a >= this.profondeurMin) && (_4a <= this.profondeurMax) && (!this.client.mapGetLayerVisibility(_4c))); 
	if((_4a < this.profondeurMin) || (_4a > this.profondeurMax)) {
		return; 
	}
	if(this.idCouchesDisponibles[_4a].idCoucheMere) {
		_4b = this.idCouchesDisponibles[_4a].idCoucheMere; 
	}
	var _4e = this.getProfondeur(_4b); 
	var _4f = _4e["profMin"]; 
	var _50 = _4e["profMax"]; 
	var _51 = _47["profZero"]; 
	var _4a = _4e["profZero"]; 
	var _52 = (_51 == this.couchesDisponibles[_43]["profil"]["profondeurDefaut"]); 
	var _53 = (_4a == this.couchesDisponibles[_4b]["profil"]["profondeurDefaut"]); 
	var _54 = (_4a == this.couchesDisponibles[_43]["profil"]["profondeurDefaut"]); 
	var _55 = (_51 == this.couchesDisponibles[_4b]["profil"]["profondeurDefaut"]); 
	if(_52 != _54) {
		if(_52) {
			this.nombreModifications++; 
		}
		else {
			this.nombreModifications--; 
		}
	}
	if(_53 != _55) {
		if(_53) {
			this.nombreModifications++; 
		}
		else {
			this.nombreModifications--; 
		}
	}
	this._majProfil(); 
	this.InverserProfondeursCouches(_43, _4b, _44); 
	this.client.mapRefresh(true); 
	this.genereEditeur(); 
}; 
GestionnaireCarte.prototype.getCoucheMaxProfDansPoly = function(_56) {
	for(var icd = this.couchesDisponibles[_56]["souscouches"].length - 1; icd >= 0; icd--) {
		if(this.couchesDisponibles[_56]["souscouches"][icd]["type"] !== "ponctual" && this.couchesDisponibles[_56]["souscouches"][icd]["type"] !== "ponctualkml") {
			return icd; 
		}
	}
	return - 1; 
}; 
GestionnaireCarte.prototype.InverserProfondeursCouches = function(_58, _59, _5a) {
	if(this.couchesDisponibles[_58].type === "raster") {
		if(this.couchesDisponibles[_59].type === "raster") {
			var _5b = this.client.mapGetLayer(_58); 
			var _5c = this.client.mapGetLayerNumber(_5b); 
			var _5d = this.client.mapGetLayer(_59); 
			var _5e = this.client.mapGetLayerNumber(_5d); 
			this.client.mapSetLayerNumber(_5b, _5e); 
			this.idCouchesDisponibles[_5e].idCouche = _58; 
			this.client.mapSetLayerNumber(_5d, _5c); 
			this.idCouchesDisponibles[_5c].idCouche = _59; 
		}
		else {
			if(this.couchesDisponibles[_59].type === "poly") {
				this.InverserProfondeurRasterPoly(_58, _59, _5a); 
			}
		}
	}
	else {
		if(this.couchesDisponibles[_58].type === "poly") {
			if(this.couchesDisponibles[_59].type === "raster") {
				this.InverserProfondeurRasterPoly(_59, _58, ( - 1) * _5a); 
			}
			else {
				if(this.couchesDisponibles[_59].type === "poly") {
					this.InverserProfondeurPolyPoly(_58, _59, _5a); 
				}
			}
		}
	}
}; 
GestionnaireCarte.prototype.setProfondeur = function(_5f, _60) {
	var _61 = this.couchesDisponibles[_5f].type; 
	if(_61 === "raster") {
		this.client.mapSetLayerNumberById(_5f, _60); 
	}
	else {
		if(_61 === "poly") {
			this.setProfondeurPoly(_5f, _60); 
		}
		else {
			if(_61 === "ponctual" || _61 === "ponctualkml") {
			}
		}
	}
}; 
GestionnaireCarte.prototype.setProfondeurPoly = function(_62, _63) {
	var _64 = this.client.mapGetLayer(this.couchesDisponibles[_62].souscouches[0].id); 
	var _65 = this.client.mapGetLayerNumber(_64); 
	var _66 = _63 - _65; 
	for(ic = 0; ic < this.couchesDisponibles[_62].souscouches.length; ic++) {
		if(this.couchesDisponibles[_62].souscouches[ic].type === "raster") {
			var _67 = this.client.mapGetLayer(this.couchesDisponibles[_62].souscouches[ic].id); 
			_65 = this.client.mapGetLayerNumber(_67); 
			this.client.mapSetLayerNumber(_67, Number(_65) + _66); 
		}
	}
}; 
GestionnaireCarte.prototype.InverserProfondeurPolyPoly = function(_68, _69, _6a) {
	var _6b = _69; 
	if(_6a > 0) {
		_69 = _68; 
		_68 = _6b; 
	}
	var tmp = new Array(); 
	for(var ii = 0; ii < this.idCouchesDisponibles.length; ii++) {
		tmp[ii] = this.idCouchesDisponibles[ii]; 
	}
	var _6e = this.getCoucheMaxProfDansPoly(_68); 
	var _6f = this.getCoucheMaxProfDansPoly(_69); 
	var _70 = this.couchesDisponibles[_68].souscouches; 
	var _71 = this.couchesDisponibles[_69].souscouches; 
	var _72 = this.couchesDisponibles[_68].souscouches[0].id; 
	var _73 = this.couchesDisponibles[_69].souscouches[0].id; 
	var _74 = this.couchesDisponibles[_68].souscouches[_6e].id; 
	var _75 = this.couchesDisponibles[_69].souscouches[_6f].id; 
	var _76 = this.client.mapGetLayer(_72); 
	var _77 = this.client.mapGetLayer(_73); 
	var _78 = this.client.mapGetLayer(_74); 
	var _79 = this.client.mapGetLayer(_75); 
	var _7a = this.client.mapGetLayerNumber(_76); 
	var _7b = this.client.mapGetLayerNumber(_77); 
	var _7c = this.client.mapGetLayerNumber(_76) - this.client.mapGetLayerNumber(_79) - 1; 
	var _7d = this.client.mapGetLayerNumber(_77); 
	var _7e = this.client.mapGetLayerNumber(_77) + _6e + 1 + _7c; 
	var _7f = this.client.mapGetLayerNumber(_79); 
	for(var _80 = 0; _80 < _70.length; _80++) {
		if(_70[_80].type !== "ponctual" && _70[_80].type !== "ponctualkml") {
			tmp[_7d + _80] = this.idCouchesDisponibles[_7a + _80]; 
			var _81 = this.client.mapGetLayer(this.couchesDisponibles[_68].souscouches[_80].id); 
			this.client.mapSetLayerNumber(_81, _7d + _80); 
		}
	}
	for(var ici = _7f + 1; ici < _7f + 1 + _7c; ici++) {
		tmp[ici + _6e - _6f] = this.idCouchesDisponibles[ici]; 
		var _83 = this.client.mapGetLayer(this.idCouchesDisponibles[ici].idCouche); 
		this.client.mapSetLayerNumber(_83, ici + _6e - _6f); 
	}
	for(var _84 = 0; _84 < _71.length; _84++) {
		if(_71[_84].type !== "ponctual" && _71[_84].type !== "ponctualkml") {
			tmp[_7e + _84] = this.idCouchesDisponibles[_7b + _84]; 
			var _85 = this.client.mapGetLayer(this.couchesDisponibles[_69].souscouches[_84].id); 
			this.client.mapSetLayerNumber(_85, _7e + _84); 
		}
	}
	this.idCouchesDisponibles = new Array(); 
	for(var _86 = 0; _86 < tmp.length; _86++) {
		this.idCouchesDisponibles[_86] = tmp[_86]; 
	}
}; 
GestionnaireCarte.prototype.InverserProfondeurRasterPoly = function(_87, _88, _89) {
	var tmp = new Array(); 
	for(var ii = 0; ii < this.idCouchesDisponibles.length; ii++) {
		tmp[ii] = this.idCouchesDisponibles[ii]; 
	}
	var _8c = this.client.mapGetLayer(_87); 
	var _8d = this.client.mapGetLayerNumber(_8c); 
	if(_89 < 0) {
		var _8e = this.getCoucheMaxProfDansPoly(_88); 
		var _8f = this.couchesDisponibles[_88].souscouches[0].id; 
		var _90 = this.client.mapGetLayer(_8f); 
		var _91 = this.client.mapGetLayerNumber(_90); 
		var _8d = this.client.mapGetLayerNumber(_8c); 
		var _92 = _8d - 1 - _91 - _8e; 
		tmp[_91] = this.idCouchesDisponibles[_8d]; 
		this.client.mapSetLayerNumber(_8c, _91); 
		for(var _93 = _91 + _92 + 1, ic = 0; ic < this.couchesDisponibles[_88].souscouches.length; ic++) {
			if(this.couchesDisponibles[_88].souscouches[ic].type !== "ponctual" && this.couchesDisponibles[_88].souscouches[ic].type !== "ponctualkml") {
				tmp[_93] = this.idCouchesDisponibles[_91 + ic]; 
				var _95 = this.client.mapGetLayer(this.couchesDisponibles[_88].souscouches[ic].id); 
				this.client.mapSetLayerNumber(_95, _93); 
				_93++; 
			}
		}
		for(var icd = _91 + _8e + 1; icd < _91 + _8e + 1 + _92; icd++) {
			tmp[icd - _8e] = this.idCouchesDisponibles[icd]; 
			var _97 = this.client.mapGetLayer(this.idCouchesDisponibles[icd].idCouche); 
			this.client.mapSetLayerNumber(_97, icd - _8e); 
		}
	}
	else {
		var _8e = this.getCoucheMaxProfDansPoly(_88); 
		var _98 = this.couchesDisponibles[_88].souscouches[_8e].id; 
		var _99 = this.client.mapGetLayer(_98); 
		var _9a = this.client.mapGetLayerNumber(_99); 
		var _92 = this.client.mapGetLayerNumber(_99) - _8e - _8d - 1; 
		var _8d = this.client.mapGetLayerNumber(_8c); 
		for(var _93 = _8d, ic = 0; ic < this.couchesDisponibles[_88].souscouches.length; ic++) {
			if(this.couchesDisponibles[_88].souscouches[ic].type !== "ponctual" && this.couchesDisponibles[_88].souscouches[ic].type !== "ponctualkml") {
				tmp[_93] = this.idCouchesDisponibles[_9a - _8e + ic]; 
				var _95 = this.client.mapGetLayer(this.couchesDisponibles[_88].souscouches[ic].id); 
				this.client.mapSetLayerNumber(_95, _93); 
				_93++; 
			}
		}
		tmp[_9a] = this.idCouchesDisponibles[_8d]; 
		this.client.mapSetLayerNumber(_8c, _9a); 
		for(var icd = _8d + 1; icd < _8d + 1 + _92; icd++) {
			tmp[icd + _8e] = this.idCouchesDisponibles[icd]; 
			var _97 = this.client.mapGetLayer(this.idCouchesDisponibles[icd].idCouche); 
			this.client.mapSetLayerNumber(_97, icd + _8e); 
		}
	}
	this.idCouchesDisponibles = new Array(); 
	for(var _9b = 0; _9b < tmp.length; _9b++) {
		this.idCouchesDisponibles[_9b] = tmp[_9b]; 
	}
}; 
GestionnaireCarte.prototype._majProfil = function() {
	if(!(((this.nombreModifications != 0) && (this.nombreModificationsOld == 0)) || ((this.nombreModifications == 0) && (this.nombreModificationsOld != 0)))) {
		return; 
	}
	this.nombreModificationsOld = this.nombreModifications; 
	var _9c = document.getElementById(this.idGestionnaire + "_Select_profil"); 
	var _9d; 
	if((this.nombreModifications == 0) || (!this.profilCookie)) {
		var _9e = (this.nombreModifications == 0) ? "profil-modifie" : this.profil; 
		for(var is = 0; is < _9c.options.length; is++) {
			if(_9c.options[is].value == _9e) {
				_9d = is; 
				break; 
			}
		}
	}
	else {
		for(var is = 0; is < _9c.options.length; is++) {
			if(_9c.options[is].value.substring(7, _9c.options[is].value.length) == this.profilCookie) {
				_9d = is; 
				break; 
			}
		}
	}
	if(typeof(_9d) !== "undefined") {
		if(this.nombreModifications) {
			_9c.options[_9c.options.length] = new Option(i18n_layers["profil_personnalise"], "profil-modifie", false, true); 
		}
		else {
			_9c.options[_9d] = null; 
			if(this.profilCookie) {
				for(var is = 0; is < _9c.options.length; is++) {
					if(_9c.options[is].value.substring(7, _9c.options[is].value.length) == this.profilCookie) {
						_9c.options[is].selected = true; 
						break; 
					}
				}
			}
			else {
				for(var is = 0; is < _9c.options.length; is++) {
					if(_9c.options[is].value == this.profil) {
						_9c.options[is].selected = true; 
						break; 
					}
				}
			}
		}
	}
}; 
GestionnaireCarte.prototype.getOpacite = function(_a0) {
	if(!this._assertCarte()) {
		return; 
	}
	if(this.couchesDisponibles[_a0]["type"] === "raster") {
		var _a1 = this.client.mapGetLayer(_a0); 
		if(!_a1) {
			this._error("GestionnaireCarte.getOpacite : action impossible, aucune couche d'identifiant " + _a0 + " n'est d\xe9finie"); 
			return; 
		}
		return(_a1) ? this.client.mapGetLayerOpacity(_a1) : 0; 
	}
	else {
		if(this.couchesDisponibles[_a0]["type"] === "poly") {
			var _a2 = this.couchesDisponibles[_a0]["idMainSousCouche"]; 
			var _a3 = this.client.mapGetLayer(_a2); 
			return(_a3) ? this.client.mapGetLayerOpacity(_a3) : 0; 
		}
		else {
			if(this.couchesDisponibles[_a0]["type"] === "ponctual" || this.couchesDisponibles[_a0]["type"] === "ponctualkml") {
				return 100; 
			}
			else {
				this._error("GestionnaireCarte.getOpacite : action impossible, le type de la couche d'identifiant " + _a0 + " n'est ni raster ni poly"); 
			}
		}
	}
}; 
GestionnaireCarte.prototype.setOpacite = function(_a4, _a5) {
	if(!this._assertCarte()) {
		return; 
	}
	if((_a5 < 0) || (_a5 > 100)) {
		return; 
	}
	var _a6 = this.couchesDisponibles[_a4].type; 
	var _a7 = this.getExistence(_a4); 
	if(_a7 === false) {
		this._error("GestionnaireCarte.changeSelectionCoucheOpacifiable : action impossible, aucune couche d'identifiant " + _a4 + " n'est d\xe9finie"); 
		return; 
	}
	if(_a6 === "raster") {
		var _a8 = this.client.mapGetLayer(_a4); 
	}
	else {
		if(_a6 === "poly") {
			var _a8 = this.client.mapGetLayer(this.couchesDisponibles[_a4].idMainSousCouche); 
		}
		else {
			if(_a6 === "ponctual" || _a6 === "ponctualkml") {
			}
			else {
				this._error("GestionnaireCarte.setOpacite : action impossible, le type de la couche d'identifiant " + _a4 + " n'est ni raster ni poly ni ponctuelle"); 
				return; 
			}
		}
	}
	var _a9 = this.getOpacite(_a4); 
	if(_a5 == _a9 && _a6 !== "poly") {
		return; 
	}
	var _aa = (_a9 == this.couchesDisponibles[_a4]["profil"]["opaciteDefaut"]); 
	var _ab = (_a5 == this.couchesDisponibles[_a4]["profil"]["opaciteDefaut"]); 
	if(_aa != _ab) {
		if(_aa) {
			this.nombreModifications++; 
		}
		else {
			this.nombreModifications--; 
		}
		this._majProfil(); 
	}
	if(_a6 === "raster") {
		this.client.mapSetLayerOpacity(_a8, _a5); 
	}
	else {
		if(_a6 === "poly") {
			var _ac = this.couchesDisponibles[_a4]["souscouches"].length; 
			for(var i = 0; i < _ac; i++) {
				idSousCouche = this.couchesDisponibles[_a4]["souscouches"][i]["id"]; 
				if(this.couchesDisponibles[_a4]["souscouches"][i]["type"] === "raster") {
					if(idSousCouche == this.couchesDisponibles[_a4]["idMainSousCouche"]) {
						this.client.mapSetLayerOpacity(_a8, _a5); 
					}
					else {
						var _ae = this.client.mapGetLayer(idSousCouche); 
						var _af = this.couchesDisponibles[_a4]["souscouches"][i]["profil"]["ratioopacite"]; 
						var _b0 = this.couchesDisponibles[_a4]["souscouches"][i]["profil"]["opacitefixe"]; 
						if(_b0) {
							if(_a5 == 0) {
								this.client.mapSetLayerOpacity(_ae, 0); 
							}
							else {
								this.client.mapSetLayerOpacity(_ae, _af); 
							}
						}
						else {
							this.client.mapSetLayerOpacity(_ae, Math.round(_a5 * _af)); 
						}
					}
				}
				else {
					if(this.couchesDisponibles[_a4]["souscouches"][i]["type"] === "poly") {
					}
					else {
						if(this.couchesDisponibles[_a4]["souscouches"][i]["type"] === "ponctual" || this.couchesDisponibles[_a4]["souscouches"][i]["type"] === "ponctualkml") {
						}
					}
				}
			}
		}
	}
}; 
GestionnaireCarte.prototype.setOpaciteCarte = function(_b1, _b2) {
	this.setOpacite(_b1, _b2); 
}; 
GestionnaireCarte.prototype.setCoucheFond = function(_b3, _b4, _b5) {
	if(!this._assertCarte()) {
		return; 
	}
	var _b6 = this.client.mapGetLayer(_b4); 
	if(!_b6) {
		this._error("GestionnaireCarte.setCoucheFond : action impossible, aucune couche d'identifiant " + _b4 + " n'est d\xe9finie"); 
		return; 
	}
	var _b7 = this.client.mapGetLayerVisibility(_b6); 
	if(_b7) {
		return; 
	}
	document.getElementById(this.idGestionnaire + "_" + _b3 + "Couche" + _b4 + "ImageRadio").src = this.imagesPath + "selected.gif"; 
	document.getElementById(this.idGestionnaire + "_" + _b3 + "Couche" + this.coucheFond + "ImageRadio").src = this.imagesPath + "unselected.gif"; 
	var _b8 = (this.coucheFond == this.coucheFondDefaut); 
	var _b9 = (_b4 == this.coucheFondDefaut); 
	if(_b8 != _b9) {
		if(_b8) {
			this.nombreModifications++; 
		}
		else {
			this.nombreModifications--; 
		}
		this._majProfil(); 
	}
	this.client.mapSetLayerVisibility(this.client.mapGetLayer(this.coucheFond), false); 
	this.coucheFond = _b4; 
	this.client.mapSetLayerVisibility(this.client.mapGetLayer(_b4), true); 
	document.getElementById(this.idGestionnaire + "_CouchesVisiblesFond").innerHTML = _b5; 
	this.client.mapRefresh(true); 
}; 
GestionnaireCarte.prototype.setCoucheEditable = function(_ba) {
	if(!this._assertCarte()) {
		return; 
	}
	var _bb = this.client.mapGetLayer(_ba); 
	if(!_bb) {
		this._error("GestionnaireCarte.setCoucheEditable : action impossible, aucune couche d'identifiant " + _ba + " n'est d\xe9finie"); 
		return; 
	}
	var _bc = this.client.mapGetLayerOpacity(_bb); 
	var _bd = document.getElementById(this.idGestionnaire + "_alpha" + _ba); 
	for(var is = 0; is < _bd.length; is++) {
		if(_bd.options[is].value == _bc) {
			_bd.options[is].selected = true; 
		}
	}
}; 
GestionnaireCarte.prototype.setCoucheEditableCarte = function(_bf) {
	if(!this._assertCarte()) {
		return; 
	}
	this.setCoucheEditable(_bf); 
	var _c0 = this.client.mapGetLayer(_bf); 
	if(!_c0) {
		this._error("GestionnaireCarte.setCoucheEditableCarte : action impossible, aucune couche d'identifiant " + _bf + " n'est d\xe9finie"); 
		return; 
	}
	var _c1 = this.client.mapGetLayerOpacity(_c0); 
	var _c2 = document.getElementById(this.idGestionnaire + "_alpha" + _bf); 
	for(var is = 0; is < _c2.length; is++) {
		if(_c2.options[is].value == _c1) {
			_c2.options[is].selected = true; 
		}
	}
}; 
GestionnaireCarte.prototype.changeSelectionCouchePonctuelle = function(_c4, _c5) {
	if(!this._assertCarte()) {
		return; 
	}
	if((!this.poiInterface) || (!this.poiInterface.getObjectManager())) {
		return; 
	}
	var _c6; 
	for(var ict = this.profondeurMax; ict >= this.profondeurMin; ict--) {
		if(this.getVisibilite(this.idCouchesDisponibles[ict].idCouche, this.idCouchesDisponibles[ict].idCoucheMere, this.idCouchesDisponibles[ict].indexSousCouche)) {
			_c6 = this.idCouchesDisponibles[ict].idCouche; 
			break; 
		}
	}
	if(!_c6) {
		if(!_c8) {
			this._affichageCouchePonctuelleSansRasterImpossible(); 
		}
		return; 
	}
	var _c9 = this.poiInterface.getObjectManager().identifiantsCouchesPonctuellesVisibles; 
	var _c8 = false; 
	var _ca = _c5; 
	if(this.couchesDisponibles[_c5]["type"] == "poly") {
		_ca = this.couchesDisponibles[_c5]["idMainSousCouche"]; 
	}
	for(var _cb = 0; _cb < _c9.length; _cb++) {
		if(_c9[_cb] === _ca) {
			_c8 = true; 
		}
	}
	var img = null; 
	if(_c4) {
		img = document.getElementById(this.idGestionnaire + "_" + _c4 + "Couche" + _c5 + "ImageCheck"); 
	}
	else {
		var _cd = this.getThemesObjects(); 
		for(var it = 0; (!img) && (it < _cd.length); it++) {
			img = document.getElementById(_cd[it].id + "Couche" + _c5 + "ImageCheck"); 
		}
	}
	if(img) {
		if(_c8) {
			img.alt = "unchecked"; 
			img.src = this.imagesPath + "checkNone.gif"; 
		}
		else {
			img.alt = "checked"; 
			img.src = this.imagesPath + "checkOne.gif"; 
			if(this.couchesDisponibles[_c5]["POIversion2"] != true) {
				var _cf = (this.couchesDisponibles[_c5]["fichierCSS"]) ? this.couchesDisponibles[_c5]["fichierCSS"] : "/styles/window/geoportail_bull.css"; 
				var _d0 = document.getElementsByTagName("link"); 
				var _d1 = false; 
				for(var i = 0; i < _d0.length; ++i) {
					if(_d0[i].getAttribute("href") == _cf) {
						_d1 = true; 
					}
				}
				if(!_d1) {
					var _d3 = document.getElementsByTagName("head").item(0); 
					var _d4 = document.createElement("link"); 
					_d4.setAttribute("media", "screen"); 
					_d4.setAttribute("type", "text/css"); 
					_d4.setAttribute("href", _cf); 
					_d4.setAttribute("rel", "stylesheet"); 
					_d3.appendChild(_d4); 
				}
			}
			else {
				this.chargementCSSCouchePonctuelle(_c5); 
			}
		}
		if(!_c8 == this.couchesDisponibles[_c5]["profil"]["visibiliteDefaut"]) {
			this.nombreModifications--; 
		}
		else {
			this.nombreModifications++; 
		}
		this._majProfil(); 
	}
	if(!_c8) {
		if(this.couchesDisponibles[_c5]["type"] == "ponctual") {
			this.poiInterface.getObjectManager().addLayer(_c5, this.couchesDisponibles[_c5]["idCoucheGCIS"], ((this.couchesDisponibles[_c5]["popupSize"]) ? this.couchesDisponibles[_c5]["popupSize"]["maxWidth"] : 0), ((this.couchesDisponibles[_c5]["popupSize"]) ? this.couchesDisponibles[_c5]["popupSize"]["maxHeight"] : 0), this.couchesDisponibles[_c5]["fichierCSS"], this.couchesDisponibles[_c5]["POIversion2"], this.couchesDisponibles[_c5]["prefixeBulle"]); 
			var _d5 = this.client.mapGetLayer(_c6); 
			if(_d5) {
				this.client.mapLayerRefresh(_d5, true); 
			}
			if(is3D) {
				this.client.mapSetPonctualLayerVisibility(_c5, true); 
			}
		}
		else {
			if(this.couchesDisponibles[_c5]["type"] == "ponctualkml") {
				this.poiInterface.getObjectManager().addLayerKml(_c5, this.couchesDisponibles[_c5]["urlGCIS"], this.couchesDisponibles[_c5]["minScale"], this.couchesDisponibles[_c5]["maxScale"], ((this.couchesDisponibles[_c5]["popupSize"]) ? this.couchesDisponibles[_c5]["popupSize"]["maxWidth"] : ""), ((this.couchesDisponibles[_c5]["popupSize"]) ? this.couchesDisponibles[_c5]["popupSize"]["maxHeight"] : "")); 
				var _d5 = this.client.mapGetLayer(_c6); 
				if(_d5) {
					this.client.mapLayerRefresh(_d5, true); 
				}
			}
		}
	}
	else {
		if(this.couchesDisponibles[_c5]["type"] == "ponctual") {
			this.poiInterface.getObjectManager().removeLayer(_c5, this.couchesDisponibles[_c5]["idCoucheGCIS"]); 
			if(is3D) {
				this.client.mapSetPonctualLayerVisibility(_c5, false); 
			}
		}
		else {
			if(this.couchesDisponibles[_c5]["type"] == "ponctualkml") {
				this.poiInterface.getObjectManager().removeLayerKml(_c5); 
			}
			else {
				if(this.couchesDisponibles[_c5]["type"] == "poly") {
					if(this.couchesDisponibles[_c5]["mainSousCouche"]["type"] == "ponctual") {
						for(var cpt = 0; cpt < this.couchesDisponibles[_c5]["souscouches"].length; cpt++) {
							var _d7 = this.couchesDisponibles[_c5]["souscouches"][cpt]; 
							this.poiInterface.getObjectManager().removeLayer(_d7["id"], _d7["idCoucheGCIS"]); 
						}
					}
					else {
						if(this.couchesDisponibles[_c5]["mainSousCouche"]["type"] == "ponctualkml") {
							for(var cpt = 0; cpt < this.couchesDisponibles[_c5]["souscouches"].length; cpt++) {
								var _d7 = this.couchesDisponibles[_c5]["souscouches"][cpt]; 
								this.poiInterface.getObjectManager().removeLayerKml(_d7["id"]); 
							}
						}
					}
				}
			}
		}
	}
	this.genereEditeur(); 
	if(!is3D) {
		setTimeout("__getGestionnaireById('" + this.idGestionnaire + "').carte.dynMap.moveMap(0, 0, null)", 50); 
	}
}; 
GestionnaireCarte.prototype.changeSelectionCoucheOpacifiable = function(_d8, _d9) {
	var _da = this.couchesDisponibles[_d9]["type"]; 
	if(!this._assertCarte()) {
		return; 
	}
	var _db = this.getExistence(_d9); 
	if(_db === false) {
		this._error("GestionnaireCarte.changeSelectionCoucheOpacifiable : action impossible, aucune couche d'identifiant " + _d9 + " n'est d\xe9finie"); 
		return; 
	}
	var _dc = this.getVisibilite(_d9); 
	if(this.couchesDisponibles[_d9]["type"] == "poly" && (this.couchesDisponibles[_d9]["mainSousCouche"]["type"] == "ponctual" || this.couchesDisponibles[_d9]["mainSousCouche"]["type"] == "ponctualkml")) {
		if(this.getNombreCouchesVisibles() == 0) {
			for(var cpt = this.getCouchesPonctuelles().length - 1; cpt >= 0; cpt--) {
				this.changeSelectionCouchePonctuelle("", this.getCouchesPonctuelles()[cpt]["id"]); 
			}
			this._affichageCouchePonctuelleSansRasterImpossible(); 
		}
	}
	else {
		if(_dc && (this.getNombreCouchesVisibles() == 1) && (this.getCouchesPonctuelles().length != 0)) {
			for(var cpt = this.getCouchesPonctuelles().length - 1; cpt >= 0; cpt--) {
				this.changeSelectionCouchePonctuelle("", this.getCouchesPonctuelles()[cpt]["id"]); 
			}
			this._affichageCouchePonctuelleSansRasterImpossible(); 
		}
		if(_dc) {
			this.decNombreCouchesVisibles(); 
		}
		else {
			if(this.getMaximumCouchesVisibles() && (this.getNombreCouchesVisibles() == this.getMaximumCouchesVisibles())) {
				if(!this._depassementSeuilNombreCouchesVisibles()) {
					this._error("GestionnaireCarte.changeSelectionCoucheOpacifiable : action impossible, le nombre maximum de couches est d\xe9j\xe0 atteint"); 
					return; 
				}
			}
			this.incNombreCouchesVisibles(); 
		}
	}
	var img = null; 
	if(_d8) {
		img = document.getElementById(this.idGestionnaire + "_" + _d8 + "Couche" + _d9 + "ImageCheck"); 
	}
	else {
		var _df = this.getThemesObjects(); 
		for(var it = 0; (!img) && (it < _df.length); it++) {
			img = document.getElementById(_df[it].id + "Couche" + _d9 + "ImageCheck"); 
		}
	}
	if(img) {
		if(_dc) {
			img.alt = "unchecked"; 
			img.src = this.imagesPath + "checkNone.gif"; 
		}
		else {
			img.alt = "checked"; 
			img.src = this.imagesPath + "checkOne.gif"; 
		}
		if(!_dc == this.couchesDisponibles[_d9]["profil"]["visibiliteDefaut"]) {
			this.nombreModifications--; 
		}
		else {
			this.nombreModifications++; 
		}
		this._majProfil(); 
	}
	if(_da === "raster") {
		var _e1 = this.client.mapGetLayer(_d9); 
		this.client.mapSetLayerVisibility(this.client.mapGetLayer(_d9), !_dc); 
		this.setOpacite(_d9, this.carte.gestionnaire.couchesDisponibles[_d9].profil.opaciteDefaut); 
		this.client.mapLayerRefresh(_e1, true); 
	}
	else {
		if(_da === "poly" || _da === "ponctual" || _da === "ponctualkml") {
			this.setVisibilite(_d9, !_dc); 
			this.setOpacite(_d9, this.carte.gestionnaire.couchesDisponibles[_d9].profil.opaciteDefaut); 
		}
	}
	this.genereEditeur(); 
}; 
GestionnaireCarte.prototype.changeSelectionCoucheTlf = function(_e2, _e3) {
	var _e4 = this.couchesDisponibles[_e3]["type"]; 
	if(!this._assertCarte()) {
		return; 
	}
	var _e5 = this.getExistence(_e3); 
	if(_e5 === false) {
		this._error("GestionnaireCarte.changeSelectionCoucheOpacifiable : action impossible, aucune couche d'identifiant " + _e3 + " n'est d\xe9finie"); 
		return; 
	}
	var _e6 = this.getVisibilite(_e3); 
	if(_e6) {
		this.decNombreCouchesVisibles(); 
	}
	else {
		if(this.getMaximumCouchesVisibles() && (this.getNombreCouchesVisibles() == this.getMaximumCouchesVisibles())) {
			if(!this._depassementSeuilNombreCouchesVisibles()) {
				this._error("GestionnaireCarte.changeSelectionCoucheOpacifiable : action impossible, le nombre maximum de couches est d\xe9j\xe0 atteint"); 
				return; 
			}
		}
		this.incNombreCouchesVisibles(); 
	}
	var img = null; 
	if(_e2) {
		img = document.getElementById(this.idGestionnaire + "_" + _e2 + "Couche" + _e3 + "ImageCheck"); 
	}
	else {
		var _e8 = this.getThemesObjects(); 
		for(var it = 0; (!img) && (it < _e8.length); it++) {
			img = document.getElementById(_e8[it].id + "Couche" + _e3 + "ImageCheck"); 
		}
	}
	if(img) {
		if(_e6) {
			img.alt = "unchecked"; 
			img.src = this.imagesPath + "checkNone.gif"; 
		}
		else {
			img.alt = "checked"; 
			img.src = this.imagesPath + "checkOne.gif"; 
		}
		if(!_e6 == this.couchesDisponibles[_e3]["profil"]["visibiliteDefaut"]) {
			this.nombreModifications--; 
		}
		else {
			this.nombreModifications++; 
		}
		this._majProfil(); 
	}
	var _ea = this.client.mapGetLayer(_e3); 
	this.client.mapSetLayerVisibility(this.client.mapGetLayer(_e3), !_e6); 
	this.client.mapLayerRefresh(_ea, true); 
	this.genereEditeur(); 
}; 
GestionnaireCarte.prototype.getExistence = function(_eb) {
	if(typeof(this.couchesDisponibles[_eb]) === "undefined") {
		return false; 
	}
	if(typeof(this.couchesDisponibles[_eb].existe) == "undefined") {
		if(this.couchesDisponibles[_eb].type === "poly") {
			var _ec = true; 
			var _ed = this.couchesDisponibles[_eb].souscouches; 
			for(var i = 0; _ec && i < _ed.length; i++) {
				_ec &= _ed[i].existe; 
			}
			this.couchesDisponibles[_eb].existe = _ec; 
		}
		else {
			if(this.carte.gestionnaire.couchesDisponibles[_eb].type === "raster") {
				this.couchesDisponibles[_eb].existe = (this.client.mapGetLayer(_eb) != null); 
			}
		}
	}
	return this.couchesDisponibles[_eb].existe; 
}; 
GestionnaireCarte.prototype.getCoucheDataTab = function(_ef, _f0, _f1) {
	var _f2 = (_f0) ? this.couchesDisponibles[_f0]["souscouches"] : this.couchesDisponibles[_ef]; 
	if(_f0) {
		if((typeof(_f1) != "undefined") && (_f1 < _f2.length)) {
			_f2 = _f2[_f1]; 
		}
		else {
			for(var iss = 0; iss < _f2.length; iss++) {
				if(_f2[iss]["id"] === _ef) {
					_f2 = _f2[iss]; 
					break; 
				}
			}
		}
	}
	return _f2; 
}; 
GestionnaireCarte.prototype.getVisibilite = function(_f4, _f5, _f6) {
	var _f7 = this.getCoucheDataTab(_f4, _f5, _f6); 
	if(_f7.type === "raster") {
		var _f8 = this.client.mapGetLayer(_f4); 
		if(_f8) {
			return this.client.mapGetLayerVisibility(_f8); 
		}
	}
	else {
		if(_f7.type === "poly") {
			if(_f7.mainSousCouche.type == "ponctual" || _f7.mainSousCouche.type == "ponctualkml") {
				if((!this.poiInterface) || (!this.poiInterface.getObjectManager())) {
					return false; 
				}
				var _f9 = this.poiInterface.getObjectManager().identifiantsCouchesPonctuellesVisibles; 
				for(var _fa = 0; _fa < _f9.length; _fa++) {
					if(_f9[_fa] === _f7.idMainSousCouche) {
						return true; 
					}
				}
				return false; 
			}
			else {
				var _fb = _f7.idMainSousCouche; 
				var _fc = this.client.mapGetLayer(_fb); 
				if(_fc) {
					return this.client.mapGetLayerVisibility(_fc); 
				}
			}
		}
		else {
			if(_f7.type === "ponctual" || _f7.type === "ponctualkml") {
				if((!this.poiInterface) || (!this.poiInterface.getObjectManager())) {
					return false; 
				}
				var _f9 = this.poiInterface.getObjectManager().identifiantsCouchesPonctuellesVisibles; 
				for(var _fa = 0; _fa < _f9.length; _fa++) {
					if(_f9[_fa] === _f4) {
						return true; 
					}
				}
				return false; 
			}
			else {
				if(_f7.type === "tlf") {
					var _f8 = this.client.mapGetLayer(_f4); 
					if(_f8) {
						return this.client.mapGetLayerVisibility(_f8); 
					}
				}
				else {
					this._log("GestionnaireCarte.getVisibilite : le type de la couche d'identifiant " + _f4 + " n'est ni raster ni poly"); 
				}
			}
		}
	}
	return false; 
}; 
GestionnaireCarte.prototype.setVisibilite = function(_fd, _fe, _ff, _100) {
	var _101 = this.getCoucheDataTab(_fd, _ff, _100); 
	if(_101.type === "raster") {
		var _102 = this.client.mapGetLayer(_101.id); 
		this.client.mapSetLayerVisibility(_102, _fe); 
		this.client.mapLayerRefresh(_102, true); 
	}
	else {
		if(_101.type === "poly") {
			for(var i = 0; i < _101.souscouches.length; i++) {
				this.setVisibilite(_101.souscouches[i].id, _fe, _101.id, i); 
			}
		}
		else {
			if(_101.type === "ponctual") {
				if(_fe) {
					this.poiInterface.getObjectManager().addLayer(_101.id, _101.idCoucheGCIS, _101.popupSize.maxWidth, _101.popupSize.maxHeight, _101.fichierCSS, _101.POIversion2, _101.prefixeBulle); 
					this.chargementCSSCouchePonctuelle(_101.id); 
				}
				else {
					this.poiInterface.getObjectManager().removeLayer(_101.id, _101.idCoucheGCIS); 
				}
			}
			else {
				if(_101.type === "ponctualkml") {
					if(_fe) {
						this.poiInterface.getObjectManager().addLayerKml(_101.id, _101.urlGCIS, _101.minScale, _101.maxScale, _101.popupSize.maxWidth, _101.popupSize.maxHeight); 
					}
					else {
						this.poiInterface.getObjectManager().removeLayerKml(_101.id); 
					}
				}
				else {
					if(_101.type === "tlf") {
						var _102 = this.client.mapGetLayer(_101.id); 
						this.client.mapSetLayerVisibility(_102, _fe); 
						this.client.mapLayerRefresh(_102, true); 
					}
					else {
						this._log("GestionnaireCarte.getVisibilite : le type de la couche d'identifiant " + _fd + " n'est ni raster ni poly"); 
					}
				}
			}
		}
	}
}; 
GestionnaireCarte.prototype.chargementCSSCouchePonctuelle = function(_104) {
	var _105 = "/poi/" + _104 + "/CSS/style"; 
	var _106 = document.getElementsByTagName("link"); 
	var _107 = false; 
	for(var i = 0; i < _106.length; ++i) {
		if(_106[i].getAttribute("href") == (_105 + ".css")) {
			_107 = true; 
		}
	}
	if(!_107) {
		var _109 = document.getElementsByTagName("head").item(0); 
		var _10a = document.createElement("link"); 
		_10a.setAttribute("media", "screen"); 
		_10a.setAttribute("type", "text/css"); 
		_10a.setAttribute("href", _105 + ".css"); 
		_10a.setAttribute("rel", "stylesheet"); 
		_109.appendChild(_10a); 
		if(navigator.appName == "Microsoft Internet Explorer") {
			var _10b = parseFloat(navigator.appVersion); 
			if(_10b < 7) {
				var _10a = document.createElement("link"); 
				_10a.setAttribute("media", "screen"); 
				_10a.setAttribute("type", "text/css"); 
				_10a.setAttribute("href", _105 + "ie6.css"); 
				_10a.setAttribute("rel", "stylesheet"); 
				_109.appendChild(_10a); 
			}
			else {
				var _10a = document.createElement("link"); 
				_10a.setAttribute("media", "screen"); 
				_10a.setAttribute("type", "text/css"); 
				_10a.setAttribute("href", _105 + "ie7.css"); 
				_10a.setAttribute("rel", "stylesheet"); 
				_109.appendChild(_10a); 
			}
		}
	}
}; 
GestionnaireCarte.prototype.getCouchesOpacifiables = function() {
	var _10c = new Array(); 
	for(var _10d in this.couchesDisponibles) {
		if(typeof(this.couchesDisponibles[_10d]) !== "function") {
			_10c.push(_10d); 
		}
	}
	return _10c; 
}; 
GestionnaireCarte.prototype.changeDeveloppementTheme = function(_10e, _10f) {
	var _110 = document.getElementById(this.idGestionnaire + "_" + _10e); 
	if(!_110) {
		return; 
	}
	var _111 = _110.getElementsByTagName("ul"); 
	for(var it = 0; it < _111.length; it++) {
		if(_111[it].className.indexOf(_10f) !=- 1) {
			var img = document.getElementById(this.idGestionnaire + "_" + "pldp" + _10e); 
			if(_111[it].style.display == "block") {
				img.alt = "unfold"; 
				img.src = this.imagesPath + "unfold.gif"; 
				_111[it].style.display = "none"; 
			}
			else {
				img.alt = "fold"; 
				img.src = this.imagesPath + "fold.gif"; 
				_111[it].style.display = "block"; 
			}
		}
	}
}; 
GestionnaireCarte.prototype.ouvreTousThemes = function(_114) {
	var _115 = this.getThemesObjects(); 
	if(!_115) {
		return; 
	}
	for(var it = 0; it < _115.length; it++) {
		var _117 = _115[it].getElementsByTagName("ul"); 
		for(var iul = 0; iul < _117.length; iul++) {
			if((!_114) || (_117[iul].className.indexOf(_114) !=- 1)) {
				var img = document.getElementById(this.idGestionnaire + "_" + "pldp" + _115[it].id.substr(this.idGestionnaire.length + 1)); 
				img.alt = "fold"; 
				img.src = this.imagesPath + "fold.gif"; 
				_117[iul].style.display = "block"; 
			}
		}
	}
}; 
GestionnaireCarte.prototype.fermeTousThemes = function(_11a) {
	var _11b = this.getThemesObjects(); 
	if(!_11b) {
		return; 
	}
	for(var it = 0; it < _11b.length; it++) {
		var _11d = _11b[it].getElementsByTagName("ul"); 
		for(var iul = 0; iul < _11d.length; iul++) {
			if((!_11a) || (_11d[iul].className.indexOf(_11a) !=- 1)) {
				var img = document.getElementById(this.idGestionnaire + "_" + "pldp" + _11b[it].id.substr(this.idGestionnaire.length + 1)); 
				img.alt = "unfold"; 
				img.src = this.imagesPath + "unfold.gif"; 
				_11d[iul].style.display = "none"; 
			}
		}
	}
}; 
GestionnaireCarte.prototype._afficheThematiques = function() {
	var _120 = document.getElementById(this.idGestionnaire + "_profils_ou_thematiques"); 
	var _121 = document.getElementById(this.idGestionnaire + "_profils"); 
	var _122 = document.getElementById(this.idGestionnaire + "_thematiques"); 
	if(_120 && _121 && _122) {
		window.UnObtrusive.removeClassNames(_120, "invisible"); 
		window.UnObtrusive.removeClassNames(_121, "invisible"); 
		window.UnObtrusive.addClassNames(_122, "invisible"); 
	}
}; 
GestionnaireCarte.prototype._masqueThematiques = function() {
	var _123 = document.getElementById(this.idGestionnaire + "_profils_ou_thematiques"); 
	var _124 = document.getElementById(this.idGestionnaire + "_profils"); 
	var _125 = document.getElementById(this.idGestionnaire + "_thematiques"); 
	if(_123 && _124 && _125) {
		window.UnObtrusive.addClassNames(_123, "invisible"); 
		window.UnObtrusive.removeClassNames(_124, "invisible"); 
		window.UnObtrusive.addClassNames(_125, "invisible"); 
	}
}; 
GestionnaireCarte.prototype._changeProfilThematique = function() {
	var _126 = document.getElementById(this.idGestionnaire + "_onglet_profil"); 
	var _127 = document.getElementById(this.idGestionnaire + "_onglet_thematique"); 
	var _128 = document.getElementById(this.idGestionnaire + "_profils"); 
	var _129 = document.getElementById(this.idGestionnaire + "_thematiques"); 
	if(window.UnObtrusive.hasClassName(_126, "active")) {
		Event.stopObserving(_127, "click", this._changeProfilThematiqueObserver, false); 
		window.UnObtrusive.removeClassNames(_126, "active"); 
		window.UnObtrusive.addClassNames(_127, "active"); 
		Event.observe(_126, "click", this._changeProfilThematiqueObserver, false); 
		window.UnObtrusive.addClassNames(_128, "invisible"); 
		window.UnObtrusive.removeClassNames(_129, "invisible"); 
		this.changeProfil(this.thematiqueDefaut); 
	}
	else {
		Event.stopObserving(_126, "click", this._changeProfilThematiqueObserver, false); 
		window.UnObtrusive.removeClassNames(_127, "active"); 
		window.UnObtrusive.addClassNames(_126, "active"); 
		Event.observe(_127, "click", this._changeProfilThematiqueObserver, false); 
		window.UnObtrusive.addClassNames(_129, "invisible"); 
		window.UnObtrusive.removeClassNames(_128, "invisible"); 
		this.changeProfil(this.profilDefaut); 
	}
}; 
GestionnaireCarte.prototype.changeProfil = function(_12a) {
	if(this.getNombreCouchesVisibles() == 0) {
		this.carte.outil.setEchelleVisible(0, NBECHELLE); 
	}
	if(document.getElementById("ipSpot")) {
		document.getElementById("ipSpot").selectedIndex = 0; 
	}
	var cg = new ContexteGeographique(this.carte); 
	var ctx = cg.exportCurrentMapToUrlParameters() + "*" + cg.exportCurrentViewToUrlParameters(); 
	var ctxl = ""; 
	if(this.poiInterface) {
		var _12e = new Array(); 
		for(var _12f in this.couchesDisponibles) {
			if(typeof(this.couchesDisponibles[_12f]) !== "function") {
				if(this.couchesDisponibles[_12f]["type"] && (this.couchesDisponibles[_12f]["type"] == "ponctual" || this.couchesDisponibles[_12f]["type"] == "ponctualkml")) {
					var _130 = this.poiInterface.getObjectManager().isVisibleLayer(_12f); 
					if(_130) {
						_12e.push(_12f); 
					}
				}
			}
		}
		for(var icpv = 0; icpv < _12e.length; icpv++) {
			this.poiInterface.getObjectManager().removeLayer(_12e[icpv], this.couchesDisponibles[_12e[icpv]]["idCoucheGCIS"]); 
		}
		this.poiInterface.getObjectManager().clear(); 
	}
	this.client.mapClear(); 
	this.profil = _12a; 
	this.profilCookie = null; 
	this.profilName = null; 
	this.coucheFondDefaut = ""; 
	this.coucheFond = this.coucheFondDefaut; 
	this.profilsDisponibles = new Array(); 
	this.couchesDisponibles = new Array(); 
	this.idCouchesDisponibles = new Array(); 
	this.profondeurMin = null; 
	this.profondeurMax = null; 
	this.nbCouchesVisibles = 0; 
	this.nombreModifications = 0; 
	this.nombreModificationsOld = 0; 
	if(_12a.substring(0, 7) == "cookie-") {
		_12a = _12a.substring(7, _12a.length); 
		var _132 = window.Cookie.load(this.getCookieName() + "-" + _12a); 
		if(!_132) {
			this._error("Profil favori " + _12a + " indisponible"); 
			this.profil = _12a.split("-")[0]; 
		}
		else {
			var _133 = new Codec(); 
			var _134 = new HuffmanCompresseur(); 
			this.profil = _133.decode(_132[1]); 
			this.profilCookie = _12a; 
			var _135 = _133.decode(_132[2]); 
			if(_135 == "1.0") {
				ctxl = "*" + _133.decode(_134.decompresse(_132[3])); 
			}
			else {
				this._error("Version de profil favori non g\xe9r\xe9e, le profil va \xeatre supprim\xe9"); 
				supprimerProfil(_12a); 
			}
		}
	}
	this.carte.gcg.resetParameters(); 
	this.carte.gcg.setParameters(ctx + ctxl, "*", ":"); 
	this.carte.gcg.expandParameters(); 
	this.carte.refreshMap(true); 
	var _136 = this.carte.getEchelle(); 
	this.grisageMaSelection(_136); 
}; 
Affichage_popup = function(_137) {
	window.open(_137, "_blank", config = "height=700, width=670, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, directories=no, status=no"); 
}; 
GestionnaireCarte.prototype._addScaleToLink = function(_138, _139, _13a, _13b, _13c) {
	Affichage_popup(_139 + "?idcouche=" + _13a + "&profil=" + _13b + "&territoire=" + _13c + "&scale=" + this.client.mapGetScale()); 
}; 
GestionnaireCarte.prototype._noDoubleProprietaires = function(tab) {
	var _13e = new Array(); 
	var nd = 0; 
	for(var it = 0; it < tab.length; it++) {
		var _141 = false; 
		for(var ind = 0; (!_141) && (ind < nd); ind++) {
			if(_13e[ind]["logo"] == tab[it]["logo"]) {
				_141 = true; 
			}
		}
		if(!_141) {
			_13e[nd] = new Array(); 
			_13e[nd] = tab[it]; 
			nd++; 
		}
	}
	return _13e; 
}; 
GestionnaireCarte.prototype.getIdCoucheVisibleSuperieure = function(_143) {
	var _144 = this.getCouchesVisibles(); 
	for(var icv = _144.length - 1; icv >= 0; icv--) {
		if(_144[icv]["realMaxScale"] >= _143 && _144[icv].urlGCIS == "") {
			return _144[icv]["id"]; 
		}
	}
	return _144[0]["id"]; 
}; 
GestionnaireCarte.prototype.genereEditeur = function() {
	if(!this._assertCarte()) {
		return; 
	}
	var _146 = this.getCouchesVisibles(); 
	var _147 = this.getCouchesPonctuelles(); 
	var _148 = this.getCouchesTlf(); 
	var _149 = this.getScalesMinMax(_146); 
	this.carte.outil.setEchelleVisible(_149[0], _149[1]); 
	if($("layerBibliCount")) {
		var _14a = 0; 
		for(var id in this.couchesDisponibles) {
			if(typeof(this.couchesDisponibles[id]) != "function") {
				_14a += this.IncNbcouches(id); 
			}
		}
		$("layerBibliCount").innerHTML = _14a; 
		if($("layerBibliMany")) {
			if(_14a > 1) {
				$("layerBibliMany").innerHTML = __i18n_gestionnaireCouches["layers"]; 
			}
			else {
				$("layerBibliMany").innerHTML = __i18n_gestionnaireCouches["layer"]; 
			}
		}
	}
	if($("layerSelectCount")) {
		var _14c = 0; 
		for(var id in _146) {
			if(typeof(_146[id]) != "function") {
				_14c++; 
			}
		}
		for(var id in _147) {
			if(typeof(_147[id]) != "function") {
				_14c++; 
			}
		}
		for(var id in _148) {
			if(typeof(_148[id]) != "function") {
				_14c++; 
			}
		}
		$("layerSelectCount").innerHTML = _14c; 
		if($("layerSelectMany")) {
			if(_14c > 1) {
				$("layerSelectMany").innerHTML = __i18n_gestionnaireCouches["layers"]; 
			}
			else {
				$("layerSelectMany").innerHTML = __i18n_gestionnaireCouches["layer"]; 
			}
		}
	}
	var _14d = $(this.idGestionnaire + "_CouchesVisiblesOpacifiables"); 
	if((_146.length + _147.length) <= 0) {
		_14d.innerHTML = "\n<p>" + __i18n_gestionnaireCouches["noLayer"] + "</p>"; 
		return; 
	}
	else {
		_14d.innerHTML = "\n"; 
	}
	var _14e; 
	var _14f = this.carte.territoire; 
	var _150 = this.carte.getEchelle(); 
	var _151 = (___geoserv) ? this.legendUrlserv : this.legendUrladmin; 
	for(icp = 0; icp < _148.length; icp++) {
		var _152 = ""; 
		if((_150 < _148[icp]["realMinScale"]) || (_150 > _148[icp]["realMaxScale"])) {
			_152 = "class=\"unavailableLayer\""; 
		}
		_14e = "<div class=\"closedControl\">" + "<table>" + "\t<tr>" + "\t\t<td class=\"arrows\"></td>" + "\t\t<td class=\"info\">" + "\t\t \t<img src=\"" + adressConf.imgPrefix + "/imgs/visu/" + dimension + "/" + currentPortal + "/ico_infoCouche.gif\" id=\"" + this.idGestionnaire + "_idLink" + _148[icp]["id"] + "\" class=\"layerInfo\" onclick=\"javascript:__getGestionnaireById('" + this.idGestionnaire + "')._addScaleToLink('" + this.idGestionnaire + "_idLink" + _148[icp]["id"] + "','" + _151 + "','" + _148[icp]["id"] + "','" + this.profil + "','" + _14f + "');\" title=\"" + __i18n_messagesVisu["legende_imgTitle"] + "\" />\n" + "\t\t</td>" + "\t\t<td " + _152 + " id=\"" + this.idGestionnaire + "_ControleCouche" + _148[icp]["id"] + "Text\"><div class=\"layerSelectionName\" title=\"" + __i18n_messagesVisu["legende_title"] + "\">" + this.couchesDisponibles[_148[icp]["id"]]["nom"] + "</div></td>" + "\t\t<td class=\"suppr\"><img title=\"" + __i18n_messagesVisu["delete_layer"] + "\" onclick=\"javascript:__getGestionnaireById('" + this.idGestionnaire + "').changeSelectionCoucheTlf('','" + _148[icp]["id"] + "');\" alt=\"" + __i18n_messagesVisu["delete_layer"] + "\" src=\"" + adressConf.imgPrefix + "/imgs/visu/" + dimension + "/" + currentPortal + "/ico_close.gif\" /></td>" + " \t</tr>" + "</table>" + "</div>"; 
		_14d.innerHTML += _14e; 
	}
	for(icp = 0; icp < _147.length; icp++) {
		var _152 = ""; 
		if((_150 < _147[icp]["realMinScale"]) || (_150 > _147[icp]["realMaxScale"])) {
			_152 = "class=\"unavailableLayer\""; 
		}
		_14e = "<div class=\"closedControl\">" + "<table>" + "\t<tr>" + "\t\t<td class=\"arrows\"></td>" + "\t\t<td class=\"info\">" + "\t\t\t\t<img src=\"" + adressConf.imgPrefix + "/imgs/visu/" + dimension + "/" + currentPortal + "/ico_infoCouche.gif\" id=\"" + this.idGestionnaire + "_idLink" + _147[icp]["id"] + "\" class=\"layerInfo\" onclick=\"javascript:__getGestionnaireById('" + this.idGestionnaire + "')._addScaleToLink('" + this.idGestionnaire + "_idLink" + _147[icp]["id"] + "','" + _151 + "','" + _147[icp]["id"] + "','" + this.profil + "','" + _14f + "');\" title=\"" + __i18n_messagesVisu["legende_imgTitle"] + "\" />\n" + "\t\t</td>" + "\t\t<td " + _152 + " id=\"" + this.idGestionnaire + "_ControleCouche" + _147[icp]["id"] + "Text\"><div class=\"layerSelectionName\" title=\"" + __i18n_messagesVisu["legende_title"] + "\">" + this.couchesDisponibles[_147[icp]["id"]]["nom"] + "</div></td>" + "\t\t<td class=\"suppr\"><img title=\"" + __i18n_messagesVisu["delete_layer"] + "\" onclick=\"javascript:__getGestionnaireById('" + this.idGestionnaire + "').changeSelectionCouchePonctuelle('','" + _147[icp]["id"] + "');\" alt=\"" + __i18n_messagesVisu["delete_layer"] + "\" src=\"" + adressConf.imgPrefix + "/imgs/visu/" + dimension + "/" + currentPortal + "/ico_close.gif\" /></td>" + " \t</tr>" + "</table>" + "</div>"; 
		_14d.innerHTML += _14e; 
	}
	if(this.poiInterface && this.poiInterface.getObjectManager()) {
		if(_146.length <= 0) {
			this.poiInterface.getObjectManager().setLayerReference(null); 
		}
		else {
			var _153 = this.getIdCoucheVisibleSuperieure(this.carte.getEchelle()); 
			if(this.couchesDisponibles[_153]["type"] === "poly") {
				idSousCoucheTop = ""; 
				for(var isc = this.couchesDisponibles[_153]["souscouches"].length - 1; isc >= 0; isc--) {
					if(this.couchesDisponibles[_153]["souscouches"][isc]["type"] !== "ponctual" && this.couchesDisponibles[_153]["souscouches"][isc]["type"] !== "ponctualkml") {
						idSousCoucheTop = this.couchesDisponibles[_153]["souscouches"][isc]["id"]; 
						break; 
					}
				}
				_153 = idSousCoucheTop; 
			}
			var _155 = (_153 != "") ? this.client.mapGetLayer(_153) : null; 
			var _156 = (_155) ? _155.tabName : null; 
			if((!_156) || (_156 != this.poiInterface.getObjectManager().getLayerReference())) {
				this.poiInterface.getObjectManager().setLayerReference(_156); 
				if(_156) {
					this.client.mapLayerRefresh(_155, true); 
				}
			}
		}
	}
	this.s_GenereEditeur(_150, _146, _14d, _14e, _151, _14f); 
	this.grisageMaSelection(_150); 
	this._flushSliders(); 
	this.sliders = new Array(); 
	if(!this.profilsDisponibles[this.profil]["disablecontrols"]) {
		for(var icv = _146.length - 1; icv >= 0; icv--) {
			this.sliders.push(new Control.Slider(this.idGestionnaire + "_alphaCurseur_" + _146[icv]["id"], this.idGestionnaire + "_alphaRegle_" + _146[icv]["id"], {
				axis : "horizontal", alignX : 0, alignY : 0, sliderValue : (_146[icv]["opacite"]/100),handleImage:this.imagesPath+"bg_handle.gif",idCouche:_146[icv]["id"],gestionnaire:this,texte:document.getElementById(this.idGestionnaire+"_alphaTexte_"+_146[icv]["id"]),onChange:function(_158){_158=(_158*100).toFixed();this.texte.innerHTML=_158+"%";this.gestionnaire.setOpacite(this.idCouche,_158);},onSlide:function(_159){_159=(_159*100).toFixed();this.texte.innerHTML=_159+"%";}}));
		}
	}
	this.carte.changeEchelleClient(_150, true); 
	this.displayOwners(); 
	this.updateMaSelection(); 
}; 
GestionnaireCarte.prototype.updateMaSelection = function() {
	var _15a = ($$("div.winMapManager div.visibleLayers div.visibleLayersControls"))[0]; 
	if(_15a.getDimensions().height >= _15a.scrollHeight) {
		$$("div.winMapManager div.visibleLayers div.visibleLayersControls div.openedControl").each(function(e) {
			$(e).style.width = "190px"; }
		); 
		$$("div.winMapManager div.visibleLayers div.visibleLayersControls div.closedControl").each(function(e) {
			$(e).style.width = "190px"; }
		); 
	}
	else {
		$$("div.winMapManager div.visibleLayers div.visibleLayersControls div.openedControl").each(function(e) {
			$(e).style.width = "173px"; }
		); 
		$$("div.winMapManager div.visibleLayers div.visibleLayersControls div.closedControl").each(function(e) {
			$(e).style.width = "173px"; }
		); 
	}
}; 
GestionnaireCarte.prototype.returnOwners = function() {
	var _15f = new Array(); 
	var _160 = 0; 
	for(idCouche in this.couchesDisponibles) {
		if(typeof(this.couchesDisponibles[idCouche]) == "function") {
			continue; 
		}
		var _161 = this.couchesDisponibles[idCouche]; 
		if(this.displayOwnersInit) {
			var _162 = document.getElementById("logosProprietaires"); 
			var _163 = _162.childNodes; 
			for(var i = 0; i < _163.length; i++) {
				if(_163[i].getAttribute("id") != null && _163[i].getAttribute("id").indexOf("logoP_") !=- 1) {
					document.getElementById(_163[i].getAttribute("id")).style.display = "none"; 
				}
			}
			if(!document.getElementById(this.client.gestionnaire.idGestionnaire + "_ControleCouche" + _161.id + "Text")) {
				continue; 
			}
		}
		if(_161["type"] === "poly") {
			var _165 = _161["souscouches"]; 
			for(var isc = 0; isc < _165.length; isc++) {
				if(_165[isc]["proprietaires"]) {
					for(var iscp = 0; iscp < _165[isc]["proprietaires"].length; iscp++) {
						if(typeof(_165[isc]["proprietaires"][iscp]["doNotDisplayOnVisualization"]) == "undefined") {
							_15f[_160] = new Array(); 
							_15f[_160]["logo"] = _165[isc]["proprietaires"][iscp]["logo"]; 
							_15f[_160]["url"] = _165[isc]["proprietaires"][iscp]["url"]; 
							if(_165[isc]["proprietaires"][iscp]["echellemin"] && _165[isc]["proprietaires"][iscp]["echellemax"]) {
								_15f[_160]["echellemin"] = _165[isc]["proprietaires"][iscp]["echellemin"]; 
								_15f[_160]["echellemax"] = _165[isc]["proprietaires"][iscp]["echellemax"]; 
							}
							if(_165[isc]["proprietaires"][iscp]["emprise"]) {
								_15f[_160]["emprise"] = _165[isc]["proprietaires"][iscp]["emprise"]; 
							}
							_160++; 
						}
					}
				}
			}
		}
		else {
			if(_161["proprietaires"]) {
				for(var icvp = 0; icvp < _161["proprietaires"].length; icvp++) {
					if(typeof(_161["proprietaires"][icvp]["doNotDisplayOnVisualization"]) == "undefined") {
						_15f[_160] = new Array(); 
						_15f[_160]["logo"] = _161["proprietaires"][icvp]["logo"]; 
						_15f[_160]["url"] = _161["proprietaires"][icvp]["url"]; 
						if(_161["proprietaires"][icvp]["echellemin"] && _161["proprietaires"][icvp]["echellemax"]) {
							_15f[_160]["echellemin"] = _161["proprietaires"][icvp]["echellemin"]; 
							_15f[_160]["echellemax"] = _161["proprietaires"][icvp]["echellemax"]; 
						}
						if(_161["proprietaires"][icvp]["emprise"]) {
							_15f[_160]["emprise"] = _161["proprietaires"][icvp]["emprise"]; 
						}
						_160++; 
					}
				}
			}
		}
	}
	return _15f; 
}; 
GestionnaireCarte.prototype.displayOwners = function(_169) {
	if(typeof(this.displayOwnersInit) == "undefined") {
		this.displayOwnersInit = false; 
	}
	else {
		if(_169) {
			this.displayOwnersInit = false; 
		}
	}
	var _16a = this.returnOwners(); 
	var div = $("logosProprietaires"); 
	if(!div) {
		return; 
	}
	var _16c = this.carte.getEchelle(); 
	if(!is3D) {
		div.style.cssText = "float:right"; 
	}
	if(!this.displayOwnersInit) {
		var _16d; 
		while((_16d = div.firstChild) != null) {
			div.removeChild(_16d); 
		}
		if(_16a.length > 0) {
			var _16e = new Array(); 
			var _16f = ""; 
			for(var ip = 0; ip < _16a.length; ip++) {
				if(_16e[_16a[ip].logo]) {
					continue; 
				}
				_16e[_16a[ip].logo] = new Array(); 
				_16e[_16a[ip].logo] = _16a[ip]; 
				var logo = ""; 
				var img = new Template("<img id='#{id}' src='#{src}' alt='#{alt}' />").evaluate( {
					id : "logoI_" + _16a[ip]["logo"], src : this.logosPath + "logo_" + _16a[ip]["logo"] + ".gif", alt : _16a[ip]["logo"]}
				); 
				if(_16a[ip]["url"]) {
					logo = new Template("<a href='#{href}' target='_blank' title='" + __i18n_gestionnaireCouches["lienPartenaire"] + "'>#{img}</a>").evaluate( {
						href : _16a[ip]["url"], img : img}
					); 
				}
				else {
					logo = img; 
				}
				var _173 = new Template("<div id='logoP_#{logoid}' style='display:none;'>#{logo}</div>").evaluate( {
					logoid : _16a[ip]["logo"], logo : logo}
				); 
				_16f += _173; 
			}
			div.innerHTML = _16f; 
		}
		else {
			var _16f = ""; 
			var img = new Template("<img id='#{id}' src='#{src}' alt='#{alt}' />").evaluate( {
				id : "logoI_ign", src : this.logosPath + "logo_ign.gif", alt : "ign"}
			); 
			var logo = img; 
			var _173 = new Template("<div id='logoP_#{logoid}' style='display:none;'>#{logo}</div>").evaluate( {
				logoid : "ign", logo : logo}
			); 
			_16f += _173; 
			div.innerHTML = _16f; 
		}
		this.displayOwnersInit = true; 
		_16a = this.returnOwners(); 
	}
	if(_16a.length > 0) {
		var _16e = new Array(); 
		for(var ip = 0; ip < _16a.length; ip++) {
			if(_16a[ip]["emprise"]) {
				if(_16e[_16a[ip].logo]) {
					continue; 
				}
				var _x = this.client.mapGetCenterX(); 
				var _y = this.client.mapGetCenterY(); 
				if(this.isOwnerInInfluence(_16a[ip]["emprise"], _16c, _x, _y)) {
					_16e[_16a[ip].logo] = new Array(); 
					_16e[_16a[ip].logo] = _16a[ip]; 
					if($("ifcl_logoP_" + _16a[ip]["logo"])) {
						$("ifcl_logoP_" + _16a[ip]["logo"]).style.display = ""; 
					}
					if($("logoP_" + _16a[ip]["logo"])) {
						$("logoP_" + _16a[ip]["logo"]).style.display = ""; 
					}
				}
			}
			else {
				if(_16a[ip]["echellemin"] && _16a[ip]["echellemax"]) {
					if(_16c >= _16a[ip]["echellemin"] && _16c <= _16a[ip]["echellemax"]) {
						if(_16e[_16a[ip].logo]) {
							continue; 
						}
						_16e[_16a[ip].logo] = new Array(); 
						_16e[_16a[ip].logo] = _16a[ip]; 
						if($("ifcl_logoP_" + _16a[ip]["logo"])) {
							$("ifcl_logoP_" + _16a[ip]["logo"]).style.display = ""; 
						}
						if($("logoP_" + _16a[ip]["logo"])) {
							$("logoP_" + _16a[ip]["logo"]).style.display = ""; 
						}
					}
				}
				else {
					if(_16e[_16a[ip].logo]) {
						continue; 
					}
					_16e[_16a[ip].logo] = new Array(); 
					_16e[_16a[ip].logo] = _16a[ip]; 
					if($("ifcl_logoP_" + _16a[ip]["logo"])) {
						$("ifcl_logoP_" + _16a[ip]["logo"]).style.display = ""; 
					}
					if($("logoP_" + _16a[ip]["logo"])) {
						$("logoP_" + _16a[ip]["logo"]).style.display = ""; 
					}
				}
			}
		}
	}
	else {
		if($("ifcl_logoP_ign")) {
			$("ifcl_logoP_ign").style.display = ""; 
		}
		if($("logoP_ign")) {
			$("logoP_ign").style.display = ""; 
		}
	}
}; 
GestionnaireCarte.prototype.getOwnersByScale = function(_176) {
	var _177 = this.returnOwners(); 
	var _178 = new Array(); 
	if(_177.length > 0) {
		for(var ip = 0; ip < _177.length; ip++) {
			if(_177[ip]["emprise"]) {
				if(_178[_177[ip].logo]) {
					continue; 
				}
				var _x = this.client.mapGetCenterX(); 
				var _y = this.client.mapGetCenterY(); 
				if(this.isOwnerInInfluence(_177[ip]["emprise"], _176, _x, _y)) {
					_178[_177[ip].logo] = new Array(); 
					_178[_177[ip].logo] = _177[ip]; 
				}
			}
			else {
				if(_177[ip]["echellemin"] && _177[ip]["echellemax"]) {
					if(_176 >= _177[ip]["echellemin"] && _176 <= _177[ip]["echellemax"]) {
						if(_178[_177[ip].logo]) {
							continue; 
						}
						_178[_177[ip].logo] = new Array(); 
						_178[_177[ip].logo] = _177[ip]; 
					}
				}
				else {
					if(_178[_177[ip].logo]) {
						continue; 
					}
					_178[_177[ip].logo] = new Array(); 
					_178[_177[ip].logo] = _177[ip]; 
				}
			}
		}
	}
	return _178; 
}; 
GestionnaireCarte.prototype.isOwnerInInfluence = function(_17c, _17d, x, y) {
	__debug("[mapCoordInInfluence] Coordonnees testees : x=" + x + ", y=" + y); 
	var XY1 = this.client.mapClientToDegree(_17c.X1, _17c.Y1); 
	var XY2 = this.client.mapClientToDegree(_17c.X2, _17c.Y2); 
	__debug("[mapCoordInInfluence] Emprise du logo : X1=" + XY1[0] + ", X2=" + XY2[0] + ", Y1=" + XY1[1] + ", Y2=" + XY2[1]); 
	if(_17d > _17c.scale) {
		return; 
	}
	if(x >= XY1[0] && x <= XY2[0] && y >= XY1[1] && y <= XY2[1]) {
		__debug("[mapCoordInInfluence] Coordonnees dans le territoire"); 
		return true; 
	}
	else {
		__debug("[mapCoordInInfluence] Coordonnees pas dans le territoire"); 
		return false; 
	}
}; 
GestionnaireCarte.prototype.getIdThemeFromIdCouche = function(_182) {
	var iter = ""; 
	for(iter in this.themesUtilises) {
		if(typeof(this.themesUtilises[iter]) != "function") {
			var _184 = ""; 
		}
		for(_184 in this.themesUtilises[iter]) {
			if(typeof(this.themesUtilises[iter][_184]) != "function" && _184 == "couches") {
				for(var _185 = 0; _185 < this.themesUtilises[iter][_184].length; _185++) {
					if(this.themesUtilises[iter][_184][_185] == _182) {
						return iter; 
					}
				}
			}
		}
	}
	return""; 
}; 
GestionnaireCarte.prototype.changeOuvertureEditable = function(_186) {
	var _187 = _186.getElementsByClassName("manageLayer")[0]; 
	if(_186.className.indexOf("openedControl") !=- 1) {
		_186.className.replace(/(\?.*)?openedControl(\?.*)?$/,"closedControl");
		_187.style.display = "none"; 
	}
	else {
		_186.className.replace(/(\?.*)?closedControl(\?.*)?$/,"openedControl");
		_187.style.display = "block"; 
	}
}; 
GestionnaireCarte.prototype.getDivCouches = function(_188) {
	if(this.divCouches) {
		return this.divCouches; 
	}
	if(!_188) {
		_188 = document.getElementById(this.idGestionnaire); 
	}
	var divs = _188.getElementsByTagName("div"); 
	this.divCouches = null; 
	for(var id = 0; id < divs.length; id++) {
		if(divs[id].className.indexOf("availableLayers") !=- 1) {
			this.divCouches = divs[id]; 
			break; 
		}
	}
	return this.divCouches; 
}; 
GestionnaireCarte.prototype.getThemesObjects = function(_18b) {
	var _18c = new Array(); 
	var _18d = this.getDivCouches(_18b); 
	if(!_18d) {
		return _18c; 
	}
	var _18e = _18d.getElementsByTagName("ul"); 
	if(!_18e) {
		return _18c; 
	}
	_18e = _18e[0].childNodes; 
	for(var it = 0; it < _18e.length; it++) {
		if(_18e[it].nodeName == "LI") {
			_18c.push(_18e[it]); 
		}
	}
	_18e = null; 
	return _18c; 
}; 
GestionnaireCarte.prototype._genereInterface = function() {
	if(!__gc_gestionnaires[this.idGestionnaire]) {
		this._error("GestionnaireCarte._genereInterface: action impossible, ce gestionnaire n'a pas \xe9t\xe9 enti\xe8rement d\xe9fini !"); 
		return; 
	}
	if(this.utiliserThematiques) {
		var _190 = document.getElementById(this.idGestionnaire + "_onglet_profil"); 
		var _191 = document.getElementById(this.idGestionnaire + "_onglet_thematique"); 
		if(window.UnObtrusive.hasClassName(_190, "active")) {
			if(this.profilsDisponibles[this.profil]["type"] == "thematique") {
				window.UnObtrusive.removeClassNames(_190, "active"); 
				window.UnObtrusive.addClassNames(_191, "active"); 
				Event.stopObserving(_191, "click", this._changeProfilThematiqueObserver, false); 
				Event.observe(_190, "click", this._changeProfilThematiqueObserver, false); 
			}
		}
		else {
			if(this.profilsDisponibles[this.profil]["type"] == "profil") {
				window.UnObtrusive.removeClassNames(_191, "active"); 
				window.UnObtrusive.addClassNames(_190, "active"); 
				Event.stopObserving(_190, "click", this._changeProfilThematiqueObserver, false); 
				Event.observe(_191, "click", this._changeProfilThematiqueObserver, false); 
			}
		}
		var _192 = document.getElementById(this.idGestionnaire + "_profils"); 
		var _193 = document.getElementById(this.idGestionnaire + "_thematiques"); 
		if(this.profilsDisponibles[this.profil]["type"] == "thematique") {
			window.UnObtrusive.addClassNames(_192, "invisible"); 
			window.UnObtrusive.removeClassNames(_193, "invisible"); 
			var url = document.getElementById(this.idGestionnaire + "_thematique_url"); 
			url.href = this.profilsDisponibles[this.profil]["url"]; 
			url.innerHTML = this.profilsDisponibles[this.profil]["urlText"]; 
		}
		else {
			window.UnObtrusive.removeClassNames(_192, "invisible"); 
			window.UnObtrusive.addClassNames(_193, "invisible"); 
		}
	}
	var _195 = document.getElementById(this.idGestionnaire + "_profilsBoutons"); 
	if(this.profilsDisponibles[this.profil]["disablecookies"]) {
		window.UnObtrusive.addClassNames(_195, "invisible"); 
	}
	else {
		window.UnObtrusive.removeClassNames(_195, "invisible"); 
	}
	var _196 = document.getElementById(this.idGestionnaire + "_ThemesEtCouches"); 
	if(_196) {
		var _197 = _196.parentNode; 
		_197.removeChild(_196); 
		var _198 = document.createElement("ul"); 
		_198.id = this.idGestionnaire + "_ThemesEtCouches"; 
		_197.appendChild(_198); 
		var _199 = function(_19a, _19b, _19c) {
			__getGestionnaireById(this.idGestionnaire).changeSelectionCoucheOpacifiable(_19b, _19c); 
			Event.stop(_19a); 
		}; 
		var _19d = function(_19e, _19f, _1a0) {
			__getGestionnaireById(this.idGestionnaire).changeSelectionCoucheOpacifiable(_19f, _1a0); 
			Event.stop(_19e); 
		}; 
		var _1a1 = function(_1a2, _1a3, _1a4) {
			__getGestionnaireById(this.idGestionnaire).changeSelectionCouchePonctuelle(_1a3, _1a4); 
			Event.stop(_1a2); 
		}; 
		var _1a5 = function(_1a6, _1a7, _1a8) {
			__getGestionnaireById(this.idGestionnaire).changeSelectionCoucheTlf(_1a7, _1a8); 
			Event.stop(_1a6); 
		}; 
		this.creerbtcouche(_198, _199, _1a5, _1a1); 
	}
}; 
GestionnaireCarte.prototype.initInterface = function(_1a9) {
	if(!__gc_gestionnaires[this.idGestionnaire]) {
		this._error("GestionnaireCarte.initInterface: action impossible, ce gestionnaire n'a pas \xe9t\xe9 enti\xe8rement d\xe9fini !"); 
		return; 
	}
	if(!this._assertCarte()) {
		return; 
	}
	this._genereInterface(); 
	if(_1a9) {
		this.resetInterface(); 
	}
	var _1aa = {
			profil : "profil", thematique : "thematique"}; 
	for(var _1ab in _1aa) {
		if(typeof(_1aa[_1ab]) !== "function") {
			var _1ac = _1aa[_1ab]; 
			this.profilName = ""; 
			var _1ad = document.getElementById(this.idGestionnaire + "_Select_" + _1ac); 
			if(!_1ad) {
				this._error("GestionnaireCarte.initInterface : action impossible, le s\xe9lecteur de " + _1ac + "s XHTML n'a pas \xe9t\xe9 trouv\xe9"); 
				return; 
			}
			for(var is = _1ad.options.length; is >= 0; is--) {
				_1ad.options[is] = null; 
			}
			for(var _1af in this.profilsDisponibles) {
				if(typeof(this.profilsDisponibles[_1af]) !== "function") {
					if(this.profilsDisponibles[_1af]["type"] == _1ac) {
						var _1b0 = (this.profil == this.profilsDisponibles[_1af]["id"]); 
						_1ad.options[_1ad.options.length] = new Option(this.profilsDisponibles[_1af]["nom"], this.profilsDisponibles[_1af]["id"], false, _1b0); 
						if(_1b0) {
							this.profilName = this.profilsDisponibles[_1af]["nom"]; 
						}
					}
				}
			}
			var _1ad = document.getElementById(this.idGestionnaire + "_Select_" + _1ac); 
			if(!_1ad) {
				this._error("GestionnaireCarte.initInterface : action impossible, le s\xe9lecteur de profils XHTML n'a pas \xe9t\xe9 trouve\xe9"); 
				return; 
			}
			var _1b1 = _1ad.options.length; 
			var _1b2 = window.Cookie.load(this.getCookieName()); 
			if(_1b2) {
				for(var inc = 0; inc < _1b2.length; inc++) {
					var _1b4 = window.Cookie.load(this.getCookieName() + "-" + _1b2[inc]); 
					if(_1b4 && this.profilsDisponibles[_1b2[inc].substring(0, _1b2[inc].indexOf("-"))]) {
						var _1b0 = (_1b2[inc] == this.profilCookie); 
						_1ad.options[_1ad.options.length] = new Option(_1b4[0], "cookie-" + _1b2[inc], false, _1b0); 
						if(_1b0) {
							this.profilName = _1b4[0]; 
						}
					}
				}
			}
		}
	}
	if(this.profilName == "") {
		var _1b5 = document.getElementById(this.idGestionnaire + "_SupprimerProfil"); 
		var _1b6 = document.getElementById(this.idGestionnaire + "_SupprimerProfilNo"); 
		if(_1b5 && _1b6) {
			_1b5.style.display = "none"; 
			_1b6.style.display = "inline"; 
		}
	}
	else {
		var _1b5 = document.getElementById(this.idGestionnaire + "_SupprimerProfil"); 
		var _1b6 = document.getElementById(this.idGestionnaire + "_SupprimerProfilNo"); 
		if(_1b5 && _1b6) {
			_1b6.style.display = "none"; 
			_1b5.style.display = "inline"; 
		}
	}
	var _1b7 = this.client.mapGetRasterLayerNames(); 
	if(_1b7.length <= 0) {
		this.resetInterface(); 
		return; 
	}
	var _1b8 = this.getThemesObjects(); 
	for(var it = 0; it < _1b8.length; it++) {
		var _1ba = _1b8[it].id; 
		var _1bb = document.getElementById(_1ba + "Couche" + this.coucheFond + "ImageRadio"); 
		if(_1bb) {
			_1bb.src = this.imagesPath + "selected.gif"; 
			document.getElementById(this.idGestionnaire + "_CouchesVisiblesFond").innerHTML = document.getElementById(_1ba + "Couche" + this.coucheFond + "Name").innerHTML; 
		}
	}
	var _1bc = this.getCouchesVisibles(); 
	_1bc = _1bc.concat(this.getCouchesTlf()); 
	if(_1bc.length <= 0) {
		return; 
	}
	for(var it = 0; it < _1b8.length; it++) {
		var _1ba = _1b8[it].id; 
		for(var icv = 0; icv < _1bc.length; icv++) {
			var _1bb = document.getElementById(_1ba + "Couche" + _1bc[icv]["id"] + "ImageCheck"); 
			if(_1bb) {
				_1bb.alt = "checked"; 
				_1bb.src = this.imagesPath + "checkOne.gif"; 
				if(_1b8[it].style.display != "block") {
					this.changeDeveloppementTheme(_1ba.substr(this.idGestionnaire.length + 1), "niv1"); 
				}
			}
		}
	}
	this.genereEditeur(); 
}; 
GestionnaireCarte.prototype.resetInterface = function() {
	var _1be = document.getElementById(this.idGestionnaire + "_CouchesVisiblesFond"); 
	if(_1be) {
		_1be.innerHTML = "<p>" + __i18n_gestionnaireCouches["noLayer"] + "</p>"; 
	}
	_1be = document.getElementById(this.idGestionnaire + "_CouchesVisiblesOpacifiables"); 
	if(_1be) {
		_1be.innerHTML = "<p>" + __i18n_gestionnaireCouches["noLayer"] + "</p>"; 
	}
	var _1bf = document.getElementById(this.idGestionnaire + "_Select_profil"); 
	if(_1bf) {
		for(var is = 0; is < _1bf.options.length; is++) {
			if((_1bf.options[is].value == "profil-modifie") || (_1bf.options[is].value.substring(0, 7) == "cookie-")) {
				_1bf.options[is] = null; 
				is--; 
			}
		}
	}
	this.fermeTousThemes(); 
	var _1c1 = this.getDivCouches(); 
	if(_1c1) {
		var _1c2 = _1c1.getElementsByTagName("img"); 
		for(var ii = 0; ii < _1c2.length; ii++) {
			var _1c4 = _1c2[ii].id; 
			if((!_1c4) || (_1c4.indexOf("Couche") ==- 1)) {
				continue; 
			}
			_1c2[ii].alt = "unchecked"; 
			_1c2[ii].src = this.imagesPath + "checkNone.gif"; 
		}
	}
}; 
GestionnaireCarte.prototype.echelleCarteModifiee = function(_1c5) {
	if(!_1c5) {
		_1c5 = this.carte.getEchelle(); 
	}
	var _1c6 = this.getCouchesVisibles(); 
	if(this.poiInterface && this.poiInterface.getObjectManager()) {
		if(_1c6.length <= 0) {
			this.poiInterface.getObjectManager().setLayerReference(null); 
		}
		else {
			var _1c7 = this.getIdCoucheVisibleSuperieure(this.carte.getEchelle()); 
			if(this.couchesDisponibles[_1c7]["type"] === "poly") {
				idSousCoucheTop = ""; 
				for(var isc = this.couchesDisponibles[_1c7]["souscouches"].length - 1; isc >= 0; isc--) {
					if(this.couchesDisponibles[_1c7]["souscouches"][isc]["type"] !== "ponctual" && this.couchesDisponibles[_1c7]["souscouches"][isc]["type"] !== "ponctualkml") {
						idSousCoucheTop = this.couchesDisponibles[_1c7]["souscouches"][isc]["id"]; 
						break; 
					}
				}
				_1c7 = idSousCoucheTop; 
			}
			var _1c9 = (_1c7 != "") ? this.client.mapGetLayer(_1c7) : null; 
			var _1ca = (_1c9) ? _1c9.tabName : null; 
			if((!_1ca) || (_1ca != this.poiInterface.getObjectManager().getLayerReference())) {
				this.poiInterface.getObjectManager().setLayerReference(_1ca); 
				if(_1ca) {
					this.client.mapLayerRefresh(_1c9, true); 
				}
			}
		}
	}
	var _1cb = this.getThemesObjects(); 
	if(this.couchesIndisponibles && (this.couchesIndisponibles.length > 0)) {
		for(var it = 0; it < _1cb.length; it++) {
			var _1cd = _1cb[it].id; 
			for(var ici = 0; ici < this.couchesIndisponibles.length; ici++) {
				var _1cf = document.getElementById(_1cd + "Couche" + this.couchesIndisponibles[ici] + "Text"); 
				if(_1cf) {
					window.UnObtrusive.removeClassNames(_1cf, "unavailableLayer"); 
				}
				_1cf = document.getElementById(this.idGestionnaire + "_ControleCouche" + this.couchesIndisponibles[ici] + "Text"); 
				if(_1cf) {
					window.UnObtrusive.removeClassNames(_1cf, "unavailableLayer"); 
				}
			}
		}
	}
	this.couchesIndisponibles = new Array(); 
	var _1d0 = this.getCouchesPonctuelles(); 
	var _1d1 = _1c6.concat(_1d0); 
	_1c6 = _1d1; 
	if(_1c6.length <= 0) {
		return; 
	}
	var ici = 0; 
	for(var _1d2 in this.couchesDisponibles) {
		if(typeof(this.couchesDisponibles[_1d2]) !== "function") {
			if(this.couchesDisponibles[_1d2]["id"] != this.coucheFond) {
				if((_1c5 < (this.couchesDisponibles[_1d2]["zoomRange"] ? this.couchesDisponibles[_1d2]["zoomRange"]["min"] : this.couchesDisponibles[_1d2]["minScale"])) || (_1c5 > (this.couchesDisponibles[_1d2]["dezoomRange"] ? this.couchesDisponibles[_1d2]["dezoomRange"]["max"] : this.couchesDisponibles[_1d2]["maxScale"]))) {
					this.couchesIndisponibles[ici++] = this.couchesDisponibles[_1d2]["id"]; 
				}
			}
		}
	}
	if(this.couchesIndisponibles.length <= 0) {
		return; 
	}
	for(var it = 0; it < _1cb.length; it++) {
		var _1cd = _1cb[it].id; 
		for(var ici = 0; ici < this.couchesIndisponibles.length; ici++) {
			var _1cf = document.getElementById(_1cd + "Couche" + this.couchesIndisponibles[ici] + "Text"); 
			if(_1cf) {
				window.UnObtrusive.addClassNames(_1cf, "unavailableLayer"); 
			}
			_1cf = document.getElementById(this.idGestionnaire + "_ControleCouche" + this.couchesIndisponibles[ici] + "Text"); 
			if(_1cf) {
				window.UnObtrusive.addClassNames(_1cf, "unavailableLayer"); 
			}
		}
	}
}; 
GestionnaireCarte.prototype.masquerDialogueProfil = function() {
	var zone = document.getElementById(this.idGestionnaire + "_fsProfil"); 
	var _1d4 = document.getElementById(this.idGestionnaire + "_CouchesVisiblesOpacifiables"); 
	zone.style.display = "none"; 
	_1d4.style.display = "block"; 
	document.getElementById(this.idGestionnaire + "_barre_action").style.display = "block"; 
}; 
GestionnaireCarte.prototype.getCookieName = function() {
	return"geo" + ___geoportail + "-" + __idCarte + "-profils-" + __territoire + ""; 
}; 
GestionnaireCarte.prototype.supprimerProfil = function(_1d5) {
	var _1d6 = (typeof(_1d5) == "undefined"); 
	if(is3D) {
		_1d6 = (typeof(_1d5) == "object"); 
	}
	if(!_1d5 || (typeof(_1d5) == "object")) {
		_1d5 = this.profilCookie; 
	}
	nomCookies = window.Cookie.load(this.getCookieName()); 
	if(nomCookies) {
		var inc = 0; 
		if(nomCookies[0] == _1d5) {
			if(nomCookies.length == 1) {
				window.Cookie.remove(this.getCookieName()); 
				nomCookies = null; 
			}
			else {
				inc = 1; 
			}
		}
		if(nomCookies) {
			listeNoms = nomCookies[inc]; 
			for(inc = inc + 1; inc < nomCookies.length; inc++) {
				if(nomCookies[inc] != _1d5) {
					listeNoms += "," + nomCookies[inc]; 
				}
			}
			window.Cookie.save(this.getCookieName(), listeNoms, window.Cookie.expiresInDays(this.dureeJoursCookies)); 
		}
	}
	window.Cookie.remove(this.getCookieName() + "-" + _1d5); 
	var _1d8 = $(this.idGestionnaire + "_Select_profil"); 
	for(var is = 0; is < _1d8.options.length; is++) {
		if(_1d8.options[is].value == _1d5) {
			_1d8.options[is] = null; 
			break; 
		}
	}
	if(_1d6) {
		this.changeProfil(this.profil); 
	}
}; 
GestionnaireCarte.prototype.rechercherCouche = function() {
	var zone = $(this.idGestionnaire + "_fsRecherche"); 
	var _1db = $(this.idGestionnaire + "_ThemesEtCouches"); 
	if(zone.style.display == "none") {
		_1db.style.display = "none"; 
		zone.style.display = "block"; 
	}
	else {
		zone.style.display = "none"; 
		_1db.style.display = "inline"; 
	}
}; 
GestionnaireCarte.prototype.getCouchesTlf = function() {
	var _1dc = new Array(); 
	var icv = 0; 
	for(var _1de in this.couchesDisponibles) {
		if(typeof(this.couchesDisponibles[_1de]) !== "function") {
			if(this.couchesDisponibles[_1de] && this.couchesDisponibles[_1de].type === "tlf") {
				var _1df = this.client.mapGetLayer(_1de); 
				var vis = this.getVisibilite(_1de); 
				if(vis) {
					_1dc[icv] = new Array(); 
					_1dc[icv].id = _1de; 
					_1dc[icv].type = this.couchesDisponibles[_1de].type; 
					_1dc[icv].opacite = (this._edition) ? this.couchesDisponibles[_1de].profil.opaciteDefaut : this.getOpacite(_1de); 
					_1dc[icv].proprietaires = this.couchesDisponibles[_1de].proprietaires; 
					_1dc[icv].realMinScale = (this.couchesDisponibles[_1de].zoomRange ? this.couchesDisponibles[_1de].zoomRange.min : this.couchesDisponibles[_1de].minScale); 
					_1dc[icv].realMaxScale = (this.couchesDisponibles[_1de]["dezoomRange"] ? this.couchesDisponibles[_1de].dezoomRange.max : this.couchesDisponibles[_1de].maxScale); 
					icv++; 
				}
			}
		}
	}
	return _1dc; 
}; 
GestionnaireCarte.prototype.getCouchesVisibles = function() {
	var _1e1 = new Array(); 
	var icv = 0; 
	for(var _1e3 in this.couchesDisponibles) {
		if(typeof(this.couchesDisponibles[_1e3]) !== "function") {
			if((this.couchesDisponibles[_1e3]) && (_1e3 != this.coucheFond)) {
				var vis = false; 
				if(this.couchesDisponibles[_1e3].type === "raster") {
					var _1e5 = this.client.mapGetLayer(_1e3); 
					vis = (this._edition) ? this.couchesDisponibles[_1e3].profil.visibiliteDefaut : this.getVisibilite(_1e3); 
				}
				else {
					if(this.couchesDisponibles[_1e3].type === "poly") {
						vis = this.getVisibilite(_1e3); 
					}
					else {
						if(this.couchesDisponibles[_1e3].type === "ponctual" || this.couchesDisponibles[_1e3].type === "ponctualkml") {
							vis = this.getVisibilite(_1e3); 
						}
						else {
							vis = false; 
						}
					}
				}
				if(vis) {
					_1e1[icv] = new Array(); 
					_1e1[icv].id = _1e3; 
					_1e1[icv].type = this.couchesDisponibles[_1e3].type; 
					_1e1[icv].opacite = (this._edition) ? this.couchesDisponibles[_1e3].profil.opaciteDefaut : this.getOpacite(_1e3); 
					_1e1[icv].proprietaires = this.couchesDisponibles[_1e3].proprietaires; 
					_1e1[icv].realMinScale = (this.couchesDisponibles[_1e3].zoomRange ? this.couchesDisponibles[_1e3].zoomRange.min : this.couchesDisponibles[_1e3].minScale); 
					_1e1[icv].realMaxScale = (this.couchesDisponibles[_1e3].dezoomRange ? this.couchesDisponibles[_1e3].dezoomRange.max : this.couchesDisponibles[_1e3].maxScale); 
					icv++; 
				}
			}
		}
	}
	var _1e6 = new Array(); 
	var icp = 0; 
	for(var prof = this.profondeurMin; prof <= this.profondeurMax; prof++) {
		if(this.idCouchesDisponibles[prof]) {
			if(!this.idCouchesDisponibles[prof].idCoucheMere) {
				var _1e3 = this.idCouchesDisponibles[prof].idCouche; 
				for(var icv = 0; icv < _1e1.length; icv++) {
					if(_1e1[icv].id === _1e3) {
						_1e6[icp] = _1e1[icv]; 
						icp++; 
						break; 
					}
				}
			}
			else {
				var _1e9 = this.idCouchesDisponibles[prof].idCoucheMere; 
				for(var icv = 0; icv < _1e1.length; icv++) {
					var _1ea = false; 
					if(_1e1[icv].id === _1e9) {
						for(var itt = 0; itt < _1e6.length; itt++) {
							if(_1e6[itt].id === _1e9) {
								_1ea = true; 
								break; 
							}
						}
						if(!_1ea) {
							_1e6[icp] = _1e1[icv]; 
							icp++; 
						}
					}
				}
			}
		}
	}
	return _1e6; 
}; 
GestionnaireCarte.prototype.getCouchesPonctuelles = function() {
	var _1ec = new Array(); 
	var icp = 0; 
	var _1ee = this.poiInterface.getObjectManager().identifiantsCouchesPonctuellesVisibles; 
	if(typeof(_1ee) === "undefined") {
		if(console && console.warn && console.trace) {
			console.warn("Pas d'identifiantsCouchesPonctuellesVisibles dans l'ObjectManager"); 
			console.trace(); 
		}
		return {
		}; 
	}
	for(var _1ef in this.couchesDisponibles) {
		if(typeof(this.couchesDisponibles[_1ef]) !== "function") {
			if(this.couchesDisponibles[_1ef]["type"] && this.couchesDisponibles[_1ef].type == "poly") {
				if(this.couchesDisponibles[_1ef]["mainSousCouche"]["type"] && (this.couchesDisponibles[_1ef]["mainSousCouche"].type == "ponctual" || this.couchesDisponibles[_1ef]["mainSousCouche"].type == "ponctualkml")) {
					var _1f0 = this.couchesDisponibles[_1ef]["idMainSousCouche"]; 
					var _1f1 = false; 
					for(var icpv = 0; icpv < _1ee.length; icpv++) {
						if(_1ee[icpv] === _1f0) {
							_1f1 = true; 
						}
					}
					if(_1f1) {
						_1ec[icp] = new Array(); 
						_1ec[icp]["id"] = _1ef; 
						if(this.couchesDisponibles[_1ef].minScale) {
							_1ec[icp].realMinScale = this.couchesDisponibles[_1ef].minScale; 
						}
						if(this.couchesDisponibles[_1ef].maxScale) {
							_1ec[icp].realMaxScale = this.couchesDisponibles[_1ef].maxScale; 
						}
						icp++; 
					}
				}
			}
			if(this.couchesDisponibles[_1ef]["type"] && (this.couchesDisponibles[_1ef].type == "ponctual" || this.couchesDisponibles[_1ef].type == "ponctualkml")) {
				var _1f1 = false; 
				for(var icpv = 0; icpv < _1ee.length; icpv++) {
					if(_1ee[icpv] === _1ef) {
						_1f1 = true; 
					}
				}
				if(_1f1) {
					_1ec[icp] = new Array(); 
					_1ec[icp]["id"] = _1ef; 
					if(this.couchesDisponibles[_1ef].minScale) {
						_1ec[icp].realMinScale = this.couchesDisponibles[_1ef].minScale; 
					}
					if(this.couchesDisponibles[_1ef].maxScale) {
						_1ec[icp].realMaxScale = this.couchesDisponibles[_1ef].maxScale; 
					}
					icp++; 
				}
			}
		}
	}
	return _1ec; 
}; 
GestionnaireCarte.prototype.getCouchesExportables = function() {
	var _1f3 = new Array(); 
	for(var _1f4 in this.couchesDisponibles) {
		if(typeof(this.couchesDisponibles[_1f4]) !== "function") {
			if(this.couchesDisponibles[_1f4].profil) {
				if((this.couchesDisponibles[_1f4].type === "raster") || (this.couchesDisponibles[_1f4].type === "poly")) {
					var vis = Number(this.getVisibilite(_1f4)); 
					if(vis == Number(this.couchesDisponibles[_1f4].profil.visibiliteDefaut)) {
						vis = ""; 
					}
					var opa = this.getOpacite(_1f4); 
					if(opa == this.carte.gestionnaire.couchesDisponibles[_1f4].profil.opaciteDefaut) {
						opa = ""; 
					}
					var prof = this.getProfondeur(_1f4); 
					if(this.couchesDisponibles[_1f4].type === "raster") {
						if(prof == this.couchesDisponibles[_1f4].profil.profondeurDefaut) {
							prof = ""; 
						}
					}
					else {
						if(this.couchesDisponibles[_1f4].type === "poly") {
							if(prof == this.couchesDisponibles[_1f4].souscouches[0].profil.profondeurDefaut) {
								prof = ""; 
							}
						}
					}
					if((vis !== "") || (opa !== "") || (prof !== "")) {
						_1f3[_1f4] = new Array(_1f4, vis, opa, prof); 
					}
				}
				else {
					if(this.couchesDisponibles[_1f4].type === "ponctual" || this.couchesDisponibles[_1f4].type === "ponctualkml") {
						var vis = Number(this.poiInterface.getObjectManager().isVisibleLayer(_1f4)); 
						if(vis == Number(this.couchesDisponibles[_1f4].profil.visibiliteDefaut)) {
							vis = ""; 
						}
						if(vis !== "") {
							_1f3[_1f4] = new Array(_1f4, vis); 
						}
					}
					else {
						this._error("GestionnaireCarte.getCouchesExportables: couche de type \"" + this.couchesDisponibles[_1f4]["type"] + "\" non geree"); 
					}
				}
			}
		}
	}
	return _1f3; 
}; 
GestionnaireCarte.prototype.getScalesMinMax = function(_1f8) {
	for(var icv = 0, ms = 24, Ms = 0; icv < _1f8.length; icv++) {
		if(_1f8[icv]["realMinScale"] < ms) {
			ms = _1f8[icv]["realMinScale"]; 
		}
		if(_1f8[icv]["realMaxScale"] > Ms) {
			Ms = _1f8[icv]["realMaxScale"]; 
		}
	}
	return[ms, Ms]; 
}; 
GestionnaireCarte.prototype.miseAJourURL = function() {
}; 
GestionnaireCarte.prototype.miseAJourContexteGeo = function() {
	var _1fc = window.location.search.substr(1); 
	if(_1fc) {
		var _1fd = _1fc.indexOf("&ech="); 
		var _1fe = _1fc.indexOf("&pro="); 
		var debX = _1fc.indexOf("&x="); 
		var debY = _1fc.indexOf("&y="); 
		if(_1fd !=- 1) {
			var _201 = _1fc.substring(_1fd + 5, _1fe); 
			this.carte.changeEchelleClient(_201, false); 
		}
		if(debX !=- 1 && debY !=- 1) {
			var x = _1fc.substring(debX + 3, debY); 
			var y = _1fc.substring(debY + 3, _1fc.length); 
			if(/^[0-9]+$/.test(x)&&/^[0-9]+$/.test(y)){this.client.mapCenter(x,y,true);
			}
		}
		if(_1fe !=- 1) {
			var _204 = _1fc.substring(_1fe + 5, debX); 
			var _205 = this.profilsDisponibles; 
			for(var prof in _205) {
				if((typeof(_205[prof]) != "function")) {
					if(prof == _204) {
						this.changeProfil(_204); 
					}
				}
			}
		}
	}
}; 
GestionnaireCarte.prototype.miseAJourEmprise = function() {
	var _207 = this.poiInterface.getObjectManager().getCurrentPOI(); 
	if(_207) {
		this.poiInterface.addEmprise(_207.mapx, _207.mapy); 
	}
}; 
GestionnaireCarte.prototype.creerbtcouche = function(_1, _2, _3, _4) {
	for(var _5 in this.themesUtilises) {
		if(typeof(this.themesUtilises[_5]) !== "function") {
			theme = this.themesUtilises[_5]; 
			var _6 = document.createElement("li"); 
			_6.id = this.idGestionnaire + "_Theme" + theme["id"]; 
			_1.appendChild(_6); 
			var _7 = document.createElement("span"); 
			var _8 = function(_9, _a, _b) {
				__getGestionnaireById(this.idGestionnaire).changeDeveloppementTheme(_a, _b); 
				Event.stop(_9); 
			}; 
			Event.observe(_7, "click", _8.bindAsEventListener(this, "Theme" + theme["id"], "niv1"), false); 
			_6.appendChild(_7); 
			var _c = document.createElement("img"); 
			_c.id = this.idGestionnaire + "_pldpTheme" + theme["id"]; 
			_c.title = __i18n_gestionnaireCouches["theme_imgTitle"]; 
			_c.alt = __i18n_gestionnaireCouches["theme_imgAlt"]; 
			_c.src = this.imagesPath + "unfold.gif"; 
			_7.appendChild(_c); 
			var _d = document.createTextNode(theme["nom"]); 
			_7.appendChild(_d); 
			if(theme["couches"]) {
				for(var i = 0; i < theme["couches"].length; i++) {
					var ul = document.createElement("ul"); 
					ul.className = "niv1"; 
					_6.appendChild(ul); 
					var li2 = document.createElement("li"); 
					if(this.couchesDisponibles[theme["couches"][i]]["type"] == "raster") {
						this.s_GenereInterface(li2, theme, i, _2); 
					}
					else {
						if(this.couchesDisponibles[theme["couches"][i]]["type"] == "poly") {
							Event.observe(li2, "click", _2.bindAsEventListener(this, "Theme" + theme["id"], theme["couches"][i]), false); 
						}
						else {
							if(this.couchesDisponibles[theme["couches"][i]]["type"] == "ponctual" || this.couchesDisponibles[theme["couches"][i]]["type"] == "ponctualkml") {
								Event.observe(li2, "click", _4.bindAsEventListener(this, "Theme" + theme["id"], theme["couches"][i]), false); 
							}
							else {
								if(this.couchesDisponibles[theme["couches"][i]]["type"] == "tlf") {
									Event.observe(li2, "click", _3.bindAsEventListener(this, "Theme" + theme["id"], theme["couches"][i]), false); 
								}
								else {
									this._error("GestionnaireCarte: couche \"" + theme["couches"][i] + "\" de type inconnu. Elle ne pourra pas etre selectionnee !"); 
								}
							}
						}
					}
					ul.appendChild(li2); 
					var _11 = document.createElement("img"); 
					_11.id = this.idGestionnaire + "_Theme" + theme["id"] + "Couche" + theme["couches"][i] + "ImageCheck"; 
					_11.title = __i18n_gestionnaireCouches["couche_imgTitle"]; 
					_11.alt = __i18n_gestionnaireCouches["couche_imgAlt"]; 
					_11.src = this.imagesPath + "checkNone.gif"; 
					li2.appendChild(_11); 
					var _12 = document.createElement("span"); 
					_12.id = this.idGestionnaire + "_Theme" + theme["id"] + "Couche" + theme["couches"][i] + "Text"; 
					li2.appendChild(_12); 
					var _13 = document.createTextNode(this.couchesDisponibles[theme["couches"][i]]["nom"]); 
					_12.appendChild(_13); 
				}
			}
		}
	}
}; 
GestionnaireCarte.prototype.IncNbcouches = function(id) {
	return 1; 
}; 
GestionnaireCarte.prototype.s_Constructor = function() {
	this.legendUrladmin = "/administrations/visu2DLegendes.do"; 
	this.legendUrlserv = "/services/visu2DLegendes.do"; 
	this.legendUrlecom = "/selection/visu2DLegendes.do"; 
}; 
GestionnaireCarte.prototype.s_InitCouchesEtThemes = function() {
	loadProperties("/js" + baseJS + "/visu/2D/properties" + (___geoecom ? "/ecommerce" : (___geoserv ? "/services" : "/administrations")) + propterri + "/properties-" + territoireACharger + "-" + profilACharger + (baseJS == "/compress" ? "-compress" : "") + ".js"); 
}; 
GestionnaireCarte.prototype.grisageMaSelection = function(_15) {
	for(var _16 in this.couchesDisponibles) {
		if(typeof(this.couchesDisponibles[_16]) != "function") {
			var _17 = this.getIdThemeFromIdCouche(_16); 
			var _18 = document.getElementById(this.idGestionnaire + "_Theme" + _17 + "Couche" + _16 + "Text"); 
			var _19 = document.getElementById(this.idGestionnaire + "_ControleCouche" + _16 + "Text"); 
			if(_18) {
				var _1a = this.couchesDisponibles[_16]["zoomRange"] ? this.couchesDisponibles[_16]["zoomRange"]["min"] : this.couchesDisponibles[_16]["minScale"]; 
				var _1b = this.couchesDisponibles[_16]["dezoomRange"] ? this.couchesDisponibles[_16]["dezoomRange"]["max"] : this.couchesDisponibles[_16]["maxScale"]; 
				if((_15 < _1a) || (_15 > _1b)) {
					window.UnObtrusive.addClassNames(_18, "unavailableLayer"); 
					if(_19) {
						window.UnObtrusive.addClassNames(_19, "unavailableLayer"); 
					}
				}
				else {
					window.UnObtrusive.removeClassNames(_18, "unavailableLayer"); 
					if(_19) {
						window.UnObtrusive.removeClassNames(_19, "unavailableLayer"); 
					}
				}
			}
		}
	}
}; 
GestionnaireCarte.prototype.s_GenereEditeur = function(_1c, _1d, _1e, _1f, _20, _21) {
	var _22; 
	var _23 = true; 
	for(var icv = _1d.length - 1; icv >= 0; icv--) {
		var _25 = ""; 
		if((_1c < _1d[icv]["realMinScale"]) || (_1c > _1d[icv]["realMaxScale"])) {
			_25 = "class=\"unavailableLayer\""; 
		}
		if(this.profilsDisponibles[this.profil]["disablecontrols"]) {
			_22 = "closedControl"; 
		}
		else {
			if(icv == _1d.length - 1) {
				_22 = "openedControl"; 
			}
			else {
				_22 = "openedControl"; 
			}
		}
		_22 += (_23) ? " impair" : " pair"; 
		_23 =!_23; 
		if(icv == 0) {
			_22 += " lastControl"; 
		}
		_1f = "<div class=\"" + _22 + "\">\n"; 
		_1f += "<table><tr>"; 
		if(!this.profilsDisponibles[this.profil]["disablecontrols"]) {
			_1f += "\t\t<td class=\"arrows\">\n"; 
			if(icv == _1d.length - 1) {
				_1f += "\t\t\t<img src=\"" + this.imagesPath + "fl_couche_H_no.gif\" alt=\"up\" title=\"" + __i18n_gestionnaireCouches["couche_avPlan"] + "\" />\n"; 
			}
			else {
				_1f += "\t\t\t<img src=\"" + this.imagesPath + "fl_couche_H.gif\" alt=\"up\" title=\"" + __i18n_gestionnaireCouches["couche_deplacerAvPlan"] + "\" onclick=\"javascript:__getGestionnaireById('" + this.idGestionnaire + "').incProfondeur('" + _1d[icv]["id"] + "');\" />\n"; 
			}
			if(icv == 0) {
				_1f += "\t\t\t<img src=\"" + this.imagesPath + "fl_couche_B_no.gif\" alt=\"down\" title=\"" + __i18n_gestionnaireCouches["couche_arPlan"] + "\" />\n"; 
			}
			else {
				_1f += "\t\t\t<img src=\"" + this.imagesPath + "fl_couche_B.gif\" alt=\"down\" title=\"" + __i18n_gestionnaireCouches["couche_deplacerArPlan"] + "\" onclick=\"javascript:__getGestionnaireById('" + this.idGestionnaire + "').decProfondeur('" + _1d[icv]["id"] + "');\" />\n"; 
			}
			_1f += "\t\t</td>\n"; 
		}
		_1f += "\t\t<td class=\"info\"><img src=\"/imgs/visu/2D/" + currentPortal + "/ico_infoCouche.gif\" class=\"layerInfo\" id=\"" + this.idGestionnaire + "_idLink" + _1d[icv]["id"] + "\" title=\"" + __i18n_messagesVisu["legende_imgTitle"] + "\" onclick=\"javascript:__getGestionnaireById('" + this.idGestionnaire + "')._addScaleToLink('" + this.idGestionnaire + "_idLink" + _1d[icv]["id"] + "','" + _20 + "','" + _1d[icv]["id"] + "','" + this.profil + "','" + _21 + "');\" /></td>\n" + "\t\t<td " + _25 + " id=\"" + this.idGestionnaire + "_ControleCouche" + _1d[icv]["id"] + "Text\"><div class=\"layerSelectionName\" title=\"" + __i18n_messagesVisu["legende_title"] + "\">" + this.couchesDisponibles[_1d[icv]["id"]]["nom"] + "</div></td>\n" + "\t\t<td class=\"suppr\"><img src=\"/imgs/visu/2D/" + currentPortal + "/ico_close.gif\" alt=\"" + __i18n_messagesVisu["delete_layer"] + "\" title=\"" + __i18n_messagesVisu["delete_layer"] + "\" onclick=\"javascript:__getGestionnaireById('" + this.idGestionnaire + "').changeSelectionCoucheOpacifiable('','" + _1d[icv]["id"] + "');\" /></td>\n" + " </tr>" + "</table>"; 
		if(!this.profilsDisponibles[this.profil]["disablecontrols"]) {
			_1f += "<div class=\"manageLayer\" >" + "\t<p class=\"percent\" id=\"" + this.idGestionnaire + "_alphaTexte_" + _1d[icv]["id"] + "\">" + _1d[icv]["opacite"] + "%</p>\n" + "\t<div class=\"opaLayer\">\n" + "\t\t<div class=\"opaTrack\" id=\"" + this.idGestionnaire + "_alphaRegle_" + _1d[icv]["id"] + "\">\n" + "\t\t\t<div class=\"opaCursor selected\" id=\"" + this.idGestionnaire + "_alphaCurseur_" + _1d[icv]["id"] + "\" style=\"left: 42px; position: absolute\"></div>\n" + "\t\t</div>\n" + "\t\t\n" + "\t</div>\n" + "\t<p class=\"opac\">" + __i18n_gestionnaireCouches["couche_opacite"] + "</p>\n" + "</div>\n"; 
		}
		_1f += "</div>\n"; 
		_1e.innerHTML += _1f; 
	}
}; 
GestionnaireCarte.prototype.s_GenereInterface = function(li2, _27, i, _29) {
	Event.observe(li2, "click", _29.bindAsEventListener(this, "Theme" + _27["id"], _27["couches"][i]), false); 
}; 
GestionnaireCarte.prototype.cacheTools = function(_2a, _2b) {
	if(_2b.className == "reglD") {
		$("winTools").style.display = "none"; 
		_2b.className = "reglG"; 
	}
	else {
		$("winTools").style.display = "block"; 
		_2b.className = "reglD"; 
	}
	this.carte.outil.resizeMap(); 
}; 
GestionnaireCarte.prototype.cacheGestionnaire = function(_2c, _2d) {
	if(_2d.className == "reglG") {
		$("winLayers").style.display = "none"; 
		_2d.className = "reglD"; 
	}
	else {
		$("winLayers").style.display = "block"; 
		_2d.className = "reglG"; 
	}
	this.carte.outil.resizeMap(); 
}; 
GestionnaireCarte.prototype.initEventGestionnaire = function() {
	var _2e = function(_2f, id, src) {
		__modifImage(id, src); 
		return false; 
	}; 
	var _32 = document.getElementById(this.idGestionnaire + "_cancelProf"); 
	if(_32) {
		Event.observe(_32, "click", this.masquerDialogueProfil.bindAsEventListener(this), false); 
	}
	_32 = document.getElementById(this.idGestionnaire + "_profil_fermer_message"); 
	if(_32) {
		Event.observe(_32, "click", function() {
			$("winDialog").addClassName("invisible"); }
		.bindAsEventListener(this), false); 
	}
	_32 = document.getElementById(this.idGestionnaire + "_EnregistrerProfil"); 
	if(_32) {
		this.enregistrerProfilObserver = function(_33) {
			this.enregistrerProfil(); 
		}; 
		Event.observe(_32, "click", this.enregistrerProfilObserver.bindAsEventListener(this), false); 
		Event.observe(_32, "mouseover", _2e.bindAsEventListener(this, this.idGestionnaire + "_EnregistrerProfil", "/imgs/visu/2D/" + currentPortal + "/ico_couchSav_on.gif"), false); 
		Event.observe(_32, "mouseout", _2e.bindAsEventListener(this, this.idGestionnaire + "_EnregistrerProfil", "/imgs/visu/2D/" + currentPortal + "/ico_couchSav_off.gif"), false); 
	}
	_32 = document.getElementById(this.idGestionnaire + "_SupprimerProfil"); 
	if(_32) {
		this.supprimerProfilObserver = function(_34) {
			this.supprimerProfil(); 
		}; 
		Event.observe(_32, "click", this.supprimerProfilObserver.bindAsEventListener(this), false); 
		Event.observe(_32, "mouseover", _2e.bindAsEventListener(this, this.idGestionnaire + "_SupprimerProfil", "/imgs/visu/2D/" + currentPortal + "/ico_couchSuppr_on.gif"), false); 
		Event.observe(_32, "mouseout", _2e.bindAsEventListener(this, this.idGestionnaire + "_SupprimerProfil", "/imgs/visu/2D/" + currentPortal + "/ico_couchSuppr_off.gif"), false); 
	}
	_32 = $(this.idGestionnaire + "_reglG"); 
	if(_32) {
		Event.observe(_32, "click", this.cacheGestionnaire.bindAsEventListener(this, _32), false); 
	}
	_32 = $(this.idGestionnaire + "_reglD"); 
	if(_32) {
		Event.observe(_32, "click", this.cacheTools.bindAsEventListener(this, _32), false); 
	}
	_32 = $(this.idGestionnaire + "_reglH"); 
	if(_32) {
		var _35 = function() {
			var _36 = ["toolsBox", "header", "footer"]; 
			for(var i = 0; i < _36.length; i++) {
				var div = $(_36[i]); 
				div.style.display = ((!div.style.display) || (div.style.display == "block")) ? "none" : "block"; 
			}
			var _39 = $(this.idGestionnaire + "_reglH"); 
			if(_39.className == "reglH") {
				_39.className = "reglB"; 
				if($("fullScreen")) {
					$("fullScreen").src = "/imgs/visu/2D/" + currentPortal + "/picto_normalScreen_off.gif"; 
				}
			}
			else {
				_39.className = "reglH"; 
				if($("fullScreen")) {
					$("fullScreen").src = "/imgs/visu/2D/" + currentPortal + "/picto_fullScreen_off.gif"; 
				}
			}
			if(__maximizer) {
				__maximizer.recomputeSize(); 
				this.carte.outil.resizeMap(); 
			}
		}; 
		Event.observe(_32, "click", _35.bindAsEventListener(this), false); 
	}
}; 
GestionnaireCarte.prototype.enableLogos = function() {
	return false; 
}; 
GestionnaireCarte.prototype.specialFullScreen = function() {
	var _3a = $("fullScreen"); 
	var _3b = $(this.idGestionnaire + "_reglH"); 
	var _3c = $("winLayers"); 
	var _3d = $("winTools"); 
	var _3e = $(this.idGestionnaire + "_reglG"); 
	var _3f = $(this.idGestionnaire + "_reglD"); 
	if(_3c) {
		if(_3a.src.indexOf("normal") != "-1") {
			if(_3c.style.display != "none") {
				_3c.style.display = "none"; 
				_3e.className = "reglD"; 
			}
		}
		if(_3a.src.indexOf("full") != "-1") {
			if(_3c.style.display != "block") {
				_3c.style.display = "block"; 
				_3e.className = "reglG"; 
			}
		}
	}
	if(_3d) {
		if(_3a.src.indexOf("normal") != "-1") {
			if(_3d.style.display != "none") {
				_3d.style.display = "none"; 
				_3f.className = "reglG"; 
			}
		}
		if(_3a.src.indexOf("full") != "-1") {
			if(_3d.style.display != "block") {
				_3d.style.display = "block"; 
				_3f.className = "reglD"; 
			}
		}
	}
	if(_3a.src.indexOf("normal") != "-1") {
		if(_3b) {
			_3b.className = "reglB"; 
		}
	}
	if(_3a.src.indexOf("full") != "-1") {
		if(_3b) {
			_3b.className = "reglH"; 
		}
	}
	this.carte.outil.resizeMap(); 
}; 
GestionnaireCarte.prototype.enregistrerProfil = function() {
	var _40; 
	$$("#winDialog .firstSubWinTitle .title #spanDialogTitle").first().update(__i18n_profil["enregistrer_libelle"]); 
	if((this.nombreModifications == 0) && (!this.profilCookie)) {
		_40 = "<p id=\"wgc2D_profil_dialogue\">" + " <span id=\"wgc2D_profil_message\">" + __i18n_profil["enregistrer_nonModifie"] + "</span>" + " <p class=\"rightButtonContainer\"><img id=\"wgc2D_profil_fermer_message\" src=\"/imgs/visu/2D/" + currentPortal + "/bt_fermer.gif\" class=\"rightButton closeButton\" alt=\"#{i18n_close}\" /></p>" + " </p>"; 
		$("displDialog").update(_40); 
		$(this.idGestionnaire + "_profil_fermer_message").observe("click", function(evt) {
			$("winDialog").addClassName("invisible"); }
		.bindAsEventListener(this)); 
		$("winDialog").removeClassName("invisible"); 
		return; 
	}
	var _42; 
	_40 = "<fieldset class=\"queryArea\">" + "\t<p id=\"wgc2D_profil_saisie\">" + "\t\t<label for=\"wgc2D_nomProf\">" + __i18n_profil["enregistrer_nomLibelle"] + "</label>" + "\t\t<input type=\"text\" id=\"wgc2D_nomProf\" class=\"text\" value=\"nouveau profil\" style=\"margin-top:10px;\" /><br />" + "\t\t<p id=\"wgc2D_barre_action\" class=\"barrAction rightButtonContainer\">" + "\t\t\t <input type=\"submit\" id=\"wgc2D_okProf\" class=\"btOk\" value=\"\" style=\"background-image:url('" + abspath() + "/imgs/visu/2D/" + currentPortal + "/bt_ok.gif');background-repeat:no-repeat;width:20px;height:20px;\" />" + "\t\t\t <input type=\"button\" id=\"wgc2D_cancelProf\" class=\"btAnnul\" value=\"\" style=\"background-image:url('" + abspath() + "/imgs/visu/2D/" + currentPortal + "/bt_annuler.gif');background-repeat:no-repeat;width:48px;height:20px;\" />" + "\t\t</p>" + "\t</p>" + "</fieldset>"; 
	$("displDialog").update(_40); 
	$(this.idGestionnaire + "_cancelProf").observe("click", function(evt) {
		$("winDialog").addClassName("invisible"); }
	.bindAsEventListener(this)); 
	if((this.profilCookie) && (this.nombreModifications == 0)) {
		_42 = this.profilCookie; 
		$(this.idGestionnaire + "_nomProf").observe("click", function(evt) {
			$(this.idGestionnaire + "_nomProf").value = this.profilName; }
		.bindAsEventListener(this)); 
	}
	else {
		var _45 = new Date(); 
		var _46 = "-" + _45.getFullYear() + "-" + (_45.getMonth() + 1) + "-" + _45.getDate() + "-" + _45.getHours() + "-" + _45.getMinutes(); 
		_42 = this.profil + _46; 
		$(this.idGestionnaire + "_nomProf").observe("click", function(evt) {
			$(this.idGestionnaire + "_nomProf").value = _42; }
		.bindAsEventListener(this)); 
	}
	$(this.idGestionnaire + "_nomProf").value = __i18n_profil["enregistrer_nouveauNom"]; 
	$(this.idGestionnaire + "_okProf").observe("click", function(evt) {
		this.enregistrerProfilSuite(_42); return false; }
	.bindAsEventListener(this)); 
	$("winDialog").removeClassName("invisible"); 
}; 
function abspath() {
	var url = unescape(window.location.href); 
	var _4a = url.indexOf("//") + 2; 
	var _4b = url.substring(0, url.indexOf("/", _4a)); 
	var _4c = _4b; 
	var reg = new RegExp("file:///", "g"); 
	_4c = _4c.replace(reg, ""); 
	return _4c; 
}
GestionnaireCarte.prototype.enregistrerProfilSuite = function(_4e) {
	var _4f = $(this.idGestionnaire + "_nomProf"); 
	var _50 = _4f.value; 
	var _51 = _50.replace(/^\s*|\s*$/,"");
	if(_51 == "") {
		_4f.value = __i18n_profil["enregistrer_nomIncorrect"]; 
		return; 
	}
	var reg = new RegExp("^[a-z\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf9\xfa\xfb\xfcA-Z0-9-_ ]+$"); 
	if(!reg.test(_51)) {
		_4f.value = __i18n_profil["enregistrer_nomIncorrectCaractere"]; 
		return; 
	}
	if(_50 == __i18n_profil["enregistrer_nouveauNom"]) {
		var _53 = new Date(); 
		var _54 = "-" + _53.getFullYear() + "-" + (_53.getMonth() + 1) + "-" + _53.getDate() + "-" + _53.getHours() + "-" + _53.getMinutes(); 
		_50 = this.profil + _54; 
		_4f.value = _50; 
	}
	var _55 = window.Cookie.load(this.getCookieName()); 
	var _56 = false; 
	var _57 = false; 
	var _58 = ""; 
	if(_55) {
		for(var inc = 0; inc < _55.length; inc++) {
			var _5a = window.Cookie.load(this.getCookieName() + "-" + _55[inc]); 
			if(_5a) {
				_58 += _55[inc] + ","; 
				if((_5a[0] == _50) && (_55[inc] != this.profilCookie)) {
					_56 = true; 
				}
			}
			else {
				_57 = true; 
			}
		}
		_58 = _58.substring(0, _58.length - 1); 
	}
	if(_56) {
		_4f.value = __i18n_profil["enregistrer_nomDejaUtilise"]; 
		if(_57) {
			window.Cookie.save(this.getCookieName(), _58, window.Cookie.expiresInDays(this.dureeJoursCookies)); 
		}
		return; 
	}
	$("winDialog").addClassName("invisible"); 
	if((_57) || (!((this.profilCookie) && (this.nombreModifications == 0)))) {
		if(!((this.profilCookie) && (this.nombreModifications == 0))) {
			if(_58 != "") {
				_58 += ","; 
			}
			_58 += _4e; 
		}
		window.Cookie.save(this.getCookieName(), _58, window.Cookie.expiresInDays(this.dureeJoursCookies)); 
	}
	var cg = new ContexteGeographique(this.carte); 
	var ctx = cg.exportModifiedLayersFromProfilToUrlParameters(); 
	var _5d = new Codec(); 
	var _5e = new HuffmanCompresseur(); 
	var _5f = _5d.encode(this.profil); 
	var _60 = _5d.encode("1.0"); 
	ctx = _5e.compresse(_5d.encode(ctx)); 
	window.Cookie.save(this.getCookieName() + "-" + _4e, _50 + "," + _5f + "," + _60 + "," + ctx, window.Cookie.expiresInDays(this.dureeJoursCookies)); 
	if((this.profilCookie) && (this.nombreModifications == 0)) {
		this.profilName = _50; 
		var _61 = $(this.idGestionnaire + "_Select_profil"); 
		for(var is = 0; is < _61.options.length; is++) {
			if(_61.options[is].selected) {
				_61.options[is].text = this.profilName; 
			}
		}
		this._majProfil(); 
	}
	else {
		this.nbCouchesVisibles = 0; 
		this.nombreModifications = 0; 
		this.nombreModificationsOld = 0; 
		this.profilCookie = _4e; 
		this.profilName = _50; 
		var _61 = $(this.idGestionnaire + "_Select_profil"); 
		for(var is = 0; is < _61.options.length; is++) {
			if(_61.options[is].value == "profil-modifie") {
				_61.options[is] = null; 
				break; 
			}
		}
		_61.options[_61.options.length] = new Option(this.profilName, "cookie-" + this.profilCookie, false, true); 
		this.genereEditeur(); 
	}
	var _63 = $(this.idGestionnaire + "_SupprimerProfil"); 
	var _64 = $(this.idGestionnaire + "_SupprimerProfilNo"); 
	if(_63 && _64) {
		_64.style.display = "none"; 
		_63.style.display = "inline"; 
	}
}; 
function Outil(_1) {
	this.carte = _1; 
	this.client = _1.client; 
	this.sliderZoom = null; 
	this.changeTerritoireActif = false; 
	this.outilActif = "drag"; 
	this.alreadyAddFavorite = false; 
	this.displayBullFavorite = false; 
	this.familleProduitMaxLength = 4; 
}
Outil.prototype.centreCarte = function(_2) {
	var _3 = __getCarteById(_2[0]); 
	_3.client.mapCenter(_2[1], _2[2], true); 
	_3.outil.longlat(null, _2[1], _2[2]); 
	_3.changeEchelleClient(_2[3], true); 
	if(_2[4]) {
		if(__recherche.rechercheNormaleParAdresse) {
			_3.outil.showPictoRecherche(_2[1], _2[2], _2[5]); 
		}
	}
}; 
Outil.prototype.showPictoRecherche = function(x, y, _6) {
	this.client.mapRemoveObject("SearchPointer"); 
	var _7 = this.client.mapCreateObject(x, y, "SearchPointer", "1", _6, 10, 10, adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/target.gif"); 
	this.client.mapAddObject(_7); 
	this.client.mapRefresh(); 
}; 
Outil.prototype.resizeMap = function() {
	if(__maximizer) {
		var _8 = $(this.carte.idCarte); 
		__maximizer.recomputeWidth(_8); 
		this.client.mapSetSize(_8.clientWidth, _8.clientHeight); 
	}
}; 
Outil.prototype.listenerZoom = function() {
	var _9 = []; 
	var _a = 0; 
	for(var ic = __gestionnaire.profondeurMin; ic < __gestionnaire.idCouchesDisponibles.length; ic++) {
		var _c = __gestionnaire.idCouchesDisponibles[ic].idCouche; 
		var _d = __gestionnaire.client.mapGetLayer(_c); 
		if(_d != null) {
			if(_d.maxscale > _a) {
				_a = _d.maxscale; 
			}
		}
	}
	ECHELLEMAX = (ECHELLEMAX < _a) ? ECHELLEMAX : NBECHELLE; 
	if(__territoire == "monde") {
		ECHELLEMIN = 4; 
	}
	var _e = ECHELLEMAX - ECHELLEMIN + 1; 
	for(i = 1; i <= _e; i++) {
		_9[i - 1] = NBECHELLE - ECHELLEMAX + i; 
	}
	if(this.sliderZoom) {
		this.sliderZoom.dispose(); 
		delete this.sliderZoom; 
	}
	this.sliderZoom = new Control.Slider("sliderZoom", "trackZoom", {
		axis : "vertical", range : $R(1, NBECHELLE), values : _9, carte : this.carte, dynMap : this.carte.dynMap, sliderValue : NBECHELLE + 1 - this.client.mapGetScale(), updateCursorOnly : false, onSlide : function(v) {
		if(document.getElementById("echelleVal")) {
			document.getElementById("echelleVal").innerHTML = __tableauEchelle[NBECHELLE - v + 1]; }
	}
	, onChange : function(v) {
		if(document.getElementById("echelleVal")) {
			document.getElementById("echelleVal").innerHTML = __tableauEchelle[NBECHELLE - v + 1]; }
		if(!this.updateCursorOnly) {
			this.carte.changeEchelleClient(NBECHELLE + 1 - v, true); }
	}
	}
	); 
	this.sliderZoom.offsetX = 0; 
	this.sliderZoom.offsetY = 0; 
}; 
Outil.prototype.setEchelleVisible = function(_11, _12) {
	if(_12 < _11) {
		ECHELLEMIN = NBECHELLE; 
		ECHELLEMAX = NBECHELLE; 
		this.initZoom(ECHELLEMAX); 
		if(this.sliderZoom) {
			this.sliderZoom.dispose(); 
			delete this.sliderZoom; 
		}
	}
	else {
		if(ECHELLEMIN != _11) {
			ECHELLEMIN = _11; 
			this.client.mapSetMinimumScale(ECHELLEMIN); 
		}
		if(ECHELLEMAX != _12) {
			if(_12 > NBECHELLE) {
				ECHELLEMAX = NBECHELLE; 
			}
			else {
				ECHELLEMAX = _12; 
			}
			this.client.mapSetMaximumScale(ECHELLEMAX); 
		}
		var _13 = this.client.mapGetScale(); 
		if(_13 <= ECHELLEMAX && _13 >= ECHELLEMIN) {
			this.initZoom(_13); 
		}
		else {
			this.initZoom(ECHELLEMAX); 
		}
	}
}; 
Outil.prototype.initZoom = function(val) {
	var _15; 
	if(val) {
		_15 = val; 
	}
	else {
		_15 = ECHELLE; 
	}
	this.listenerZoom(); 
	this.placementCurseur(_15); 
}; 
Outil.prototype.placementCurseur = function(_16) {
	if(this.sliderZoom) {
		this.sliderZoom.options.updateCursorOnly = true; 
		this.sliderZoom.setValue(NBECHELLE + 1 - _16); 
		if(document.getElementById("echelleVal")) {
			document.getElementById("echelleVal").innerHTML = __tableauEchelle[_16]; 
		}
		this.sliderZoom.options.updateCursorOnly = false; 
	}
}; 
Outil.prototype.changeSystProj = function(_17) {
	var _18 = this.client.mapClientToDegree(X, Y); 
	this.longlat(null, _18[0], _18[1]); 
}; 
Outil.prototype.longlat = function(_19, x, y) {
	var _1c; 
	if(x && y) {
		_1c = [x, y]; 
	}
	else {
		x = this.client.mapBrowserGetXposition(_19); 
		y = this.client.mapBrowserGetYposition(_19); 
		_1c = this.client.mapGetLongLat(x, y); 
	}
	var _1d = document.getElementById("longitudeValue"); 
	var _1e = document.getElementById("latitudeValue"); 
	if(_1d && _1e) {
		if(!_1c) {
			var _1f = document.getElementById("longitudeLibelle"); 
			var _20 = document.getElementById("latitudeLibelle"); 
			_1f.innerHTML = "Longitude"; 
			_20.innerHTML = "Latitude"; 
			_1d.innerHTML = this.client.mapDegreesToDMSD(0, ["E", "O"]); 
			_1e.innerHTML = this.client.mapDegreesToDMSD(0, ["N", "S"]); 
		}
		else {
			var _21 = __getTerritoireById(__territoire).systemes[document.getElementById("selectProjection").value]; 
			if(_21.type == "XY") {
				var _1f = document.getElementById("longitudeLibelle"); 
				var _20 = document.getElementById("latitudeLibelle"); 
				_1f.innerHTML = "X"; 
				_20.innerHTML = "Y"; 
				var _22 = _21.degreeToSysteme(_1c[0], _1c[1]); 
				_1d.innerHTML = Math.round(_22[0]); 
				_1e.innerHTML = Math.round(_22[1]); 
			}
			else {
				var _1f = document.getElementById("longitudeLibelle"); 
				var _20 = document.getElementById("latitudeLibelle"); 
				_1f.innerHTML = "Longitude"; 
				_20.innerHTML = "Latitude"; 
				_1d.innerHTML = this.client.mapDegreesToDMSD(_1c[0], ["E", "O"]); 
				_1e.innerHTML = this.client.mapDegreesToDMSD(_1c[1], ["N", "S"]); 
			}
		}
	}
}; 
Outil.prototype.listeTerritoire = function() {
	return __tabTerritoires; 
}; 
Outil.prototype.changeTerritoire = function(_23, _24, _25, _26) {
	var _27 = __getCarteById(_23); 
	_27.client.mapSetMouseMode(); 
	var _28 = new Array(); 
	for(var i = 4; i < this.changeTerritoire.arguments.length; i++) {
		_28.push(this.changeTerritoire.arguments[i]); 
	}
	__territoireCharge = false; 
	if(!_25) {
		var _2a = __i18n_messagesVisu["changementTerritoire_title"]; 
		var msg = __i18n_messagesVisu["changementTerritoire_msg"]; 
		__displayDialog(_2a, msg); 
		this.supprPinBoards(); 
	}
	_24 = this.verifTerritoire(_24); 
	territoireACharger = _24; 
	loadTerritoireParDefaut(); 
	this.changeTerritoireSuite(_23, _25, _26, _28.join("##")); 
}; 
Outil.prototype.changeTerritoireSuite = function(_2c, _2d, _2e, _2f) {
	if(!__propertiesLoaded ||!__territoireCharge) {
		var _30 = function() {
			__getCarteById(_2c).outil.changeTerritoireSuite(_2c, _2d, _2e, _2f); 
		}
		.bind(this); 
		setTimeout(_30, 100); 
	}
	else {
		this.changeTerritoireSuiteSuite(_2c, _2d, _2e, _2f); 
	}
}; 
Outil.prototype.changeTerritoireSuiteSuite = function(_31, _32, _33, _34) {
	this.changeTerritoireActif = true; 
	var _35 = __getCarteById(_31); 
	_35.territoire = __territoire; 
	if(_35.gestionnaire.lieuxRemarquables) {
		_35.gestionnaire.lieuxRemarquables.clear(); 
		delete _35.gestionnaire.lieuxRemarquables; 
	}
	__initLieuRemarquable.apply(_35.gestionnaire); 
	_35.client.mapModify(); 
	_35.client.mapInitProjection(); 
	if(_32) {
		_35.refreshMap(false); 
	}
	else {
		if(_35.gestionnaire.profilsDisponibles[_35.gestionnaire.profil]) {
			_35.gestionnaire.changeProfil(_35.gestionnaire.profil); 
		}
		else {
			_35.gestionnaire.changeProfil(_35.gestionnaire.profilThematiqueDefaut(true)); 
		}
	}
	this.changeTerritoireSuiteSuiteEnd(_31, _32, _33, _34); 
}; 
Outil.prototype.changeTerritoireSuiteSuiteEnd = function(_36, _37, _38, _39) {
	if(!__propertiesLoaded) {
		var _3a = function() {
			__getCarteById(_36).outil.changeTerritoireSuiteSuiteEnd(_36, _37, _38, _39); 
		}
		.bind(this); 
		setTimeout(_3a, 100); 
	}
	else {
		var _3b = __getCarteById(_36); 
		_37 = __stringToBool(_37); 
		if(!_37) {
			_3b.outil.initZoom(); 
			__forceCloseDialog(); 
		}
		if(_38) {
			_38(_39.split("##")); 
		}
		this.changeTerritoireActif = false; 
		this.carte.gestionnaire.displayOwners(true); 
		_3b.client.mapSetMouseMode(3); 
	}
}; 
Outil.prototype.verifTerritoire = function(_3c) {
	if(_3c == "futuna") {
		_3c = "wallis"; 
		ile = "futuna"; 
	}
	else {
		if(_3c == "stbarth") {
			_3c = "guadeloupe"; 
			ile = "stbarth"; 
		}
		else {
			if(_3c == "stmartin") {
				_3c = "guadeloupe"; 
				ile = "stmartin"; 
			}
			else {
				ile = _3c; 
			}
		}
	}
	return _3c; 
}; 
Outil.prototype.initLieuRemarquable = function() {
	var _3d = document.getElementById("ipSpot"); 
	if(this.changeTerritoirePOI == null && _3d) {
		while(_3d.options.length > 1) {
			_3d.options[1] = null; 
		}
		if(this.carte.gestionnaire.lieuxRemarquables) {
			for(var inc = 0; inc < this.carte.gestionnaire.lieuxRemarquables.length; inc++) {
				_3d.options[_3d.options.length] = new Option(this.carte.gestionnaire.lieuxRemarquables[inc].libelle, this.carte.gestionnaire.lieuxRemarquables[inc].libelle, false, false);
			}
		}
	}
}; 
Outil.prototype.initLieuFavori = function() {
	this.lieuFavoriCookie = null; 
	this.lieuFavoriNom = null; 
	this.lieuxFavorisDisponibles = new Array(); 
	this.dureeJoursCookies = 365; 
	this.lieuxFavorisPinBoards = new Array(); 
	var _3f = document.getElementById("ipSpot"); 
	if(_3f) {
		var _40 = window.Cookie.load("geo" + ___geoportail + "-lieuxfavoris"); 
		if(_40) {
			for(var inc = 0; inc < _40.length; inc++) {
				var _42 = window.Cookie.load("geo" + ___geoportail + "-lieuxfavoris-" + _40[inc]); 
				if(_42) {
					_3f.options[_3f.options.length] = new Option(_42[0], _42[0], false, false); 
				}
			}
		}
	}
}; 
Outil.prototype.selectionLieu = function() {
	if(!this.alreadyAddFavorite) {
		this.alreadyAddFavorite = true; 
		this._CarteAjoutElement = this.ajoutElement.bindAsEventListener(this); 
		if(document.getElementById(this.carte.idCarte)) {
			Event.observe(document.getElementById(this.carte.idCarte), "click", this._CarteAjoutElement, false); 
		}
	}
}; 
Outil.prototype.enregistrementLieu = function() {
	var _43 = document.getElementById("nomLieuFavori"); 
	if(_43) {
		var _44 = _43.value; 
		var _45 = document.getElementById("ctxLieuFavori").value; 
		var _46 = document.getElementById("versionLieuFavori").value; 
		var _47 = _44.replace(/^\s*|\s*$/,"");
		if(_47 == "") {
			_43.onfocus = function() {
				this.value = _44; 
			}; 
			_43.value = __i18n_lieuFavori["enregistrer_nomIncorrect"]; 
			_43 = null; 
			return; 
		}
		var reg = new RegExp("^[a-z\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf9\xfa\xfb\xfcA-Z0-9-_ ]+$"); 
		if(!reg.test(_47)) {
			_43.onfocus = function() {
				this.value = _44; 
			}; 
			_43.value = __i18n_lieuFavori["enregistrer_nomIncorrectCaractere"]; 
			_43 = null; 
			return; 
		}
		if(!_45 || _45 == "") {
			alert(__i18n_lieuFavori["enregistrer_erreur"]); 
			this.fermetureLieu(); 
		}
		var _49 = window.Cookie.load("geo" + ___geoportail + "-lieuxfavoris"); 
		var _4a = false; 
		var _4b = false; 
		var _4c = ""; 
		if(_49) {
			for(var inc = 0; inc < _49.length; inc++) {
				var _4e = window.Cookie.load("geo" + ___geoportail + "-lieuxfavoris-" + _49[inc]); 
				if(_4e) {
					_4c += _49[inc] + ","; 
					if((_4e[0] == _47) && (_49[inc] != this.lieuFavoriCookie)) {
						_4a = true; 
					}
				}
				else {
					_4b = true; 
				}
			}
			_4c = _4c.substring(0, _4c.length - 1); 
		}
		if(this.carte.gestionnaire.lieuxRemarquables) {
			for(var inc = 0; inc < this.carte.gestionnaire.lieuxRemarquables.length; inc++) {
				if(this.carte.gestionnaire.lieuxRemarquables[inc].libelle.toLowerCase() == _47.toLowerCase()) {
					_4a = true; 
				}
			}
		}
		if(_4a) {
			_43.onfocus = function() {
				this.value = _44; 
			}; 
			_43.value = "Nom incorrect. Veuillez le modifier."; 
			_43 = null; 
			if(_4b) {
				window.Cookie.save("geo" + ___geoportail + "-lieuxfavoris", _4c, window.Cookie.expiresInDays(this.dureeJoursCookies)); 
			}
			return; 
		}
		this.client.mapRemoveObject("tmp"); 
		this.client.mapRefresh(); 
		var _4f = this.decodeParams(_45); 
		var _50 = []; 
		if(_4f["viewVersion"] < 1.1) {
			_50 = this.client.mapClientToDegree(_4f["x"], _4f["y"]); 
		}
		else {
			_50 = [_4f["x"], _4f["y"]]; 
		}
		cookieLoad = {
				territoire : _4f["carte"], x : _50[0], y : _50[1], scale : _4f["scale"], remarquable : false}; 
		this.ajoutPinBoard(_47, cookieLoad); 
		this.fermetureLieu(); 
		if(_4c != "") {
			_4c += ","; 
		}
		_4c += _47; 
		window.Cookie.save("geo" + ___geoportail + "-lieuxfavoris", _4c, window.Cookie.expiresInDays(this.dureeJoursCookies)); 
		window.Cookie.save("geo" + ___geoportail + "-lieuxfavoris-" + _47, _47 + "," + _46 + "," + _45, window.Cookie.expiresInDays(this.dureeJoursCookies)); 
		if(this.lieuFavoriNom == null) {
			this.in_ac_ImgSuppr("start"); 
		}
		this.lieuFavoriNom = _47; 
		var _51 = document.getElementById("ipSpot"); 
		if(_51) {
			_51.options[_51.options.length] = new Option(this.lieuFavoriNom, this.lieuFavoriNom, false, true); 
		}
	}
}; 
Outil.prototype.changeImage = function(_52, id, src) {
	var _55 = document.getElementById("ipSpot"); 
	if(_55) {
		if(_55.options.length > 1) {
			__modifImage(id, src); 
		}
		else {
			return false; 
		}
	}
}; 
Outil.prototype.in_ac_ImgSuppr = function(_56) {
	var _57 = document.getElementById("supprLFav"); 
	if(this._s_supprLieu == null) {
		this._supprLieu = this.supprElement.bindAsEventListener(this); 
	}
	if(this._favTrash_on == null) {
		this._favTrash_on = this.changeImage.bindAsEventListener(this, "supprLFav", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_favTrash_on.gif"); 
	}
	if(this._favTrash_off == null) {
		this._favTrash_off = this.changeImage.bindAsEventListener(this, "supprLFav", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_favTrash_off.gif"); 
	}
	if(_57) {
		if(_56 == "start") {
			__modifImage("supprLFav", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_favTrash_off.gif"); 
			Event.observe(_57, "click", this._supprLieu, false); 
			Event.observe(_57, "mouseover", this._favTrash_on, false); 
			Event.observe(_57, "mouseout", this._favTrash_off, false); 
		}
		else {
			if(_56 == "stop") {
				__modifImage("supprLFav", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_favTrash_no.gif"); 
				Event.stopObserving(_57, "click", this._supprLieu, false); 
				Event.stopObserving(_57, "mouseover", this._favTrash_on, false); 
				Event.stopObserving(_57, "mouseout", this._favTrash_off, false); 
			}
		}
	}
}; 
Outil.prototype.decodeParams = function(_58) {
	var _59 = new Codec(); 
	var _5a = new HuffmanCompresseur(); 
	_58 = _59.decode(_5a.decompresse(_58)); 
	this.carte.gcg.setParameters(_58, "*", ":"); 
	this.carte.gcg.expandParameters(); 
	_58 = this.carte.gcg.parameters; 
	return _58; 
}; 
Outil.prototype.ajoutPinBoard = function(_5b, _5c) {
	var _5d = _5c["territoire"]; 
	if(!_5d) {
		return; 
	}
	var _5e = ""; 
	for(var cle in _5c) {
		if(!(_5c[cle]instanceof Function)) {
			if(_5c[cle]) {
				_5e += cle + "=" + _5c[cle] + "|"; 
			}
		}
	}
	if(_5d != __territoire) {
		this.changeTerritoirePOI = true; 
		this.changeTerritoire(this.carte.idCarte, _5d, false, this.ajoutPinBoardSurTerritoire, this.carte.idCarte, _5b, _5e); 
	}
	else {
		delete this.changeTerritoirePOI; 
		var _60 = new Array(); 
		_60.push(this.carte.idCarte); 
		_60.push(_5b); 
		_60.push(_5e); 
		this.ajoutPinBoardSurTerritoire(_60); 
	}
	var _61 = document.getElementById("ipSpot"); 
	if(_61) {
		for(var slf = 1; slf < _61.options.length; slf++) {
			if(_61.options[slf].value == this.lieuFavoriNom) {
				_61.options[slf].selected = true; 
				break; 
			}
		}
	}
}; 
Outil.prototype.ajoutPinBoardSurTerritoire = function(_63) {
	var _64 = __getCarteById(_63[0]); 
	var _65 = _63[1]; 
	var _66 = _63[2]; 
	if(typeof(_66) == "string") {
		var _67 = _66.split("|"); 
		var _68 = new Array(); 
		for(var i = 0; i < _67.length; i++) {
			if(_67[i] != null && _67[i] != "") {
				_68[_67[i].split("=")[0]] = _67[i].split("=")[1]; 
			}
		}
		_66 = _68; 
	}
	var _6a = _66["territoire"]; 
	var _6b = []; 
	if((_66["remarquable"] == null || _66["remarquable"] == false) && _66["viewVersion"] < 1.1) {
		_6b = _64.client.mapClientToDegree(_66["x"], _66["y"]); 
		_66["x"] = _6b[0]; 
		_66["y"] = _6b[1]; 
	}
	var _6c = _64.outil.getSpotXY(); 
	var obj = _64.client.mapCreateObject(_66["x"], _66["y"], _65, "1", _65, _6c[0], _6c[1], adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/cursorAddFav.gif"); 
	_64.client.mapAddObject(obj); 
	if(_64.outil.displayBullFavorite) {
		_64.client.gestionnaire.poiInterface.objectManager.objectEventListener("mousedown", _65); 
	}
	if(_66["remarquable"]) {
		_64.client.mapSetScale(_66["scale"]); 
	}
	_64.client.mapCenter(_66["x"], _66["y"], true); 
	console.debug("xxx : " + _66["x"] + "-" + _66["y"]); 
	_64.outil.lieuxFavorisPinBoards.push(obj.id); 
	var _6e = document.getElementById("ipSpot"); 
	if(_6e) {
		for(var slf = 1; slf < _6e.options.length; slf++) {
			if(_6e.options[slf].value == _65) {
				_6e.options[slf].selected = true; 
				break; 
			}
		}
	}
}; 
Outil.prototype.nomLieu = function(_70, ctx) {
	this.stopEventObserve(); 
	var _72 = __i18n_lieuFavori["enregistrer_title"]; 
	var _73 = new Date(); 
	var _74 = "<form name=\"enregistrementLieuFavoriForm\" id=\"enregistrementLieuFavoriForm\">" + "\t<input type=\"hidden\" id=\"versionLieuFavori\" value=\"" + _70 + "\" />" + "\t<input type=\"hidden\" id=\"ctxLieuFavori\" value=\"" + ctx + "\" />" + "\t<label class=\"textLatLong\">" + __i18n_lieuFavori["enregistrer_nouveauNom"] + "</label>" + "\t<input type=\"text\" name=\"nomLieuFavori\" id=\"nomLieuFavori\" class=\"text\" value=\"" + __i18n_lieuFavori["enregistrer_debutNomDefaut"] + "-" + _73.getFullYear() + "-" + (_73.getMonth() + 1) + "-" + _73.getDate() + "-" + _73.getHours() + "-" + _73.getMinutes() + "\" />" + "\t<p class=\"barrAction\"><input id=\"enregistreLieuFavori\" class=\"btOk\" type=\"button\" value=\"" + __i18n_lieuFavori["enregistrer_valider"] + "\" /> " + "\t<input id=\"annuleLieuFavori\" class=\"btAnnul\" type=\"button\" value=\"" + __i18n_lieuFavori["enregistrer_annuler"] + "\"/></p> " + "</form>"; 
	__displayDialog(_72, _74, this.fermetureLieu.bindAsEventListener(this), null, 30 + "em"); 
	document.enregistrementLieuFavoriForm.nomLieuFavori.focus(); 
	if(this._fermetureLieu == null) {
		this._fermetureLieu = this.fermetureLieu.bindAsEventListener(this); 
	}
	if(this._enregistrementLieu == null) {
		this._enregistrementLieu = this.enregistrementLieu.bindAsEventListener(this); 
	}
	var _75 = document.getElementById("enregistrementLieuFavoriForm"); 
	if(_75) {
		Event.observe(_75, "keypress", function(_76) {
			if(_76.keyCode == Event.KEY_RETURN) {
				this._enregistrementLieu(); Event.stop(_76); return false; }
		}
		.bindAsEventListener(this)); 
	}
	_75 = document.getElementById("annuleLieuFavori"); 
	if(_75) {
		Event.observe(_75, "click", this._fermetureLieu, false); 
	}
	_75 = document.getElementById("enregistreLieuFavori"); 
	if(_75) {
		Event.observe(_75, "click", this._enregistrementLieu, false); 
	}
}; 
Outil.prototype.validsupprLieu = function(_77, ctx) {
	var _79 = __i18n_lieuFavori["supprimer_title"]; 
	var _7a = new Date(); 
	var _7b = "<form name=\"suppresionLieuFavoriForm\" id=\"suppresionLieuFavoriForm\">" + "\t<label class=\"textLatLong\">" + __i18n_lieuFavori["supprimer_confirmation"] + "</label><br>" + "\t<input id=\"supprLieuFavori\" class=\"btOk\" type=\"button\" value=\"" + __i18n_lieuFavori["enregistrer_valider"] + "\" /> " + "\t<input id=\"annulesupprLieuFavori\" class=\"btAnnul\" type=\"button\" value=\"" + __i18n_lieuFavori["enregistrer_annuler"] + "\"/> " + "</form>"; 
	__displayDialog(_79, _7b, this.fermetureLieu.bindAsEventListener(this)); 
	if(this._fermeturesupprLieu == null) {
		this._fermeturesupprLieu = this.fermeturesupprLieu.bindAsEventListener(this); 
	}
	if(this._suppressionLieu == null) {
		this._suppressionLieu = this.suppressionLieu.bindAsEventListener(this); 
	}
	var _7c = document.getElementById("annulesupprLieuFavori"); 
	if(_7c) {
		Event.observe(_7c, "click", this._fermeturesupprLieu, false); 
	}
	_7c = document.getElementById("supprLieuFavori"); 
	if(_7c) {
		Event.observe(_7c, "click", this._suppressionLieu, false); 
	}
}; 
Outil.prototype.fermetureLieu = function() {
	var _7d = document.getElementById("winDialog"); 
	if(_7d) {
		var _7e = document.getElementById("annuleLieuFavori"); 
		if(_7e) {
			Event.stopObserving(_7e, "click", this._fermetureLieu); 
		}
		_7e = document.getElementById("enregistreLieuFavori"); 
		if(_7e) {
			Event.stopObserving(_7e, "click", this._enregistrementLieu); 
		}
		if(document.forms["enregistrementLieuFavoriForm"]) {
			document.forms["enregistrementLieuFavoriForm"].reset(); 
		}
		window.UnObtrusive.addClassNames(_7d, "invisible"); 
		this.client.mapRemoveObject("tmp"); 
		this.client.mapRefresh(); 
		this._modeSouris(this, "drag"); 
	}
}; 
Outil.prototype.fermeturesupprLieu = function() {
	var _7f = document.getElementById("winDialog"); 
	if(_7f) {
		var _80 = document.getElementById("annulesupprLieuFavori"); 
		if(_80) {
			Event.stopObserving(_80, "click", this._fermeturesupprLieu); 
		}
		_80 = document.getElementById("supprLieuFavori"); 
		if(_80) {
			Event.stopObserving(_80, "click", this._suppressionLieu); 
		}
		document.forms["suppresionLieuFavoriForm"].reset(); 
		window.UnObtrusive.addClassNames(_7f, "invisible"); 
		this._modeSouris(this, "drag"); 
	}
}; 
Outil.prototype.changeLieu = function(_81) {
	var _82 = true; 
	if(this.lieuFavoriNom != null) {
		_82 = false; 
	}
	var _83 = document.getElementById("ipSpot"); 
	var _84 = false; 
	if(_83) {
		for(slf = 1; slf < _83.options.length; slf++) {
			if(_83.options[slf].selected == true) {
				this.lieuFavoriNom = _83.options[slf].value; 
				_84 = true; 
				break; 
			}
		}
	}
	if(!_84) {
		__modifImage("supprLFav", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_favTrash_no.gif"); 
		return; 
	}
	__modifImage("supprLFav", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_favTrash_off.gif"); 
	var _85; 
	var _86 = document.getElementById("selectTerr"); 
	if(_86 && this.carte.gestionnaire.lieuxRemarquables && _83.selectedIndex <= this.carte.gestionnaire.lieuxRemarquables.length) {
		var _87 = this.client.mapClientToDegree(this.carte.gestionnaire.lieuxRemarquables[_83.selectedIndex - 1].x, this.carte.gestionnaire.lieuxRemarquables[_83.selectedIndex - 1].y); 
		_85 = {
				territoire : _86.options[_86.selectedIndex].value, x : _87[0], y : _87[1], scale : this.carte.gestionnaire.lieuxRemarquables[_83.selectedIndex - 1].scale, remarquable : true}; 
	}
	else {
		_85 = window.Cookie.load("geo" + ___geoportail + "-lieuxfavoris-" + this.lieuFavoriNom); 
		var _88 = this.decodeParams(_85[2]); 
		_85 = {
				territoire : _88["carte"], x : _88["x"], y : _88["y"], scale : _88["scale"], remarquable : false, viewVersion : _88["viewVersion"]}; 
	}
	_83.options[slf].selected = true; 
	if(_82) {
		this.in_ac_ImgSuppr("start"); 
	}
	if(this.carte.gestionnaire.lieuxRemarquables && _83.selectedIndex <= this.carte.gestionnaire.lieuxRemarquables.length) {
		this.ajoutPinBoard(this.carte.gestionnaire.lieuxRemarquables[_83.selectedIndex - 1].libelle, _85); 
	}
	else {
		this.ajoutPinBoard(this.lieuFavoriNom, _85); 
	}
}; 
Outil.prototype.ajoutElement = function(_89) {
	var x = this.client.mapBrowserGetXposition(_89); 
	var y = this.client.mapBrowserGetYposition(_89); 
	var _8c = this.carte.dynMap.browser.getElementLeft(this.carte.dynMap.mainDiv); 
	var _8d = this.carte.dynMap.browser.getElementTop(this.carte.dynMap.mainDiv); 
	var xpx = x - _8c; 
	var ypx = y - _8d; 
	var _90 = this.carte.dynMap.calcMapX(xpx) * this.carte.dynMap.precision; 
	var _91 = this.carte.dynMap.calcMapY(ypx) * this.carte.dynMap.precision; 
	var _92 = this.client.mapClientToDegree(_90, _91); 
	var cg = new ContexteGeographique(this.carte, _92[0], _92[1]); 
	var ctx = cg.exportCurrentMapToUrlParameters(); 
	ctx += "*" + cg.exportCurrentViewToUrlParameters(); 
	var _95 = new Codec(); 
	var _96 = new HuffmanCompresseur(); 
	var _97 = _95.encode("1.0"); 
	ctx = _96.compresse(_95.encode(ctx)); 
	var _98 = this.getSpotXY(); 
	var _99 = this.client.mapClientToDegree(_90, _91); 
	var obj = this.client.mapCreateObject(_99[0], _99[1], "tmp", "1", "tmp", _98[0], _98[1], adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/cursorAddFav.gif"); 
	this.client.mapAddObject(obj); 
	this.client.mapRefresh(); 
	this.nomLieu(_97, ctx); 
	this.alreadyAddFavorite = false; 
}; 
Outil.prototype.getSpotXY = function() {
	if(/MSIE/.test(navigator.userAgent)){return[__pinBoardOffsets.x+4,__pinBoardOffsets.y+2];
	}
	else {
		return[__pinBoardOffsets.x + 1, __pinBoardOffsets.y]; 
	}
}; 
Outil.prototype.supprPinBoards = function() {
	for(var i = 0; i < this.lieuxFavorisPinBoards.length; i++) {
		__debug(this.lieuxFavorisPinBoards[i]); 
		if(this.lieuxFavorisPinBoards[i] != null) {
			this.client.mapRemoveObject(this.lieuxFavorisPinBoards[i]); 
			delete this.lieuxFavorisPinBoards[i]; 
		}
	}
	this.client.mapRefresh(); 
	if(this.changeTerritoirePOI == null && document.getElementById("ipSpot")) {
		document.getElementById("ipSpot").options[0].selected = true; 
	}
}; 
Outil.prototype.supprElement = function(_9c) {
	var _9d = document.getElementById("ipSpot"); 
	if(_9d) {
		if(this.carte.gestionnaire.lieuxRemarquables) {
			if(_9d.selectedIndex > this.carte.gestionnaire.lieuxRemarquables.length) {
				var ctx = ""; 
				var _9f = ""; 
				this.validsupprLieu(_9f, ctx); 
			}
		}
		else {
			var ctx = ""; 
			var _9f = ""; 
			this.validsupprLieu(_9f, ctx); 
		}
	}
}; 
Outil.prototype.suppressionLieu = function() {
	var _a0 = window.Cookie.load("geo" + ___geoportail + "-lieuxfavoris"); 
	if(_a0) {
		listeNoms = ""; 
		for(var inc = 0; inc < _a0.length; inc++) {
			if(_a0[inc] != this.lieuFavoriNom && listeNoms != "") {
				listeNoms += "," + _a0[inc]; 
			}
			else {
				if(_a0[inc] != this.lieuFavoriNom && listeNoms == "") {
					listeNoms += _a0[inc]; 
				}
			}
		}
		window.Cookie.save("geo" + ___geoportail + "-lieuxfavoris", listeNoms, window.Cookie.expiresInDays(this.dureeJoursCookies)); 
	}
	window.Cookie.remove("geo" + ___geoportail + "-lieuxfavoris-" + this.lieuFavoriNom); 
	this.client.mapRemoveObject(this.lieuFavoriNom); 
	this.client.mapRefresh(); 
	for(var i = 0; i < this.lieuxFavorisPinBoards.length; i++) {
		if(this.lieuxFavorisPinBoards[i] != null && this.lieuxFavorisPinBoards[i] == this.lieuFavoriNom) {
			delete this.lieuxFavorisPinBoards[i]; 
			break; 
		}
	}
	var _a3 = document.getElementById("ipSpot"); 
	if(_a3) {
		for(var slf = 1; slf < _a3.options.length; slf++) {
			if(_a3.options[slf].value == this.lieuFavoriNom) {
				_a3.options[slf] = null; 
				break; 
			}
		}
		_a3.options[0].selected = true; 
	}
	this.lieuFavoriNom = null; 
	this.in_ac_ImgSuppr("stop"); 
	this.fermeturesupprLieu(); 
}; 
Outil.prototype.stopEventObserve = function(key) {
	if(document.getElementById(this.carte.idCarte)) {
		Event.stopObserving(document.getElementById(this.carte.idCarte), "click", this._CarteAjoutElement); 
	}
	this._CarteAjoutElement = null; 
	this.alreadyAddFavorite = false; 
}; 
Outil.prototype.initOutils = function() {
	this.client.mapSetMouseMode("drag"); 
	this.initEventOutils(); 
	this.initLieuRemarquable(); 
	this.initLieuFavori(); 
}; 
Outil.prototype.outilsFlush = function() {
	if(this.sliderZoom) {
		this.sliderZoom.dispose(); 
		delete this.sliderZoom; 
	}
}; 
Outil.prototype.initEventOutils = function() {
	var _a6 = function(_a7, id, src) {
		__modifImage(id, src); 
		return false; 
	}; 
	var _aa, _ab; 
	__gestionCurseur.handOpen = __gestionCurseur.modifMap.bindAsEventListener(this, adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/roam.cur", "pointer", true); 
	__gestionCurseur.handClose = __gestionCurseur.modifMap.bindAsEventListener(this, adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/roaming.cur", "move", true); 
	var _ac = document.getElementById(this.carte.idCarte); 
	if(_ac) {
		Event.observe(_ac, "mouseover", __gestionCurseur.handOpen, false); 
		Event.observe(_ac, "mousedown", __gestionCurseur.handClose, false); 
		Event.observe(_ac, "mouseup", __gestionCurseur.handOpen, false); 
	}
	Event.observe(_ac, "mousemove", this.longlat.bindAsEventListener(this), false); 
	Event.observe(document.getElementById("selectProjection"), "change", this.changeSystProj.bindAsEventListener(this), false); 
	_aa = document.getElementById("ipSpot"); 
	if(_aa) {
		Event.observe(_aa, "change", this.changeLieu.bindAsEventListener(this), false); 
	}
	_aa = document.getElementById("addLFav"); 
	if(_aa) {
		var _ad = function() {
			this.selectionLieu(); 
			return false; 
		}
		.bindAsEventListener(this); 
		Event.observe(_aa, "click", _ad, false); 
	}
	_aa = document.getElementById("visu3dMap"); 
	var _ae = function() {
		_a6(this, "visu3d", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_visu3dMap_over.gif"); 
		return false; 
	}
	.bindAsEventListener(this); 
	var _af = function(_b0, _b1) {
		_a6(this, "visu3d", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_visu3dMap_off.gif"); 
		_aa.style.cursor = "pointer"; 
		return false; 
	}
	.bindAsEventListener(this); 
	var _b2 = function(_b3, _b4) {
		this.carte.gcg.switchVisu("visu2D", "visu3D"); 
		return false; 
	}
	.bindAsEventListener(this); 
	if(_aa) {
		Event.observe(_aa, "mouseover", _ae, false); 
		Event.observe(_aa, "mouseout", _af, false); 
		Event.observe(_aa, "click", _b2, false); 
	}
	_aa = document.getElementById("drag"); 
	_ab = document.getElementById("zoomSel"); 
	var _b5 = document.getElementById("addLFav"); 
	if(_aa && _ab && _b5) {
		this._modeSouris = function(_b6, _b7) {
			if(_b7 != this.outilActif) {
				var map = this.carte; 
				__modifImage(this.outilActif, adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_" + this.outilActif + "_off.gif"); 
				__modifImage(_b7, adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_" + _b7 + "_on.gif"); 
				switch(_b7) {
				case"drag" : this.stopEventObserve(); 
				if(_ac) {
					Event.observe(_ac, "mouseover", __gestionCurseur.handOpen, false); 
					Event.observe(_ac, "mousedown", __gestionCurseur.handClose, false); 
					Event.observe(_ac, "mouseup", __gestionCurseur.handOpen, false); 
				}
				this.client.mapSetMouseMode(_b7); 
				break; 
				case"zoomSel" : this.stopEventObserve(); 
				if(_ac) {
					Event.stopObserving(_ac, "mouseover", __gestionCurseur.handOpen); 
					Event.stopObserving(_ac, "mousedown", __gestionCurseur.handClose); 
					Event.stopObserving(_ac, "mouseup", __gestionCurseur.handOpen); 
				}
				this.client.mapSetMouseMode(_b7); 
				break; 
				case"addLFav" : if(_ac) {
					Event.stopObserving(_ac, "mouseover", __gestionCurseur.handOpen); 
					Event.stopObserving(_ac, "mousedown", __gestionCurseur.handClose); 
					Event.stopObserving(_ac, "mouseup", __gestionCurseur.handOpen); 
				}
				this.client.mapSetMouseMode(_b7); 
				this.client.mapSetMouseCursor("url('" + adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/cursorAddFav.cur'), pointer"); 
				break; 
				}
				this.outilActif = _b7; 
			}
			return false; 
		}; 
		var _b9 = function(_ba, id) {
			if(id != this.outilActif) {
				__modifImage(id, adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_" + id + "_over.gif"); 
			}
		}; 
		var _bc = function(_bd, id) {
			if(id != this.outilActif) {
				__modifImage(id, adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_" + id + "_off.gif"); 
			}
		}; 
		Event.observe(_aa, "click", this._modeSouris.bindAsEventListener(this, "drag"), false); 
		Event.observe(_aa, "mouseover", _b9.bindAsEventListener(this, "drag"), false); 
		Event.observe(_aa, "mouseout", _bc.bindAsEventListener(this, "drag"), false); 
		Event.observe(_ab, "click", this._modeSouris.bindAsEventListener(this, "zoomSel"), false); 
		Event.observe(_ab, "mouseover", _b9.bindAsEventListener(this, "zoomSel"), false); 
		Event.observe(_ab, "mouseout", _bc.bindAsEventListener(this, "zoomSel"), false); 
		Event.observe(_b5, "click", this._modeSouris.bindAsEventListener(this, "addLFav"), false); 
		Event.observe(_b5, "mouseover", _b9.bindAsEventListener(this, "addLFav"), false); 
		Event.observe(_b5, "mouseout", _bc.bindAsEventListener(this, "addLFav"), false); 
	}
	_aa = document.getElementById("marqPage"); 
	if(_aa) {
		var _bf = function() {
			this.carte.gcg.saveContextNavigator(); 
			return false; 
		}
		.bindAsEventListener(this); 
		Event.observe(_aa, "click", _bf, false); 
		Event.observe(_aa, "mouseover", _a6.bindAsEventListener(this, "marqPage", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_marqPage_over.gif"), false); 
		Event.observe(_aa, "mouseout", _a6.bindAsEventListener(this, "marqPage", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_marqPage_off.gif"), false); 
	}
	_aa = document.getElementById("mailTo"); 
	if(_aa) {
		var _c0 = function() {
			this.carte.gcg.sendContextToFriend(); 
			return false; 
		}
		.bindAsEventListener(this); 
		Event.observe(_aa, "click", _c0, false); 
		Event.observe(_aa, "mouseover", _a6.bindAsEventListener(this, "mailTo", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_mailTo_over.gif"), false); 
		Event.observe(_aa, "mouseout", _a6.bindAsEventListener(this, "mailTo", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_mailTo_off.gif"), false); 
	}
	_aa = document.getElementById("rechGeocat"); 
	if(_aa) {
		var _c1 = function(_c2) {
			_c2 = _c2 || window.event; 
			var tgt = _c2.target || _c2.srcElement; 
			var tab = this.client.mapGetBoundingBox(); 
			var XY1 = this.client.mapClientToRadian(tab[0], tab[1]); 
			var XY2 = this.client.mapClientToRadian(tab[2], tab[3]); 
			XY1[0] = this.client.mapRadianToDegree(XY1[0]) / 100; 
			XY1[1] = this.client.mapRadianToDegree(XY1[1]) / 100; 
			XY2[0] = this.client.mapRadianToDegree(XY2[0]) / 100; 
			XY2[1] = this.client.mapRadianToDegree(XY2[1]) / 100; 
			tgt.href = tgt.href + "?east=" + XY2[0] + "&north=" + XY1[1] + "&south=" + XY2[1] + "&west=" + XY1[0]; 
		}
		.bindAsEventListener(this); 
		Event.observe(_aa, "click", _c1, false); 
	}
	var _c7 = function(_c8, id) {
		var _ca = Math.max(ECHELLEMIN, Math.min(ECHELLEMAX, 1 + Math.round((NBRECTANGLES - id) * (NBECHELLE - 1) / (NBRECTANGLES - 1)))); 
		var reg = new RegExp("toolZoom" + id + "0_off.gif", "g"); 
		if(document.getElementById("zoom" + id)) {
			if(reg.test(document.getElementById("zoom" + id).src)) {
				this.carte.changeEchelleClient(_ca, true); 
			}
		}
		return false; 
	}; 
	var _cc = function() {
		this.carte.changeEchelleClient(this.carte.getEchelle() + 1, true); 
	}
	.bindAsEventListener(this); 
	var _cd = function() {
		this.carte.changeEchelleClient(this.carte.getEchelle() - 1, true); 
	}
	.bindAsEventListener(this); 
	if(document.getElementById("zoom1")) {
		Event.observe(document.getElementById("zoom1"), "click", _c7.bindAsEventListener(this, "1"), false); 
	}
	if(document.getElementById("zoom2")) {
		Event.observe(document.getElementById("zoom2"), "click", _c7.bindAsEventListener(this, "2"), false); 
	}
	if(document.getElementById("zoom3")) {
		Event.observe(document.getElementById("zoom3"), "click", _c7.bindAsEventListener(this, "3"), false); 
	}
	if(document.getElementById("zoom4")) {
		Event.observe(document.getElementById("zoom4"), "click", _c7.bindAsEventListener(this, "4"), false); 
	}
	if(document.getElementById("zoom5")) {
		Event.observe(document.getElementById("zoom5"), "click", _c7.bindAsEventListener(this, "5"), false); 
	}
	if(document.getElementById("zoom6")) {
		Event.observe(document.getElementById("zoom6"), "click", _c7.bindAsEventListener(this, "6"), false); 
	}
	if(document.getElementById("zoom7")) {
		Event.observe(document.getElementById("zoom7"), "click", _c7.bindAsEventListener(this, "7"), false); 
	}
	if(document.getElementById("zoom8")) {
		Event.observe(document.getElementById("zoom8"), "click", _c7.bindAsEventListener(this, "8"), false); 
	}
	if(document.getElementById("zoomDec")) {
		Event.observe(document.getElementById("zoomDec"), "click", _cc, false); 
	}
	if(document.getElementById("zoomInc")) {
		Event.observe(document.getElementById("zoomInc"), "click", _cd, false); 
	}
	_aa = document.getElementById("selectTerr"); 
	if(_aa) {
		var _ce = function() {
			this._scale = null; 
			this.changeTerritoire(this.carte.idCarte, _aa.options[_aa.selectedIndex].value, false); 
			__modifImage("supprLFav", adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/picto_favTrash_no.gif"); 
		}
		.bindAsEventListener(this); 
		Event.observe(_aa, "change", _ce, false); 
	}
}; 
var __gestionCurseur = {
		modifMap : function(_cf, _d0, _d1, url) {
	this.stopEventObserve(); 
	if(url) {
		_d0 = "url('" + _d0 + "'), " + _d1; 
	}
	this.client.mapSetMouseCursor(_d0); 
}
, modif : function(_d3, _d4, _d5, _d6, url) {
	if(url) {
		_d5 = "url('" + _d5 + "'), " + _d6; 
	}
	_d4.style.cursor = _d5; 
}
}; 
var __territoireCharge = false; 
var __map_cartes = new Array(); 
function __getCarteById(_1) {
	return __map_cartes[_1]; 
}
function Carte(_2, _3, _4) {
	if(__getCarteById(_2)) {
		alert("Carte: une carte d'identifiant " + _2 + " existe d\xe9j\xe0 !"); 
		return; 
	}
	this.idCarte = _2; 
	this.disableInitScale = true; 
	this.territoire = __territoire; 
	if(_3) {
		this.client = _3.client; 
		this.outil = new Outil(this); 
		if(is3D) {
			this.TE = new TerraExplorer(this); 
			this.TE.init(); 
			this.TE.addTE(this.TE.idTE, this.TE); 
			this.client.initTerra(this.TE); 
		}
		this.dynMap = this.client.mapCreate(this.idCarte); 
		__map_cartes[_2] = this; 
		if(_3 && (!_3.setCarte(this.idCarte))) {
			alert("Carte: l'initialisation du gestionnaire a \xe9chou\xe9e !"); 
			return; 
		}
		this.outil.initZoom(); 
		this.callAfterLoading = _4; 
		this.firstLoading = true; 
		this.gcg = new GCG(this); 
		this.init(); 
		this.initMapCommon(); 
		return this; 
	}
	else {
		alert("Carte: la cr\xe9ation du gestionnaire a \xe9chou\xe9e !"); 
		return; 
	}
}
Carte.prototype.init = function() {
	var _5 = this.gcg.getParameters(); 
	if(is3D) {
		this.client.mapCenterActionsOnInitMap(); 
	}
	if(_5 && _5["carte"] && (_5["carte"] != __territoire)) {
		if(is3D && _5["carte"] == "monde") {
			_5["carte"] = "metropole"; 
		}
		this.outil.changeTerritoire(this.idCarte, _5["carte"], true); 
	}
	else {
		this.outil.changeTerritoireActif = true; 
		this.refreshMap(false); 
	}
}; 
Carte.prototype.refreshMap = function(_6) {
	this.initMapTerritory(); 
	var _7 = this.gcg.getParameters(); 
	if(_7 && _7["profil"]) {
		this.gestionnaire.profil = _7["profil"]; 
	}
	this.initLayers(_6); 
}; 
Carte.prototype.initLayers = function(_8) {
	this.gestionnaire.initCouchesEtThemes(); 
	this.initLayersEnd(_8); 
}; 
Carte.prototype.initLayersEnd = function(_9) {
	if(!__propertiesLoaded) {
		setTimeout("__getCarteById('" + this.idCarte + "').initLayersEnd('" + _9 + "')", 100); 
	}
	else {
		__log("Chargement d'une nouvelle carte (" + __territoire + ")"); 
		_9 = __stringToBool(_9); 
		if(_9) {
			this.gestionnaire.displayOwners(); 
		}
		this.setLayersByParameters(); 
		this.sortIdCouchesDisponibles(); 
		var _a = new Array(); 
		for(var ic = this.gestionnaire.profondeurMin; ic < this.gestionnaire.idCouchesDisponibles.length; ic++) {
			if(this.gestionnaire.idCouchesDisponibles[ic].idCoucheMere) {
				var _c = 0; 
				for(_c = 0; _c < _a.length; _c++) {
					if(_a[_c] === this.gestionnaire.idCouchesDisponibles[ic].idCoucheMere) {
						break; 
					}
				}
				if((_c >= _a.length) && (this.gestionnaire.idCouchesDisponibles[ic].idCoucheMere)) {
					_a[_a.length] = this.gestionnaire.idCouchesDisponibles[ic].idCoucheMere; 
				}
			}
			else {
				_a[_a.length] = this.gestionnaire.idCouchesDisponibles[ic].idCouche; 
			}
		}
		_a.min = 0; 
		_a.max = _a.length - 1; 
		var _d = true; 
		var _e = new Array(); 
		do {
			tab = _a; 
			_a = new Array(); 
			_a.min = 0; 
			_a.max =- 1; 
			for(var ic = tab.min; ic <= tab.max; ic++) {
				var _f = (_d) ? tab[ic] : tab[ic].idCouche; 
				var _10 = this.gestionnaire.couchesDisponibles; 
				if(_d) {
					_10 = _10[_f]; 
				}
				else {
					var _11 = tab[ic].indexSousCouche; 
					_10 = _10[tab[ic].idCoucheMere].souscouches[_11]; 
				}
				if(_10) {
					if(_10.profil) {
						if(_10.type === "raster") {
							__log(" Ajout de la couche d'identifiant " + _f + " (" + ((_d) ? "" : "sub-") + "raster)"); 
							_e[_10["profil"]["profondeurDefaut"]] = _10; 
						}
						else {
							if(_10["type"] === "poly") {
								__log(" Traitement de la couche d'identifiant " + _f + " (" + ((_d) ? "" : "sub-") + "poly)"); 
								var _12 = _10.souscouches.length; 
								var _13 = true; 
								_a.max += _12; 
								for(var i = 0; i < _12; i++) {
									var _15 = _10["souscouches"][i].id; 
									__log(" sous-couche d'identifiant " + _15); 
									_a[_a.length] = {
											"idCouche" : _15, "idCoucheMere" : _f, "indexSousCouche" : i}; 
								}
							}
							else {
								if(_10.type === "ponctual") {
									__log(" Ajout de la couche d'identifiant " + _f + " (" + ((_d) ? "" : "sub-") + "ponctual)"); 
								}
								else {
									if(_10.type === "ponctualkml") {
										__log(" Ajout de la couche d'identifiant " + _f + " (" + ((_d) ? "" : "sub-") + "ponctualkml)"); 
									}
									else {
										if(_10.type === "tlf") {
											_e[_e.length] = _10; 
											__log(" Ajout de la couche d'identifiant " + _f + " (" + ((_d) ? "" : "sub-") + "tlf)"); 
										}
										else {
											__error(" Type inconnu pour la couche d'identifiant " + _f + " (" + _10["type"] + ")"); 
										}
									}
								}
							}
						}
					}
				}
			}
			_d = false; 
		}
		while(_a.length > 0); 
		for(var _16 = 0, _17 = 0; _16 < _e.length; _16++) {
			if(_e[_16]) {
				var _10 = _e[_16]; 
				__log(" Ajout de " + _10.id + " au client de visualisation"); 
				if(_10.tileWidth != undefined && _10.tileHeight != undefined) {
					this.client.mapAddRasterLayerWithTileSize(_10.id, _10.urlGCIS, _10.map, _10.idCoucheGCIS, _10.format, _10.transparence, _10.minScale, _10.maxScale, _10.tileWidth, _10.tileHeight); 
				}
				else {
					this.client.mapAddRasterLayer(_10.id, _10.urlGCIS, _10.map, _10.idCoucheGCIS, _10.format, _10.transparence, _10.minScale, _10.maxScale); 
				}
				if(typeof this.client.mapSetType != "undefined") {
					this.client.mapSetType(this.client.mapGetLayer(_10.id), _10.type); 
				}
				if(_10["zoomRange"]) {
					this.client.mapSetRasterVisibilityRange(_10.id, _10.zoomRange.min, _10.zoomRange.max); 
				}
				if(_10["dezoomRange"]) {
					this.client.mapSetRasterVisibilityRange(_10.id, _10.dezoomRange.min, _10.dezoomRange.max); 
				}
				this.client.mapSetLayerVisibilityById(_10.id, false); 
				var _18 = this.client.mapGetLayer(_10.id); 
				_10.existe = (_18 != null); 
				if(_10.existe) {
					_17++; 
				}
				else {
					__error("GCG.initLayers: la couche raster \"" + _10.id + "\" n'a pas \xe9t\xe9 ajout\xe9e au client de visualisation"); 
				}
			}
		}
		for(_f in this.gestionnaire.couchesDisponibles) {
			if(typeof(this.gestionnaire.couchesDisponibles[_f]) !== "function") {
				if(this.gestionnaire.couchesDisponibles[_f].type === "poly") {
					var _19 = true; 
					var _1a = this.gestionnaire.couchesDisponibles[_f].souscouches; 
					for(var i = 0; i < _1a.length; i++) {
						_15 = _1a[i].id; 
						if(_1a[i].type !== "ponctual" && _1a[i].type !== "ponctualkml" && _1a[i].type !== "poly") {
							var _1b = this.client.mapGetLayer(_15); 
							if(!_1b) {
								_19 = false; 
							}
						}
					}
					this.gestionnaire.couchesDisponibles[_f].existe = _19; 
				}
			}
		}
		if(_9) {
			this.client.mapReInitLayers(); 
		}
		var _1c = document.getElementById(this.idCarte); 
		if(_1c) {
			this.client.mapSetSize(_1c.getWidth(), _1c.getHeight()); 
		}
		var _1d = new Array(); 
		var _1e = false; 
		for(_f in this.gestionnaire.couchesDisponibles) {
			var _18 = this.client.mapGetLayer("External"); 
			if(this.gestionnaire.couchesDisponibles["External"] != null && typeof(this.gestionnaire.couchesDisponibles["External"] != "undefined")) {
				if(this.gestionnaire.couchesDisponibles["External"].profil != null) {
					if(this.gestionnaire.couchesDisponibles["External"].profil.visibiliteDefaut == true) {
						_1e = true; 
					}
				}
			}
		}
		var _1f = true; 
		var _20 = false; 
		var _21 = ""; 
		for(_f in this.gestionnaire.couchesDisponibles) {
			if(typeof(this.gestionnaire.couchesDisponibles[_f]) !== "function") {
				if(this.gestionnaire.couchesDisponibles[_f].profil) {
					if(this.gestionnaire.couchesDisponibles[_f].type === "raster") {
						var _18 = this.client.mapGetLayer(_f); 
						if(_18 && ((_1e == false) || (_18.name == "Scan") || (_18.name == "Photo") || (_18.name == "External"))) {
							if(this.gestionnaire.couchesDisponibles[_f].profil.visibiliteDefaut) {
								this.client.mapSetLayerVisibility(_18, true); 
								if(_20 == false) {
									if(_1f == true) {
										_1f = false; 
										_21 = _f; 
									}
									else {
										if(_1f == false) {
											_20 = true; 
											var _22 = this.client.mapGetLayer(_21); 
											this.client.mapSetLayerOpacity(_22, this.gestionnaire.couchesDisponibles[_21]["profil"]["opaciteDefaut"]); 
										}
									}
								}
							}
							if(this.gestionnaire.couchesDisponibles[_f].profil.opaciteDefaut > 0) {
								if(_20 == false && _1f == false) {
									this.client.mapSetLayerOpacity(_18, 100); 
								}
								else {
									this.client.mapSetLayerOpacity(_18, this.gestionnaire.couchesDisponibles[_f]["profil"]["opaciteDefaut"]); 
								}
							}
						}
					}
					else {
						if(this.gestionnaire.couchesDisponibles[_f].type === "poly") {
							if(this.gestionnaire.couchesDisponibles[_f].profil.visibiliteDefaut) {
								var _23 = this.gestionnaire.couchesDisponibles[_f].souscouches; 
								for(var i = 0; i < _23.length; i++) {
									var _18 = this.client.mapGetLayer(_23[i].id); 
									if(_18) {
										this.client.mapSetLayerVisibility(_18, true); 
									}
								}
							}
							this.gestionnaire.setOpacite(_f, this.gestionnaire.couchesDisponibles[_f].profil.opaciteDefaut); 
						}
						else {
							if(this.gestionnaire.couchesDisponibles[_f].type === "tlf") {
								var _18 = this.client.mapGetLayer(_f); 
								if(_18) {
									if(this.gestionnaire.couchesDisponibles[_f].profil.visibiliteDefaut) {
										this.client.mapSetLayerVisibility(_18, true); 
									}
									if(this.gestionnaire.couchesDisponibles[_f].profil.opaciteDefaut > 0) {
										this.client.mapSetLayerOpacity(_18, this.gestionnaire.couchesDisponibles[_f]["profil"]["opaciteDefaut"]); 
									}
								}
							}
							else {
								if(this.gestionnaire.couchesDisponibles[_f]["type"] === "ponctual" || this.gestionnaire.couchesDisponibles[_f]["type"] === "ponctualkml") {
									for(var ict = this.gestionnaire.profondeurMax; ict >= this.gestionnaire.profondeurMin; ict--) {
										if(this.gestionnaire.getVisibilite(this.gestionnaire.idCouchesDisponibles[ict].idCouche, this.gestionnaire.idCouchesDisponibles[ict].idCoucheMere, this.gestionnaire.idCouchesDisponibles[ict].indexSousCouche)) {
											idCoucheTop = this.gestionnaire.idCouchesDisponibles[ict].idCouche; 
											break; 
										}
									}
									if(this.gestionnaire.couchesDisponibles[_f].profil.visibiliteDefaut) {
										_1d.push(_f); 
									}
									var _25 = this.gcg.getLayers(); 
									if(_25 && _25[_f]) {
										_1d.push(_f); 
									}
								}
							}
						}
					}
				}
			}
		}
		var _26 = this.gcg.getParameters(); 
		if(_26 != null && _26.viewVersion < "1.1") {
			var _27 = this.client.mapHTCtoDegree(_26.x, _26.y); 
			_26.x = _27[0]; 
			_26.y = _27[1]; 
		}
		this.initScaleBounds(); 
		if(this.outil.changeTerritoireActif) {
			this.initScale(); 
			this.initCenter(); 
			this.outil.changeTerritoireActif = false; 
		}
		if(!this.disableInitScale) {
			this.disableInitScale = true; 
		}
		if(this.outil.dragOnMap) {
			this.outil.dragOnMap = false; 
		}
		this.gestionnaire.initInterface(_9); 
		if(_9) {
			if(__maximizer) {
				__maximizer.recomputeSize(); 
			}
		}
		var _28 = new Array(); 
		for(var i in _1d) {
			if(typeof(_1d[i]) != "function") {
				var _29 = this.gestionnaire.getThemesObjects(); 
				var _2a; 
				for(var it = 0; (it < _29.length); it++) {
					img = $(_29[it].id + "Couche" + _1d[i] + "ImageCheck"); 
					if(img) {
						var _2c = false; 
						for(var a in _28) {
							var _2e = _29[it].id; 
							if(_28[a] == _2e) {
								_2c = true; 
								break; 
							}
						}
						if(_2c == false) {
							_2a = _2e.substr(this.gestionnaire.idGestionnaire.length + 1); 
							this.gestionnaire.changeDeveloppementTheme(_2e.substr(this.gestionnaire.idGestionnaire.length + 1), "niv1"); 
							_28.push(_29[it].id); 
						}
					}
				}
				this.gestionnaire.changeSelectionCouchePonctuelle(_2a, _1d[i]); 
			}
		}
		delete _28; 
		delete _1d; 
		this.client.mapRefresh(true); 
		if(this.firstLoading) {
			this.endConstructor(); 
		}
	}
}; 
Carte.prototype.sortIdCouchesDisponibles = function() {
	this.gestionnaire.idCouchesDisponibles = this.gestionnaire.idCouchesDisponibles.sortBy(function(o) {
		if(o.idCoucheMere != null) {
			var _30 = this.gestionnaire.couchesDisponibles[o.idCoucheMere]; for(var i = 0; i < _30.souscouches.length; i++) {
				if(_30.souscouches[i].id === o.idCouche) {
					return _30.souscouches[i].profil.profondeurDefaut; }
			}
		}
		else {
			return this.gestionnaire.couchesDisponibles[o.idCouche].profil.profondeurDefaut; }
	}
	.bind(this)); 
}; 
Carte.prototype.setLayersByParameters = function() {
	var _32 = this.getLayers(); 
	if(_32 == null) {
		return null; 
	}
	for(id in this.gestionnaire.couchesDisponibles) {
		if(typeof(this.gestionnaire.couchesDisponibles[id]) != "function") {
			if(this.gestionnaire.couchesDisponibles[id].profil) {
				this.gestionnaire.couchesDisponibles[id].profil.visibiliteDefaut = false; 
			}
		}
	}
	for(var id in _32) {
		if(typeof(_32[id]) != "function") {
			if(this.gestionnaire.couchesDisponibles[id]) {
				this.gestionnaire.couchesDisponibles[id].profil.visibiliteDefaut = _32[id].visibility; 
				this.gestionnaire.couchesDisponibles[id].profil.opaciteDefaut = _32[id].opacity; 
				this.gestionnaire.couchesDisponibles[id].profil.profondeurDefaut = _32[id].depth; 
				if(id == "External") {
					if(_32[id].extLayName != null) {
						this.gestionnaire.couchesDisponibles[id].map = _32[id].extLayName; 
					}
					if(_32[id].idCoucheGCIS != null) {
						this.gestionnaire.couchesDisponibles[id].idCoucheGCIS = _32[id].idCoucheGCIS; 
					}
					if(_32[id].imageType != null) {
						this.gestionnaire.couchesDisponibles[id].format = _32[id].imageType; 
					}
					if(_32[id].echellemax != null) {
						this.gestionnaire.couchesDisponibles[id].proprietaires[0].echellemax = _32[id].echellemax; 
					}
					if(_32[id].echellemin != null) {
						this.gestionnaire.couchesDisponibles[id].proprietaires[0].echellemin = _32[id].echellemin; 
					}
					if(_32[id].logo != null) {
						this.gestionnaire.couchesDisponibles[id].proprietaires[0].logo = _32[id].logo; 
					}
					if(_32[id].url != null) {
						this.gestionnaire.couchesDisponibles[id].proprietaires[0].url = _32[id].url; 
					}
					if(_32[id].coucheName != null) {
						this.gestionnaire.couchesDisponibles[id].proprietaires[0].nom = _32[id].coucheName; 
					}
					if(_32[id].descripCouche != null) {
						this.gestionnaire.couchesDisponibles[id].proprietaires[0].description = _32[id].descripCouche; 
					}
				}
				if(this.gestionnaire.couchesDisponibles[id].type === "poly") {
					var _34 = this.gestionnaire.couchesDisponibles[id].souscouches; 
					var _35 = {
					}; 
					this.gestionnaire.idCouchesDisponibles.each(function(o) {
						if(o.idCoucheMere == id) {
							_35[o.idCouche] = o; }
					}
					.bind(this)); 
					var _37 = 0; 
					for(var i = 0; i < _34.length; i++) {
						if(_34[i].type == "raster") {
							_37++; 
						}
					}
					var _39 = this.gestionnaire.couchesDisponibles[id].souscouches[0].profil.profondeurDefaut; 
					var _3a = _32[id].depth; 
					if(_39 > _3a) {
						for(var i = _39 - 1; i >= _3a; i--) {
							var _3b = this.gestionnaire.idCouchesDisponibles[i].idCoucheMere != null ? this.gestionnaire.idCouchesDisponibles[i].idCoucheMere : this.gestionnaire.idCouchesDisponibles[i].idCouche; 
							this.gestionnaire.couchesDisponibles[_3b].profil.profondeurDefaut = (i + _37); 
						}
						for(var i = 0; i < _37; i++) {
							this.gestionnaire.couchesDisponibles[id].souscouches[i].profil.profondeurDefaut = (_3a + i); 
						}
					}
					else {
						for(var i = _39 + _37; i <= _3a; i++) {
							var _3b = this.gestionnaire.idCouchesDisponibles[i].idCoucheMere != null ? this.gestionnaire.idCouchesDisponibles[i].idCoucheMere : this.gestionnaire.idCouchesDisponibles[i].idCouche; 
							this.gestionnaire.couchesDisponibles[_3b].profil.profondeurDefaut = (i - _37); 
						}
						for(var i = 0; i < _37; i++) {
							this.gestionnaire.couchesDisponibles[id].souscouches[i].profil.profondeurDefaut = (_3a + i); 
						}
					}
					this.sortIdCouchesDisponibles(); 
				}
			}
		}
	}
	return; 
}; 
Carte.prototype.getLayers = function() {
	var _3c = this.gcg.getLayers(); 
	if(_3c == null) {
		return null; 
	}
	var _3d = {
	}; 
	this.gestionnaire.idCouchesDisponibles.each(function(o) {
		if(o.idCoucheMere != null) {
			if(o.idCouche === this.gestionnaire.couchesDisponibles[o.idCoucheMere].idMainSousCouche) {
				if(_3c[o.idCoucheMere]) {
					_3c[o.idCoucheMere].visibility = _3c[o.idCoucheMere].visibility == "" ? this.gestionnaire.couchesDisponibles[o.idCoucheMere].profil.visibiliteDefaut : (!!_3c[o.idCoucheMere].visibility); _3c[o.idCoucheMere].opacity = _3c[o.idCoucheMere].opacity == "" ? this.gestionnaire.couchesDisponibles[o.idCoucheMere].profil.opaciteDefaut : parseInt(_3c[o.idCoucheMere].opacity); _3c[o.idCoucheMere].depth = _3c[o.idCoucheMere].depth == "" ? this.gestionnaire.couchesDisponibles[o.idCoucheMere].profil.profondeurDefaut : parseInt(_3c[o.idCoucheMere].depth); _3d[o.idCoucheMere] = _3c[o.idCoucheMere]; }
			}
		}
		else {
			if(_3c[o.idCouche]) {
				_3c[o.idCouche].visibility = _3c[o.idCouche].visibility == "" ? o.profil.visibiliteDefaut : (!!_3c[o.idCouche].visibility); _3c[o.idCouche].opacity = _3c[o.idCouche].opacity == "" ? o.profil.opaciteDefaut : parseInt(_3c[o.idCouche].opacity); _3c[o.idCouche].depth = _3c[o.idCouche].depth == "" ? o.profil.profondeurDefaut : parseInt(_3c[o.idCouche].depth); _3d[o.idCouche] = _3c[o.idCouche]; }
		}
	}
	.bind(this)); 
	return _3d; 
}; 
Carte.prototype.initScaleBounds = function() {
	var _3f = this.gcg.getParameters(); 
	if(_3f) {
		if(_3f["version"] == "1.1") {
			this.client.mapSetMinimumScale(ECHELLEMIN); 
			this.client.mapSetMaximumScale(ECHELLEMAX); 
			return; 
		}
		else {
			this.client.mapSetMinimumScale(ECHELLEMIN); 
			this.client.mapSetMaximumScale(ECHELLEMAX); 
			return; 
		}
	}
	this.client.mapSetMinimumScale(ECHELLEMIN); 
	this.client.mapSetMaximumScale(ECHELLEMAX); 
}; 
Carte.prototype.initScale = function() {
	var _40 = this.gcg.getParameters(); 
	if(_40) {
		if(((_40.viewVersion >= "1.0") || (!_40.viewVersion)) && _40.scale) {
			if(is3D) {
				this.scale = eval(_40.scale); 
			}
			else {
				this.changeEchelleClient(eval(_40.scale), false); 
			}
			return; 
		}
	}
	if(!this.disableInitScale) {
		this.initScaleMap(); 
	}
}; 
Carte.prototype.initCenter = function() {
	var _41 = this.gcg.getParameters(); 
	if(_41) {
		if(((_41.viewVersion >= "1.0") || (!_41.viewVersion)) && _41.x && _41.y) {
			if(!this.outil.dragOnMap) {
				this.client.mapCenter(eval(_41.x), eval(_41.y), true); 
			}
			return; 
		}
	}
	if(!this.disableInitScale) {
		this.initCenterMap(); 
	}
}; 
Carte.prototype.initCenterMap = function() {
	var _42 = this.client.mapClientToDegree(X, Y); 
	this.client.mapCenter(_42[0], _42[1], true); 
}; 
Carte.prototype.endConstructor = function() {
	if(___geoecom) {
		this.outil.VisuSelectionManager = __VisuSelectionManager = new VisuSelectionManager(this); 
		this.outil.VisuSelectionManager.initMaskLayer(); 
	}
	this.outil.initOutils(); 
	if(this.callAfterLoading) {
		this.callAfterLoading(); 
	}
	this.callAfterLoading = null; 
	delete this.firstLoading; 
}; 
Carte.prototype.flush = function() {
	if(this.dynMap) {
		this.client.mapFlush(); 
	}
	if(this.gestionnaire) {
		this.gestionnaire.carte = null; 
	}
	if(this.gcg) {
		this.gcg.carte = null; 
		delete this.gcg; 
	}
	this.outil.outilsFlush(); 
}; 
Carte.prototype.initMapCommon = function() {
	if(!is3D) {
		var _43 = new myScaleListener("ScaleListener", this); 
		this.client.mapAddScaleEventListener("ScaleListener", _43); 
		var _44 = new myMoveListener("MoveListener", this); 
		this.client.mapAddMoveEventListener("MoveListener", _44); 
		worldvisibilitylistener = new GCISWorldVisibility("worldlistener", this, DynMapCreateProjection(this.dynMap, "miller", [6378137])); 
		this.client.mapAddScaleEventListener("worldlistener", worldvisibilitylistener); 
	}
}; 
Carte.prototype.executeAfterScaleChanged = function(_45) {
	if(this.gestionnaire) {
		this.gestionnaire.echelleCarteModifiee(_45); 
	}
}; 
Carte.prototype.initMapTerritory = function() {
	if(!is3D) {
		this.client.mapInitProjection(); 
		if($("selectProjection")) {
			__creationSelect($("selectProjection"), __creationTabTitle(__getTerritoireById(__territoire).systemes), null); 
		}
		var _46 = this.client.mapClientToDegree(X, Y); 
		this.outil.longlat(null, _46[0], _46[1]); 
		var _47 = document.getElementById("miniVue"); 
		if(_47) {
			this.client.mapAddGlobalView(0, 0, 85, 85, __mapGlobalView, __carteGlobalView, "empty", _47, __grads, __scales, true); 
			_47.style.backgroundImage = "url(" + adressConf.imgPrefix + "/imgs/visu/2D/" + currentPortal + "/minicarte/" + __territoire + ".png)"; 
			this.client.mapSetGlobalViewRectSize(10, 10); 
		}
		if(document.getElementById("scaleBox")) {
			this.client.mapAddScaleLayer(5, 0, document.getElementById("scaleBox")); 
		}
		__positionSelect("selectTerr", ile); 
	}
}; 
Carte.prototype.initScaleMap = function() {
	this.changeEchelleClient(ECHELLE, false); 
}; 
Carte.prototype.getEchelle = function() {
	return(this._scale) ? this._scale : this.gestionnaire.client.mapGetScale(); 
}; 
Carte.prototype.changeEchelleClient = function(_48, _49, _4a) {
	if(isNaN(_48) || typeof(_48) == "undefined") {
		return; 
	}
	_48 = Math.max(ECHELLEMIN, Math.min(ECHELLEMAX, _48)); 
	if(_48 == this.getEchelle()) {
		return; 
	}
	this.changeEchelleClientEnCours = true; 
	if(!_4a) {
		this.gestionnaire.client.mapSetScale(_48, _49); 
	}
	this.changeEchelleClientEnCours = false; 
}; 
function myScaleListener(_1, _2) {
	this.name = _1; 
	this.carte = _2; 
}
myScaleListener.prototype.onScaleChange = function(_3) {
	this.carte._scale = _3; 
	this.carte.outil.placementCurseur(_3); 
	this.carte.gestionnaire.miseAJourURL(); 
	this.carte.executeAfterScaleChanged(_3); 
	this.carte.gestionnaire.displayOwners(); 
	this.carte.gestionnaire.grisageMaSelection(_3); 
}; 
function myMoveListener(_4, _5) {
	this.name = _4; 
	this.carte = _5; 
}
myMoveListener.prototype.onMoveChange = function(dx, dy) {
	this.carte.gestionnaire.miseAJourURL(); 
	this.carte.gestionnaire.miseAJourEmprise(); 
}; 
var __gc_gcg = new Array(); 
function __getGcgById(_1) {
	return __gc_gcg[_1]; 
}
function GCG(_2) {
	this.carte = _2; 
	this.client = this.carte.gestionnaire.client; 
	this.codec = new Codec(); 
	this.compresseur = new HuffmanCompresseur(); 
	this.switchInNewWindow = false; 
	__gc_gcg[this.carte.idCarte] = this; 
	if(typeof(cg) != "undefined" && cg != null) {
		params = "cg=" + cg; 
	}
	else {
		params = window.location.search; 
	}
	if(params) {
		this.setParameters(params); 
		if(this.parameters && this.parameters["cg"]) {
			params = this.codec.decode(this.compresseur.decompresse(this.parameters["cg"])); 
			this.setParameters(params, "*", ":"); 
			this.expandParameters(); 
		}
		else {
			this.resetParameters(); 
			params = this.codec.decode(params); 
			if(!params) {
				params = window.location.search; 
			}
			this.setParameters(params, "*", ":"); 
		}
	}
}
GCG.prototype.expandParameters = function() {
	if(!this.parameters) {
		return; 
	}
	if(this.parameters["v"]) {
		this.parameters["version"] = this.parameters["v"]; 
		this.parameters["v"] = null; 
	}
	if(this.parameters["c"]) {
		this.parameters["carte"] = this.parameters["c"]; 
		this.parameters["c"] = null; 
	}
	if(this.parameters["cv"]) {
		this.parameters["carteVersion"] = this.parameters["cv"]; 
		this.parameters["cv"] = null; 
	}
	if(this.parameters["vv"]) {
		this.parameters["viewVersion"] = this.parameters["vv"]; 
		this.parameters["vv"] = null; 
	}
	if(this.parameters["xy"]) {
		var _3 = this.parameters["xy"].split("|"); 
		this.parameters["x"] = _3[0]; 
		this.parameters["y"] = _3[1]; 
		this.parameters["xy"] = null; 
	}
	if(this.parameters["s"]) {
		this.parameters["scale"] = this.parameters["s"]; 
		this.parameters["s"] = null; 
	}
	if(this.parameters["pv"]) {
		this.parameters["profilVersion"] = this.parameters["pv"]; 
		this.parameters["pv"] = null; 
	}
	if(this.parameters["p"]) {
		this.parameters["profil"] = this.parameters["p"]; 
		this.parameters["p"] = null; 
	}
	if(this.parameters["l"]) {
		this.parameters["layers"] = this.parameters["l"]; 
		this.parameters["l"] = null; 
	}
	if(this.parameters["eln"]) {
		this.parameters["extLayName"] = this.parameters["eln"]; 
		this.parameters["eln"] = null; 
	}
	if(this.parameters["lo"]) {
		this.parameters["logo"] = this.parameters["lo"]; 
		this.parameters["lo"] = null; 
	}
	if(this.parameters["uf"]) {
		this.parameters["urlFourni"] = this.parameters["uf"]; 
		this.parameters["uf"] = null; 
	}
	if(this.parameters["en"]) {
		this.parameters["echellemin"] = this.parameters["en"]; 
		this.parameters["en"] = null; 
	}
	if(this.parameters["ex"]) {
		this.parameters["echellemax"] = this.parameters["ex"]; 
		this.parameters["ex"] = null; 
	}
	if(this.parameters["igc"]) {
		this.parameters["idCoucheGCIS"] = this.parameters["igc"]; 
		this.parameters["igc"] = null; 
	}
	if(this.parameters["it"]) {
		this.parameters["imageType"] = this.parameters["it"]; 
		this.parameters["it"] = null; 
	}
	if(this.parameters["cn"]) {
		this.parameters["coucheName"] = this.parameters["cn"]; 
		this.parameters["cn"] = null; 
	}
	if(this.parameters["dc"]) {
		this.parameters["descripCouche"] = this.parameters["dc"]; 
		this.parameters["dc"] = null; 
	}
}; 
GCG.prototype.resetParameters = function() {
	this.parameters = null; 
}; 
GCG.prototype.setParameters = function(_4, _5, eq) {
	if(!_4) {
		_4 = window.location.search; 
	}
	if(!_5) {
		_5 = "&"; 
	}
	if(!eq) {
		eq = "="; 
	}
	var _7 = unescape(_4); 
	var i = _7.indexOf("?"); 
	_7 = _7.substr(i + 1).split(_5); 
	var _9 = new Array(); 
	var np = 0; 
	var _b; 
	for(i = 0; i < _7.length; i++) {
		_b = _7[i].indexOf(eq); 
		if(_b >= 0) {
			_9[_7[i].substr(0, _b)] = _7[i].substr(_b + 1); 
			np++; 
		}
	}
	if(np == 0) {
		_9 = null; 
	}
	this.parameters = _9; 
}; 
GCG.prototype.getParameters = function() {
	return this.parameters; 
}; 
GCG.prototype.parseParametersTable = function(_c) {
	if(this.parameters == null || typeof(this.parameters[_c]) == "undefined") {
		return null; 
	}
	var _d = this.parameters[_c].split(","); 
	var _e = []; 
	_d.each(function(t) {
		_e.push(t.split("|")); }
	); 
	return _e; 
}; 
GCG.prototype.getLayers = function() {
	if(typeof(this.parameters) == "undefined") {
		return null; 
	}
	var _10 = this.parseParametersTable("layers"); 
	if(_10 == null) {
		return null; 
	}
	var _11 = {
	}; 
	_10.each(function(_12) {
		_11[_12[0]] = {
				visibility : _12[1], opacity : _12[2], depth : _12[3], extLayName : null, echellemax : null, echellemin : null, logo : null, urlFourni : null, idCoucheGCIS : null, imageType : null, coucheName : null, descripCoucheUrl : null}; }
	); 
	if(_11["External"]) {
		_11["External"].extLayName = this.parameters["extLayName"]; 
		_11["External"].logo = this.parameters["logo"]; 
		_11["External"].urlFourni = this.parameters["urlFourni"]; 
		_11["External"].echellemax = this.parameters["echellemax"]; 
		_11["External"].echellemin = this.parameters["echellemin"]; 
		_11["External"].idCoucheGCIS = this.parameters["idCoucheGCIS"]; 
		_11["External"].imageType = this.parameters["imageType"]; 
		_11["External"].coucheName = this.parameters["coucheName"]; 
		_11["External"].descripCouche = this.parameters["descripCouche"]; 
	}
	return _11; 
}; 
GCG.prototype.sendToFriend = function(_13) {
	var _14 = __i18n_tools["friendMail_stf_subject"]; 
	var _15 = __i18n_tools["friendMail_stf_before_link"] + "\n"; 
	var _16 = "\n(c) 2007 www.geoportail.fr"; 
	var _17 = __i18n_tools["friendMail_t_subject"]; 
	var _18 = "<p><strong>" + __i18n_tools["friendMail_t_body"] + "</strong>"; 
	_18 += " <a href =\"mailto:?subject=" + _14 + "&body=" + escape(_15 + _13 + _16) + "\" class=\"lnDoor\" >" + __i18n_tools["friendMail_sendMail"] + "</a></p>"; 
	_18 += "<br></br><p>" + __i18n_tools["friendMail_copyLink"]; 
	_18 += "<textarea rows =\"2\" cols=\"55\" readonly>" + _13 + "</textarea>"; 
	__displayDialog(_17, _18); 
}; 
GCG.prototype.sendContextToFriend = function() {
	var url = this.createURLContext(); 
	this.sendToFriend(url); 
}; 
GCG.prototype.saveContextNavigator = function() {
	var url = this.createURLContext(); 
	if(navigator.appName != "Microsoft Internet Explorer") {
		window.sidebar.addPanel(__i18n_tools["favori"], url, ""); 
	}
	else {
		window.external.AddFavorite(url, __i18n_tools["favori"]); 
	}
}; 
GCG.prototype.createURLContext = function(_1b) {
	var cg = new ContexteGeographique(this.carte); 
	if(__stringToBool(_1b)) {
		cg.setIncludeDepth(); 
	}
	var ctx = cg.exportCurrentContextToUrlParameters(); 
	ctx = "cg=" + this.compresseur.compresse(this.codec.encode(ctx)); 
	var i = window.location.href.indexOf("?"); 
	var j = window.location.href.indexOf("#"); 
	var loc = window.location.href; 
	if(j >= 0) {
		loc = loc.substr(0, j); 
	}
	if(i >= 0) {
		loc = loc.substr(0, i); 
	}
	if(!loc.match("visu")) {
		if(loc.match("index.do")) {
			loc = loc.substr(0, (i - 8)); 
		}
		if(loc.match("RechercheGC.do")) {
			loc = loc.substr(0, window.location.href.lastIndexOf("/")); 
			loc += "/"; 
		}
		loc += "visu2D.do"; 
	}
	return(loc + "?" + ctx); 
}; 
GCG.prototype.switchVisu = function(_21, to) {
	var _23 = null; 
	if(_21 == "visu2D") {
		_23 = check3d(true); 
		if(_23 != null) {
			window.open(_23); 
			return; 
		}
	}
	var url = this.createURLContext(true); 
	var _25 = url.substring(0, url.indexOf("/", 7)); 
	var cg = url.substring(url.indexOf("?")); 
	var _27 = ""; 
	if(url.indexOf("/services/") !=- 1) {
		_27 = "services/"; 
	}
	else {
		if(url.indexOf("/administrations/") !=- 1) {
			_27 = "administrations/"; 
		}
	}
	var _28 = _25 + "/" + _27 + to + ".do" + cg; 
	if(_21 == "visu2D") {
		_28 += "&mca=cctx"; 
	}
	if(this.switchInNewWindow) {
		window.open(_28); 
	}
	else {
		document.location.href = _28; 
	}
}; 
ContexteGeographique = function(_29, _x, _y, _2c, _2d) {
	this.carte = _29; 
	this.dontIncludeDepth = false; 
	this.client = this.carte.gestionnaire.client; 
	this.version = "1.1"; 
	this.viewVersion = "1.1"; 
	this.profilVersion = "1.0"; 
	this.profil = (this.carte.gestionnaire) ? this.carte.gestionnaire.profil : ""; 
	if(_x) {
		this.x = _x; 
	}
	else {
		this.x = this.client.mapGetCenterX(); 
	}
	if(_y) {
		this.y = _y; 
	}
	else {
		this.y = this.client.mapGetCenterY(); 
	}
	if(_2c) {
		this.scale = _2c; 
	}
	else {
		this.scale = this.client.mapGetScale(); 
	}
	if(_2d) {
		this.layers = _2d; 
	}
	else {
		this.layers = this.carte.gestionnaire.getCouchesVisibles(); 
		this.layers = this.layers.concat(this.carte.gestionnaire.getCouchesPonctuelles()); 
		this.layers = this.layers.concat(this.carte.gestionnaire.getCouchesTlf()); 
	}
}; 
ContexteGeographique.prototype.setIncludeDepth = function() {
	this.dontIncludeDepth = true; 
}; 
ContexteGeographique.prototype.exportCurrentContextToUrlParameters = function() {
	var ctx = this.exportCurrentMapToUrlParameters(); 
	ctx += "*" + this.exportCurrentViewToUrlParameters(); 
	ctx += "*" + this.exportModifiedLayersFromProfilToUrlParameters(); 
	return ctx; 
}; 
ContexteGeographique.prototype.exportCurrentMapToUrlParameters = function() {
	return"v:" + this.version + "*c:" + __territoire + "*cv:" + "1.0"; 
}; 
ContexteGeographique.prototype.exportCurrentViewToUrlParameters = function() {
	return"vv:" + this.viewVersion + "*xy:" + this.x + "|" + this.y + "*s:" + this.scale; 
}; 
ContexteGeographique.prototype.exportModifiedLayersFromProfilToUrlParameters = function() {
	var _2f = new Array(); 
	for(k = 0; k < this.layers.length; k++) {
		var _30 = null; 
		var idx = this.layers[k].id; 
		if(this.carte.gestionnaire.couchesDisponibles[idx].type == "ponctual" || this.carte.gestionnaire.couchesDisponibles[idx].type == "ponctualkml" || this.carte.gestionnaire.couchesDisponibles[idx].type == "tlf") {
			var _32 = new Array(idx, true, "", ""); 
			_30 = _32.join("|"); 
		}
		else {
			var vis = Number(this.carte.gestionnaire.getVisibilite(idx)); 
			var opa = this.carte.gestionnaire.getOpacite(idx) || "100"; 
			var _35 = this.carte.gestionnaire.getProfondeur(idx).profZero; 
			if(typeof(this.carte.gcg.parameters) == "undefined") {
				if(vis == Number(this.carte.gestionnaire.couchesDisponibles[idx].profil.visibiliteDefaut)) {
					vis = ""; 
				}
				if(opa == this.carte.gestionnaire.couchesDisponibles[idx].profil.opaciteDefaut) {
					opa = ""; 
				}
				if(_35 == this.carte.gestionnaire.couchesDisponibles[idx].profil.profondeurDefaut) {
					_35 = ""; 
				}
			}
			if(this.dontIncludeDepth) {
				_35 = ""; 
			}
			var _32 = new Array(idx, vis, opa, _35); 
			_30 = _32.join("|"); 
		}
		if(_30) {
			_2f.push(_30); 
		}
	}
	__debug("pv:" + this.profilVersion + "*p:" + this.profil + "*l:" + _2f.join(",")); 
	return"pv:" + this.profilVersion + "*p:" + this.profil + "*l:" + _2f.join(","); 
}; 
Element.observe(window, "load", function() {
	if(console && console.debug && ((typeof(environnement) == "undefined") || (environnement != "prod"))) {
		console.debug("Chargement des Aides Contextuelles ..."); }
	TooltipManager.init("tooltip", {
		url : "/aide.do", options : {
		method : "get", parameters : $H( {
			contextHelp : "true"}
		).toQueryString()}
	}
	, {
		minimizable : false, maximizable : false, draggable : false, className : "geoportail", idParamName : "idDoc", shiftX :- 500, width : 410, displayEvent : "click", height : 200}
	); $$("a .tooltip").each(function(o) {
		Event.observe(o, "click", function(_2) {
			Event.stop(_2); return false; }
		); }
	); if(console && console.debug && ((typeof(environnement) == "undefined") || (environnement != "prod"))) {
		console.debug("OK"); }
}
); 
Close Window