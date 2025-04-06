#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTViewManager.h>
#import <React/RCTBundleURLProvider.h>

@interface Execute : NSObject
+ (void)execute:(NSString *)path
    bridge:(RCTBridge *)bridge;

@end
