import Foundation
import React

@objc(CodePush)
class CodePush: NSObject {

let diskManager = CPDiskManager.shared

  @objc var bridge: RCTBridge!

    @objc
    func execute(_ path: String, _ resolve: @escaping RCTPromiseResolveBlock, _ reject: @escaping RCTPromiseRejectBlock) {
        Execute.execute(path, bridge: self.bridge)
        resolve(nil)
    }

}
