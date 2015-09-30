package com.rnplaynative;

import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

/**
 * {@link NativeModule} that allows loading of RN Playground Apps
 */

public class AppReloaderModule extends ReactContextBaseJavaModule {

    private static final String PREFS_DEBUG_SERVER_HOST_KEY = "debug_http_host";
    private static final String JS_BUNDLE_FILE_NAME = "ReactNativeDevBundle.js";

    ReactApplicationContext reactContext;

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    public AppReloaderModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AppReloader";
    }

    @ReactMethod
    public void reloadAppWithURLString (final String bundleUrl,
                                        final String bundlePath,
                                        final String moduleName,
                                        final String appName) {

        // Set the 'debug_http_host' to the 'packagerRoot' that was passed in.
        SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(reactContext);
        SharedPreferences.Editor editor = mPreferences.edit();
        editor.putString(PREFS_DEBUG_SERVER_HOST_KEY, bundleUrl);
        editor.commit();

        // Delete the jsBundle file for the RNPlayNative main ap.
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