import * as Haptics from 'expo-haptics';

// Vibración simple
export const vibrate = (style = 'light') => {
    switch (style) {
        case 'light':
            return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        case 'medium':
            return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        case 'heavy':
            return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        default:
            return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
};

// Notificaciones (éxito, error, warning)
export const notify = (type = 'success') => {
    switch (type) {
        case 'success':
            return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        case 'warning':
            return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        case 'error':
            return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        default:
            return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
};

// Selección (tipo picker o scroll)
export const selection = () => {
    return Haptics.selectionAsync();
};