/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>
#import "VersionManager.h"

extern float const kFlipTransitionDuration;
extern int const kFlipTransitionType;

@interface AppDelegate : UIResponder <UIApplicationDelegate, VersionManagerDelegate>

@property (nonatomic) bool shouldRotate;
@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) UIViewController *mainViewController;
@property (nonatomic, strong) UIViewController *appViewController;

@end
