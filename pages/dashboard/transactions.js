import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import Transactions from '@/components/Dashboard/Transactions'
import React, { useState, useEffect } from 'react'
import Loader from '@/components/Dashboard/DbLoader';

function AllTransaction() {

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
        <Transactions />
    </DashboardLayout>
    
  )
}

export default AllTransaction;