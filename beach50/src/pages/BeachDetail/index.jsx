import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";
import Header from "../../components/Header";
import BeachMap from "../../components/BeachMap";
import "./beachDetail.css";

export default function BeachDetail() {
   const { area, name } = useParams();
   const [detail, setDetail] = useState([]);
   const [areaData, setAreaData] = useState([]);

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
      const findRes = res.reduce((arr, cur) => {
         if (cur.children[3].value === name) {
            arr.push(cur.children);
         }
         return arr;
      }, []);
      setDetail(findRes[0]);

      // 카카오 맵에 넘길 위도, 경도 데이터 추출
      const areaTmp = {
         id: findRes[0][0].value,
         title: findRes[0][3].value,
         lat: findRes[0][11].value,
         lng: findRes[0][12].value,
      };
      setAreaData([areaTmp]);
   };

   return (
      <>
         <Header title={name} />
         <main>
            {detail.length > 0 && (
               <div className="beachDetailContainer">
                  <div className="beachDetail">
                     <div className="beachHeader">
                        <h1 className="beachTitle">
                           {detail[3].value}해수욕장
                        </h1>
                        <h5 className="beachLocation">
                           {detail[1].value} {detail[2].value}
                        </h5>
                        {detail[6].value && (
                           <h5 className="beachKind">{detail[6].value}해변</h5>
                        )}
                     </div>
                     <div className="beachContentList">
                        <h5 className="beachContent">
                           <span>비상연락처</span>
                           <span>{detail[10].value}</span>
                        </h5>
                        <h5 className="beachContent">
                           <span>관련사이트</span>
                           <span>
                              <a href={detail[7].value}>{detail[8].value}</a>
                           </span>
                        </h5>
                        <h5 className="beachContent">
                           <span>해변 폭</span>
                           <span>{detail[4].value}</span>
                        </h5>
                        <h5 className="beachContent">
                           <span>해변 총 연장</span>
                           <span>{detail[5].value}</span>
                        </h5>
                     </div>
                  </div>
                  <BeachMap
                     data={areaData}
                     level={3}
                  />
               </div>
            )}
         </main>
      </>
   );
}
