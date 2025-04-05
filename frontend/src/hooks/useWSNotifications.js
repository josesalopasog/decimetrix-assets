import { useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "../socket"; 

const useWSNotifications = () => {
  useEffect(() => {
    socket.on("userCreated", (data) => {
      toast.success(`🧑‍💻 ${data.user.username} was created`);
    });

    socket.on("userUpdated", (data) => {
      toast.info(`✏️ ${data.user.username} was updated`);
    });

    socket.on("userDeleted", () => {
      toast.error(`🗑️ A user was deleted`);
    });

    socket.on("assetCreated", (data) => {
      toast.success(`📍 Asset "${data.name}" created`);
    });

    socket.on("assetUpdated", (data) => {
      toast.info(`🔧 Asset "${data.name}" updated`);
    });

    socket.on("assetDeleted", () => {
      toast.error(`❌ Asset deleted`);
    });

    return () => { // Cleanup listeners when component unmounts
      socket.off("userCreated");
      socket.off("userUpdated");
      socket.off("userDeleted");
      socket.off("assetCreated");
      socket.off("assetUpdated");
      socket.off("assetDeleted");
    };
  }, []);
};

export default useWSNotifications;
