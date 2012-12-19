package com.jventrib.ignDroid.util;

import android.util.Log;

import com.jventrib.ignDroid.preference.Preferences;

public class JveLog {

	public static void d(String tag, String string) {
		if (Preferences.isLogging()) {
			Log.d(tag, string);
		}
	}

	
	public static void d(String tag, String string, Throwable e) {
		if (Preferences.isLogging()) {
			Log.d(tag, string, e);
		}
	}


	public static void e(String tag, String string, Exception e) {
		if (Preferences.isLogging()) {
			Log.e(tag, string, e);
		}
	}


	public static void e(String tag, String message) {
		if (Preferences.isLogging()) {
			Log.e(tag, message);
		}
	}
}
