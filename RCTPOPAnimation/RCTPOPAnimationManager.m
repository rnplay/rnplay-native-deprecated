// Copyright 2004-present Facebook. All Rights Reserved.

#import "RCTPOPAnimationManager.h"

#import "RCTAssert.h"
#import "RCTBridge.h"
#import "RCTConvert.h"
#import "RCTLog.h"
#import "RCTSparseArray.h"
#import "RCTUIManager.h"

#import <POP/POP.h>

typedef NS_ENUM(NSInteger, RCTPOPAnimationType) {
  RCTPOPAnimationTypeSpring = 0,
  RCTPOPAnimationTypeDecay,
  RCTPOPAnimationTypeLinear,
  RCTPOPAnimationTypeEaseIn,
  RCTPOPAnimationTypeEaseOut,
  RCTPOPAnimationTypeEaseInEaseOut,
};

/**
 * Properties for all animations that can be specified in JavaScript via
 * RCTPOPAnimationManager.createAnimation().  These generally map directly
 * to POPAnimation properties.
 */
static const struct {
  __unsafe_unretained NSString *property;
  __unsafe_unretained NSString *velocity;
  __unsafe_unretained NSString *fromValue;
  __unsafe_unretained NSString *toValue;
  __unsafe_unretained NSString *springBounciness;
  __unsafe_unretained NSString *dynamicsTension;
  __unsafe_unretained NSString *dynamicsFriction;
  __unsafe_unretained NSString *dynamicsMass;
  __unsafe_unretained NSString *deceleration;
  __unsafe_unretained NSString *duration;
} RCTPOPAnimationManagerProperties = {
  // Not all of these properties apply to all animation types
  .property = @"property",
  .velocity = @"velocity",
  .fromValue = @"fromValue",
  .toValue = @"toValue",
  .springBounciness = @"springBounciness",
  .dynamicsTension = @"dynamicsTension",
  .dynamicsFriction = @"dynamicsFriction",
  .dynamicsMass = @"dynamicsMass",
  .deceleration = @"deceleration",
  .duration = @"duration",
};

@implementation RCTPOPAnimationManager
{
  RCTSparseArray *_animationRegistry;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (instancetype)init
{
  if ((self = [super init])) {
    _animationRegistry = [[RCTSparseArray alloc] init];
  }
  return self;
}

- (dispatch_queue_t)methodQueue
{
  return _bridge.uiManager.methodQueue;
}

- (NSDictionary *)constantsToExport
{
  return @{
    @"Types": @{
      @"spring": @(RCTPOPAnimationTypeSpring),
      @"decay": @(RCTPOPAnimationTypeDecay),
      @"linear": @(RCTPOPAnimationTypeLinear),
      @"easeIn": @(RCTPOPAnimationTypeEaseIn),
      @"easeOut": @(RCTPOPAnimationTypeEaseOut),
      @"easeInEaseOut": @(RCTPOPAnimationTypeEaseInEaseOut)
    },
    @"Properties": @{
      @"bounds": kPOPLayerBounds,
      @"position": kPOPLayerPosition,
      @"positionX": kPOPLayerPositionX,
      @"positionY": kPOPLayerPositionY,
      @"opacity": kPOPLayerOpacity,
      @"scaleX": kPOPLayerScaleX,
      @"scaleY": kPOPLayerScaleY,
      @"scaleXY": kPOPLayerScaleXY,
      @"subscaleXY": kPOPLayerSubscaleXY,
      @"translationX": kPOPLayerTranslationX,
      @"translationY": kPOPLayerTranslationY,
      @"translationZ": kPOPLayerTranslationZ,
      @"translationXY": kPOPLayerTranslationXY,
      @"subtranslationX": kPOPLayerSubtranslationX,
      @"subtranslationY": kPOPLayerSubtranslationY,
      @"subtranslationZ": kPOPLayerSubtranslationZ,
      @"subtranslationXY": kPOPLayerSubtranslationXY,
      @"zPosition": kPOPLayerZPosition,
      @"size": kPOPLayerSize,
      @"rotation": kPOPLayerRotation,
      @"rotationX": kPOPLayerRotationX,
      @"rotationY": kPOPLayerRotationY,
      @"shadowColor": kPOPLayerShadowColor,
      @"shadowOffset": kPOPLayerShadowOffset,
      @"shadowOpacity": kPOPLayerShadowOpacity,
      @"shadowRadius": kPOPLayerShadowRadius
    }
  };
}

- (void)dealloc
{
  RCTAssert(!self.valid, @"must call -invalidate before -dealloc");
}

- (BOOL)isValid
{
  return _animationRegistry != nil;
}

- (void)invalidate
{
  _animationRegistry = nil;
  _bridge = nil;
}

RCT_EXPORT_METHOD(createAnimationInternal:(NSNumber *)animationTag
                  type:(NSInteger)type
                  props:(NSDictionary *)props)
{
  RCTAssert(props != nil, @"props should exist");
  [_bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {

    NSString *propertyName = [props objectForKey:RCTPOPAnimationManagerProperties.property];
    if (!propertyName) {
      RCTLogError(@"Animation has no property to animate: %@", props);
    }
    POPAnimatableProperty *property = [POPAnimatableProperty propertyWithName:propertyName];

    static NSDictionary *animationsByType;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      animationsByType = @{
        @(RCTPOPAnimationTypeSpring): ^{return [POPSpringAnimation animation];},
        @(RCTPOPAnimationTypeDecay): ^{return [POPDecayAnimation animation];},
        @(RCTPOPAnimationTypeLinear): ^{return [POPBasicAnimation linearAnimation];},
        @(RCTPOPAnimationTypeEaseIn): ^{return [POPBasicAnimation easeInAnimation];},
        @(RCTPOPAnimationTypeEaseOut): ^{return [POPBasicAnimation easeOutAnimation];},
        @(RCTPOPAnimationTypeEaseInEaseOut): ^{return [POPBasicAnimation easeInEaseOutAnimation];},
      };
    });

    POPPropertyAnimation *(^animationBlock)() = animationsByType[@(type)];
    if (!animationBlock) {
      RCTLogError(@"Unknown animation type: %zd", type);
      animationBlock = ^{return [POPBasicAnimation easeInEaseOutAnimation];};
    }

    POPPropertyAnimation *animation = animationBlock();
    animation.property = property;

    [props enumerateKeysAndObjectsUsingBlock:^(NSString *key, id jsonValue, BOOL *stop) {
      // Specially handled these keys above.
      if ([key isEqualToString:RCTPOPAnimationManagerProperties.property] || [key isEqualToString:@"type"]) {
        return;
      }

      if ([RCTPOPAnimationManager _propertyKeyIsPOPAnimationKey:key]) {
        id animationValue;
        if ([jsonValue isKindOfClass:[NSNumber class]]) {
          //
          // JSON number -> NSNumber
          //
          animationValue = jsonValue;

          // Make sure it's actually an NSNumber(float) or NSNumber(double); POPAnimation fails on NSNumber(int).
          animationValue = @([animationValue doubleValue]);
        } else if ([jsonValue isKindOfClass:[NSArray class]]) {
          NSArray *jsonArray = (NSArray *)jsonValue;
          if (jsonArray.count == 2) {
            //
            // JSON array -> NSValue(CGPoint)
            //
            CGPoint point = [RCTConvert CGPoint:jsonArray];
            animationValue = [NSValue valueWithCGPoint:point];
          } else if (jsonArray.count == 4) {
            //
            // JSON array -> NSValue(CGRect)
            //
            CGRect rect = [RCTConvert CGRect:jsonArray];
            animationValue = [NSValue valueWithCGRect:rect];
          } else {
            RCTLogError(@"Only two-dimensional (point) values supported for %@ of property: %@", key, propertyName);
            return;
          }

        }

        // Various POPAnimation methods, such as -setToValue:, throw if the value is of a type not supported for the animated property (for example, if the animated property is 'scaleXY', the toValue should be a CGPoint, never an NSNumber or some other type).  Catch and log errors instead of crashing.
        @try {
          [animation setValue:animationValue forKey:key];
        } @catch (NSException *exception) {
          RCTLogError(@"Error setting animation property \"%@\" to %@: %@", key, animationValue, exception);
        }
      } else {
        RCTLogError(@"Unknown animation property: %@", key);
      }
    }];

    _animationRegistry[animationTag] = animation;
  }];
}

