package com.jventrib.ignDroid;

import org.acra.ACRA;
import org.acra.ReportingInteractionMode;
import org.acra.annotation.ReportsCrashes;

import android.app.Application;

@ReportsCrashes(formKey = "dHR0SUQ4WDEwekpVbHMwOHhGT3ZQeHc6MQ", mode=ReportingInteractionMode.TOAST)
public class IgnDroidApplication extends Application {
	@Override
	public void onCreate() {
		super.onCreate();

		// The following line triggers the initialization of ACRA
		ACRA.init(this);
	}
}
