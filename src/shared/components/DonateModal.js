"use client";

import PropTypes from "prop-types";
import Modal from "./Modal";

export default function DonateModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} title="About Birouter" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="Birouter" className="w-10 h-10" />
          <div>
            <h3 className="font-semibold text-lg">Birouter</h3>
            <p className="text-sm text-text-muted">AI Router & Token Saver</p>
          </div>
        </div>

<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
        <p className="text-sm text-text-muted leading-relaxed">
          One endpoint for all your AI providers. Smart routing, auto-fallback, token compression, and usage tracking.
        </p>

        <div className="border-t border-border pt-3">
          <h4 className="text-sm font-medium mb-2">Support Development</h4>
          <a
            href="https://saweria.co/iqkat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 transition-colors text-sm font-medium w-full justify-center"
=======
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={modalRef}
        className="relative w-full bg-surface border border-black/10 dark:border-white/10 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-w-3xl flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between p-3 border-b border-black/5 dark:border-white/5">
          <h2 className="text-lg font-semibold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-pink-500">volunteer_activism</span>
            {data?.title || "Support 9Router"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Close"
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file
          >
            <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
            Donate via Saweria
          </a>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-xs text-text-muted">
            Made by{" "}
            <a href="https://github.com/IQ-Kat" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Ikbal (IQ-Kat)
            </a>
            {" "}· Based on{" "}
            <a href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              9Router
            </a>
            {" "}by decolua · MIT License
          </p>
        </div>
      </div>
    </Modal>
  );
}

DonateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
