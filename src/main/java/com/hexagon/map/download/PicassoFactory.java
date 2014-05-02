package com.hexagon.map.download;

import com.squareup.picasso.Picasso;
import com.squareup.picasso.UrlConnectionDownloader;

import android.content.Context;
import android.net.Uri;

import java.io.IOException;
import java.net.HttpURLConnection;

/**
 * Created by jventribout on 29.04.14.
 */
public class PicassoFactory {

    private static PicassoFactory instance;

    private Picasso picasso;

    private PicassoFactory(Context context) {
        Picasso.Builder builder = new Picasso.Builder(context);
        picasso = builder
                .downloader(new UrlConnectionDownloader(context) {
                                @Override
                                protected HttpURLConnection openConnection(
                                        Uri uri)
                                        throws IOException {
                                    HttpURLConnection
                                            connection = super
                                            .openConnection(uri);
                                    connection.setRequestProperty(
                                            "user-agent",
                                            "Android");
                                    connection.setRequestProperty(
                                            "referer",
                                            "HexagonMap.fr");

                                    return connection;
                                }
                            }
                ).build();
    }


    public static PicassoFactory getInstance(Context context) {

        if (instance == null) {
            instance =  new PicassoFactory(context);
        }

        return instance;
    }

    public Picasso getPicasso() {
        return picasso;
    }
}