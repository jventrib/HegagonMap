package com.hexagon.map.preference;

import android.os.Bundle;
import android.preference.Preference;
import android.preference.PreferenceActivity;
import android.preference.PreferenceScreen;

import com.hexagon.map.R;

public class MapPreferenceActivity extends PreferenceActivity {

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
				Eula.show(MapPreferenceActivity.this);
				return true;
			}
		});
	}

}
