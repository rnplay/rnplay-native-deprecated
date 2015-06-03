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
#import "JSURL.h"
#import "RCTRootView.h"
#import "RCTLinkingManager.h"

@implementation AppDelegate

float const kFlipTransitionDuration = 0.4f;
int const kFlipTransitionType = UIViewAnimationOptionTransitionFlipFromRight;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  
  NSURL *initialJSBundleURL;
  NSString *initialModuleName;

//   Example:
//   NSString *suppliedAppId = @"qAFzcA";
//   NSString *suppliedModuleName = @"ParallaxExample";
  
  NSString *suppliedAppId = [[NSUserDefaults standardUserDefaults] stringForKey:@"appId"];
  NSString *suppliedModuleName = [[NSUserDefaults standardUserDefaults] stringForKey:@"moduleName"];
  NSString *suppliedAppUrl = [[NSUserDefaults standardUserDefaults] stringForKey:@"bundleUrl"];
  NSString *useUIExplorer = [[NSUserDefaults standardUserDefaults] stringForKey:@"UIExplorer"];

  if (suppliedAppId) {
    initialJSBundleURL = [NSURL URLWithString:[NSString stringWithFormat:@"%@%@%@", @"http://packager.rnplay.org/", suppliedAppId, @".bundle"]];
    initialModuleName = suppliedModuleName;
  } else if (suppliedAppUrl) {
    initialJSBundleURL = [NSURL URLWithString:suppliedAppUrl];
    initialModuleName = suppliedModuleName;
  } else if (useUIExplorer) {
    initialJSBundleURL = [NSURL URLWithString:[[[NSBundle mainBundle] URLForResource:@"uiexplorer" withExtension:@"jsbundle"] absoluteString]];
    initialModuleName = @"UIExplorerApp";
  } else {
    /* initialJSBundleURL = [NSURL URLWithString:[[[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"] absoluteString]]; */
    initialJSBundleURL = [NSURL URLWithString:JSURL];
    initialModuleName = @"RNPlayNative";
  }
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:initialJSBundleURL
                                                      moduleName:initialModuleName
                                                   launchOptions:launchOptions];
  
  UIViewController *mainViewController = [[UIViewController alloc] init];
  [mainViewController setView:rootView];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.rootViewController = mainViewController;
  self.window.backgroundColor = [UIColor blackColor];
  [self.window makeKeyAndVisible];

  UILongPressGestureRecognizer *exitGesture = [[UILongPressGestureRecognizer alloc]
    initWithTarget:self action:@selector(goToHomeScreen:)];
  [exitGesture setMinimumPressDuration:1.5f];
  [exitGesture setNumberOfTouchesRequired:2];
  [self.window addGestureRecognizer:exitGesture];

  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

- (void)goToHomeScreen:(UISwipeGestureRecognizer*)swipeGesture {
  id topView = [[self.window.rootViewController.view subviews] lastObject];
  
  /**
   * The last object on the view stack will be a RCTRootView class if it is from the AppLoader. It is a
   * RCTRootContentView if it is the Main app. This feels a little hacky though, seems like it could break easily...
   */
  
  if ([topView isKindOfClass:[RCTRootView class]]) {
    [UIView transitionWithView:self.window.rootViewController.view
                      duration:kFlipTransitionDuration
                       options:kFlipTransitionType
                    animations:^{
                      [topView removeFromSuperview];
                    }
                    completion:NULL];
  }
}

@end
