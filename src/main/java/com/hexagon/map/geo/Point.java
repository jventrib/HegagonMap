package com.hexagon.map.geo;

import com.hexagon.map.Viewport;

import android.location.Location;


public class Point extends AbstractPositionableElement {

	public void moveToPosition(Location location) {
		float locLong = new java.lang.Float(location.getLongitude());
		float locLat = new java.lang.Float(location.getLatitude());

		moveToPosition(locLong, locLat);

	}


	public void getPosFromCoord(Viewport viewport){
		posx = Math.round((coordX - viewport.coordX) / Viewport.zoomRatios[viewport.scale]);
		posy = Math.round((coordY - viewport.coordY) / Viewport.zoomRatios[viewport.scale]);
	}

}
