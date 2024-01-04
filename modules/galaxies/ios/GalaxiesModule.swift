import ExpoModulesCore

public class GalaxiesModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('Galaxies')` in JavaScript.
    Name("Galaxies")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("gotData")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("getDeviceInfo") { () -> [String: String] in
      return [
        "deviceModel": UIDevice.current.model,
        "appVersion": Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? ""
      ]
    }

    Function("loadDummyUser") { () -> Void in
  
      let url = URL(string: "https://jsonplaceholder.typicode.com/users/2")!
      let task = URLSession.shared.dataTask(with: url) { data, response, error in
          guard let data = data else {
              print("Error: \(error?.localizedDescription ?? "Unknown error")")
              return
          }
          do {
              let json = try JSONSerialization.jsonObject(with: data, options: [])
              print(json)
              self.sendEvent("gotData", [
                  "data": json
              ])
          } catch let error as NSError {
              print("Error: \(error.localizedDescription)")
          }
      }
      task.resume()
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(GalaxiesView.self) {
      // Defines a setter for the `name` prop.
      Prop("name") { (view: GalaxiesView, prop: String) in
        print(prop)
      }
    }
  }
}
