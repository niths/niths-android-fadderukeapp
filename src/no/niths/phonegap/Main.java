package no.niths.phonegap;

import android.os.Bundle;

import com.flurry.android.FlurryAgent;
import com.phonegap.DroidGap;

public class Main extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html");
        
    }
    
    @Override
    protected void onStart() {
        super.onStart();
        FlurryAgent.onStartSession(this, "3C8DZ6EVBHJ3IR1T7X1S");
    }

    @Override
    public void onStop()
    {
       super.onStop();
       FlurryAgent.onEndSession(this);
    }
}