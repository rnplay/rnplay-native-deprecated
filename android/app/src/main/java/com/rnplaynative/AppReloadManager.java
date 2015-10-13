package com.rnplaynative;

import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.File;

public class AppReloadManager {
    private static final String PREFS_DEBUG_SERVER_HOST_KEY = "debug_http_host";
    private static final String JS_BUNDLE_FILE_NAME = "ReactNativeDevBundle.js";

    ReactApplicationContext reactContext;

    public AppReloadManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void loadApp (final String bundleUrl,
                         final String bundlePath,
                         final String moduleName,
                         final String appName) {

        // Set the 'debug_http_host' to the 'packagerRoot' that was passed in.
        SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(reactContext);
        SharedPreferences.Editor editor = mPreferences.edit();
        editor.putString(PREFS_DEBUG_SERVER_HOST_KEY, bundleUrl);
        editor.commit();

        // Delete the jsBundle file for the previously loaded app.
        File nJSBundleTempFile = new File(reactContext.getFilesDir(), JS_BUNDLE_FILE_NAME);
        nJSBundleTempFile.delete();

        Log.d("RNPlayNative", "bundleUrl: " + bundleUrl + " bundlePath: " + bundlePath + " moduleName: " + moduleName + " appName: " + appName);

        loadApp(bundlePath, moduleName);
    }

    private void loadApp(final String bundlePath, final String moduleName) {
        Intent appActivity = new Intent(reactContext, AppActivity.class);
        appActivity.putExtra("jsMainModuleName", bundlePath);
        appActivity.putExtra("moduleName", moduleName);
        appActivity.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(appActivity);
    }
}
