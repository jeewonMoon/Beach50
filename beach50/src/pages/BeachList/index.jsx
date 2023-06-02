import "./beachList.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";
import Header from "../../components/Header";
import beach from "../../data/beachData.json";
import BeachMap from "../../components/BeachMap";

export default function BeachList() {
   const { area } = useParams();
   const [beachData, setBeachData] = useState([]);
   const [beachAreaData, setBeachAreaData] = useState([]);
   const defaultImg = "https://i.postimg.cc/mZ0cPh9M/default.png";

   useEffect(() => {
      axios
         .get(
            `http://apis.data.go.kr/1192000/service/OceansBeachInfoService1/getOceansBeachInfo1?ServiceKey=${process.env.REACT_APP_DATA_API_KEY}&numOfRows=100&SIDO_NM=${area}&resultType=xml`
         )
         .then((res) => {
            const result = new XMLParser().parseFromString(res.data);
            console.log("성공");
            console.log(result.children[1].children[0].children);

            trimData(result.children[1].children[0].children);
         })
         .catch((err) => {
            console.log("fail: " + err);
         });
   }, []);

   const trimData = (res) => {
      // json 파일 데이터랑 파라미터로 받아온 지역이름이랑 비교해서
      // 지역이 같은 해수욕장의 이름 저장
      const beachName = beach.reduce((arr, cur) => {
         if (cur.area === area) {
            for (let item of cur.beach) {
               arr.push(item.name);
            }
         }
         return arr;
      }, []);

      // api에서 받아온 데이터들의 해수욕장 이름이
      // beachname의 각 데이터 이름에 포함되어있으면 저장
      const finalBeachData = res.reduce((arr, cur) => {
         for (let item of beachName) {
            if (item.includes(cur.children[3].value)) {
               arr.push(cur.children);
            }
         }
         return arr;
      }, []);
      setBeachData(finalBeachData);

      //각 해수욕장의 위도,경도 데이터만 추출
      const beachArea = finalBeachData.reduce((arr, cur) => {
         const areaObj = {
            id: cur[0].value,
            title: cur[3].value,
            lat: cur[11].value,
            lng: cur[12].value,
         };
         arr.push(areaObj);
         return arr;
      }, []);
      console.log(beachArea);
      setBeachAreaData(beachArea);
   };
   // console.log(beachData);

   return (
      <>
         <Header title={area} />
         <main>
            <div className="beachListContainer">
               {beachData.length > 0 && (
                  <div className="beachList">
                     {beachData.map((item) => {
                        return (
                           <div
                              className="beachItem"
                              key={item[0].value}
                           >
                              <div className="beachImg">
                                 <img
                                    src={
                                       item[9].value
                                          ? item[9].value
                                          : defaultImg
                                    }
                                    alt={item[3].value}
                                 />
                              </div>
                              <div>
                                 <Link
                                    to={`/${area}/${item[3].value}`}
                                    className="beachItemTitle"
                                 >
                                    {item[3].value} 해수욕장
                                 </Link>
                                 <p>{item[10].value}</p>
                                 <a
                                    href={item[7].value}
                                    className="beachLink"
                                 >
                                    {item[3].value}해변 관련 사이트 바로가기
                                 </a>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               )}
               <BeachMap
                  data={beachAreaData}
                  level={11}
               />
            </div>
         </main>
      </>
   );
}
