import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import {ProgressPhoto} from '@types/index';

class PhotoService {
  private static readonly PHOTOS_KEY = 'nail_tracker_photos';
  private static readonly PHOTOS_DIR = `${RNFS.DocumentDirectoryPath}/NailTrackerPhotos`;

  static async initializePhotoDirectory(): Promise<void> {
    try {
      const exists = await RNFS.exists(this.PHOTOS_DIR);
      if (!exists) {
        await RNFS.mkdir(this.PHOTOS_DIR);
      }
    } catch (error) {
      console.error('Error initializing photo directory:', error);
      throw error;
    }
  }

  static async getProgressPhotos(): Promise<ProgressPhoto[]> {
    try {
      const data = await AsyncStorage.getItem(this.PHOTOS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting progress photos:', error);
      throw error;
    }
  }

  static async saveProgressPhoto(photoUri: string): Promise<ProgressPhoto> {
    try {
      await this.initializePhotoDirectory();

      const timestamp = Date.now();
      const fileName = `photo_${timestamp}.jpg`;
      const newPath = `${this.PHOTOS_DIR}/${fileName}`;

      await RNFS.copyFile(photoUri, newPath);

      const thumbnailPath = await this.generateThumbnail(newPath, timestamp);

      const photo: ProgressPhoto = {
        id: timestamp.toString(),
        uri: newPath,
        date: new Date().toISOString(),
        thumbnail: thumbnailPath,
      };

      const photos = await this.getProgressPhotos();
      photos.unshift(photo);

      await AsyncStorage.setItem(this.PHOTOS_KEY, JSON.stringify(photos));
      return photo;
    } catch (error) {
      console.error('Error saving progress photo:', error);
      throw error;
    }
  }

  static async deleteProgressPhoto(id: string): Promise<void> {
    try {
      const photos = await this.getProgressPhotos();
      const photoToDelete = photos.find(photo => photo.id === id);

      if (photoToDelete) {
        const photoExists = await RNFS.exists(photoToDelete.uri);
        if (photoExists) {
          await RNFS.unlink(photoToDelete.uri);
        }

        if (photoToDelete.thumbnail) {
          const thumbnailExists = await RNFS.exists(photoToDelete.thumbnail);
          if (thumbnailExists) {
            await RNFS.unlink(photoToDelete.thumbnail);
          }
        }

        const updatedPhotos = photos.filter(photo => photo.id !== id);
        await AsyncStorage.setItem(this.PHOTOS_KEY, JSON.stringify(updatedPhotos));
      }
    } catch (error) {
      console.error('Error deleting progress photo:', error);
      throw error;
    }
  }

  static async getPhotoById(id: string): Promise<ProgressPhoto | null> {
    try {
      const photos = await this.getProgressPhotos();
      return photos.find(photo => photo.id === id) || null;
    } catch (error) {
      console.error('Error getting photo by id:', error);
      throw error;
    }
  }

  static async getRecentPhotos(limit: number = 5): Promise<ProgressPhoto[]> {
    try {
      const photos = await this.getProgressPhotos();
      return photos.slice(0, limit);
    } catch (error) {
      console.error('Error getting recent photos:', error);
      throw error;
    }
  }

  static async getPhotosInDateRange(startDate: string, endDate: string): Promise<ProgressPhoto[]> {
    try {
      const photos = await this.getProgressPhotos();
      return photos.filter(photo => {
        const photoDate = photo.date;
        return photoDate >= startDate && photoDate <= endDate;
      });
    } catch (error) {
      console.error('Error getting photos in date range:', error);
      throw error;
    }
  }

  private static async generateThumbnail(imagePath: string, timestamp: number): Promise<string> {
    try {
      const thumbnailName = `thumb_${timestamp}.jpg`;
      const thumbnailPath = `${this.PHOTOS_DIR}/${thumbnailName}`;

      await RNFS.copyFile(imagePath, thumbnailPath);
      return thumbnailPath;
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      return imagePath;
    }
  }

  static async exportPhotos(): Promise<string[]> {
    try {
      const photos = await this.getProgressPhotos();
      return photos.map(photo => photo.uri);
    } catch (error) {
      console.error('Error exporting photos:', error);
      throw error;
    }
  }

  static async clearAllPhotos(): Promise<void> {
    try {
      const photos = await this.getProgressPhotos();

      for (const photo of photos) {
        const photoExists = await RNFS.exists(photo.uri);
        if (photoExists) {
          await RNFS.unlink(photo.uri);
        }

        if (photo.thumbnail) {
          const thumbnailExists = await RNFS.exists(photo.thumbnail);
          if (thumbnailExists) {
            await RNFS.unlink(photo.thumbnail);
          }
        }
      }

      await AsyncStorage.removeItem(this.PHOTOS_KEY);
    } catch (error) {
      console.error('Error clearing all photos:', error);
      throw error;
    }
  }

  static async getStorageUsage(): Promise<{photos: number; totalSize: string}> {
    try {
      const photos = await this.getProgressPhotos();
      let totalSize = 0;

      for (const photo of photos) {
        try {
          const stat = await RNFS.stat(photo.uri);
          totalSize += stat.size;
        } catch (error) {
        }
      }

      const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
      return {
        photos: photos.length,
        totalSize: `${sizeInMB} MB`,
      };
    } catch (error) {
      console.error('Error getting storage usage:', error);
      return {photos: 0, totalSize: '0 MB'};
    }
  }

  static getProgressAnalysis(photos: ProgressPhoto[]): {
    totalPhotos: number;
    daysSinceFirst: number;
    averageFrequency: string;
    recentActivity: string;
  } {
    if (photos.length === 0) {
      return {
        totalPhotos: 0,
        daysSinceFirst: 0,
        averageFrequency: 'No data',
        recentActivity: 'No photos taken',
      };
    }

    const sortedPhotos = [...photos].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const firstPhoto = sortedPhotos[0];
    const lastPhoto = sortedPhotos[sortedPhotos.length - 1];

    const firstDate = new Date(firstPhoto.date);
    const lastDate = new Date(lastPhoto.date);
    const now = new Date();

    const daysSinceFirst = Math.ceil((now.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
    const averageFrequency = photos.length > 1
      ? `Every ${Math.round(daysSinceFirst / photos.length)} days`
      : 'First photo';

    const daysSinceLastPhoto = Math.ceil((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    const recentActivity = daysSinceLastPhoto === 0
      ? 'Photo taken today'
      : `${daysSinceLastPhoto} days since last photo`;

    return {
      totalPhotos: photos.length,
      daysSinceFirst,
      averageFrequency,
      recentActivity,
    };
  }
}

export default PhotoService;