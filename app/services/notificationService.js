import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notificationService = {
  // Request permissions
  async requestPermissions() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return false;
      }
      
      // Get push token (for remote notifications if needed)
      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Push token:', token);
      } catch (error) {
        console.log('Could not get push token:', error);
      }
      
      return true;
    } else {
      alert('Must use physical device for Push Notifications');
      return false;
    }
  },

  // Schedule a medication reminder
  async scheduleMedicationReminder(medication) {
    try {
      await this.requestPermissions();

      if (!Array.isArray(medication.schedule)) {
        console.log('❌ No schedule found for medication:', medication);
        return;
      }

      // Cancel any existing reminders for this medication
      await this.cancelMedicationReminders(medication._id);

      // Schedule new reminders for each time
      const notificationIds = [];
      
      for (const timeString of medication.schedule) {
        const notificationId = await this.scheduleSingleReminder(medication, timeString);
        if (notificationId) {
          notificationIds.push(notificationId);
        }
      }

      console.log(`✅ Scheduled ${notificationIds.length} reminders for ${medication.name}`);
      return notificationIds;
    } catch (error) {
      console.error('❌ Error scheduling reminders:', error);
    }
  },

  // Schedule a single reminder
  async scheduleSingleReminder(medication, timeString) {
    try {
      // Parse time string (format: "HH:MM" or "HH:MM AM/PM")
      const [time, modifier] = timeString.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      // Convert to 24-hour format if needed
      if (modifier) {
        if (modifier.toLowerCase() === 'pm' && hours < 12) {
          hours += 12;
        } else if (modifier.toLowerCase() === 'am' && hours === 12) {
          hours = 0;
        }
      }

      // Create trigger date
      const trigger = new Date();
      trigger.setHours(hours, minutes, 0, 0);

      // If the time has already passed today, schedule for tomorrow
      if (trigger.getTime() < Date.now()) {
        trigger.setDate(trigger.getDate() + 1);
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '💊 Medication Reminder',
          body: `Time to take ${medication.name} - ${medication.dosage}`,
          sound: 'default',
          data: {
            medicationId: medication._id,
            time: timeString,
            type: 'medication_reminder'
          },
        },
        trigger: {
          hour: hours,
          minute: minutes,
          repeats: true,
        },
      });

      console.log(`✅ Scheduled reminder for ${medication.name} at ${timeString}`);
      return notificationId;
    } catch (error) {
      console.error(`❌ Error scheduling reminder for ${timeString}:`, error);
      return null;
    }
  },

  // Cancel all reminders for a medication
  async cancelMedicationReminders(medicationId) {
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      
      const medicationNotifications = scheduledNotifications.filter(notification => 
        notification.content.data?.medicationId === medicationId
      );

      for (const notification of medicationNotifications) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }

      console.log(`✅ Cancelled ${medicationNotifications.length} reminders for medication ${medicationId}`);
    } catch (error) {
      console.error('❌ Error cancelling reminders:', error);
    }
  },

  // Cancel all notifications
  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('✅ Cancelled all scheduled notifications');
  },

  // Get all scheduled notifications
  async getScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  },
};