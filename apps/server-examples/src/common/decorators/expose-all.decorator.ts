import 'reflect-metadata';
import { Expose } from 'class-transformer';

/**
 * 클래스의 모든 속성을 자동으로 노출하는 데코레이터
 * @Expose를 각 속성마다 붙이지 않고도 excludeExtraneousValues: true와 함께 사용 가능
 */
export function ExposeAll() {
  return function <T extends { new (...args: never[]): {} }>(constructor: T) {
    // 클래스의 프로토타입에서 모든 속성 키를 가져옴
    const instance = new constructor();
    const propertyKeys = Object.getOwnPropertyNames(instance);

    // 각 속성에 @Expose() 데코레이터 적용
    propertyKeys.forEach((key) => {
      // constructor는 제외
      if (key !== 'constructor') {
        Expose()(constructor.prototype, key);
      }
    });

    return constructor;
  };
}
