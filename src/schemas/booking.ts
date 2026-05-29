import { z } from 'zod'

export function getBookingSchema(t: (key: string) => string) {
  return z.object({
    fullName: z
      .string()
      .min(1, t('fullNameRequired'))
      .min(2, t('fullNameMin')),
    company: z.string().optional(),
    phone: z
      .string()
      .min(1, t('phoneRequired'))
      .regex(/^[\d\s\-\+\(\)]{10,15}$/, t('phoneInvalid')),
    email: z
      .string()
      .min(1, t('emailRequired'))
      .email(t('emailInvalid')),
    serviceType: z.enum(
      ['airport_transfer', 'corporate', 'group', 'private'] as const,
      { message: t('serviceTypeRequired') }
    ),
    pickupAddress: z
      .string()
      .min(1, t('pickupAddressRequired')),
    destinationAddress: z
      .string()
      .min(1, t('destinationRequired')),
    pickupDate: z
      .string()
      .min(1, t('dateRequired')),
    pickupTime: z
      .string()
      .min(1, t('timeRequired')),
    passengersCount: z
      .number({ message: t('passengersRequired') })
      .int()
      .positive(t('passengersMin')),
    meetAndGreet: z.boolean(),
    additionalInfo: z.string().optional(),
    legalConsent: z.literal(true, { message: t('legalConsentRequired') }),
  })
}

export type BookingFormData = z.infer<ReturnType<typeof getBookingSchema>>
