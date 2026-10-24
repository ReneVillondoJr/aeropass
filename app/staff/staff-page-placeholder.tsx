interface StaffPagePlaceholderProps {
  title: string;
}

export function StaffPagePlaceholder({ title }: StaffPagePlaceholderProps) {
  return (
    <section className='rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8'>
      <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#648da7]'>
        AeroPass staff
      </p>
      <h1 className='mt-2 text-2xl font-semibold tracking-tight text-[#102a43]'>
        {title}
      </h1>
      <p className='mt-3 max-w-xl text-sm leading-6 text-slate-500'>
        This staff workspace is not available yet. Operational information is
        not displayed here.
      </p>
    </section>
  );
}
