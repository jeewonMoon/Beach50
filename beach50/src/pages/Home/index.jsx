import "./home.css";
import { useEffect } from "react";
import Header from "../../components/Header";

const { kakao } = window;

export default function Home() {
   const areaArr = [
      {
         title: "강원",
         latlng: new kakao.maps.LatLng(37.7, 128.2),
      },
      {
         title: "부산",
         latlng: new kakao.maps.LatLng(35.2, 129.1),
      },
      {
         title: "경남",
         latlng: new kakao.maps.LatLng(35.8, 128.3),
      },
      {
         title: "충남",
         latlng: new kakao.maps.LatLng(36.350793, 127.6),
      },
      {
         title: "전북",
         latlng: new kakao.maps.LatLng(35.8, 127),
      },
      {
         title: "전남",
         latlng: new kakao.maps.LatLng(34.860337, 126.824799),
      },
      {
         title: "제주",
         latlng: new kakao.maps.LatLng(33.431441, 126.5),
      },
   ];

   useEffect(() => {
      const container = document.getElementsByClassName("map")[0]; //지도를 담을 영역의 DOM 레퍼런스

      const options = {
         //지도를 생성할 때 필요한 기본 옵션
         center: new kakao.maps.LatLng(36, 127.5), //지도의 중심좌표.
         level: 13, //지도의 레벨(확대, 축소 정도)
         draggable: false, //마우스 드래그, 휠, 모바일 터치를 이용한 시점 변경(이동, 확대, 축소) 가능 여부
      };
      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      // 마커 이미지
      const imgSrc = "https://i.postimg.cc/3w7Q84wz/marker.png";

      for (let i = 0; i < areaArr.length; i++) {
         const imgSize = new kakao.maps.Size(48, 55);
         const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);
         const marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: areaArr[i].latlng, // 마커를 표시할 위치
            title: areaArr[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImg,
         });

         const content = `<a href="/${areaArr[i].title}" class="overlayContent">
            ${areaArr[i].title}
         <span>
         <svg width="13px" height="13px" viewBox="0 0 18 18">
         <path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"/>
         </svg>
         </span>
         </a>`;

         const customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: areaArr[i].latlng,
            content: content,
            yAnchor: 1,
         });
      }
   }, []);

   return (
      <>
         <Header title="해변" />
         <div className="mapContainer">
            <div className="map"></div>
         </div>
      </>
   );
}
