package com.phonegap.plugins.privateStorage;

import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

/**
 * 
 * @author NITHs
 * 
 * Store your application secret key here
 *
 */
public class PrivateStorage extends Plugin {

    @Override
    public PluginResult execute(
            String action, JSONArray data, String callbackId) {

        // TODO: Fancy logic for forging the key
        StringBuilder key = new StringBuilder();
        for (int i = 0; i < 5; i++) {
            key.append(String.valueOf(i));
        }

        Log.i("INFO", "Getting private data");

        JSONArray json = null;
        try {
            json = new JSONArray("[{\"key\": \"" + key.toString() + "\"}]");
        } catch (JSONException e) {
            Log.e("ERROR", e.getMessage());
        }

        return new PluginResult(PluginResult.Status.OK, json);
    }
}