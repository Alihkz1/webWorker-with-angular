export function LogMethod() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Calling method: ${propertyKey}`);
      console.log(`Arguments: ${JSON.stringify(args)}`);

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
