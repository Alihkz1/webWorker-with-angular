export function LogMethod() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(descriptor);

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Calling method: ${propertyKey}`);
      console.log(`Arguments: ${JSON.stringify(args)}`);
      console.log(`Return value: ${originalMethod.apply(this, args)}`);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

interface LogPropertyConfig {
  logGet?: boolean;
  logSet?: boolean;
}

export function LogField(config?: LogPropertyConfig) {
  return (target: any, propertyKey: string) => {
    const defaultConfig: LogPropertyConfig = {
      logGet: true,
      logSet: true,
      ...config,
    };

    let value = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      get: () => {
        if (defaultConfig.logGet) {
          console.log(`Getting ${propertyKey}: ${value}`);
        }
        return value;
      },
      set: (newValue) => {
        if (defaultConfig.logSet) {
          console.log(`Setting ${propertyKey}: ${newValue}`);
        }
        value = newValue;
      },
      enumerable: true,
      configurable: true,
    });
  };
}

export function enumerable(boolFlag: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = boolFlag;
  };
}

export function ClassLogger() {
  return function (target: any) {
    console.log(target);
  };
}

export function Required(target: any, propertyKey: string) {
  let value: any;
  const getter = function () {
    return value;
  };
  const setter = function (newVal: string) {
    if (newVal === null || newVal === undefined) {
      throw new Error('The setting value is null or undefined!');
    }
    value = newVal;
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}
