import React from 'react';
import { Image } from 'react-native';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './popularjobcard.style';
const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: item.employer_logo
              ? item.employer_logo
              : 'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text
        style={styles.companyName}
        numberOfLines={1}
      >
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text
          style={styles.jobName(selectedJob, item)}
          numberOfLines={1}
        >
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
