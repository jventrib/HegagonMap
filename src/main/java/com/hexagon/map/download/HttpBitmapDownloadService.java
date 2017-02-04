package com.hexagon.map.download;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.params.ClientPNames;
import org.apache.http.client.params.CookiePolicy;
import org.apache.http.client.params.HttpClientParams;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.conn.ssl.X509HostnameVerifier;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.BufferedHttpEntity;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.SingleClientConnManager;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.provider.Settings.Secure;
import android.util.Log;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.hexagon.map.Image;
import com.hexagon.map.MapActivity;
import com.hexagon.map.R;
import com.hexagon.map.Viewport;
import com.hexagon.map.enums.LoadState;
import com.hexagon.map.preference.Preferences;
import com.hexagon.map.util.AeSimpleSHA1;
import com.hexagon.map.util.JveLog;

public class HttpBitmapDownloadService {

    private static final int LOCAL_COUNT_THRESHOLD = 50;

    private static final String TAG = "Tile";

    // private HttpGet method;
    private boolean alreadyRunning;

    private String token;
    // private File cacheDir;

    private ExecutorService httpGetExecutor;

    private static ThreadLocal<byte[]> imageData = new ThreadLocal<byte[]>();

    private static HttpBitmapDownloadService instance;

    private Context context;

    private Activity activity;

    private String cookie;

    private int localCount;

    private Integer globalCount;

    private boolean alreadyNotified;

    public static HttpBitmapDownloadService getInstance() {
        if (instance == null) {
            instance = new HttpBitmapDownloadService();
        }
        return instance;

    }

    private HttpBitmapDownloadService() {
        httpGetExecutor = Executors.newFixedThreadPool(1, new ThreadFactory() {
            @Override
            public Thread newThread(Runnable r) {
                Thread thread = new Thread(r);
                thread.setName("HttpGetExecutor");
                thread.setPriority(Thread.MIN_PRIORITY);
                return thread;
            }
        });
    }

    public void getHttpBitmap(Image image) {

        if (!Preferences.isDevServer() && !hasPermission()) {
            return;
        }
        if (image.state == LoadState.CLEARED) {
            return;
        }
        InputStream is = null;

        try {
            DefaultHttpClient httpClient = new DefaultHttpClient();
            // httpClient.getParams().setParameter(CoreProtocolPNames.USER_AGENT,
            // "HexagonMap");

            httpClient.getParams().setParameter(
                    CoreProtocolPNames.USER_AGENT, "HexagonMap.fr");
            httpClient.getParams().setParameter(ClientPNames.COOKIE_POLICY,
                    CookiePolicy.RFC_2109);
            HttpResponse response;
            image.method = new HttpGet(new URI(image.getSrc()));
            if (!Preferences.isDevServer()) {
                image.method.addHeader("Referer", "HexagonMap.fr");
            }
            if (image.state == LoadState.CLEARED) {
                return;
            }

            JveLog.d(TAG, this + "-performing get " + image.getSrc()
                    + ". Method : " + image.method);
            response = httpClient.execute(image.method);
            // if (Parameters.logging) {
            // JveLog.d(TAG, this + "- get done or aborted " + getSrc()
            // + ". Method : " + method);
            // }
            boolean imageOk = true;
            if (response.getStatusLine().getStatusCode() == 403) {
                if (Preferences.isLogging()) {
                    JveLog.d(TAG, "get failed, initializing cookie... ");
                }

                if (image.state == LoadState.CLEARED) {
                    return;
                }

                if (alreadyRunning) {
                    synchronized (this) {
                        wait();
                    }
                } else {
                    // initGeoCookie();
                }
                image.method = new HttpGet(new URI(image.getSrc()));
                // image.method.addHeader("Cookie", "jknch=hcnkj; ign="
                // + getToken());

                if (image.state == LoadState.CLEARED) {
                    return;
                }

                response = httpClient.execute(image.method);
                if (response.getStatusLine().getStatusCode() == 403) {
                    imageOk = false;
                }
            }
            if (image.state == LoadState.CLEARED) {
                return;
            }

            BufferedHttpEntity entity = new BufferedHttpEntity(
                    response.getEntity());
            if (Preferences.isLogging()) {
            }
            is = (InputStream) entity.getContent();

            if (image.state == LoadState.CLEARED) {
                is.close();
                return;
            }
            if (imageData.get() == null) {
                imageData.set(new byte[50000]);
            }
            BitmapFactory.Options opt = new BitmapFactory.Options();
            opt.inPreferredConfig = Bitmap.Config.RGB_565; //

            Bitmap bitmap = BitmapFactory.decodeStream(is, null, opt);

            FileOutputStream os = null;
            if (imageOk) {
                final String fileName;
                fileName = image.getCacheFileName();
                String ciFileName = fileName + ".jpg";

                File ciFile = new File(MapActivity.cacheDir, ciFileName);

                os = new FileOutputStream(ciFile);
                // os.write(b);
                entity.writeTo(os);
            }

            is.close();
            if (os != null) {
                os.close();
            }

            synchronized (image) {
                if (image.state == LoadState.CLEARED) {
                    if (Preferences.isLogging()) {
                        JveLog.d(TAG, this + "-outdated, state=loaded");
                    }
                } else {
                    image.state = LoadState.LOADED;
                    image.tile.visibleOnTop = true;

                    if (Preferences.isLogging()) {
                        // JveLog.d(TAG, this + "-state=loaded, src = " +
                        // getSrc());
                    }
                }
                image.bmp = bitmap;
                image.tile.loadGLTexture(image.bmp);

                if (Build.VERSION.SDK_INT >= 12) {
                    Viewport.addBitmapToMemoryCache(image.getCacheFileName(),
                            bitmap);
                }
                if (!Preferences.isDevServer()) {
                    handleCount();
                }

            }
            // return null;
        } catch (Exception e) {
            JveLog.d(TAG, "Error while getting image by http" + e.getMessage());
            try {
                is.close();
            } catch (IOException e1) {
                JveLog.e(TAG, "Error while closing stream", e1);
            }
        }
    }

