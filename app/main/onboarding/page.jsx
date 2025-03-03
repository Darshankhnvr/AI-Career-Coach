import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from '../dashboard/_components/onboarding-form'

const OnboardingPage = () => {


  return (
    <main>
      <OnboardingForm industries = {industries} />
    </main>
  )
}

export default OnboardingPage
