package com.jventrib.ignDroid.geo;

import com.jhlabs.map.awt.Point2D.Float;
import com.jhlabs.map.proj.MercatorProjection;


public class AbstractPositionableElement {

	public int posx;
	public int posy;
	public int mapx;
	public int mapy;

	public float coordX;
	public float coordY;

	public AbstractPositionableElement() {
		super();
	}

	protected void setPosition(float coordX, float coordY) {
		this.coordX = coordX;
		this.coordY = coordY;
	}

	/**
	 * Set the projected coordonates from the row geo coordonates 
	 * @param locLong
	 * @param locLat
	 */
	public void moveToPosition(float locLong, float locLat) {
		Float pos = MercatorProjection.getInstance().project(new com.jhlabs.map.awt.Point2D.Float(locLong, locLat));
		coordX = pos.x;
		coordY = pos.y;
	}

}