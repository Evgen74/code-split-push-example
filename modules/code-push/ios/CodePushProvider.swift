import Foundation

enum EBundleInstallResult {
  case success
  case failure
}

@objc(CodePushProvider)
class CodePushProvider : NSObject {
  
  @objc
  static let shared = CodePushProvider()
  
  let diskManager = CPDiskManager.shared
  
  override init() {
    super.init()
      
      #if !DEBUG
      diskManager.prepareCodeSplit()
      #endif
  }

  @objc
  var bundleURL: NSURL {
    return diskManager.bundleURL
  }
    
}
