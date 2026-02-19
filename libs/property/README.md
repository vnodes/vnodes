![Npm version](https://img.shields.io/npm/v/@vnodes/property)
![Npm downloads](https://img.shields.io/npm/dm/@vnodes/property)
![Build Status](https://img.shields.io/github/actions/workflow/status/vnodes/vnodes/ci.yml)
![Doc Status](https://img.shields.io/github/actions/workflow/status/vnodes/vnodes/doc.yml)
![Bundle size](https://img.shields.io/bundlephobia/min/@vnodes/property)

<p align="center">
  <img src="https://vnodes.github.io/vnodes/libs/property/assets/favicon.png" alt="Logo"  width="200" height="200" style="border-radius: 100%"/>
</p>

## @vnodes/property

Unified property decorator of **swagger**, **class-validator**, and **class-transformer** decorators.

## Installation

```bash
pnpm add @vnodes/property
```

## Example 

```typescript

import { Prop } from '@vnodes/property'


export class Status { 
  Active  = 'Active',
  Passive = 'Passive'
}

export class UserReadDto { 

  @Prop({ type: Number, format:"int32" })                                 
  id:number; 

  @Prop({ type: Date })                   
  createdAt: Date; 

  @Prop({ type: Date })                   
  updatedAt?: Date; 

  @Prop({ type: Date })                   
  deletedAt?: Date; 

  @Prop({ type: String , maxLength: 255, minLength:3})                   
  firstName:string; 

  @Prop({ type: String , maxLength: 255, minLength:3})                   
  lastName:string; 

  @Prop({ type: String , maxLength: 255, minLength:3 }) 
  middleName?:string; 

  @Prop({ type: String , format:"email" })                      
  username:string; 

  @Prop({ type: String , format:"password" })                   
  password:string; 

  @Pro({ type: [String], maxItems: 10, minItems: 1 })
  tags: String[]

  @Prop({ type: String, enum: Status }) 
  status?: Status

}


export class UserCreateDto { 
  @Prop({ type: String , maxLength: 255, minLength:3 })                   
  firstName:string; 

  @Prop({ type: String , maxLength: 255, minLength:3 })                   
  lastName:string; 

  @Prop({ type: String , maxLength: 255, minLength:3, required: false }) 
  middleName?:string; 

  @Prop({ type: String , format:"email" })                      
  username: string; 

  @Prop({ type: String , format:"password" })                   
  password: string; 

  @Pro({ type: [String], maxItems: 10, minItems: 1, required: false })
  tags?: String[]

  @Prop({ type: String, enum: Status, required:false }) 
  status?: Status
}

```

## 💖 Support My Work

If you find my open-source contributions or the **@vnodes/property** project helpful, consider supporting my work. Your sponsorship helps me maintain these projects and explore new enterprise patterns.

[![CashApp](https://img.shields.io/badge/Sponsor%20me-%23EA4AAA.svg?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://cash.app/$puqlib)

---

## 🤝 Connect with Me

<p align="left">
<a href="mailto:robert.brightline+vnodes-property@gmail.com">
<img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
</a>
</p>
