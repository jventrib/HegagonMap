package com.jventrib.ignDroid.util;

import org.apache.http.impl.NoConnectionReuseStrategy;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;

public class IgnHttpClient extends DefaultHttpClient {

	private static IgnHttpClient instance;

	public IgnHttpClient() {
		super();
		HttpParams httpParameters = getParams();
		// Set the timeout in milliseconds until a connection is established.
		int timeoutConnection = 3000;
		HttpConnectionParams.setConnectionTimeout(httpParameters,
				timeoutConnection);
		// Set the default socket timeout (SO_TIMEOUT)
		// in milliseconds which is the timeout for waiting for data.
		int timeoutSocket = 15000;
		HttpConnectionParams.setSoTimeout(httpParameters, timeoutSocket);
		setReuseStrategy(new NoConnectionReuseStrategy());
		setParams(httpParameters);
	}

	public static IgnHttpClient getInstance() {
		if (instance == null) {
			instance = new IgnHttpClient();
		}
		return instance;
	}
	
}
