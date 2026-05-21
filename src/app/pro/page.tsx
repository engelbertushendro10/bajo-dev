'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiCheck, FiStar, FiLock, FiCreditCard, FiSmartphone, FiAlertCircle, FiX, FiCheckCircle } from 'react-icons/fi';
import { useUser } from '@/lib/UserContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const benefits = [
  'Akses semua tutorial premium',
  'Source code lengkap setiap project',
  'Template & starter kit eksklusif',
  'Video tutorial tanpa batas',
  'Sertifikat kelulusan digital',
  'Diskusi prioritas di Discord VIP',
];

const plans = [
  { id: 'monthly', name: 'Bulanan', price: '49.000', priceVal: 49000, period: 'bulan', popular: false },
  { id: 'yearly', name: 'Tahunan', price: '299.000', priceVal: 299000, period: 'tahun', popular: true, save: 'Hemat 49%' },
  { id: 'lifetime', name: 'Lifetime', price: '999.000', priceVal: 999000, period: 'selamanya', popular: false },
];

export default function ProPage() {
  const { user, setPremium } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bank_transfer' | 'e_wallet' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu untuk berlangganan');
      return;
    }
    if (user.isPremium) {
      toast.success('Anda sudah berlangganan paket Premium!');
      return;
    }
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handlePay = () => {
    if (!paymentMethod) {
      toast.error('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckout(false);
      setPremium(true);
      toast.success(`Pembayaran berhasil! Selamat, Anda sekarang adalah member Premium Pro! 🚀`);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/25"
          >
            <FiStar className="fill-amber-500 text-amber-500" size={14} /> Bajo Dev Premium
          </motion.div>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Buka Potensi Penuh <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Coding Kamu</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Upgrade ke Premium untuk membuka akses ke semua kelas video mendalam, file starter-kit, dan sertifikasi.
          </p>
        </div>

        {/* Premium Dashboard Alert */}
        {user?.isPremium && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-16 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-heading text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                <FiCheckCircle className="fill-white text-blue-600" /> Akun Premium Pro Aktif
              </h3>
              <p className="text-blue-100 text-sm max-w-md">
                Terima kasih atas dukungan Anda! Anda sekarang memiliki akses tanpa batas ke seluruh video kelas, source code, dan prioritas Discord.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/kelas" className="px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all text-sm shadow-md">
                Mulai Kelas Pro
              </Link>
              <Link href="/roadmap" className="px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all text-sm border border-blue-500">
                Lihat Roadmap
              </Link>
            </div>
          </motion.div>
        )}

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={benefit} 
              className="flex items-center gap-3 p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                <FiCheck size={18} />
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{benefit}</span>
            </motion.div>
          ))}
        </div>

        {/* Pricing Cards */}
        {!user?.isPremium && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <motion.div 
                whileHover={{ y: -6, scale: 1.02 }}
                key={plan.name} 
                className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 flex flex-col border-2 transition-all shadow-xl ${
                  plan.popular 
                    ? 'border-blue-600 dark:border-blue-500 shadow-blue-500/5 dark:shadow-blue-500/10' 
                    : 'border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-sm">
                    {plan.save} (Paling Populer)
                  </span>
                )}
                
                <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Cocok untuk kebutuhan belajar fleksibel</p>
                
                <div className="mb-8 flex items-baseline">
                  <span className="text-xs font-semibold text-slate-400 mr-1.5">Rp</span>
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                  <span className="text-slate-500 text-sm ml-1">/{plan.period}</span>
                </div>

                <ul className="space-y-3.5 mb-8 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2.5">
                    <FiCheck className="text-blue-500" size={16} /> Akses semua video kelas
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FiCheck className="text-blue-500" size={16} /> Source code project
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FiCheck className="text-blue-500" size={16} /> Sertifikat digital
                  </li>
                </ul>

                <button 
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 text-center font-bold rounded-xl transition-all mt-auto active:scale-98 text-sm ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-650 text-slate-800 dark:text-white'
                  }`}
                >
                  Pilih Paket {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-12 flex items-center justify-center gap-1.5">
          🔒 Pembayaran terenkripsi & aman. Menggunakan Midtrans sandbox untuk simulasi.
        </p>
      </div>

      {/* Checkout Modal (Midtrans Simulator) */}
      <AnimatePresence>
        {showCheckout && selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
            >
              {/* Header Modal */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Gerbang Pembayaran</h3>
                  <p className="text-xs text-slate-500">Bajo Dev Midtrans Simulator</p>
                </div>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Order Info */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-blue-50/50 dark:bg-blue-950/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Paket Langganan:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-slate-500 font-medium">Total Tagihan:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-base">Rp {selectedPlan.price}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-6 space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pilih Metode Pembayaran</p>
                
                <div className="space-y-2">
                  {/* QRIS */}
                  <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === 'qris'
                      ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-350'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === 'qris'}
                      onChange={() => setPaymentMethod('qris')}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/20 flex items-center justify-center text-red-600 text-xs font-extrabold">
                      QRIS
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">QRIS / e-Wallet</p>
                      <p className="text-[11px] text-slate-500">GoPay, OVO, ShopeePay, LinkAja</p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-350'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center text-blue-600">
                      <FiSmartphone size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Virtual Account / Transfer Bank</p>
                      <p className="text-[11px] text-slate-500">BCA, Mandiri, BNI, BRI</p>
                    </div>
                  </label>

                  {/* Credit Card */}
                  <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === 'e_wallet'
                      ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-350'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === 'e_wallet'}
                      onChange={() => setPaymentMethod('e_wallet')}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/20 flex items-center justify-center text-indigo-600">
                      <FiCreditCard size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Kartu Kredit / Debit</p>
                      <p className="text-[11px] text-slate-500">Visa, Mastercard, JCB</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 py-3 bg-white dark:bg-slate-700 border border-slate-250 dark:border-slate-650 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white text-sm font-bold rounded-xl transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    'Bayar Sekarang'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}