"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { equipmentCategories } from "../data/categories";

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display mb-6">
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
              <br />
              <span className="text-accent">{t("hero.title3")}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">{t("hero.tagline")}</p>
            <p className="text-lg mb-10 text-blue-100">{t("hero.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/customer-request"
                className="btn bg-secondary hover:bg-orange-600 text-white text-lg px-8 py-4"
              >
                {t("hero.ctaCustomer")}
              </Link>

              <Link
                href="/contractor-signup"
                className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
              >
                {t("hero.ctaContractor")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-display text-center mb-4">{t("howItWorks.title")}</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">{t("howItWorks.subtitle")}</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📸</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t("howItWorks.step1Title")}</h3>
              <p className="text-gray-600">{t("howItWorks.step1Desc")}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t("howItWorks.step2Title")}</h3>
              <p className="text-gray-600">{t("howItWorks.step2Desc")}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t("howItWorks.step3Title")}</h3>
              <p className="text-gray-600">{t("howItWorks.step3Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-light">
        <div className="container-custom">
          <h2 className="text-4xl font-display text-center mb-4">{t("categories.title")}</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">{t("categories.subtitle")}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {equipmentCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="card hover:shadow-xl transition-all hover:-translate-y-1 text-center"
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-lg mb-1">{t(`categories.${category.id}`)}</h3>
                <p className="text-sm text-gray-500">
                  {category.subcategories.length} {t("categories.types")}
                </p>
                {category.popular && (
                  <span className="inline-block mt-2 bg-accent text-xs px-2 py-1 rounded-full font-semibold">
                    {t("categories.popular")}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/categories" className="btn btn-primary">
              {t("categories.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* For Contractors */}
      <section className="py-16 bg-gradient-to-r from-secondary to-orange-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display mb-6">{t("forContractors.title")}</h2>
            <p className="text-xl mb-8 text-orange-100">{t("forContractors.subtitle")}</p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="text-xl font-bold mb-2">{t("forContractors.priceTitle")}</h3>
                <p className="text-orange-100">{t("forContractors.priceDesc")}</p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-bold mb-2">{t("forContractors.verifiedTitle")}</h3>
                <p className="text-orange-100">{t("forContractors.verifiedDesc")}</p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="text-4xl mb-3">📍</div>
                <h3 className="text-xl font-bold mb-2">{t("forContractors.areaTitle")}</h3>
                <p className="text-orange-100">{t("forContractors.areaDesc")}</p>
              </div>
            </div>

            <Link
              href="/contractor-signup"
              className="btn bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-4"
            >
              {t("forContractors.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display text-center mb-12">{t("trust.title")}</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold mb-2">{t("trust.badge1Title")}</h3>
                <p className="text-gray-600">{t("trust.badge1Desc")}</p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-xl font-bold mb-2">{t("trust.badge2Title")}</h3>
                <p className="text-gray-600">{t("trust.badge2Desc")}</p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">{t("trust.badge3Title")}</h3>
                <p className="text-gray-600">{t("trust.badge3Desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display mb-6">{t("cta.title")}</h2>
          <p className="text-xl mb-8 text-blue-100">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/customer-request"
              className="btn bg-secondary hover:bg-orange-600 text-white text-lg px-8 py-4"
            >
              {t("cta.postRequest")}
            </Link>
            <Link
              href="/how-it-works"
              className="btn bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
            >
              {t("cta.learnMore")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
