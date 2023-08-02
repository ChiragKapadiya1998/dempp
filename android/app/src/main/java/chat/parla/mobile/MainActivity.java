package chat.parla.mobile;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

import com.zoontek.rnbootsplash.RNBootSplash;
import io.moox.rntransparentstatusandnavigationbar.RNTransparentStatusAndNavigationBar;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Parlapp";
  }

  /**
   * Discards any Activity state persisted during the Activity restart process,
   * to avoid inconsistencies that lead to crashes
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);
    RNTransparentStatusAndNavigationBar.init(MainActivity.this); 
  }
}
