import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import SupportTickets from '@/components/Dashboard/Support'
import React, { useState, useEffect } from 'react'
import Loader from '@/components/Dashboard/DbLoader';

function Support() {

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
      <SupportTickets /> 
  </DashboardLayout>

 )
}
export default Support