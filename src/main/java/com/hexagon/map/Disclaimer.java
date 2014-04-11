package com.hexagon.map;

import java.io.BufferedReader;
import java.io.Closeable;
import java.io.IOException;
import java.io.InputStreamReader;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.preference.PreferenceManager;

public class Disclaimer {

    private static final String ASSET_DISCLAIMER = "disclaim";

	private String DISCLAIM_PREFIX = "disclaimer_";
	private Activity mActivity;

	public Disclaimer(Activity context) {
		mActivity = context;
	}

	private PackageInfo getPackageInfo() {
		PackageInfo pi = null;
		try {
			pi = mActivity.getPackageManager().getPackageInfo(
					mActivity.getPackageName(), PackageManager.GET_ACTIVITIES);
		} catch (PackageManager.NameNotFoundException e) {
			e.printStackTrace();
		}
		return pi;
	}

	public void show() {
		PackageInfo versionInfo = getPackageInfo();

		// the eulaKey changes every time you increment the version number in
		// the AndroidManifest.xml
		final String eulaKey = DISCLAIM_PREFIX + versionInfo.versionCode;
		final SharedPreferences prefs = PreferenceManager
				.getDefaultSharedPreferences(mActivity);
		boolean hasBeenShown = prefs.getBoolean(eulaKey, false);
		if (hasBeenShown == false) {

			// Show the Eula
			String title = mActivity.getString(R.string.app_name) + " v"
					+ versionInfo.versionName;

			// Includes the updates as well so users know what changed.
			// String message = mActivity.getString(R.string.updates) + "\n\n" +
			// mActivity.getString(R.string.eula);
			// String message = mActivity.getString(R.string.disclaimer);


			AlertDialog.Builder builder = new AlertDialog.Builder(mActivity)
					.setTitle(title)
					.setMessage(readEula(mActivity))
					.setPositiveButton(android.R.string.ok,
							new Dialog.OnClickListener() {

								@Override
								public void onClick(
										DialogInterface dialogInterface, int i) {
									// Mark this version as read.
									SharedPreferences.Editor editor = prefs
											.edit();
									editor.putBoolean(eulaKey, true);
									editor.commit();
									dialogInterface.dismiss();
								}
							})
					.setNegativeButton(android.R.string.cancel,
							new Dialog.OnClickListener() {

								@Override
								public void onClick(DialogInterface dialog,
										int which) {
									// Close the activity as they have declined
									// the EULA
									mActivity.finish();
								}

							});
			builder.create().show();
		}
	}

	private static CharSequence readEula(Activity activity) {
		BufferedReader in = null;
		try {
			in = new BufferedReader(new InputStreamReader(activity.getAssets()
					.open(ASSET_DISCLAIMER), "UTF-8"));
			String line;
			StringBuilder buffer = new StringBuilder();
			while ((line = in.readLine()) != null)
				buffer.append(line).append('\n');
			return buffer;
		} catch (IOException e) {
			return "";
		} finally {
			closeStream(in);
		}
	}

	/**
	 * Closes the specified stream.
	 * 
	 * @param stream
	 *            The stream to close.
	 */
	private static void closeStream(Closeable stream) {
		if (stream != null) {
			try {
				stream.close();
			} catch (IOException e) {
				// Ignore
			}
		}
	}

}