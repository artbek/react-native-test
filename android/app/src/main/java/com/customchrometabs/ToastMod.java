package com.customchrometabs;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

import com.facebook.react.ReactPackage;

import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

import android.support.customtabs.CustomTabsIntent;
import android.net.Uri;
import android.content.Intent;


public class ToastMod extends ReactContextBaseJavaModule {

	private static final String DURATION_SHORT_KEY = "BILL";
	private static final String DURATION_LONG_KEY = "JOHN";

	@Override
	public Map<String, Object> getConstants() {
		final Map<String, Object> constants = new HashMap<>();
		constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
		constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
		return constants;
	}

	@Override
	public String getName() {
		return "ToastAnd";
	}

	public ToastMod(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@ReactMethod
	public void launchUrl(String url) {
		CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
		CustomTabsIntent customTabsIntent = builder.build();
		customTabsIntent.intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
		customTabsIntent.launchUrl(this.getCurrentActivity(), Uri.parse(url));
	}

	@ReactMethod
	public void show(String message, int duration) {
		Toast.makeText(getReactApplicationContext(), message, duration).show();
	}

}


class AnExampleReactPackage implements ReactPackage {

	@Override
	public List<Class<? extends JavaScriptModule>> createJSModules() {
		return Collections.emptyList();
	}

	@Override
	public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
		return Collections.emptyList();
	}

	@Override
	public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
		List<NativeModule> modules = new ArrayList<>();

		modules.add(new ToastMod(reactContext));

		return modules;
	}

}
