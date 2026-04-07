export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return "denied";
  if (Notification.permission === "granted") return "granted";
  return await Notification.requestPermission();
};

export const startReminderChecker = (tasks) => {
  const interval = setInterval(() => {
    const now = new Date();

    tasks.forEach((task) => {
      if (task.completed) return;

      const due = new Date(`${task.dueDate}T${task.dueTime}`);
      const diff = due.getTime() - now.getTime();

      if (diff > 0 && diff <= 5 * 60 * 1000) {
        new Notification("Task Reminder", {
          body: `${task.title} is due at ${task.dueTime}`,
        });
      }
    });
  }, 60000);

  return () => clearInterval(interval);
};