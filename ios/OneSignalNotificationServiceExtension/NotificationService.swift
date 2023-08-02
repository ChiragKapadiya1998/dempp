import UserNotifications
import OneSignal
import os.log
import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
//import RNCAsyncStorage

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var receivedRequest: UNNotificationRequest!
    var bestAttemptContent: UNMutableNotificationContent?
    //let reactNative = NativeModules.AsyncStorage

 
    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
     
        self.receivedRequest = request;
        self.contentHandler = contentHandler
        self.bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        let userInfo = request.content.userInfo
        let custom = userInfo["custom"]
        //let token = UserDefaults.standard.string(forKey: "accessToken")
     // NSLog("Token user = \(token)")

      if let customOSPayload = userInfo["custom"] as? NSDictionary {
              if let notificationId = customOSPayload["i"] {
                NSLog("Running notificationId = \(notificationId)")
                var semaphore = DispatchSemaphore (value: 0)

                let parameters = "{\n    \"isNotificationReceived\" : true\n}"
                let postData = parameters.data(using: .utf8)

                var request = URLRequest(url: URL(string: "https://stg-api.cxtm.xyz/api/v1/pushNotifications/\(notificationId)")!,timeoutInterval: Double.infinity)
                request.addValue("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwNSwibmFtZSI6IlRlc3QgVXNlciBGcmFuY2UiLCJpYXQiOjE2NzM0ODAxMjEsImV4cCI6MTcwNTAxNjEyMX0.jELsy95x6hZPwQSq0fWzacDczGVHB05AtbVfa0N1FCw", forHTTPHeaderField: "Authorization")
                request.addValue("application/json", forHTTPHeaderField: "Content-Type")

                request.httpMethod = "PATCH"
                request.httpBody = postData
                NSLog("Sending PATCH request: \(request)")
                let task = URLSession.shared.dataTask(with: request) { data, response, error in
                  guard let data = data else {
                    print(String(describing: error))
                    NSLog("error = \(error)")
                    semaphore.signal()
                    return
                  }
                  if let response = response as? HTTPURLResponse {
                          NSLog("Response HTTP Status code: \(response.statusCode)")
                      }

                     if let jsonString = String(data: data, encoding: .utf8) {
                          NSLog("Response data: \(jsonString)")
                      }
                  semaphore.signal()
                }

                task.resume()
                semaphore.wait()


              }
            
          }
      //let custom = userInfo[AnyHashable("custom")] as! [String: Any]
     // let iValue = custom["i"] as! String
     /* let headers = [
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwNSwibmFtZSI6IlRlc3QgVXNlciBGcmFuY2UiLCJpYXQiOjE2NzM0ODAxMjEsImV4cCI6MTcwNTAxNjEyMX0.jELsy95x6hZPwQSq0fWzacDczGVHB05AtbVfa0N1FCw",
          "Content-Type": "application/json"
      ]

      let parameters = "{\n    \"isNotificationReceived\" : true\n}"
      let postData = parameters.data(using: .utf8)
      let url = URL(string: "https://stg-api.cxtm.xyz/api/v1/pushNotifications/\(request.identifier)")!
      var request = URLRequest(url: url)
      request.httpMethod = "PATCH"
      request.allHTTPHeaderFields = headers
      request.httpBody = postData
      NSLog("request = \(request)")
      NSLog("postData = \(postData)")
      let task = URLSession.shared.dataTask(with: request) { data, response, error in
        guard let data = data else {
          print(String(describing: error))
          NSLog("error = \(error)")
          return
        }
          guard let response = response as? HTTPURLResponse,
              (200...299).contains(response.statusCode) else {
              print("server error")
              return
          }
         
        if let response = response as? HTTPURLResponse {
                NSLog("Response HTTP Status code: \(response.statusCode)")
            }

           if let jsonString = String(data: data, encoding: .utf8) {
                NSLog("Response data: \(jsonString)")
            }
      }
      task.resume()*/
     





      //debug log types need to be enabled in Console > Action > Include Debug Messages
        os_log("%{public}@", log: OSLog(subsystem: "YOUR_BUNDLE_ID", category: "OneSignalNotificationServiceExtension"), type: OSLogType.debug, userInfo.debugDescription)
        
        if let bestAttemptContent = bestAttemptContent {
          OneSignal.setLogLevel(.LL_VERBOSE, visualLevel: .LL_NONE)
          bestAttemptContent.body = "[Modified] " + bestAttemptContent.body
          OneSignal.didReceiveNotificationExtensionRequest(self.receivedRequest, with: self.bestAttemptContent, withContentHandler: self.contentHandler)
        }
    }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            OneSignal.serviceExtensionTimeWillExpireRequest(self.receivedRequest, with: self.bestAttemptContent)
            contentHandler(bestAttemptContent)
        }
    }
}

