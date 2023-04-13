import React from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import styles from './popularjobs.style';
import useFetch from '../../../hooks/useFetch';
const Popularjobs = () => {
  const { data, isLoading, error, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size='large'
            colors={COLORS.primary}
          />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            key={data.job_id}
            data={data}
            renderItem={({ item }) => <PopularJobCard item={item} />}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
