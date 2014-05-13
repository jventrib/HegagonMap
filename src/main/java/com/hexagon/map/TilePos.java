package com.hexagon.map;

/**
* Created by jventribout on 11.05.14.
*/
class TilePos {

    int x;

    int y;

    TilePos(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public TilePos() {

    }

    @Override
    public boolean equals(Object o) {

        if (this == o) {
            return true;
        }

        if (!(o instanceof TilePos)) {
            return false;
        }

        TilePos tilePos = (TilePos) o;
        if (x == 0 || y == 0 || tilePos.x == 0 || tilePos.y == 0) {
            return false;
        }

        if (x != tilePos.x) {
            return false;
        }
        if (y != tilePos.y) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        int result = x;
        result = 31 * result + y;
        return result;
    }
}
