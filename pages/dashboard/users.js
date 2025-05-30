import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import ManageUsers from '@/components/Dashboard/Users'
import React, { useState, useEffect }from 'react'
import Loader from '@/components/Dashboard/DbLoader';

function Users(){

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
        <ManageUsers />
    </DashboardLayout>
  )
}

export default Users