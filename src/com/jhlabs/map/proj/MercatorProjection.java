/*
Copyright 2006 Jerry Huxtable

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

/*
 * This file was semi-automatically converted from the public-domain USGS PROJ source.
 */
/**
 * Added isConformal method, removed isRectilinear (duplicate of super class)
 * by Bernhard Jenny, June 26, 2008.
 */
package com.jhlabs.map.proj;

import android.annotation.SuppressLint;

import com.jhlabs.map.MapMath;
import com.jhlabs.map.awt.Point2D;

public class MercatorProjection extends CylindricalProjection {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static MercatorProjection instance;
	
	private static final int X0 = 20037508;
	private static final int Y0 = 20037508;

	
    private MercatorProjection() {
        minLatitude = MapMath.degToRad(-85);
        maxLatitude = MapMath.degToRad(85);
        scaleFactor = 6378137.0;
    }

    public static MercatorProjection getInstance() {
    	if (instance == null) {
    		instance = new MercatorProjection();
    	}
		return instance;
    	
    }
    
    
    @SuppressLint("UseValueOf")
	public Point2D.Float project(double lam, double phi) {
    	Point2D.Float out = new Point2D.Float();
    	if (spherical) {
            out.x = new Float(scaleFactor * lam);
            out.y = new Float(scaleFactor * Math.log(Math.tan(MapMath.QUARTERPI + 0.5 * phi)));
        } else {
            out.x = new Float(scaleFactor * lam);
            out.y = new Float(-scaleFactor * Math.log(MapMath.tsfn(phi, Math.sin(phi), e)));
        }
        return out;
    }

    @SuppressLint("UseValueOf")
	public Point2D.Float projectInverse(double x, double y) {
    	Point2D.Float out = new Point2D.Float();
        if (spherical) {
            out.y = new Float(MapMath.HALFPI - 2. * Math.atan(Math.exp(-y / scaleFactor)));
            out.x = new Float(x / scaleFactor);
        } else {
            out.y = new Float(MapMath.phi2(Math.exp(-y / scaleFactor), e));
            out.x = new Float(x / scaleFactor);
        }
        return out;
    }

    
    public Point2D.Float project(Point2D.Float pos) {
    	Point2D.Float p = MercatorProjection.getInstance().project(Math.toRadians(pos.x), Math.toRadians(pos.y));
    	Point2D.Float result = new Point2D.Float(p.x + X0, Y0 - p.y);
    	return result;
    }
    

	
	
	
    public boolean hasInverse() {
        return true;
    }

    public boolean isConformal() {
        return true;
    }

    /**
     * Returns the ESPG code for this projection, or 0 if unknown.
     */
    public int getEPSGCode() {
        return 9804;
    }

    public String toString() {
        return "Mercator";
    }
}
