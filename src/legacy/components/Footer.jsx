"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">Abalon</h3>
                <p className="text-xs text-gray-400">Construction Management</p>
              </div>
            </div>
            <p className="text-gray-400">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">{t("footer.customers.title")}</h4>
            <ul className="space-y-2">
              <li><Link className="hover:text-white" href="/customer-request">{t("footer.customers.postRequest")}</Link></li>
              <li><Link className="hover:text-white" href="/how-it-works">{t("footer.customers.howItWorks")}</Link></li>
              <li><Link className="hover:text-white" href="/categories">{t("footer.customers.categories")}</Link></li>
              <li><Link className="hover:text-white" href="/faq">{t("footer.customers.faq")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">{t("footer.contractors.title")}</h4>
            <ul className="space-y-2">
              <li><Link className="hover:text-white" href="/contractor-signup">{t("footer.contractors.join")}</Link></li>
              <li><Link className="hover:text-white" href="/pricing">{t("footer.contractors.pricing")}</Link></li>
              <li><Link className="hover:text-white" href="/contractor-login">{t("footer.contractors.login")}</Link></li>
              <li><Link className="hover:text-white" href="/benefits">{t("footer.contractors.benefits")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">{t("footer.legal.title")}</h4>
            <ul className="space-y-2">
              <li><Link className="hover:text-white" href="/terms">{t("footer.legal.terms")}</Link></li>
              <li><Link className="hover:text-white" href="/privacy">{t("footer.legal.privacy")}</Link></li>
              <li><Link className="hover:text-white" href="/contact">{t("footer.legal.contact")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between">
          <span>© {new Date().getFullYear()} Abalon. All rights reserved.</span>
          <span>{t("footer.madeWith")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
