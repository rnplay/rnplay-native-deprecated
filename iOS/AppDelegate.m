/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "ViewController.h"
#import "RCTLog.h"

@interface AppDelegate()

@property (nonatomic, strong) ViewController *viewController;

@end
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSURL *initialJSBundleURL;
  NSString *initialModuleName;

  // Example:
  // NSString *suppliedAppId = @"qAFzcA";
  // NSString *suppliedModuleName = @"ParallaxExample";

   NSString *suppliedAppId = [[NSUserDefaults standardUserDefaults] stringForKey:@"appId"];
   NSString *suppliedModuleName = [[NSUserDefaults standardUserDefaults] stringForKey:@"moduleName"];
   NSString *suppliedAppUrl = [[NSUserDefaults standardUserDefaults] stringForKey:@"bundleUrl"];
   NSString *useUIExplorer = [[NSUserDefaults standardUserDefaults] stringForKey:@"UIExplorer"];

   RCTLogFunction RNPlayRemoteLogger = ^(
     RCTLogLevel level,
     NSString *fileName,
     NSNumber *lineNumber,
     NSString *message
   )
   {
     NSString *log = RCTFormatLog(
       [NSDate date], [NSThread currentThread], level, fileName, lineNumber, message
     );

     NSString *post = [NSString stringWithFormat:@"log_entry=%@&play_id=%@", log, @"6"];
     NSData *postData = [post dataUsingEncoding:NSASCIIStringEncoding allowLossyConversion:YES];
     NSString *postLength = [NSString stringWithFormat:@"%d",[postData length]];
     NSString *url = @"http://rnplay.ngrok.io/log";

     NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:url]];
     [request setHTTPMethod:@"POST"];
     [request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Content-Type"];
     [request setValue:postLength forHTTPHeaderField:@"Content-Length"];
     [request setHTTPBody:postData];
     NSURLConnection *conn = [[NSURLConnection alloc] initWithRequest:request delegate:self];
     if (conn) {
       NSLog(@"Connection Successful");
     } else {
       NSLog(@"Connection could not be made");
     }

   };

  RCTAddLogFunction(RNPlayRemoteLogger);

  if (suppliedAppUrl) {
    initialJSBundleURL = [NSURL URLWithString:suppliedAppUrl];
    initialModuleName = suppliedModuleName;
  } else if (useUIExplorer) {
    initialJSBundleURL = [NSURL URLWithString:[[[NSBundle mainBundle] URLForResource:@"uiexplorer" withExtension:@"jsbundle"] absoluteString]];
    initialModuleName = @"UIExplorerApp";
  } else {
    initialJSBundleURL = [NSURL URLWithString:[[[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"] absoluteString]];
    initialModuleName = @"RNPlayNative";
  }

  self.viewController = [[ViewController alloc] initWithLaunchOptions:launchOptions];
  [self.viewController reloadWithJSBundleURL:initialJSBundleURL moduleNamed:initialModuleName];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.rootViewController = self.viewController;
  self.window.backgroundColor = [UIColor blackColor];
  [self.window makeKeyAndVisible];

  UISwipeGestureRecognizer *swipeGesture = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(goToHomeScreen:)];
  swipeGesture.numberOfTouchesRequired = 2;
      swipeGesture.direction = (UISwipeGestureRecognizerDirectionUp|UISwipeGestureRecognizerDirectionUp);

  [self.window addGestureRecognizer:swipeGesture];

  return YES;
}

- (void)goToHomeScreen:(UISwipeGestureRecognizer*)swipeGesture {
  [self.viewController
             reloadWithJSBundleURL:[NSURL URLWithString:[[[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"] absoluteString]]
             moduleNamed:@"RNPlayNative"];
}

@end

#import "RCTBridgeModule.h"

@interface AppReloader : NSObject <RCTBridgeModule>
@end

@implementation AppReloader

RCT_EXPORT_MODULE()

-(dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

/**
 *  var AppReloader = require('NativeModules').AppReloader;
 *  AppReloader.reloadAppWithURLString('https://example.com/index.ios.bundle', 'App')
 */
RCT_EXPORT_METHOD(reloadAppWithURLString:(NSString *)URLString moduleNamed:(NSString *)moduleName) {
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];

  NSURL *JSBundleURL = [NSURL URLWithString:URLString];
  [delegate.viewController reloadWithJSBundleURL:JSBundleURL moduleNamed:moduleName];
}

@end
