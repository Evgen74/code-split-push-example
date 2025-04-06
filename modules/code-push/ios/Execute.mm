#import "Execute.h"

@interface RCTCxxBridge

- (void)executeApplicationScript:(NSData *)script url:(NSURL *)url async:(BOOL)async;

@end


@implementation Execute

+ (void)execute:(NSString *)path bridge:(RCTBridge *)bridge {
    NSFileManager* manager = [NSFileManager defaultManager];
    NSData* data = [manager contentsAtPath:path];
    NSURL *url = [NSURL URLWithString:path];
    
    __weak RCTCxxBridge *castedBridge = (RCTCxxBridge *)bridge;
    
    [castedBridge executeApplicationScript:data url:url async:YES];
}

@end
