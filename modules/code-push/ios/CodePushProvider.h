#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, EBundleInstallResult) {
    EBundleInstallResultSuccess,
    EBundleInstallResultFailure
};

@interface CodePushProvider : NSObject

+ (instancetype)shared;

@property (nonatomic, strong, readonly) NSURL *bundleURL;

@end

NS_ASSUME_NONNULL_END
