import { memo } from "react";
import { Link } from "react-router-dom";

export const Logo = memo(() => {
  return (
    <Link to="/" style={{ marginTop: 8 }}>
      <img src="/logo-holoplay-white.png" width={40} alt="Logo HoloPlay" />
    </Link>
  );
});
