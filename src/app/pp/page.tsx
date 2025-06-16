// "use client";
// import { useEffect, useState } from "react";
// import { ref, getDownloadURL } from "firebase/storage";
// import { storage } from "@/firebase"; // 경로는 firebase.ts/js 파일 위치에 맞게 조정
// import Image from "next/image";

// function App() {
//   const [imageURL, setImageURL] = useState("");

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const imageRef = ref(storage, "path/to/your/image.jpg"); // 실제 경로로 수정
//         const url = await getDownloadURL(imageRef);
//         setImageURL(url);
//       } catch (error) {
//         console.error("Firebase 스토리지에서 이미지 가져오기 오류:", error);
//       }
//     };

//     fetchImage();
//   }, []);

//   return (
//     <div>
  
//       <Image
//         src="https://storage.googleapis.com/twinkle-4d750.firebasestorage.app/fct_sgg_s_archive_2025040102_12hr.png"
//         alt={""}
//         width={600}
//         height={400}
//         priority
//       />
//     </div>
//   );
// }

// export default App;
