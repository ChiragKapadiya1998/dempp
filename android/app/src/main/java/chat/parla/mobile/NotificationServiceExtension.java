package chat.parla.mobile;

import static io.invertase.firebase.app.ReactNativeFirebaseApp.getApplicationContext;

import android.content.Context;
import android.content.SharedPreferences;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;


import com.google.gson.annotations.SerializedName;
import com.onesignal.OSNotification;
import com.onesignal.OSNotificationReceivedEvent;
import com.onesignal.OneSignal;
import com.onesignal.OneSignal.OSRemoteNotificationReceivedHandler;
import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;


import android.database.sqlite.SQLiteDatabase;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;


import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import retrofit2.Call;
import retrofit2.Callback;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;

public class NotificationServiceExtension implements OSRemoteNotificationReceivedHandler {
    private String appLogId = "OneSignalParlapp";
    @Override
    public void remoteNotificationReceived(Context context, OSNotificationReceivedEvent notificationReceivedEvent) {
        OSNotification notification = notificationReceivedEvent.getNotification();
        JSONObject data = notification.getAdditionalData();
        String type = "unknown";

        try {
            type = data.getString("type");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        Log.i(appLogId, "TYPE: " + type);
        Log.d(appLogId, "TYPE: " + type);
        Log.i(appLogId, "NOTIFICATION EVENT: " + notification);
        Log.d(appLogId, "NOTIFICATION::::::::::> " + notification.getNotificationId());

        if (notification.getNotificationId() != null && !notification.getNotificationId().isEmpty()) {
            apiCall(notification.getNotificationId());
        }

        if (new String("match-cancelled").equals(type) || new String("match-accepted").equals(type)) {
            Log.i(appLogId, "CLEAR PUSH DETECTED");
            notificationReceivedEvent.complete(notification);
            OneSignal.clearOneSignalNotifications();
        } else if (new String("match-found").equals(type)) {
            notificationReceivedEvent.complete(notification);
        } else if (new String("call-add-time").equals(type)) {
            notificationReceivedEvent.complete(notification);
        } else {
            notificationReceivedEvent.complete(null);
        }
    }
        private void apiCall(String id) {
        try {
            SQLiteDatabase readableDatabase = null;
            readableDatabase = ReactDatabaseSupplier.getInstance(getApplicationContext()).getReadableDatabase();
            String token ="";
            if (readableDatabase != null) {
                token = AsyncLocalStorageUtil.getItemImpl(readableDatabase, "accessToken");

            }
            String url = "https://stg-api.cxtm.xyz/api/v1/pushNotifications/" + id;
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            con.setRequestMethod("PATCH");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Authorization", "Bearer "+ token);
            con.setDoOutput(true);

            String data = "{\n" +
                    "    \"isNotificationReceived\" : true\n" +
                    "}";

            OutputStream os = con.getOutputStream();
            os.write(data.getBytes());
            os.flush();
            os.close();

            int responseCode = con.getResponseCode();
            System.out.println("PATCH response code: " + responseCode);

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            System.out.println(response.toString());
            /*OkHttpClient client = new OkHttpClient().newBuilder()
                    .build();
            MediaType mediaType = MediaType.parse("text/plain");
            RequestBody body = RequestBody.create(mediaType, "{\n    \"isNotificationReceived\" : true\n}");

            Request request = new Request.Builder()
                    .url("https://stg-api.cxtm.xyz/api/v1/pushNotifications/" + id)
                    .method("PATCH", body)
                    .addHeader("Authorization", "Bearer "+ token)
                    .addHeader("Content-Type", "application/json")
                    .build();
            Log.e("request.toString()", request.toString());
            Log.e("notification id", id);
            Log.e("token", token);

            Response response = client.newCall(request).execute();
            Log.e("request extension", String.valueOf(request));
            if (response.code() == 200) {
                Log.e("response.code()==>", String.valueOf(response.body()));
            }*/

        } catch (Exception e) {
            Log.e("error", "error code");
        }
    }
}



