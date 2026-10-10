'use client';

import { useState } from 'react';

import { DEFAULT_SETTINGS } from '../data/settings';
import { settingsSchema } from '../schema';

import type {
  PaymentMethod,
  SettingsSaveState,
  SettingsSectionKey,
  SettingsValues,
  UpdateSetting,
} from '../types/settings';

function cloneDefaultSettings(): SettingsValues {
  return {
    general: { ...DEFAULT_SETTINGS.general },
    flightOperations: { ...DEFAULT_SETTINGS.flightOperations },
    booking: { ...DEFAULT_SETTINGS.booking },
    notifications: { ...DEFAULT_SETTINGS.notifications },
    security: { ...DEFAULT_SETTINGS.security },
    payments: {
      ...DEFAULT_SETTINGS.payments,
      enabledMethods: {
        ...DEFAULT_SETTINGS.payments.enabledMethods,
      },
    },
  };
}

export function useSettings() {
  const [activeSection, setActiveSection] =
    useState<SettingsSectionKey>('general');

  const [values, setValues] = useState<SettingsValues>(cloneDefaultSettings);

  const [saveState, setSaveState] = useState<SettingsSaveState>('idle');

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const hasChanges =
    JSON.stringify(values) !== JSON.stringify(DEFAULT_SETTINGS);

  const updateField: UpdateSetting = (section, field, value) => {
    setValues(
      (current) =>
        ({
          ...current,
          [section]: {
            ...current[section],
            [field]: value,
          },
        }) as SettingsValues,
    );

    setSaveState('idle');
    setValidationMessage(null);
  };

  function updatePaymentMethod(method: PaymentMethod, enabled: boolean) {
    setValues((current) => ({
      ...current,
      payments: {
        ...current.payments,
        enabledMethods: {
          ...current.payments.enabledMethods,
          [method]: enabled,
        },
      },
    }));

    setSaveState('idle');
    setValidationMessage(null);
  }

  function resetSettings() {
    setValues(cloneDefaultSettings());
    setSaveState('idle');
    setValidationMessage(null);
  }

  function saveSettings() {
    const result = settingsSchema.safeParse(values);

    if (!result.success) {
      setSaveState('error');
      setValidationMessage(
        result.error.issues[0]?.message ??
          'Please review the settings and try again.',
      );

      return;
    }

    setSaveState('saved');
    setValidationMessage(null);
  }

  return {
    activeSection,
    setActiveSection,
    values,
    updateField,
    updatePaymentMethod,
    resetSettings,
    saveSettings,
    saveState,
    validationMessage,
    hasChanges,
  };
}
