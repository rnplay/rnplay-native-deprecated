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
    public void reloadAppWithURLString (String url, String moduleName, String appName) {
        Log.d("RNPlayNative", url + moduleName + appName);

        // TODO: CHANGE ME! Should not be hardcoded...
        url = "http://packager0110.rnplay.org";
        url = url.replaceFirst("^(http://|https://)", "");

        // Hardcoded right now to a known Android app...
        // TODO: CHANGE ME! Should not be hardcoded...
        String bundleUrl = "http://packager0110.rnplay.org/js/__63LQ/index.ios.bundle?platform=android";

        // Set the 'debug_http_host' to the 'packagerRoot' that was passed in.
        SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(getReactApplicationContext());
        SharedPreferences.Editor editor = mPreferences.edit();
        editor.putString(PREFS_DEBUG_SERVER_HOST_KEY, url);
        editor.commit();

        // Delete the jsBundle file for the RNPlayNative main ap.
        File nJSBundleTempFile = new File(getReactApplicationContext().getFilesDir(), JS_BUNDLE_FILE_NAME);
        nJSBundleTempFile.delete();

        loadApp();
    }

    private void loadApp() {
        Intent appActivity = new Intent(reactContext, AppActivity.class);
        // TODO: CHANGE ME! Should not be hardcoded...
        appActivity.putExtra("jsMainModuleName", "js/__63LQ/index.android");
        appActivity.putExtra("moduleName", "DrawerLayoutExample");
        appActivity.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(appActivity);
    }
}