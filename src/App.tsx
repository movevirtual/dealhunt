import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DevDeals } from './components/dev-deals';
import { DealDetails } from './components/deal-details';
import { AddDeal } from './components/admin/add-deal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DevDeals />} />
        <Route path="/:dealSlug" element={<DealDetails />} />
        <Route path="/admin/add-deal" element={<AddDeal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;