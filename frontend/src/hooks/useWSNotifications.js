import { useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "../socket"; 

const useWSNotifications = () => {
  useEffect(() => {
    socket.on("userCreated", (data) => {
      toast.success(`🧑‍💻 ${data.user.username} fue creado con exito!`);
    });

    socket.on("userUpdated", (data) => {
      toast.info(`✏️ Usuario: ${data.user.username} fue modificado con exito!`);
    });

    socket.on("userDeleted", () => {
      toast.error(`🗑️ El usuario fue elimnado con exito!`);
    });

    socket.on("assetCreated", (data) => {
      toast.success(`📍 El activo: "${data.name}" fue creado con exito!`);
    });

    socket.on("assetUpdated", (data) => {
      toast.info(`🔧 El acitvo: "${data.name}" fue modificado con exito!`);
    });

    socket.on("assetDeleted", () => {
      toast.error(`🗑️ El activo fue eliminado con exito!`);
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
