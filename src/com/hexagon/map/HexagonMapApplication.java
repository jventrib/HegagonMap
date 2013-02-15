package com.hexagon.map;

import org.acra.ACRA;
import org.acra.ReportingInteractionMode;
import org.acra.annotation.ReportsCrashes;

import com.hexagon.map.download.HttpBitmapDownloadService;

import android.app.Application;

//@ReportsCrashes(formKey = "dHR0SUQ4WDEwekpVbHMwOHhGT3ZQeHc6MQ", mode=ReportingInteractionMode.TOAST)
public class HexagonMapApplication extends Application {
	@Override
	public void onCreate() {
		super.onCreate();

		HttpBitmapDownloadService.getInstance().setContext(this);
		// The following line triggers the initialization of ACRA
//		ACRA.init(this);
	}
}
