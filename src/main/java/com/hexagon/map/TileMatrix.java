package com.hexagon.map;

import com.hexagon.map.enums.LoadState;
import com.hexagon.map.opengl.Matrix4;
import com.hexagon.map.preference.Preferences;
import com.hexagon.map.util.JveLog;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.FloatMath;

import java.util.HashMap;
import java.util.Map;

import javax.microedition.khronos.opengles.GL10;

/**
 * Created by jventribout on 08.05.14.
 */
public class TileMatrix {

    public static final int tileWidth = 256;

    public static final int tileHeight = 256;

    //Virtual screen space margins to take in account in tiles computations
    private static final int MARGIN_X = 2;

    private static final int MARGIN_Y = 2;

    private static final String TAG = "TileMatrix";


    private Tile[][] grid;

    int scale;

    float zoomScale = 1.0f;

    private int nbTileX;

    private int nbTileY;

    private Matrix4 m = new Matrix4();

    private Viewport viewport;

    private Context context;

    private int oldRX;

    Map<TilePos, Bitmap> cache = new HashMap<TilePos, Bitmap>();


    public TileMatrix(Viewport viewport, Context context) {
        this.viewport = viewport;
        this.context = context;
        init();
    }

    void init() {

        int tempX = viewport.mapScreenWidth + 2 * MARGIN_X;
        int tempY = viewport.mapScreenHeight + 2 * MARGIN_Y;

        nbTileX = tempX / tileWidth + 2;
        nbTileY = tempY / tileHeight + 2;

        grid = new Tile[nbTileX][nbTileY];
        for (int ix = 0; ix < this.nbTileX; ix++) {
            grid[ix] = new Tile[nbTileY];
            for (int iy = 0; iy < this.nbTileY; iy++) {
                this.grid[ix][iy] = new Tile(viewport, this, ix, iy);
            }
        }
    }

    /**
     * Get the x position of top left point of Tile Matrix in pixel.
     *
     * @return x position
     */
    int getTopLeftTileX() {
        return getTopLeftTileIndexX()
                * tileWidth;
    }

    /**
     * Get the y position of top left point of Tile Matrix in pixel.
     *
     * @return y position
     */
    int getTopLeftTileY() {
        return getTopLeftTileIndexY()
                * tileHeight;
    }

    /**
     * Get the x index of top left point of Tile Matrix.
     *
     * @return x index
     */
    private int getTopLeftTileIndexX() {
        return Math.round(FloatMath
                .floor(viewport.getcoordX() / (tileWidth * viewport.zoomRatios[scale])));
    }

    /**
     * Get the y index of top left point of Tile Matrix.
     *
     * @return y index
     */
    private int getTopLeftTileIndexY() {
        return Math.round(FloatMath
                .floor(viewport.getcoordY() / (tileHeight * viewport.zoomRatios[scale])));
    }

    /**
     * get the viewport absolute position X in pixel.
     *
     * @return x position
     */
    public int getViewportAbsoluteX() {
        return Math.round(viewport.getcoordX() / (viewport.zoomRatios[scale]));
    }

    /**
     * get the viewport absolute position Y in pixel.
     *
     * @return y position
     */
    public int getViewportAbsoluteY() {
        return Math.round(viewport.getcoordY() / (viewport.zoomRatios[scale]));
    }


    public synchronized void draw(GL10 gl, float alpha) {
        m.init();
        m.translate(viewport.mapScreenWidth / 2, viewport.mapScreenHeight / 2);
        int relativePosX = getTopLeftTileX() - getViewportAbsoluteX();
        int relativePosY = getTopLeftTileY() - getViewportAbsoluteY();

        if (oldRX != relativePosX) {
            JveLog.d("TM", "scale : " + scale + ", relativeX : " + relativePosX);
            oldRX = relativePosX;
        }

        for (int ix = 0; ix < this.nbTileX; ix++) {
            for (int iy = 0; iy < this.nbTileY; iy++) {
                Tile t = grid[ix][iy];

                int newMapTileX = getTopLeftTileIndexX() + ix - 2;
                int newMapTileY = getTopLeftTileIndexY() + iy - 3;

                if (t.mapTileX != newMapTileX || t.mapTileY != newMapTileY) {
                    TilePos mTilePos = new TilePos();
                    mTilePos.x = newMapTileX;
                    mTilePos.y = newMapTileY;

                    Bitmap cachedTile = cache.get(mTilePos);
                    if (cachedTile != null) {
                        t.bmp = cachedTile;
                        JveLog.d(TAG, "cached Tile : " + cachedTile);
                        t.visible = true;
                    } else {
                        t.mapTileX = newMapTileX;
                        t.mapTileY = newMapTileY;
                        String calcTileSrc = t.calcTileSrc(scale);
                        t.clearImage();
                        t.loadImageWithIon(calcTileSrc, context);
                    }

                }

                if (t.visible) {

                    synchronized (t) {
                        if (t.visible && Preferences.drawMap) {
                            Matrix4.copy(m, t.m);

                            t.m.scale(zoomScale, zoomScale,
                                    viewport.mapScreenWidth / 2,
                                    viewport.mapScreenHeight / 2);
                            t.m.translate(relativePosX,
                                    relativePosY);
                            t.m.translate(t.mapTileX * tileWidth - getTopLeftTileX(),
                                    t.mapTileY * tileHeight - getTopLeftTileY());
                            if (t.isLoaded() && !t.isUploaded()) {
                                t.square.loadGLTexture(t.bmp);
                                t.state = LoadState.UPLOADED;
                            }
                            if (t.isUploaded()) {
                                t.square.draw(gl, t.m, alpha);
                            }
                        }
                    }
                }
            }
        }
    }


}
