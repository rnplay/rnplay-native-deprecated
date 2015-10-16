package com.rnplaynative;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.KeyEvent;

import com.crashlytics.android.Crashlytics;
import com.crashlytics.android.ndk.CrashlyticsNdk;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;

import com.eguma.barcodescanner.BarcodeScanner;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;

import io.fabric.sdk.android.Fabric;
import java.io.File;

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private static final String PREFS_DEBUG_SERVER_HOST_KEY = "debug_http_host";
    private static final String PREFS_RELOAD_ON_JS_CHANGE_KEY = "reload_on_js_change";
    private static final String JS_BUNDLE_FILE_NAME = "ReactNativeDevBundle.js";

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Fabric.with(this, new Crashlytics(), new CrashlyticsNdk());

        // Set up default RNPlayNative app values.
        String packagerRoot = "";
        String bundleAssetName = "index.android.bundle"; // For production.
        String jsMainModuleName = "index.android";
        String moduleName = "RNPlayNative";
        Boolean liveReloadEnabled = false;
        Boolean useDevSupport = false;

        // Get the params that is passed in from Appetize.
        Bundle bundle = getIntent().getExtras();
        if (bundle != null && bundle.containsKey("packagerRoot")) {
            packagerRoot = bundle.getString("packagerRoot");
            if (packagerRoot != null && !packagerRoot.equals("")) {
                packagerRoot = packagerRoot.replaceFirst("^(http://|https://)", "");
                bundleAssetName = "";
                jsMainModuleName = bundle.getString("jsMainModuleName");
                moduleName = bundle.getString("moduleName");
                liveReloadEnabled = true;
                useDevSupport = true;
            }
        }

        // Delete any jsBundle that is here (could be a remnant from a crashed app)
        File nJSBundleTempFile = new File(this.getFilesDir(), JS_BUNDLE_FILE_NAME);
        nJSBundleTempFile.delete();

        // Resets the 'debug_http_host' url. Also sets the 'reload_on_js_change'
        // key to be 'true' as we always want live reload.
        SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        SharedPreferences.Editor editor = mPreferences.edit();
        editor.putString(PREFS_DEBUG_SERVER_HOST_KEY, packagerRoot);
        editor.putBoolean(PREFS_RELOAD_ON_JS_CHANGE_KEY, liveReloadEnabled);
        editor.commit();

        mReactRootView = new ReactRootView(this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName(bundleAssetName)
                .setJSMainModuleName(jsMainModuleName)
                .addPackage(new MainReactPackage())
                .addPackage(new AppReloader())
                .addPackage(new BarcodeScanner())
                .addPackage(new ReactNativeMapboxGLPackage())
                .setUseDeveloperSupport(useDevSupport)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, moduleName, null);

        setContentView(mReactRootView);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
      super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onResume(this);
        }
    }
}
