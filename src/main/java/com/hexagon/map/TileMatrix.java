package com.hexagon.map;

import com.hexagon.map.enums.LoadState;
import com.hexagon.map.opengl.Matrix4;
import com.hexagon.map.opengl.Square;
import com.hexagon.map.preference.Preferences;
import com.hexagon.map.util.JveLog;

import android.animation.ObjectAnimator;
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
    public static final int SCREEN_MARGIN = 200;


    private Tile[][] grid;

    int scale;

    float zoomScale = 1.0f;

    int nbTileX;

    int nbTileY;

    private Matrix4 m = new Matrix4();

    private Viewport viewport;

    private Context context;

    private int oldRX;

    Map<TilePos, Bitmap> cache = new HashMap<TilePos, Bitmap>();

    private int oldTopLeftTileIndexX = 0;

    private int oldTopLeftTileIndexY = 0;

    private int[][] tmpTileX;

    private int[][] tmpTileY;

    private Square[][] tmpBmp;

    float mAlpha;

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
        tmpTileX = new int[nbTileX][nbTileY];
        tmpTileY = new int[nbTileX][nbTileY];
        tmpBmp = new Square[nbTileX][nbTileY];
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
        mAlpha = alpha;
        m.init();
        m.translate(viewport.mapScreenWidth / 2, viewport.mapScreenHeight / 2);
        int relativePosX = getTopLeftTileX() - getViewportAbsoluteX();
        int relativePosY = getTopLeftTileY() - getViewportAbsoluteY();

        oldTopLeftTileIndexX = getTopLeftTileIndexX();
        oldTopLeftTileIndexY = getTopLeftTileIndexY();

        for (int ix = 0; ix < nbTileX; ix++) {
            for (int iy = 0; iy < nbTileY; iy++) {
                Tile t = grid[ix][iy];

                int newMapTileX = t.mapTileX;
                int newMapTileY = t.mapTileY;

                //Correct tiles indexes
                if ((newMapTileX + nbTileX / 2) * tileWidth > getViewportAbsoluteX() + viewport.mapScreenWidth + SCREEN_MARGIN) {
                    //Out of the screen by right
                    newMapTileX -= nbTileX;

                }
                if ((newMapTileX + nbTileX / 2) * tileWidth < getViewportAbsoluteX() - SCREEN_MARGIN) {
                    //Out of the screen by left
                    newMapTileX += nbTileX;
                }
                if ((newMapTileY + nbTileY / 2) * tileHeight > getViewportAbsoluteY() + viewport.mapScreenHeight + SCREEN_MARGIN) {
                    //Out of the screen by right
                    newMapTileY -= nbTileY;
                }
                if ((newMapTileY + nbTileY / 2) * tileHeight < getViewportAbsoluteY() - SCREEN_MARGIN) {
                    //Out of the screen by left
                    newMapTileY += nbTileY;
                }


                if (t.mapTileX != newMapTileX || t.mapTileY != newMapTileY || t.bmp == null) {
                    if (t.isLoading())return;
                    t.setLoading(true);
                    t.mapTileX = newMapTileX;
                    t.mapTileY = newMapTileY;

                    String calcTileSrc = t.calcTileSrc(scale);
                    t.clearImage();
                    t.loadImageAsync(calcTileSrc, context);
//                    t.loadImageWithIon(calcTileSrc, context);
//                        t.loadImageWithPicasso(calcTileSrc, context);
//                        t.drawDebugInfo();
                }

                if (t.visible) {
                    t.handleAlpha();

                    Matrix4.copy(m, t.m);

                    t.m.scale(zoomScale, zoomScale,
                            viewport.mapScreenWidth / 2,
                            viewport.mapScreenHeight / 2);
                    t.m.translate(relativePosX,
                            relativePosY);
                    t.m.translate(t.mapTileX * tileWidth - getTopLeftTileX(),
                            t.mapTileY * tileHeight - getTopLeftTileY());
                    if (t.isLoaded() && !t.isUploaded()) {
                        t.square.loadGLTexture(t.bmp, viewport.mTextures);
                        t.state = LoadState.UPLOADED;
                    }
                    if (t.isUploaded()) {
                        t.square.draw(gl, viewport.mTextures, t.m, t.alpha);
                    }
                }
            }
        }
    }

    public int initTextures(GL10 gl, int texIndex) {
        for (int ix = 0; ix < nbTileX; ix++) {
            for (int iy = 0; iy < nbTileY; iy++) {
                Tile tile = grid[ix][iy];
                tile.square.initTexture(gl, texIndex++);
            }
        }
        return texIndex;
    }

    public void refresh() {

        for (int ix = 0; ix < nbTileX; ix++) {
            for (int iy = 0; iy < nbTileY; iy++) {
                Tile t = grid[ix][iy];

                t.mapTileX = getTopLeftTileIndexX() + ix - nbTileX / 2;
                t.mapTileY = getTopLeftTileIndexY() + iy - nbTileY / 2;
                t.bmp = null;
                //t.state = LoadState.LOADED;
            }
        }
    }

    public void copyFrom(TileMatrix srcTm) {
        for (int ix = 0; ix < nbTileX; ix++) {
            for (int iy = 0; iy < nbTileY; iy++) {
                Tile target = grid[ix][iy];
                Tile src = srcTm.grid[ix][iy];
                Square backSq = target.square;
                target = src;
                target.state = LoadState.LOADED;
                target.square = backSq;
            }
        }

    }
}