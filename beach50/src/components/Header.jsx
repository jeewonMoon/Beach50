import { Link } from "react-router-dom";

export default function Header({ title }) {
   return (
      <div className="header">
         <h2>{title}..더보기</h2>
         <Link to="/">BEACH50</Link>
      </div>
   );
}
