import { useParams } from "react-router-dom";
import Header from "../../components/Header";

export default function BeachList() {
   const { area } = useParams();
   console.log(area);
   return (
      <>
         <Header title={area} />
         <div>
            <div className="beachList"></div>
         </div>
      </>
   );
}
