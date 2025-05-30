import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import KycRequests from '@/components/Dashboard/KycRequests'
import React, { useState, useEffect } from 'react'
import Loader from '@/components/Dashboard/DbLoader';

function Kycrequests() {

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
        <KycRequests />
    </DashboardLayout>
  )
}

export default Kycrequests