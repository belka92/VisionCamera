---
to: src/components/molecules/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
import React from 'react';
import { View } from 'react-native';
import { useStyles } from './<%= h.changeCase.pascal(name) %>.useStyles';

const <%= h.changeCase.pascal(name) %> = ({  }: I<%= h.changeCase.pascal(name) %>Props) => {
  const { styles, theme } = useStyles();

  return (
    <View>
      
    </View>
  );
};

export interface I<%= h.changeCase.pascal(name) %>Props {
  
};

export default <%= h.changeCase.pascal(name) %>;
