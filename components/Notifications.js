import { IconCheck, IconX } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";

/* Creating a new object called Notifications. */
const Notifications = {
  /* Creating a new object called Notifications. */
  success: (title, message) => {
    showNotification({
      title: title,
      message: message,
      color: "teal",
      icon: <IconCheck size={20} />,
    });
  },
  /* Creating a new object called Notifications. */
  error: (title, message) => {
    showNotification({
      title: title,
      message: message,
      color: "red",
      icon: <IconX size={20} />,
    });
  },
};

export default Notifications;