    private boolean hasPermission() {

        if (globalCount == null || localCount >= LOCAL_COUNT_THRESHOLD) {
            String href = "https://hexagonstat.appspot.com/hexagonmapcounter";
            getGlobalCount(href, false);

        }
        int downloadLimit = Integer.parseInt(getContext().getString(R.string.download_limit));
        if (globalCount > downloadLimit) {
            if (!alreadyNotified) {
                activity.runOnUiThread(new Runnable() {
                    public void run() {
                        Toast.makeText(
                                activity,
                                "Le quota d'utilisation pour ce mois est d�pass� !",
                                Toast.LENGTH_LONG).show();
                    }
                });
                alreadyNotified = true;
            }
            return false;
        }
        return true;

    }

    private void handleCount() {
        localCount++;
        if (localCount >= LOCAL_COUNT_THRESHOLD) {
            updateGlobalCount();
            localCount = 0;
        }
    }

    private void updateGlobalCount() {
        String href = "https://hexagonstat.appspot.com/hexagonmapcounter?inc="
                + localCount;

        getGlobalCount(href, true);
    }


    private void getGlobalCount(String href, boolean incMode) {

        HostnameVerifier hostnameVerifier
                = org.apache.http.conn.ssl.SSLSocketFactory.STRICT_HOSTNAME_VERIFIER;

        DefaultHttpClient client = new DefaultHttpClient();

        SchemeRegistry registry = new SchemeRegistry();
        SSLSocketFactory socketFactory = SSLSocketFactory.getSocketFactory();
        socketFactory.setHostnameVerifier((X509HostnameVerifier) hostnameVerifier);
        registry.register(new Scheme("https", socketFactory, 443));
        SingleClientConnManager mgr = new SingleClientConnManager(client.getParams(), registry);
        DefaultHttpClient httpClient = new DefaultHttpClient(mgr, client.getParams());

        // Set verifier
        HttpsURLConnection.setDefaultHostnameVerifier(hostnameVerifier);

        // Example send http request

        CookieStore cookieStore = new BasicCookieStore();
        BasicClientCookie cookie = new BasicClientCookie("pass", getHash("yxcvbn"));
        cookie.setDomain("appspot.com");
        cookie.setPath("/");
        cookieStore.addCookie(cookie);

        if (incMode) {
            String android_id = Secure.getString(getContext()
                    .getContentResolver(), Secure.ANDROID_ID);
            BasicClientCookie cookie2 = new BasicClientCookie("androidId",
                    android_id);
            cookie2.setDomain("appspot.com");
            cookie2.setPath("/");
            cookieStore.addCookie(cookie2);
        }
        HttpContext localContext = new BasicHttpContext();
        localContext.setAttribute(ClientContext.COOKIE_STORE, cookieStore);

        final HttpParams params = new BasicHttpParams();
        HttpClientParams.setRedirecting(params, false);
        httpClient.setParams(params);
        HttpGet httpget = new HttpGet(href);
        // httpget.setHeader("Cookie", cookie);
        try {
            HttpResponse response = httpClient.execute(httpget, localContext);
//			HttpResponse response = httpClient.execute(httpget);
            StatusLine status = response.getStatusLine();
            if (status.getStatusCode() != 200) {
                throw new IOException("Invalid response from server: "
                        + status.toString());
            }
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                // entity.consumeContent();
                InputStream inputStream = entity.getContent();
                ByteArrayOutputStream content = new ByteArrayOutputStream();

                // Read response into a buffered stream
                int readBytes = 0;
                byte[] sBuffer = new byte[512];
                while ((readBytes = inputStream.read(sBuffer)) != -1) {
                    content.write(sBuffer, 0, readBytes);
                }
                String dataAsString = new String(content.toByteArray());

                Log.d(TAG, "response: " + dataAsString);
                globalCount = Integer.parseInt(dataAsString);
                activity.runOnUiThread(new Runnable() {
                    public void run() {
                        ProgressBar mProgress = (ProgressBar) activity
                                .findViewById(R.id.globalCountProgressBar);
                        mProgress.setProgress(globalCount);
                    }
                });


            }

        } catch (ClientProtocolException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    private String getHash(String text) {
        try {
            return AeSimpleSHA1.SHA1("yxcvbn" + text);
        } catch (NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return text;
    }

    public void initGeoCookie() {
        // if (alreadyRunning) {
        // return;
        // }
        // if (alreadyRunning) {
        // return;
        // }
        alreadyRunning = true;
        DefaultHttpClient httpclient = new DefaultHttpClient();
        try {

            HttpGet httpgetInitCookie = new HttpGet("http://www.geoportail.fr");

            HttpResponse initResponse = httpclient.execute(httpgetInitCookie);
            JveLog.d(TAG, "executed or aborted");
            HttpEntity initEntity = initResponse.getEntity();

            if (initEntity != null) {
                initEntity.consumeContent();
            }
            JveLog.d(TAG, "Initial set of cookies:");
            List<Cookie> cookies = httpclient.getCookieStore().getCookies();
            if (cookies.isEmpty()) {
                JveLog.d(TAG, "None");
            } else {
                for (int i = 0; i < cookies.size(); i++) {
                    JveLog.d(TAG, "- " + cookies.get(i).toString());
                    if (cookies.get(i).getName().equals("ign")) {
                        setToken(cookies.get(i).getValue());
                    }
                }
            }
        } catch (ClientProtocolException e) {
            JveLog.e(TAG, e.getMessage());
        } catch (IOException e) {
            JveLog.e(TAG, e.getMessage());
        } finally {
            synchronized (this) {
                alreadyRunning = false;
                notifyAll();
            }
        }
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void submit(Image image) {
        Runnable task = new DownloadAsyncTask(image);
        httpGetExecutor.submit(task);

    }


    public void launchUpdateCount() {
        Runnable task = new UpdateCounterAsyncTask();
        httpGetExecutor.submit(task);

    }

    public Context getContext() {
        return context;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    private final class DownloadAsyncTask implements Runnable {

        Image image;

        public DownloadAsyncTask(Image image) {
            super();
            this.image = image;
        }

        @Override
        public void run() {
            // synchronized (image) {
            getHttpBitmap(image);
            // }
        }
    }

    private final class UpdateCounterAsyncTask implements Runnable {

        public UpdateCounterAsyncTask() {
            super();
        }

        @Override
        public void run() {
            if (!Preferences.isDevServer()) {
                // synchronized (image) {
                updateGlobalCount();
                // }
            }
        }
    }


}
