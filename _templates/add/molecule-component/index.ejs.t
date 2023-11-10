---
to: src/components/molecules/<%= h.changeCase.pascal(name) %>/index.ts
---
export { default } from './<%= h.changeCase.pascal(name) %>';
export type { I<%= h.changeCase.pascal(name) %>Props } from './<%= h.changeCase.pascal(name) %>';
