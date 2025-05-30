import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import React, { useState, useEffect } from 'react'
import DepositRequests from '@/components/Dashboard/DepositReq'
import Loader from '@/components/Dashboard/DbLoader';

function DepositReq() {

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
        <DepositRequests />
    </DashboardLayout>
    
  )
}

export default DepositReq