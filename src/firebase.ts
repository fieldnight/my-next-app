// firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDctXFlNXORdpvCLh0bqkcxxiaLwnbIFSU",
  authDomain: "twinkle-4d750.firebaseapp.com",
  projectId: "twinkle-4d750",
  storageBucket: "twinkle-4d750.appspot.com", // ← 오타 수정됨 (원래는 `.app`, 올바른 것은 `.app**spot.com**`)
  messagingSenderId: "837237522516",
  appId: "1:837237522516:web:a31299a457aee825e86dc1",
  measurementId: "G-54WCXT3XSQ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
