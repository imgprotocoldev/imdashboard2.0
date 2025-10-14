/**
 * Notification Service
 * 
 * Centralized service for showing user notifications (toasts/alerts)
 * Works alongside emailService.ts for email notifications
 */

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationOptions {
  message: string;
  type: NotificationType;
  duration?: number; // milliseconds
  showInConsole?: boolean;
}

/**
 * Show a notification to the user
 * Currently uses console logging, but can be extended to use toast libraries
 * 
 * @param options - Notification options
 */
export function showNotification(options: NotificationOptions): void {
  const { message, type, duration = 3000, showInConsole = true } = options;

  // Console logging with emoji indicators
  const emoji = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  if (showInConsole) {
    const consoleMethod = type === 'error' ? 'error' : type === 'warning' ? 'warn' : 'log';
    console[consoleMethod](`${emoji[type]} ${message}`);
  }

  // TODO: Integrate with a toast library (react-hot-toast, react-toastify, etc.)
  // For now, we'll use a simple browser notification
  
  // You can extend this to use a toast library like:
  // import toast from 'react-hot-toast';
  // toast[type](message, { duration });
}

/**
 * Show a success notification
 */
export function showSuccess(message: string, duration?: number): void {
  showNotification({ message, type: 'success', duration });
}

/**
 * Show an error notification
 */
export function showError(message: string, duration?: number): void {
  showNotification({ message, type: 'error', duration });
}

/**
 * Show an info notification
 */
export function showInfo(message: string, duration?: number): void {
  showNotification({ message, type: 'info', duration });
}

/**
 * Show a warning notification
 */
export function showWarning(message: string, duration?: number): void {
  showNotification({ message, type: 'warning', duration });
}

/**
 * Show email send status notification
 */
export function showEmailStatus(success: boolean, error?: string): void {
  if (success) {
    showSuccess('✅ Email sent successfully!');
  } else {
    showError(`❌ Failed to send email${error ? `: ${error}` : '.'}`);
  }
}

