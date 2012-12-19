package com.jventrib.ignDroid.geo;

import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.location.Location;
import android.location.LocationListener;
import android.os.Bundle;

import com.jhlabs.map.awt.Point2D.Float;
import com.jhlabs.map.proj.MercatorProjection;
import com.jventrib.ignDroid.AbstractLocationListener;

public class LocationablePoint extends Point implements LocationListener {

	AbstractLocationListener listener;

	public Bitmap bmp;
	
	public Matrix m;
	public LocationablePoint() {
		
		listener = new AbstractLocationListener() {

			@Override
			public void onLocationChanged(Location location) {
				if (isBetterLocation(location, getCurrentBestLocation())) {
					setCurrentBestLocation(location);
					// mapActivity.locationPoint.moveToPosition(location);
					float longitude = new java.lang.Float(
							location.getLongitude());
					float latitude = new java.lang.Float(location.getLatitude());
					Float pos = new Float(longitude, latitude);
					pos = MercatorProjection.getInstance().project(
							new com.jhlabs.map.awt.Point2D.Float(longitude,
									latitude));
					coordX = pos.x;
					coordY = pos.y;
				}
			}
		};
	}

	@Override
	public void onLocationChanged(Location location) {
		listener.onLocationChanged(location);
	}

	@Override
	public void onProviderDisabled(String provider) {
		listener.onProviderDisabled(provider);
	}

	@Override
	public void onProviderEnabled(String provider) {
		listener.onProviderEnabled(provider);
	}

	@Override
	public void onStatusChanged(String provider, int status, Bundle extras) {
		listener.onStatusChanged(provider, status, extras);
	}

}
