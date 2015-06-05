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
#import "GAI.h"
#import "GAIFields.h"
#import "GAIDictionaryBuilder.h"

@implementation AppDelegate

@synthesize mainViewController;
@synthesize appViewController;
@synthesize shouldRotate;

float const kFlipTransitionDuration = 0.4f;
int const kFlipTransitionType = UIViewAnimationOptionTransitionFlipFromRight;

// Google Analytics configuration constants

static NSString *const kGANPropertyId = @"UA-63760955-1";
static NSTimeInterval const kGANDispatchInterval = 120.0;
#if DEBUG
static GAILogLevel const kGANLogLevel = kGAILogLevelVerbose;
#else
static GAILogLevel const kGANLogLevel = kGAILogLevelWarning;
#endif

- (NSUInteger)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  NSUInteger orientations;
  
  orientations = UIInterfaceOrientationMaskPortrait;
  
  if (appViewController && shouldRotate == YES) {
    
    orientations = UIInterfaceOrientationMaskAllButUpsideDown;
  }
  
  return orientations;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  
  [self initializeGoogleAnalytics];
  
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
  
  rootView.loadingView = [self spinner];
  rootView.loadingViewFadeDelay = 0.0;
  rootView.loadingViewFadeDuration = 0.15;

  mainViewController = [[UIViewController alloc] init];
  [mainViewController setView:rootView];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.rootViewController = mainViewController;
  self.window.backgroundColor = [UIColor blackColor];
  [self.window makeKeyAndVisible];
  
  [self trackMainScreeView];

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
  
  if (self.appViewController) {
    self.appViewController = nil;
    shouldRotate = NO;

    [UIView transitionWithView:self.window
                      duration:kFlipTransitionDuration
                       options:kFlipTransitionType
                    animations:^{
                      self.window.rootViewController = mainViewController;
                    }
                    completion:nil];
  }
}

- (UIActivityIndicatorView *)spinner {
  UIActivityIndicatorView *spinner = [[UIActivityIndicatorView alloc] init];
  [spinner setActivityIndicatorViewStyle:UIActivityIndicatorViewStyleWhiteLarge];
  [spinner setColor:[UIColor colorWithRed:113.0f/255.0f green:47.0f/255.0f blue:169.0f/255.0f alpha:1.0f]];
  [spinner startAnimating];
  return spinner;
}

- (void)initializeGoogleAnalytics {
  [GAI sharedInstance].trackUncaughtExceptions = YES;
  [GAI sharedInstance].dispatchInterval = kGANDispatchInterval;
  [GAI sharedInstance].logger.logLevel = kGANLogLevel;
  [[GAI sharedInstance] trackerWithTrackingId:kGANPropertyId];
}

- (void)trackMainScreeView {
  id tracker = [[GAI sharedInstance] defaultTracker];
  [tracker set:kGAIScreenName value:@"Main"];
  [tracker send:[[GAIDictionaryBuilder createScreenView] build]];
}

@end
