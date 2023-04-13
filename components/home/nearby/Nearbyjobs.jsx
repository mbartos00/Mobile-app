import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import styles from './nearbyjobs.style';

import useFetch from '../../../hooks/useFetch';
import { useRouter } from 'expo-router';

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          data?.map(job => (
            <NearbyJobCard
              key={job?.job_id}
              job={job}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
