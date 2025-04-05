import { io } from "socket.io-client";

// Create and export a single instance of the socket connection
export const socket = io(
  "http://localhost:5000",
  {
    withCredentials: true,
  }
);

// export const socket = io(
//   import.meta.env.VITE_SOCKET_URL || "http://localhost:5000",
//   {
//     withCredentials: true,
//   }
// );
