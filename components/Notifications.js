import { IconCheck, IconX } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";

const Notifications = {
  success: (title, message) => {
    showNotification({
      title: title,
      message: message,
      color: "teal",
      icon: <IconCheck size={20} />,
    });
  },
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
