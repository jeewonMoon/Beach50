import { Link } from "react-router-dom";

export default function Header() {
   return (
      <div className="header">
         <h2>해변..더보기</h2>
         <Link to="/">BEACH50</Link>
      </div>
   );
}
