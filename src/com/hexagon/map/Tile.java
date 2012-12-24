package com.hexagon.map;

import java.util.ArrayList;
import java.util.List;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.os.Handler;

import com.hexagon.map.geo.AbstractPositionableElement;
import com.hexagon.map.preference.Preferences;
import com.hexagon.map.util.JveLog;

public class Tile extends AbstractPositionableElement {

//	private static final String URL = "http://gpp3-wxs.ign.fr/czj03g5y31qfnzwu782qd79t/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX=!SCALE!&TILEROW=!ROW!&TILECOL=!COL!";

	private static final String TAG = "Tile";

	int indexX;
	int indexY;
	public int mapTileX;
	public int mapTileY;

	public boolean visible = true;

	private final Viewport layer;

	final Handler initGeoCookieHandler = new Handler();

	protected boolean threadRunning = Preferences.threadPool;

	private Image image;

	private Matrix m = new Matrix();

	public Tile(Viewport layer, int ix, int iy) {
		this.layer = layer;
		indexX = ix;
		indexY = iy;
	}

	public void draw(Canvas canvas, int scrollX, int scrollY, Paint paint) {
		int x = posx;
		int y = posy;
		if (visible && Preferences.drawMap) {
			if (image != null && image.bmp != null) {
				canvas.drawBitmap(image.bmp, x, y, paint);
			} else {
				canvas.drawBitmap(layer.noSrcBmp, x, y, paint);
			}
		}
		if (Preferences.isDrawInfos()) {
			drawDebugInfos(canvas, paint, x, y);
		}
		
		
		
		List<? super String> l = new ArrayList<String>();
		l.add("test");
	}


	public void draw(Canvas canvas, Matrix scaleM, Paint paint) {
		int x = posx;
		int y = posy;
		if (visible && Preferences.drawMap) {
			m  =  new Matrix(scaleM);
			m.preTranslate(posx, posy);
			if (image != null && image.bmp != null && m != null) {
				if (image.alpha < 255) {
					Paint paintAlpha = new Paint(paint);
					canvas.drawBitmap(layer.noSrcBmp, m, paint);
					image.alpha = image.alpha + 20;

					if (image.alpha > 255) image.alpha = 255;
					paintAlpha.setAlpha(image.alpha);
					canvas.drawBitmap(image.bmp, m, paintAlpha);
				} else {
					paint.setAlpha(255);
					canvas.drawBitmap(image.bmp, m, paint);
				}
			} else {
				canvas.drawBitmap(layer.noSrcBmp, m, paint);
//				BitmapDrawable bd = new BitmapDrawable(layer.noSrcBmp);
//				bd.draw(canvas);
			}
		}
		if (Preferences.isDrawInfos()) {
			drawDebugInfos(canvas, paint, x, y);
		}
	}

	/**
	 * Draw some debug infos on tile. Infos including : - TileX, TileY - Src of
	 * the bitmap - Tile object reference
	 * 
	 * @param canvas
	 * @param paint
	 * @param x
	 * @param y
	 */
	private void drawDebugInfos(Canvas canvas, Paint paint, int x, int y) {
		if (canvas == null || paint == null)
			return;
		paint.setColor(Color.BLACK);
		paint.setTextSize(20);
		canvas.drawText("TileX : " + mapTileX + "/ TileY : " + mapTileY, x,
				y + 40, paint);
		canvas.drawText("x : " + x + "/ y: " + y, x, y + 60, paint);
		canvas.drawText("visible : " + visible , x, y + 80, paint);
		if (image != null && image.getCacheFileName() != null) {
			canvas.drawText(image.getCacheFileName(), x, y + 100, paint);
		}

	}

