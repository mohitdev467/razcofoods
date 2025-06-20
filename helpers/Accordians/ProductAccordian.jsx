import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { AntDesign } from '@expo/vector-icons';

const ProductAccordian = ({
  title,
  content,
  collapsed,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <AntDesign
          name={collapsed ? 'down' : 'up'}
          size={18}
          color="gray"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>
        <Text style={styles.content}>{content}</Text>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    fontSize: 14,
    color: '#555',
    paddingVertical: 10,
  },
});

export default ProductAccordian;
