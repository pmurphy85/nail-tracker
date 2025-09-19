import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PhotoViewScreen = () => {
  const [showComparison, setShowComparison] = useState(false);

  const currentPhoto = {
    id: '1',
    uri: 'https://via.placeholder.com/300x400/6366f1/ffffff?text=Current',
    date: 'Today, 2:30 PM',
  };

  const previousPhoto = {
    id: '2',
    uri: 'https://via.placeholder.com/300x400/ef4444/ffffff?text=7+Days+Ago',
    date: '7 days ago',
  };

  const deletePhoto = () => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Photo Deleted', 'The photo has been removed from your gallery.');
          },
        },
      ],
    );
  };

  const sharePhoto = () => {
    Alert.alert('Share Photo', 'Photo sharing functionality would open here.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.photoContainer}>
          <Image source={{uri: currentPhoto.uri}} style={styles.mainPhoto} />

          {showComparison && (
            <View style={styles.comparisonOverlay}>
              <Image
                source={{uri: previousPhoto.uri}}
                style={styles.comparisonPhoto}
              />
              <View style={styles.comparisonLabel}>
                <Text style={styles.comparisonText}>7 days ago</Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.comparisonToggle}
            onPress={() => setShowComparison(!showComparison)}>
            <Icon
              name={showComparison ? 'visibility-off' : 'compare'}
              size={24}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.photoInfo}>
          <View style={styles.photoHeader}>
            <View>
              <Text style={styles.photoDate}>{currentPhoto.date}</Text>
              <Text style={styles.photoTitle}>Progress Photo</Text>
            </View>
            <View style={styles.photoActions}>
              <TouchableOpacity style={styles.actionButton} onPress={sharePhoto}>
                <Icon name="share" size={20} color="#6366f1" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={deletePhoto}>
                <Icon name="delete" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Icon name="trending-up" size={24} color="#10b981" />
              <Text style={styles.progressTitle}>Progress Analysis</Text>
            </View>

            <View style={styles.progressMetrics}>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>+12%</Text>
                <Text style={styles.metricLabel}>Nail Health</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>7</Text>
                <Text style={styles.metricLabel}>Days Growth</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>85%</Text>
                <Text style={styles.metricLabel}>Recovery</Text>
              </View>
            </View>

            <Text style={styles.progressDescription}>
              Great improvement! Your nails are showing significant recovery.
              Keep up the excellent work - you're making real progress!
            </Text>
          </View>

          <View style={styles.timelineCard}>
            <Text style={styles.timelineTitle}>Photo Timeline</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.timeline}>
                <TouchableOpacity style={[styles.timelineItem, styles.timelineItemActive]}>
                  <Image
                    source={{uri: currentPhoto.uri}}
                    style={styles.timelinePhoto}
                  />
                  <Text style={styles.timelineDate}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.timelineItem}>
                  <Image
                    source={{uri: previousPhoto.uri}}
                    style={styles.timelinePhoto}
                  />
                  <Text style={styles.timelineDate}>7d ago</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.timelineItem}>
                  <View style={styles.timelinePhotoPlaceholder}>
                    <Icon name="image" size={20} color="#9ca3af" />
                  </View>
                  <Text style={styles.timelineDate}>14d ago</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.timelineItem}>
                  <View style={styles.timelinePhotoPlaceholder}>
                    <Icon name="image" size={20} color="#9ca3af" />
                  </View>
                  <Text style={styles.timelineDate}>21d ago</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <View style={styles.notesCard}>
            <Text style={styles.notesTitle}>Photo Notes</Text>
            <Text style={styles.notesText}>
              Taken in good lighting. Nails are looking much healthier than last week.
              The cuticles are healing well and there's visible growth.
            </Text>

            <TouchableOpacity style={styles.editNotesButton}>
              <Icon name="edit" size={16} color="#6366f1" />
              <Text style={styles.editNotesText}>Edit Notes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  photoContainer: {
    position: 'relative',
    aspectRatio: 3 / 4,
  },
  mainPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  comparisonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  comparisonPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6,
  },
  comparisonLabel: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  comparisonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  comparisonToggle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoInfo: {
    backgroundColor: '#f9fafb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 16,
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  photoDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  photoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 4,
  },
  photoActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  progressMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  progressDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    textAlign: 'center',
  },
  timelineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  timeline: {
    flexDirection: 'row',
    gap: 16,
  },
  timelineItem: {
    alignItems: 'center',
  },
  timelineItemActive: {
    opacity: 1,
  },
  timelinePhoto: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  timelinePhotoPlaceholder: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineDate: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  notesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  editNotesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  editNotesText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default PhotoViewScreen;