#import "ViewSnapshotter.h"
#import "RCTConvert.h"
#import "RCTBridge.h"
#import "RCTUIManager.h"

@implementation ViewSnapshotter

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(saveSnapshotToPath:(nonnull NSNumber *)reactTag
                  path:(NSString *)filePath
                  callback:(RCTResponseSenderBlock)callback)
{

  UIView *view = [self.bridge.uiManager viewForReactTag:reactTag];

  // defaults: snapshot the same size as the view, with alpha transparency, with current device's scale factor
  UIGraphicsBeginImageContextWithOptions(view.frame.size, NO, 0.0);

  [view drawViewHierarchyInRect:CGRectMake(0, 0, view.frame.size.width, view.frame.size.height) afterScreenUpdates:YES];
  UIImage *image = UIGraphicsGetImageFromCurrentImageContext();

  UIGraphicsEndImageContext();

  NSData *data = UIImagePNGRepresentation(image);

  NSError *error;

  BOOL writeSucceeded = [data writeToFile:filePath options:0 error:&error];

  if (!writeSucceeded) {
    return callback(@[[NSString stringWithFormat:@"Could not write file at path %@", filePath]]);
  }

  callback(@[[NSNull null], [NSNumber numberWithBool:writeSucceeded]]);
}

@end
