---
inject: true
to: src/components/atoms/index.ts
append: true
---
export { default as <%= h.changeCase.pascal(name) %> } from './<%= h.changeCase.pascal(name) %>';