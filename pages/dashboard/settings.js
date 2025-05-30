import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import AdminSettings from '@/components/Dashboard/Settings'
import React, { useState, useEffect }from 'react'
import Loader from '@/components/Dashboard/DbLoader';

function Settings() {

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return(
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    )
  }
  return (
    <DashboardLayout>
      <AdminSettings /> 
    </DashboardLayout>

 )
}

export default Settings