RCT_EXPORT_METHOD(addAnimation:(NSNumber *)viewTag
                  withTag:(NSNumber *)animationTag
                  completion:(RCTResponseSenderBlock)callback)
{
  if (!animationTag || !viewTag) {
    RCTLogError(@"addAnimation requires both animationTag and viewTag, received (#%@, #%@)", animationTag, viewTag);
    return;
  }

  [_bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
    UIView *view = viewRegistry[viewTag];
    POPAnimation *animation = _animationRegistry[animationTag];
    if (!view) {
      RCTLogError(@"addAnimation cannot find view with tag #%@, attempting to add animation:\n%@", viewTag, animation);
      return;
    }

    if (!animation) {
      RCTLogError(@"addAnimation cannot find animation with tag #%@, attempting to animate view %@ with tag #%@", animationTag, view, viewTag);
    }

    if (callback) {
      animation.completionBlock = ^(POPAnimation *anim, BOOL finished) {
        callback(@[@(finished)]);
      };
    }

    CALayer *layer = view.layer;
    [layer pop_addAnimation:animation forKey:[animationTag stringValue]];
  }];
}

RCT_EXPORT_METHOD(removeAnimation:(NSNumber *)viewTag
                  withTag:(NSNumber *)animationTag)
{
  if (!animationTag || !viewTag) {
    RCTLogError(@"removeAnimation requires both animationTag and viewTag, received (%zd, %zd)", animationTag, viewTag);
    return;
  }

  [_bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
    UIView *view = viewRegistry[viewTag];
    // Simply getting the animation to verify that it exists.
    POPAnimation *animation = _animationRegistry[animationTag];
    if (!view) {
      RCTLogError(@"removeAnimation cannot find view with tag #%@, attempting to remove animation:\n%@", viewTag, animation);
      return;
    }
    if (!animation) {
      RCTLogError(@"removeAnimation cannot find animation with tag #%@, attempting to remove from view %@ with tag #%@", animationTag, view, viewTag);
    }

    CALayer *layer = view.layer;
    [layer pop_removeAnimationForKey:[animationTag stringValue]];
  }];
}

+ (BOOL)_propertyKeyIsPOPAnimationKey:(NSString *)propertyKey
{
  // These are RKAnimationProperties which correspond exactly to CGFloat or NSValue(CGPoint) properties of POPAnimation.  Specifying one of these in the animation properties means that it'll be set directly on the underlying POPAnimation.  This is for convenience so that -createAndRegisterAnimationWithTag:type:props: can parse various similar properties in the same way.
  static NSSet *POPAnimationPropertyKeys = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    __unsafe_unretained NSString **objects = (__unsafe_unretained NSString **)(void *)&RCTPOPAnimationManagerProperties;
    POPAnimationPropertyKeys = [NSSet setWithObjects:objects count:sizeof(RCTPOPAnimationManagerProperties) / sizeof(*objects)];
  });
  return [POPAnimationPropertyKeys containsObject:propertyKey];
}

@end
