#import "AppDelegate.h"
#import "ViewController.h"
#import "RCTRootView.h"
#import "RCTLinkingManager.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>

@implementation AppDelegate

@synthesize mainViewController;
@synthesize appViewController;
@synthesize shouldRotate;

NSString *const ReturnToHomeEvent = @"returnToHome";

float const kFlipTransitionDuration = 0.4f;
int const kFlipTransitionType = UIViewAnimationOptionTransitionFlipFromRight;

- (NSUInteger)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  NSUInteger orientations;

  orientations = UIInterfaceOrientationMaskPortrait;

  if (appViewController && shouldRotate == YES) {

    orientations = UIInterfaceOrientationMaskAllButUpsideDown;
  }

  return orientations;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  [Fabric with:@[[Crashlytics class]]];

  NSURL *initialJSBundleURL;
  NSString *initialModuleName;

  NSString *suppliedModuleName = [[NSUserDefaults standardUserDefaults] stringForKey:@"moduleName"];
  NSString *suppliedAppUrl = [[NSUserDefaults standardUserDefaults] stringForKey:@"bundleUrl"];

  if (suppliedAppUrl) {
    initialJSBundleURL = [NSURL URLWithString:suppliedAppUrl];
    initialModuleName = suppliedModuleName;

  } else {

    initialJSBundleURL = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    //initialJSBundleURL = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
    initialModuleName = @"RNPlayNative";
  }

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:initialJSBundleURL
                                                      moduleName:initialModuleName
                                                      initialProperties:NULL
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

  UILongPressGestureRecognizer *exitGesture = [[UILongPressGestureRecognizer alloc]
    initWithTarget:self action:@selector(goToHomeScreen:)];
  [exitGesture setMinimumPressDuration:1.5f];
  [exitGesture setNumberOfTouchesRequired:2];
  [self.window addGestureRecognizer:exitGesture];

  return YES;
}

- (UIActivityIndicatorView *)spinner {

  UIActivityIndicatorView *spinner = [[UIActivityIndicatorView alloc] init];
  [spinner setActivityIndicatorViewStyle:UIActivityIndicatorViewStyleWhiteLarge];
  [spinner setColor:[UIColor colorWithRed:113.0f/255.0f green:47.0f/255.0f blue:169.0f/255.0f alpha:1.0f]];
  [spinner startAnimating];
  return spinner;
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
                    completion: ^(BOOL finished){
                      if (finished) {
                        RCTBridge *bridge = [(RCTRootView *)self.window.rootViewController.view bridge];
                        [bridge.eventDispatcher sendAppEventWithName:ReturnToHomeEvent body:@{
                          @"returnToHome": @"true"
                        }];
                      }
                    }];
  }
}

@end
