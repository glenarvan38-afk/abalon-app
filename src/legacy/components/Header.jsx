"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">Abalon</h1>
              <p className="text-xs text-gray-500">Construction Management</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/categories" className="text-gray-700 hover:text-primary font-medium">
              {t("header.categories")}
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-primary font-medium">
              {t("header.howItWorks")}
            </Link>
            <Link href="/for-contractors" className="text-gray-700 hover:text-primary font-medium">
              {t("header.forContractors")}
            </Link>

            <div className="flex items-center space-x-2 border-l pl-4">
              <button
                onClick={() => changeLanguage("en")}
                className={`text-sm ${i18n.language === "en" ? "font-bold text-primary" : "text-gray-600"}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("ru")}
                className={`text-sm ${i18n.language === "ru" ? "font-bold text-primary" : "text-gray-600"}`}
              >
                RU
              </button>
            </div>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/login" className="text-gray-700 hover:text-primary font-medium">
              {t("header.login")}
            </Link>
            <Link href="/customer-request" className="btn btn-primary">
              {t("header.postRequest")}
            </Link>
            <Link href="/contractor-signup" className="btn btn-outline">
              {t("header.joinContractor")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
