package com.jventrib.ignDroid.location;

import java.io.StringReader;
import java.net.URI;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.params.ClientPNames;
import org.apache.http.client.params.CookiePolicy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreProtocolPNames;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import android.content.res.Resources;
import android.os.AsyncTask;
import android.util.Log;

import com.jventrib.ignDroid.MapActivity;
import com.jventrib.ignDroid.R;
import com.jventrib.ignDroid.async.AsyncTaskCompleteListener;
import com.jventrib.ignDroid.util.JveLog;

public class SearchService extends AsyncTask<String, Void, com.jhlabs.map.awt.Point2D.Float> {

	private AsyncTaskCompleteListener<com.jhlabs.map.awt.Point2D.Float> callback;
	private static final String PATTERN = "!PATTERN!";
	private static final String TAG = "SearchService";
	private MapActivity mapActivity;

	public float posLong;
	public float posLat;

	public SearchService(MapActivity context, AsyncTaskCompleteListener<com.jhlabs.map.awt.Point2D.Float> cb) {
		this.mapActivity = context;
		callback = cb;
	}

	public void submit(String pattern) {
		
		execute(pattern);
	}

	@Override
	protected com.jhlabs.map.awt.Point2D.Float doInBackground(String... params) {
		return search(params[0]);
	}

	@Override
	protected void onPostExecute(com.jhlabs.map.awt.Point2D.Float result) {
		callback.onTaskComplete(result);
//		mapActivity.moveToSearch(result);
	}

	public com.jhlabs.map.awt.Point2D.Float search(String pattern) {
		try {
			DefaultHttpClient httpClient = new DefaultHttpClient();
			httpClient.getParams().setParameter(CoreProtocolPNames.USER_AGENT,
					"HexagonMap");
			httpClient.getParams().setParameter(ClientPNames.COOKIE_POLICY,
					CookiePolicy.RFC_2109);
			String response;
			Resources res = mapActivity.getResources();
			String searchUrl = res.getString(R.string.searchUrl);
			HttpPost method = new HttpPost(new URI(searchUrl));
			method.addHeader("Referer", "HexagonMap.fr");

			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
			stringBuilder
					.append("<XLS  xmlns:xls=\"http://www.opengis.net/xls\" xmlns:gml=\"http://www.opengis.net/gml\" xmlns=\"http://www.opengis.net/xls\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" version=\"1.2\" xsi:schemaLocation=\"http://www.opengis.net/xls http://schemas.opengis.net/ols/1.2/olsAll.xsd\">");
			stringBuilder.append("<RequestHeader/>");
			stringBuilder
					.append("<Request requestID=\"1\" version=\"1.2\" methodName=\"LocationUtilityService\">");
			stringBuilder.append("<GeocodeRequest returnFreeForm=\"false\">");
			stringBuilder.append("<Address countryCode=\"StreetAddress\">");
			String address = "<freeFormAddress>!PATTERN!</freeFormAddress>";
			address = address.replaceAll(PATTERN, pattern);
			stringBuilder.append(address);
			stringBuilder.append("</Address>");
			stringBuilder.append("</GeocodeRequest>");
			stringBuilder.append("</Request>");
			stringBuilder.append("</XLS>");
			StringEntity se = new StringEntity(stringBuilder.toString()); // XML
																			// as
																			// a
																			// string
			se.setContentType("text/xml"); // declare it as XML
			method.setEntity(se);

			JveLog.d(TAG, this + "-performing search using pattern : "
					+ pattern + ". Method : " + method);
			ResponseHandler<String> responseHandler = new BasicResponseHandler();
			response = httpClient.execute(method, responseHandler);

			DocumentBuilder parser = DocumentBuilderFactory.newInstance()
					.newDocumentBuilder();
			Document document = parser.parse(new InputSource(new StringReader(
					response)));
			NodeList elems = document.getElementsByTagName("gml:pos");
			Node elemPos = elems.item(0).getFirstChild();
			String value = elemPos.getNodeValue();
			String[] p = value.split(" ");
			posLong = Float.valueOf(p[1]);
			posLat = Float.valueOf(p[0]);
			Log.d(TAG, "reponse :  " + value);

			com.jhlabs.map.awt.Point2D.Float point = new com.jhlabs.map.awt.Point2D.Float(posLong, posLat);
			return point;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
