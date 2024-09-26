import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CompanyDetailPage from "./pages/CompanyDetailPage.jsx";
import CompanyListPage from "./pages/CompanyListPage.jsx";
import ComparisonResultPage from "./pages/ComparisonResultPage.jsx";
import ComparisonStatusPage from "./pages/ComparisonStatusPage.jsx";
import InvestmentStatusPage from "./pages/InvestmentStatusPage.jsx";
import MyComparisonPage from "./pages/MyComparisonPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="companies">
            <Route index element={<CompanyListPage />} />
            <Route path=":companyId" element={<CompanyDetailPage />} />
          </Route>
          <Route path="comparison-status" element={<ComparisonStatusPage />} />
          <Route path="investment-status" element={<InvestmentStatusPage />} />
          <Route path="my-comparison">
            <Route index element={<MyComparisonPage />} />
            <Route path="result" element={<ComparisonResultPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
