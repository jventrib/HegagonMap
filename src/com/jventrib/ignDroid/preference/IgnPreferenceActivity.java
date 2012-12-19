package com.jventrib.ignDroid.preference;

import android.os.Bundle;
import android.preference.Preference;
import android.preference.PreferenceActivity;
import android.preference.PreferenceScreen;

import com.jventrib.ignDroid.R;

public class IgnPreferenceActivity extends PreferenceActivity {

	@SuppressWarnings("deprecation")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		addPreferencesFromResource(R.xml.preferences);
		Preference developmentCategory = findPreference("development");
		PreferenceScreen preferenceScreen = getPreferenceScreen();
		if (Preferences.isDevMode()) {
			preferenceScreen.addPreference(developmentCategory);
		} else {
			preferenceScreen.removePreference(developmentCategory);
		}

		Preference pref = findPreference("eulaIGN");
		pref.setOnPreferenceClickListener(new Preference.OnPreferenceClickListener() {

			@Override
			public boolean onPreferenceClick(Preference preference) {
				Eula.show(IgnPreferenceActivity.this);
				return true;
			}
		});
	}

}
