package no.niths.phonegap;

import android.os.Bundle;

import com.phonegap.DroidGap;

public class Main extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html");
        
    }
}