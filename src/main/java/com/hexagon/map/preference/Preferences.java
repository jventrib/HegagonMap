package com.hexagon.map.preference;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

public class Preferences {

	// Logging activated or not
	public static boolean useCache = true;
	public static boolean threadPool = true;
	public static boolean drawMap = true;
	public static boolean rescalePinchZoom = false;
//	public static boolean fullScreen = false;
//	public static boolean devMode = false;

	private static SharedPreferences prefs;

	public static void init(Context context) {
		prefs = PreferenceManager.getDefaultSharedPreferences(context);
	}

	public static boolean isLogging() {
		return prefs.getBoolean("log_state", false);
	}

	public static boolean isDrawInfos() {
		return prefs.getBoolean("draw_infos", false);
	}

	public static boolean isShowFps() {
		return prefs.getBoolean("show_fps", false);
	}

	public static boolean isRescalePinchZoom() {
		return prefs.getBoolean("rescale_pinch_zoom", false);
	}

	public static boolean isFullScreen() {
		return prefs.getBoolean("fullScreen", false);
	}

	public static boolean isDevMode() {
		return prefs.getBoolean("devMode", true);
	}

	public static boolean isDevServer() {
		return prefs.getBoolean("ign_dev_server", false);
	}

	
	public static void setDevMode(boolean b) {
		String param = "devMode";
		setParamBoolean(param, b);
	}

	public static void setFullScreen(boolean b) {
		String param = "fullScreen";
		setParamBoolean(param, b);
	}
	
	private static void setParamBoolean(String param, boolean b) {
		SharedPreferences.Editor editor = prefs.edit();
		editor.putBoolean(param, b);
		editor.commit();
	}

}
