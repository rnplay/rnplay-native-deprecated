package org.rnplay.playground;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * {@link NativeModule} that allows loading of RN Playground Apps
 */

public class AppReloaderModule extends ReactContextBaseJavaModule {

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

        AppReloadManager mAppReloadManager = new AppReloadManager(reactContext);
        mAppReloadManager.loadApp(bundleUrl, bundlePath, moduleName, appName);
    }
}