import "./beachMap.css";
import { useEffect } from "react";
const { kakao } = window;

export default function BeachMap({ data, level }) {
   console.log(data);

   useEffect(() => {
      const container = document.getElementsByClassName("beachMap")[0];

      const options = {
         center: new kakao.maps.LatLng(data[0]?.lat, data[0]?.lng),
         level: level,
      };
      const map = new kakao.maps.Map(container, options);

      const imgSrc = "https://i.postimg.cc/3w7Q84wz/marker.png";

      for (let i = 0; i < data.length; i++) {
         const imgSize = new kakao.maps.Size(55, 62);
         const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);

         const marker = new kakao.maps.Marker({
            map: map,
            title: data[i].title,
            position: new kakao.maps.LatLng(data[i].lat, data[i].lng), // 마커를 표시할 위치
            image: markerImg,
         });
      }
   }, [data]);

   return (
      <div className="beachMapContainer">
         <div className="beachMap"></div>
      </div>
   );
}
