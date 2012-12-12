package com.jventrib.ignDroid.preference;

import android.os.Bundle;
import android.preference.Preference;
import android.preference.PreferenceActivity;

import com.jventrib.ignDroid.R;

public class IgnPreferenceActivity extends PreferenceActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		addPreferencesFromResource(R.xml.preferences);

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
