import React, { useState } from "react";
import PagePaysForm from "./PagePaysForm";

const CardFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
    {children}
  </div>
);

const PagesSite: React.FC = () => {
  const [showPaysForm, setShowPaysForm] = useState(false);

  if (showPaysForm) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setShowPaysForm(false)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          ← Retour
        </button>

        <CardFrame>
          <div className="mt-6">
            <PagePaysForm />
          </div>
        </CardFrame>
      </div>
    );
  }

  return (
    <CardFrame>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-yellow-500 to-[#93720a] flex items-center justify-center text-white text-2xl">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900">Pages du site</h2>
        <p className="text-gray-600 max-w-2xl">
          Modifiez le contenu éditorial des pages publiques (ex. pages Pays).
        </p>

        <button
          onClick={() => setShowPaysForm(true)}
          className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-b from-yellow-500 to-[#93720a] hover:brightness-110"
        >
          Page Pays
        </button>
      </div>
    </CardFrame>
  );
};

export default PagesSite;
