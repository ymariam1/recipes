import Head from 'next/head';
import SectionTitle from '@/components/sectionTitle';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import React from 'react';
import FaqSection from '../components/faq';

const Home = () => {
  return (
    <>
    <Head>
        <title>Nextly - Free Nextjs & TailwindCSS Landing Page Template</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <SectionTitle
        pretitle="Find us on Mobile"
        title=" Take AI Chef Mate on the Go!">
        AI Chef Mate is avaliable on both the Apple App Store and 
        the Google Play store for <b>Free.</b>
      </SectionTitle>

      <SectionTitle pretitle="How It Works" title="Discover the Magic Behind AI Chef Mate">
          1. Snap a Photo - Upload a picture of your ingredients. <br/>
          <nobr>2. Get Recipe Suggestions - Our AI suggests recipes based on what you have.</nobr><br/>
          3. Cook & Enjoy - Follow the recipe and enjoy a delicious meal!
      </SectionTitle>

      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions" />
        <FaqSection />
    </>
  );
}

export default Home;
