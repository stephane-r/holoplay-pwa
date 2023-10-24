import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import classes from "./LinkSeeAll.module.css";

interface LinkSeeAllProps {
  to: "/trending" | "/most-popular";
}

export const LinkSeeAll: FC<LinkSeeAllProps> = memo(({ to }) => {
  const { t } = useTranslation();

  return (
    <Link to={to} className={classes.link}>
      {t("button.see-all")}
    </Link>
  );
});
