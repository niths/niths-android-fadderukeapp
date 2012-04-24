package com.phonegap.plugins.privateStorage;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

/**
 * 
 * @author NITHs
 * 
 *         Store your application secret key here
 * 
 */
public class PrivateStorage extends Plugin {

	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		JSONArray jsonRes = null;
		try {
			//TODO: FANCY scrambling logic
			jsonRes = new JSONArray();
			JSONObject dk = new JSONObject().put("devkey", "sob8gvpyk2");
			jsonRes.put(dk);
			JSONObject dt = new JSONObject().put("devtoken", "Q9WduujDMII1vTqpnoefwSx7HWkuqOmtdure1g8BCWA1EGN6nPCNQj4KjtuYwIA0j1CnoC5OQE5UvAfq2tFylw==");
			jsonRes.put(dt);
			JSONObject ak = new JSONObject().put("appkey", "NH3E5WANTJ");
			jsonRes.put(ak);
			JSONObject at = new JSONObject().put("apptoken", "JJbOUVRgFzOvGGUicKnuhB+fXeyvEnJYpl514ar3nU91brUX1EgisRWwEdj1Byw3CeKjPSnqSSO70xwxmupwjw==");
			jsonRes.put(at);

		} catch (JSONException e) {
			Log.e("ERROR", e.getMessage());
		}

		return new PluginResult(PluginResult.Status.OK, jsonRes);
	}
}