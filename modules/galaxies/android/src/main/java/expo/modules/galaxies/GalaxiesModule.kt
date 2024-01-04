package expo.modules.galaxies

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.pm.PackageInfo
import android.os.Build

class GalaxiesModule : Module() {

     private fun getPackageInfo(): PackageInfo {
        return context.packageManager.getPackageInfo(context.packageName, 0)
    }

    private val context
        get() = requireNotNull(appContext.reactContext)
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('Galaxies')` in JavaScript.
    Name("Galaxies")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("gotData")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("getDeviceInfo") {
        val deviceModel = Build.MODEL ?: "Unknown"
        val appVersion = getPackageInfo()?.versionName ?: "Unknown"

        return@Function mapOf(
            "deviceModel" to deviceModel,
            "appVersion" to appVersion
        )
    }

    // Function that makes an HTTP call to get dummy user from JSONPlaceholder API.

    AsyncFunction("loadDummyUser") {
        val response = fetch("https://jsonplaceholder.typicode.com/users/2").readText()
        val jsonObject = JSONObject(response)
       
        this@GalaxiesModule.sendEvent("gotData", mapOf(
            "data" to jsonObject.toMap()
        ))
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(GalaxiesView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: GalaxiesView, prop: String ->
        println(prop)
      }
    }
  }
}
