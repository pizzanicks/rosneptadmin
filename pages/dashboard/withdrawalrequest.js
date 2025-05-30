import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import React, {useState, useEffect } from 'react'
import WithdrawalRequests from '@/components/Dashboard/WithdrawalReq'
import React, { useState, useEffect } from 'react';
import Loader from '@/components/Dashboard/DbLoader';

function WithdrawalReq() {

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
        <WithdrawalRequests />
    </DashboardLayout>
    
  )
}

export default WithdrawalReq