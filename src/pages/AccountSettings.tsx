import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import PageMeta from "../components/common/PageMeta";

export default function AccountSettings() {
  return (
    <>
      <PageMeta
        title="React.js Account Settings Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Account Settings Dashboard page for TailAdmin - React.js Keysend CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Account Settings" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Account Settings
        </h3>
            <div className="space-y-6">
              <UserInfoCard />
            </div>
      </div>
    </>
  );
}
