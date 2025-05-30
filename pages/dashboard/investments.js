import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import ManageInvestments from '@/components/Dashboard/Investments'
import React, {useState, useEffect } from 'react'
import Loader from '@/components/Dashboard/DbLoader';

function Investment() {

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
        <ManageInvestments />
    </DashboardLayout>
    
  )
}

export default Investment