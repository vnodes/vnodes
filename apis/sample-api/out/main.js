var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// apis/sample-api/src/app/app.controller.ts
import { Controller, Get } from "@nestjs/common";
var AppController = class {
  hello() {
    return { message: "Hello" };
  }
};
__decorateClass([
  Get("hello")
], AppController.prototype, "hello", 1);
AppController = __decorateClass([
  Controller("apps")
], AppController);

// apis/sample-api/src/app/app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
var AppModule = class {
};
AppModule = __decorateClass([
  Module({ imports: [ConfigModule], controllers: [AppController] })
], AppModule);

// apis/sample-api/src/app/bootstrap.ts
import { NestFactory } from "@nestjs/core";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3e3);
}

// apis/sample-api/src/main.ts
bootstrap();
//# sourceMappingURL=main.js.map
