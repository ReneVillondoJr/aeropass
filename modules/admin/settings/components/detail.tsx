'use client';

import {
  BellRing,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  Database,
  Info,
  RotateCcw,
  Save,
  Settings2,
  ShieldCheck,
  Plane,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { PAYMENT_METHOD_LABELS, SETTINGS_SECTIONS } from '../data/settings';

import { PAYMENT_METHODS } from '../types/settings';

import type {
  PaymentMethod,
  SettingsSaveState,
  SettingsSectionKey,
  SettingsValues,
  UpdateSetting,
} from '../types/settings';

import { SETTING_CONTROL_CLASS, SettingField, SettingToggle } from './field';

interface SettingsDetailProps {
  activeSection: SettingsSectionKey;
  values: SettingsValues;
  updateField: UpdateSetting;
  updatePaymentMethod: (method: PaymentMethod, enabled: boolean) => void;
  onSave: () => void;
  onReset: () => void;
  saveState: SettingsSaveState;
  validationMessage: string | null;
  hasChanges: boolean;
}

function SectionHeading({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof Settings2;
}) {
  return (
    <div className='mb-4 flex items-center gap-2'>
      <Icon className='size-4 text-muted-foreground' />

      <div>
        <h3 className='text-sm font-semibold'>{title}</h3>

        <p className='mt-1 text-[10px] leading-5 text-muted-foreground'>
          {description}
        </p>
      </div>
    </div>
  );
}

export function SettingsDetail({
  activeSection,
  values,
  updateField,
  updatePaymentMethod,
  onSave,
  onReset,
  saveState,
  validationMessage,
  hasChanges,
}: SettingsDetailProps) {
  const section = SETTINGS_SECTIONS.find((item) => item.key === activeSection);

  if (!section) {
    return null;
  }

  const SectionIcon = section.icon;

  return (
    <section className='flex max-h-164 flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
      {/* Fixed settings summary */}
      <div className='shrink-0 border-b border-border/70 bg-muted/20 px-5 py-5 sm:px-6'>
        <div className='flex items-start gap-4'>
          <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#102A43]'>
            <SectionIcon className='size-6' />
          </div>

          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-center gap-2'>
              <h2 className='text-lg font-semibold tracking-tight'>
                {section.title}
              </h2>

              <Badge
                variant='outline'
                className='border-border/60 bg-background/80 text-[10px]'
              >
                Settings
              </Badge>
            </div>

            <p className='mt-2 text-xs leading-5 text-muted-foreground'>
              {section.description}
            </p>
          </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-3'>
          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <Settings2 className='size-3.5' />
              Section
            </div>

            <p className='mt-2 text-sm font-semibold'>{section.title}</p>
          </div>

          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <Database className='size-3.5' />
              Storage
            </div>

            <p className='mt-2 text-sm font-semibold'>Session only</p>
          </div>
        </div>
      </div>

      {/* Scrollable settings configuration */}
      <div className='min-h-0 overflow-y-auto overscroll-contain scrollbar-subtle'>
        <div className='grid gap-7 px-5 py-6 sm:px-6'>
          {/* General settings */}
          {activeSection === 'general' ?
            <section>
              <SectionHeading
                title='Platform defaults'
                description='Manage the demo platform name, contact, and regional formats.'
                icon={Settings2}
              />

              <div className='rounded-2xl border border-border/60 bg-muted/15 p-4 sm:p-5'>
                <div className='grid gap-5'>
                  <SettingField
                    label='Platform name'
                    htmlFor='platformName'
                    description='Displayed name for the local AeroPass demo.'
                  >
                    <input
                      id='platformName'
                      type='text'
                      maxLength={80}
                      value={values.general.platformName}
                      onChange={(event) =>
                        updateField(
                          'general',
                          'platformName',
                          event.target.value,
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    />
                  </SettingField>

                  <SettingField
                    label='Support email'
                    htmlFor='supportEmail'
                    description='Contact address shown in the configuration.'
                  >
                    <input
                      id='supportEmail'
                      type='email'
                      autoComplete='email'
                      value={values.general.supportEmail}
                      onChange={(event) =>
                        updateField(
                          'general',
                          'supportEmail',
                          event.target.value,
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    />
                  </SettingField>

                  <SettingField
                    label='Time zone'
                    htmlFor='timeZone'
                    description='Default time zone for demo operations.'
                  >
                    <select
                      id='timeZone'
                      value={values.general.timeZone}
                      onChange={(event) =>
                        updateField(
                          'general',
                          'timeZone',
                          event.target.value as 'Asia/Manila' | 'UTC',
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    >
                      <option value='Asia/Manila'>Asia/Manila (UTC+8)</option>
                      <option value='UTC'>UTC</option>
                    </select>
                  </SettingField>

                  <SettingField
                    label='Currency'
                    htmlFor='generalCurrency'
                    description='The AeroPass mock system uses Philippine pesos.'
                  >
                    <select
                      id='generalCurrency'
                      value={values.general.currency}
                      disabled
                      className={SETTING_CONTROL_CLASS}
                    >
                      <option value='PHP'>PHP — Philippine Peso</option>
                    </select>
                  </SettingField>

                  <SettingField
                    label='Date format'
                    htmlFor='dateFormat'
                    description='Preferred display format for demo dates.'
                  >
                    <select
                      id='dateFormat'
                      value={values.general.dateFormat}
                      onChange={(event) =>
                        updateField(
                          'general',
                          'dateFormat',
                          event.target.value as 'DD MMM YYYY' | 'MMM D, YYYY',
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    >
                      <option value='DD MMM YYYY'>DD MMM YYYY</option>
                      <option value='MMM D, YYYY'>MMM D, YYYY</option>
                    </select>
                  </SettingField>
                </div>
              </div>
            </section>
          : null}

          {/* Flight operations */}
          {activeSection === 'flightOperations' ?
            <section>
              <SectionHeading
                title='Operational defaults'
                description='Configure illustrative check-in, boarding, and seating preferences.'
                icon={Plane}
              />

              <div className='rounded-2xl border border-border/60 bg-muted/15 p-4 sm:p-5'>
                <div className='grid gap-5'>
                  <SettingField
                    label='Check-in opening time'
                    htmlFor='checkInHours'
                    description='Hours before scheduled departure.'
                  >
                    <input
                      id='checkInHours'
                      type='number'
                      min={1}
                      max={72}
                      step={1}
                      value={
                        values.flightOperations.checkInOpenHoursBeforeDeparture
                      }
                      onChange={(event) =>
                        updateField(
                          'flightOperations',
                          'checkInOpenHoursBeforeDeparture',
                          event.target.valueAsNumber,
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    />
                  </SettingField>

                  <SettingField
                    label='Boarding start'
                    htmlFor='boardingMinutes'
                    description='Minutes before scheduled departure.'
                  >
                    <input
                      id='boardingMinutes'
                      type='number'
                      min={10}
                      max={180}
                      step={5}
                      value={
                        values.flightOperations
                          .boardingStartsMinutesBeforeDeparture
                      }
                      onChange={(event) =>
                        updateField(
                          'flightOperations',
                          'boardingStartsMinutesBeforeDeparture',
                          event.target.valueAsNumber,
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    />
                  </SettingField>

                  <div className='grid gap-3 border-t border-border/60 pt-5'>
                    <SettingToggle
                      title='Allow seat selection'
                      description='Represent seat-selection availability in the demo settings.'
                      checked={values.flightOperations.allowSeatSelection}
                      onCheckedChange={(checked) =>
                        updateField(
                          'flightOperations',
                          'allowSeatSelection',
                          checked,
                        )
                      }
                    />

                    <SettingToggle
                      title='Automatic seat assignment'
                      description='Represent automatic seat assignment as an operational preference.'
                      checked={values.flightOperations.automaticSeatAssignment}
                      onCheckedChange={(checked) =>
                        updateField(
                          'flightOperations',
                          'automaticSeatAssignment',
                          checked,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
          : null}

          {/* Booking rules */}
          {activeSection === 'booking' ?
            <section>
              <SectionHeading
                title='Reservation rules'
                description='Manage illustrative booking references and reservation preferences.'
                icon={CalendarClock}
              />

              <div className='rounded-2xl border border-border/60 bg-muted/15 p-4 sm:p-5'>
                <div className='grid gap-5'>
                  <SettingField
                    label='Booking reference prefix'
                    htmlFor='bookingPrefix'
                    description='Use 2–6 uppercase letters or numbers.'
                  >
                    <input
                      id='bookingPrefix'
                      type='text'
                      minLength={2}
                      maxLength={6}
                      value={values.booking.referencePrefix}
                      onChange={(event) =>
                        updateField(
                          'booking',
                          'referencePrefix',
                          event.target.value.toUpperCase(),
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    />
                  </SettingField>

                  <SettingField
                    label='Payment hold duration'
                    htmlFor='paymentHold'
                    description='Minutes reserved in the demo booking flow.'
                  >
                    <input
                      id='paymentHold'
                      type='number'
                      min={5}
                      max={120}
                      step={5}
                      value={values.booking.paymentHoldMinutes}
                      onChange={(event) =>
                        updateField(
                          'booking',
                          'paymentHoldMinutes',
                          event.target.valueAsNumber,
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    />
                  </SettingField>

                  <div className='grid gap-3 border-t border-border/60 pt-5'>
                    <SettingToggle
                      title='Allow guest checkout'
                      description='Represent checkout without a registered account.'
                      checked={values.booking.allowGuestCheckout}
                      onCheckedChange={(checked) =>
                        updateField('booking', 'allowGuestCheckout', checked)
                      }
                    />

                    <SettingToggle
                      title='Allow cancellation requests'
                      description='Represent whether cancellation requests are accepted in the demo flow.'
                      checked={values.booking.allowCancellationRequests}
                      onCheckedChange={(checked) =>
                        updateField(
                          'booking',
                          'allowCancellationRequests',
                          checked,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
          : null}

          {/* Notification preferences */}
          {activeSection === 'notifications' ?
            <section>
              <SectionHeading
                title='Notification preferences'
                description='Review local demo delivery channels and notification categories.'
                icon={BellRing}
              />

              <div className='rounded-2xl border border-border/60 bg-muted/15 p-4 sm:p-5'>
                <div className='grid gap-3'>
                  <SettingToggle
                    title='In-app notifications'
                    description='Represent notifications displayed within the application.'
                    checked={values.notifications.inAppEnabled}
                    onCheckedChange={(checked) =>
                      updateField('notifications', 'inAppEnabled', checked)
                    }
                  />

                  <SettingToggle
                    title='Email notifications'
                    description='Represent the preference for email-based notifications. No emails are sent.'
                    checked={values.notifications.emailEnabled}
                    onCheckedChange={(checked) =>
                      updateField('notifications', 'emailEnabled', checked)
                    }
                  />

                  <div className='my-2 border-t border-border/60' />

                  <SettingToggle
                    title='Booking updates'
                    description='Booking creation and reservation status events.'
                    checked={values.notifications.bookingUpdates}
                    onCheckedChange={(checked) =>
                      updateField('notifications', 'bookingUpdates', checked)
                    }
                  />

                  <SettingToggle
                    title='Payment updates'
                    description='Payment status and refund-related notifications.'
                    checked={values.notifications.paymentUpdates}
                    onCheckedChange={(checked) =>
                      updateField('notifications', 'paymentUpdates', checked)
                    }
                  />

                  <SettingToggle
                    title='Flight updates'
                    description='Flight status and schedule-related alerts.'
                    checked={values.notifications.flightUpdates}
                    onCheckedChange={(checked) =>
                      updateField('notifications', 'flightUpdates', checked)
                    }
                  />

                  <SettingToggle
                    title='Check-in reminders'
                    description='Represent passenger check-in reminders.'
                    checked={values.notifications.checkInReminders}
                    onCheckedChange={(checked) =>
                      updateField('notifications', 'checkInReminders', checked)
                    }
                  />

                  <SettingToggle
                    title='Security alerts'
                    description='Represent security-related account notifications.'
                    checked={values.notifications.securityAlerts}
                    onCheckedChange={(checked) =>
                      updateField('notifications', 'securityAlerts', checked)
                    }
                  />
                </div>
              </div>
            </section>
          : null}

          {/* Security preferences */}
          {activeSection === 'security' ?
            <section>
              <SectionHeading
                title='Security preferences'
                description='Configure demonstration defaults for sessions and account security.'
                icon={ShieldCheck}
              />

              <div className='rounded-2xl border border-border/60 bg-muted/15 p-4 sm:p-5'>
                <div className='grid gap-5'>
                  <SettingField
                    label='Session timeout'
                    htmlFor='sessionTimeout'
                    description='Minutes before a demo session is considered expired.'
                  >
                    <input
                      id='sessionTimeout'
                      type='number'
                      min={5}
                      max={480}
                      step={5}
                      value={values.security.sessionTimeoutMinutes}
                      onChange={(event) =>
                        updateField(
                          'security',
                          'sessionTimeoutMinutes',
                          event.target.valueAsNumber,
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    />
                  </SettingField>

                  <SettingField
                    label='Failed login attempts'
                    htmlFor='failedAttempts'
                    description='Illustrative threshold before a security response.'
                  >
                    <input
                      id='failedAttempts'
                      type='number'
                      min={3}
                      max={10}
                      step={1}
                      value={values.security.maxFailedLoginAttempts}
                      onChange={(event) =>
                        updateField(
                          'security',
                          'maxFailedLoginAttempts',
                          event.target.valueAsNumber,
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    />
                  </SettingField>

                  <SettingField
                    label='Minimum password length'
                    htmlFor='passwordLength'
                    description='Number of characters in the demo policy.'
                  >
                    <input
                      id='passwordLength'
                      type='number'
                      min={8}
                      max={64}
                      step={1}
                      value={values.security.minimumPasswordLength}
                      onChange={(event) =>
                        updateField(
                          'security',
                          'minimumPasswordLength',
                          event.target.valueAsNumber,
                        )
                      }
                      className={SETTING_CONTROL_CLASS}
                    />
                  </SettingField>

                  <div className='grid gap-3 border-t border-border/60 pt-5'>
                    <SettingToggle
                      title='Require strong passwords'
                      description='Represent a stronger password policy for the demo.'
                      checked={values.security.requireStrongPasswords}
                      onCheckedChange={(checked) =>
                        updateField(
                          'security',
                          'requireStrongPasswords',
                          checked,
                        )
                      }
                    />

                    <SettingToggle
                      title='Require administrator two-factor authentication'
                      description='A preference only; this does not enforce two-factor authentication.'
                      checked={values.security.requireAdminTwoFactor}
                      onCheckedChange={(checked) =>
                        updateField(
                          'security',
                          'requireAdminTwoFactor',
                          checked,
                        )
                      }
                    />

                    <SettingToggle
                      title='Alert on new administrator login'
                      description='Represent notification preferences for administrator sign-ins.'
                      checked={values.security.alertOnNewAdminLogin}
                      onCheckedChange={(checked) =>
                        updateField('security', 'alertOnNewAdminLogin', checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
          : null}

          {/* Payment methods */}
          {activeSection === 'payments' ?
            <section>
              <SectionHeading
                title='Payment configuration'
                description='Review supported mock methods without connecting an external payment provider.'
                icon={CreditCard}
              />

              <div className='rounded-2xl border border-border/60 bg-muted/15 p-4 sm:p-5'>
                <div className='grid gap-5'>
                  <SettingField
                    label='Processing mode'
                    htmlFor='paymentMode'
                    description='The application currently uses local mock payment flows.'
                  >
                    <select
                      id='paymentMode'
                      value={values.payments.mode}
                      disabled
                      className={SETTING_CONTROL_CLASS}
                    >
                      <option value='LOCAL_MOCK'>Local mock only</option>
                    </select>
                  </SettingField>

                  <SettingField
                    label='Currency'
                    htmlFor='paymentCurrency'
                    description='The canonical mock system uses PHP.'
                  >
                    <select
                      id='paymentCurrency'
                      value={values.payments.currency}
                      disabled
                      className={SETTING_CONTROL_CLASS}
                    >
                      <option value='PHP'>PHP — Philippine Peso</option>
                    </select>
                  </SettingField>

                  <div className='border-t border-border/60 pt-5'>
                    <h4 className='text-xs font-semibold'>
                      Supported mock methods
                    </h4>

                    <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                      Toggle the methods shown in this local form. These
                      switches do not enable or disable real payment processing.
                    </p>
                  </div>

                  <div className='grid gap-3'>
                    {PAYMENT_METHODS.map((method) => (
                      <SettingToggle
                        key={method}
                        title={PAYMENT_METHOD_LABELS[method]}
                        description={`Local demo preference for ${PAYMENT_METHOD_LABELS[method]}.`}
                        checked={values.payments.enabledMethods[method]}
                        onCheckedChange={(checked) =>
                          updatePaymentMethod(method, checked)
                        }
                      />
                    ))}
                  </div>

                  <div className='border-t border-border/60 pt-5'>
                    <SettingToggle
                      title='Allow payment retry'
                      description='Represent retry behavior in the demo payment flow.'
                      checked={values.payments.allowPaymentRetry}
                      onCheckedChange={(checked) =>
                        updateField('payments', 'allowPaymentRetry', checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
          : null}
        </div>
      </div>

      {/* Fixed action footer */}
      <div className='shrink-0 border-t border-border/70 bg-card px-5 py-4 sm:px-6'>
        <div className='flex flex-col gap-3'>
          {validationMessage ?
            <p role='alert' className='text-xs leading-5 text-destructive'>
              {validationMessage}
            </p>
          : null}

          {saveState === 'saved' ?
            <p
              role='status'
              className='flex items-center gap-2 text-xs text-muted-foreground'
            >
              <CheckCircle2 className='size-4 shrink-0 text-emerald-600' />
              Settings validated. Changes are in memory only.
            </p>
          : null}

          <div className='flex flex-wrap items-center justify-between gap-3'>
            <p className='text-[11px] text-muted-foreground'>
              {hasChanges ? 'Unsaved changes' : 'Default configuration'}
            </p>

            <div className='flex items-center gap-2'>
              <Button
                type='button'
                variant='outline'
                disabled={!hasChanges}
                onClick={onReset}
                className='h-9 gap-2'
              >
                <RotateCcw className='size-3.5' />
                Reset
              </Button>

              <Button
                type='button'
                disabled={!hasChanges}
                onClick={onSave}
                className='h-9 gap-2 bg-[#102A43] text-white hover:bg-[#102A43]/90'
              >
                <Save className='size-3.5' />
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
