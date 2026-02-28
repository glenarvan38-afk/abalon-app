"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { workTypes, serviceRadiusOptions } from '../data/categories';

const CustomerRequestPage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [estimatedMatches, setEstimatedMatches] = useState(null);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const selectedWorkType = watch('workType');
  const selectedZip = watch('zipCode');
  const selectedRadius = watch('radius');

  // Dropzone для загрузки файлов
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'video/*': ['.mp4', '.mov']
    },
    maxFiles: 5,
    maxSize: 50 * 1024 * 1024, // 50MB
    onDrop: acceptedFiles => {
      setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    }
  });

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
  try {
    const payload = {
      workType: data.workType,
      zipCode: data.zipCode,
      radius: Number(data.radius),
      description: data.description,
      name: data.name,
      email: data.email,
      phone: data.phone,
    };

    const resp = await fetch('/api/jobs/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await resp.json();
    if (!resp.ok) {
      alert(result?.error || 'Failed to submit request');
      return;
    }

    alert(t('Form submitted successfully!'));
    setEstimatedMatches(null);
    setStep(1);
  } catch (e) {
    console.error(e);
    alert('Failed to submit request');
  }
};


  // Имитация поиска совпадений
  const simulateMatches = () => {
    if (selectedZip && selectedRadius) {
      const baseMatches = Math.floor(Math.random() * 20) + 5;
      const radiusMultiplier = selectedRadius / 50;
      setEstimatedMatches(Math.floor(baseMatches * radiusMultiplier));
    }
  };

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container-custom max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`flex-1 h-2 rounded ${s <= step ? 'bg-primary' : 'bg-gray-200'} ${s > 1 ? 'ml-2' : ''}`} />
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center">
              Step {step} of 4
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* STEP 1: Work Type */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-display mb-6">What work do you need done?</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {workTypes.map(type => (
                    <label
                      key={type.id}
                      className={`card cursor-pointer transition-all hover:shadow-lg ${
                        selectedWorkType === type.id ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        value={type.id}
                        {...register('workType', { required: true })}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedWorkType === type.id ? 'border-primary' : 'border-gray-300'
                        }`}>
                          {selectedWorkType === type.id && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                        <span className="font-medium">{type.nameEn}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {errors.workType && (
                  <p className="text-red-500 text-sm">Please select a work type</p>
                )}

                <button
                  type="button"
                  onClick={() => selectedWorkType && setStep(2)}
                  className="btn btn-primary w-full"
                  disabled={!selectedWorkType}
                >
                  Next →
                </button>
              </div>
            )}

            {/* STEP 2: Location */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-display mb-6">Where is the job located?</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    placeholder="e.g., 27601"
                    {...register('zipCode', { 
                      required: 'ZIP code is required',
                      pattern: {
                        value: /^\d{5}$/,
                        message: 'Please enter a valid 5-digit ZIP code'
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    maxLength={5}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Search Radius *</label>
                  <select
                    {...register('radius', { required: true })}
                    onChange={simulateMatches}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select radius...</option>
                    {serviceRadiusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} {option.description && `- ${option.description}`}
                      </option>
                    ))}
                  </select>
                  {errors.radius && (
                    <p className="text-red-500 text-sm mt-1">Please select a radius</p>
                  )}
                </div>

                {estimatedMatches !== null && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">
                      ✅ <strong>{estimatedMatches} contractors</strong> available in your area
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-outline flex-1"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => selectedZip && selectedRadius && setStep(3)}
                    className="btn btn-primary flex-1"
                    disabled={!selectedZip || !selectedRadius}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Photos & Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-display mb-6">Add photos and describe your project</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Photos/Videos (Optional)</label>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
                  >
                    <input {...getInputProps()} />
                    <div className="text-5xl mb-2">📸</div>
                    <p className="text-gray-600 mb-1">Drag & drop files here, or click to select</p>
                    <p className="text-sm text-gray-500">Up to 5 files (images or videos, max 50MB each)</p>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          {file.type.startsWith('image/') ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-4xl">🎥</div>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Project Description *</label>
                  <textarea
                    {...register('description', { 
                      required: 'Please describe your project',
                      minLength: {
                        value: 20,
                        message: 'Please provide at least 20 characters'
                      }
                    })}
                    rows={5}
                    placeholder="Describe what you need done, any specific requirements, timeline, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn btn-outline flex-1"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="btn btn-primary flex-1"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Contact Info */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-display mb-6">Your contact information</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone is required',
                      pattern: {
                        value: /^[0-9-() ]+$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email'
                      }
                    })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    📧 Contractors will contact you directly at this email and phone number.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn btn-outline flex-1"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-secondary flex-1"
                  >
                    🚜 Submit Request (Free)
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

export default CustomerRequestPage;
