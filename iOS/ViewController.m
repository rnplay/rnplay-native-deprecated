//
//  ViewController.m
//  RNPlayNative
//
//  Created by Robert Payne on 6/05/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "ViewController.h"
#import "RCTRootView.h"

@interface ViewController ()

@property (nonatomic, strong) NSDictionary *launchOptions;
@property (nonatomic, strong) RCTRootView *rootView;

@end

@implementation ViewController

- (instancetype)initWithLaunchOptions:(NSDictionary *)launchOptions {
  if ((self = [super initWithNibName:nil bundle:nil])) {
    self.launchOptions = launchOptions;
  }
  return self;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [UIColor blackColor];
}

- (void)reloadWithJSBundleURL:(NSURL *)JSBundleURL moduleNamed:(NSString *)moduleName {
  self.rootView = [[RCTRootView alloc] initWithBundleURL:JSBundleURL
                                              moduleName:moduleName
                                           launchOptions:self.launchOptions];
  
  self.rootView.loadingView = [self spinner];
  self.rootView.loadingViewFadeDelay = 0.0;
  self.rootView.loadingViewFadeDuration = 0.15;
  
  self.rootView.frame = self.view.bounds;
  
  [self setView:self.rootView];
}

- (UIActivityIndicatorView *)spinner {
  UIActivityIndicatorView *spinner = [[UIActivityIndicatorView alloc] init];
  [spinner setActivityIndicatorViewStyle:UIActivityIndicatorViewStyleWhiteLarge];
  [spinner setColor:[UIColor colorWithRed:113.0f/255.0f green:47.0f/255.0f blue:169.0f/255.0f alpha:1.0f]];
  [spinner startAnimating];
  return spinner;
}

@end
