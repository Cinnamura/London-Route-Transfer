'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { getBookingSchema, type BookingFormData } from '@/schemas/booking'

const serviceTypes = [
  { value: 'airport_transfer', key: 'serviceAirport' },
  { value: 'corporate', key: 'serviceCorporate' },
  { value: 'group', key: 'serviceGroup' },
  { value: 'private', key: 'servicePrivate' },
] as const

export default function BookingFormPage() {
  const t = useTranslations('Form')
  const tErr = useTranslations('FormErrors')
  const [formState, setFormState] = useState<'form' | 'submitting' | 'success'>('form')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(getBookingSchema((key) => tErr(key as any))),
    defaultValues: {
      company: '',
      additionalInfo: '',
      meetAndGreet: false,
      legalConsent: false as unknown as true,
    },
  })

  function onSubmit(_data: BookingFormData) {
    setFormState('submitting')
    setTimeout(() => {
      setFormState('success')
    }, 1800)
  }

  if (formState === 'success') {
    return (
      <section className="bg-gradient-to-b from-sky-100 via-sky-50 to-white min-h-[calc(100dvh-4rem)]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 animate-fade-in">
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-8 md:p-12 text-center shadow-sm">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tight mb-4">
              {t('successTitle')}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('successMessage')}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-b from-sky-100 via-sky-50 to-white min-h-[calc(100dvh-4rem)]">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {t('description')}
          </p>
        </div>

        <div className={
          formState === 'submitting' ? 'animate-fade-out' : 'animate-fade-in'
        }>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 md:p-10 shadow-sm space-y-8"
            noValidate
          >
            {/* Contact Information */}
            <fieldset>
              <legend className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-5">
                {t('contactSection')}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('fullName')} *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder={t('fullNamePlaceholder')}
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('company')}
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder={t('companyPlaceholder')}
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('company')}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('phone')} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder={t('phonePlaceholder')}
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('email')} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </fieldset>

            {/* Trip Details */}
            <fieldset>
              <legend className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-5">
                {t('tripSection')}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('serviceType')} *
                  </label>
                  <select
                    id="serviceType"
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('serviceType')}
                  >
                    <option value="">—</option>
                    {serviceTypes.map((st) => (
                      <option key={st.value} value={st.value}>
                        {t(st.key)}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.serviceType.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pickupAddress" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('pickupAddress')} *
                  </label>
                  <input
                    id="pickupAddress"
                    type="text"
                    placeholder={t('pickupAddressPlaceholder')}
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('pickupAddress')}
                  />
                  {errors.pickupAddress && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.pickupAddress.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="destinationAddress" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('destinationAddress')} *
                  </label>
                  <input
                    id="destinationAddress"
                    type="text"
                    placeholder={t('destinationPlaceholder')}
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('destinationAddress')}
                  />
                  {errors.destinationAddress && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.destinationAddress.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pickupDate" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('pickupDate')} *
                  </label>
                  <input
                    id="pickupDate"
                    type="date"
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('pickupDate')}
                  />
                  {errors.pickupDate && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.pickupDate.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pickupTime" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('pickupTime')} *
                  </label>
                  <input
                    id="pickupTime"
                    type="time"
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('pickupTime')}
                  />
                  {errors.pickupTime && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.pickupTime.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="passengersCount" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('passengersCount')} *
                  </label>
                  <input
                    id="passengersCount"
                    type="number"
                    min={1}
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50"
                    {...register('passengersCount', { valueAsNumber: true })}
                  />
                  {errors.passengersCount && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.passengersCount.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      disabled={formState === 'submitting'}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 transition-all disabled:opacity-50"
                      {...register('meetAndGreet')}
                    />
                    <span className="text-sm text-slate-700">
                      {t('meetAndGreet')}
                    </span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t('additionalInfo')}
                  </label>
                  <textarea
                    id="additionalInfo"
                    rows={3}
                    placeholder={t('additionalInfoPlaceholder')}
                    disabled={formState === 'submitting'}
                    className="w-full rounded-xl bg-slate-50 border-transparent py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all disabled:opacity-50 resize-none"
                    {...register('additionalInfo')}
                  />
                </div>
              </div>
            </fieldset>

            {/* Legal consent */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={formState === 'submitting'}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 transition-all disabled:opacity-50"
                  {...register('legalConsent')}
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  {t('legalConsent')}
                </span>
              </label>
              {errors.legalConsent && (
                <p className="text-xs text-rose-500">{errors.legalConsent.message}</p>
              )}

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full rounded-xl bg-emerald-500 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-600 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {formState === 'submitting' ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {t('submitting')}
                  </>
                ) : (
                  t('submit')
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs text-slate-400 leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </section>
  )
}
