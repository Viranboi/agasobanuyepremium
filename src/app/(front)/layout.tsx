import SiteFooter from '@/components/main/site-footer';
import SiteHeader from '@/components/main/site-header';
<meta name="apple-mobile-web-app-title" content="agasobanuye" />

const FrontLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
};

export default FrontLayout;
