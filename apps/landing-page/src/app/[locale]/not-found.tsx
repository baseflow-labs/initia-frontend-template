import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="container py-5 text-center">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">{t("title")}</h2>
      <p className="lead mb-4">{t("description")}</p>
      <Link href="/" className="btn btn-primary">
        {t("goHome")}
      </Link>
    </div>
  );
}
