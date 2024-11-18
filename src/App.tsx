import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DevDeals } from './components/dev-deals';
import { DealDetails } from './components/deal-details';
import { AddDeal } from './components/admin/add-deal';
import { Suspense } from 'react';

// Add a simple loading component
const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<DevDeals />} />
          <Route path="/:dealSlug" element={<DealDetails />} />
          <Route path="/admin/add-deal" element={<AddDeal />} />
          {/* Add a catch-all route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;