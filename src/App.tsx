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
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import { NewsProvider } from './context/NewsContext';

export default function App() {
  return (
    <NewsProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
          <Navbar />
          <MobileCategoryNav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news/:id" element={<ArticlePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </NewsProvider>
  );
}
