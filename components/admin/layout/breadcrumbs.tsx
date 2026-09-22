import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type AdminBreadcrumbsProps = {
  title?: string;
};

export function AdminBreadcrumbs({ title }: AdminBreadcrumbsProps) {
  return (
    <Breadcrumb className='hidden sm:block'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href='/admin/dashboard'
            className='text-muted-foreground hover:text-foreground'
          >
            Admin
          </BreadcrumbLink>
        </BreadcrumbItem>

        {title ?
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
