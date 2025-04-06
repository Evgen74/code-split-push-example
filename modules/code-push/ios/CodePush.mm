#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTViewManager.h>
#import <React/RCTBundleURLProvider.h>

@interface RCT_EXTERN_MODULE(CodePush, NSObject)

RCT_EXTERN_METHOD(execute
    : (NSString *)path
    : (RCTPromiseResolveBlock)resolve
    : (RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
