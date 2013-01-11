package com.hexagon.map;

import java.util.ArrayList;
import java.util.List;

import javax.microedition.khronos.opengles.GL10;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.os.Handler;
import android.util.Log;

import com.hexagon.map.enums.LoadState;
import com.hexagon.map.geo.AbstractPositionableElement;
import com.hexagon.map.opengl.Square;
import com.hexagon.map.preference.Preferences;
import com.hexagon.map.util.JveLog;

public class Tile extends AbstractPositionableElement implements Cloneable {

	// private static final String URL =
	// "http://gpp3-wxs.ign.fr/czj03g5y31qfnzwu782qd79t/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX=!SCALE!&TILEROW=!ROW!&TILECOL=!COL!";

	private static final String TAG = "Tile";

	int indexX;
	int indexY;
	public int mapTileX;
	public int mapTileY;

	public boolean visible = true;

	public boolean visibleOnTop = true;

	private final Viewport viewport;

	final Handler initGeoCookieHandler = new Handler();

	protected boolean threadRunning = Preferences.threadPool;

	Image image = new Image();

	private Matrix m = new Matrix();

	private Square square = new Square();
	
	// public AbstractPositionableElement position = new Point();

	public Tile(Viewport layer, int ix, int iy) {
		this.viewport = layer;
		indexX = ix;
		indexY = iy;
	}

	public void draw(Canvas canvas, int scrollX, int scrollY, Paint paint) {
		int x = posx;
		int y = posy;
		if (visible && Preferences.drawMap) {
			if (image != null && image.bmp != null && image.isLoaded()) {
				canvas.drawBitmap(image.bmp, x, y, paint);
			} else {
				canvas.drawBitmap(viewport.noSrcBmp, x, y, paint);
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
			m = new Matrix(scaleM);
			m.preTranslate(posx, posy);
			if (image != null && image.bmp != null && m != null
					&& image.isLoaded()) {
				if (image.alpha < 255) {
					Paint paintAlpha = new Paint(paint);
					// canvas.drawBitmap(layer.noSrcBmp, m, paint);
					image.alpha = image.alpha + 30;

					if (image.alpha > 255)
						image.alpha = 255;
					paintAlpha.setAlpha(image.alpha);
					canvas.drawBitmap(image.bmp, m, paintAlpha);
				} else {
					paint.setAlpha(255);
					canvas.drawBitmap(image.bmp, m, paint);
				}
			} else {
				canvas.drawBitmap(viewport.noSrcBmp, m, paint);
				// BitmapDrawable bd = new BitmapDrawable(layer.noSrcBmp);
				// bd.draw(canvas);
			}
		}
		if (Preferences.isDrawInfos()) {
			drawDebugInfos(canvas, paint, x, y);
		}
	}

	
	
	public void draw(GL10 gl, Matrix scaleM) {
		int x = posx;
		int y = posy;
		if (visible && Preferences.drawMap) {
			m = new Matrix(scaleM);
			m.preTranslate(posx, posy);
			if (image != null && image.bmp != null && m != null
					&& image.isLoaded()) {
//				square.loadGLTexture(gl, image.bmp);
				square.draw(gl, m);
				}
			} else {
				square.loadGLTexture(viewport.noSrcBmp);
				square.draw(gl, m);
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
		canvas.drawText("visible : " + visible, x, y + 80, paint);
		if (image != null && image.getCacheFileName() != null) {
			canvas.drawText(image.getCacheFileName(), x, y + 100, paint);
		}

	}

	void correctMapImage(boolean fadeIn) {
		int rotateOffsetX = 0;
		int rotateOffsetY = 0;

		// Anti rebound value. Value too low will cause several rebounds of tile
		// offset rotation !
		int m = 50;
		if (posx > viewport.mapScreenWidth + viewport.marginX + m) {
			rotateOffsetX = -viewport.nbTileX;
		} else {
			if (posx < -viewport.marginX - Viewport.tileWidth - m) {
				rotateOffsetX = viewport.nbTileX;
			}
		}
		if (posy > viewport.mapScreenHeight + viewport.marginY + m) {
			rotateOffsetY = -viewport.nbTileY;
		} else {
			if (posy < -viewport.marginY - Viewport.tileHeight - m) {
				rotateOffsetY = viewport.nbTileY;
			}
		}
		if (rotateOffsetX != 0 || rotateOffsetY != 0) {
			this.fillImage(mapTileX + rotateOffsetX, mapTileY + rotateOffsetY);
			this.clearImage();
		}
		this.updateMapImage(fadeIn);
	}

	void fillImage(int tileX, int tileY) {
		mapTileX = tileX;
		mapTileY = tileY;
		float tw = viewport.calcMapTileWidth();
		float th = viewport.calcMapTileHeight();
		mapx = Math.round(tw * tileX + tw / 2);
		mapy = Math.round(th * tileY + th / 2);
		positionImage();
	}

	void fillImage() {
		float tw = viewport.calcMapTileWidth();
		float th = viewport.calcMapTileHeight();
		mapx = Math.round(tw * mapTileX + tw / 2);
		mapy = Math.round(th * mapTileY + th / 2);
		positionImage();
	}

	void positionImage() {
		posx = viewport.calcPixelX(0) + Viewport.tileWidth * mapTileX;
		posy = viewport.calcPixelY(0) + Viewport.tileHeight * mapTileY;
	}

	void positionOldImage() {
		posx = viewport.calcOldPixelX(0) + Viewport.tileWidth * mapTileX;
		posy = viewport.calcOldPixelY(0) + Viewport.tileHeight * mapTileY;
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
//		image.state = LoadState.CLEARED;
		visible = false;
		JveLog.d(TAG, this + "-task cancelled");
		// }
	}

	void updateMapImage(boolean fadeIn) {
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
				-horizontalMargin - tw, viewport.mapScreenWidth
						+ horizontalMargin + tw, -verticalMargin - th,
				viewport.mapScreenHeight + verticalMargin + th);
		if (!vis) {
			if (visible) {
				visible = false;
			}
			JveLog.d(TAG, this + "-Visible : false");
		} else {

			if (image == null) {
				String calcTileSrc = calcTileSrc();
				String cacheFileName = calcCacheName();
				image = new Image(calcTileSrc, cacheFileName, fadeIn, this);
			} else if (image.isCleared()) {
				String calcTileSrc = calcTileSrc();
				String cacheFileName = calcCacheName();
				image.update(calcTileSrc, cacheFileName, fadeIn, this);
				// image = new Image(calcTileSrc, cacheFileName);
				// Log.d(TAG, "cache name : " + cacheFileName);
			}
			if (!visible) {
				visible = true;
			}
		}
	}

	private String calcCacheName() {
		String scaleString = Integer.toString(viewport.scale);
		String mapTileXS = Integer.valueOf(Math.abs(mapTileX)).toString();
		String mapTileYS = Integer.valueOf(Math.abs(mapTileY)).toString();

		String cacheFileName = scaleString + "_" + mapTileXS + "_" + mapTileYS;
		return cacheFileName;
	}

	public String calcTileSrc() {
		String src;
		if (Preferences.isDevServer()) {
			src = viewport.context.getString(R.string.tileUrlDev);
		} else {
			src = viewport.context.getString(R.string.tileUrl);
		}
		String scaleString = Integer.toString(viewport.scale);
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

	@Override
	protected Object clone() throws CloneNotSupportedException {

		Tile clone = (Tile) super.clone();
		if (image != null) {
			clone.image = (Image) this.image.clone();
		}
		return clone;

	}

	public void loadGLTexture(Bitmap bmp) {
		square.loadGLTexture(bmp);
		
	}


}
