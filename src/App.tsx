/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileCategoryNav from './components/MobileCategoryNav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Navbar />
        <MobileCategoryNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news/:id" element={<ArticlePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
