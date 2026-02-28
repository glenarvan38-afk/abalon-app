"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { equipmentCategories, serviceRadiusOptions } from '../data/categories';
import ServiceAreaMap from '../components/ServiceAreaMap';

const ContractorSignupPage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [serviceArea, setServiceArea] = useState(null);
  const [estimatedZips, setEstimatedZips] = useState(0);
  const [mapCenter, setMapCenter] = useState(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const selectedRadius = watch('serviceRadius');
  const selectedAddress = watch('businessAddress');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
  
      const session = await response.json();
  
      if (session.url) {
        window.location.href = session.url;
      } else {
        alert('Stripe error');
      }
    } catch (error) {
      console.error(error);
      alert('Payment error');
    }
  };

  // Симуляция расчёта ZIP-кодов
  const calculateZips = (radius) => {
    const base = 15;
    const multiplier = radius / 25;
    setEstimatedZips(Math.floor(base * multiplier));
  };

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`flex-1 h-2 rounded ${s <= step ? 'bg-secondary' : 'bg-gray-200'} ${s > 1 ? 'ml-2' : ''}`} />
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center">Step {step} of 4</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* STEP 1: Business Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-display mb-6">Business Information</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name *</label>
                  <input
                    type="text"
                    {...register('companyName', { required: 'Company name is required' })}
                    placeholder="ABC Construction LLC"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Person *</label>
                    <input
                      type="text"
                      {...register('contactPerson', { required: true })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      {...register('phone', { required: true })}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    placeholder="john@abcconstruction.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <button type="button" onClick={() => setStep(2)} className="btn btn-secondary w-full">
                  Next →
                </button>
              </div>
            )}

            {/* STEP 2: Service Area with Map */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-display mb-6">Service Area</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Business Address *</label>
                  <input
                    type="text"
                    {...register('businessAddress', { required: 'Address is required' })}
                    placeholder="123 Main St, Raleigh, NC 27601"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                  />
                  {errors.businessAddress && <p className="text-red-500 text-sm mt-1">{errors.businessAddress.message}</p>}
                  <p className="text-xs text-gray-500 mt-1">This will be the center of your service area</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Radius *</label>
                  <select
                    {...register('serviceRadius', { required: true })}
                    onChange={(e) => calculateZips(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                  >
                    <option value="">Select radius...</option>
                    {serviceRadiusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <ServiceAreaMap
                  address={selectedAddress}
                  radiusMiles={selectedRadius ? Number(selectedRadius) : 0}
                  onCenterChange={setMapCenter}
                />

                {selectedRadius && (
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg">
                    <p className="text-sm">Coverage: <strong>{selectedRadius} miles radius</strong></p>
                    <p className="text-xs text-gray-600 mt-1">≈ {estimatedZips} ZIP codes</p>
                  </div>
                )}

                {selectedAddress && selectedAddress.trim().length >= 6 && !mapCenter && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Map unavailable — using radius only. You can still continue.
                    </p>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    💡 You'll receive job requests from customers in your selected radius
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button type="button" onClick={() => setStep(1)} className="btn btn-outline flex-1">
                    ← Back
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="btn btn-secondary flex-1">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Equipment & Services */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-display mb-6">Equipment & Services</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-4">Select Equipment Types *</label>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {equipmentCategories.map(category => (
                      <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            value={category.id}
                            {...register('equipmentTypes')}
                            className="w-5 h-5 text-secondary focus:ring-secondary"
                          />
                          <span className="text-2xl">{category.icon}</span>
                          <span className="font-medium">{category.nameEn}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Type *</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" {...register('withOperator')} className="w-5 h-5" />
                      <span>With operator (you provide the operator)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" {...register('withoutOperator')} className="w-5 h-5" />
                      <span>Without operator (rental only)</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button type="button" onClick={() => setStep(2)} className="btn btn-outline flex-1">
                    ← Back
                  </button>
                  <button type="button" onClick={() => setStep(4)} className="btn btn-secondary flex-1">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Payment */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-display mb-6">Complete Registration</h2>
                
                <div className="bg-gradient-to-r from-secondary to-orange-600 text-white rounded-xl p-8 text-center">
                  <h3 className="text-4xl font-display mb-2">$50/Year</h3>
                  <p className="text-orange-100 mb-6">Unlimited job leads in your service area</p>
                  
                  <div className="space-y-3 text-left max-w-md mx-auto">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Unlimited job requests</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Verified badge on profile</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Direct contact with customers</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Email & SMS notifications</span>
                    </div>
                  </div>
                </div>

                {/* Stripe Placeholder */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-5xl mb-4">💳</div>
                  <p className="text-gray-600 font-medium mb-2">Stripe Payment Integration</p>
                  <p className="text-sm text-gray-500">Secure payment processing will be integrated here</p>
                </div>

                <div className="flex space-x-4">
                  <button type="button" onClick={() => setStep(3)} className="btn btn-outline flex-1">
                    ← Back
                  </button>
                  <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white flex-1">
                    💼 Complete Registration ($50)
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContractorSignupPage;
