import React from 'react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/footer';
import { BannerVolunteer } from './bannervolunteer/bannervolunteer';
import { VolunteerRegister } from './voluntregister/voluntregister';
import { VoluntListActs } from './voluntlistacts/voluntlistacts';

export function Volunteer() {
  return (
    <>
      <Header />
      <BannerVolunteer />
      <VolunteerRegister />
      <VoluntListActs />
      <Footer />
    </>
  );
}
