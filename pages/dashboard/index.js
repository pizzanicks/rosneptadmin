import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import Overview from '@/components/Dashboard/Overview'
import React, {useState, useEffect } from 'react'
import Loader from '@/components/Loader';

function Index() {

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
    <>
        <DashboardLayout>
          <Overview />
        </DashboardLayout>
    </>
  )
}

export default Index