import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const formatDescriptionRich = (description) => {
  if (!description) {
    return <Text style={styles.paragraph}>Not available</Text>;
  }

  const lines = description.split(/\r?\n|\.\s+|(?=•)/);
  const bulletLines= [];
  const paragraphLines = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (trimmed.startsWith('•')) {
      bulletLines.push(trimmed.replace(/^•\s*/, ''));
    } else {
      paragraphLines.push(trimmed);
    }
  });

  return (
    <View>
      {paragraphLines.map((para, idx) => (
        <Text key={`para-${idx}`} style={styles.paragraph}>
          {para}
        </Text>
      ))}

      {bulletLines.length > 0 && (
        <View style={styles.bulletList}>
          {bulletLines.map((point, idx) => (
            <View key={`bullet-${idx}`} style={styles.bulletItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 14,
    color: '#4B5563', // Tailwind gray-700
    marginBottom: 6,
  },
  bulletList: {
    marginTop: 8,
    paddingLeft: 16,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 14,
    lineHeight: 20,
    marginRight: 6,
  },
  bulletText: {
    fontSize: 14,
    color: '#4B5563',
    flexShrink: 1,
  },
});
