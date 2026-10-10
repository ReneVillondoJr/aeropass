'use client';

import { SettingsDetail } from './components/detail';
import { SettingsHeader } from './components/header';
import { SettingsSectionNav } from './components/section-nav';

import { useSettings } from './hooks/use-settings';

export function AdminSettingsModule() {
  const settings = useSettings();

  return (
    <div className='flex flex-col gap-6'>
      <SettingsHeader />

      <div className='grid items-start gap-6 xl:grid-cols-[280px_minmax(0,1fr)]'>
        <SettingsSectionNav
          activeSection={settings.activeSection}
          onSelect={settings.setActiveSection}
        />

        <SettingsDetail
          activeSection={settings.activeSection}
          values={settings.values}
          updateField={settings.updateField}
          updatePaymentMethod={settings.updatePaymentMethod}
          onSave={settings.saveSettings}
          onReset={settings.resetSettings}
          saveState={settings.saveState}
          validationMessage={settings.validationMessage}
          hasChanges={settings.hasChanges}
        />
      </div>
    </div>
  );
}
