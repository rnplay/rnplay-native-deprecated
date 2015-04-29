/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "JSUrl.h"

#import "RCTRootView.h"

@implementation AppDelegate

{
  NSDictionary *_launchOptions;
}

RCT_EXPORT_MODULE();

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  _launchOptions = launchOptions;
 
//  _jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  [self loadAppFromBundleURL:JSURL moduleName:@"RNPlayNative"];
  
  return YES;
}

// - (void)loadAppFromBundleURL:(NSString *)url moduleName:(NSString *)moduleName
// {

 
// }

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(loadAppFromBundleURL:(NSString *)url moduleName:(NSString *)moduleName)
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [NSURL URLWithString:url];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:moduleName
                                                   launchOptions:_launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
}


@end