	void correctMapImage() {
		int rotateOffsetX = 0;
		int rotateOffsetY = 0;

		// Anti rebound value. Value too low will cause several rebounds of tile
		// offset rotation !
		int m = 50;
		if (posx > layer.mapScreenWidth + layer.marginX + m) {
			rotateOffsetX = -layer.nbTileX;
		} else {
			if (posx < -layer.marginX - Viewport.tileWidth - m) {
				rotateOffsetX = layer.nbTileX;
			}
		}
		if (posy > layer.mapScreenHeight + layer.marginY + m) {
			rotateOffsetY = -layer.nbTileY;
		} else {
			if (posy < -layer.marginY - Viewport.tileHeight - m) {
				rotateOffsetY = layer.nbTileY;
			}
		}
		if (rotateOffsetX != 0 || rotateOffsetY != 0) {
			this.fillImage(mapTileX + rotateOffsetX, mapTileY + rotateOffsetY);
			this.clearImage();
			image = null;
			
		}
		this.updateMapImage();
	}

	void fillImage(int tileX, int tileY) {
		mapTileX = tileX;
		mapTileY = tileY;
		float tw = layer.calcMapTileWidth();
		float th = layer.calcMapTileHeight();
		mapx = Math.round(tw * tileX + tw / 2);
		mapy = Math.round(th * tileY + th / 2);
		positionImage();
	}

	void positionImage() {
		posx = layer.calcPixelX(0) + Viewport.tileWidth * mapTileX;
		posy = layer.calcPixelY(0) + Viewport.tileHeight * mapTileY;
	}

	/**
	 * clear the selected Tile. set it not to display, flush the bitmap and the
	 * src url.
	 * 
	 * @param tile
	 *            the tile
	 */
	void clearImage() {
		if (image != null) {
			image.abortDownload();
		}

		image = null;
		visible = false;
		JveLog.d(TAG, this + "-task cancelled");
		// }
	}

	void updateMapImage() {
		int horizontalMargin = 2;
		int verticalMargin = 2;
		int x1, x2, y1, y2, tw, th;
		x1 = posx;
		x2 = posx + Viewport.tileWidth;
		y1 = posy;
		y2 = posy + Viewport.tileHeight;
		tw = Viewport.tileWidth;
		th = Viewport.tileHeight;

		JveLog.d(TAG, this + "-x1 : " + x1);
		JveLog.d(TAG, this + "-x2 : " + x2);
		JveLog.d(TAG, this + "-y1 : " + y1);
		JveLog.d(TAG, this + "-y2 : " + y2);

		boolean vis = Viewport.rectIntersectRect(x1, x2, y1, y2,
				-horizontalMargin - tw, layer.mapScreenWidth + horizontalMargin
						+ tw, -verticalMargin - th, layer.mapScreenHeight
						+ verticalMargin + th);
		if (!vis) {
			if (visible) {
				visible = false;
			}
			JveLog.d(TAG, this + "-Visible : false");
		} else {

			if (image == null) {
				String calcTileSrc = calcTileSrc();
				String cacheFileName = calcCacheName();
				image = new Image(calcTileSrc, cacheFileName);
			} else if (image.isCleared()) {
				String calcTileSrc = calcTileSrc();
				String cacheFileName = calcCacheName();
				image.update(calcTileSrc, cacheFileName);
//				image = new Image(calcTileSrc, cacheFileName);
//				Log.d(TAG, "cache name : " + cacheFileName);
			}
			if (!visible) {
				visible = true;
			}
		}
	}

	private String calcCacheName() {
		String scaleString = Integer.toString(layer.scale);
		String mapTileXS = Integer.valueOf(Math.abs(mapTileX)).toString();
		String mapTileYS = Integer.valueOf(Math.abs(mapTileY)).toString();

		String cacheFileName = scaleString + "_" + mapTileXS + "_" + mapTileYS;
		return cacheFileName;
	}

	public String calcTileSrc() {
		String src = layer.context.getString(R.string.tileUrl);
		String scaleString = Integer.toString(layer.scale);
		String mapTileXS = Integer.valueOf(Math.abs(mapTileX)).toString();
		String mapTileYS = Integer.valueOf(Math.abs(mapTileY)).toString();
		src = src.replaceAll("!SCALE!", scaleString)
				.replaceAll("!ROW!", mapTileYS).replaceAll("!COL!", mapTileXS);
		JveLog.d(TAG, this + "-src : " + src);

		return src;
	}

	public String toString() {
		return "Tile" + "-" + indexX + "-" + indexY;
	}

}
