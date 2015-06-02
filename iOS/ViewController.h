//
//  ViewController.h
//  RNPlayNative
//
//  Created by Robert Payne on 6/05/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController

- (void)reloadWithJSBundleURL:(NSURL *)JSBundleURL moduleNamed:(NSString *)moduleName;

@end
