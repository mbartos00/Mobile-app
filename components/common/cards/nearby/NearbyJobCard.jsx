import { Image, View, Text, TouchableOpacity } from 'react-native';

import styles from './nearbyjobcard.style';
const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
      testID='job-card'
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          testID='logo-image'
          source={{
            uri: job.employer_logo
              ? job.employer_logo
              : 'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text
          style={styles.jobName}
          numberOfLines={1}
          testID='job-name'
        >
          {job.job_title}
        </Text>
        <Text
          style={styles.jobType}
          testID='job-type'
        >
          {job.job_employment_type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
