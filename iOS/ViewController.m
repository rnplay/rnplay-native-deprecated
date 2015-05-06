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
  [self.rootView removeFromSuperview];
  self.rootView = nil;
  self.rootView = [[RCTRootView alloc] initWithBundleURL:JSBundleURL
                                              moduleName:moduleName
                                           launchOptions:self.launchOptions];
  self.rootView.frame = self.view.bounds;
  [self.view addSubview:self.rootView];
}

@end
