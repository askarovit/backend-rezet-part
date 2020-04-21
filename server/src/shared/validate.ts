export const validate = (schemaId: string): any => {

  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    let fn = descriptor.value;
    return {
      value: function(body) {
        return fn.call(this, body)
      }
    };
  }
};
